import React, { useState, useEffect, useRef } from "react";
import AuthHeader from "../AuthHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultImg from "../../assets/defaultImg.svg";
import DogInfoForm from "./DogInfoForm";
import OwnerInfoForm from "./OwnerInfoForm";
import AdditionalDetailForm from "./AdditionalDetailForm";
import InfoCareForm from "./InfoCareForm";
import { fetchUserRole } from "../../services/roleSerivces";
import { handleSubmit } from "../../services/insertDogServices"
import {useLocation} from "react-router-dom";

const InsertDogForm = ({ logout }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('general');
    const fileInputRef = useRef(null);
    const [userRole, setUserRole] = useState(null);

    const location = useLocation();
    const { personalSitterDog } = location.state || {};

    useEffect(() => {
        const initializeRole = async () => {
            const role = await fetchUserRole();
            setUserRole(role);
        };

        initializeRole();
    }, []);

    const [formData, setFormData] = useState({
        dog: {
            name: "",
            ageInYear: "",
            ageMonth: "",
            weight: "",
            idGender: "",
            breeds: "",
            description: "",
            image: "",
        },
        owner: {
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            addressInfo: "",
            photo: "",
            personalNoteAboutOwner: "",
            aboutOwner: "",
            city: undefined,
            address: undefined,
            state:undefined,
            postalCode:undefined,
            geoX:undefined,
            geoY:undefined
        },
        dogAdditionalDetail: {
            getAlongWellWithOtherDog: false,
            getAlongWellWithOtherCat: false,
            getAlongWellWithChildren: false,
            needsOutside: false,
            additionalDetail: "",
            dateAdoption: "",
            dateOfBirdth: "",
        },
        dogInfoCare: {
            idLeftAlone: "",
            idTypeOfEnergy: "",
            idFeedsSchedule: "",
            idNeedsSchedule: "",
            idCareDrugs: "",
            infoCareDetail: "",
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const [section, field] = name.split(".");

        const fieldValue = type === 'checkbox' ? checked : value;

        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: fieldValue
            }
        }));
    };

    const handleFormSubmit = (e) => {
        handleSubmit(e, formData, userRole, personalSitterDog);
    };

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileUrl(URL.createObjectURL(file));

        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setFormData(prevData => ({
                ...prevData,
                dog: {
                    ...prevData.dog,
                    image: base64String
                }
            }));
        };

        reader.readAsDataURL(file);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return <DogInfoForm formData={formData} handleChange={handleChange} />;
            case 'owner':
                return <OwnerInfoForm formData={formData} handleChange={handleChange} />;
            case 'additionalDetail':
                return <AdditionalDetailForm formData={formData} handleChange={handleChange} />;
            case 'infoCare':
                return <InfoCareForm formData={formData} handleChange={handleChange} />;
            default:
                return <DogInfoForm formData={formData} handleChange={handleChange} />;
        }
    };

    return (
        <div className="AuthHome">
            <AuthHeader logout={logout} />
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">

                        {personalSitterDog ? (
                            <>
                                <h1 style={{fontWeight: 'bold'}}>Insert your personal dog</h1>
                                <p className="mt-3">In this section you can insert your personal dog's information</p>
                            </>
                        ): (
                            <>
                                <h1 style={{ fontWeight: 'bold' }}>Insert dog</h1>
                                <p>In this section you can insert your dog's information</p>
                            </>

                        )}
                        <div className="position-relative mt-4">
                            <div className="image-preview-container mb-4">
                                <img src={selectedFileUrl || defaultImg} alt="Dog Preview" style={{ height: '19rem', width: '100%', border: '1px solid #ccc', borderRadius: '8px', objectFit: 'cover' }} />
                                <div className="position-absolute bottom-0 end-0 p-3">
                                    <button type="button" className="btn btn-primary" onClick={handleFileButtonClick}>Select Image</button>
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
                        <hr style={{ borderTop: "1px solid #838383" }} />

                        <ul className="nav nav-tabs CustomNav" style={{ borderBottom: 'none' }}>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('general')}>General Information
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'additionalDetail' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('additionalDetail')}>Additional Details
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'infoCare' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('infoCare')}>Info about Care
                                </button>
                            </li>
                            {(userRole === 0 && !personalSitterDog) && (
                                <li className="nav-item">
                                    <button className={`nav-link ${activeTab === 'owner' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('owner')}>Owner
                                    </button>
                                </li>
                            )}
                        </ul>

                        <div className="tab-content mt-4">
                            {renderTabContent()}
                        </div>
                        <div className="mt-5">
                            <button type="submit" className="btn btn-primary mb-5" onClick={handleFormSubmit}>Insert Dog</button>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    );
};

export default InsertDogForm;
