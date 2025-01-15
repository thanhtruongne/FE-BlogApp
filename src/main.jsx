import './boostrap';
import './sass/app.scss'
import './input.css'
import React from 'react';
import ReactDOM from "react-dom/client";
import AppProvider from './Context/AppProvider.jsx';
import App from "./App.jsx";


const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root')
);