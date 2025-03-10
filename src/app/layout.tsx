"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { DarkModeProvider } from "../lib/DarkModeContext";
import { useState, useEffect } from "react";
import Loader from "../components/Loader"; // Import Loader

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // 2 sec delay
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {loading ? (
          <Loader />
        ) : (
          <DarkModeProvider>
            <Navbar />
            <div className="pt-16"> {/* Adds 64px padding-top (h-16) */}
              {children}
            </div>
          </DarkModeProvider>
        )}
      </body>
    </html>
  );
}
