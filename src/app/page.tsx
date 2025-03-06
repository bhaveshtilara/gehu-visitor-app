// src/app/page.tsx
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import InteractiveResume from '../components/InteractiveResume';

export default function Home() {
  return (
    <main>
      <AboutMe />
      <Projects />
      <Skills />
      <InteractiveResume />
      <Achievements />
      <Contact />
    </main>
  );
}