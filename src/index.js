import React from "react";
import ReactDOM from "react-dom";
import { UserContextProvider } from "./context/UserContext";
import RouteSwitch from "./RouteSwitch";
import "./scss/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <RouteSwitch />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
