'use client';

import { useState } from 'react';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton';
import EmailModal from '@/components/EmailModal';
import { Visitor } from '@/types/visitor';

interface ConfirmationPageClientProps {
  visitor: Visitor;
  visitorDetails: {
    visitorId: string;
    name: string;
    phone: string;
    category: string;
    purpose: string;
    isBlocked: boolean;
    registeredAt: string;
  };
  qrCodeDataUrl: string;
  checkInTime: string;
  checkOutTime: string | null;
  isAdmin: boolean;
}

export default function ConfirmationPageClient({
  visitor,
  visitorDetails,
  qrCodeDataUrl,
  checkInTime,
  checkOutTime,
  isAdmin,
}: ConfirmationPageClientProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [checkOutStatus, setCheckOutStatus] = useState(checkOutTime ? 'Checked Out' : '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckOut = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/visitor/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visitorId: visitor.visitorId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to check out');
      }

      const data = await res.json();
      setCheckOutStatus('Checked Out');
      setTimeout(() => {
        window.location.reload(); // Refresh to update check-out time
      }, 1500);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-6">
      <div className="print-card max-w-md w-full p-8 bg-card-light dark:bg-card-dark rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark text-center">
          Registration Successful
        </h2>
        <div className="space-y-4">
          <p className="text-text-light dark:text-text-dark">
            <span className="font-medium">Visitor ID:</span> {visitor.visitorId}
          </p>
          <p className="text-text-light dark:text-text-dark">
            <span className="font-medium">Name:</span> {visitor.name}
          </p>
          <p className="text-text-light dark:text-text-dark">
            <span className="font-medium">Phone:</span> {visitor.phone}
          </p>
          <p className="text-text-light dark:text-text-dark">
            <span className="font-medium">Category:</span> {visitor.category}
          </p>
          <p className="text-text-light dark:text-text-dark">
            <span className="font-medium">Purpose of Visit:</span> {visitor.purpose}
          </p>
          <p className="text-text-light dark:text-text-dark">
            <span className="font-medium">Status:</span>{' '}
            {visitor.isBlocked ? 'Blocked' : 'Active'}
          </p>
          <p className="text-text-light dark:text-text-dark">
            <span className="font-medium">Check-In Time:</span> {checkInTime}
          </p>
          {checkOutTime && (
            <p className="text-text-light dark:text-text-dark">
              <span className="font-medium">Check-Out Time:</span> {checkOutTime}
            </p>
          )}
          {checkOutStatus && (
            <p className="text-green-600 dark:text-green-400">
              <span className="font-medium">Check-Out Status:</span> {checkOutStatus}
            </p>
          )}
        </div>
        <div className="flex justify-center my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrCodeDataUrl} alt="Visitor QR Code" />
        </div>
      </div>
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200 rounded">
          {error}
        </div>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-4 no-print">
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
        >
          Register Another Visitor
        </Link>
        {isAdmin && (
          <a
            href="/admin"
            className="inline-block bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Back to Admin Dashboard
          </a>
        )}
        <PrintButton />
        <button
          onClick={() => setIsEmailModalOpen(true)}
          className="inline-block bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
        >
          Share via Email
        </button>
        {!checkOutTime && (
          <button
            onClick={handleCheckOut}
            disabled={loading || visitor.isBlocked}
            className="inline-block bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md disabled:opacity-50"
          >
            {loading ? 'Checking Out...' : 'Check Out'}
          </button>
        )}
      </div>
      {isEmailModalOpen && (
        <EmailModal
          visitor={visitorDetails}
          onClose={() => setIsEmailModalOpen(false)}
        />
      )}
    </div>
  );
}