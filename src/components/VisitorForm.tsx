'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VisitorForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('purpose', purpose);
    formData.append('category', category);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const res = await fetch('/api/visitor/register', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to register visitor');
      }

      const data = await res.json();
      router.push(`/confirmation/${data.visitorId}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border rounded-lg bg-gray-700 dark:bg-gray-700 text-white dark:text-white border-gray-600 dark:border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none transition-all duration-300"
          placeholder="Enter your name"
        />
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full p-3 border rounded-lg bg-gray-700 dark:bg-gray-700 text-white dark:text-white border-gray-600 dark:border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none transition-all duration-300"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Purpose Field */}
      <div>
        <label
          htmlFor="purpose"
          className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1"
        >
          Purpose of Visit
        </label>
        <input
          type="text"
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
          className="w-full p-3 border rounded-lg bg-gray-700 dark:bg-gray-700 text-white dark:text-white border-gray-600 dark:border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none transition-all duration-300"
          placeholder="State your purpose"
        />
      </div>

      {/* Category Field */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-3 border rounded-lg bg-gray-700 dark:bg-gray-700 text-white dark:text-white border-gray-600 dark:border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none transition-all duration-300"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Student">Student</option>
          <option value="Parent">Parent</option>
          <option value="Vendor">Vendor</option>
          <option value="Guest">Guest</option>
        </select>
      </div>

      {/* Photo Field */}
      <div>
        <label
          htmlFor="photo"
          className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1"
        >
          Photo (Optional)
        </label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded-lg bg-gray-700 dark:bg-gray-700 text-gray-400 dark:text-gray-400 border-gray-600 dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 dark:file:bg-blue-600 file:text-white dark:file:text-white file:cursor-pointer hover:file:bg-blue-700 dark:hover:file:bg-blue-700 transition-all duration-300"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-2 bg-red-600 dark:bg-red-600 text-white rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 dark:bg-blue-600 text-white p-3 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 dark:hover:bg-blue-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
      >
        {loading ? 'Registering...' : 'Register Visitor'}
      </button>
    </form>
  );
}