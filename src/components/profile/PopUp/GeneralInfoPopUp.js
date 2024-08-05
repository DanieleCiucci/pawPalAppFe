import React, { useState, useEffect } from "react";

const GeneralInfoPopUp = ({ show, handleClose, profile }) => {
    const [formData, setFormData] = useState(profile);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setFormData(profile);
    }, [profile]);

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
            id: profile.id,
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            state: formData.state,
            city: formData.city,
            address: formData.address,
            postalCode: formData.postalCode
        };

        try {
            const response = await fetch("http://localhost:8080/api/profile/update-general-info", {
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

            const responseBody = await response.json();
            console.log("Update successful", responseBody);

            // Show success alert and close the popup
            setAlert({ type: 'success', message: 'Update successful!' });
            setTimeout(() => {
                setAlert(null);
                handleClose();
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
                        <h5 className="p-3"><strong>Update General Information and Location Address</strong></h5>
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

                <div className="row p-3 mt-4">
                    <div className="col-6 form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name || ''}
                            onChange={e => handleChange('name', e.target.value)}
                            placeholder="Name"
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Surname:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="surname"
                            value={formData.surname || ''}
                            onChange={e => handleChange('surname', e.target.value)}
                            placeholder="Surname"
                        />
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col-6 form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email || ''}
                            onChange={e => handleChange('email', e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={formData.phoneNumber || ''}
                            onChange={e => handleChange('phoneNumber', e.target.value)}
                            placeholder="Phone Number"
                        />
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col-6 form-group">
                        <label>State:</label>
                        <input
                            type="input"
                            className="form-control"
                            name="state"
                            value={formData.state || ''}
                            onChange={e => handleChange('state', e.target.value)}
                            placeholder="State"
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>City:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city || ''}
                            onChange={e => handleChange('city', e.target.value)}
                            placeholder="City"
                        />
                    </div>
                </div>
                <div className="row p-3">
                    <div className="col-6 form-group">
                        <label>Address:</label>
                        <input
                            type="input"
                            className="form-control"
                            name="address"
                            value={formData.address || ''}
                            onChange={e => handleChange('address', e.target.value)}
                            placeholder="address"
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Postal Code:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="postalCode"
                            value={formData.postalCode || ''}
                            onChange={e => handleChange('postalCode', e.target.value)}
                            placeholder="City"
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

export default GeneralInfoPopUp;
