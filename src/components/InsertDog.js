import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import 'bootstrap/dist/css/bootstrap.min.css';

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
            dateOfBirth: "",
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
            <div className="container mt-5">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h1 className="font-weight-bold">Insert Dog Page</h1>
                        <p className="text-muted" style={{ fontSize: '1rem' }}>
                            In this section you can view the dog to assist that you insert. <br />
                            You can insert a dog with the button Insert new dog.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <h2>Dog Information</h2>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Name:</label>
                                    <input type="text" className="form-control" name="dog.name" value={formData.dog.name} onChange={handleChange} />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Age in Years:</label>
                                    <input type="number" className="form-control" name="dog.ageInYear" value={formData.dog.ageInYear} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Age in Months:</label>
                                    <input type="number" className="form-control" name="dog.ageMonth" value={formData.dog.ageMonth} onChange={handleChange} />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Weight:</label>
                                    <input type="number" className="form-control" name="dog.weight" value={formData.dog.weight} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Gender ID:</label>
                                    <input type="number" className="form-control" name="dog.idGender" value={formData.dog.idGender} onChange={handleChange} />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Breeds:</label>
                                    <input type="text" className="form-control" name="dog.breeds" value={formData.dog.breeds} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Date of Adoption:</label>
                                    <input type="date" className="form-control" name="dog.dateAdoption" value={formData.dog.dateAdoption} onChange={handleChange} />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Date of Birth:</label>
                                    <input type="date" className="form-control" name="dog.dateOfBirth" value={formData.dog.dateOfBirth} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 form-group">
                                    <label>Description:</label>
                                    <input type="text" className="form-control" name="dog.description" value={formData.dog.description} onChange={handleChange} />
                                </div>
                            </div>

                            <h2>Owner Information</h2>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Name:</label>
                                    <input type="text" className="form-control" name="owner.name" value={formData.owner.name} onChange={handleChange} />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Surname:</label>
                                    <input type="text" className="form-control" name="owner.surname" value={formData.owner.surname} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Email:</label>
                                    <input type="email" className="form-control" name="owner.email" value={formData.owner.email} onChange={handleChange} />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Phone Number:</label>
                                    <input type="tel" className="form-control" name="owner.phoneNumber" value={formData.owner.phoneNumber} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>City:</label>
                                    <input type="text" className="form-control" name="owner.city" value={formData.owner.city} onChange={handleChange} />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Address:</label>
                                    <input type="text" className="form-control" name="owner.address" value={formData.owner.address} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 form-group">
                                    <label>Photo URL:</label>
                                    <input type="text" className="form-control" name="owner.photo" value={formData.owner.photo} onChange={handleChange} />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Insert Dog</button>
                        </form>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    );
};

export default InsertDogForm;
