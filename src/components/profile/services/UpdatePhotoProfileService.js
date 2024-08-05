export const updateProfileImage = async (profileId, base64String) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`http://localhost:8080/api/profile/update-profile-image`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id: profileId, photo: base64String })
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
