const { scryRenderedComponentsWithType } = require('react-dom/test-utils');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        memoblue: {
          50: "#D9D9D9",
          400: "#5069B1",
        },
        memoneutral: {
          800: "#333333",
        },
        memoyellow: {
          50: "#FBF4E4",
          100: "#f2ecdc",
          300: "#FBD491",
        },
      },
      spacing: {
        '2.5':'2.5px',
        '3': '3px',
        '47':'47px',
        '275':'275px',
        '175':'175px',
        '375':'375px',
        '475':'475px',
        '500':'500px',
        '20':'20px',
        '80':'80px',
        '5/12':'41.67%',
        '200':'200px',
        '850':'850px',
        '1000':'80rem',
      }
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      fancy: ["Rock Salt", "cursive"],
      handwriting: ["Poor Story", "system-ui"],
    },
    backgroundImage:{
      'default':"url('/public/Background.png')"
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  plugins: [require("@tailwindcss/line-clamp")],
};
