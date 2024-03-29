/** @type {import('tailwindcss').Config} */ module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          black: "#080808",
          white: "#F4F4F4",
          orange: "#FFA826",
          purple: "#A477CC",
          blue: "#168FE7",
          red: "#DB4848",
          green: "#33872B",
          gray: {
            base: "#272727",
            dark: "#1E1E1E",
            light: "#343434",
            bright: "#646464",
          },
          yellow: {
            base: "#D5D910",
            card: "#BEC116",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
