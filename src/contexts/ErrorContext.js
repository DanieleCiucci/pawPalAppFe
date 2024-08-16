import React, { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const handleError = (error) => {
        // Handle the error (e.g., log it, show a notification, etc.)
        console.error("Error handled by ErrorContext:", error);
        setError(error);
    };

    // Set the global error handler
    React.useEffect(() => {
        setGlobalHandleError(handleError);
    }, []);

    return (
        <ErrorContext.Provider value={{ error, handleError }}>
            {children}
        </ErrorContext.Provider>
    );
};

// Optional function to allow non-hook access to handleError
let globalHandleError;
export const setGlobalHandleError = (handleErrorFunc) => {
    globalHandleError = handleErrorFunc;
};
export const getGlobalHandleError = () => ({ handleError: globalHandleError });
