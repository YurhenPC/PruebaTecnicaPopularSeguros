import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "../pages/Menu";
import Login from "../pages/Login";
import Polizas from '../pages/Polizas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/polizas" element={<Polizas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
