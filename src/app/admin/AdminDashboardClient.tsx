'use client';

import { useState } from 'react';
import AdminTable from '@/components/AdminTable';
import { Visitor } from '@/types/visitor';

interface AdminDashboardClientProps {
  visitors: Visitor[];
  totalVisitors: number;
  visitorsByCategory: {
    Student: number;
    Parent: number;
    Vendor: number;
    Guest: number;
  };
  dailyVisits: { date: string; count: number }[];
}

export default function AdminDashboardClient({
  visitors,
  totalVisitors,
  visitorsByCategory,
  dailyVisits,
}: AdminDashboardClientProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExport = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/visitor/export');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to export visitors');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'visitors.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-white dark:text-white tracking-tight">
        Admin Dashboard
      </h1>

      {/* Analytics Section */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-200 dark:text-gray-200">
          Analytics Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Total Visitors Card */}
          <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-lg font-medium text-gray-300 dark:text-gray-300">
              Total Visitors
            </h3>
            <p className="text-3xl font-bold text-blue-400 dark:text-blue-400 mt-2">
              {totalVisitors}
            </p>
          </div>

          {/* Visitors by Category Card */}
          <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-lg font-medium text-gray-300 dark:text-gray-300">
              Visitors by Category
            </h3>
            <ul className="mt-2 space-y-2">
              {Object.entries(visitorsByCategory).map(([category, count]) => (
                <li
                  key={category}
                  className="text-gray-400 dark:text-gray-400 flex justify-between items-center"
                >
                  <span className="font-medium">{category}</span>
                  <span className="inline-block bg-blue-600 dark:bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Daily Visits Card */}
          <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-lg font-medium text-gray-300 dark:text-gray-300">
              Daily Visits (Last 7 Days)
            </h3>
            <ul className="mt-2 space-y-2">
              {dailyVisits.map(({ date, count }) => (
                <li
                  key={date}
                  className="text-gray-400 dark:text-gray-400 flex justify-between items-center"
                >
                  <span className="font-medium">
                    {new Date(date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="inline-block bg-blue-600 dark:bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
                    {count} {count === 1 ? 'visit' : 'visits'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-end gap-3">
        {error && (
          <div className="w-full sm:w-auto p-2 bg-red-600 dark:bg-red-600 text-white rounded-lg">
            {error}
          </div>
        )}
        <button
          onClick={handleExport}
          disabled={loading}
          className="w-full sm:w-auto inline-block bg-blue-600 dark:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 dark:hover:bg-blue-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {loading ? 'Exporting...' : 'Export to CSV'}
        </button>
      </div>

      {/* Visitor Table */}
      <div className="bg-gray-800 dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
        <AdminTable visitors={visitors} />
      </div>
    </div>
  );
}