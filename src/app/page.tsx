'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('purpose', purpose);
    formData.append('category', category);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await fetch('/api/visitor/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/confirmation/${data.visitorId}`);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 bg-card-light dark:bg-card-dark rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark text-center">
          Visitor Registration
        </h2>
        {error && <p className="text-error mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text-light dark:text-text-dark font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text-light dark:text-text-dark font-medium mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text-light dark:text-text-dark font-medium mb-1">
              Purpose of Visit
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text-light dark:text-text-dark font-medium mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Category</option>
              <option value="Student">Student</option>
              <option value="Parent">Parent</option>
              <option value="Vendor">Vendor</option>
              <option value="Guest">Guest</option>
            </select>
          </div>
          <div>
            <label className="block text-text-light dark:text-text-dark font-medium mb-1">
              Photo (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-black dark:text-white p-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}