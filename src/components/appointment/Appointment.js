// Appointments.js
import React, { useEffect, useState } from "react";
import AuthHeader from "../AuthHeader";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchUserRole } from "../../services/roleSerivces";
import { fetchAppointmentsByState } from "./service/AppointmentService";
import AppointmentCard from './AppointmentCard';
const Appointments = (props) => {
    const [activeTab, setActiveTab] = useState('pending');
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [role, setRole] = useState(null);

    // Fetch user role on mount
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const userRole = await fetchUserRole();
                setRole(userRole);
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };

        fetchRole();
    }, []);

    // Fetch appointments whenever the active tab or current page changes
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const idState = getIdStateForTab(activeTab);
                const data = await fetchAppointmentsByState(idState);
                setAppointments(data);
                setTotalPages(Math.ceil(data.totalItems / 6)); // Adjust as needed
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, [activeTab, currentPage]);

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

    // Handle tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(0); // Reset page on tab change
    };

    // Handle page changes
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div className="AuthHome">
            <AuthHeader logout={props.logout} />
            <div className="row mb-0">
                <div className="col-2"></div>
                <div className="col-5 m-lg-5">
                    <h1 style={{fontWeight: 'bold'}}>
                        Appointments
                    </h1>
                    <div className="mt-2">
                        <p style={{fontSize: '1rem', color: '#686565'}}>
                            In this section, you can view the list of appointments. <br/>
                            You can schedule a new appointment using the "Schedule Appointment" button.
                        </p>
                    </div>

                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                    <button className="homeButton">Schedule Appointment</button>
                </div>

                <div className="row" style={{marginTop: '-2rem'}}>
                    <div className="col-2"></div>
                    <div className="col-8">
                        <hr style={{borderTop: "1px solid #838383", marginLeft:'3rem'}}/>
                    </div>
                </div>
            </div>

            <div className="row">
            <div className="col-2"></div>
                <div className="col-8">

                    <ul className="nav nav-tabs CustomNav" style={{borderBottom: 'none', marginLeft: '2rem'}}>
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
                        {!role && (
                            <>
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
                            </>
                        )}
                    </ul>
                    <div className="tab-content mt-4">
                        <div className="row mt-5">
                            {appointments.length > 0 ? (
                                appointments.map((appointment, index) => (
                                    <AppointmentCard key={index} appointment={appointment}/>
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <p>No appointments available for this tab.</p>
                                </div>
                            )}
                        </div>
                        {totalPages > 1 && (
                            <div className="d-flex justify-content-end mt-4 mb-4">

                            </div>
                        )}
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
};

export default Appointments;