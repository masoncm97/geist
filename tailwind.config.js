/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xxs: "375px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        offwhite: "#ece5df",
        lemon: "#ffea14",
        lightPink: "#eeb0cf",
        lighterPink: "#f1dceb",
        royalBlue: "#0D81FD",
      },
    },
  },
  plugins: [],
};
export default config;
