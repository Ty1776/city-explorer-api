'use strict';

const axios = require('axios');

async function getMovies(request, response, next) {
  try {
    let searchQuery = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchQuery}&language=en-US&page=1&include_adult=false`;

    let moviesFromAxios = await axios.get(url);

    let arrayOfMovies = moviesFromAxios.data.results;
    let newMovieArray = arrayOfMovies.map(movie => new Movie(movie));
    response.status(200).send(newMovieArray);


  } catch (error) {
    next(error);
  }
}

class Movie {
  constructor(movieObj) {
    this.movie = movieObj.title;
    this.description = movieObj.overview;
  }
}

module.exports = getMovies;
