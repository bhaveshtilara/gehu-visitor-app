// src/components/Achievements.tsx
'use client';

import { motion } from 'framer-motion';
import { useDarkMode } from '../lib/DarkModeContext';

const achievements = [
  { year: '2023', title: 'Best Developer Award', desc: 'Recognized for outstanding contributions in web development.' },
  { year: '2022', title: 'Launched Major Project', desc: 'Successfully deployed a large-scale client application.' },
  { year: '2021', title: 'Completed Certification', desc: 'Earned a professional certification in full-stack development.' },
];

export default function Achievements() {
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
        Achievements
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: darkMode ? '0 10px 20px rgba(78, 204, 163, 0.3)' : '0 10px 20px rgba(0, 127, 95, 0.3)' }}
            className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border"
          >
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">{achievement.title}</h2>
            <p className="text-sm text-light-text dark:text-dark-text mb-2">{achievement.desc}</p>
            <p className="text-sm text-light-accent dark:text-dark-accent">{achievement.year}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}