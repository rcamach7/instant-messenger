import "./scss/index.scss";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { UserContextProvider } from "./context/UserContext";
import RouteSwitch from "./RouteSwitch";

ReactDOM.render(
  <StrictMode>
    <UserContextProvider>
      <RouteSwitch />
    </UserContextProvider>
  </StrictMode>,
  document.getElementById("root")
);
