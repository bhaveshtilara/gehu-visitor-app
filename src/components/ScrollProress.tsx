// src/components/ScrollProgress.tsx
'use client';

import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-1 bg-[#10B981] z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}