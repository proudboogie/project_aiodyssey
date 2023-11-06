/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        handjet: ['Handjet', 'sans-serif'],
      },
      colors: {
        'primary-yellow': '#fea223',
        'secondary-yellow': '#ffc146',
      }
    },
  },
  plugins: [],
}