const axios = require("axios");

const getAddressCoordinate = async (address) => {
  const apiKey = process.env.OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status.code === 200) {
      const location = response.data.results[0].geometry;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  try {
    const originCoordinates = await getAddressCoordinate(origin);
    const destinationCoordinates = await getAddressCoordinate(destination);

    console.log("Origin Coordinates:", originCoordinates);
    console.log("Destination Coordinates:", destinationCoordinates);

    const url = `https://router.project-osrm.org/route/v1/driving/${originCoordinates.lng},${originCoordinates.lat};${destinationCoordinates.lng},${destinationCoordinates.lat}?overview=false`;

    const response = await axios.get(url);

    if (response.data.code !== "Ok") {
      throw new Error("Unable to fetch distance and time");
    }

    const route = response.data.routes[0];
    console.log("route", route);

    const hours = Math.floor(route.duration / 3600);
    const minutes = Math.floor((route.duration % 3600) / 60);

    return {
      distance: `${(route.distance / 1000).toFixed(1)} KM`,
      duration: `${hours} Hours ${minutes} Minutes`,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    input
  )}`;

  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "YourAppName" },
    });
    console.log(response.data);
    if (response.data.length > 0) {
      return response.data.map((place) => place.display_name).slice(0, 5);
    } else {
      throw new Error("No suggestions found");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getAddressCoordinate,
  getDistanceTime,
  getAutoCompleteSuggestions,
};
