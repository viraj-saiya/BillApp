// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: "#e63946",
        // cream: "#f8f9fa",
        sage: "#a8dadc",
        ocean: "#457b9d",
        navy: "#1d3557",

        brand: {
          primary: '#457b9d',
          secondary: '#a8dadc', 
          accent: '#e63946',
          dark: '#1d3557',
          // light: '#f1faee',
          light:'#f8f9fa'
        },
        accent: "#e63946",
      },
    },
  },
  plugins: [],
};
