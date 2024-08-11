import React, { useEffect, useState } from "react";
import AuthHeader from "../AuthHeader";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchUserRole } from "../../services/roleSerivces";
import { fetchAppointmentsByState, fetchAppointmentsOwnerByState } from "./service/AppointmentService";
import AppointmentCard from './AppointmentCard';
import Pagination from '../Paginator';
import { useNavigate } from "react-router-dom";
import AppointmentModalSitter from "./popUp/NewAppointmentPopUpSitter";

const Appointments = (props) => {
    const [activeTab, setActiveTab] = useState('pending');
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
            }
        };

        if (!isLoading) {
            fetchAppointments();
        }
    }, [activeTab, currentPage, role, isLoading]);

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
            <div className="row mb-0">
                <div className="col-2"></div>
                <div className="col-5 m-lg-5">
                    <h1 style={{ fontWeight: 'bold' }}>
                        Appointments
                    </h1>
                    <div className="mt-2">
                        <p style={{ fontSize: '1rem', color: '#686565' }}>
                            In this section, you can view the list of appointments. <br />
                            You can schedule a new appointment using the "Schedule Appointment" button.
                        </p>
                    </div>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                    <button className="homeButton" onClick={handleInsertAppointment}>Schedule Appointment</button>
                </div>

                <div className="row" style={{ marginTop: '-2rem' }}>
                    <div className="col-2"></div>
                    <div className="col-8">
                        <hr style={{ borderTop: "1px solid #838383", marginLeft: '3rem' }} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <ul className="nav nav-tabs CustomNav" style={{ borderBottom: 'none', marginLeft: '2rem' }}>
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
                </div>
                <div className="col-2"></div>
            </div>
            <AppointmentModalSitter show={modalShow} handleClose={handleCloseModal} sitterId={props.sitterId}/>
        </div>
    );
};

export default Appointments;
