import { useState, useEffect } from "react";

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  const currentMode = localStorage.getItem("theme");
  const body = document.body;

  // useEffect(() => {
  //   // Set theme if none was found
  //   if (mode === null) {
  //     localStorage.setItem("theme", "light");
  //     body.classList.add("light");
  //   }
  //   // Toggle theme
  //   if (darkMode) {
  //     localStorage.setItem("theme", "dark");
  //     body.classList.replace("light", "dark");
  //     // console.log(body.classList);
  //   } else {
  //     localStorage.setItem("theme", "light");
  //     body.classList.replace("dark", "light");
  //     // console.log(body.classList);
  //   }
  // }, [darkMode]);

  return (
    <button className="DarkMode" onClick={() => setDarkMode(!darkMode)}>
      Toggle Dark Mode
    </button>
  );
}
