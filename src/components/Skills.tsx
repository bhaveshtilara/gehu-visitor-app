// src/components/Skills.tsx
'use client';

import { motion } from 'framer-motion';

const skills = [
  { name: 'Next.js', level: 'Expert', icon: '⚛️' },
  { name: 'TypeScript', level: 'Advanced', icon: '📘' },
  { name: 'Tailwind CSS', level: 'Expert', icon: '🎨' },
  { name: 'Node.js', level: 'Advanced', icon: '🟢' },
  { name: 'AWS', level: 'Intermediate', icon: '☁️' },
  { name: 'GraphQL', level: 'Intermediate', icon: '🔗' },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="flex items-center justify-center bg-[#F9FAFB] py-12 md:py-20"
    >
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] text-center mb-10 md:mb-16"
        >
          Skills
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(30, 58, 138, 0.2)' }}
              className="bg-white p-5 sm:p-6 rounded-lg shadow-md flex items-center space-x-4"
            >
              <span className="text-2xl sm:text-3xl">{skill.icon}</span>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-[#1E3A8A]">
                  {skill.name}
                </h2>
                <p className="text-sm sm:text-base text-[#374151]">{skill.level}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}