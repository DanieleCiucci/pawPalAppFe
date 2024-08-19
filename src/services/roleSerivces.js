export const fetchUserRole = async () => {
    const token = localStorage.getItem('authToken');

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        const response = await fetch(apiUrl + "/role", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const role = await response.json();
        return role;
    } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
    }
};
