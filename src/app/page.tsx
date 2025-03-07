// src/app/page.tsx
'use client';

import { motion } from 'framer-motion';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <section id="about" className="min-h-screen flex items-center">
          <AboutMe />
        </section>
        <section id="projects" className="min-h-screen flex items-center">
          <Projects />
        </section>
        <section id="skills" className="min-h-screen flex items-center">
          <Skills />
        </section>
        <section id="achievements" className="min-h-screen flex items-center">
          <Achievements />
        </section>
        <section id="contact" className="min-h-screen flex items-center">
          <Contact />
        </section>
        <section id="footer" className="min-h-[50vh] flex items-center">
          <Footer />
        </section>
      </motion.div>
    </main>
  );
}