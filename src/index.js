import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { AuthProvider } from "./firebase/auth";
ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
