import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import LandingPage from "./routes/LandingPage";
import Home from "./routes/Home";
import useFetchUser from "./hooks/useFetchUser";
import { useEffect, useState } from "react";

// Send all requests with our authentication token - if it exists.
const storedJwt = localStorage.getItem("token");
axios.interceptors.request.use(
  (config) => {
    if (storedJwt) {
      config.headers.authorization = `Bearer ${storedJwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const RouteSwitch = () => {
  // Custom hook handles retrieving user info if Token exists, and refreshes user info if token exists, but user value is null which logically is not correct.
  const [user, setUser] = useFetchUser();
  const [theme, setTheme] = useState("light");
  const currentTheme = localStorage.getItem("theme");

  useEffect(() => {
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

  const toggleTheme = () =>
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <NotAuthenticated>
              <LandingPage />
            </NotAuthenticated>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home user={user} setUser={setUser} toggleTheme={toggleTheme} />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

// Protects routes that require authentication
function RequireAuth({ children }) {
  return storedJwt === null ? <Navigate to="/" replace /> : children;
}

// Once authenticated, we don't want our users to continue in the landing page / sign in page.
function NotAuthenticated({ children }) {
  return storedJwt === null ? children : <Navigate to="/home" replace />;
}

export default RouteSwitch;
