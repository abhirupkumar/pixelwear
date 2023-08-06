/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm-1': '546px',
      'sm-2': '460px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
}