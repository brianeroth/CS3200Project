'use strict';

require('dotenv').config();
const path = require('path');
const express = require('express');
// const request = require('request'); TODO
// const querystring = require('querystring'); TODO
const cookieParser = require('cookie-parser');
// const constants = require('./lib/constants'); TODO
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

/*
 * Get account with the given id.
 */
app.get('/accounts/:id', function(req, res) {
  accounts.getAccount(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/*
 * Create an account.
 */
app.post('/accounts/:id', function(req, res) {
  accounts.create(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Update an account.
 */
app.put('/accounts/:id', function(req, res) {
  accounts.update(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Delete an account.
 */
app.delete('/accounts/:id', function(req, res) {
  accounts.delete(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
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
      console.error(err);
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
      console.error(err);
    });
});

/**
 * Get all places in a city.
 */
app.get('/places/city', function(req, res) {
  places.getPlacesInCity(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Create a place.
 */
app.post('/places/:id', function(req, res) {
  places.create(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Update a place.
 */
app.put('/places/:id', function(req, res) {
  places.update(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Delete a place.
 */
app.delete('/places/:id', function(req, res) {
  places.delete(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Get all hours of operation.
 */
app.get('/hours', function(req, res) {
  hours.getHours(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Get the hours of opperation with id.
 */
app.get('/hours/:id', function(req, res) {
  hours.getHour(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Get hours of operation for a place.
 */
app.get('/hours/:place', function(req, res) {
  hours.getHoursForPlace(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Create an hour of operation.
 */
app.post('/hours/:id', function(req, res) {
  hours.create(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Update an hour of operation.
 */
app.put('/hours/:id', function(req, res) {
  hours.update(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Delete an hour of opperation.
 */
app.delete('/hours/:id', function(req ,res) {
  hours.delete(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
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
      console.error(err);
    });
});

/**
 * Get city with id.
 */
app.get('/cities/:id', function(req ,res) {
  cities.getCity(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Create a city.
 */
app.post('/cities/:id', function(req, res) {
  cities.create(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Update a city.
 */
app.put('/cities/:id', function(req, res) {
  cities.update(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Delete a city.
 */
app.delete('/cities/:id', function(req, res) {
  cities.delete(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Get all images.
 */
app.get('/images', function(req, res) {
  images.getImages(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Get an image with id.
 */
app.get('/images/:id', function(req, res) {
  images.getImage(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Get all images for a city.
 */
app.get('images/:city', function(req, res) {
  images.getImagesForCity(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Get all images for a place.
 */
app.get('images/:place', function(req, res) {
  images.getImagesForPlace(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Create an image.
 */
app.post('images/:id', function(req, res) {
  images.create(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Update an image.
 */
app.put('images/:id', function(req, res) {
  images.update(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Delete an image.
 */
app.delete('images/:id', function(req, res) {
  images.delete(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
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
      console.error(err);
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
      console.error(err);
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
      console.error(err);
    });
});

/**
 * Create a review.
 */
app.post('reviews/:id', function(req, res) {
  reviews.create(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Update a review.
 */
app.put('reviews/:id', function(req, res) {
  reviews.update(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Delete a review.
 */
app.delete('reviews/:id', function(req, res) {
  reviews.delete(req)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/**
 * Spin up the server.
 */
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});
