// src/components/InteractiveResume.tsx
'use client';

import { motion } from 'framer-motion';

const resumeData = {
  name: 'John Doe',
  title: 'Full-Stack Developer',
  experience: [
    { role: 'Senior Developer', company: 'TechCorp', years: '2022 - Present', desc: 'Led a team...' },
    { role: 'Frontend Engineer', company: 'InnovateLabs', years: '2020 - 2022', desc: 'Designed responsive...' },
  ],
  education: 'B.S. in Computer Science, Tech University, 2019',
};

export default function InteractiveResume() {
  return (
    <section
      id="resume"
      className="flex items-center justify-center bg-[#111827] dark:bg-[#0F172A] text-white py-12 md:py-20"
    >
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
        >
          Interactive Resume
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#F9FAFB] dark:bg-[#374151] text-[#374151] dark:text-[#D1D5DB] p-6 sm:p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] dark:text-[#60A5FA] mb-2">
            {resumeData.name}
          </h2>
          <p className="text-lg sm:text-xl text-[#10B981] dark:text-[#6EE7B7] mb-6">
            {resumeData.title}
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1E3A8A] dark:text-[#60A5FA]">
                Experience
              </h3>
              {resumeData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-left mt-4"
                >
                  <p className="text-base sm:text-lg font-medium">
                    {exp.role} @ {exp.company}
                  </p>
                  <p className="text-sm sm:text-base">{exp.years}</p>
                  <p className="text-sm sm:text-base">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1E3A8A] dark:text-[#60A5FA]">
                Education
              </h3>
              <p className="text-base sm:text-lg mt-2">{resumeData.education}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#34D399', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 bg-[#1E3A8A] dark:bg-[#1E40AF] text-white text-sm sm:text-base rounded-full shadow-md transition-all duration-300"
          >
            Download PDF
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}