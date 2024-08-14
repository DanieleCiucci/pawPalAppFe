import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthHeader from "./AuthHeader";
import imageCard from "../assets/dog1.jpg";
import Pagination from "./Paginator";
import { fetchUserRole } from "../services/roleSerivces";

const YourDog = (props) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [userRole, setUserRole] = useState(null); // State for user role
    const navigate = useNavigate();

    const fetchDogs = async (page = 0, role) => {
        const token = localStorage.getItem('authToken');
        try {
            let response;

            if (role === 0) {
                console.log("Fetching dogs for sitter");
                response = await fetch(`http://localhost:8080/api/dog/all-dog-sitter?page=${page}&size=6`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            } else if (role === 1) {
                console.log("Fetching dogs for owner");
                response = await fetch(`http://localhost:8080/api/dog/all-dog-owner?page=${page}&size=6`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            } else {
                return;
            }

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
        }
    };

    useEffect(() => {
        const initializePage = async () => {
            const role = await fetchUserRole();
            if (role !== null) {
                setUserRole(role);
                fetchDogs(currentPage, role);
            }
        };

        initializePage();
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
                <div className="col-2 d-none d-sm-block"></div>
                <div className="col-12 m-3 col-md-5 m-md-0">
                    <h1 style={{ fontWeight: 'bold' }}>
                        Your dog to assist
                    </h1>
                    <div className="mt-2 col-12">
                        <p style={{ fontSize: '1rem', color: '#686565' }}>
                            In this section, you can view the dogs that you have entered to assist. <br />
                            You can add a new dog using the "Insert new dog" button.
                        </p>
                    </div>
                </div>
                <div className="col-8 m-3 col-md-2 mt-md-5">
                    <button className="btn btn-primary" onClick={handleInsertDog}>Insert dog</button>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="row">
                        {userRole === 1 && data.length > 0 ? (
                            data.map((dog, index) => (
                                <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img
                                            className="card-img-top"
                                            src={dog.image ? `data:image/jpeg;base64,${dog.image}` : imageCard}
                                            alt="Dog"
                                        />
                                        <div className="card-body">
                                            <p className="card-text"><strong>{dog.dogName}</strong></p>
                                            <p className="card-text">{dog.dogBreeds}</p>
                                            <p className="card-text">{dog.detail}</p>
                                            <div className="d-flex justify-content-end">
                                                <a href={`/yourdogs/${dog.idDog}`} className="btn btn-outline-primary">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : userRole === 0 && data.length > 0 ? (
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

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-end mt-4 mb-4">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                style={{color: 'yourCustomColorHere'}} // Customize the pagination color here
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YourDog;
