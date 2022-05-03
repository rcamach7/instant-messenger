import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
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

// Export user context to provide to any children components who need it.
export const UserContext = React.createContext();

const RouteSwitch = () => {
  const [storedJwt, setStoredJwt] = useState(myToken);
  // Custom hook handles retrieving user info if Token exists, and refreshes user info if token exists, but user value is null which logically is not correct.
  const [user, setUser] = useFetchUser(storedJwt, setStoredJwt);
  const [setTheme] = useSetTheme("light");

  // Toggles theme by updating the users preference in local storage.
  const toggleTheme = () =>
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/messenger"
          element={
            // Will only allow user to enter path if not authenticated
            <NotAuthenticated storedJwt={storedJwt}>
              <LandingPage />
            </NotAuthenticated>
          }
        />
        <Route
          path="/messenger/home"
          element={
            // Will only allow user to enter path is JWT exists, which means they're authenticated.
            <RequireAuth storedJwt={storedJwt}>
              {/* The value of our context will be a object with both user and setUser, that will be destructured in our children components */}
              <UserContext.Provider value={{ user: user, setUser: setUser }}>
                <Home setStoredJwt={setStoredJwt} toggleTheme={toggleTheme} />
              </UserContext.Provider>
            </RequireAuth>
          }
        />
        {/* Will re-route any user not in a valid path */}
        <Route path="*" element={<Navigate to="/messenger" />} />
      </Routes>
    </HashRouter>
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
