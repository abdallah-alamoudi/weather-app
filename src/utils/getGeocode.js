const axios = require('axios');

const getGeocode = async (address) => {
  const apiKey = process.env.OPENCAGE_API_KEY;
  try {
    const response = await axios.get(
      'https://api.opencagedata.com/geocode/v1/json',
      {
        params: {
          q: address,
          key: apiKey,
        },
      },
    );
    if (response.data.results.length === 0) {
      throw new Error(
        `Couldn't find the address. Try again with a different address.`,
      );
    }
    const { lat, lng } = response.data.results[0].geometry;
    const formattedAddress = response.data.results[0].formatted;
    return {
      formattedAddress,
      lat,
      lng,
    };
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error: ${error.response.data.status.message}`);
    } else if (error.request) {
      throw new Error(`Network Error: check your internet please`);
    } else {
      throw new Error(`${error.message}`);
    }
  }
};

module.exports = getGeocode;
