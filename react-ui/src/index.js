import React from "react";
import ReactDOM from "react-dom/client"; // Importar desde "react-dom/client"
import Routes from "./Routes/Routes.js";
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);