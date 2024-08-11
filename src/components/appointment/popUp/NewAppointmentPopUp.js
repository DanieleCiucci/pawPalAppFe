import React, { useState, useEffect } from 'react';
import imageCard from "../../../assets/dog1.jpg";
import { scheduleAppointment } from '../service/AppointmentService';
import Pagination from "../../Paginator";

const NewAppointmentPopUp = ({ show, handleClose, sitterId }) => {
    const [appointmentData, setAppointmentData] = useState({
        startDate: '',
        endDate: '',
        sitterId: sitterId,
        dogIds: [],
        message: '',
        serviceId:''
    });
    const [alert, setAlert] = useState(null);
    const [dogs, setDogs] = useState([]);
    const [serviceType, setServiceType] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);

    const serviceOptions = [
        { value: '', label: "Any" },
        { value: '0', label: 'Daily pet sitting' },
        { value: '1', label: 'Pet sitting at the owner\'s home' },
        { value: '2', label: 'Pet sitting at the sitter\'s home' },
        { value: '3', label: 'Walk' },
        { value: '4', label: 'Pet sitting for more than a day' },
    ];

    useEffect(() => {
        if (show) {
            const fetchDogs = async () => {
                try {
                    const token = localStorage.getItem('authToken');
                    const response = await fetch(`http://localhost:8080/api/dog/all-dog-owner?page=${currentPage}&size=6`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setDogs(data.content || []);
                    setTotalPages(data.totalPages);

                } catch (error) {
                    console.error("Error fetching dogs:", error);
                    setAlert({ type: 'danger', message: 'Error fetching dog data.' });
                }
            };
            fetchDogs();
        }
    }, [show, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const responseBody = await scheduleAppointment(appointmentData); // Use the external API call
            console.log("Success:", responseBody);

            // Show success alert and close the modal after a brief delay
            setAlert({ type: 'success', message: 'Appointment scheduled successfully.' });
            // setTimeout(() => {
            //   setAlert(null);
            // handleClose();
            //}, 1500);

        } catch (error) {
            console.error("Error scheduling appointment:", error);
            setAlert({ type: 'danger', message: 'Error scheduling appointment.' });
            setTimeout(() => {
                setAlert(null);
            }, 2000);
        }
    };

    const handleServiceTypeChange = (event) => {
        const serviceId = event.target.value;
        setServiceType(serviceId);
        setAppointmentData(prevData => ({
            ...prevData,
            serviceId: serviceId
        }));
    };

    const handleDateTimeChangeCheckin = (event) => {
        setAppointmentData(prevData => ({
            ...prevData,
            startDate: event.target.value
        }));
    };

    const handleDateTimeChangeCheckout = (event) => {
        setAppointmentData(prevData => ({
            ...prevData,
            endDate: event.target.value
        }));
    };

    const handleDogSelectionChange = (dogId) => {
        setAppointmentData(prevData => {
            const dogIds = new Set(prevData.dogIds);
            if (dogIds.has(dogId)) {
                dogIds.delete(dogId);
            } else {
                dogIds.add(dogId);
            }
            return {
                ...prevData,
                dogIds: Array.from(dogIds)
            };
        });
    };

    if (!show) return null;

    return (
        <div className="popup-overlay overlayStyle">
            <div className="popup-content popupStyle">

                <div className="row">
                    <div className="col-12">
                        <h3>Appointment schedule</h3>
                    </div>

                </div>

                <div className="row">
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

                <div className="row m-3">
                    <p><strong>Appointment type</strong></p>
                    <div className="col-md-6 mb-3 mt-3">
                        <label htmlFor="serviceType" className="form-label">Type of Service</label>
                        <select
                            id="serviceType"
                            className="form-select"
                            value={serviceType}
                            onChange={handleServiceTypeChange}
                        >
                            <option value="" disabled hidden>Select the type of service</option>
                            {serviceOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row m-3">
                    <p><strong>Programs</strong></p>
                    <div className="col-md-6 mb-3 mt-3">
                        <label htmlFor="startDate" className="form-label">Check in date</label>
                        <input
                            type="datetime-local"
                            id="startDate"
                            className="form-control"
                            value={appointmentData.startDate}
                            onChange={handleDateTimeChangeCheckin}
                        />
                    </div>
                    <div className="col-md-6 mb-3 mt-3">
                        <label htmlFor="endDate" className="form-label">Check out date</label>
                        <input
                            type="datetime-local"
                            id="endDate"
                            className="form-control"
                            value={appointmentData.endDate}
                            onChange={handleDateTimeChangeCheckout}
                        />
                    </div>
                </div>

                <div className="row m-3">
                    <p><strong>Dogs involved in the appointment</strong></p>
                    <div className="col-md-12 mb-3">
                        {dogs.length > 0 ? (
                            <>
                                <div className="row mt-3">
                                    {dogs.map((dog) => (
                                        <div key={dog.idDog} className="col-md-6 mb-3">
                                            <div className="d-flex align-items-center border p-2"
                                                 style={{borderRadius: '14px', width: '100%'}}>
                                                <img
                                                    src={dog.image ? `data:image/jpeg;base64,${dog.image}` : imageCard}
                                                    alt={dog.dogName}
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                        marginRight: '10px'
                                                    }}
                                                />
                                                <div className="d-flex flex-column flex-grow-1 justify-content-center mb-3">
                                                    <strong>{dog.dogName}</strong>
                                                    <p className="mb-0 text-muted"
                                                       style={{fontSize: '14px'}}>{dog.dogBreeds}</p>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`dogCheck-${dog.idDog}`}
                                                        checked={appointmentData.dogIds.includes(dog.idDog)}
                                                        onChange={() => handleDogSelectionChange(dog.idDog)}
                                                    />
                                                    <label className="form-check-label"
                                                           htmlFor={`dogCheck-${dog.idDog}`}></label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <div className="d-flex justify-content-end mt-4 mb-4">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <p>No dogs available</p>
                        )}
                    </div>
                </div>

                <div className="row m-3">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="message" className="form-label"><strong>Message for the owner</strong></label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-control"
                            rows="3"
                            value={appointmentData.message}
                            onChange={handleInputChange}
                        />
                    </div>
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
