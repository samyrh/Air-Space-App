import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


import reportWebVitals from './reportWebVitals.js';  // Ensure correct import for WebVitals

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
