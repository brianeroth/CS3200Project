'use strict';

require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth');
const accounts = require('./routes/accounts');
const cities = require('./routes/cities');
const cityImages = require('./routes/cityImages');
const interests = require('./routes/interests');
const places = require('./routes/places');
const bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '/public')));

/**
 * Login to the service.
 */
app.post('/login/:username/:password', function(req, res) {
  auth.login(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/*
 * Get account with the given id.
 */
app.get('/accounts/:id', function(req, res) {
  accounts.getAccount(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/*
 * Create an account.
 */
app.post('/accounts', function(req, res) {
  accounts.createAccount(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Update an account.
 */
app.put('/accounts/:id', bodyParser, function(req, res) {
  accounts.updateAccount(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Delete an account.
 */
app.delete('/accounts/:id', function(req, res) {
  accounts.deleteAccount(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/*
 * Get all places or places with a type.
 */
app.get('/places', function(req, res) {
  places.getPlaces(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Get places with the given id.
 */
app.get('/places/:id', function(req, res) {
  places.getPlace(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Get all places in a city.
 */
app.get('/places/city/:id', function(req, res) {
  places.getPlacesInCity(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

// Creation for all types of places, resturants, events, landmarks, and hotels.

/**
 * Create a resturant.
 */
app.post('/places/restaurant', function(req, res) {
  places.createRestaurant(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Create an event.
 */
app.post('/places/event', function(req, res) {
  places.createEvent(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Create a landmark.
 */
app.post('/places/landmark', function(req, res) {
  places.createLandmark(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Create a resturant.
 */
app.post('/places/hotel', function(req, res) {
  places.createHotel(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

// Update all types of places.

/**
 * Update a restaurant.
 */
app.put('/places/restaurant/:id', function(req, res) {
  places.updateRestaurant(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Update an event.
 */
app.put('/places/event/:id', function(req, res) {
  places.updateEvent(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Update a landmark.
 */
app.put('/places/landmark/:id', function(req, res) {
  places.updateLandmark(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Update a hotel.
 */
app.put('/places/hotel/:id', function(req, res) {
  places.updateHotel(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Delete a place.
 */
app.delete('/places/:id', function(req, res) {
  places.deletePlace(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Get all cities.
 */
app.get('/cities', function(req, res) {
  cities.getCities(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Get city with id.
 */
app.get('/cities/:id', function(req, res) {
  cities.getCity(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Create a city.
 */
app.post('/cities', function(req, res) {
  cities.createCity(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Update a city.
 */
app.put('/cities/:id', function(req, res) {
  cities.updateCity(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Delete a city.
 */
app.delete('/cities/:id', function(req, res) {
  cities.deleteCity(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Get all city images.
 */
app.get('/cityImages', function(req, res) {
  cityImages.getCityImages(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Get a city image with id.
 */
app.get('/cityImages/:id', function(req, res) {
  cityImages.getCityImage(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Gets all city images for a city.
 */
app.get('/cityImages/city/:id', function(req, res) {
  cityImages.getCityImagesForCity(req)
    .then(function(data) {
      res.send(data);
    })
    .then(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Create a cityImage.
 */
app.post('/cityImages', function(req, res) {
  cityImages.createCityImage(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Update a city image.
 */
app.put('/cityImages/:id', function(req, res) {
  cityImages.updateCityImage(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Delete a city image.
 */
app.delete('/cityImages/:id', function(req, res) {
  cityImages.deleteCityImage(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Get all interests.
 */
app.get('/interests/', function(req, res) {
  interests.getInterests(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Get an interest with id.
 */
app.get('/interests/:id', function(req, res) {
  interests.getInterest(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Create an interest.
 */
app.post('/interests', function(req, res) {
  interests.createInterest(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Update an interest.
 */
app.put('/interests/:id', function(req, res) {
  interests.updateInterest(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Delete an interest.
 */
app.delete('/interests/:id', function(req, res) {
  interests.deleteInterest(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(err.status).send(err);
    });
});

/**
 * Spin up the server.
 */
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});
