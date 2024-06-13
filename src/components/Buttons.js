import * as React from 'react';

function Buttons(props) {
    return (
        <div className="row ButtonBack">
            <div className="col-md-12 d-flex justify-content-end">
                <button onClick={props.login} className="btn btn-primary" style={{margin: "10px"}}>
                    Login
                </button>
                <button onClick={props.logout} className="btn btn-dark btn-custom-logout" style={{margin: "10px"}}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Buttons;
