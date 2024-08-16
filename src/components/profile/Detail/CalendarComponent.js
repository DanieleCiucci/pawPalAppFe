import React, { useState, useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Calendar, Whisper, Popover, Badge } from 'rsuite';

const CalendarComponent = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = localStorage.getItem('authToken');

            try {
                const response = await fetch('http://localhost:8080/api/appointment/calendar', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setAppointments(data);  // Update state with the fetched data

            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();

    }, []);

    function getTodoList(date) {
        const dateStr = date.toISOString().split('T')[0]; // Format date to "YYYY-MM-DD"
        return appointments
            .filter(appointment => {
                const [year, month, day] = appointment.startDate;
                const appointmentDateStr = new Date(year, month - 1, day).toISOString().split('T')[0];
                return appointmentDateStr === dateStr;
            })
            .map(appointment => ({
                time: `${appointment.startDate[3].toString().padStart(2, '0')}:${appointment.startDate[4].toString().padStart(2, '0')} am`, // Adjust time format if needed
                title: `${appointment.ownerName} - ${appointment.state}`
            }));
    }

    function renderCell(date) {
        const list = getTodoList(date);

        if (list.length) {
            return (
                <Whisper
                    placement="top"
                    trigger="click"
                    speaker={
                        <Popover title={`Appointments for ${date.toDateString()}`}>
                            {list.map((item, index) => (
                                <div key={index} style={{ padding: '5px 0', fontSize: 'x-small' }}>
                                    <Badge /> <b>{item.time}</b> - {item.title}
                                </div>
                            ))}
                        </Popover>
                    }
                >
                    <div style={{ cursor: 'pointer', width: '100%' }}>
                        <ul className="calendar-todo-list" style={{ padding: '0', margin: '0', fontSize: 'x-small' }}>
                            {list.map((item, index) => (
                                <li key={index} style={{ padding: '2px 0' }}>
                                    <Badge /> <b>{item.time}</b> - {item.title}
                                </li>
                            ))}
                            {list.length > 2 && <li>+{list.length - 2} more</li>}
                        </ul>
                    </div>
                </Whisper>
            );
        }

        return null;
    }

    return (
        <div style={{ maxWidth: '100%' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <Calendar bordered renderCell={renderCell} />
            </div>
        </div>
    );
};

export default CalendarComponent;
