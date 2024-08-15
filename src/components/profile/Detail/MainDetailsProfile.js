import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileDefaultImage from "../../../assets/profileImageDefault.png";
import { updateProfileImage } from "../services/UpdatePhotoProfileService";
import AppointmentModal from '../../appointment/popUp/NewAppointmentPopUp';

const MainDetailsProfile = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [profile, setProfile] = useState(props.profile);
    const [modalShow, setModalShow] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setProfile(props.profile);
    }, [props.sitterId, props.profile]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setSelectedFileUrl(URL.createObjectURL(file));

        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64String = reader.result.split(',')[1];
            setProfile(prevProfile => ({
                ...prevProfile,
                photo: base64String
            }));

            try {
                await updateProfileImage(profile.id, base64String);
                console.log("Image updated successfully");
            } catch (error) {
                console.error("Error updating image:", error);
            }
        };

        reader.readAsDataURL(file);
    };

    const handleAddDogClick = () => {
        navigate('/yourdogs/insert', { state: { personalSitterDog: true } });
    };

    const handleShowModal = () => setModalShow(true);
    const handleCloseModal = () => setModalShow(false);

    return (
        <div className="container mt-3">
            <div className="row align-items-center">
                <div className="col-md-2 col-lg-2 d-flex justify-content-center align-items-center position-relative">
                    <input
                        id="file-upload"
                        type="file"
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload" className="position-relative d-inline-block">
                        <img
                            src={profile.photo ? `data:image/jpeg;base64,${profile.photo}` : profileDefaultImage}
                            alt="Profile"
                            className="img-fluid rounded-circle"
                            style={{
                                maxHeight: '8.5rem',
                                maxWidth: '8.5rem',
                                border: '1px solid white',
                                objectFit: 'cover'
                            }}
                        />
                        {!props.sitterId && (
                            <i
                                className="bi bi-pencil position-absolute"
                                style={{
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                    padding: '0.2rem',
                                    bottom: '0',
                                    right: '0',
                                }}
                            ></i>
                        )}
                    </label>
                </div>

                <div className="col-md-8 col-lg-6 text-center text-md-start">
                    <h3 className="mb-0">
                        {profile.name} {profile.surname}
                    </h3>
                    <p className="mt-2 text-muted">
                        {profile.email}
                    </p>
                </div>
                <div className="col-md-12 col-lg-3 text-center text-lg-end">
                    {props.activeButtonPetOwned && props.role === 0 && (
                        <button type="button" className="btn btn-primary mt-4 mt-lg-5" onClick={handleAddDogClick}>
                            Add your personal dog
                        </button>
                    )}
                    {props.sitterId && (
                        <button type="button" className="btn btn-primary mt-4 mt-lg-5" onClick={handleShowModal}>
                            Schedule Appointment
                        </button>
                    )}
                </div>
            </div>
            <AppointmentModal show={modalShow} handleClose={handleCloseModal} sitterId={props.sitterId}/>
        </div>
    );
};

export default MainDetailsProfile;
