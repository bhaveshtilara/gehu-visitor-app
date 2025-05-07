'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/check');
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        router.push('/admin/signin');
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !phone || !purpose || !category) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

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
      console.error('Form Submission Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-text-light dark:text-text-dark">
        Register Visitor
      </h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-light dark:text-text-dark"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark focus:ring focus:ring-primary"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-text-light dark:text-text-dark"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark focus:ring focus:ring-primary"
            required
            pattern="\d{10}"
            title="Phone number must be exactly 10 digits"
          />
        </div>
        <div>
          <label
            htmlFor="purpose"
            className="block text-sm font-medium text-text-light dark:text-text-dark"
          >
            Purpose of Visit
          </label>
          <input
            type="text"
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark focus:ring focus:ring-primary"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-text-light dark:text-text-dark"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark focus:ring focus:ring-primary"
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
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-text-light dark:text-text-dark"
          >
            Photo (Optional)
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
            className="mt-1 w-full p-2 border rounded-md bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark focus:ring focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-block w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register Visitor'}
        </button>
      </form>
    </div>
  );
}