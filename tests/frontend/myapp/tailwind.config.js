/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#131D73',  // Добавляем свой кастомный цвет
      },
    },
  },
  plugins: [],
}
