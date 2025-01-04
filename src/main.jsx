import './bootstrap';
import '../sass/app.scss'
import React from 'react';
import ReactDOM from 'react-dom';
// import AppPri from "@/Context/AppProvider.jsx";
import AppProvider from '@/Context/AppProvider.jsx';
import App from "@/app.jsx";
ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root')
);