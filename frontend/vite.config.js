import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {},
    conditions: ["browser", "development", "production"],
  },
  optimizeDeps: {
    exclude: ["@mediapipe/tasks-vision"],
  },
});

// export default {
//   resolve: {
//     conditions: ["browser", "development", "production"]
//   },
//   optimizeDeps: {
//     exclude: ["@mediapipe/tasks-vision"]
//   }
// }
