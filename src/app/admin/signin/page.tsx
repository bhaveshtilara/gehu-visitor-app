'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        console.error('Sign-in error:', result.error);
        setError('Invalid username or password');
      } else if (result?.ok) {
        router.push('/admin');
      } else {
        setError('Something went wrong during sign-in');
      }
    } catch (err) {
      console.error('Unexpected error during sign-in:', err);
      setError('Unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 bg-card-light dark:bg-card-dark rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark text-center">
          Admin Sign In
        </h2>
        {error && <p className="text-error mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text-light dark:text-text-dark font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text-light dark:text-text-dark font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-black dark:text-white p-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}