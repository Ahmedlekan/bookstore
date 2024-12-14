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
    animation: {
      pulse: "pulse 1s ease-in-out",
      bounce: "bounce 0.5s ease-in-out",
      spin: "spin 0.5s linear",
      ping: "ping 0.5s linear",
    },
  },
  plugins: [],
}

