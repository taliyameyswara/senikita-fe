/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B5C21",
        secondary: "#33312D",
        tertiary: "#CD9651",
        customRed: "#CD5151",
      },
    },
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
      crimson: ["Crimson Text", "serif"],
      nunito: ["Nunito", "sans-serif"],
    },
    container: {
      center: true,
      padding: {
        default: "1rem",
        sm: "2rem",
      },
    },
  },
  plugins: [],
};
