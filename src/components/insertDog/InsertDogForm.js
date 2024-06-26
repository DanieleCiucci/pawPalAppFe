import React, { useState, useRef } from "react";
import AuthHeader from "../AuthHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultImg from "../../assets/defaultImg.svg";
import DogInfoForm from "./DogInfoForm";
import OwnerInfoForm from "./OwnerInfoForm";
import AdditionalDetailForm from "./AdditionalDetailForm";
import InfoCareForm from "./InfoCareForm";

const InsertDogForm = ({ logout }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('general');
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        dog: {
            name: "",
            ageInYear: "",
            ageMonth: "",
            weight: "",
            idGender: "",
            breeds: "",
            dateAdoption: "",
            dateOfBirdth: "",
            description: "",
        },
        owner: {
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            city: "",
            address: "",
            photo: "",
        },
        dogAdditionalDetail: {
            getAlongWellWithOtherDog: false,
            getAlongWellWithOtherCat: false,
            getAlongWellWithChildren: false,
            needsOutside: false,
            detail: "",
        },

        dogInfoCare: {
            idLeftAlone: "",
            idTypeOfEnergy:"",
            idFeedsSchedule: "",
            idNeedsSchedule:"",
            idCareDrugs:"",
            detail:"",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');

        const formattedData = {
            ...formData,
            dogAdditionalDetail: {
                ...formData.dogAdditionalDetail,
                getAlongWellWithOtherDog: formData.dogAdditionalDetail.getAlongWellWithOtherDog ? 1 : 0,
                getAlongWellWithOtherCat: formData.dogAdditionalDetail.getAlongWellWithOtherCat ? 1 : 0,
                getAlongWellWithChildren: formData.dogAdditionalDetail.getAlongWellWithChildren ? 1 : 0,
                needsOutside: formData.dogAdditionalDetail.needsOutside ? 1 : 0,
            }
        };

        fetch("http://localhost:8080/api/dog/insert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formattedData)
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseBody = await response.text();
                return responseBody ? JSON.parse(responseBody) : {};
            })
            .then((data) => {
                console.log("Success:", data);
                // Handle success, e.g., redirect to another page or show a success message
            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle error, e.g., show an error message
            });
    };

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileUrl(URL.createObjectURL(file));
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
            <AuthHeader logout={logout}/>
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h1 style={{fontWeight:'bold'}}>Insert dog</h1>
                        <p>In this section you can insert your dog's information</p>
                        <div className="position-relative mt-4">
                            <div className="image-preview-container mb-4">
                                <img src={selectedFileUrl || defaultImg} alt="Dog Preview" style={{ height: '19rem', width:'100%', border: '1px solid #ccc', borderRadius: '8px', objectFit: 'cover' }} />
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

                        <ul className="nav nav-tabs CustomNav" style={{borderBottom: 'none'}}>
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
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'owner' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('owner')}>Owner
                                </button>
                            </li>
                        </ul>

                        <div className="tab-content mt-4">
                            {renderTabContent()}
                        </div>

                        <div className="mt-5">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Insert Dog</button>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    );
};

export default InsertDogForm;
