/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        typing: {
          '0%': { content: '"   "' },
          '33%': { content: '".  "' },
          '66%': { content: '".. "' },
          '100%': { content: '"..."' },
        },
        lift: {
          '0%': {
            transform: 'translateY(30%)',
            opacity: '0.7'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      },
      animation: {
        'typing-fast': 'typing 1s steps(3, end) infinite',
        'lift-slow': 'lift 0.2s linear',
      },
      colors: {
        primary: '#11253E',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        winter: {
          ...require('daisyui/src/theming/themes')['[data-theme=winter]'],
          'primary': '#11253E',
        },
      },
    ],
  },

};
