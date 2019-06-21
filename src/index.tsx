import * as React from "react";
import * as ReactDOM from "react-dom";
import Dashboard from "./components/Dashboard";
import { diel } from "./setup";
export function loadPage() {
  ReactDOM.render(
    <Dashboard
      diel={diel}
    />,
    document.getElementById("wrapper")
  );

}