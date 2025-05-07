import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VisitorModel from '@/models/Visitor';
import { Parser } from 'json2csv';
import { Visitor } from '@/types/visitor';

// Define the shape of the CSV data
interface CSVVisitor {
  visitorId: string;
  name: string;
  phone: string;
  category: string;
  purpose: string;
  checkInTime: string;
  checkOutTime: string;
  status: string;
}

export async function GET() {
  try {
    await dbConnect();

    const visitors = await VisitorModel.find().lean() as Visitor[];

    if (!visitors || visitors.length === 0) {
      return NextResponse.json(
        { message: 'No visitors found' },
        { status: 404 }
      );
    }

    // Prepare the data for CSV
    const csvData: CSVVisitor[] = visitors.map((visitor: Visitor) => {
      const latestVisit = visitor.visits[visitor.visits.length - 1] || { date: null, exitDate: null };
      return {
        visitorId: visitor.visitorId,
        name: visitor.name,
        phone: visitor.phone,
        category: visitor.category,
        purpose: visitor.purpose,
        checkInTime: latestVisit.date
          ? new Date(latestVisit.date).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })
          : 'N/A',
        checkOutTime: latestVisit.exitDate
          ? new Date(latestVisit.exitDate).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })
          : 'Not Checked Out',
        status: visitor.isBlocked ? 'Blocked' : 'Active',
      };
    });

    // Define CSV fields
    const fields: (keyof CSVVisitor)[] = [
      'visitorId',
      'name',
      'phone',
      'category',
      'purpose',
      'checkInTime',
      'checkOutTime',
      'status',
    ];

    // Convert to CSV using json2csv
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(csvData);

    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv');
    headers.set('Content-Disposition', 'attachment; filename="visitors.csv"');

    return new NextResponse(csv, {
      status: 200,
      headers,
    });
  } catch (error: unknown) {
    console.error('Export Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Failed to export visitors', error: errorMessage },
      { status: 500 }
    );
  }
}