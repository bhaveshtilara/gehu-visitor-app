'use client';

import { useState } from 'react';

interface EmailModalProps {
  visitor: {
    visitorId: string;
    name: string;
    phone: string;
    category: string;
    purpose: string;
    isBlocked: boolean;
    registeredAt: string;
  };
  onClose: () => void;
}

export default function EmailModal({ visitor, onClose }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/visitor/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: email, visitor }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to send email');
      }

      setSuccess('Email sent successfully!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-text-light dark:text-text-dark">
          Share via Email
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 rounded">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-light dark:text-text-dark"
            >
              Recipient Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark focus:ring focus:ring-primary"
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-block bg-gray-500 text-white p-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300 shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-block bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}