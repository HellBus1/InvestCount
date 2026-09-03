/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Modern FinTech Brand Tokens
        brand: {
          50: "#F0FDF8",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          DEFAULT: "#059669"
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          DEFAULT: "#0F172A"
        },
        // Backward-compatibility aliasing for seamless refactoring
        'jess': {
          "100": "#DCFCE7",
          "200": "#BBF7D0",
          "300": "#86EFAC",
          "400": "#34D399",
          "DEFAULT": "#059669",
          "600": "#047857",
          "700": "#065F46",
          "800": "#064E3B",
          "900": "#022c22"
        },
        'charter-blue': {
          "100": "#F1F5F9",
          "200": "#E2E8F0",
          "300": "#CBD5E1",
          "400": "#94A3B8",
          "DEFAULT": "#475569",
          "600": "#334155",
          "700": "#1E293B",
          "800": "#0F172A",
          "900": "#020617"
        },
        'red': {
          "100": "#FEE2E2",
          "200": "#FECACA",
          "300": "#FCA5A5",
          "400": "#F87171",
          "DEFAULT": "#EF4444",
          "600": "#DC2626",
          "700": "#B91C1C",
          "800": "#991B1B",
          "900": "#7F1D1D"
        },
        'green': {
          "100": "#DCFCE7",
          "200": "#BBF7D0",
          "300": "#86EFAC",
          "400": "#34D399",
          "DEFAULT": "#10B981",
          "600": "#059669",
          "700": "#047857",
          "800": "#065F46",
          "900": "#064E3B"
        }
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'hover': '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'elevated': '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
      borderRadius: {
        'card': '1rem',
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        nord: {
          ...require("daisyui/src/theming/themes")["nord"],
          "primary": "#059669",
          "primary-content": "#ffffff",
          "secondary": "#0F172A",
          "accent": "#10B981",
          "neutral": "#1E293B",
          "base-100": "#ffffff",
          "base-200": "#F8FAFC",
          "base-300": "#F1F5F9",
        }
      }
    ]
  }
}
