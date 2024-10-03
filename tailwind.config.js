/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {      fontFamily: {
      Poppins: ['Poppins', 'sans-serif'],
      WorkSans: ['Work Sans', 'sans-serif'],
      Inter: ['Inter', 'sans-serif'],
      JimNightshade:['Jim Nightshade', 'sans-serif'],
      Montserrat: ['Montserrat','sans-serif']
    },},
  },
  plugins: [],
}

