
export const updateSkills = async (checkedSkillIds) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`http://localhost:8080/api/profile/update-skills`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(checkedSkillIds), // Send array directly
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating skills:', error);
        throw error;
    }
};

export const updateServices = async (checkedSkillIds) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`http://localhost:8080/api/profile/update-services`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(checkedSkillIds), // Send array directly
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating skills:', error);
        throw error;
    }
};
