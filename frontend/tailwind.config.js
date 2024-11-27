/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Libre Baskerville', 'serif'],
      },
      colors: {
        deepbrown: "#EF8D7C",
      },
    },
  },
  plugins: [],
}

