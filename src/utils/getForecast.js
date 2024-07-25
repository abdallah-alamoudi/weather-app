const axios = require('axios');
const apiKey = process.env.WEATHER_API_KEY;
const getForecast = async ({ lat, lng }) => {
  const addressGeometry = `${lat},${lng}`;
  const response = await axios.get(
    'http://api.weatherapi.com/v1/current.json',
    {
      params: {
        key: apiKey,
        q: addressGeometry,
      },
    },
  );
  return response.data;
};
module.exports = getForecast;
