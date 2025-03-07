// src/components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Install react-icons if not already: npm install react-icons
import { useDarkMode } from '../lib/DarkModeContext';

export default function Footer() {
  const { darkMode } = useDarkMode();

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/yourhandle', icon: FaTwitter },
    { name: 'GitHub', href: 'https://github.com/yourhandle', icon: FaGithub },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/yourhandle', icon: FaLinkedin },
    { name: 'Instagram', href: 'https://instagram.com/yourhandle', icon: FaInstagram },
  ];

  return (
    <footer className="w-full bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-light-primary dark:text-dark-primary text-center mb-6"
        >
          Connect With Me
        </motion.h2>
        <div className="flex justify-center space-x-8">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: darkMode ? '#4ECCA3' : '#007F5F' }}
              whileTap={{ scale: 0.9 }}
              className="text-light-text dark:text-dark-text text-3xl"
            >
              <link.icon />
            </motion.a>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-light-text dark:text-dark-text mt-6 text-sm"
        >
          © {new Date().getFullYear()} [Your Name]. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}