const axios = require('axios');

// Reading configuration from API (url)
const fetchConfig = async (url) => {
    try {
        const respons = await axios.get(url);
        return respons.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

module.exports = fetchConfig;
