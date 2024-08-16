import React from "react";
import '../App.css';

const DogInfoForm = ({ formData, handleChange, handleNext }) => {
    return (
        <div className="form-container">
            <div className="row">
                <div className="col-6 form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="dog.name" value={formData.dog.name}
                           onChange={handleChange}/>
                </div>
                <div className="col-6 form-group">
                    <label>Age in Years:</label>
                    <input type="number" className="form-control" name="dog.ageInYear" value={formData.dog.ageInYear}
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-6 form-group">
                    <label>Age in Months:</label>
                    <input type="number" className="form-control" name="dog.ageMonth" value={formData.dog.ageMonth}
                           onChange={handleChange}/>
                </div>
                <div className="col-6 form-group">
                    <label>Weight:</label>
                    <input type="number" className="form-control" name="dog.weight" value={formData.dog.weight}
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-6 form-group">
                    <label>Gender:</label>
                    <select
                        className="form-select"
                        name="dog.idGender"
                        value={formData.dog.idGender}
                        onChange={handleChange}>
                        <option selected>Select a choice</option>
                        <option value="0">Female</option>
                        <option value="1">Male</option>
                    </select>
                </div>
                <div className="col-6 form-group">
                    <label>Breeds:</label>
                    <input type="text" className="form-control" name="dog.breeds" value={formData.dog.breeds}
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="row mt-4 mb-4">
                <div className="col-6 form-group">
                    <label>Date of Adoption:</label>
                    <input type="date" className="form-control" name="dogAdditionalDetail.dateAdoption"
                           value={formData.dogAdditionalDetail.dateAdoption} onChange={handleChange}/>
                </div>
                <div className="col-6 form-group">
                    <label>Date of Birth:</label>
                    <input type="date" className="form-control" name="dogAdditionalDetail.dateOfBirdth"
                           value={formData.dogAdditionalDetail.dateOfBirdth} onChange={handleChange}/>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-primary customInsetDog" onClick={handleNext}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DogInfoForm;
