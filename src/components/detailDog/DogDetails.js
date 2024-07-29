import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AuthHeader from "../AuthHeader";
import defaultImg from "../../assets/defaultImg.svg";
import 'bootstrap-icons/font/bootstrap-icons.css';
import DetailDogInfoForm from "./DetailDogInfoForm";
import DetailsOwnerInfoForm from "./DetailsOwnerInfoForm";
import DetailsAdditionalDetailForm from  "./DetailsAdditionalDetailForm";
import DetailsInfoCareForm from "./DetailsInfoCareForm"


const DogDetails = (props) => {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const { logout } = props;
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('general');

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
                // Handle error, e.g., show an error message
            }
        };

        fetchDogDetails();
    }, [id]);

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileUrl(URL.createObjectURL(file));

        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];  // Remove data:image/jpeg;base64,

        };

        reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const [section, field] = name.split(".");

        const fieldValue = type === 'checkbox' ? checked : value;

        setDog((prevDog) => ({
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


    return (
        <div className="DogDetails">
            <AuthHeader logout={logout} />
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        {dog ? (
                            <>
                                <div className="position-relative mt-4">
                                    <div className="image-preview-container mb-4">
                                        <img
                                            src={dog.image ? `data:image/jpeg;base64,${dog.image}` : defaultImg}
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
                                            <button type="button" className="btn btn-primary"
                                                    onClick={handleFileButtonClick}>Select Image
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
                                    <div className="col-3">
                                        <h2><strong>{dog.name} </strong></h2>
                                        <p className="mb-4">{dog.breeds}</p>
                                    </div>

                                    <div className="col-7 mt-3">
                                        <i className="bi bi-pencil fs-5"></i>
                                    </div>
                                </div>

                                <hr style={{ borderTop: "1px solid #838383" }} />

                                <ul className="nav nav-tabs CustomNav" style={{ borderBottom: 'none' }}>
                                    <li className="nav-item">
                                        <button className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('general')}>General Information
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'additionalDetail' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('additionalDetail')}>Additional Details
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={`nav-link ${activeTab === 'infoCare' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('infoCare')}>Info about Care
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={`nav-link ${activeTab === 'owner' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('owner')}>Owner
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

export default DogDetails;
