import * as React from "react";
import { useState } from "react";
import AboutOwnerPopUp from "./PopUp/AboutOnwerPopUp";
import defaultImgMap from "../../assets/ownerMapMock.png";
import infoIcon from "../../assets/infoIcon.svg";
import phoneIcon from "../../assets/phoneIcon.svg";
import mailIcon from "../../assets/mailIcon.svg";
import LocationAndGeneralInfoPopUp from "./PopUp/LocationAndGeneralInfoPopUp";

const DetailsOwnerInfoForm = (props) => {
    const [showOwnerPopup, setShowOwnerPopup] = useState(false);
    const [showLocationPopup, setShowLocationPopup] = useState(false);

    const handleOwnerIconClick = () => {
        setShowOwnerPopup(true);
    };

    const handleLocationIconClick = () => {
        setShowLocationPopup(true);
    };

    const handleCloseOwnerPopup = () => {
        setShowOwnerPopup(false);
    };

    const handleCloseLocationPopup = () => {
        setShowLocationPopup(false);
    };

    return (
        <div className="row mt-5">
            <div className="col-sm-8 mx-auto  center-block col-md-5 boxGeneralInfo position-relative">
                <i
                    className="bi bi-pencil fs-5 position-absolute"
                    style={{ top: '-1rem', right: '0rem', cursor: 'pointer' }}
                    onClick={handleLocationIconClick}
                ></i>
                <div className="generalInfoContainer">
                    <h5 className="p-3"><strong>Location & General info</strong></h5>

                    <div className="row p-4 position-relative">
                        <img
                            src={defaultImgMap}
                            alt="Dog"
                            style={{
                                height: '9rem',
                                width: '100%',
                                borderRadius: '8px',
                                objectFit: 'cover'
                            }}
                        />
                        <div className="addressBox">
                            {props.dog.address + ", " + props.dog.city}
                        </div>
                    </div>

                    <div className="row p-3">
                        <div className="d-flex align-items-center">
                            <img
                                src={infoIcon}
                                alt="info icon"
                                style={{
                                    height: '1.5rem',
                                    alignItems: 'baseline'
                                }}
                            />
                            <p className="p-3 mb-0"> {props.dog.addressInfo}</p>
                        </div>

                        <div className="d-flex align-items-center">
                            <img
                                src={phoneIcon}
                                alt="phone icon"
                                style={{
                                    height: '1.5rem',
                                }}
                            />
                            <p className="p-3 mb-0"> {props.dog.phoneNumber}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <img
                                src={mailIcon}
                                alt="mail icon"
                                style={{
                                    height: '1.25rem',
                                }}
                            />
                            <p className="p-3 mb-0"> {props.dog.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-1 d-none d-mg-block"></div>

            <div className="col-md-6 col-sm-8 mx-auto  center-block boxPhoto position-relative">
                <i
                    className="bi bi-pencil fs-5 position-absolute"
                    style={{ top: '-1rem', right: '0rem', cursor: 'pointer' }}
                    onClick={handleOwnerIconClick}
                ></i>
                <div className="photoGallery">
                    <div className="row">
                        <div className="col-8">
                            <div className="d-flex align-items-center m-2">
                                <img src={infoIcon} alt="info icon"/>
                                <h5 className="p-3 mb-0"><strong>Owner Information</strong></h5>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2">
                        <p><strong>About {props.dog.ownerName}</strong></p>
                        <p>{props.dog.aboutOwner}</p>
                    </div>
                    <div className="row m-2">
                        <p><strong>Personal note about the owner</strong></p>
                        <p>{props.dog.personalNoteAboutOwner}</p>
                    </div>
                </div>
            </div>

            {showOwnerPopup && (
                <AboutOwnerPopUp show={showOwnerPopup} handleClose={handleCloseOwnerPopup} dog={props.dog}/>
            )}
            {showLocationPopup && (
                <LocationAndGeneralInfoPopUp show={showLocationPopup} handleClose={handleCloseLocationPopup} dog={props.dog}/>
            )}

        </div>
    );
}

export default DetailsOwnerInfoForm;
