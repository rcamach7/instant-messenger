import { useState, useEffect } from "react";

export default function useSetTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === null) {
      // Set default theme if none exists
      localStorage.setItem("theme", "light");
    } else if (currentTheme === "dark") {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const body = document.body;
    if (theme === "light") {
      // Remove dark theme if it exists
      localStorage.setItem("theme", "light");
      body.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      body.classList.add("dark");
    }
  }, [theme]);

  return setTheme;
}
