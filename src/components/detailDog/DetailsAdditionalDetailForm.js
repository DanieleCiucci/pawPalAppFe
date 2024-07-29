import * as React from "react";
import { useState } from "react";
import infoIcon from "../../assets/infoIcon.svg";
import AdditionalDetailPopUp from "./PopUp/AdditionalDetailPopUp";

const DetailAddtionalDetailForm = (props) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleIconClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    // Function to format date
    const formatDate = (timestamp) => {
        if (timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleDateString(); // Formats the date in a locale-sensitive format
        }
        return "N/A"; // Fallback if timestamp is not provided
    };

    return (
        <div className="row mt-5">
            <div className="col-12 boxGeneralInfo position-relative">
                <div className="generalInfoContainer mt-4">

                    <div className="d-flex align-items-center m-2">
                        <img src={infoIcon} alt="info icon"/>
                        <h5 className="p-3 mb-0"><strong>Additional Details</strong></h5>
                    </div>
                    <i
                        className="bi bi-pencil fs-5 position-absolute"
                        style={{top: '1rem', right: '0rem', cursor: 'pointer'}}
                        onClick={handleIconClick}
                    ></i>

                    <div className="row p-3">
                        <div className="col-4">
                            <p><strong>Does it relieve itself outside: </strong> {props.dog.needsOutside}</p>
                        </div>
                        <div className="col-4">
                            <p><strong>Date of birth: </strong> {formatDate(props.dog.dateOfBirdth)}</p>
                        </div>
                        <div className="col-4">
                            <p><strong>Date of adoption: </strong> {formatDate(props.dog.dateAdoption)}</p>
                        </div>
                    </div>

                    <div className="row p-3">
                        <div className="col-4">
                            <p><strong>Gets along with cat: </strong> {props.dog.getAlongWellWithOtherCat}</p>
                        </div>
                        <div className="col-4">
                            <p><strong>Gets along with other dogs: </strong> {props.dog.getAlongWellWithOtherDog}</p>
                        </div>
                        <div className="col-4">
                            <p><strong>Gets along with children: </strong> {props.dog.getAlongWellWithChildren}</p>
                        </div>
                    </div>


                    <div className="col-12 p-3">
                        <p><strong>About the dog:</strong></p>
                        <p>{props.dog.additionalDetail}</p>
                    </div>


                </div>
            </div>

            <div className="col-1"></div>

            <AdditionalDetailPopUp show={showPopup} handleClose={handleClosePopup} dog={props.dog}/>
        </div>
    );
}

export default DetailAddtionalDetailForm;
