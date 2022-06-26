import "./scss/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { UserContextProvider } from "./context/UserContext";
import RouteSwitch from "./RouteSwitch";

ReactDOM.render(
  <UserContextProvider>
    <RouteSwitch />
  </UserContextProvider>,
  document.getElementById("root")
);
