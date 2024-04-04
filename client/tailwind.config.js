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
      red: {
        100: "#FFA0A7",
        200: "#981822",
        800: "#991b1b",
        900: "#7f1d1d",
      },
      pink: {
        100: "#fce7f3",
        200: "#fbcfe8",
        900: "#831843",
      },
      orange: {
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        900: "#7c2d12",
      },
      yellow: {
        100: "#FFDC7A",
        200: "#795B0A",
        900: "#713f12",
      },
      green: {
        100: "#92EB9E",
        200: "#3AB54A",
        300: "#00520B",
        900: "#14532d",
      },
      teal: {
        100: "#ccfbf1",
        200: "#99f6e4",
        900: "#134e4a",
      },
      blue: {
        100: "#dbeafe",
        200: "#bfdbfe",
        900: "#1e3a8a",
      },
      indigo: {
        100: "#e0e7ff",
        200: "#c7d2fe",
        900: "#312e81",
      },
      pink: {
        100: "#FBBFFC",
        200: "#AD19B0",
        900: "#581c87",
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
        800: "#1e40af",
        900: "#1e3a8a",
      },
      gray: {
        50: "#f9fafb",
        100: "#F4F4F5",
        200: "#ACACAC",
        400: "#9ca3af",
        800: "#424242",
        900: "#212121",
      },
      black: "#1E1E1E",
      white: "#FFFFFF",
    },
    plugins: [require("@tailwindcss/forms")],
    mode: "jit",
  },
};
