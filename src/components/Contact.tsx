'use client';

import { motion } from 'framer-motion';
import { useDarkMode } from '../lib/DarkModeContext';
import { useState } from 'react';
import { send } from 'emailjs-com';
import { FaCheckCircle } from 'react-icons/fa';

export default function Contact() {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill out all fields.');
      return;
    }
    setStatus('Sending...');
    send(
      'service_vz57yio', // Replace with your Service ID
      'template_gw1llla', // Replace with your Template ID
      formData,
      'nzYoP6w1--qoW26yW' // Replace with your User ID
    )
      .then(() => {
        setStatus('Message sent!');
        setIsSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSent(false), 3000);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setStatus('Failed to send: ' + error.text);
      });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-x-hidden">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-light-primary dark:text-dark-primary mb-12 text-center"
      >
        Contact Me
      </motion.h1>
      <div className="grid grid-cols-1 gap-8 w-full max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4 text-center"
        >
          <p className="text-light-text dark:text-dark-text text-lg">
            Email: bhaveshtilara42@gmail.com
          </p>
          <p className="text-light-text dark:text-dark-text text-lg">
            Phone: +91 9761361586
          </p>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text rounded-lg border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text rounded-lg border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text rounded-lg border border-light-border dark:border-dark-border h-32 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
          />
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              backgroundColor: darkMode ? '#4ECCA3' : '#007F5F', // Color change
              boxShadow: darkMode ? '0 4px 12px rgba(78, 204, 163, 0.4)' : '0 4px 12px rgba(0, 127, 95, 0.4)', // Subtle shadow
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full py-2 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text rounded-full font-medium"
          >
            Send Message
          </motion.button>
          {status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-light-text dark:text-dark-text flex items-center justify-center gap-2"
            >
              {status}
              {isSent && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaCheckCircle className="text-light-accent dark:text-dark-accent" />
                </motion.span>
              )}
            </motion.p>
          )}
        </motion.form>
      </div>
    </div>
  );
}