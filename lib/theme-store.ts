import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

// `persist` saves the store to localStorage (key below) and rehydrates it on
// load, so the chosen theme survives refreshes.
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
    }),
    { name: "feed-reader-theme" },
  ),
);
