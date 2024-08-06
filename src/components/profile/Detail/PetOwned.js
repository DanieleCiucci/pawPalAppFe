import React from "react";
import defaultImg from "../../../assets/defaultImg.svg";
import { useNavigate } from "react-router-dom";

const PetOwned = ({ dogsOwned }) => {
    const navigate = useNavigate();

    // Ensure dogsOwned is a valid array
    const validDogsOwned = Array.isArray(dogsOwned) ? dogsOwned : [];

    // Function to handle navigation with state
    const handleDetailsClick = (dog) => {
        navigate(`/yourdogs/${dog.id}`, { state: { personalSitterDog: true } });
    };

    return (
        <div>
            <div className="row">
                {validDogsOwned.length > 0 ? (
                    validDogsOwned.map((dog, index) => (
                        <div key={index} className="col-lg-6 col-md-6 mb-4 d-flex justify-content-center">
                            <div className="card" style={{ width: '21rem' }}>
                                <img
                                    className="card-img-top"
                                    src={dog.image ? `data:image/jpeg;base64,${dog.image}` : defaultImg}
                                    alt={dog.name}
                                />
                                <div className="card-body">
                                    <p className="card-text"><strong>{dog.name}</strong></p>
                                    <p className="card-text">{dog.detail}</p>
                                    <div className="d-flex justify-content-end mt-3">
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleDetailsClick(dog)}
                                        >
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No dogs owned</p>
                )}
            </div>
        </div>
    );
}

export default PetOwned;
