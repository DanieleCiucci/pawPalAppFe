import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthHeader from "./AuthHeader";
import imageCard from "../assets/dog1.jpg"; // Placeholder image
import Pagination from "./Paginator"; // Import the custom Pagination component

const YourDog = (props) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchDogs = async (page = 0) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://localhost:8080/api/dog/all-dog-sitter?page=${page}&size=9`, {
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
            const dogsData = responseBody.content || [];
            setData(dogsData);
            setTotalPages(responseBody.totalPages);
            setCurrentPage(responseBody.number);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error, e.g., show an error message
        }
    };

    useEffect(() => {
        fetchDogs(currentPage);
    }, [currentPage]);

    const handleInsertDog = () => {
        navigate("/yourdogs/insert");
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const { logout } = props;

    return (
        <div className="AuthHome">
            <AuthHeader logout={logout} />
            <div className="row">
                <div className="col-2"></div>
                <div className="col-5 m-lg-5">
                    <h1 style={{ fontWeight: 'bold' }}>
                        Your dog to assist
                    </h1>
                    <div className="mt-2">
                        <p style={{ fontSize: '1rem', color: '#686565' }}>
                            In this section, you can view the dogs that you have entered to assist. <br />
                            You can add a new dog using the "Insert new dog" button.
                        </p>
                    </div>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                    <button className="homeButton" onClick={handleInsertDog}>Insert dog</button>
                </div>
            </div>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="row">
                        {data.length > 0 ? (
                            data.map((dog, index) => (
                                <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img
                                            className="card-img-top"
                                            src={dog.dogImage ? `data:image/jpeg;base64,${dog.dogImage}` : imageCard}
                                            alt="Dog"
                                        />
                                        <div className="card-body">
                                            <p className="card-text"><strong>{dog.dogName}</strong></p>
                                            <p className="card-text">{dog.dogBreeds} owner: {dog.ownerName} {dog.ownerSurname}</p>
                                            <p className="card-text">{dog.dogDescription}</p>
                                            <div className="d-flex justify-content-end">
                                                <a href={`/yourdogs/${dog.idDog}`} className="btn btn-outline-primary">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <p>No dogs available.</p>
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-end mt-4 m-lg-5">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YourDog;
