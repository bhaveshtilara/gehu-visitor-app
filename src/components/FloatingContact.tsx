// src/components/FloatingContact.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FloatingContact() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link href="#contact">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#10B981] text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </motion.button>
      </Link>
    </motion.div>
  );
}