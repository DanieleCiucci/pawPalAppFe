import React, { useState } from "react";
import profileDefaultImage from "../../assets/profileImageDefault.png";

const DetailsOwnerMainDetail = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [dog, setDog] = useState(props.dog);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setSelectedFileUrl(URL.createObjectURL(file));

        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64String = reader.result.split(',')[1];
            setDog(prevDog => ({
                ...prevDog,
                photo: base64String
            }));

            const updateImage = {
                id: dog.id,
                photo: base64String
            };

            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:8080/api/dog/update-owner-image`, {
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
    };

    return (
        <div className="container mt-3">
            <div className="row align-items-center">
                <div className="col-md-2 col-lg-2 d-flex justify-content-center align-items-center position-relative">
                    <input
                        id="file-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload" className="position-relative d-inline-block">
                        <img
                            src={dog.photo ? `data:image/jpeg;base64,${dog.photo}` : profileDefaultImage}
                            alt="Profile"
                            className="img-fluid rounded-circle"
                            style={{
                                maxHeight: '8.5rem',
                                maxWidth: '8.5rem',
                                border: '1px solid white',
                                objectFit: 'cover'
                            }}
                        />
                        {!props.canNotEdit && (
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
                        ) }
                    </label>
                </div>
                <div className="col-md-8 col-lg-6 text-center text-md-start">
                    <h3 className="mb-0">
                        {dog.ownerName} {dog.surname}
                    </h3>
                    <p className="mt-2 text-muted">
                        Owner of {dog.name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DetailsOwnerMainDetail;
