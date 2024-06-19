import React from "react";
import '../App.css';

const InfoCareForm = ({ formData, handleChange }) => {
    return (
        <div className="form-container">
            <div className="row">
                <div className="col-6 form-group">
                    <label>Needs schedule:</label>
                    <select
                        className="form-select"
                        name="dog.idSchedule"
                        value={formData.dog.idSchedule}
                        onChange={handleChange}>
                        {/* check the value in the db */}
                        <option>Select a choice</option>
                        <option value="0"> each hours</option>
                        <option value="1"> > 1 hour </option>
                        <option value="1"> > 3 hours </option>
                        <option value="1"> every 8 hours</option>
                    </select>
                </div>
                <div className="col-6 form-group">
                    <label>Level of energy:</label>
                    <select
                        className="form-select"
                        name="dog.idEnergy"
                        value={formData.dog.idEnergy}
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
                        name="dog.idFeeds"
                        value={formData.dog.idFeeds}
                        onChange={handleChange}>
                        <option selected>Needs schedule</option>
                        <option value="0"> each hours</option>
                        <option value="1"> > 1 hour</option>
                        <option value="1"> > 3 hours</option>
                        <option value="1"> every 8 hours</option>
                    </select>
                </div>
                <div className="col-6 form-group">
                    <label>Does it get along with other dog?</label>
                    <select
                        className="form-select"
                        name="dog.idOtherDoge"
                        value={formData.dog.idOtherDoge}
                        onChange={handleChange}>
                        <option selected>Select a choice</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-6 form-group">
                    <label>Medicines</label>
                    <select
                        className="form-select"
                        name="dog.idMedicines"
                        value={formData.dog.idMedicines}
                        onChange={handleChange}>
                        <option selected>Select a choice</option>
                        <option value="0">Pills</option>
                        <option value="1">Injection</option>
                        <option value="2">Ointment</option>
                    </select>
                </div>
            </div>
            <div className="form-floating col-12 mt-5 mb-3">
                <textarea className="form-control" placeholder="Leave a comment here" id="commentCare"
                          style={{height: "8rem"}}></textarea>
                <label htmlFor="commentCare">Comments</label>
            </div>

        </div>
    );
};

export default InfoCareForm;
