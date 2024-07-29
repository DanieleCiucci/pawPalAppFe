import React, { useState, useEffect } from "react";

const GeneralInfoPopUp = ({ show, handleClose, dog }) => {
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
            ageInYear: formData.ageInYear,
            ageMonth: formData.ageMonth,
            weight: formData.weight,
            idGender: formData.idGender
        };

        try {
            const response = await fetch("http://localhost:8080/api/dog/update-general-info", {
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

            const responseBody = await response.text();
            const result = responseBody ? JSON.parse(responseBody) : {};
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
                        <h5 className="p-3"><strong>Update General Information</strong></h5>
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
                        <label>Age in Years:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="ageInYear"
                            value={formData.ageInYear || ''}
                            onChange={e => handleChange('ageInYear', e.target.value)}
                            placeholder="Age in Years"
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Age in Months:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="ageMonth"
                            value={formData.ageMonth || ''}
                            onChange={e => handleChange('ageMonth', e.target.value)}
                            placeholder="Age in Months"
                        />
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col-6 form-group">
                        <label>Weight:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="weight"
                            value={formData.weight || ''}
                            onChange={e => handleChange('weight', e.target.value)}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Gender:</label>
                        <select
                            className="form-select"
                            name="idGender"
                            value={formData.idGender}
                            onChange={e => handleChange('idGender', e.target.value)}
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="0">Male</option>
                            <option value="1">Female</option>
                        </select>
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
