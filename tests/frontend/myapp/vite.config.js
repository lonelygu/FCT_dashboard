import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Создаём алиас для src
    },
  },
  server: {
    port: 5173, // Порт Vite
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000", // Проксируем запросы на Flask
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
