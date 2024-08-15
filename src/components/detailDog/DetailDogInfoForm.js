import * as React from "react";
import { useState } from "react";
import GeneralInfoPopUp from "./PopUp/GeneralInfoPopUp";

const DetailDogInfoForm = (props) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleIconClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="row mt-5">
            <div className="col-12 col-lg-6 boxGeneralInfo position-relative">
                {! props.canNotEdit && (
                <i className="bi bi-pencil fs-5 position-absolute" style={{ top: '-1rem', right: '0rem', cursor: 'pointer' }} onClick={handleIconClick}></i>
                )}
                <div className="generalInfoContainer">
                    <h5 className="p-3"><strong> General information </strong></h5>

                    <div className="row p-3 mt-4">
                        <div className="col-6">
                            <p><strong>Age in years: </strong> {props.dog.ageInYear}</p>
                        </div>
                        <div className="col-6">
                            <p><strong>Age in month: </strong> {props.dog.ageMonth}</p>
                        </div>
                    </div>

                    <div className="row p-3">
                        <div className="col-6">
                            <p><strong>Weight in kilogram: </strong> {props.dog.weight}</p>
                        </div>
                        <div className="col-6">
                            <p><strong>Gender: </strong> {props.dog.idGender}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-1"></div>

            {/*
            <div className="col-5 boxPhoto">
                <div className="photoGallery">
                    <div className="row">
                        <div className="col-8">
                            <h5 className="p-3"><strong> Photo gallery </strong></h5>
                        </div>
                        <div className="col-4 p-3">
                            <a href="#" className="seeAllCopy">See all</a>
                        </div>
                    </div>

                    <div className="row p-2">
                        <div className="col-6 mb-4">
                            <img src="https://via.placeholder.com/150" alt="Placeholder 1" className="img-fluid" />
                        </div>
                        <div className="col-6 mb-4">
                            <img src="https://via.placeholder.com/150" alt="Placeholder 2" className="img-fluid" />
                        </div>
                        <div className="col-6 mb-4">
                            <img src="https://via.placeholder.com/150" alt="Placeholder 3" className="img-fluid" />
                        </div>
                        <div className="col-6 mb-4">
                            <img src="https://via.placeholder.com/150" alt="Placeholder 4" className="img-fluid" />
                        </div>
                        <div className="col-6 mb-4">
                            <img src="https://via.placeholder.com/150" alt="Placeholder 4" className="img-fluid" />
                        </div>
                        <div className="col-6 mb-4">
                            <img src="https://via.placeholder.com/150" alt="Placeholder 4" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
            */}

            <GeneralInfoPopUp show={showPopup} handleClose={handleClosePopup} dog={props.dog} />
        </div>
    );
}

export default DetailDogInfoForm;
