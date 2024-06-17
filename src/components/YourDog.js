import * as React from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "./AuthHeader";




const YourDog = (props) => {
    const [data, setData] = React.useState([]);
    const [isAuthenticated, setIsAuthenticated] = React.useState(true);
    const navigate = useNavigate();

    const handleInsertDog = () => {
        navigate("/yourdogs/insert");
    }

    const { logout, user } = props;
    return (
        <div className="AuthHome">
            <AuthHeader logout={logout}/>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-5 m-lg-5">
                    <h1 style={{fontWeight: 'bold'}}>
                        Your dog to assist
                    </h1>
                    <div className="mt-2">
                        <p style={{fontSize: '1rem', color:'#686565'}}>
                            In this section you can view the dog to assist that you insert. <br />
                            You can insert a dog with the button Insert new dog.
                        </p>
                    </div>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                    <button className="homeButton" onClick={handleInsertDog}>Insert dog</button>
                </div>
            </div>
        </div>
    )
}

export default YourDog;
