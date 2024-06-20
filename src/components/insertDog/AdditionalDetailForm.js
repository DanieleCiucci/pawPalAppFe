import React from "react";
import '../App.css';

const AdditionalDetailForm = ({ formData, handleChange }) => {
    return (
        <div className="form-container">
            <div className="row">
                <div className="col-6 form-group">
                    <label>Does it relieve itself outside?</label>
                    <select
                        className="form-select"
                        name="dogAdditionalDetail.needsOutside"
                        value={formData.dogAdditionalDetail.needsOutside}
                        onChange={handleChange}>
                        <option selected>Select a choice</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <div className="col-6 form-group">
                    <label>Does it get along with children?</label>
                    <select
                        className="form-select"
                        name="dogAdditionalDetail.getAlongWellWithChildren"
                        value={formData.dogAdditionalDetail.getAlongWellWithChildren}
                        onChange={handleChange}>
                        <option selected>Select a choice</option>
                        <option value="1">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-6 form-group">
                    <label>Does it get along with cat?</label>
                    <select
                        className="form-select"
                        name="dogAdditionalDetail.getAlongWellWithOtherCat"
                        value={formData.dogAdditionalDetail.getAlongWellWithOtherCat}
                        onChange={handleChange}>
                        <option selected>Select a choice</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <div className="col-6 form-group">
                    <label>Does it get along with other dog?</label>
                    <select
                        className="form-select"
                        name="dogAdditionalDetail.getAlongWellWithOtherDog"
                        value={formData.dogAdditionalDetail.getAlongWellWithOtherDog}
                        onChange={handleChange}>
                        <option selected>Select a choice</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
            </div>
            <div className="form-floating col-12 mt-5 mb-3">
                <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="commentCare"
                    name="dogAdditionalDetail.detail"
                    value={formData.dogAdditionalDetail.detail}
                    onChange={handleChange}
                    style={{height: "8rem"}}
                ></textarea>
                <label htmlFor="commentCare">Comments</label>
            </div>

        </div>
    );
};

export default AdditionalDetailForm;
