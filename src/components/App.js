// src/App.js
import React from 'react';
import './App.css';
import AppContent from "./AppContent";
import { useError } from '../contexts/ErrorContext';
import { setGlobalHandleError } from '../contexts/ErrorContext';
import { setupGlobalFetch } from '../setupGlobalFetch';

function App() {
    // Initialize the error handler here
    const { handleError } = useError();

    // Set the global error handler function
    setGlobalHandleError(handleError);

    // Initialize global fetch with error handling
    React.useEffect(() => {
        setupGlobalFetch();
    }, []);

    return (
        <div className="container-fluid">
            <AppContent />
        </div>
    );
}

export default App;
