/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'esports-dark': '#0a0a0a',
        'esports-card': '#111111',
        'neon-blue': '#00f3ff',
        'neon-green': '#00ff88',
        'neon-purple': '#bc13fe',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
