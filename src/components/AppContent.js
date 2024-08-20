import React from 'react';
import WelcomeContent from "./WelcomeContent";
import AuthContent from "./AuthContent";
import {setAuthToken } from "../axios_helper";
import { Routes, Route, Navigate } from 'react-router-dom';
import YourDog from "./YourDog"
import InsertDog from "./insertDog/InsertDogForm";
import DogDetails from "./detailDog/DogDetails";
import  FindNewOwner from "./FindNewOwner"
import Profile from "./profile/Profile";
import Appointment from "./appointment/Appointment";
import ScheduleAppointment from "./appointment/ScheudleAppointment";
import SessionExpired from "./SessionExpired";

export default class AppContent extends React.Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');

        this.state = {
            user: token && user ? JSON.parse(user) : null,
        };

        if (token) {
            setAuthToken(token);
        }
    }

    setUser = (user) => {
        this.setState({ user });
    }

    logout = () => {
        this.setState({ user: null });
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }

    render() {
        const { user } = this.state;

        return (
            <div>
                <Routes>
                    <Route path="/" element={<WelcomeContent setUser={this.setUser} />} />
                    <Route path="/auth" element={user ? <AuthContent logout={this.logout} user={user} /> : <Navigate to="/" />} />


                    <Route path="/session-expired" element={<SessionExpired />} />

                    <Route path="/appointment/schedule-appointment" element={user ? <ScheduleAppointment logout={this.logout} user={user}  />  : <Navigate to="/" />} />
                    <Route path="/appointment" element={user ? <Appointment logout={this.logout} user={user} />  : <Navigate to="/" />}/>
                    <Route path="/profile/:sitterId" element={user ?<Profile logout={this.logout} user={user} /> :<Navigate to="/" />} />

                    <Route path="/yourdogs" element={user ? <YourDog logout={this.logout} user={user} /> : <Navigate to="/" />}/>
                    <Route path="/yourdogs/insert" element={user ? <InsertDog logout={this.logout} user={user} /> : <Navigate to="/" />} />

                    <Route path="/findnewowner" element={user ? <FindNewOwner logout={this.logout} user={user} /> : <Navigate to="/" />}/>
                    <Route path="/profile" element={user ? <Profile logout={this.logout} user={user} /> : <Navigate to="/" />} />
                    <Route path="/yourdogs/:id" element={<DogDetails logout={this.logout} user={user} />} />

                </Routes>
            </div>
        );
    }
}
