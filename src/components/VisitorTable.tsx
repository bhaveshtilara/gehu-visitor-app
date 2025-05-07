'use client';

import { useState, useEffect } from 'react';
import { Visitor } from '@/types/visitor';

export default function VisitorTable() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchVisitors = async () => {
    const res = await fetch('/api/visitor/test');
    if (!res.ok) {
      throw new Error('Failed to fetch visitors');
    }
    const data = await res.json();
    return data.visitors;
  };

  useEffect(() => {
    const loadVisitors = async () => {
      setLoading(true);
      try {
        const data = await fetchVisitors() as Visitor[]; // Add type assertion
        setVisitors(data);
        setFilteredVisitors(data);
      } catch {
        setError('Failed to load visitors');
      } finally {
        setLoading(false);
      }
    };
    loadVisitors();
  }, []);

  const handleBlock = async (visitorId: string, isBlocked: boolean) => {
    try {
      const res = await fetch('/api/visitor/block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visitorId, isBlocked }),
      });

      if (!res.ok) {
        throw new Error('Failed to update visitor status');
      }

      setVisitors((prev) =>
        prev.map((visitor) =>
          visitor.visitorId === visitorId ? { ...visitor, isBlocked } : visitor
        )
      );
      setFilteredVisitors((prev) =>
        prev.map((visitor) =>
          visitor.visitorId === visitorId ? { ...visitor, isBlocked } : visitor
        )
      );
    } catch {
      setError('Failed to update visitor status');
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setCategoryFilter(category);
    if (category) {
      setFilteredVisitors(visitors.filter((visitor) => visitor.category === category));
    } else {
      setFilteredVisitors(visitors);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <label
          htmlFor="categoryFilter"
          className="mr-2 text-sm font-medium text-text-light dark:text-text-dark"
        >
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={handleFilter}
          className="p-2 border rounded-md bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark"
        >
          <option value="">All</option>
          <option value="Student">Student</option>
          <option value="Parent">Parent</option>
          <option value="Vendor">Vendor</option>
          <option value="Guest">Guest</option>
        </select>
      </div>
      <table className="min-w-full bg-card-light dark:bg-card-dark rounded-lg shadow-md">
        <thead>
          <tr className="bg-header-light dark:bg-header-dark text-text-light dark:text-text-dark">
            <th className="p-3 text-left">Visitor ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Purpose</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVisitors.map((visitor) => (
            <tr
              key={visitor._id}
              className="border-b border-border-light dark:border-border-dark"
            >
              <td className="p-3 text-text-light dark:text-text-dark">{visitor.visitorId}</td>
              <td className="p-3 text-text-light dark:text-text-dark">{visitor.name}</td>
              <td className="p-3 text-text-light dark:text-text-dark">{visitor.phone}</td>
              <td className="p-3 text-text-light dark:text-text-dark">{visitor.category}</td>
              <td className="p-3 text-text-light dark:text-text-dark">{visitor.purpose}</td>
              <td className="p-3 text-text-light dark:text-text-dark">
                {visitor.isBlocked ? 'Blocked' : 'Active'}
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleBlock(visitor.visitorId, !visitor.isBlocked)}
                  className={`px-3 py-1 rounded-md text-white font-semibold transition duration-300 shadow-md ${
                    visitor.isBlocked
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {visitor.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}