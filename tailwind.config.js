/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        siteDefault: "#B93B5E",
        siteDefaultSecond: "#6C2C70",
      }
    },
  },
  plugins: [],
}

