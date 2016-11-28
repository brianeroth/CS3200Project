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
const reviews = require('./routes/reviews');
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
    });
});

/**
 * Create a place.
 */
app.post('/places', function(req, res) {
  places.createPlace(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.sendStatus(err.status);
      res.send(err.message);
    });
});

/**
 * Update a place.
 */
app.put('/places/:id', function(req, res) {
  places.updatePlace(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
    });
});

/**
 * Get all reviews.
 */
app.get('/reviews', function(req, res) {
  reviews.getReviews(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.sendStatus(err.status);
      res.send(err.message);
    });
});

/**
 * Get a review with id.
 */
app.get('/reviews/:id', function(req, res) {
  reviews.getReview(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.sendStatus(err.status);
      res.send(err.message);
    });
});

/**
 * Get all reviews for a place.
 */
app.get('/review/:place', function(req, res) {
  reviews.getReviewsForPlace(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.sendStatus(err.status);
      res.send(err.message);
    });
});

/**
 * Create a review.
 */
app.post('/reviews', function(req, res) {
  reviews.createReview(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.sendStatus(err.status);
      res.send(err.message);
    });
});

/**
 * Update a review.
 */
app.put('/reviews/:id', function(req, res) {
  reviews.updateReview(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.sendStatus(err.status);
      res.send(err.message);
    });
});

/**
 * Delete a review.
 */
app.delete('/reviews/:id', function(req, res) {
  reviews.deleteReview(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
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
      res.sendStatus(err.status);
      res.send(err.message);
    });
});

/**
 * Spin up the server.
 */
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});
