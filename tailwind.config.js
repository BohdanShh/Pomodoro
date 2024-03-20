/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        textDark: '#161932 !important',
        textLight: '#d7e0ff',
        lightgrey: '#eff1fa',
        red: '#f87070',
        lightblue: '#70f3f8',
        purple: '#d881f8',
      },
      boxShadow: {
        timer: '-2rem -2rem 10rem 0 #272c5a, 2rem 2rem 10rem 0 #121530',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
