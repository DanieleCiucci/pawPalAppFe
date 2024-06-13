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
        };
    }

    login = () => {
        this.setState({ componentToShow: "login" });
    }

    logout = () => {
        this.setState({ componentToShow: "welcome" });
    }

    onLogin = (e, username, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            { login: username, password: password }
        ).then((response) => {
            this.setState({ componentToShow: "messages" });
            setAuthToken(response.data.token);
        }).catch((error) => {
            this.setState({ componentToShow: "welcome" });
        })
    }

    onRegister = (e, firstName, lastName, login, password) => {
        e.preventDefault();
        request(
            "POST",
            "/register",
            { firstName: firstName, lastName: lastName, login, password: password }
        ).then((response) => {
            this.setState({ componentToShow: "messages" });
            setAuthToken(response.data.token);
        }).catch((error) => {
            this.setState({ componentToShow: "welcome" });
        })
    }

    render() {
        const { componentToShow } = this.state;

        return (
            <div>
                {componentToShow !== "messages" && <Buttons login={this.login} logout={this.logout} />}
                {componentToShow === "welcome" && <WelcomeContent />}
                {componentToShow === "messages" && <AuthContent logout={this.logout}/>}
                {componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
            </div>
        );
    }
}
