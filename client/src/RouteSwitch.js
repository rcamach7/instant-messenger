import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LandingPage from "./routes/LandingPage";
import Home from "./routes/Home";

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
  const [user, setUser] = useState(null);

  // Sign users in on page refresh if JWT token exists.
  useEffect(() => {
    if (storedJwt) {
      axios.get("/users/").then((results) => {
        setUser(results.data.user);
      });
    }
  }, []);

  // Get user data is JWT token exists but we haven't requested user data (possibly re-opened tab)
  useEffect(() => {
    if (storedJwt && user === null) {
      axios.get("/users/").then((results) => {
        setUser(results.data.user);
      });
    }
  }, [user]);

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
              <Home user={user} setUser={setUser} />
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

// // Once authenticated, we don't want our users to continue in the landing page / sign in page.
function NotAuthenticated({ children }) {
  return storedJwt === null ? children : <Navigate to="/home" replace />;
}

export default RouteSwitch;
