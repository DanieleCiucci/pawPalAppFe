import React, { useState } from 'react';
import defaultImg from '../../assets/defaultImg.svg';
import AppointmentDetailsPopup from "./AppointmentDetailsPopUp";

const AppointmentCard = ({ appointment = {}, role }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    const {
        id,
        startDate = Date.now(),
        ownerName = "Unknown",
        sitterName = "Unknown",
        state = "Unknown",
        dogNames = "Unknown",
        photo = null
    } = appointment;

    const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <>
            <div className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                <div className="card" style={{ width: '18rem' }}>
                    <img
                        className="card-img-top"
                        src={photo ? `data:image/jpeg;base64,${photo}` : defaultImg}
                        alt="Appointment"
                        style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                        {role === 0 ? (
                            <p className="card-text"><strong>{ownerName}</strong></p>
                        ) : (
                            <p className="card-text"><strong>{sitterName}</strong></p>
                        )}
                        <p className="card-text"><strong>Date:</strong> {formattedDate}</p>
                        <p className="card-text">Appointment type: {state}</p>
                        <p className="card-text">Dogs in the appointment: {dogNames}</p>
                        <div className="d-flex justify-content-end mt-4">
                            <button
                                className="btn btn-outline-primary"
                                onClick={openPopup}
                            >
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AppointmentDetailsPopup
                isOpen={isPopupOpen}
                onClose={closePopup}
                appointment={appointment}
            />
        </>
    );
};

export default AppointmentCard;
