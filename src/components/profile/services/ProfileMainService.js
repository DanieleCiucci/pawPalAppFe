export const fetchProfileDetails = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`http://localhost:8080/api/profile/sitter`, {
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
        console.error("Error fetching profile details:", error);
        throw error;
    }
};

export const updateProfileImage = async (profileId, base64String) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`http://localhost:8080/api/profile/update-main-image`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id: profileId, mainPhoto: base64String })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating profile image:", error);
        throw error;
    }
};

export const fetchDogsOwnedBySitter = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`http://localhost:8080/api/profile/get-all-dog-owned-by-sitter`, {
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
        console.error("Error fetching dogs owned by sitter:", error);
        return [];
    }
};

