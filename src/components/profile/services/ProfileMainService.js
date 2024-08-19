const apiUrl = process.env.REACT_APP_API_URL;

export const fetchProfileDetails = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(apiUrl + `/api/profile/sitter`, {
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

export const fetchProfileDetailsSitter = async (sitterId) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(apiUrl + `/api/profile/sitter/`+sitterId, {
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


export const fetchProfileDetailsOwner = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(apiUrl + `/api/profile/owner`, {
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
        const response = await fetch(apiUrl + `/api/profile/update-main-image`, {
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
        const response = await fetch(apiUrl + `/api/profile/get-all-dog-owned-by-sitter`, {
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

export const fetchDogsOwnedByIdSitter = async (sitterId) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(apiUrl +`/api/profile/get-all-dog-owned-by-sitter/`+sitterId, {
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



export const fetchDogsOwnedByOwner = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(apiUrl +`/api/profile/get-all-dog-owned-by-owner`, {
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


