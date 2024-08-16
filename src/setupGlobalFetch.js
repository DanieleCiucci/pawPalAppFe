import { getGlobalHandleError } from './contexts/ErrorContext';

const originalFetch = window.fetch;

export const setupGlobalFetch = () => {
    const { handleError } = getGlobalHandleError(); // Access the global error handler

    window.fetch = async (url, options = {}) => {
        try {
            const token = localStorage.getItem('authToken');
            const headers = {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            };

            const response = await originalFetch(url, { ...options, headers });

            if (!response.ok) {
                const data = await response.json();
                const error = new Error(data.message || 'An error occurred');
                error.status = response.status;

                // Check for token expiration error
                if (error.status === 401 && data.error === 'invalid_token') {
                    window.location.href = '/session-expired'; // Redirect to the session expired page
                }

                if (handleError) handleError(error);  // Use the global error handler

                return Promise.reject(error);
            }

            return response;
        } catch (error) {
            if (handleError) handleError(error);
            throw error;
        }
    };
};
