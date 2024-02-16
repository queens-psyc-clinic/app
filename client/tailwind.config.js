/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
    colors: {
      white: "#FFFFFF",
      gray: {
        100: "#F4F4F5",
        200: "#ACACAC",
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
      purple: {
        100: "#FBBFFC",
        200: "#AD19B0",
      },
      yellow: {
        100: "#FFDC7A",
        200: "#795B0A",
      },
    },
  },
  plugins: [],
  mode: "jit",
};
