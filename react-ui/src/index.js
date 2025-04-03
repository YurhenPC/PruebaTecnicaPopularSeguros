import React from "react";
import ReactDOM from "react-dom/client"; // Importar desde "react-dom/client"
import Routes from "./Routes/Routes.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);