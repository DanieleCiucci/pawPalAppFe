import React from "react";
import '../App.css';

const InfoCareForm = ({ formData, handleChange, handleNext, handlePrev, userRole, handleFormSubmit, personalSitterDog  }) => {
    return (
        <div className="form-container mb-5">
            <div className="row">
                <div className="col-6 form-group">
                    <label>Can be left alone?</label>
                    <select
                        className="form-select"
                        name="dogInfoCare.idLeftAlone"
                        value={formData.dogInfoCare.idLeftAlone}
                        onChange={handleChange}>
                        <option>Select a choice</option>
                        <option value="0"> No</option>
                        <option value="1"> Yes</option>

                    </select>
                </div>
                <div className="col-6 form-group">
                    <label>Level of energy:</label>
                    <select
                        className="form-select"
                        name="dogInfoCare.idTypeOfEnergy"
                        value={formData.dogInfoCare.idTypeOfEnergy}
                        onChange={handleChange}>
                        {/* check the value in the db */}
                        <option selected>Level of energy</option>
                        <option value="0">Low</option>
                        <option value="1">Medium</option>
                        <option value="2">High</option>
                    </select>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-6 form-group">
                    <label>Feeds schedule</label>
                    <select
                        className="form-select"
                        name="dogInfoCare.idFeedsSchedule"
                        value={formData.dogInfoCare.idFeedsSchedule}
                        onChange={handleChange}>
                        <option selected>Needs schedule</option>
                        <option value="0"> each hours</option>
                        <option value="1"> > 1 hour</option>
                        <option value="2"> > 3 hours</option>
                        <option value="3"> every 8 hours</option>
                    </select>
                </div>
                <div className="col-6 form-group">
                    <label>Needs schedule</label>
                    <select
                        className="form-select"
                        name="dogInfoCare.idNeedsSchedule"
                        value={formData.dogInfoCare.idNeedsSchedule}
                        onChange={handleChange}>
                        <option selected>Select a choice</option>
                        <option value="0"> Morning</option>
                        <option value="1">Evening</option>
                        <option value="2">Twice daily</option>
                    </select>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-6 form-group">
                    <label>Medicines</label>
                    <select
                        className="form-select"
                        name="dogInfoCare.idCareDrugs"
                        value={formData.dogInfoCare.idCareDrugs}
                        onChange={handleChange}>
                        <option selected>Select a choice</option>
                        <option value="0">Pills</option>
                        <option value="1">Injection</option>
                        <option value="2">Ointment</option>
                    </select>
                </div>
            </div>
            <div className="form-floating col-12 mt-5 mb-3">
                <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="dogInfoCare.infoCareDetail"
                    name="dogInfoCare.infoCareDetail"
                    value={formData.dogInfoCare.infoCareDetail}
                    onChange={handleChange}
                    style={{height: "8rem"}}
                ></textarea>
                <label htmlFor="dogInfoCare.description">Comments</label>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={handlePrev}>Previous</button>

                        {!(userRole === 0 && !personalSitterDog) ? (

                            <button className="btn btn-primary" onClick={handleFormSubmit}>Insert dog</button>
                        ): (
                            <button className="btn btn-outline-primary customInsetDog" onClick={handleNext}>Next</button>

                    )}


                </div>
                </div>
            </div>

        </div>
    );
};

export default InfoCareForm;
