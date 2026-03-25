import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("circle-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("circle-theme", theme);
    set({ theme });
  },
}));
