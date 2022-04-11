import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import LandingPage from "./routes/LandingPage";
import Home from "./routes/Home";
import useFetchUser from "./hooks/useFetchUser";

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
  // Custom hook handles retrieving user info if Token exists, and updating user info upon any change.
  const [user, setUser] = useFetchUser();

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

// Once authenticated, we don't want our users to continue in the landing page / sign in page.
function NotAuthenticated({ children }) {
  return storedJwt === null ? children : <Navigate to="/home" replace />;
}

export default RouteSwitch;
