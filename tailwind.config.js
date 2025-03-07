// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#F4F4F4',
          primary: '#007F5F',
          accent: '#FF9F1C',
          text: '#2D3436',
          card: '#FFFFFF',
          border: '#DDDDDD',
        },
        dark: {
          background: '#0D0D0D',
          primary: '#4ECCA3',
          accent: '#F5A623',
          text: '#EAEAEA',
          card: '#1A1A1A',
          border: '#333333',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};