const getGeocode = require('./getGeocode');
const getForecast = require('./getForecast');

const getWeatherData = async (address) => {
  const { lat, lng, formattedAddress } = await getGeocode(address);
  const { current } = await getForecast({ lat, lng });
  return {
    formattedAddress,
    current,
  };
};
module.exports = getWeatherData;
