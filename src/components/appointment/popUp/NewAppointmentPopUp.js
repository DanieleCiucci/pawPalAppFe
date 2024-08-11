import React, { useState } from 'react';

const NewAppointmentPopUp = ({ show, handleClose }) => {
    const [appointmentData, setAppointmentData] = useState({
        startDate: '',
        endDate: '',
        sitterId: '',
        dogIds: ''
    });
    const [alert, setAlert] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        // Handle appointment submission logic here
        console.log("Appointment Data:", appointmentData);

        // Simulate a successful submission
        setAlert({ type: 'success', message: 'Appointment scheduled successfully!' });
        setTimeout(() => {
            setAlert(null);
            handleClose(); // Close modal after submission
        }, 1500);
    };

    if (!show) return null;

    return (
        <div className="popup-overlay overlayStyle">
            <div className="popup-content popupStyle">
                <div className="row">
                    <div className="col-12">
                        <h5 className="p-3"><strong>Schedule Appointment</strong></h5>
                    </div>
                    <div className="col-12">
                        <div className="alert-container">
                            {alert && (
                                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                                    {alert.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="startDate"
                        name="startDate"
                        value={appointmentData.startDate}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="startDate">Start Date</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        value={appointmentData.endDate}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="endDate">End Date</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="sitterId"
                        name="sitterId"
                        value={appointmentData.sitterId}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="sitterId">Sitter ID</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="dogIds"
                        name="dogIds"
                        value={appointmentData.dogIds}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="dogIds">Dog IDs (comma-separated)</label>
                </div>

                <div className="row p-3">
                    <div className="col-11 text-end">
                        <p onClick={handleClose} style={cancelButtonStyle}>Cancel</p>
                    </div>
                    <div className="col-1">
                        <p onClick={handleSubmit} style={saveButtonStyle}>Schedule</p>
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

export default NewAppointmentPopUp;
