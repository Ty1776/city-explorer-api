'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;
app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
