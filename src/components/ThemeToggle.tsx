"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-black/10 dark:hover:border-white/10"
      aria-label="Toggle theme"
    >
      {/* Sun icon shows in dark mode, Moon icon shows in light mode */}
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-500 hover:text-black transition-colors" />
      )}
    </button>
  );
}