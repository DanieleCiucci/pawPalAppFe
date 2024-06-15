import React from 'react';
import { request } from '../axios_helper';
import logoBackground from '../assets/logoBackgroud.svg';
import logo from '../assets/appLogo.svg';
import dogFooter from '../assets/dogFooter.svg';
import dogFooter2 from '../assets/dogFooter2.svg';
import backGroudFooterImage from '../assets/backGroudLogoFooter.svg';
import AuthHeader from './AuthHeader';
import { Routes, Route } from 'react-router-dom';
import Appointment from './Appointment'; // Ensure Appointment is imported correctly

export default class AuthContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isAuthenticated: true, // Assuming you manage authentication state
        };
    }

    componentDidMount() {
        // Fetch data or handle authentication-related tasks here if needed
        if (this.state.isAuthenticated) {
            request('GET', '/messages', {})
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        this.setState({ data: response.data });
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
    }

    render() {
        const { logout, user } = this.props;
        const buttonText = user && user.role === 0 ? 'YOUR APPOINTMENT' : 'SCHEDULE APPOINTMENT';

        return (
            <div className="AuthHome">
                <AuthHeader logout={logout} />

                <img src={logoBackground} alt="Logo Background" style={{ position: 'absolute', top: '0', left: '0', zIndex: '100', height: '6rem', width: 'auto' }} />
                <img src={logo} alt="App Logo" style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: '100', height: '3rem', width: 'auto' }} />

                <div className="row justify-content-md-center mt-5">
                    <div className="row mt-5">
                        <div className="col-12 d-flex flex-column align-items-center" style={{ marginTop: 'rem', textAlign: 'center' }}>
                            <h1 style={{ fontWeight: 'bold' }}>
                                "Welcome to PawPal!<br />
                                Find the dog sitter for <br /> your furry friend.”
                            </h1>
                            <div className="mt-3">
                                <p style={{ fontSize: '1.5rem' }}>Because every dog deserves <br /> a new best friend.</p>
                                <button className="homeButton">{buttonText}</button>
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
                        <div className="col-3 d-flex flex-row-reverse bd-highlight ">
                            <img src={dogFooter} alt="Dog Footer" className="footerHomeDog1img" />
                            <img src={backGroudFooterImage} alt="Dog Footer" className="footerBackGroudLogo" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
