import * as React from "react";
import {Link, Route, Routes} from "react-router-dom";
import Appointment from "./Appointment";

function AuthHeader({logout}) {
    return (

        <div className="container">
            <div className="row">
            <div className="col-2"> </div>
            <div className="col-8">
            <header className="py-3 mb-4">

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center  customHeader p-2 mt-3">
                    <li><Link to="/#" className="nav-link link-secondary">Home</Link></li>
                    <li><Link to="/appointment" className="nav-link link-dark">Appointment</Link></li>
                    <li><Link to="/yourdogs" className="nav-link link-dark">Your Dogs</Link></li>
                    <li><Link to="/findnewowner" className="nav-link link-dark">Find a new owner</Link></li>
                    <li><Link to="/profile" className="nav-link link-dark">Profile</Link></li>
                </ul>


            </header>
            </div>
                <div className="col-2">
                    <div className="col-md-3 text-end mt-3">
                        <button onClick={logout} className="btn btn-sm btn-dark btn-custom-logout">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthHeader;