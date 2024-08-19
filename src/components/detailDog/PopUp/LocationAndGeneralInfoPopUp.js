import React, { useState, useEffect } from "react";

const LocationAndGeneralInfoPopUp = ({ show, handleClose, dog }) => {
    const [formData, setFormData] = useState(dog);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setFormData(dog);
    }, [dog]);

    const handleChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSave = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No token found in local storage");
            return;
        }

        const updatedFields = {
            id: dog.id,
            name: formData.ownerName,
            surname: formData.surname,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            city: formData.city,
            address: formData.address,
            addressInfo: formData.addressInfo
        };

        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(apiUrl + "/api/dog/update-owner-information", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedFields)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Update successful", result);

            // Show success alert and refresh the page
            setAlert({ type: 'success', message: 'Update successful!' });
            setTimeout(() => {
                setAlert(null);
                handleClose();
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error("Error updating general info:", error);
            // Show error alert
            setAlert({ type: 'danger', message: 'Error updating general info.' });
            setTimeout(() => {
                setAlert(null);
            }, 2000);
        }
    };

    if (!show) return null;

    return (
        <div className="popup-overlay overlayStyle">
            <div className="popup-content popupStyle">

                <div className="row">
                    <div className="col-8">
                        <h5 className="p-2"><strong>Update location and general info</strong></h5>
                    </div>
                    <div className="col-4">
                        <div className="alert-container">
                            {alert && (
                                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                                    {alert.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row p-2">

                    <div className="col-6">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={e => handleChange('ownerName', e.target.value)}
                        />
                    </div>
                    <div className="col-6">
                        <label>Surname:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="surname"
                            value={formData.surname}
                            onChange={e => handleChange('surname', e.target.value)}
                        />
                    </div>

                </div>

                <div className="row p-2">
                    <div className="col-6">
                        <label>Phone number:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={e => handleChange('phoneNumber', e.target.value)}
                        />
                    </div>
                    <div className="col-6">
                        <label>Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={e => handleChange('email', e.target.value)}
                        />
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-6">
                        <label>City:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={e => handleChange('city', e.target.value)}
                        />
                    </div>
                    <div className="col-6">
                        <label>Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={formData.address}
                            onChange={e => handleChange('address', e.target.value)}
                        />
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-6">
                        <label>Additional information on address:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="addressInfo"
                            value={formData.addressInfo}
                            onChange={e => handleChange('addressInfo', e.target.value)}
                        />
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col-11 text-end">
                        <p onClick={handleClose} style={cancelButtonStyle}>Cancel</p>
                    </div>
                    <div className="col-1">
                        <p onClick={handleSave} style={saveButtonStyle}>Update</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

const cancelButtonStyle = {
    color: 'gray',
    cursor: 'pointer',
    marginRight: '10px'
};

const saveButtonStyle = {
    color: 'brown',
    cursor: 'pointer'
};

export default LocationAndGeneralInfoPopUp
;
