/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'off-white': '#FBF4E4',
        'off-blue': '#5069B1'
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      handwriting: ["Rock Salt", "cursive"],
    },
    
  },
  plugins: [],
};
