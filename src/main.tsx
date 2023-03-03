import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/auth/newauth";
import { initApp } from "./components/firebase/newfire";
import "./index.css";

initApp();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
