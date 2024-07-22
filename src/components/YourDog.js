import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthHeader from "./AuthHeader";
import imageCard from "../assets/dog1.jpg"; // Placeholder image

const YourDog = (props) => {
    const [data, setData] = React.useState([]);
    const [isAuthenticated, setIsAuthenticated] = React.useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDogs = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch("http://localhost:8080/api/dog/all-dog-sitter", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseBody = await response.text();
                const data = responseBody ? JSON.parse(responseBody) : [];
                console.log("Fetched data:", data);
                setData(data); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error, e.g., show an error message
            }
        };

        fetchDogs();
    }, []);

    const handleInsertDog = () => {
        navigate("/yourdogs/insert");
    };

    const { logout, user } = props;

    return (
        <div className="AuthHome">
            <AuthHeader logout={logout} />
            <div className="row">
                <div className="col-2"></div>
                <div className="col-5 m-lg-5">
                    <h1 style={{ fontWeight: 'bold' }}>
                        Your dog to assist
                    </h1>
                    <div className="mt-2">
                        <p style={{ fontSize: '1rem', color: '#686565' }}>
                            In this section you can view the dog to assist that you insert. <br />
                            You can insert a dog with the button Insert new dog.
                        </p>
                    </div>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                    <button className="homeButton" onClick={handleInsertDog}>Insert dog</button>
                </div>
            </div>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="row">
                        {data.length > 0 ? (
                            data.map((dog, index) => (
                                <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img
                                            className="card-img-top"
                                            src={dog.dogImage ? `data:image/jpeg;base64,${dog.dogImage}` : imageCard}
                                            alt="Dog"
                                        />
                                        <div className="card-body">
                                            <p className="card-text"><strong>{dog.dogName}</strong></p>
                                            <p className="card-text">{dog.dogBreeds} owner: {dog.ownerName} {dog.ownerSurname}</p>
                                            <p className="card-text">{dog.dogDescription}</p>
                                            <div className="d-flex justify-content-end">
                                                <a href="#" className="btn btn-outline-primary">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <p>No dogs available.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YourDog;
