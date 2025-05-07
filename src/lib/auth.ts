import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.username === 'bhavesh' &&
          credentials?.password === 'admin123'
        ) {
          return { id: '1', name: 'Bhavesh', email: 'bhavesh@example.com' };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/signin',
  },
};