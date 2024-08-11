import React, { useEffect, useState } from "react";
import infoIcon from "../../../assets/infoIcon.svg";
import phoneIcon from "../../../assets/phoneIcon.svg";
import mailIcon from "../../../assets/mailIcon.svg";
import AboutProfilePopUp from "../PopUp/AboutProfilePopUp";
import ProfileMap from "./ProfileMap";
import GeneralInfoPopUp from "../PopUp/GeneralInfoPopUp";
import { fetchUserRole } from "../../../services/roleSerivces";


import AboutProfileOwnerPopUp from "../PopUp/AboutProfileOwnerPopUp"

const GeneralInfoProfile = (props) => {
    const [userRole, setUserRole] = useState(null);
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

    useEffect(() => {
        const initializePage = async () => {
            try {
                // Fetch user role
                const role = await fetchUserRole();
                if (role !== null) {
                    setUserRole(role);
                }
            } catch (error) {
                console.error("Error during page initialization:", error);
            }
        };

        initializePage();
    }, []);


    return (
        <div className="row mt-5">
            <div className="col-5 boxGeneralInfo position-relative">
                {!props.sitterId && (
                    <i
                        className="bi bi-pencil fs-5 position-absolute"
                        style={{ top: '-1rem', right: '0rem', cursor: 'pointer' }}
                        onClick={handleLocationIconClick}
                    ></i>
                )}
                <div className="generalInfoContainer">
                    <h5 className="p-3"><strong>Location & General info</strong></h5>

                    <div className="row p-4 position-relative">
                        <ProfileMap profile={props.profile} />
                        <div className="addressBox">
                            {props.profile.address}
                        </div>
                    </div>

                    <div className="row p-3">
                        <div className="d-flex align-items-center">
                            <img
                                src={infoIcon}
                                alt="info icon"
                                style={{ height: '1.5rem' }}
                            />
                            <p className="p-3 mb-0"> {props.profile.addressInfo}</p>
                        </div>

                        <div className="d-flex align-items-center">
                            <img
                                src={phoneIcon}
                                alt="phone icon"
                                style={{ height: '1.5rem' }}
                            />
                            <p className="p-3 mb-0"> {props.profile.phoneNumber}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <img
                                src={mailIcon}
                                alt="mail icon"
                                style={{ height: '1.25rem' }}
                            />
                            <p className="p-3 mb-0"> {props.profile.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-1"></div>

            <div className="col-6 boxPhoto position-relative">
                {!props.sitterId && (
                    <i
                        className="bi bi-pencil fs-5 position-absolute"
                        style={{ top: '-1rem', right: '0rem', cursor: 'pointer' }}
                        onClick={handleOwnerIconClick}
                    ></i>
                )}
                <div className="photoGallery">
                    <div className="row">
                        <div className="col-8">
                            <div className="d-flex align-items-center m-2">
                                <img src={infoIcon} alt="info icon"/>
                                <h5 className="p-3 mb-0"><strong>Personal Information</strong></h5>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2">
                        <p><strong>About me</strong></p>
                        {(userRole === 0 && !props.sitterId) || props.sitterId ? (
                        <p className="mb-2">{props.profile.aboutSitter}</p>
                        ): (
                            <p className="mb-2">{props.profile.aboutOwner}</p>
                        )}

                    </div>
                    <div className="row m-2">
                        <p><strong>Personal note about the owner</strong></p>
                        {(userRole === 0 && !props.sitterId) || props.sitterId ? (
                        <p className="mb-3">{props.profile.preferencesAboutDog}</p>
                        ):(
                            <p className="mb-2">{props.profile.personalNoteAboutOwner}</p>
                        )}

                    </div>
                </div>
            </div>

            {
                //if the role is sitter else show the owner components pop up
            }
            {(showOwnerPopup && userRole === 0 ) && (
                <AboutProfilePopUp show={showOwnerPopup} handleClose={handleCloseOwnerPopup} profile={props.profile} />
            )}
            {(showOwnerPopup && userRole === 1 ) && (
                <AboutProfileOwnerPopUp show={showOwnerPopup} handleClose={handleCloseOwnerPopup} profile={props.profile} />
            )}
            {showLocationPopup && (
                <GeneralInfoPopUp show={showLocationPopup} handleClose={handleCloseLocationPopup} profile={props.profile} />
            )}
        </div>
    );
};

export default GeneralInfoProfile;
