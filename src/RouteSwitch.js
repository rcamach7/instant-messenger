import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import LandingPage from "./routes/LandingPage";
import Home from "./routes/Home";
import { NotAuthenticated, RequireAuth } from "./components/routeProtections";

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/instant-messenger"
          element={
            // Will only allow user to enter path if not authenticated
            <NotAuthenticated>
              <LandingPage />
            </NotAuthenticated>
          }
        />
        <Route
          path="/instant-messenger/home"
          element={
            // Will only allow user to enter path is JWT exists, which means they're authenticated.
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        {/* Will re-route any user not in a valid path */}
        <Route path="*" element={<Navigate to="/instant-messenger" />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;
