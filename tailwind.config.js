/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./client/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1a2e4f",
        "bright-pink": "#ff69b4",
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        sm: '4px',
      },
    },
  },
  plugins: [],
}
