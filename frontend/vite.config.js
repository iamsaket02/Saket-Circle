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
  ssr: {
    noExternal: ["@mediapipe/tasks-vision"],
  },
  build: {
    rolldownOptions: {
      maxParallelFileOps: 20,
    },
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
