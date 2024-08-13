import React, { useState, useEffect } from 'react';
import {acceptAppointment, fetchAppointmentDetails, refuseAppointment} from './service/AppointmentService';
import DogListDetailAppointment from "./DogListDetailAppointment";
import { fetchUserRole } from "../../services/roleSerivces";

const AppointmentDetailsPopup = ({ isOpen, onClose, appointment }) => {
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [error, setError] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [role, setRole] = useState(null);
    const appointmentId = appointment.id;
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showRejectMessage, setShowRejectMessage] = useState(false);

    useEffect(() => {
        if (!isOpen || !appointmentId) return;

        const fetchAppointmentDetailsData = async () => {
            setLoadingDetails(true);
            setError(null);
            try {
                const data = await fetchAppointmentDetails(appointmentId);
                setAppointmentData(data);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch appointment details.');
            } finally {
                setLoadingDetails(false);
            }
        };

        fetchAppointmentDetailsData();
    }, [isOpen, appointmentId]);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const userRole = await fetchUserRole();
                setRole(userRole);
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };
        fetchRole();
    }, []);

    if (!isOpen) return null;

    if (loadingDetails) {
        return (
            <div className="popup-overlay overlayStyle" onClick={onClose}>
                <div className="popup-content popupStyle" onClick={e => e.stopPropagation()}>
                    <div>Loading appointment details...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="popup-overlay overlayStyle" onClick={onClose}>
                <div className="popup-content popupStyle" onClick={e => e.stopPropagation()}>
                    <div>{error}</div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }

    if (!appointmentData) {
        return (
            <div className="popup-overlay overlayStyle" onClick={onClose}>
                <div className="popup-content popupStyle" onClick={e => e.stopPropagation()}>
                    <div>Failed to load appointment details.</div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }

    const formatDateTime = (dateArray) => {
        const [year, month, day, hour, minute] = dateArray;
        return new Date(year, month - 1, day, hour, minute).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formattedStartDate = formatDateTime(appointmentData.startDate);
    const formattedEndDate = formatDateTime(appointmentData.endDate);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleConfirm = async () => {
        try {
            const response = await acceptAppointment(appointmentId);
            if (response) {

                setShowSuccessMessage(true);

                setTimeout(() => {
                    setShowSuccessMessage(false);
                    onClose();
                }, 1500);
            }
        } catch (error) {

            alert('Failed to confirm appointment: ' + error.message);
        }
    };

    const handleRefuse = async () => {
        try {
            const response = await refuseAppointment(appointmentId);
            if (response) {

                setShowRejectMessage(true);

                setTimeout(() => {
                    setShowRejectMessage(false);
                    onClose();
                }, 1500);
            }
        } catch (error) {

            alert('Failed to confirm appointment: ' + error.message);
        }
    };

    return (
        <div className="popup-overlay overlayStyle" onClick={onClose}>
            <div className="popup-content popupStyle" onClick={e => e.stopPropagation()}>
                <div className="m-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3>Appointment Details</h3>
                        <div className="d-flex align-items-center">
                            <p className="mb-0 me-4">State:</p>
                            {appointmentData.idAppointmentState === 0 && (
                                <button className="badge bg-warning text-dark customBadge">Pending</button>
                            )}
                            {appointmentData.idAppointmentState === 1 && (
                                <button className="badge bg-success customBadge">Confirmed</button>
                            )}
                            {appointmentData.idAppointmentState === 2 && (
                                <button className="badge bg-danger customBadge">Rejected</button>
                            )}
                            {appointmentData.idAppointmentState === 3 && (
                                <button className="badge bg-secondary customBadge">Cancelled</button>
                            )}
                            {appointmentData.idAppointmentState === 4 && (
                                <button className="badge bg-primary customBadge customPrimaryBadgeBg">Passed</button>
                            )}
                        </div>
                        {showSuccessMessage && (
                            <div className="alert alert-success position-absolute top-0 end-0 mt-3 me-3" role="alert">
                                Appointment confirmed successfully!
                            </div>
                        )}
                        {showRejectMessage &&(
                            <div className="alert alert-warning position-absolute top-0 end-0 mt-3 me-3" role="alert">
                                Appointment refused successfully!
                            </div>
                        )}
                    </div>


                    <h5 className="mb-3">General information</h5>

                    <div className="row mb-3">
                        <div className="col-6">
                            {role === 0 ? (
                                <p><strong>Owner: </strong> {appointmentData.ownerName}</p>
                            ) : (
                                <p><strong>Sitter: </strong> {appointmentData.sitterName}</p>
                            )}
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-6">
                            <p><strong>Type of appointment: </strong> {appointmentData.serviceDescription}</p>
                        </div>
                        <div className="col-6">
                            <p><strong>Location: </strong> {appointmentData.location}</p>
                        </div>
                    </div>

                    <h5 className="mb-3">Program</h5>
                    <div className="row">
                        <div className="col-6">
                            <p><strong>Start Date:</strong> {formattedStartDate}</p>
                        </div>
                        <div className="col-6">
                            <p><strong>End Date:</strong> {formattedEndDate}</p>
                        </div>
                    </div>

                    <h5 className="mt-5">Dog involved in the appointment</h5>

                    <DogListDetailAppointment
                        appointmentId={appointmentId}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />

                    {role === 0 ? (
                        <>
                            <h5 className="mt-4">Owner contact</h5>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <p><strong>Email:</strong> {appointmentData.ownerEmail}</p>
                                </div>
                                <div className="col-6">
                                    <p><strong>Phone number:</strong> {appointmentData.ownerPhoneNumber}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h5 className="mt-4">Sitter contact</h5>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <p><strong>Email:</strong> {appointmentData.sitterEmail}</p>
                                </div>
                                <div className="col-6">
                                    <p><strong>Phone number:</strong> {appointmentData.sitterPhoneNumber}</p>
                                </div>
                            </div>
                        </>
                    )}

                    <h5 className="mt-4">Message for the sitter</h5>
                    <p className="mt-2"> {appointmentData.message || "No message provided"}</p>

                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>

                        {(appointmentData.idAppointmentState === 0) && (
                            <div>
                                <button
                                    className="btn btn-danger me-5"
                                    onClick={handleRefuse}
                                >
                                    Refuse
                                </button>
                                <button
                                    className="btn btn-success me-2"
                                    onClick={handleConfirm}
                                >
                                    Confirm
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetailsPopup;
