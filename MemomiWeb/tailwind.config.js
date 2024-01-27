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
        },
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      fancy: ["Rock Salt", "cursive"],
      handwriting: ["Poor Story", "system-ui"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
