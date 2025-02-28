/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",  // Пути для поиска классов Tailwind
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#131D73',  // Добавляем кастомный цвет
      },
    },
  },
  plugins: [],  // Здесь можно добавить дополнительные плагины Tailwind
};
