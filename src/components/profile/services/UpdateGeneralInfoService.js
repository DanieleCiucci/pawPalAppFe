export const updateGeneralInfo = async (updatedFields, token) => {
    try {
        const response = await fetch("http://localhost:8080/api/profile/update-general-info", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedFields)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating general info:", error);
        throw error;
    }
};
