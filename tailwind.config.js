// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: 'class',  // ✅ ADD THIS
//   theme: { extend: {} },
//   plugins: [],
// }

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    allowedHosts: ["my-portfolio-frontend-1-estg.onrender.com"]
  }
});