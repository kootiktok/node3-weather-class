const axios = require('axios');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoia29vdGlrdG9rIiwiYSI6ImNrZGJoaWt5ZzFuczMyd3NjcnBlaXhzbnYifQ.RWQ3-zMnhUDEWS2Jd9qlkw&limit=1`;

  axios
    .get(url)
    .then(({ data: { features } }) => {
      if (features[0]) {
        const latitude = features[0].center[1];
        const longitude = features[0].center[0];
        const location = features[0].place_name;
        callback(undefined, {
          latitude: latitude,
          longitude: longitude,
          location: location,
        });
      } else {
        callback('No place result', undefined);
      }
    })
    .catch((error) => {
      callback('Cannot connect to mapbox', undefined);
    });
};

module.exports = geocode;
