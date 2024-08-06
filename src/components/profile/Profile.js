import React, { useEffect, useRef, useState } from "react";
import AuthHeader from "../AuthHeader";
import defaultImg from "../../assets/defaultImg.svg";
import 'bootstrap-icons/font/bootstrap-icons.css';
import NamePopUp from "../detailDog/PopUp/NamePopUp";
import { fetchUserRole } from "../../services/roleSerivces";
import { fetchProfileDetails, updateProfileImage,fetchDogsOwnedBySitter } from "./services/ProfileMainService";
import GeneralInfoProfile from "./Detail/GeneralInfoProfile";
import MainDetailsProfile from "./Detail/MainDetailsProfile";
import Calendar from "./Detail/CalendarComponent";
import PetOwned from "./Detail/PetOwned";
import Skill from "./Detail/Skill";
import Service from "./Detail/Service";

const Profile = (props) => {
    const [profile, setProfile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('general');
    const [showPopup, setShowPopup] = useState(false);
    const [dogsOwned, setDogsOwned] = useState([]);
    const fileInputRef = useRef(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await fetchProfileDetails();
                setProfile(profileData);

                const dogs = await fetchDogsOwnedBySitter();
                setDogsOwned(dogs);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

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
                return <GeneralInfoProfile profile={profile} />;
            case 'petOwned':
                return <PetOwned dogsOwned={dogsOwned} />;
            case 'skill':
                return <Skill profile={profile} />;
            case 'services':
                return <Service profile={profile} />;
            case 'calendar':
                return <Calendar />;
            default:
                return <div>Select a tab to view content</div>;
        }
    };

    useEffect(() => {
        const initializePage = async () => {
            try {
                const userRole = await fetchUserRole();
                setRole(userRole);
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };

        initializePage();
    }, []);

    return (
        <div className="DogDetails">
            <AuthHeader logout={props.logout} />
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        {profile ? (
                            <>
                                <div className="position-relative mt-4">
                                    <div className="image-preview-container mb-4">
                                        <img
                                            src={selectedFileUrl || (profile.mainPhoto ? `data:image/jpeg;base64,${profile.mainPhoto}` : defaultImg)}
                                            alt="Dog"
                                            style={{
                                                height: '19rem',
                                                width: '100%',
                                                border: '1px solid #ccc',
                                                borderRadius: '8px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div className="position-absolute bottom-0 end-0 p-3">
                                            <button type="button" className="btn btn-primary" onClick={handleFileButtonClick}>
                                                Update Image
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
                                    </div>
                                </div>

                                <div className="row">
                                    <MainDetailsProfile profile={profile} activeButtonPetOwned={activeTab === 'petOwned'} />
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
                                </ul>

                                <div className="tab-content mt-4">
                                    {renderTabContent()}
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
