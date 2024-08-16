import { geocodeAddress } from './geocodeAdress';

export const handleSubmit = async (e, formData, userRole, personalSitterDog) => {
    e.preventDefault();

    // Create a copy of the formData to manipulate
    let submissionData = { ...formData };

    // GEOLOCATION SERVICE
    const { address: streetAddress, city, postalCode, state } = formData.owner || {};

    // Construct the address
    const addressParts = [streetAddress, city, postalCode, state].filter(part => part && part.trim());
    const address = addressParts.join(', ');

    // Check if the constructed address is valid before calling the geocode service
    if (address) {
        try {
            const location = await geocodeAddress(address);

            // Handle the response from the geolocation service
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

    // If user role is 1, remove the owner data from the formData
    if (userRole === 1) {
        delete submissionData.owner;
    }

    // Format the additional detail data
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

    // Determine the appropriate URL based on personalSitterDog
    const url = personalSitterDog
        ? "http://localhost:8080/api/dog/insert-sitter-dog"
        : "http://localhost:8080/api/dog/insert";

    // Send the data to the server
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
    } catch (error) {
        console.error("Error:", error);
    }
};
