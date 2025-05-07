import { NextResponse } from 'next/server';

export async function GET() {
  const uri = process.env.MONGODB_URI || 'Not found';
  return NextResponse.json({ MONGODB_URI: uri });
}