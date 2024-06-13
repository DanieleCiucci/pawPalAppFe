import * as React from "react";


function AuthHeader({logout}) {
    return (

        <div className="container">
            <div className="row">
            <div className="col-2"> </div>
            <div className="col-8">
            <header className="py-3 mb-4">

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center  customHeader p-2 mt-3">
                    <li><a href="#" className="nav-link link-secondary">Home</a></li>
                    <li><a href="#" className="nav-link  link-dark">Appointment</a></li>
                    <li><a href="#" className="nav-link  link-dark">Your Dogs</a></li>
                    <li><a href="#" className="nav-link  link-dark">Find a new owner</a></li>
                    <li><a href="#" className="nav-link  link-dark">Profile</a></li>
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