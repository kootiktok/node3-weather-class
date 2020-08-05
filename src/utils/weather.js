const axios = require('axios');

const getWeather = (latitude, longitude, callback) => {
  const params = {
    query: `${latitude},${longitude}`,
    access_key: '367c823bf087229e1d5f990d6f02f4ab',
    units: 'm',
  };

  axios
    .get('http://api.weatherstack.com/current', { params })
    .then(({ data: { current } }) => {
      if (current) {
        callback(undefined, {
          description: current.weather_descriptions[0],
          temperature: current.temperature,
          feelsLike: current.feelslike,
          weatherIcon: current.weather_icons[0],
        });
      } else if (data.error) {
        callback(data.error.type, undefined);
      }
    })
    .catch((error) => {
      callback('cannot connect weatherstack', undefined);
    });
};

module.exports = getWeather;
