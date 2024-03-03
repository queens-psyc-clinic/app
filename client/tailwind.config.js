/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern:
        /bg-(red|green|blue|teal|yellow|orange|purple|pink)-(100|200|300)/,
    },
  ],
  important: "#root",
  theme: {
    extend: {},
    backgroundImage: {
      home: "url('./assets/icons/home.svg')",
      "home-selected": "url('./assets/icons/home-color.svg')",
      overdue: "url('./assets/icons/overdue.svg')",
      "overdue-selected": "url('./assets/icons/overdue-color.svg')",
      "sign-out": "url('./assets/icons/sign-out.svg')",
      "sign-out-selected": "url('./assets/icons/sign-out-color.svg')",
    },
    fontsize: {
      xs: "12px",
      sm: "16px",
      base: "20px",
      lg: "32px",
    },
    colors: {
      white: "#FFFFFF",
      gray: {
        100: "#F4F4F5",
        200: "#ACACAC",
        800: "#424242",
        900: "#212121",
      },
      black: "#1E1E1E",
      red: {
        100: "#FFA0A7",
        200: "#981822",
      },
      green: {
        100: "#92EB9E",
        200: "#3AB54A",
        300: "#00520B",
      },
      pink: {
        100: "#FBBFFC",
        200: "#AD19B0",
      },
      purple: {
        100: "#D67EFF",
        200: "#4D1766",
      },
      orange: {
        100: "#FF9F81",
        200: "#A23817",
      },
      teal: {
        100: "#8CEBDA",
        200: "#005344",
      },
      yellow: {
        100: "#FFDC7A",
        200: "#795B0A",
      },
      blue: {
        100: "#7FC7FF",
        200: "#004B85",
        300: "#02599c",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  mode: "jit",
};
