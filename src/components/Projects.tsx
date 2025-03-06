// src/components/Projects.tsx
'use client';

import { motion } from 'framer-motion';

const projects = [
  { title: 'EcoTrack', description: 'A sustainability app...', link: '#', tags: ['Web', 'Sustainability'] },
  { title: 'PixelCraft', description: 'An interactive design tool...', link: '#', tags: ['Creative', 'UI/UX'] },
  { title: 'TaskSphere', description: 'A collaborative task platform...', link: '#', tags: ['Productivity', 'Backend'] },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="flex items-center justify-center bg-[#111827] dark:bg-[#0F172A] text-white py-12 md:py-20"
    >
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-10 md:mb-16"
        >
          Projects
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(30, 58, 138, 0.2)' }}
              className="bg-[#F9FAFB] dark:bg-[#374151] text-[#374151] dark:text-[#D1D5DB] p-5 sm:p-6 rounded-lg shadow-lg flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-[#1E3A8A] dark:text-[#60A5FA] mb-2">
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs sm:text-sm bg-[#10B981] dark:bg-[#34D399] text-white px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <motion.a
                href={project.link}
                whileHover={{ color: '#10B981' }}
                className="text-[#1E3A8A] dark:text-[#60A5FA] text-sm sm:text-base font-medium hover:underline"
              >
                View Project
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}