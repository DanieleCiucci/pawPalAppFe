import React from "react";
import '../App.css';

const AdditionalDetailForm = ({ formData, handleChange, handleNext, handlePrev  }) => {
    return (
        <div className="form-container mb-5">
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
                    id="additionalDetail"
                    name="dogAdditionalDetail.additionalDetail"
                    value={formData.dogAdditionalDetail.additionalDetail}
                    onChange={handleChange}
                    style={{height: "8rem"}}
                ></textarea>
                <label htmlFor="additionalDetail">Comments</label>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={handlePrev}>Previous</button>
                        <button className="btn btn-outline-primary customInsetDog" onClick={handleNext}>Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdditionalDetailForm;
