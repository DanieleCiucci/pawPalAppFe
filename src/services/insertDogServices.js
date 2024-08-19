import { geocodeAddress } from './geocodeAdress';

export const handleSubmit = async (e, formData, userRole, personalSitterDog) => {
    e.preventDefault();

    let submissionData = { ...formData };

    // GEOLOCATION SERVICE
    const { address: streetAddress, city, postalCode, state } = formData.owner || {};
    const addressParts = [streetAddress, city, postalCode, state].filter(part => part && part.trim());
    const address = addressParts.join(', ');

    if (address) {
        try {
            const location = await geocodeAddress(address);

            if (location) {
                submissionData.owner = {
                    ...submissionData.owner,
                    geoX: location.lat,
                    geoY: location.lon,
                };
            } else {
                console.log("Geolocation service returned no results.");
            }
        } catch (error) {
            console.error("Error during geocoding:", error);
        }
    } else {
        console.log("Address is invalid or incomplete. Skipping geolocation service call.");
    }

    const token = localStorage.getItem('authToken');

    if (userRole === 1) {
        delete submissionData.owner;
    }

    submissionData = {
        ...submissionData,
        dogAdditionalDetail: {
            ...submissionData.dogAdditionalDetail,
            getAlongWellWithOtherDog: submissionData.dogAdditionalDetail.getAlongWellWithOtherDog ? 1 : 0,
            getAlongWellWithOtherCat: submissionData.dogAdditionalDetail.getAlongWellWithOtherCat ? 1 : 0,
            getAlongWellWithChildren: submissionData.dogAdditionalDetail.getAlongWellWithChildren ? 1 : 0,
            needsOutside: submissionData.dogAdditionalDetail.needsOutside ? 1 : 0,
        }
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    const url = personalSitterDog
        ?  apiUrl + "/api/dog/insert-sitter-dog"
        :  apiUrl + "/api/dog/insert";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(submissionData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseBody = await response.text();
        const data = responseBody ? JSON.parse(responseBody) : {};

        console.log("Success:", data);
        return { success: true, data };
    } catch (error) {
        console.log("bella tempe");
        console.error("Error:", error);
        return { success: false, error: error.message };
    }
};
