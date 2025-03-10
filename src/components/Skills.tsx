'use client';

import { motion } from 'framer-motion';
import { useDarkMode } from '../lib/DarkModeContext';
import { FaCuttlefish, FaJava, FaJs, FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMysql } from 'react-icons/si';

const skills = [
  { name: 'C', icon: <FaCuttlefish /> },
  { name: 'Java', icon: <FaJava /> },
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'React.js', icon: <FaReact /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'HTML', icon: <FaHtml5 /> },
  { name: 'CSS', icon: <FaCss3Alt /> },
  { name: 'MySQL', icon: <SiMysql /> },
];

export default function Skills() {
  const { darkMode } = useDarkMode();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-x-hidden">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-light-primary dark:text-dark-primary mb-12 text-center"
      >
        Skills
      </motion.h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 w-full">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeIn' }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            className="flex flex-col items-center p-4"
          >
            <motion.span
              className="text-4xl mb-3 text-light-accent dark:text-dark-accent"
              whileHover={{ color: darkMode ? '#4ECCA3' : '#007F5F' }} // Use darkMode here
            >
              {skill.icon}
            </motion.span>
            <p className="text-light-text dark:text-dark-text font-medium text-center text-lg">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}