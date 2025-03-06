// src/components/AboutMe.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutMe() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="about"
      className="relative flex items-center justify-center bg-[#F9FAFB] dark:bg-[#1F2937] py-12 md:py-20 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/10 via-transparent to-[#10B981]/10 z-0" />

      <div className="relative w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left: Image with Hover Effect */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl border-4 border-[#10B981]"
            >
              <Image
                src="/profile.jpg" // Add your image to /public/
                alt="John Doe"
                fill
                className="object-cover"
              />
              {/* Tech Overlay */}
              <div className="absolute inset-0 bg-[#1E3A8A]/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-bold">Code & Create</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] dark:text-[#60A5FA] mb-4">
              Hey, I’m Bhavesh Tilara
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#374151] dark:text-[#D1D5DB] mb-6">
              A <span className="text-[#10B981] font-semibold">full-stack developer</span> with a passion for crafting cutting-edge web experiences. With over 5 years in tech, I specialize in Next.js, TypeScript, and cloud solutions, turning ideas into scalable realities. When I’m not coding, I’m diving into AI innovations or sketching my next app concept over a strong cup of coffee.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <span className="px-3 py-1 bg-[#10B981] text-white text-sm rounded-full shadow-md">
                Next.js
              </span>
              <span className="px-3 py-1 bg-[#1E3A8A] text-white text-sm rounded-full shadow-md">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-[#F59E0B] text-white text-sm rounded-full shadow-md">
                AWS
              </span>
            </div>
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: '#10B981',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#1E3A8A] dark:bg-[#1E40AF] text-white text-sm sm:text-base rounded-full shadow-md transition-all duration-300"
            >
              Explore My Work
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}