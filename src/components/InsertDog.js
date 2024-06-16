import React, { useState } from "react";
import AuthHeader from "./AuthHeader";

const InsertDogForm = ({ logout }) => {
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
            description: ""
        },
        owner: {
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            city: "",
            address: "",
            photo: ""
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [section, field] = name.split(".");

        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');

        fetch("http://localhost:8080/api/dog/insert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
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

    return (
        <div className="AuthHome">
            <AuthHeader logout={logout}/>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-5 m-lg-5">
                    <h1 style={{fontWeight: 'bold'}}>
                        Insert dog page
                    </h1>
                    <div className="mt-2">
                        <p style={{fontSize: '1rem', color:'#686565'}}>
                            In this section you can view the dog to assist that you insert. <br />
                            You can insert a dog with the button Insert new dog.
                        </p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <h2>Dog Information</h2>
                <label>
                    Name:
                    <input type="text" name="dog.name" value={formData.dog.name} onChange={handleChange} />
                </label>
                <label>
                    Age in Years:
                    <input type="number" name="dog.ageInYear" value={formData.dog.ageInYear} onChange={handleChange} />
                </label>
                <label>
                    Age in Months:
                    <input type="number" name="dog.ageMonth" value={formData.dog.ageMonth} onChange={handleChange} />
                </label>
                <label>
                    Weight:
                    <input type="number" name="dog.weight" value={formData.dog.weight} onChange={handleChange} />
                </label>
                <label>
                    Gender ID:
                    <input type="number" name="dog.idGender" value={formData.dog.idGender} onChange={handleChange} />
                </label>
                <label>
                    Breeds:
                    <input type="text" name="dog.breeds" value={formData.dog.breeds} onChange={handleChange} />
                </label>
                <label>
                    Date of Adoption:
                    <input type="date" name="dog.dateAdoption" value={formData.dog.dateAdoption} onChange={handleChange} />
                </label>
                <label>
                    Date of Birth:
                    <input type="date" name="dog.dateOfBirdth" value={formData.dog.dateOfBirdth} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="dog.description" value={formData.dog.description} onChange={handleChange} />
                </label>

                <h2>Owner Information</h2>
                <label>
                    Name:
                    <input type="text" name="owner.name" value={formData.owner.name} onChange={handleChange} />
                </label>
                <label>
                    Surname:
                    <input type="text" name="owner.surname" value={formData.owner.surname} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="owner.email" value={formData.owner.email} onChange={handleChange} />
                </label>
                <label>
                    Phone Number:
                    <input type="tel" name="owner.phoneNumber" value={formData.owner.phoneNumber} onChange={handleChange} />
                </label>
                <label>
                    City:
                    <input type="text" name="owner.city" value={formData.owner.city} onChange={handleChange} />
                </label>
                <label>
                    Address:
                    <input type="text" name="owner.address" value={formData.owner.address} onChange={handleChange} />
                </label>
                <label>
                    Photo URL:
                    <input type="text" name="owner.photo" value={formData.owner.photo} onChange={handleChange} />
                </label>

                <button type="submit">Insert Dog</button>
            </form>
        </div>
    );
};

export default InsertDogForm;
