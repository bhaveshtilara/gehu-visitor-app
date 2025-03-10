"use client";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <motion.div
        className="text-lg font-semibold text-blue-400"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Setting things up... 🚀
      </motion.div>
    </div>
  );
};

export default Loader;
