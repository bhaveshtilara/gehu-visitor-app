'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // For photo preview
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      // Create a preview URL for the selected photo
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

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
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await res.json();
      router.push(`/confirmation/${data.visitorId}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 bg-card-light dark:bg-card-dark rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark text-center">
          Visitor Registration
        </h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200 rounded">
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
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-text-light dark:text-text-dark"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark focus:ring focus:ring-primary"
              placeholder="Enter your 10-digit phone number"
              required
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
              placeholder="Enter purpose of visit"
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
              <option value="">Select category</option>
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
              Upload Photo (Optional)
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-1 w-full p-2 border rounded-md bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark focus:ring focus:ring-primary"
            />
          </div>
          {/* Photo Preview */}
          {photoPreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Photo Preview:
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoPreview}
                alt="Photo Preview"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register Visitor'}
          </button>
        </form>
      </div>
    </div>
  );
}