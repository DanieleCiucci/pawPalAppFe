import * as React from 'react';
import WelcomeContent from "./WelcomeContent";
import AuthContent from "./AuthContent";
import LoginForm from "./LoginForm";
import { request, setAuthToken } from "../axios_helper";
import Buttons from "./Buttons";

export default class AppContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            componentToShow: "welcome",
            user: null,  // Add user to the state
        };
    }

    login = () => {
        this.setState({ componentToShow: "login" });
    }

    logout = () => {
        this.setState({ componentToShow: "welcome", user: null });
    }

    onLogin = (e, username, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            { login: username, password: password }
        ).then((response) => {
            const user = { username, role: response.data.role };  // Assume role is returned in response
            this.setState({ componentToShow: "messages", user });
            setAuthToken(response.data.token);
        }).catch((error) => {
            this.setState({ componentToShow: "welcome" });
        })
    }

    onRegister = (e, firstName, lastName, login, password, role) => {
        e.preventDefault();
        request(
            "POST",
            "/register",
            { firstName, lastName, login, password, role }
        ).then((response) => {
            const user = { username: login, role };  // Set user details
            this.setState({ componentToShow: "messages", user });
            setAuthToken(response.data.token);
        }).catch((error) => {
            this.setState({ componentToShow: "welcome" });
        })
    }

    render() {
        const { componentToShow, user } = this.state;

        return (
            <div>
                {componentToShow !== "messages" && <Buttons login={this.login} logout={this.logout} />}
                {componentToShow === "welcome" && <WelcomeContent />}
                {componentToShow === "messages" && <AuthContent logout={this.logout} user={user} />}  {/* Pass user as a prop */}
                {componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
            </div>
        );
    }
}
