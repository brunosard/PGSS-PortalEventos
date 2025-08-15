/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cogna: {
          cinzaClaro: '#EEE9EA',
          cinzaEscuro: '#2F3136',
          roxo: '#8038F0',
          amarelo: '#FFAD01',
          coral: '#FB805E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 