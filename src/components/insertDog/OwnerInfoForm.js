import React, { useEffect, useState } from "react";
import { fetchOwners } from "../appointment/service/AppointmentService";

const OwnerInfoForm = ({ formData, handleChange, handlePrev, handleFormSubmit}) => {
    const [photoPreview, setPhotoPreview] = useState(formData.owner.photo || "");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDogRegistered, setIsDogRegistered] = useState(formData.owner.isDogRegistered || false);
    const [ownersList, setOwnersList] = useState([]);

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

    const handleCheckboxChange = (event) => {
        const { checked } = event.target;
        setIsDogRegistered(checked);

        if (checked) {

            handleChange({
                target: {
                    name: "owner",
                    value: {
                        id: "",
                    },
                },
            });

        } else {

            handleChange({
                target: {
                    name: "owner.id",
                    value: "",
                },
            });

            handleChange({
                target: {
                    name: "owner",
                    value: {},
                },
            });
            setPhotoPreview("");

        }
    };

    const handleOwnerSelectChange = (event) => {
        const selectedOwnerId = event.target.value;

        handleChange({
            target: {
                name: "owner.id",
                value: selectedOwnerId,
            },
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('User not authenticated.');
                }
                const ownersData = await fetchOwners(token);
                setOwnersList(ownersData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch owners');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    console.log(ownersList);

    return (
        <div className="form-container">
            <div className="form-group mt-3">
                <label>
                    <input
                        type="checkbox"
                        checked={isDogRegistered}
                        onChange={handleCheckboxChange}
                        name="owner.isDogRegistered"
                    />
                    Does the dog belong to an owner already registered?
                </label>
            </div>

            {isDogRegistered && (
                <div className="col-md-6 mb-3 mt-3">
                    <label htmlFor="ownerSelect" className="form-label">Select Owner</label>
                    <select
                        id="ownerSelect"
                        className="form-select"
                        value={formData.owner.id || ""}
                        onChange={handleOwnerSelectChange}
                    >
                        <option value="" disabled hidden>Select an owner</option>
                        {ownersList.map(owner => (
                            <option key={owner.idOwner} value={owner.idOwner}>
                                {owner.name} {owner.surname}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {!isDogRegistered && (
                <>
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
                                value={formData.owner.name || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Surname:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="owner.surname"
                                value={formData.owner.surname || ""}
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
                                value={formData.owner.email || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Phone Number:</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="owner.phoneNumber"
                                value={formData.owner.phoneNumber || ""}
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
                                value={formData.owner.state || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>City:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="owner.city"
                                value={formData.owner.city || ""}
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
                                value={formData.owner.address || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Postal code:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="owner.postalCode"
                                value={formData.owner.postalCode || ""}
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
                                value={formData.owner.addressInfo || ""}
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
                            value={formData.owner.aboutOwner || ""}
                            onChange={handleChange}
                            style={{height: "8rem"}}
                        ></textarea>
                        <label htmlFor="commentCare">About the owner</label>
                    </div>

                    <div className="form-floating col-12 mt-5 mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Personal note about the owner"
                            id="commentCare"
                            name="owner.personalNoteAboutOwner"
                            value={formData.owner.personalNoteAboutOwner || ""}
                            onChange={handleChange}
                            style={{height: "8rem"}}
                        ></textarea>
                        <label htmlFor="commentCare">Personal note about the owner</label>
                    </div>
                </>
            )}

            <div className="row mt-5">
                <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={handlePrev}>Previous</button>
                        <button className="btn btn-primary" onClick={handleFormSubmit}>Insert dog</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OwnerInfoForm;
