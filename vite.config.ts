import dotenv from 'dotenv';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "https://deviq.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: "dist", // Ensure Vercel picks the correct folder
  },
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL), // Expose only required env variables
  },
  logLevel: "info",
});
