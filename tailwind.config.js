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
      },
      'charter-blue': {
        "100": "#E0E6EF",
        "200": "#BCC9DD",
        "300": "#99ABCC",
        "400": "#7F90B7",
        "DEFAULT": "#536E96",
        "600": "#4A6387",
        "700": "#3F5574",
        "800": "#364962",
        "900": "#29374A"
      },
      'red': {
        "100": "#FDE4E4",
        "200": "#FBB8B8",
        "300": "#F88D8D",
        "400": "#F46868",
        "DEFAULT": "#F03737",
        "600": "#D83232",
        "700": "#B82C2C",
        "800": "#972626",
        "900": "#701D1D"
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

