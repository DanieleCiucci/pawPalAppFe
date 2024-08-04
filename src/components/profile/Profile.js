import React, { useEffect, useRef, useState } from "react";
import AuthHeader from "../AuthHeader";
import defaultImg from "../../assets/defaultImg.svg";
import 'bootstrap-icons/font/bootstrap-icons.css';
import NamePopUp from "../detailDog/PopUp/NamePopUp";
import { fetchUserRole } from "../../services/roleSerivces";
import GeneralInfoProfile from "./Detail/GeneralInfoProfile";
import MainDetailsProfile from "./Detail/MainDetailsProfile";
import Calendar from "./Detail/CalendarComponent";

const Profile = (props) => {
    const [profile, setProfile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('general');
    const [showPopup, setShowPopup] = useState(false);
    const [dogsOwned, setDogsOwned] = useState([]);
    const fileInputRef = useRef(null);
    const [role, setRole] = useState(null);


    // Define a new function to fetch dogs owned by the sitter
    const fetchDogsOwnedBySitter = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://localhost:8080/api/profile/get-all-dog-owned-by-sitter`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching dogs owned by sitter:", error);
            return [];
        }
    };



    useEffect(() => {
        const fetchProfileDetails = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch(`http://localhost:8080/api/profile/sitter`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseBody = await response.json();
                setProfile(responseBody);
            } catch (error) {
                console.error("Error fetching profile details:", error);
            }
        };

        fetchProfileDetails();
    }, []);

    useEffect(() => {
        if (activeTab === 'petOwned') {
            const fetchDogs = async () => {
                const dogs = await fetchDogsOwnedBySitter();
                setDogsOwned(dogs);
            };

            fetchDogs();
        }
    }, [activeTab]);

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
                setProfile(prevProfile => ({
                    ...prevProfile,
                    image: base64String
                }));

                const updateImage = {
                    id: profile.id,
                    image: base64String
                };

                try {
                    const token = localStorage.getItem('authToken');
                    const response = await fetch(`http://localhost:8080/api/profile/update-main-image`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updateImage)
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const responseBody = await response.json();
                    console.log("Image updated successfully:", responseBody);
                } catch (error) {
                    console.error("Error updating image:", error);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const [section, field] = name.split(".");
        const fieldValue = type === 'checkbox' ? checked : value;

        setProfile(prevProfile => ({
            ...prevProfile,
            [section]: {
                ...prevProfile[section],
                [field]: fieldValue
            }
        }));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return <GeneralInfoProfile profile={profile} />;
            case 'petOwned':
                return (
                    <div>
                        <h3>Pet Owned</h3>
                        <ul>
                            {dogsOwned.length ? (
                                dogsOwned.map(dog => (
                                    <li key={dog.id}>
                                        <img
                                            src={dog.image ? `data:image/jpeg;base64,${dog.image}` : defaultImg}
                                            alt={dog.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
                                        <span>{dog.name}</span>
                                    </li>
                                ))
                            ) : (
                                <p>No dogs owned by this sitter.</p>
                            )}
                        </ul>
                    </div>
                );
            case 'skill':
                return <div>Skill Content</div>;
            case 'services':
                return <div>Services Content</div>;
            case 'calendar':
                return <Calendar />;
            default:
                return <div>Select a tab to view content</div>;
        }
    };

    const handleIconClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
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
                                            src={selectedFileUrl || (profile.image ? `data:image/jpeg;base64,${profile.image}` : defaultImg)}
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

                                <NamePopUp show={showPopup} handleClose={handleClosePopup} profile={profile} />
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
