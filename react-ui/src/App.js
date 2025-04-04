import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Polizas from '../pages/Polizas';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Polizas />} />
            </Routes>
        </Router>
    );
}

export default App;
