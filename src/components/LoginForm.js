import React from 'react';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister,
        };
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
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
        );
    };

    setActiveTab = (tab) => {
        this.setState({ active: tab });
    };

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-4">
                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={classNames("nav-link", this.state.active === "login" ? "active" : "")}
                                id="tab-login"
                                onClick={() => this.setActiveTab("login")}
                            >
                                Login
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={classNames("nav-link", this.state.active === "register" ? "active" : "")}
                                id="tab-register"
                                onClick={() => this.setActiveTab("register")}
                            >
                                Register
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")}>
                            <form onSubmit={this.onSubmitLogin}>
                                <div className="form-outline mb-3">
                                    <input
                                        type="text"
                                        id="loginName"
                                        name="login"
                                        className="form-control"
                                        value={this.state.login}
                                        onChange={this.onChangeHandler}  // Add onChange handler here
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
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </form>
                        </div>

                        <div className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")}>
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
                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
