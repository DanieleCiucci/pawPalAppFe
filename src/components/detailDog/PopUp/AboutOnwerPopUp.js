import React, { useState, useEffect } from "react";

const AboutOwnerPopUp = ({ show, handleClose, dog }) => {
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
            aboutOwner: formData.aboutOwner,
            personalNoteAboutOwner: formData.personalNoteAboutOwner,

        };

        try {
            const response = await fetch("http://localhost:8080/api/dog/update-about-owner", {
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
                        <h5 className="p-3"><strong>Update Owner Information</strong></h5>
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



                <div className="form-floating col-12  mb-3">
                <textarea
                    className="form-control"
                    placeholder="About the owner"
                    id="aboutOwner"
                    name="aboutOwner"
                    value={formData.aboutOwner}
                    onChange={e => handleChange('aboutOwner', e.target.value)}
                    style={{height: "8rem"}}
                ></textarea>
                    <label htmlFor="commentCare">Abount the owner</label>
                </div>

                <div className="form-floating col-12 mt-5 mb-3">
                <textarea
                    className="form-control"
                    placeholder="About the owner"
                    id="personalNoteAboutOwner"
                    name="personalNoteAboutOwner"
                    value={formData.personalNoteAboutOwner}
                    onChange={e => handleChange('personalNoteAboutOwner', e.target.value)}
                    style={{height: "8rem"}}
                ></textarea>
                    <label htmlFor="commentCare">Personal note about the owner</label>
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

export default AboutOwnerPopUp;
