// src/components/Contact.tsx
'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex items-center justify-center bg-[#F9FAFB] py-12 md:py-20"
    >
      <div className="w-full max-w-lg px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-6"
        >
          Contact Me
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg text-[#374151] mb-8"
        >
          Got a project idea? Let’s connect and build something extraordinary!
        </motion.p>
        <form className="space-y-6">
          <motion.input
            whileFocus={{ borderColor: '#10B981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.3)' }}
            type="text"
            placeholder="Your Name"
            className="w-full p-3 bg-white border border-[#374151] rounded-lg text-[#374151] focus:outline-none"
          />
          <motion.input
            whileFocus={{ borderColor: '#10B981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.3)' }}
            type="email"
            placeholder="Your Email"
            className="w-full p-3 bg-white border border-[#374151] rounded-lg text-[#374151] focus:outline-none"
          />
          <motion.textarea
            whileFocus={{ borderColor: '#10B981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.3)' }}
            placeholder="Your Message"
            rows={4}
            className="w-full p-3 bg-white border border-[#374151] rounded-lg text-[#374151] focus:outline-none resize-none"
          />
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#10B981', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-6 py-3 bg-[#1E3A8A] text-white text-sm sm:text-base rounded-full shadow-md transition-all duration-300"
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </section>
  );
}