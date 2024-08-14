import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { request } from '../axios_helper';
import dogFooter from '../assets/dogFooter.svg';
import dogFooter2 from '../assets/dogFooter2.svg';
import backGroudFooterImage from '../assets/backGroudLogoFooter.svg';
import AuthHeader from './AuthHeader';

const AuthContent = ({ logout, user }) => {
    const [data, setData] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            request('GET', '/messages', {})
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        setData(response.data);
                    } else {
                        console.error('Response data is not an array:', response.data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            console.error('User is not authenticated.');
        }
    }, [isAuthenticated]);

    const handleNavigationOwner = () => {
        navigate("/appointment/schedule-appointment");
    };

    const handleNavigationSitter = () => {
        navigate("/appointment");
    };

    return (
        <div className="AuthHome">
            <AuthHeader logout={logout} />
            <div className="row justify-content-md-center mt-md-5">
                <div className="row mt-md-5">
                    <div className="col-12 d-flex flex-column align-items-center" style={{ textAlign: 'center' }}>
                        <h1 style={{ fontWeight: 'bold' }}>
                            "Welcome to PawPal!<br />
                            Find the dog sitter for <br /> your furry friend.”
                        </h1>
                        <div className="mt-3">
                            <p style={{ fontSize: '1.5rem' }}>Because every dog deserves <br /> a new best friend.</p>

                            {user.role === 0 ? (
                                <button className="homeButton" onClick={handleNavigationSitter}>YOUR APPOINTMENT</button>
                            ) : (
                                <button className="homeButton" onClick={handleNavigationOwner}>SCHEDULE APPOINTMENT</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer">
                <div className="row mt-5">
                    <div className="col-3 px-md-5">
                        <img src={dogFooter2} alt="Dog Footer" className="footerHomeDog2img" />
                    </div>
                    <div className="col-6 align-content-center">
                    </div>
                    <div className="col-3 d-flex flex-row-reverse bd-highlight">
                        <img src={dogFooter} alt="Dog Footer" className="footerHomeDog1img" />
                        <img src={backGroudFooterImage} alt="Background Footer" className="footerBackGroudLogo" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthContent;
