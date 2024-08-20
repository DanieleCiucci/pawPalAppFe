
import * as React from "react";

import mainImage from '../assets/mainImageHome.svg'


export default class WelcomeContent extends React.Component {

    render() {
        return(
            <div className="row justify-content-md-center">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">

                        <div className="row mainLoginBg p-5 m-5">

                            <div className="col-6">
                                <h1>
                                    Welcome back <br /> to PawPal
                                </h1>
                                <p> Please enter your details.</p>
                            </div>


                            <div className="col-6">
                                <img src={mainImage} alt="Background Footer" className="footerBackGroudLogo" />
                            </div>

                        </div>




                    </div>
                </div>
            </div>
        )
    }
}