/** @type {import('tailwindcss').Config} */ module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0D0D0D",
        white: "#F4F4F4",
        orange: "#FFA826",
        gray: {
          base: "#272727",
          dark: "#1E1E1E",
          light: "#343434",
          bright: "#646464",
        },
        purple: "#A477CC",
        blue: "#168FE7",
        red: "#DB4848",
        green: "#33872B",
        yellow: {
          base: "#D5D910",
          card: "#BEC116",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
