// src/components/Skills.tsx
'use client';

import { motion } from 'framer-motion';
import { useDarkMode } from '../lib/DarkModeContext';

const skills = [
  { name: 'Next.js', icon: '⚛️' }, // Placeholder emoji; replace with real icons if desired
  { name: 'React', icon: '⚛️' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Framer Motion', icon: '✨' },
  { name: 'Node.js', icon: '🟢' },
];

export default function Skills() {
  const { darkMode } = useDarkMode();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-light-primary dark:text-dark-primary mb-12 text-center"
      >
        Skills
      </motion.h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: darkMode ? '0 8px 16px rgba(78, 204, 163, 0.2)' : '0 8px 16px rgba(0, 127, 95, 0.2)',
            }}
            className="flex flex-col items-center bg-light-card dark:bg-dark-card p-4 rounded-lg shadow-md border border-light-border dark:border-dark-border"
          >
            <span className="text-3xl mb-2">{skill.icon}</span>
            <p className="text-light-text dark:text-dark-text font-medium text-center">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}