'use client';

import { useState } from 'react';
import { Visitor } from '@/types/visitor';

interface AdminTableProps {
  visitors: Visitor[];
}

export default function AdminTable({ visitors: initialVisitors }: AdminTableProps) {
  const [visitors, setVisitors] = useState(initialVisitors);
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleBlockUnblock = async (visitorId: string, isBlocked: boolean) => {
    try {
      const res = await fetch('/api/visitor/block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visitorId, isBlocked: !isBlocked }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update visitor status');
      }

      setVisitors((prevVisitors) =>
        prevVisitors.map((visitor) =>
          visitor.visitorId === visitorId
            ? { ...visitor, isBlocked: !isBlocked }
            : visitor
        )
      );
    } catch (error: unknown) {
      console.error('Block/Unblock Error:', error);
      alert(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const filteredVisitors = categoryFilter
    ? visitors.filter((visitor) => visitor.category === categoryFilter)
    : visitors;

  return (
    <div className="w-full">
      {/* Filter Section */}
      <div className="mb-4">
        <label
          htmlFor="category-filter"
          className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2"
        >
          Filter by Category
        </label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-48 p-2 border rounded-lg bg-gray-700 dark:bg-gray-700 text-white dark:text-white border-gray-600 dark:border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none transition-all duration-300"
        >
          <option value="">All Categories</option>
          <option value="Student">Student</option>
          <option value="Parent">Parent</option>
          <option value="Vendor">Vendor</option>
          <option value="Guest">Guest</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 dark:bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-blue-600 dark:bg-blue-600 text-white">
              <th className="p-3 text-left text-sm sm:text-base font-semibold">Visitor ID</th>
              <th className="p-3 text-left text-sm sm:text-base font-semibold">Name</th>
              <th className="p-3 text-left text-sm sm:text-base font-semibold">Phone</th>
              <th className="p-3 text-left text-sm sm:text-base font-semibold">Category</th>
              <th className="p-3 text-left text-sm sm:text-base font-semibold">Purpose</th>
              <th className="p-3 text-left text-sm sm:text-base font-semibold">Check-In Time</th>
              <th className="p-3 text-left text-sm sm:text-base font-semibold">Check-Out Time</th>
              <th className="p-3 text-left text-sm sm:text-base font-semibold">Status</th>
              <th className="p-3 text-left text-sm sm:text-base font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitors.map((visitor) => {
              const latestVisit = visitor.visits[visitor.visits.length - 1];
              const checkInTime = new Date(latestVisit.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              });
              const checkOutTime = latestVisit.exitDate
                ? new Date(latestVisit.exitDate).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })
                : 'Not Checked Out';

              return (
                <tr
                  key={visitor.visitorId}
                  className="border-b border-gray-700 dark:border-gray-700 text-gray-300 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <td className="p-3 text-xs sm:text-sm">{visitor.visitorId}</td>
                  <td className="p-3 text-xs sm:text-sm">{visitor.name}</td>
                  <td className="p-3 text-xs sm:text-sm">{visitor.phone}</td>
                  <td className="p-3 text-xs sm:text-sm">{visitor.category}</td>
                  <td className="p-3 text-xs sm:text-sm">{visitor.purpose}</td>
                  <td className="p-3 text-xs sm:text-sm">{checkInTime}</td>
                  <td className="p-3 text-xs sm:text-sm">{checkOutTime}</td>
                  <td className="p-3 text-xs sm:text-sm">
                    {visitor.isBlocked ? 'Blocked' : 'Active'}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleBlockUnblock(visitor.visitorId, visitor.isBlocked)}
                      className={`inline-block px-3 py-1 rounded-lg font-semibold transition-all duration-300 shadow-md text-sm sm:text-base ${
                        visitor.isBlocked
                          ? 'bg-green-600 dark:bg-green-600 text-white hover:bg-green-700 dark:hover:bg-green-700'
                          : 'bg-red-600 dark:bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-700'
                      }`}
                    >
                      {visitor.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}