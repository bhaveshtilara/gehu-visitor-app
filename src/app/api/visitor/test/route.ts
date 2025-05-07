import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

export async function GET() {
  try {
    await dbConnect();

    const visitors = await Visitor.find({}).lean();
    return NextResponse.json(
      {
        message: 'MongoDB connection successful',
        visitors,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('MongoDB Connection Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Failed to connect to MongoDB', error: errorMessage },
      { status: 500 }
    );
  }
}