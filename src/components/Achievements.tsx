// src/components/Achievements.tsx
'use client';

import { motion } from 'framer-motion';

const achievements = [
  { title: 'Open Source Contributor', desc: 'Contributed to 10+ Next.js projects...', year: '2024' },
  { title: 'Hackathon Winner', desc: 'Led a team to 1st place...', year: '2023' },
  { title: 'Certified AWS Developer', desc: 'Earned AWS Developer Associate...', year: '2022' },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="flex items-center justify-center bg-[#111827] dark:bg-[#0F172A] text-white py-12 md:py-20"
    >
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16"
        >
          Achievements
        </motion.h1>
        <div className="space-y-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#10B981] dark:bg-[#34D399] rounded-full flex items-center justify-center text-white font-bold">
                {achievement.year}
              </div>
              <div className="bg-[#F9FAFB] dark:bg-[#374151] text-[#374151] dark:text-[#D1D5DB] p-4 sm:p-5 rounded-lg shadow-md w-full">
                <h2 className="text-lg sm:text-xl font-semibold text-[#1E3A8A] dark:text-[#60A5FA]">
                  {achievement.title}
                </h2>
                <p className="text-sm sm:text-base">{achievement.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}