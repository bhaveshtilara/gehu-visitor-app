// src/components/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { useDarkMode } from '../lib/DarkModeContext';

export default function Contact() {
  const { darkMode } = useDarkMode();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-light-primary dark:text-dark-primary mb-6 text-center"
      >
        Contact Me
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg border border-light-border dark:border-dark-border max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label className="block text-light-text dark:text-dark-text mb-2">Name</label>
          <motion.input
            type="text"
            whileFocus={{ scale: 1.02, borderColor: darkMode ? '#4ECCA3' : '#007F5F' }}
            className="w-full p-2 rounded bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border border-light-border dark:border-dark-border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-light-text dark:text-dark-text mb-2">Email</label>
          <motion.input
            type="email"
            whileFocus={{ scale: 1.02, borderColor: darkMode ? '#4ECCA3' : '#007F5F' }}
            className="w-full p-2 rounded bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border border-light-border dark:border-dark-border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-light-text dark:text-dark-text mb-2">Message</label>
          <motion.textarea
            whileFocus={{ scale: 1.02, borderColor: darkMode ? '#4ECCA3' : '#007F5F' }}
            className="w-full p-2 rounded bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border border-light-border dark:border-dark-border"
            rows={4}
          />
        </div>
        <motion.button
  whileHover={{ scale: 1.05, backgroundColor: darkMode ? '#4ECCA3' : '#007F5F' }}
  whileTap={{ scale: 0.95 }}
  animate={{ scale: [1, 1.03, 1], transition: { repeat: Infinity, duration: 1.5 } }}
  className="w-full py-2 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text rounded-full font-medium"
>
  Send Message
</motion.button>
      </motion.form>
    </div>
  );
}