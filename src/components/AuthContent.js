import React from 'react';
import { request } from '../axios_helper';
import dogFooter from '../assets/dogFooter.svg';
import dogFooter2 from '../assets/dogFooter2.svg';
import backGroudFooterImage from '../assets/backGroudLogoFooter.svg';
import AuthHeader from './AuthHeader';

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
            <div className="container">
                <AuthHeader logout={logout} />
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
