import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ErrorProvider } from './contexts/ErrorContext';
import { setupGlobalFetch } from './setupGlobalFetch';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ErrorProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ErrorProvider>
);

// Setup the global fetch after rendering the app
setupGlobalFetch();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
