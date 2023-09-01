/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': 'rgba(255, 255, 255, 1)',
        purple: 'rgba(77, 73, 141, 1)',
        violet: 'rgba(43, 41, 86, 1)',
        'items-gray': 'rgba(211, 211, 211, 1)'
      },
      fontFamily: {
        roboto: ['Roboto']
      }
    }
  },
  plugins: []
};
