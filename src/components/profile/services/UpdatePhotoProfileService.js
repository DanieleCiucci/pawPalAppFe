export const updateProfileImage = async (profileId, base64String) => {
    const token = localStorage.getItem('authToken');

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        const response = await fetch(apiUrl + `/api/profile/update-profile-image`, {
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
