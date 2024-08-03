import React, { useState } from "react";

const OwnerInfoForm = ({ formData, handleChange }) => {

    const [photoPreview, setPhotoPreview] = useState(formData.owner.photo || "");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {

                const base64String = reader.result.split(",")[1];

                setPhotoPreview(reader.result);
                handleChange({
                    target: {
                        name: "owner.photo",
                        value: base64String,
                    },
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="form-container">
            <div className="row">
                <div className="row mt-5">
                    <div className="col-12 form-group">
                        <label>Upload Photo:</label>
                        <input
                            type="file"
                            className="form-control-file inputFile"
                            onChange={handleFileChange}
                            accept="image/*"

                        />
                    </div>
                </div>
                {photoPreview && (
                    <div className="row mt-3 mb-4">
                        <div className="col-12">
                            <img
                                src={photoPreview}
                                alt="Owner"
                                style={{
                                    width: "9.4rem",
                                    height: "9.4rem",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </div>
                    </div>
                )}
                <div className="col-6 form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="owner.name"
                        value={formData.owner.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-6 form-group">
                    <label>Surname:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="owner.surname"
                        value={formData.owner.surname}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6 form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="owner.email"
                        value={formData.owner.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-6 form-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="owner.phoneNumber"
                        value={formData.owner.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-6 form-group">
                    <label>State:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="owner.state"
                        value={formData.owner.state}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-6 form-group">
                    <label>City:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="owner.city"
                        value={formData.owner.city}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6 form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="owner.address"
                        value={formData.owner.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-6 form-group">
                    <label>Postal code:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="owner.postalCode"
                        value={formData.owner.postalCode}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-6 form-group">
                    <label>Additional information on address:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="owner.addressInfo"
                        value={formData.owner.addressInfo}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-floating col-12 mt-5 mb-3">
                <textarea
                    className="form-control"
                    placeholder="About the owner"
                    id="commentCare"
                    name="owner.aboutOwner"
                    value={formData.owner.aboutOwner}
                    onChange={handleChange}
                    style={{height: "8rem"}}
                ></textarea>
                <label htmlFor="commentCare">Abount the owner</label>
            </div>

            <div className="form-floating col-12 mt-5 mb-3">
                <textarea
                    className="form-control"
                    placeholder="About the owner"
                    id="commentCare"
                    name="owner.personalNoteAboutOwner"
                    value={formData.owner.personalNoteAboutOwner}
                    onChange={handleChange}
                    style={{height: "8rem"}}
                ></textarea>
                <label htmlFor="commentCare">Personal note about the owner</label>
            </div>

        </div>
    );
};

export default OwnerInfoForm;
