'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDarkMode } from '../lib/DarkModeContext';
import { FaCode } from 'react-icons/fa';
const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-light-card dark:bg-dark-card shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
<motion.div whileHover={{ scale: 1.1 }} className="flex-shrink-0">
  <FaCode className="w-10 h-10 text-light-primary dark:text-dark-primary" />
</motion.div>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.1, color: darkMode ? '#4ECCA3' : '#007F5F' }}
                className="text-light-text dark:text-dark-text font-medium"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-light-primary dark:bg-dark-primary text-white"
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-light-text dark:text-dark-text"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-light-card dark:bg-dark-card"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-light-text dark:text-dark-text"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}