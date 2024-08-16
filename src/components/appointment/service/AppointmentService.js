
export const fetchAppointmentsByState = async (idState, page, size) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    try {
        const response = await fetch(`http://localhost:8080/api/appointment/get-sitter-appointment?idState=${idState}&page=${page}&size=${size}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching appointments by state:", error);
        throw error;
    }
};

export const fetchAppointmentsOwnerByState = async (idState, page, size) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`http://localhost:8080/api/appointment/get-owner-appointment?idState=${idState}&page=${page}&size=${size}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching appointments by state:", error);
        throw error;
    }
};

export const fetchNearbySitters = async (filters, token, page, size=6) => {
    const baseUrl = 'http://localhost:8080/api/sitters/nearby';

    const queryParams = [];
    if (filters.appointmentDateTime) {
        let formattedDate = filters.appointmentDateTime + ':00';
        queryParams.push(`date=${encodeURIComponent(formattedDate)}`);
    }
    if (filters.serviceType) {
        queryParams.push(`serviceType=${encodeURIComponent(filters.serviceType)}`);
    }
    if (filters.distance) {
        queryParams.push(`distance=${encodeURIComponent(filters.distance)}`);
    }

    // Add pagination parameters
    queryParams.push(`page=${page}`);
    queryParams.push(`size=${size}`);

    const apiUrl = `${baseUrl}?${queryParams.join('&')}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to fetch nearby sitters');
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const scheduleAppointment = async (appointmentData) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error('User not authenticated.');
    }

    const response = await fetch("http://localhost:8080/api/appointment/schedule-appointment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

const API_URL = 'http://localhost:8080/api/appointment';

export const fetchOwners = async (token) => {

    const API_URL = 'http://localhost:8080/api/appointment';
    try {
        const response = await fetch(`${API_URL}/get-all-owner-linked-to-sitter`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching owners:', error);
        throw error;
    }
};

export const fetchDogs = async (ownerId, page, token) => {
    try {
        const response = await fetch(`${API_URL}/all-dog-owner/?ownerId=${ownerId}&page=${page}&size=6`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching dogs:', error);
        throw error;
    }
};

export const scheduleAppointmentSitter = async (appointmentData) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_URL}/schedule-appointment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(appointmentData),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error scheduling appointment:', error);
        throw error;
    }
};


export const fetchDogsOwner = async (currentPage) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:8080/api/dog/all-dog-owner?page=${currentPage}&size=6`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching dogs:", error);
        throw new Error('Error fetching dog data.');
    }
};

export const fetchAppointmentDetails = async (idAppointment) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:8080/api/appointment/detail/${idAppointment}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching appointment details:", error);
        throw new Error('Error fetching appointment details.');
    }
};

export const fetchAllDogsInAppointment = async (idAppointment,currentPage )=>{
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:8080/api/appointment/all-dog-in-appointment/${idAppointment}?page=${currentPage}&size=6`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching dogs:", error);
        throw new Error('Error fetching dog data.');
    }

}

export const acceptAppointment = async (idAppointment )=>{
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:8080/api/appointment/accept/${idAppointment}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching dogs:", error);
        throw new Error('Error fetching dog data.');
    }
}

export const refuseAppointment = async (idAppointment )=>{
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:8080/api/appointment/reject/${idAppointment}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching dogs:", error);
        throw new Error('Error fetching dog data.');
    }
}

export const cancelAppointment = async (idAppointment) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:8080/api/appointment/cancel/${idAppointment}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {

            const errorMessage = await response.text();
            throw new Error(errorMessage || 'An error occurred while cancelling the appointment.');
        }

        return await response.json();
    } catch (error) {
        console.error("Error cancelling appointment:", error);
        throw error;
    }
};

