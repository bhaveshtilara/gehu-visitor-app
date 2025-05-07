import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

async function generateVisitorId() {
  await dbConnect();
  const latestVisitor = await Visitor.findOne().sort({ createdAt: -1 }).lean();
  let counter = 1;

  if (latestVisitor && latestVisitor.visitorId) {
    const latestId = latestVisitor.visitorId.split('-')[1];
    counter = parseInt(latestId, 10) + 1;
  }

  return `GEHU-${counter.toString().padStart(6, '0')}`;
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const visitorData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      purpose: formData.get('purpose') as string,
      category: formData.get('category') as string,
      photo: formData.get('photo') as File | string | null,
    };

    console.log('Form Data:', visitorData);

    if (!visitorData.name || !visitorData.phone || !visitorData.purpose || !visitorData.category) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(visitorData.phone)) {
      return NextResponse.json(
        { message: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    console.log('Validation passed');

    const visitorId = await generateVisitorId();

    const newVisitor = new Visitor({
      visitorId,
      name: visitorData.name,
      phone: visitorData.phone,
      purpose: visitorData.purpose,
      category: visitorData.category,
      visits: [{ date: new Date() }], // Let Mongoose generate _id automatically
      isBlocked: false,
    });

    console.log('Saving Visitor:', newVisitor);

    if (visitorData.photo && typeof visitorData.photo !== 'string') {
      const cloudinaryUrl = 'mock-cloudinary-url'; // Replace with actual Cloudinary upload logic if needed
      newVisitor.photoUrl = cloudinaryUrl;
    }

    await newVisitor.save();

    return NextResponse.json(
      {
        message: 'Visitor registered successfully',
        visitorId: newVisitor.visitorId,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Visitor Registration Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Failed to register visitor', error: errorMessage },
      { status: 500 }
    );
  }
}