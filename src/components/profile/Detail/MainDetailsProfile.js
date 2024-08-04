import React, { useState } from "react";
import profileDefaultImage from "../../../assets/profileImageDefault.png"

const MainDetailsProfile = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [profile, setProfile] = useState(props.profile);

    const handleFileChange = (event) => {
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

            const updateImage = {
                id: profile.id,
                photo: base64String
            };

            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:8080/api/profile/update-profile-image`, {
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
        <div>
            <div className="row">
                <div className="col-2 position-relative">
                    {/* Position the pencil icon closer to the image */}
                    <label htmlFor="file-upload" className="file-upload-label">
                        <i
                            className="bi bi-pencil position-absolute"
                            style={{
                                top: '6.5rem',
                                right: '0.5rem',
                                cursor: 'pointer',
                                borderRadius: '50%',
                                padding: '0.2rem',
                                zIndex: 1 // Ensure it's above the image
                            }}
                        ></i>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <img
                        src={profile.photo ? `data:image/jpeg;base64,${profile.photo}` : profileDefaultImage}
                        alt="Profile"
                        style={{
                            height: '8.5rem',
                            width: '8.5rem',
                            border: '1px solid white',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                <div className="col-10 d-flex align-items-center">
                    <div>
                        <h3 className="mb-0">
                            {profile.name}{" " + profile.surname}
                        </h3>
                        <p className="mt-2 ms-3 text-muted">
                            {profile.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainDetailsProfile;
