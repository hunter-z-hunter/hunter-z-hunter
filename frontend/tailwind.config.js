/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bangers: ["Bangers", "sans-serif"],
        "quick-zap": ["Quick Zap", "cursive"],
      },
      colors: {
        brandblue: {
          500: "#495aa1",
        },
        branddarkblue: {
          500: "#3b1347;",
        },
        brandpurple: {
          500: "#7f53ac",
        },
        brandgreen: {
          500: "#093719",
        },
      },
    },
  },
  plugins: [],
};
