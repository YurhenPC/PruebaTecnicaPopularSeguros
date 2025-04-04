import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/PrivateRoute';
import Polizas from './pages/Polizas';
import Login from './pages/Login';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/polizas" element={<PrivateRoute><Polizas /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
