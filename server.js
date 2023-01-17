'use strict';

// ****REQUIRES****
const express = require('express');
require('dotenv').config();
const cors = require('cors');

// *** DONT FORGET TO REQUIRE STARTER JSON FILE ***

let data = require('.data/pets.json');




// ****Once express is in, we need to use it - per express docs****
// ****app === server
const app = express();

// **** MIDDLEWARE****
// ***cors is middleware - acts as a security guard that allows us to share resources across the internet***
app.use(cors());


// *** DEFINE A PORT FOR MY SERVER TO RUN ON***
const PORT = process.env.PORT || 3002;


// **** ENDPOINTS ****

// *** Base endpoint - proof of life ***
// ** 1st argument - endpoint  in quotes
// ** 2nd argument - callback which will execute when someone hits that point

// ** Callback function - 2 parameters: request, response (rec, res)
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server');
});


app.get('/hello', (request, response) => {
  console.log(request.query);

  let firstName = request.query.firstName;
  let lastName = request.query.lastName;

  response.status(200).send(`Hello ${firstName} ${lastName}! Welcome to my server!`);
});


app.get('/pet', (request, response, next) => {
  try {
    let species = request.query.species;

    let dataToGroom = data.find(pet => pet.species === species);
    let dataToSend = new Pet(dataToGroom);

    response.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }
});

// *** Class to groom bulky data ***

class Pet {
  constructor(petObj) {
    this.name = petObj.name;
    this.breed = petObj.breed;
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
