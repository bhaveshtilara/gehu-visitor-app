/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0d9488',
        'secondary': '#f97316',
        'background-light': '#f5f5f5',
        'background-dark': '#1e293b',
        'text-light': '#111827',
        'text-dark': '#e2e8f0',
        'card-light': '#ffffff',
        'card-dark': '#3b4a6b',
        'border-light': '#e5e7eb',
        'border-dark': '#475569',
        'error': '#ef4444',
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(90deg, #0d9488, #14b8a6)',
      },
    },
  },
  plugins: [],
};