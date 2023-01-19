'use strict';

// ****REQUIRES****
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const { response } = require('express');

// *** DONT FORGET TO REQUIRE STARTER JSON FILE ***
// let data = require('./data/weather.json');


// ****Once express is in, we need to use it - per express docs****
// ****app === server
const app = express();

// **** MIDDLEWARE****
// ***cors is middleware - acts as a security guard that allows us to share resources across the internet***
app.use(cors());


// *** DEFINE A PORT FOR MY SERVER TO RUN ON***
const PORT = process.env.PORT || 3002;


// **** ENDPOINTS ****
// ** 1st argument - endpoint in quotes
// ** 2nd argument - callback which will execute when someone hits that point
// ** Callback function - 2 parameters: request, response (rec, res)

app.get('/weather', async (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    // let searchQuery = request.query.searchQuery;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;

    let weatherFromAxios = await axios.get(url);
    // console.log(weatherFromAxios);
    let arrayOfDays = weatherFromAxios.data.data;
    let newDayArray = arrayOfDays.map(day => new Forcast(day));
    // console.log(arrayOfDays);

    response.status(200).send(newDayArray);

  } catch (error) {
    next(error);
  }
});

app.get('/movies', async (request, response, next) => {
  try {
    let searchQuery = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchQuery}&language=en-US&page=1&include_adult=false`;

    let moviesFromAxios = await axios.get(url);

    let arrayOfMovies = moviesFromAxios.data.results;
    let newMovieArray = arrayOfMovies.map(movie => new Movie(movie));
    // console.log(arrayOfMovies);

    response.status(200).send(newMovieArray);


  } catch (error) {
    next(error);
  }
})

// *** Class to groom bulky data ***

class Forcast {
  constructor(cityObj) {
    this.date = cityObj.valid_date;
    this.description = `${cityObj.weather.description} High: ${cityObj.high_temp} Low: ${cityObj.low_temp}`;
  }
}

class Movie {
  constructor(movieObj) {
    this.movie = movieObj.title;
    this.description = movieObj.overview;
  }
}

// **** CATCH ALL ENDPOINT - NEEDS TO BE LAST DEFINED ENDPOINT ****

app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});


// **** ERROR HANDLING - Plug and play code from express docs ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// **** SERVER START****
app.listen(PORT, () => console.log(`We are running on port ${PORT}`));
