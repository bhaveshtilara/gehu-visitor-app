'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/signin' });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2 bg-error text-white rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-md"
    >
      Logout
    </button>
  );
}