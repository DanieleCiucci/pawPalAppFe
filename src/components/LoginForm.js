import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            role: 0,
            showCookiePopup: !localStorage.getItem('cookieConsent'),  // Show popup if no consent is stored
            onLogin: props.onLogin,
            onRegister: props.onRegister,
        };
    }

    onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({ [name]: value });
    };

    onRoleChangeHandler = (event) => {
        this.setState({ role: event.target.value });
    };

    onSubmitLogin = (e) => {
        e.preventDefault();
        this.state.onLogin(e, this.state.login, this.state.password);
    };

    onSubmitRegister = (e) => {
        e.preventDefault();
        this.state.onRegister(
            e,
            this.state.firstName,
            this.state.lastName,
            this.state.login,
            this.state.password,
            parseInt(this.state.role)
        );
    };

    setActiveTab = (tab) => {
        this.setState({ active: tab });
    };

    handleAcceptCookies = () => {
        // Set consent in localStorage to prevent showing the pop-up again
        localStorage.setItem('cookieConsent', 'true');
        this.setState({ showCookiePopup: false });
    };

    render() {
        return (
            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-9">
                    {this.state.active === "login" ? (
                        <div>
                            <form onSubmit={this.onSubmitLogin}>
                                <div className="form-outline mb-3">
                                    <input
                                        type="text"
                                        id="loginName"
                                        name="login"
                                        className="form-control"
                                        value={this.state.login}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="loginName">Username</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="loginPassword"
                                        name="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="loginPassword">Password</label>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary btn-block loginButton">Login</button>

                                        <div className="d-flex d-inline-flex mt-2">
                                            <p className="me-3">Don't have an account?</p>
                                            <a href="#" onClick={() => this.setActiveTab("register")}>Register</a>
                                        </div>

                                        {/* Privacy Policy Link */}
                                        <div className="mt-2">
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#privacyPolicyModal">
                                                Privacy Policy
                                            </a>
                                        </div>

                                        {/* Cookies Policy Link */}
                                        <div className="mt-2">
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#cookiesPolicyModal">
                                                Cookies Policy
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <form onSubmit={this.onSubmitRegister}>
                                <div className="form-outline mb-3">
                                    <input
                                        type="text"
                                        id="registerFirstName"
                                        name="firstName"
                                        className="form-control"
                                        value={this.state.firstName}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="registerFirstName">First Name</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="text"
                                        id="registerLastName"
                                        name="lastName"
                                        className="form-control"
                                        value={this.state.lastName}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="registerLastName">Last Name</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="text"
                                        id="registerLogin"
                                        name="login"
                                        className="form-control"
                                        value={this.state.login}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="registerLogin">Username</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="registerPassword"
                                        name="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="registerPassword">Password</label>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        type="radio"
                                        id="roleSitter"
                                        name="role"
                                        className="form-check-input"
                                        value="0"
                                        checked={this.state.role === "0"}
                                        onChange={this.onRoleChangeHandler}
                                    />
                                    <label className="form-check-label" htmlFor="roleSitter">Sitter</label>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        type="radio"
                                        id="roleOwner"
                                        name="role"
                                        className="form-check-input"
                                        value="1"
                                        checked={this.state.role === "1"}
                                        onChange={this.onRoleChangeHandler}
                                    />
                                    <label className="form-check-label" htmlFor="roleOwner">Owner</label>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary btn-block loginButton">
                                            Register
                                        </button>

                                        <div className="d-flex d-inline-flex mt-2">
                                            <a href="#" onClick={() => this.setActiveTab("login")}>Back to login</a>
                                        </div>

                                        {/* Privacy Policy Link */}
                                        <div className="mt-2">
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#privacyPolicyModal">
                                                Privacy Policy
                                            </a>
                                        </div>

                                        {/* Cookies Policy Link */}
                                        <div className="mt-2">
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#cookiesPolicyModal">
                                                Cookies Policy
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Privacy Policy Modal */}
                    <div className="modal fade" id="privacyPolicyModal" tabIndex="-1" aria-labelledby="privacyPolicyLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="privacyPolicyLabel">Privacy Policy</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        <strong>Privacy Policy for PawPal</strong>
                                    </p>
                                    <p>
                                        At PawPal, we are committed to safeguarding the privacy of our users. All personal data collected
                                        through our platform is compliant with the latest Data Protection Act. We ensure that your data is
                                        securely stored and only accessible to registered users of the PawPal platform.
                                    </p>
                                    <p>
                                        <strong>Data Collection:</strong> We collect personal data including, but not limited to, your name,
                                        email, login credentials, and any data voluntarily provided during registration and usage of our
                                        services.
                                    </p>
                                    <p>
                                        <strong>Data Usage:</strong> Your data is used exclusively to enhance your experience within the
                                        PawPal platform. No data will be shared with third parties without your explicit consent.
                                    </p>
                                    <p>
                                        <strong>Data Access:</strong> Only registered users within the platform, such as pet owners or
                                        sitters, can view relevant profile data. We take precautions to prevent unauthorized access.
                                    </p>
                                    <p>
                                        <strong>Data Protection:</strong> PawPal uses industry-standard security measures to protect your
                                        data. However, it is your responsibility to ensure your login credentials remain confidential.
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cookies Policy Modal */}
                    <div className="modal fade" id="cookiesPolicyModal" tabIndex="-1" aria-labelledby="cookiesPolicyLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="cookiesPolicyLabel">Cookies Policy</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        <strong>Cookies Policy for PawPal</strong>
                                    </p>
                                    <p>
                                        At PawPal, we respect your privacy. Our platform only uses technical cookies that are necessary
                                        for the operation of the website. These cookies help provide essential features, such as keeping
                                        you logged in and saving your preferences during your session.
                                    </p>
                                    <p>
                                        <strong>No Tracking Cookies:</strong> PawPal does not use cookies for tracking users' browsing
                                        behavior or for advertising purposes. We value your privacy and ensure that no data is collected
                                        beyond what is necessary for platform functionality.
                                    </p>
                                    <p>
                                        By using our platform, you agree to the use of these necessary technical cookies.
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cookie Consent Pop-up */}
                    {this.state.showCookiePopup && (
                        <div className="cookie-popup" style={{
                            position: 'fixed',
                            bottom: '10px',
                            width: '100%',
                            backgroundColor: '#f8f9fa',
                            padding: '15px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            zIndex: '1000',
                            textAlign: 'center'
                        }}>
                            <p>We only use technical cookies necessary for the platform to function. <a href="#" data-bs-toggle="modal" data-bs-target="#cookiesPolicyModal">Read more</a></p>
                            <button className="btn btn-primary" onClick={this.handleAcceptCookies}>I Accept</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const LoginFormWrapper = (props) => {
    const navigate = useNavigate();

    const handleLogin = (e, username, password) => {
        props.onLogin(e, username, password, () => navigate('/auth'));
    };

    const handleRegister = (e, firstName, lastName, login, password, role) => {
        props.onRegister(e, firstName, lastName, login, password, role, () => navigate('/auth'));
    };

    return <LoginForm {...props} onLogin={handleLogin} onRegister={handleRegister} />;
};

export default LoginFormWrapper;
