/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors:{
        primary:"#459E8D"
      },
      maxWidth: {
        xl: '1200px',
      }
    },
    screens: {
      xs: "370px",
      ss: "600px",
      sm: "768px",
      md: "900px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}