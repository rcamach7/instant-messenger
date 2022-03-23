import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
              <Home />
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
  return storedJwt !== null ? children : <Navigate to="/" replace />;
}

// Once authenticated, we don't want our users to continue in the landing page / sign in page.
function NotAuthenticated({ children }) {
  return storedJwt !== null ? <Navigate to="/" replace /> : children;
}

export default RouteSwitch;
