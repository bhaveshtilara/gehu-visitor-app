'use client';

import { motion } from 'framer-motion';
import { useDarkMode } from '../lib/DarkModeContext';

const projects = [
  {
    title: 'AlmoraDarshan',
    shortDesc: 'A tour and travel package website for Uttarakhand.',
    desc: 'A web application showcasing travel packages for Almora, Uttarakhand, designed to help tourists explore and book trips effortlessly. Features a responsive interface with detailed itineraries and a user-friendly booking system.',
    tech: 'HTML, CSS, JavaScript, PHP',
    link: 'https://almora-darshan.vercel.app/',
  },
  {
    title: 'Sorting Odyssey',
    shortDesc: 'An interactive sorting visualizer with sound effects.',
    desc: 'A creative web tool that visualizes sorting algorithms like Bubble Sort and Quick Sort, enhanced with sound effects for an immersive educational experience. Built with a dynamic front-end for real-time interaction.',
    tech: 'HTML, CSS, JavaScript',
    link: 'https://sortingvisualizer-wine-seven.vercel.app/',
  },
  {
    title: 'My Portfolio',
    shortDesc: 'A personal portfolio showcasing my work.',
    desc: 'A modern portfolio site highlighting my skills and projects with smooth animations and a responsive design. Built to demonstrate proficiency in full-stack development and creative coding.',
    tech: 'Next.js, React.js, Tailwind CSS',
    link: 'https://bhavesh-tilara.vercel.app/',
  },
];

export default function Projects() {
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
        Projects
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              boxShadow: darkMode ? '0 10px 20px rgba(78, 204, 163, 0.3)' : '0 10px 20px rgba(0, 127, 95, 0.3)',
            }}
            className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border w-full max-w-sm mx-auto"
          >
            <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-2">{project.title}</h2>
            <p className="text-sm text-light-text dark:text-dark-text mb-2">{project.shortDesc}</p>
            <p className="text-light-text dark:text-dark-text mb-4">{project.desc}</p>
            <p className="text-sm text-light-accent dark:text-dark-accent mb-4">Tech: {project.tech}</p>
            <motion.a
              href={project.link}
              whileHover={{ scale: 1.05, color: darkMode ? '#F5A623' : '#FF9F1C' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-4 py-2 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text rounded-full font-medium"
            >
              View Project
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}