import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mainImage from '../assets/mainImageHome.svg';
import LoginFormWrapper from './LoginForm';
import { request, setAuthToken } from "../axios_helper";

const WelcomeContent = ({ setUser }) => {
    const navigate = useNavigate();

    const handleLogin = (e, username, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            { login: username, password: password }
        ).then((response) => {
            const user = { username, role: response.data.role };
            setAuthToken(response.data.token);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            navigate('/auth');
        }).catch((error) => {
            console.error("Login failed:", error);
        });
    };

    const handleRegister = (e, firstName, lastName, login, password, role) => {
        e.preventDefault();
        request(
            "POST",
            "/register",
            { firstName, lastName, login, password, role }
        ).then((response) => {
            const user = { username: login, role };
            setAuthToken(response.data.token);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            navigate('/auth');
        }).catch((error) => {
            console.error("Registration failed:", error);
        });
    };

    useEffect(() => {
        localStorage.clear();

    }, []);

    return (
        <div className="row justify-content-md-center">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row mainLoginBg p-md-5 m-md-5 m-3  p-3">
                        <div className="col-md-6 col-12" >
                            <h1>
                                Welcome back to PawPal
                            </h1>
                            <div className="d-flex justify-content-center mt-4">
                                <p>Please enter your details.</p>
                            </div>
                            <LoginFormWrapper
                                onLogin={handleLogin}
                                onRegister={handleRegister}
                            />
                        </div>

                        <div className="col-6 d-none d-md-flex">
                            <img
                                src={mainImage}
                                alt="Background Footer"
                                className="loginImg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeContent;
