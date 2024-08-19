import React, { useEffect, useState } from "react";
import AuthHeader from "../AuthHeader";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchUserRole } from "../../services/roleSerivces";
import { fetchAppointmentsByState, fetchAppointmentsOwnerByState } from "./service/AppointmentService";
import AppointmentCard from './AppointmentCard';
import Pagination from '../Paginator';
import { useNavigate } from "react-router-dom";
import AppointmentModalSitter from "./popUp/NewAppointmentPopUpSitter";
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner component from react-bootstrap

const Appointments = (props) => {
    const [activeTab, setActiveTab] = useState('pending');
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Spinner state
    const pageSize = 6;
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);

    // Fetch user role on mount
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const userRole = await fetchUserRole();
                setRole(userRole);
            } catch (error) {
                console.error("Error fetching user role:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRole();
    }, []);

    // Fetch appointments whenever the active tab, current page, or role changes
    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true); // Show spinner
            try {
                const idState = getIdStateForTab(activeTab);
                let data;

                if (role === 0) {
                    data = await fetchAppointmentsByState(idState, currentPage, pageSize);
                } else {
                    data = await fetchAppointmentsOwnerByState(idState, currentPage, pageSize);
                }

                setAppointments(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setIsLoading(false); // Hide spinner
            }
        };

        if (!isLoading) {
            fetchAppointments();
        }
    }, [activeTab, currentPage, role]);

    // Determine ID state based on active tab
    const getIdStateForTab = (tab) => {
        switch (tab) {
            case 'pending': return 0;
            case 'confirmed': return 1;
            case 'rejected': return 2;
            case 'cancelled': return 3;
            case 'passed': return 4;
            default: return 0;
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(0); // Reset to first page on tab change
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleInsertAppointment = () => {
        if (role === 1) {
            navigate("/appointment/schedule-appointment");
        } else {
            setModalShow(true); // Show the modal for sitters
        }
    };

    const handleCloseModal = () => setModalShow(false);

    return (
        <div className="AuthHome">
            <AuthHeader logout={props.logout} />
            <div>
                <div className="row mb-0">
                    <div className="col-2 d-none d-sm-block"></div>
                    <div className="col-12 m-3 col-md-5 m-md-0">
                        <h1 style={{ fontWeight: 'bold' }}>
                            Appointments
                        </h1>
                        <div className="mt-2 col-12">
                            <p style={{ fontSize: '1rem', color: '#686565' }}>
                                In this section, you can view the list of appointments. <br />
                                You can schedule a new appointment using the "Schedule Appointment" button.
                            </p>
                        </div>
                    </div>
                    <div className="col-8 m-3 col-md-2 mt-md-5">
                        <button className="btn btn-primary" onClick={handleInsertAppointment}>Schedule Appointment</button>
                    </div>

                    <div className="row mt-2 mt-md-0" style={{ marginTop: '-2rem !important' }}>
                        <div className="col-2 d-none d-md-block"></div>
                        <div className="col-12 m-3 col-md-8 m-md-0">
                            <hr style={{ borderTop: "1px solid #838383" }} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2 d-none d-md-block"></div>
                    <div className="col-10 m-3 col-md-8 m-md-0">
                        {/* Tabs for larger screens */}
                        <ul className="nav nav-tabs CustomNav d-none d-md-flex" style={{ borderBottom: 'none', marginLeft: '2rem' }}>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('pending')}
                                >
                                    Pending
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'confirmed' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('confirmed')}
                                >
                                    Confirmed
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'rejected' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('rejected')}
                                >
                                    Rejected
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'cancelled' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('cancelled')}
                                >
                                    Cancelled
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'passed' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('passed')}
                                >
                                    Passed
                                </button>
                            </li>
                        </ul>

                        {/* Dropdown for small screens */}
                        <div className="d-md-none">
                            <div className="col-8 mb-3">
                                <label htmlFor="appointmentFilter" className="form-label">Filter by Status</label>
                                <select
                                    id="appointmentFilter"
                                    className="form-select"
                                    value={activeTab}
                                    onChange={(e) => handleTabChange(e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="passed">Passed</option>
                                </select>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="mt-5"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <div className="tab-content mt-4">
                                <div className="row mt-5">
                                    {appointments.length > 0 ? (
                                        appointments.map((appointment, index) => (
                                            <AppointmentCard key={index} appointment={appointment} role={role} />
                                        ))
                                    ) : (
                                        <div className="col-12 text-center">
                                            <p>No appointments available.</p>
                                        </div>
                                    )}
                                </div>
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
                        )}
                    </div>
                    <div className="col-2"></div>
                </div>
                <AppointmentModalSitter show={modalShow} handleClose={handleCloseModal} sitterId={props.sitterId} />
            </div>
        </div>
    );
};

export default Appointments;
