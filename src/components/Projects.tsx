// src/components/Projects.tsx
'use client';

import { motion } from 'framer-motion';
import { useDarkMode } from '../lib/DarkModeContext';

const projects = [
  {
    title: 'Project 1',
    shortDesc: 'A modern web app built with Next.js.',
    desc: 'This project is a high-performance web application designed to streamline user workflows. It features real-time data updates, a responsive design optimized for all devices, and a clean, intuitive interface that enhances user experience across platforms.',
    tech: 'Next.js, TypeScript, Tailwind CSS',
    link: '#',
  },
  {
    title: 'Project 2',
    shortDesc: 'An e-commerce platform with Tailwind CSS.',
    desc: 'A robust e-commerce solution with a sleek, modern UI. It includes secure payment integration via Stripe, advanced product filtering, and a scalable backend to handle inventory and user management, delivering a seamless shopping experience.',
    tech: 'React, Tailwind CSS, Stripe',
    link: '#',
  },
  {
    title: 'Project 3',
    shortDesc: 'A portfolio site with Framer Motion.',
    desc: 'A dynamic personal portfolio showcasing creative work with smooth animations and transitions. Built to highlight skills and projects, it leverages a modern tech stack for fast load times and an engaging, interactive design.',
    tech: 'Next.js, Framer Motion, Vercel',
    link: '#',
  },
];

export default function Projects() {
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
        Projects
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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