// src/components/AboutMe.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDarkMode } from '../lib/DarkModeContext';

const Typewriter = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, speed);
    return () => clearInterval(typing);
  }, [text, speed]);
  return <span>{displayText}</span>;
};

export default function AboutMe() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { darkMode } = useDarkMode();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 flex flex-col lg:flex-row items-center justify-between min-h-screen">
      {/* Photo (moved above text in mobile) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        animate={{ y: [0, -10, 0], transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' } }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="lg:w-1/2 w-full flex justify-center order-1 lg:order-2 mb-10 lg:mb-0"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-light-accent dark:bg-dark-accent rounded-full overflow-hidden border-4 border-light-primary dark:border-dark-primary"
        >
          <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="lg:w-1/2 w-full order-2 lg:order-1"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-light-primary dark:text-dark-primary mb-4"
        >
          <Typewriter text="Hey, I’m [Your Name]" />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-light-text dark:text-dark-text text-lg sm:text-xl lg:text-2xl leading-relaxed"
        >
          A passionate <span className="text-light-accent dark:text-dark-accent">Bhavesh Tilara</span> crafting modern, user-focused digital experiences with creativity and code.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: darkMode ? '#4ECCA3' : '#007F5F' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsResumeOpen(!isResumeOpen)}
          className="mt-6 px-6 py-2 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text rounded-full font-medium text-lg"
        >
          {isResumeOpen ? 'Hide Resume' : 'View Resume'}
        </motion.button>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 bg-light-background dark:bg-dark-background rounded-lg border border-light-border dark:border-dark-border"
          >
            <h2 className="text-2xl font-bold text-light-primary dark:text-dark-primary mb-4">
              Interactive Resume
            </h2>
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-4 text-light-text dark:text-dark-text">
              <p><strong>Experience:</strong> [Your Job Title] at [Company] (2020 - Present)</p>
              <p><strong>Education:</strong> [Degree] from [University] (2016 - 2020)</p>
              <p><strong>Skills:</strong> Next.js, Tailwind CSS, Framer Motion</p>
            </motion.div>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05, backgroundColor: darkMode ? '#4ECCA3' : '#007F5F' }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-block px-6 py-2 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text rounded-full font-medium"
            >
              Download PDF
            </motion.a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}