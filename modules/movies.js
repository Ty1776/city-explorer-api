'use strict';

const axios = require('axios');

const cache = {};

// TODO: create a key for the data im going to store
// TODO: if the thing exists AND in a valid timeframe ... send that data
// TODO: if the thing DOES NOT exist - call API and cache what is returned from my API

async function getMovies(request, response, next) {
  try {
    let searchQuery = request.query.searchQuery;

    // **** Create My Key ****
    let key = `${searchQuery}Movies`; // **key = seattleMovies cache[seattleMovies]

    // *** IF IT EXISTS AND IS IN A VALID TIME - SEND THAT DATA
    if (cache[key] && (Date.now() - cache[key].timeStamp) < 600000) {
      // console.log('cache hit');
      response.status(200).send(cache[key].data);

    } else {

      // console.log('cache miss');

      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchQuery}&language=en-US&page=1&include_adult=false`;

      let moviesFromAxios = await axios.get(url);
      let arrayOfMovies = moviesFromAxios.data.results;
      let newMovieArray = arrayOfMovies.map(movie => new Movie(movie));
      // ** cache results from API call
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
