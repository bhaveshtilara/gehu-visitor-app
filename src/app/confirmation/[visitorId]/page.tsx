import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import VisitorModel from '@/models/Visitor';
import QRCode from 'qrcode';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { Visitor, Visit } from '@/types/visitor';
import ConfirmationPageClient from './ConfirmationPageClient';

interface ConfirmationPageProps {
  params: Promise<{ visitorId: string }>;
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { visitorId } = await params;

  await dbConnect();

  const visitorDoc = await VisitorModel.findOne({ visitorId }).lean() as Visitor | null;
  if (!visitorDoc) {
    notFound();
  }

  // Convert the MongoDB document to a plain object, ensuring all required fields
  const visitor: Visitor = {
    ...visitorDoc,
    _id: visitorDoc._id.toString(),
    visitorId: visitorDoc.visitorId ?? '', // Ensure required field
    name: visitorDoc.name ?? '', // Ensure required field
    phone: visitorDoc.phone ?? '', // Ensure required field
    purpose: visitorDoc.purpose ?? '', // Ensure required field
    category: visitorDoc.category ?? 'Guest', // Ensure required field with a default
    isBlocked: visitorDoc.isBlocked ?? false, // Ensure required field with a default
    createdAt: visitorDoc.createdAt ? new Date(visitorDoc.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: visitorDoc.updatedAt ? new Date(visitorDoc.updatedAt).toISOString() : new Date().toISOString(),
    visits: visitorDoc.visits.map((visit: Visit) => ({
      ...visit,
      _id: visit._id.toString(),
      date: visit.date ? new Date(visit.date).toISOString() : new Date().toISOString(),
      exitDate: visit.exitDate ? new Date(visit.exitDate).toISOString() : null,
    })),
    photoUrl: visitorDoc.photoUrl, // Optional field
    __v: visitorDoc.__v, // Optional field
  };

  const session = await getServerSession(authOptions);
  const isAdmin = !!session;

  const qrCodeValue = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/confirmation/${visitorId}`;

  const qrCodeDataUrl = await QRCode.toDataURL(qrCodeValue, {
    width: 128,
    margin: 1,
    color: { dark: '#000000', light: '#ffffff' },
  });

  const registrationDate = new Date(visitor.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  // Get the latest visit's check-in and check-out times
  const latestVisit = visitor.visits[visitor.visits.length - 1];
  const checkInTime = new Date(latestVisit.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const checkOutTime = latestVisit.exitDate
    ? new Date(latestVisit.exitDate).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
    : null;

  // Visitor details to pass to the EmailModal
  const visitorDetails = {
    visitorId: visitor.visitorId,
    name: visitor.name,
    phone: visitor.phone,
    category: visitor.category,
    purpose: visitor.purpose,
    isBlocked: visitor.isBlocked,
    registeredAt: registrationDate,
  };

  return (
    <ConfirmationPageClient
      visitor={visitor}
      visitorDetails={visitorDetails}
      qrCodeDataUrl={qrCodeDataUrl}
      checkInTime={checkInTime}
      checkOutTime={checkOutTime}
      isAdmin={isAdmin}
    />
  );
}