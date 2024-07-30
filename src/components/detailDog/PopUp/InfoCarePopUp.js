import React, { useState, useEffect } from "react";

const InfoCarePopUp = ({ show, handleClose, dog }) => {
    const [formData, setFormData] = useState({});
    const [initialData, setInitialData] = useState({});
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (dog) {
            const initialFormData = {
                idNeedsSchedule: dog.idNeedsSchedule,
                idCareDrugs: dog.idCareDrugs,
                infoCareDetail: dog.infoCareDetail,
                idFeedsSchedule: dog.idFeedsSchedule,
            };
            setFormData(initialFormData);
            setInitialData(initialFormData);
        }
    }, [dog]);

    const handleChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("No token found in local storage");
            setAlert({ type: "danger", message: "Authentication token is missing." });
            return;
        }

        const updatedFields = {};
        for (const key in formData) {
            if (formData[key] !== initialData[key]) {
                updatedFields[key] = formData[key];
            }
        }

        if (Object.keys(updatedFields).length === 0) {
            setAlert({ type: "warning", message: "No changes detected." });
            setTimeout(() => {
                setAlert(null);
            }, 2000);
            return;
        }

        updatedFields.id = dog.id;

        try {
            const response = await fetch("http://localhost:8080/api/dog/update-info-care", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedFields),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setAlert({ type: "success", message: "Update successful!" });
            setTimeout(() => {
                setAlert(null);
                handleClose();
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error("Error updating additional info:", error);
            setAlert({ type: "danger", message: "Error updating additional info." });
            setTimeout(() => {
                setAlert(null);
            }, 2000);
        }
    };

    console.log(formData);

    if (!show) return null;

    return (
        <div className="popup-overlay overlayStyle">
            <div className="popup-content popupStyle">
                <div className="row">
                    <div className="col-8">
                        <h5 className="p-3">
                            <strong>Update Info Care</strong>
                        </h5>
                    </div>
                    <div className="col-4">
                        <div className="alert-container">
                            {alert && (
                                <div
                                    className={`alert alert-${alert.type} alert-dismissible fade show`}
                                    role="alert">
                                    {alert.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row p-3 mt-4">
                    <div className="col-6 form-group">
                        <label>Needs schedule</label>
                        <select
                            className="form-select"
                            name="idNeedsSchedule"
                            value={formData.idNeedsSchedule || ""}
                            onChange={(e) => handleChange("idNeedsSchedule", e.target.value)}
                        >

                            <option selected  disabled className="optionSelected">{dog.idNeedsSchedule}</option>

                            <option value="0">each hour</option>
                            <option value="1">&gt; 1 hour</option>
                            <option value="2">&gt; 3 hours</option>
                            <option value="3">every 8 hours</option>
                        </select>
                    </div>
                    <div className="col-6 form-group">
                        <label>Medicines</label>
                        <select
                            className="form-select"
                            name="idCareDrugs"
                            value={formData.idCareDrugs || ""}
                            onChange={(e) => handleChange("idCareDrugs", e.target.value)}
                        >

                            <option selected disabled className="optionSelected">{dog.idCareDrugs}</option>

                            <option value="0">Pills</option>
                            <option value="1">Injection</option>
                            <option value="2">Ointment</option>
                        </select>
                    </div>
                </div>

                <div className="row p-3 mt-4">
                    <div className="col-6 form-group">
                        <label>Feeds schedule</label>
                        <select
                            className="form-select"
                            name="idFeedsSchedule"
                            value={formData.idFeedsSchedule || ""}
                            onChange={(e) => handleChange("idFeedsSchedule", e.target.value)}
                        >
                            <option selected disabled className="optionSelected">{dog.idFeedsSchedule}</option>

                            <option value="0">Morning</option>
                            <option value="1">Evening</option>
                            <option value="2">Twice daily</option>
                        </select>
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col-12 form-group">
                        <label>Additional Details:</label>
                        <textarea
                            className="form-control"
                            name="infoCareDetail"
                            value={formData.infoCareDetail || ""}
                            onChange={(e) => handleChange("infoCareDetail", e.target.value)}
                            rows="3"
                        ></textarea>
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col-11 text-end">
                        <p onClick={handleClose} style={cancelButtonStyle}>
                            Cancel
                        </p>
                    </div>
                    <div className="col-1">
                        <p onClick={handleSave} style={saveButtonStyle}>
                            Update
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const cancelButtonStyle = {
    color: "gray",
    cursor: "pointer",
    marginRight: "10px",
};

const saveButtonStyle = {
    color: "brown",
    cursor: "pointer",
};

export default InfoCarePopUp;
