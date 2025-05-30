import React, { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      if (localStorage.theme === "dark") return true;
      if (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) return true;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-700 transition"
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
