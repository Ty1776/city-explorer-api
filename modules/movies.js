'use strict';

const axios = require('axios');

const cache = {};

async function getMovies(request, response, next) {
  try {
    let searchQuery = request.query.searchQuery;

    let key = `${searchQuery}Movies`;

    if (cache[key] && (Date.now() - cache[key].timeStamp) < 600000) {
      console.log('cache hit');
      response.status(200).send(cache[key].data);

    } else {

      console.log('cache miss');
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchQuery}&language=en-US&page=1&include_adult=false`;

      let moviesFromAxios = await axios.get(url);
      let arrayOfMovies = moviesFromAxios.data.results;
      let newMovieArray = arrayOfMovies.map(movie => new Movie(movie));
      cache[key] = {
        data: newMovieArray,
        timeStamp: Date.now()
      };
      response.status(200).send(newMovieArray);
    }

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
