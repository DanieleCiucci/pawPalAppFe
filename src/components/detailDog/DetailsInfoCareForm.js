import * as React from "react";
import { useState } from "react";
import infoIcon from "../../assets/infoIcon.svg";
import InfoCarePopUp from "./PopUp/InfoCarePopUp";
import NeedsScheduleIcon from "../../assets/NeedsScheduleIcon.svg"
import FeedScheduleIcon from  "../../assets/FeedsScheduleIcon.svg"
import LevelOfEnergyIcon from "../../assets/LevelOfEnergyIcon.svg"

const DetailInfoCareForm = (props) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleIconClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="row mt-5">
            <div className="col-12 boxGeneralInfo position-relative">
                <div className="generalInfoContainer mt-4">

                    <div className="d-flex align-items-center m-2">
                        <img src={infoIcon} alt="info icon"/>
                        <h5 className="p-3 mb-0"><strong>Info About Care</strong></h5>
                    </div>
                    <i
                        className="bi bi-pencil fs-5 position-absolute"
                        style={{top: '1rem', right: '0rem', cursor: 'pointer'}}
                        onClick={handleIconClick}
                    ></i>

                    <div className="row m-1">
                        <div className="col-4">

                            <div className="d-flex align-items-center mt-2">
                                <img src={NeedsScheduleIcon} alt="needs schedule icon"/>
                                <p className="p-3 mb-0"><strong>Needs schedule:</strong> {props.dog.idNeedsSchedule}</p>
                            </div>

                        </div>
                        <div className="col-8 mt-4">
                            <p><strong>Medicines: </strong> {props.dog.idCareDrugs} </p>
                        </div>
                    </div>

                    <div className="row m-1">
                        <div className="col-4">
                            <div className="d-flex align-items-center">
                                <img src={FeedScheduleIcon} alt="needs schedule icon"/>
                                <p className="p-3 mb-0"><strong>Feed schedule: </strong> {props.dog.idFeedsSchedule}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row m-1">
                        <div className="col-4">
                            <div className="d-flex align-items-center">
                                <img src={LevelOfEnergyIcon} alt="level of enenergy icon"/>
                                <p className="p-3 mb-0"><strong>Level of Energy: </strong> {props.dog.idTypeOfEnergy}</p>
                            </div>
                        </div>
                    </div>


                    <div className="col-12 p-3">
                        <p><strong>Is there anything else that should be known?</strong></p>
                        <p>{props.dog.infoCareDetail}</p>
                    </div>


                </div>
            </div>

            <div className="col-1"></div>

            <InfoCarePopUp show={showPopup} handleClose={handleClosePopup} dog={props.dog}/>
        </div>
    );
}

export default DetailInfoCareForm;
