import React, { useState, useEffect } from 'react';
import { fetchAllDogsInAppointment } from './service/AppointmentService';
import imageCard from "../../assets/dog1.jpg";
import Pagination from "../Paginator";

const DogListDetailAppointment = ({ appointmentId, currentPage, onPageChange }) => {
    const [loadingDogs, setLoadingDogs] = useState(false);
    const [error, setError] = useState(null);
    const [dogs, setDogs] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (!appointmentId) return;

        const fetchDogsData = async () => {
            setLoadingDogs(true);
            setError(null);
            try {
                const dogData = await fetchAllDogsInAppointment(appointmentId, currentPage);
                setDogs(dogData.content || []);
                setTotalPages(dogData.totalPages);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch dogs.');
            } finally {
                setLoadingDogs(false);
            }
        };

        fetchDogsData();
    }, [appointmentId, currentPage]);

    if (loadingDogs) return <div>Loading dogs...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            {dogs.length > 0 ? (
                <>
                    <div className="row mt-3">
                        {dogs.map((dog) => (
                            <div key={dog.idDog} className="col-md-6 mb-3">
                                <div className="d-flex align-items-center border p-2"
                                     style={{ borderRadius: '14px', width: '100%' }}>
                                    <img
                                        src={dog.image ? `data:image/jpeg;base64,${dog.image}` : imageCard}
                                        alt={dog.dogName}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            marginRight: '10px'
                                        }}
                                    />
                                    <div className="d-flex flex-column flex-grow-1 justify-content-center mb-3">
                                        <strong>{dog.name}</strong>
                                        <p className="mb-0 text-muted" style={{ fontSize: '14px' }}>{dog.breeds}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-end mt-4 mb-4">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        </div>
                    )}
                </>
            ) : (
                <p>No dogs available</p>
            )}
        </>
    );
};

export default DogListDetailAppointment;
