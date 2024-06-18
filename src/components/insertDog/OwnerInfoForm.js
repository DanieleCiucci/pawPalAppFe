import React from "react";

const OwnerInfoForm = ({ formData, handleChange }) => {
    return (
        <div>
            <div className="row">
                <div className="col-6 form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="owner.name" value={formData.owner.name} onChange={handleChange} />
                </div>
                <div className="col-6 form-group">
                    <label>Surname:</label>
                    <input type="text" className="form-control" name="owner.surname" value={formData.owner.surname} onChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-6 form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" name="owner.email" value={formData.owner.email} onChange={handleChange} />
                </div>
                <div className="col-6 form-group">
                    <label>Phone Number:</label>
                    <input type="tel" className="form-control" name="owner.phoneNumber" value={formData.owner.phoneNumber} onChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-6 form-group">
                    <label>City:</label>
                    <input type="text" className="form-control" name="owner.city" value={formData.owner.city} onChange={handleChange} />
                </div>
                <div className="col-6 form-group">
                    <label>Address:</label>
                    <input type="text" className="form-control" name="owner.address" value={formData.owner.address} onChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 form-group">
                    <label>Photo URL:</label>
                    <input type="text" className="form-control" name="owner.photo" value={formData.owner.photo} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default OwnerInfoForm;
