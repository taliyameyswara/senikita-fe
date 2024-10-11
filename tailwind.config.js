/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B5C21",
        secondary: "#33312D",
        tertiary: "#CD9651",
        // Custom color
        'grey-custom': '#F1F5F9',
        customRed: "#CD5151",
        customGreen: "#119083",
        brick: "#A8412A",
        lightBrick: "#EE680D",
      },
    },

    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
      crimson: ["Crimson Text", "serif"],
      inter: ['Inter', 'sans-serif'],
      nunito: ["Nunito", "sans-serif"],
    },
    container: {
      center: true,
      padding: {
        default: "1rem",
        sm: "2rem",
      },
    },

    boxShadow: {
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
    },
    outline: {
      blue: '2px solid rgba(0, 112, 244, 0.5)',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant, e }) {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
};
