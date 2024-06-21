const axios = require("axios");
require("dotenv").config();

const searchPage = (req, res) => {
    res.render("search");
};

const getForecast = async (req, res) => {
    const query = req.query.q;

    if (!query) return res.status(400).send("Location is required");

    try {
        // Fetch geocoding data from OpenCage
        const geoResponse = await axios.get(process.env.OPENCAGE_API_URL, {
            params: {
                q: query,
                key: process.env.OPENCAGE_API_KEY
            }
        });

        const geoData = geoResponse.data;

        if (geoData.results.length === 0) return res.status(404).send("Location not found");

        const locationData = geoData.results[0];
        const { lat, lng } = locationData.geometry;

        /// Fetch weather data from OpenMeteo
        const weatherResponse = await axios.get(process.env.OPENMETEO_API_URL, {
            params: {
                latitude: lat,
                longitude: lng,
                hourly: 'temperature_2m',
                current_weather: true,
                forecast_days: "1"
            }
        });

        const weatherData = weatherResponse.data;

        res.render('forecast', {
            location: locationData,
            currentWeather: weatherData.current_weather,
            hourlyWeather: weatherData.hourly,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch weather data');
    }
};
module.exports = { searchPage, getForecast };