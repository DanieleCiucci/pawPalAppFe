// AppointmentCard.js
import React from 'react';
import defaultImg from '../../assets/defaultImg.svg';

const AppointmentCard = ({ appointment = {}, role }) => {
    const {
        startDate = Date.now(),
        ownerName = "Unknown",
        sitterName = "Unknow",
        state = "Unknown",
        dogNames = "Unknown",
        photo = null
    } = appointment;

    const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
            <div className="card" style={{ width: '18rem' }}>
                <img
                    className="card-img-top"
                    src={photo ? `data:image/jpeg;base64,${photo}` : defaultImg}
                    alt="Appointment"
                    style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body">
                    {role === 0 ?(
                        <p className="card-text"><strong>{ownerName}</strong></p>
                    ): (
                        <p className="card-text"><strong>{sitterName}</strong></p>
                    )}
                    <p className="card-text"><strong>Date:</strong> {formattedDate}</p>
                    <p className="card-text">Appointment type:  {state}</p>
                    <p className="card-text">Dogs in the appointment: {dogNames}</p>
                    <div className="d-flex justify-content-end mt-4">
                        <a href="#" className="btn btn-outline-primary">Details</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;
