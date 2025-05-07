import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { visitorId } = await request.json();

    if (!visitorId) {
      return NextResponse.json(
        { message: 'Visitor ID is required' },
        { status: 400 }
      );
    }

    const visitor = await Visitor.findOne({ visitorId });

    if (!visitor) {
      return NextResponse.json(
        { message: 'Visitor not found' },
        { status: 404 }
      );
    }

    if (visitor.isBlocked) {
      return NextResponse.json(
        { message: 'Cannot check out: Visitor is blocked' },
        { status: 403 }
      );
    }

    // Find the latest visit (last element in the visits array)
    const latestVisit = visitor.visits[visitor.visits.length - 1];

    if (latestVisit.exitDate) {
      return NextResponse.json(
        { message: 'Visitor has already checked out' },
        { status: 400 }
      );
    }

    // Update the latest visit with the current time as exitDate
    latestVisit.exitDate = new Date();
    await visitor.save();

    return NextResponse.json(
      { message: 'Visitor checked out successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Check-Out Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Failed to check out visitor', error: errorMessage },
      { status: 500 }
    );
  }
}