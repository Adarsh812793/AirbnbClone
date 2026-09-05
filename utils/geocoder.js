const axios = require("axios");

async function geocodeLocation(location) {

    const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: location,
                format: "jsonv2",
                limit: 1,
                countrycodes: "in"
            },
            headers: {
                "User-Agent": "WanderLust/1.0"
            }
        }
    );

    if (response.data.length === 0) {
        return null;
    }

    return {
        latitude: parseFloat(response.data[0].lat),
        longitude: parseFloat(response.data[0].lon)
    };
}

module.exports = geocodeLocation;