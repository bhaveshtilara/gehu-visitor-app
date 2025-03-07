// src/components/InteractiveResume.tsx
'use client';

import { motion } from 'framer-motion';
import { useDarkMode } from '../lib/DarkModeContext';

export default function InteractiveResume() {
  const { darkMode } = useDarkMode();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg border border-light-border dark:border-dark-border max-w-2xl mx-auto my-10"
    >
      <h2 className="text-2xl font-bold text-light-primary dark:text-dark-primary mb-4">
        Interactive Resume
      </h2>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="space-y-4 text-light-text dark:text-dark-text"
      >
        <p><strong>Experience:</strong> [Your Job Title] at [Company] (2020 - Present)</p>
        <p><strong>Education:</strong> [Degree] from [University] (2016 - 2020)</p>
        <p><strong>Skills:</strong> Next.js, Tailwind CSS, Framer Motion</p>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: darkMode ? '#4ECCA3' : '#007F5F' }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-full font-medium"
      >
        Explore More
      </motion.button>
    </motion.div>
  );
}