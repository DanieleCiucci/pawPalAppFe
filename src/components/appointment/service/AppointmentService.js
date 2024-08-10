
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



