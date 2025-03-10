'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { darkMode } = useDarkMode();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 flex flex-col lg:flex-row items-center justify-between min-h-screen overflow-x-hidden">
      {/* Title (Mobile: order-1) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full order-1 lg:hidden mb-4"
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-light-primary dark:text-dark-primary text-center"
        >
          <Typewriter text="Hey, I’m Bhavesh Tilara" />
        </motion.h1>
      </motion.div>
      {/* Image (Mobile: order-2, Desktop: right side) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        animate={{ y: [0, -10, 0], transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="lg:w-1/2 w-full flex justify-center order-2 lg:order-2 mb-10 lg:mb-0 overflow-hidden"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-light-accent dark:bg-dark-accent rounded-full overflow-hidden border-4 border-light-primary dark:border-dark-primary"
        >
          <Image src="/profile.jpg" alt="Bhavesh Tilara" width={384} height={384} className="object-cover" />
        </motion.div>
      </motion.div>
      {/* Description (Mobile: order-3, Desktop: left side with title) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="lg:w-1/2 w-full order-3 lg:order-1"
      >
        {/* Title for Desktop Only */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="hidden lg:block text-4xl sm:text-5xl lg:text-6xl font-bold text-light-primary dark:text-dark-primary mb-4"
        >
          <Typewriter text="Hey, I’m Bhavesh Tilara" />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-light-text dark:text-dark-text text-lg sm:text-xl lg:text-2xl leading-relaxed text-center lg:text-left"
        >
          A passionate Full Stack Developer crafting modern web solutions.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: darkMode ? '#4ECCA3' : '#007F5F' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          className="mt-6 px-6 py-2 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text rounded-full font-medium text-lg mx-auto lg:mx-0 block"
        >
          {isMoreOpen ? 'Show Less' : 'View More'}
        </motion.button>
        {isMoreOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-light-text dark:text-dark-text text-center lg:text-left"
          >
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-4 text-light-text dark:text-dark-text">
              <p><strong>Experience:</strong> Full Stack Developer Intern at Technology Business Incubator – GEU (Nov 2024 – Present)</p>
              <p><strong>Education:</strong> Master of Computer Applications, Graphic Era Hill University - Haldwani (Aug 2023 - Aug 2025)<br /></p>
            </motion.div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, backgroundColor: darkMode ? '#4ECCA3' : '#007F5F' }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 inline-block px-6 py-2 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text rounded-full font-medium"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}