/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pomopal: {
          pink: '#FFB7C5',
          rose: '#E8A0B4',
          lavender: '#E8D5F5',
          peach: '#FFDAB9',
          mint: '#B5EAD7',
          cream: '#FFF8F0',
          ink: '#6B4F5A',
          soft: '#FDF6F8',
        },
      },
      fontFamily: {
        display: [
          '"SF Pro Rounded"',
          'Nunito',
          'Avenir Next',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
