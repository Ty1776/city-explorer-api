'use strict';

let cache = require('./cache');
const axios = require('axios');

async function getWeather(request, response, next) {
  try {
    let lon = request.query.lon;
    let lat = request.query.lat;
    const key = 'weather-' + lon + lat;

    // const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      console.log('Cache hit');

    } else {

      console.log('Cache miss');

      const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = await axios.get(url)
        .then(response => parseWeather(response.data));
    }
    response.status(200).send(cache[key].data);
    // console.log(cache[key].data);
  } catch (error) {
    next(error);
  }
}

function parseWeather(weatherData) {
  // console.log(weatherData);
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.date = day.valid_date;
    this.description = `${day.weather.description} High: ${day.high_temp} Low: ${day.low_temp}`;
    // this.forecast = day.weather.description;
    // this.time = day.datetime;
  }
}

module.exports = getWeather;
