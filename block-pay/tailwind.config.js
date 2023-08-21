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
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        raleway: ["Raleway", "sans-serif"],
        roboto:['greek','cyrillic'],
      },
      //This is where you add you add your fonts
      fontWeight: {
        'light': 300,
        'normal': 400,
        'bold': 700,
      },
      colors: {
        'primary-orange': '#FF5722',
      }
    },
  },
  plugins: [],
}