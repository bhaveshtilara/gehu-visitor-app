import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // Update import path

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { visitorId, isBlocked } = await req.json();

  if (!visitorId || typeof isBlocked !== 'boolean') {
    return NextResponse.json(
      { message: 'Missing or invalid visitorId or isBlocked status' },
      { status: 400 }
    );
  }

  try {
    const visitor = await Visitor.findOneAndUpdate(
      { visitorId },
      { isBlocked },
      { new: true }
    );

    if (!visitor) {
      return NextResponse.json({ message: 'Visitor not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Visitor updated successfully', visitor });
  } catch (error: unknown) {
    console.error('Error updating visitor:', error);
    return NextResponse.json(
      { message: 'Failed to update visitor' },
      { status: 500 }
    );
  }
}