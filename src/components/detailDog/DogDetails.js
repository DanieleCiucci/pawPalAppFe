import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AuthHeader from "../AuthHeader";
import defaultImg from "../../assets/defaultImg.svg";
import 'bootstrap-icons/font/bootstrap-icons.css';
import DetailDogInfoForm from "./DetailDogInfoForm";
import DetailsOwnerInfoForm from "./DetailsOwnerInfoForm";
import DetailsAdditionalDetailForm from "./DetailsAdditionalDetailForm";
import DetailsInfoCareForm from "./DetailsInfoCareForm";
import NamePopUp from "../detailDog/PopUp/NamePopUp";
import DetailsOwnerMainDetail from "./DetailsOwnerMainDetial";
import { fetchUserRole } from "../../services/roleSerivces";

const DogDetails = (props) => {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const [showNamePopUp, setShowNamePopUp] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('general');
    const [showPopup, setShowPopup] = useState(false);
    const fileInputRef = useRef(null);
    const [role, setRole] = useState(null);

    const location = useLocation();
    const { personalSitterDog } = location.state || {};

    useEffect(() => {
        const fetchDogDetails = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch(`http://localhost:8080/api/dog/get-dog/${id}`, {
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
                setDog(responseBody);
            } catch (error) {
                console.error("Error fetching dog details:", error);
            }
        };

        fetchDogDetails();
    }, [id]);

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setSelectedFileUrl(URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result.split(',')[1];
                setDog(prevDog => ({
                    ...prevDog,
                    image: base64String
                }));

                const updateImage = {
                    id: dog.id,
                    image: base64String
                };

                // Send the base64 image to the backend
                try {
                    const token = localStorage.getItem('authToken');
                    const response = await fetch(`http://localhost:8080/api/dog/update-main-image`, {
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

        setDog(prevDog => ({
            ...prevDog,
            [section]: {
                ...prevDog[section],
                [field]: fieldValue
            }
        }));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return <DetailDogInfoForm dog={dog} handleChange={handleChange} />;
            case 'owner':
                return <DetailsOwnerInfoForm dog={dog} handleChange={handleChange} />;
            case 'additionalDetail':
                return <DetailsAdditionalDetailForm dog={dog} handleChange={handleChange} />;
            case 'infoCare':
                return <DetailsInfoCareForm dog={dog} handleChange={handleChange} />;
            default:
                return <DetailDogInfoForm dog={dog} handleChange={handleChange} />;
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
                    <div className="col-2 d-none d-md-block"></div>
                    <div className="col-12 m-2 col-md-8">
                        {dog ? (
                            <>
                                <div className="position-relative mt-4">
                                    <div className="image-preview-container mb-4">
                                        <img
                                            src={selectedFileUrl || (dog.image ? `data:image/jpeg;base64,${dog.image}` : defaultImg)}
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

                                {activeTab !== 'owner' ? (
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 col-lg-3 col-6 position-relative">
                                            <h2><strong>{dog.name}</strong></h2>
                                            <p className="mb-4">{dog.breeds}</p>
                                            <i
                                                className="bi bi-pencil position-absolute top-50 start-100 translate-middle"
                                                style={{cursor: 'pointer'}}
                                                onClick={handleIconClick}
                                            ></i>
                                        </div>
                                    </div>

                                ) : (
                                    <DetailsOwnerMainDetail dog={dog}/>
                                )}

                                <hr style={{borderTop: "1px solid #838383"}}/>

                                <ul className="nav nav-tabs CustomNav" style={{borderBottom: 'none'}}>
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
                                            className={`nav-link ${activeTab === 'additionalDetail' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('additionalDetail')}
                                        >
                                            Additional Details
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'infoCare' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('infoCare')}
                                        >
                                            Info about Care
                                        </button>
                                    </li>

                                    {!personalSitterDog && role === 0 && (
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${activeTab === 'owner' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('owner')}
                                            >
                                                Owner
                                            </button>
                                        </li>
                                    )}

                                </ul>

                                <div className="tab-content mt-4">
                                    {renderTabContent()}
                                </div>

                                <NamePopUp show={showPopup} handleClose={handleClosePopup} dog={dog} />
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

export default DogDetails;
