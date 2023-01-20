// 'use strict';

// const axios = require('axios');

// async function getWeather(request, response, next) {
//   try {
//     let lat = request.query.lat;
//     let lon = request.query.lon;
//     let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;

//     let weatherFromAxios = await axios.get(url);
//     let arrayOfDays = weatherFromAxios.data.data;
//     let newDayArray = arrayOfDays.map(day => new Forcast(day));

//     response.status(200).send(newDayArray);

//   } catch (error) {
//     next(error);
//   }
// }

// class Forcast {
//   constructor(cityObj) {
//     this.date = cityObj.valid_date;
//     this.description = `${cityObj.weather.description} High: ${cityObj.high_temp} Low: ${cityObj.low_temp}`;
//   }
// }

// module.exports = getWeather;
