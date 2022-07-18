import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import LandingPage from "./routes/LandingPage";
import Home from "./routes/Home";
import {
  NotAuthenticated as OnlyUnauthenticated,
  RequireAuth,
} from "./components/routeProtections";

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/instant-messenger"
          element={
            // We don't want users already logged in to have access to the login page.
            <OnlyUnauthenticated>
              <LandingPage />
            </OnlyUnauthenticated>
          }
        />
        <Route
          path="/instant-messenger/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/instant-messenger" />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;
