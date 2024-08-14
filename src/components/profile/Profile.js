import React, { useEffect, useRef, useState } from "react";
import AuthHeader from "../AuthHeader";
import defaultImg from "../../assets/defaultImg.svg";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchUserRole } from "../../services/roleSerivces";
import {
    fetchProfileDetails,
    updateProfileImage,
    fetchDogsOwnedBySitter,
    fetchProfileDetailsOwner,
    fetchDogsOwnedByOwner,
    fetchProfileDetailsSitter,
    fetchDogsOwnedByIdSitter
} from "./services/ProfileMainService";
import GeneralInfoProfile from "./Detail/GeneralInfoProfile";
import MainDetailsProfile from "./Detail/MainDetailsProfile";
import Calendar from "./Detail/CalendarComponent";
import PetOwned from "./Detail/PetOwned";
import Skill from "./Detail/Skill";
import Service from "./Detail/Service";
import { useParams } from 'react-router-dom';

const Profile = (props) => {
    const [profile, setProfile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('general');
    const [dogsOwned, setDogsOwned] = useState([]);
    const fileInputRef = useRef(null);
    const [role, setRole] = useState(null);
    const { sitterId } = useParams();

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

    useEffect(() => {
        if (role == null) return;

        const fetchData = async () => {
            try {
                let profileData;
                let dogs;

                if (sitterId === undefined) {
                    if (role === 0) {
                        profileData = await fetchProfileDetails();
                        setProfile(profileData);
                        dogs = await fetchDogsOwnedBySitter();
                    } else {
                        profileData = await fetchProfileDetailsOwner();
                        setProfile(profileData);
                        dogs = await fetchDogsOwnedByOwner();
                    }
                    setDogsOwned(dogs);
                } else {
                    profileData = await fetchProfileDetailsSitter(sitterId);
                    setProfile(profileData);
                    dogs = await fetchDogsOwnedByIdSitter(sitterId);
                    setDogsOwned(dogs);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [role, sitterId]);

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFileUrl(URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result.split(',')[1];
                try {
                    await updateProfileImage(profile.id, base64String);
                    setProfile(prevProfile => ({
                        ...prevProfile,
                        image: base64String
                    }));
                } catch (error) {
                    console.error("Error updating image:", error);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return <GeneralInfoProfile profile={profile} sitterId={sitterId} />;
            case 'petOwned':
                return <PetOwned dogsOwned={dogsOwned} sitterId={sitterId}/>;
            case 'skill':
                return <Skill profile={profile} sitterId={sitterId}/>;
            case 'services':
                return <Service profile={profile} sitterId={sitterId} />;
            case 'calendar':
                return <Calendar />;
            default:
                return <div>Select a tab to view content</div>;
        }
    };

    return (
        <div className="DogDetails">
            <AuthHeader logout={props.logout} />
            <div className="container">
                <div className="row">
                    <div className="col-2 d-none d-sm-block"></div>
                    <div className="col-12 col-sm-8">
                        {profile ? (
                            <>
                                <div className="position-relative mt-4">
                                    <img
                                        src={selectedFileUrl || (profile.mainPhoto ? `data:image/jpeg;base64,${profile.mainPhoto}` : defaultImg)}
                                        alt="Profile"
                                        className="img-fluid"
                                        style={{
                                            height: '19rem',
                                            width: '100%',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    {!sitterId && (
                                        <div className="position-absolute bottom-0 end-0 p-3">
                                            <button type="button" className="btn btn-primary" onClick={handleFileButtonClick}>
                                                <i className="bi bi-pencil"></i> Update Image
                                            </button>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="form-control-file"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="row">
                                    <MainDetailsProfile profile={profile} role={role} activeButtonPetOwned={activeTab === 'petOwned'} sitterId={sitterId} />
                                </div>

                                <hr style={{ borderTop: "1px solid #838383" }} />

                                <ul className="nav nav-tabs CustomNav" style={{ borderBottom: 'none' }}>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('general')}
                                        >
                                            General Information
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'petOwned' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('petOwned')}
                                        >
                                            Pet Owned
                                        </button>
                                    </li>
                                    {(role !== 1 || sitterId) && (
                                        <>
                                            <li className="nav-item">
                                                <button
                                                    className={`nav-link ${activeTab === 'skill' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('skill')}
                                                >
                                                    Skill
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button
                                                    className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('services')}
                                                >
                                                    Services
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button
                                                    className={`nav-link ${activeTab === 'calendar' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('calendar')}
                                                >
                                                    Calendar
                                                </button>
                                            </li>
                                        </>
                                    )}
                                </ul>

                                <div className="tab-content mt-4">
                                    {renderTabContent()}
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className="col-2 d-none d-sm-block"></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
