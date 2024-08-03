
export const findNewOwner = async (role) => {
    try {
        const endpoint = role === 0 ? "owner" : "sitter";
        const response = await fetch(`http://localhost:8080/api/find-new-user/${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseBody = await response.text();
        const data = responseBody ? JSON.parse(responseBody) : [];
        return data;
    } catch (error) {
        console.error(`Error fetching ${role === 0 ? 'owners' : 'sitters'} data:`, error);
        return [];
    }
};
