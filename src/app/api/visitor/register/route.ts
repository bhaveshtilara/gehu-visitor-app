import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VisitorModel from '@/models/Visitor';
import { Visitor } from '@/types/visitor';
import cloudinary from 'cloudinary';

// Define the Cloudinary upload response type
interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: unknown; // Allow other properties
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    await dbConnect();

    // Generate a new visitor ID
    const latestVisitor = (await VisitorModel.findOne().sort({ visitorId: -1 }).lean()) as Visitor | null;
    let counter = 1;

    if (latestVisitor && latestVisitor.visitorId) {
      const latestId = latestVisitor.visitorId.split('-')[1];
      counter = parseInt(latestId, 10) + 1;
    }

    const visitorId = `GEHU-${counter.toString().padStart(6, '0')}`;

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const purpose = formData.get('purpose') as string;
    const category = formData.get('category') as string;
    const photo = formData.get('photo') as File | null;

    console.log('Form Data:', { name, phone, purpose, category, photo });

    // Validation
    if (!name || !phone || !purpose || !category) {
      return NextResponse.json(
        { message: 'All fields except photo are required' },
        { status: 400 }
      );
    }

    if (!['Student', 'Parent', 'Vendor', 'Guest'].includes(category)) {
      return NextResponse.json(
        { message: 'Invalid category' },
        { status: 400 }
      );
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      return NextResponse.json(
        { message: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    console.log('Validation passed');

    // Check if visitor already exists
    const existingVisitor = await VisitorModel.findOne({ phone });
    if (existingVisitor) {
      const newVisit = {
        date: new Date(),
      };
      existingVisitor.visits.push(newVisit);
      await existingVisitor.save();
      return NextResponse.json(
        { visitorId: existingVisitor.visitorId },
        { status: 200 }
      );
    }

    // Handle photo upload
    let photoUrl = '';
    if (photo) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: 'visitors' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      });

      photoUrl = result.secure_url;
    }

    // Create new visitor
    const visitor = new VisitorModel({
      visitorId,
      name,
      phone,
      purpose,
      category,
      photoUrl,
      visits: [{ date: new Date() }],
    });

    console.log('Saving Visitor:', visitor);
    await visitor.save();

    return NextResponse.json({ visitorId }, { status: 201 });
  } catch (error: unknown) {
    console.error('Registration Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Registration failed', error: errorMessage },
      { status: 500 }
    );
  }
}