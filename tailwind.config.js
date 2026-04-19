/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mygo-pink': '#FF69B4',
        'mygo-blue': '#4169E1',
        'mygo-purple': '#9370DB',
        'mygo-yellow': '#FFD700',
        'mygo-green': '#32CD32',
      },
      fontFamily: {
        'sans': ['Noto Sans SC', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
