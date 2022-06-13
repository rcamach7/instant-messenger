import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import axios from "axios";
import LandingPage from "./routes/LandingPage";
import Home from "./routes/Home";
import useFetchUser from "./hooks/useFetchUser";
import useSetTheme from "./hooks/useSetTheme";
import { UserContext } from "./hooks/useUserContext";

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
  const [user, setUser] = useFetchUser(storedJwt, setStoredJwt);
  const setTheme = useSetTheme("light");

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/instant-messenger"
          element={
            // Will only allow user to enter path if not authenticated
            <NotAuthenticated storedJwt={storedJwt}>
              <LandingPage />
            </NotAuthenticated>
          }
        />
        <Route
          path="/instant-messenger/home"
          element={
            // Will only allow user to enter path is JWT exists, which means they're authenticated.
            <RequireAuth storedJwt={storedJwt}>
              <UserContext.Provider value={{ user, setUser, setTheme }}>
                <Home />
              </UserContext.Provider>
            </RequireAuth>
          }
        />
        {/* Will re-route any user not in a valid path */}
        <Route path="*" element={<Navigate to="/instant-messenger" />} />
      </Routes>
    </HashRouter>
  );
};

// Protects routes that require authentication
function RequireAuth({ children, storedJwt }) {
  return storedJwt === null ? <Navigate to="/instant-messenger" replace /> : children;
}

// Once authenticated, we don't want our users to continue in the landing page / sign in page.
function NotAuthenticated({ children, storedJwt }) {
  return storedJwt === null ? (
    children
  ) : (
    <Navigate to="/instant-messenger/home" replace />
  );
}

export default RouteSwitch;
