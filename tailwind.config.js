/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  themes: [
    {
      myDark: {
        "primary": "#496e97",

        "neutral": "#111319",
        "neutral-content": "#ffffff",

        "base-100": "#1a1c26",
        "base-content": "#a9afc3"
      }
    }
  ],
}

