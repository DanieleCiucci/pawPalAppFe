// ProfileMainService.js
export const fetchAppointmentsByState = async (idState) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    try {
        const response = await fetch(`http://localhost:8080/api/appointment/get-sitter-appointment?idState=${idState}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include the token in the Authorization header
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if the response is not ok
        }

        return await response.json(); // Parse and return the JSON response
    } catch (error) {
        console.error("Error fetching appointments by state:", error); // Log the error
        throw error; // Re-throw the error to be handled by the calling function
    }
};
