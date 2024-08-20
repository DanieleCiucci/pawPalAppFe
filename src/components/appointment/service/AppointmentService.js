


export const fetchAppointmentsByState = async (idState, page, size) => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(apiUrl + `/api/appointment/get-sitter-appointment?idState=${idState}&page=${page}&size=${size}`, {
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

    const apiUrl = process.env.REACT_APP_API_URL;

    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(apiUrl + `/api/appointment/get-owner-appointment?idState=${idState}&page=${page}&size=${size}`, {
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

     const url = process.env.REACT_APP_API_URL;

    const baseUrl =  url + '/api/sitters/nearby';

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

    let apiUrl = `${baseUrl}?${queryParams.join('&')}`;

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

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error('User not authenticated.');
    }

    const response = await fetch(apiUrl + "/api/appointment/schedule-appointment", {
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


export const fetchOwners = async (token) => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const API_URL = apiUrl + '/api/appointment';

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

    const apiUrl = process.env.REACT_APP_API_URL;
    const API_URL = apiUrl + '/api/appointment';

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

    const apiUrl = process.env.REACT_APP_API_URL;
    const API_URL = apiUrl + '/api/appointment';

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

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(apiUrl + `/api/dog/all-dog-owner?page=${currentPage}&size=6`, {
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
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(apiUrl + `/api/appointment/detail/${idAppointment}`, {
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

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(apiUrl  +`/api/appointment/all-dog-in-appointment/${idAppointment}?page=${currentPage}&size=6`, {
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

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(apiUrl + `/api/appointment/accept/${idAppointment}`, {
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

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(apiUrl + `/api/appointment/reject/${idAppointment}`, {
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

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(apiUrl + `/api/appointment/cancel/${idAppointment}`, {
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

