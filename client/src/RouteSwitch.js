import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LandingPage from "./routes/LandingPage";
import Home from "./routes/Home";
import useFetchUser from "./hooks/useFetchUser";
import useSetTheme from "./hooks/useSetTheme";

// Send all requests with our authentication token - if it exists.
const myToken = localStorage.getItem("token");
axios.interceptors.request.use(
  (config) => {
    if (myToken) {
      config.headers.authorization = `Bearer ${myToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const RouteSwitch = () => {
  const [storedJwt, setStoredJwt] = useState(myToken);
  // Custom hook handles retrieving user info if Token exists, and refreshes user info if token exists, but user value is null which logically is not correct.
  const [user, setUser] = useFetchUser(storedJwt, setStoredJwt);
  const [setTheme] = useSetTheme("light");

  const toggleTheme = () =>
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/messenger"
          element={
            <NotAuthenticated storedJwt={storedJwt}>
              <LandingPage setStoredJwt={setStoredJwt} setUser={setUser} />
            </NotAuthenticated>
          }
        />
        <Route
          path="/messenger/home"
          element={
            <RequireAuth storedJwt={storedJwt}>
              <Home
                user={user}
                setUser={setUser}
                toggleTheme={toggleTheme}
                setStoredJwt={setStoredJwt}
              />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/messenger" />} />
      </Routes>
    </BrowserRouter>
  );
};

// Protects routes that require authentication
function RequireAuth({ children, storedJwt }) {
  return storedJwt === null ? <Navigate to="/messenger" replace /> : children;
}

// Once authenticated, we don't want our users to continue in the landing page / sign in page.
function NotAuthenticated({ children, storedJwt }) {
  return storedJwt === null ? (
    children
  ) : (
    <Navigate to="/messenger/home" replace />
  );
}

export default RouteSwitch;
