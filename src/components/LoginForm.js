import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "login", // Tracks the active form (login/register)
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            role: 0,
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

                                <div className="d-flex d-inline-flex mt-2">
                                    <a href="#" onClick={() => this.setActiveTab("login")}>Back to login</a>
                                </div>

                            </form>
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
