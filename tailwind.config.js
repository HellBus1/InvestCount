/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      'jess': {
        "100": "#E1F4EC",
        "200": "#B3E4D1",
        "300": "#80D2B4",
        "400": "#4CCF97",
        "DEFAULT": "#20B486",
        "600": "#1A946D",
        "700": "#137653",
        "800": "#0C573A",
        "900": "#063924"
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "nord"
    ]
  }
}

