import React from 'react';
import WelcomeContent from "./WelcomeContent";
import AuthContent from "./AuthContent";
import LoginFormWrapper from "./LoginForm";
import { request, setAuthToken } from "../axios_helper";
import Buttons from "./Buttons";
import { Routes, Route, Navigate } from 'react-router-dom';
import Appointment from "./Appointment";
import YourDog from "./YourDog"
import InsertDog from "./insertDog/InsertDogForm";
import DogDetails from "./detailDog/DogDetails";

export default class AppContent extends React.Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');

        this.state = {
            componentToShow: token ? "messages" : "welcome",
            user: token && user ? JSON.parse(user) : null,
        };

        if (token) {
            setAuthToken(token);
        }
    }

    login = () => {
        this.setState({ componentToShow: "login" });
    }

    logout = () => {
        this.setState({ componentToShow: "welcome", user: null });
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }

    onLogin = (e, username, password, callback) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            { login: username, password: password }
        ).then((response) => {
            const user = { username, role: response.data.role };
            this.setState({ componentToShow: "messages", user }, callback);
            setAuthToken(response.data.token);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(user));
        }).catch((error) => {
            this.setState({ componentToShow: "welcome" });
        })
    }

    onRegister = (e, firstName, lastName, login, password, role, callback) => {
        e.preventDefault();
        request(
            "POST",
            "/register",
            { firstName, lastName, login, password, role }
        ).then((response) => {
            const user = { username: login, role };
            this.setState({ componentToShow: "messages", user }, callback);
            setAuthToken(response.data.token);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(user));
        }).catch((error) => {
            this.setState({ componentToShow: "welcome" });
        })
    }

    render() {
        const { componentToShow, user } = this.state;

        return (
            <div>
                {componentToShow !== "messages" && <Buttons login={this.login} logout={this.logout} />}
                <Routes>
                    <Route path="/" element={<WelcomeContent />} />
                    <Route path="/auth" element={user ? <AuthContent logout={this.logout} user={user} /> : <Navigate to="/" />} />
                    <Route path="/appointment" element={user ? <Appointment /> : <Navigate to="/" /> }/>

                    <Route path="/yourdogs" element={user ? <YourDog logout={this.logout} user={user} /> : <Navigate to="/" />}/>
                    <Route path="/yourdogs/insert" element={user ? <InsertDog /> : <Navigate to="/" />} />

                    <Route path="/findnewowner" element={user ? <div>Find a New Owner Component</div> : <Navigate to="/" />}/>
                    <Route path="/profile" element={user ? <div>Profile Component</div> : <Navigate to="/" />} />
                    <Route path="/yourdogs/:id" element={<DogDetails />} />
                </Routes>
                {componentToShow === "login" && <LoginFormWrapper onLogin={this.onLogin} onRegister={this.onRegister} />}
            </div>
        );
    }
}
