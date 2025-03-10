'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import { DarkModeProvider } from '../lib/DarkModeContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <DarkModeProvider>
          <Navbar />
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}