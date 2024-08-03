export const geocodeAddress = async (address) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`, {
            headers: {
                'Accept-Language': 'en',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.length > 0) {
            return data[0]; // Return the geocoded location data
        } else {
            console.log('No results found');
            return null;
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
};