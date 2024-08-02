export function roleService() {
}

export const fetchUserRole = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch("http://localhost:8080/role", {
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
