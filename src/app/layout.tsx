// src/app/layout.tsx
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import FloatingContact from '../components/FloatingContact';
import DarkModeToggle from '../components/DarkModeToggle';
import './globals.css';

export const metadata = {
  title: 'John Doe - Portfolio',
  description: 'A modern portfolio showcasing my work and skills.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="scroll-smooth snap-y snap-mandatory overflow-y-scroll">
        <Navbar />
        <DarkModeToggle />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}