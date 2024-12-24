// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routes.jsx'; // Import Routes without Router
import './App.css'
function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;
