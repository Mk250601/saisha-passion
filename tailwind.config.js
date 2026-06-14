/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#101c18",
        leaf: "#227153",
        mint: "#dff4e8",
        coral: "#df563e",
        saffron: "#f4b940",
        sky: "#2f7fb4",
        lilac: "#7c67c7",
        paper: "#fbf7ed",
        chalk: "#fffdf7",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 28, 24, 0.12)",
        lift: "0 24px 70px rgba(16, 28, 24, 0.18)",
        glow: "0 0 0 1px rgba(255,255,255,0.35), 0 18px 60px rgba(34, 113, 83, 0.22)",
      },
    },
  },
  plugins: [],
};
