import React, { useState, useEffect } from "react";

const AdditionalDetailPopUp = ({ show, handleClose, dog }) => {
    const [formData, setFormData] = useState({});
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (dog) {
            setFormData({
                ...dog,
                needsOutside: convertToBooleanValue(dog.needsOutside),
                getAlongWellWithOtherCat: convertToBooleanValue(dog.getAlongWellWithOtherCat),
                getAlongWellWithOtherDog: convertToBooleanValue(dog.getAlongWellWithOtherDog),
                getAlongWellWithChildren: convertToBooleanValue(dog.getAlongWellWithChildren)
            });
        }
    }, [dog]);

    const convertToBooleanValue = (value) => {
        return value === "Yes" ? 1 : (value === "No" ? 0 : null);
    };

    const convertToStringValue = (value) => {
        return value === 1 ? "Yes" : (value === 0 ? "No" : "");
    };

    const handleChange = (field, value) => {
        const newValue = field.includes('needsOutside') || field.includes('getAlongWellWith')
            ? convertToBooleanValue(value)
            : value;

        setFormData(prevState => ({
            ...prevState,
            [field]: newValue
        }));
    };

    const handleSave = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No token found in local storage");
            setAlert({ type: 'danger', message: 'Authentication token is missing.' });
            return;
        }

        const updatedFields = {
            id: dog.id,
            needsOutside: formData.needsOutside,
            dateOfBirdth: formData.dateOfBirdth ? new Date(formData.dateOfBirdth).getTime() : null,
            dateAdoption: formData.dateAdoption ? new Date(formData.dateAdoption).getTime() : null,
            getAlongWellWithOtherCat: formData.getAlongWellWithOtherCat,
            getAlongWellWithOtherDog: formData.getAlongWellWithOtherDog,
            getAlongWellWithChildren: formData.getAlongWellWithChildren,
            additionalDetail: formData.additionalDetail
        };

        try {
            const response = await fetch("http://localhost:8080/api/dog/update-additional-detail", {
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

            setAlert({ type: 'success', message: 'Update successful!' });
            setTimeout(() => {
                setAlert(null);
                handleClose();
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error("Error updating additional info:", error);
            setAlert({ type: 'danger', message: 'Error updating additional info.' });
            setTimeout(() => {
                setAlert(null);
            }, 2000);
        }
    };

    if (!show) return null;

    const formatDateForInput = (timestamp) => {
        return timestamp ? new Date(timestamp).toISOString().split('T')[0] : "";
    };

    return (
        <div className="popup-overlay overlayStyle">
            <div className="popup-content popupStyle">
                <div className="row">
                    <div className="col-8">
                        <h5 className="p-3"><strong>Update Additional Information</strong></h5>
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
                        <label>Relieves itself outside:</label>
                        <select
                            className="form-select"
                            name="needsOutside"
                            value={convertToStringValue(formData.needsOutside)}
                            onChange={e => handleChange('needsOutside', e.target.value)}
                        >
                            <option value="" disabled>Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col-6 form-group">
                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dateOfBirdth"
                            value={formatDateForInput(formData.dateOfBirdth)}
                            onChange={e => handleChange('dateOfBirdth', e.target.value)}
                        />
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col-6 form-group">
                        <label>Date of Adoption:</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dateAdoption"
                            value={formatDateForInput(formData.dateAdoption)}
                            onChange={e => handleChange('dateAdoption', e.target.value)}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Gets along with cats:</label>
                        <select
                            className="form-select"
                            name="getAlongWellWithOtherCat"
                            value={convertToStringValue(formData.getAlongWellWithOtherCat)}
                            onChange={e => handleChange('getAlongWellWithOtherCat', e.target.value)}
                        >
                            <option value="" disabled>Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col-6 form-group">
                        <label>Gets along with other dogs:</label>
                        <select
                            className="form-select"
                            name="getAlongWellWithOtherDog"
                            value={convertToStringValue(formData.getAlongWellWithOtherDog)}
                            onChange={e => handleChange('getAlongWellWithOtherDog', e.target.value)}
                        >
                            <option value="" disabled>Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col-6 form-group">
                        <label>Gets along with children:</label>
                        <select
                            className="form-select"
                            name="getAlongWellWithChildren"
                            value={convertToStringValue(formData.getAlongWellWithChildren)}
                            onChange={e => handleChange('getAlongWellWithChildren', e.target.value)}
                        >
                            <option value="" disabled>Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col-12 form-group">
                        <label>Additional Details:</label>
                        <textarea
                            className="form-control"
                            name="additionalDetail"
                            value={formData.additionalDetail || ''}
                            onChange={e => handleChange('additionalDetail', e.target.value)}
                            rows="3"
                        ></textarea>
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

export default AdditionalDetailPopUp;
