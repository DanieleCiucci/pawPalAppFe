import React, { useState, useEffect, useRef } from "react";
import AuthHeader from "../AuthHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultImg from "../../assets/defaultMainImage.png";
import DogInfoForm from "./DogInfoForm";
import OwnerInfoForm from "./OwnerInfoForm";
import AdditionalDetailForm from "./AdditionalDetailForm";
import InfoCareForm from "./InfoCareForm";
import { fetchUserRole } from "../../services/roleSerivces";
import { handleSubmit } from "../../services/insertDogServices";
import { useLocation, useNavigate } from "react-router-dom";

const InsertDogForm = ({ logout }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('general');
    const fileInputRef = useRef(null);
    const [userRole, setUserRole] = useState(null);
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
            id: "",
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
            state: undefined,
            postalCode: undefined,
            geoX: undefined,
            geoY: undefined
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

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const successMessageRef = useRef(null);
    const errorMessageRef = useRef(null);

    const location = useLocation();
    const { personalSitterDog } = location.state || {};

    const navigate = useNavigate();

    const tabOrder = ['general', 'additionalDetail', 'infoCare', 'owner'];

    useEffect(() => {
        const initializeRole = async () => {
            const role = await fetchUserRole();
            setUserRole(role);
        };
        initializeRole();
    }, []);

    useEffect(() => {
        if (showSuccessMessage) {
            successMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => setShowSuccessMessage(false), 3000);
        }
    }, [showSuccessMessage]);

    useEffect(() => {
        if (showErrorMessage) {
            errorMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => setShowErrorMessage(false), 3000);
        }
    }, [showErrorMessage]);

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

    const handleNext = () => {
        const currentIndex = tabOrder.indexOf(activeTab);
        const nextIndex = currentIndex + 1;
        if (nextIndex < tabOrder.length) {
            setActiveTab(tabOrder[nextIndex]);
        }
    };

    const handlePrev = () => {
        const currentIndex = tabOrder.indexOf(activeTab);
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            setActiveTab(tabOrder[prevIndex]);
        }
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let modifiedFormData = { ...formData };

        if (formData?.owner?.id) {
            modifiedFormData.owner = { id: formData.owner.id };
        } else {
            const hasOwnerData = Object.keys(modifiedFormData?.owner || {}).some(key => formData.owner[key]);
            if (!hasOwnerData) {
                delete modifiedFormData.owner;
            }
        }

        const result = await handleSubmit(e, modifiedFormData, userRole, personalSitterDog);

        if (result.success) {
            setShowSuccessMessage(true);
            setShowErrorMessage(false);

            // Redirect to "Your Dogs" page after a short delay
            setTimeout(() => {
                navigate('/yourdogs');
            }, 3000);
        } else {
            console.log("Error detected: bella tempe");
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
        }
    };


    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return <DogInfoForm formData={formData} handleChange={handleChange} handleNext={handleNext} />;
            case 'owner':
                return <OwnerInfoForm formData={formData} handleChange={handleChange} handlePrev={handlePrev} handleFormSubmit={handleFormSubmit} />;
            case 'additionalDetail':
                return <AdditionalDetailForm formData={formData} handleChange={handleChange} handleNext={handleNext} handlePrev={handlePrev} />;
            case 'infoCare':
                return <InfoCareForm
                    formData={formData}
                    handleChange={handleChange}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    userRole={userRole}
                    personalSitterDog={personalSitterDog}
                    handleFormSubmit={handleFormSubmit}
                />;
            default:
                return <DogInfoForm formData={formData} handleChange={handleChange} />;
        }
    };

    return (
        <div className="AuthHome">
            <AuthHeader logout={logout} />
            <div className="container">
                <div className="row">
                    <div className="col-2 d-none d-sm-block"></div>
                    <div className="col-12 col-sm-8">
                        {personalSitterDog ? (
                            <>
                                <h1 style={{ fontWeight: 'bold' }}>Insert your personal dog</h1>
                                <p className="mt-3">In this section you can insert your personal dog's information</p>
                            </>
                        ) : (
                            <>
                                <h1 style={{ fontWeight: 'bold' }}>Insert dog</h1>
                                <p>In this section you can insert your dog's information</p>
                            </>
                        )}
                        <div className="position-relative mt-4">
                            <div className="image-preview-container mb-4">
                                <img
                                    src={selectedFileUrl || defaultImg}
                                    alt="Dog Preview"
                                    style={{
                                        height: '19rem',
                                        width: '100%',
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        objectFit: 'cover'
                                    }}
                                />
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

                            {showSuccessMessage && (
                                <div ref={successMessageRef} className="alert alert-success position-absolute bottom-0 end-0" role="alert">
                                    Dog saved successfully
                                </div>
                            )}
                            {showErrorMessage && (
                                <div ref={errorMessageRef} className="alert alert-danger position-absolute bottom-0 end-0" role="alert">
                                    Error: the dog is not saved, retry later.
                                </div>
                            )}
                        </div>
                        <hr style={{ borderTop: "1px solid #838383" }} />

                        <ul className="nav nav-tabs CustomNav" style={{ borderBottom: 'none' }}>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>General Information</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'additionalDetail' ? 'active' : ''}`} onClick={() => setActiveTab('additionalDetail')}>Additional Details</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'infoCare' ? 'active' : ''}`} onClick={() => setActiveTab('infoCare')}>Info about Care</button>
                            </li>
                            {(userRole === 0 && !personalSitterDog) && (
                                <li className="nav-item">
                                    <button className={`nav-link ${activeTab === 'owner' ? 'active' : ''}`} onClick={() => setActiveTab('owner')}>Owner</button>
                                </li>
                            )}
                        </ul>

                        <div className="tab-content mt-4">
                            {renderTabContent()}
                        </div>
                    </div>
                    <div className="col-2 d-none d-sm-block"></div>
                </div>

                <div className="row mt-5"></div>
            </div>
        </div>
    );
};

export default InsertDogForm;
