import React, { useState, useEffect } from "react";
import AuthHeader from "../AuthHeader";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchNearbySitters } from './service/AppointmentService';
import imageCard from "../../assets/dog1.jpg";
import Pagination from "../Paginator";
import {Link} from "react-router-dom";

const ScheduleAppointment = (props) => {
    const [serviceType, setServiceType] = useState('');
    const [appointmentDateTime, setAppointmentDateTime] = useState('');
    const [distance, setDistance] = useState('500');
    const [sitters, setSitters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 6;

    const serviceOptions = [
        { value: '', label: "Any" },
        { value: '0', label: 'Daily pet sitting' },
        { value: '1', label: 'Pet sitting at the owner\'s home' },
        { value: '3', label: 'Pet sitting at the sitter\'s home' },
        { value: '4', label: 'Walk' },
        { value: '5', label: 'Pet sitting for more than a day' },
    ];

    const distanceOptions = [
        { value: '500', label: '500 metres' },
        { value: '5000', label: '5 km' },
        { value: '20000', label: '20 km' },
        { value: '100000', label: '100 km' },
        { value: '1000000000000', label: 'All' },
    ];

    const handleServiceTypeChange = (event) => {
        setServiceType(event.target.value);
    };

    const handleDateTimeChange = (event) => {
        setAppointmentDateTime(event.target.value);
    };

    const handleDistanceChange = (event) => {
        setDistance(event.target.value);
    };

    const fetchSitters = async (page = 0) => {
        const token = localStorage.getItem('authToken');
        const filters = { serviceType, appointmentDateTime, distance };

        try {
            const data = await fetchNearbySitters(filters, token, page, pageSize);
            setSitters(data.content); // Use the content key from the paginated response
            setTotalPages(data.totalPages);
            setCurrentPage(data.number); // Update the current page based on the response

            console.log("Nearby sitters:", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSearchClick = () => {
        fetchSitters(0);
    };

    useEffect(() => {
        fetchSitters(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="AuthHome">
            <AuthHeader logout={props.logout} />
            <div className="row mb-0">
                <div className="col-2 d-none d-md-block"></div>
                <div className="col-10 m-3 ml-lg-5 col-md-8">
                    <h1 style={{ fontWeight: 'bold' }}>
                        Schedule Appointment
                    </h1>
                    <div className="mt-2">
                        <p style={{ fontSize: '1rem', color: '#686565' }}>
                            In this section, you can schedule a new appointment.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row" style={{ marginTop: '-2rem' }}>
                <div className="col-2 d-none d-md-block"></div>
                <div className="col-10 m-3  col-md-8">
                    <hr style={{ borderTop: "1px solid #838383",  }} />
                </div>
            </div>

            <div className="row">
                <div className="col-2 d-none d-md-block"></div>
                <div className="col-11 m-3  col-md-8">
                    <div className="filterSection">
                        <div className="row m-3">
                            <div className="col-md-6 mb-3 mt-3">
                                <label htmlFor="serviceType" className="form-label">Type of Service</label>
                                <select
                                    id="serviceType"
                                    className="form-select"
                                    value={serviceType}
                                    onChange={handleServiceTypeChange}
                                >
                                    <option value="" disabled hidden>
                                        Select the type of service
                                    </option>
                                    {serviceOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3 mt-3">
                                <label htmlFor="appointmentDateTime" className="form-label">Appointment Date & Time</label>
                                <input
                                    type="datetime-local"
                                    id="appointmentDateTime"
                                    className="form-control"
                                    value={appointmentDateTime}
                                    onChange={handleDateTimeChange}
                                />
                            </div>
                        </div>
                        <div className="row m-3 align-items-end">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="distance" className="form-label">Distance</label>
                                <select
                                    id="distance"
                                    className="form-select"
                                    value={distance}
                                    onChange={handleDistanceChange}
                                >
                                    {distanceOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3 d-flex justify-content-end align-items-end">
                                <button className="btn btn-primary" onClick={handleSearchClick}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="aviableSitterWrapper">
                        <div className="row mt-5">
                            {sitters.length > 0 ? (
                                <>
                                    <h3>Available nearby Sitters:</h3>
                                    {sitters.map((sitter) => (
                                        <div key={sitter.id} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center mt-5">
                                            <div className="card" style={{width: '18rem'}}>
                                                <img
                                                    className="card-img-top"
                                                    src={sitter.photo ? `data:image/jpeg;base64,${sitter.photo}` : imageCard}
                                                    alt={`${sitter.name} ${sitter.surname}`}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{sitter.name} {sitter.surname}</h5>
                                                    <p className="card-text">
                                                        <strong>City:</strong> {sitter.city || 'N/A'}
                                                    </p>
                                                    <p className="card-text">
                                                        <strong>Address:</strong> {sitter.address || 'N/A'}
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    <Link to={{ pathname: `/profile/${sitter.id}`, state: { sitterId: sitter.id } }}
                                                          className="btn btn-outline-primary m-3">Schedule</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p>No sitters found</p>
                            )}
                            {totalPages > 1 && (
                                <div className="d-flex justify-content-end mt-4 mb-4">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className="col-2 d-none d-md-block"></div>
            </div>
        </div>
    );
};

export default ScheduleAppointment;
