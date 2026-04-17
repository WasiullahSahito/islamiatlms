/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700',
        secondary: '#F5F5DC',
        dark: '#2C2C2C',
      },
      fontFamily: {
        'arabic': ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}