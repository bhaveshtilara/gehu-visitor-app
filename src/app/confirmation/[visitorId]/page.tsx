import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import VisitorModel from '@/models/Visitor';
import QRCode from 'qrcode';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { Visitor } from '@/types/visitor';
import ConfirmationPageClient from './ConfirmationPageClient';

interface ConfirmationPageProps {
  params: Promise<{ visitorId: string }>;
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { visitorId } = await params;

  await dbConnect();

  const visitorDoc = await VisitorModel.findOne({ visitorId }).lean();
  if (!visitorDoc) {
    notFound();
  }

  // Convert the MongoDB document to a plain object
  const visitor: Visitor = {
    ...visitorDoc,
    _id: visitorDoc._id.toString(),
    createdAt: visitorDoc.createdAt.toISOString(),
    updatedAt: visitorDoc.updatedAt.toISOString(),
    visits: visitorDoc.visits.map((visit: any) => ({
      ...visit,
      _id: visit._id.toString(),
      date: visit.date.toISOString(),
      exitDate: visit.exitDate ? visit.exitDate.toISOString() : null,
    })),
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