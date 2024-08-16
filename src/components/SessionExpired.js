import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const SessionExpired = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the local storage
        localStorage.clear();

        // Redirect to the login page
        navigate('/');
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h2>Session Expired</h2>
                <p>Your session has expired. Please log in again to continue.</p>
                <button onClick={handleLogout} className="btn btn-primary mt-5">
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default SessionExpired;
