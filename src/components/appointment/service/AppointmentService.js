
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
