// components/ThemeToggle.tsx
"use client";
import { useTheme } from "@/hooks/UseTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-lg border border-gray-400 dark:border-gray-600
                 bg-white dark:bg-gray-800 text-black dark:text-white
                 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm flex items-center gap-2"
    >
      {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}
