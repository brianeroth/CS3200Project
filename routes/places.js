'use strict';

const Promise = require('bluebird');
const query = require('../lib/utils').query;

/**
 * Get all places.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getPlaces(req) {
  return query('SELECT * FROM places');
}

/**
 * Get a place with id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getPlace(req) {
  return query('SELECT * FROM places WHERE place_id = ' + req.params.id);
}

/**
 * Get all places in a city.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getPlacesInCity(req) {
  if (!req.query || !req.query.type) {
    return Promise.rejected({
      status: 406,
      message: 'Type parameter required.'
    });
  }

  return query('SELECT * FROM places INNER JOIN ' + req.query.type + ' ON ' + req.query.type + '.place_id = places.place_id AND place_city_id = ' + req.params.id);
}

/**
 * Create a restaurant.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createRestaurant(req) {
  if (!req.body || !req.body.place_name || !req.body.place_description || !req.body.place_address || !req.body.place_price_range || !req.body.place_external_resource || !req.body.place_image || !req.body.place_city_id || !req.body.restaurant_cuisine_type) {
    return Promise.reject({
      status: 406,
      message: 'Must provide resturants place\'s name, description, address, price range, external resource, image, city, and cuisine type'
    });
  }

  return query('INSERT INTO places (place_name, place_description, place_address, place_price_range, place_external_resource, place_image, place_city_id) VALUES ("' + req.body.place_name + '",  "' + req.body.place_description + '", "' + req.body.place_address + '", "' + req.body.place_price_range + '", "' + req.body.place_external_resource + '", "' + req.body.place_image + '", "' + req.body.place_city_id + '")')
    .then(function(data) {
      return query('INSERT INTO restaurants (restaurant_cuisine_type, place_id) VALUES("' + req.body.restaurant_cuisine_type + '", "' + data.insertId + '")');
    });
}

/**
 * Create an event.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createEvent(req) {
  if (!req.body || !req.body.place_name || !req.body.place_description || !req.body.place_address || !req.body.place_price_range || !req.body.place_external_resource || !req.body.place_image || !req.body.place_city_id || !req.body.event_date || !req.body.event_cost) {
    return Promise.reject({
      status: 406,
      message: 'Must provide event place\'s name, description, address, price range, external resource, image, city, date, and cost'
    });
  }

  return query('INSERT INTO places (place_name, place_description, place_address, place_price_range, place_external_resource, place_image, place_city_id) VALUES ("' + req.body.place_name + '",  "' + req.body.place_description + '", "' + req.body.place_address + '", "' + req.body.place_price_range + '", "' + req.body.place_external_resource + '", "' + req.body.place_image + '", "' + req.body.place_city_id + '")')
    .then(function(data) {
      return query('INSERT INTO events (event_date, event_cost, place_id) VALUES("' + req.body.event_date + '", "' + req.body.event_cost + '", "' + data.insertId + '")');
    });
}

/**
 * Create a landmark.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createLandmark(req) {
  if (!req.body || !req.body.place_name || !req.body.place_description || !req.body.place_address || !req.body.place_price_range || !req.body.place_external_resource || !req.body.place_image || !req.body.place_city_id || !req.body.landmark_cost) {
    return Promise.reject({
      status: 406,
      message: 'Must provide landmark place\'s name, description, address, price range, external resource, image, city, and cost'
    });
  }

  return query('INSERT INTO places (place_name, place_description, place_address, place_price_range, place_external_resource, place_image, place_city_id) VALUES ("' + req.body.place_name + '",  "' + req.body.place_description + '", "' + req.body.place_address + '", "' + req.body.place_price_range + '", "' + req.body.place_external_resource + '", "' + req.body.place_image + '", "' + req.body.place_city_id + '")')
    .then(function(data) {
      return query('INSERT INTO landmarks (landmark_cost, place_id) VALUES("' + req.body.landmark_cost + '", "' + data.insertId + '")');
    });
}

/**
 * Create a hotel.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createHotel(req) {
  if (!req.body || !req.body.place_name || !req.body.place_description || !req.body.place_address || !req.body.place_price_range || !req.body.place_external_resource || !req.body.place_image || !req.body.place_city_id) {
    return Promise.reject({
      status: 406,
      message: 'Must provide hotel place\'s name, description, address, price range, external resource, image, and city'
    });
  }

  return query('INSERT INTO places (place_name, place_description, place_address, place_price_range, place_external_resource, place_image, place_city_id) VALUES ("' + req.body.place_name + '",  "' + req.body.place_description + '", "' + req.body.place_address + '", "' + req.body.place_price_range + '", "' + req.body.place_external_resource + '", "' + req.body.place_image + '", "' + req.body.place_city_id + '")')
    .then(function(data) {
      return query('INSERT INTO hotels (place_id) VALUES("' + data.insertId + '")');
    });
}

/**
 * Update a restaurant.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateRestaurant(req) {
  if (!req.body || (!req.body.place_name && !req.body.place_address && !req.body.place_price_range && !req.body.place_external_resource && !req.body.place_image && !req.body.place_city_id && !req.body.restaurant_cuisine_type)) {
    return Promise.reject({
      status: 406,
      message: 'Must provide resturants place\'s name, address, price range, external resource, image, city, or cuisine type'
    });
  }

  return updatePlace(req, req.body.place_id)
    .then(function() {
      if (req.body.restaurant_cuisine_type) {
        return query('UPDATE restaurants SET restaurant_cuisine_type = "' + req.body.restaurant_cuisine_type + '" WHERE restaurant_id = ' + req.params.id);
      }
    })
    .then(function() {
      return query('SELECT * FROM places JOIN restaurants ON places.place_id = restaurants.place_id WHERE places.place_id = ' + req.body.place_id);
    });
}

/**
 * Update an event.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateEvent(req) {
  if (!req.body || (!req.body.place_name && !req.body.place_address && !req.body.place_price_range && !req.body.place_external_resource && !req.body.place_image && !req.body.place_city_id && !req.body.event_date && !req.body.event_cost)) {
    return Promise.reject({
      status: 406,
      message: 'Must provide event place\'s name, address, price range, external resource, image, city, date, or cost'
    });
  }

  return updatePlace(req, req.body.place_id)
    .then(function() {
      if (req.body.event_date) {
        return query('UPDATE events SET event_date = "' + req.body.event_date + '" WHERE event_id = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.event_cost) {
        return query('UPDATE events SET event_cost = "' + req.body.event_cost + '" WHERE event_id = ' + req.params.id);
      }
    })
    .then(function() {
      return query('SELECT * FROM places JOIN events ON places.place_id = events.place_id WHERE places.place_id = ' + req.body.place_id);
    });
}

/**
 * Update a landmark.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateLandmark(req) {
  if (!req.body || (!req.body.place_name && !req.body.place_address && !req.body.place_price_range && !req.body.place_external_resource && !req.body.place_image && !req.body.place_city_id && !req.body.landmark_cost)) {
    return Promise.reject({
      status: 406,
      message: 'Must provide landmark place\'s name, address, price range, external resource, image, city, or cost'
    });
  }

  return updatePlace(req, req.body.place_id)
    .then(function() {
      if (req.body.landmark_cost) {
        return query('UPDATE landmarks SET landmark_cost = "' + req.body.landmark_cost + '" WHERE landmark_id = ' + req.params.id);
      }
    })
    .then(function() {
      return query('SELECT * FROM places JOIN landmarks ON places.place_id = landmarks.place_id WHERE landmarks.place_id = ' + req.body.place_id);
    });
}

/**
 * Update a hotel.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateHotel(req) {
  if (!req.body || (!req.body.place_name && !req.body.place_address && !req.body.place_price_range && !req.body.place_external_resource && !req.body.place_image && !req.body.place_city_id)) {
    return Promise.reject({
      status: 406,
      message: 'Must provide hotel place\'s name, address, price range, external resource, image, or city'
    });
  }

  return updatePlace(req, req.body.place_id)
    .then(function() {
      return query('SELECT * FROM places JOIN hotels ON places.place_id = hotels.place_id WHERE places.place_id = ' + req.body.place_id);
    });
}

/**
 * Delete a place.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function deletePlace(req) {
  return query('DELETE FROM places WHERE place_id = ' + req.params.id);
}

/**
 * Updates a place.
 *
 * @param {Object} req The request object
 * @param {Number} placeId The given place id
 * @return {Promise} The promise
 */
function updatePlace(req, placeId) {
  return Promise.resolve()
    .then(function() {
      if (req.body.place_name) {
        return query('UPDATE places SET place_name = "' + req.body.place_name + '" WHERE place_id = ' + placeId);
      }
    })
    .then(function() {
      if (req.body.place_description) {
        return query('UPDATE places SET place_description = "' + req.body.place_description + '" WHERE place_id = ' + placeId);
      }
    })
    .then(function() {
      if (req.body.place_address) {
        return query('UPDATE places SET place_address = "' + req.body.place_address + '" WHERE place_id  = ' + placeId);
      }
    })
    .then(function() {
      if (req.body.place_price_range) {
        return query('UPDATE places SET place_price_range = "' + req.body.place_price_range + '" WHERE place_id = ' + placeId);
      }
    })
    .then(function() {
      if (req.body.place_external_resource) {
        return query('UPDATE places SET place_external_resource = "' + req.body.place_external_resource + '" WHERE place_id = ' + placeId);
      }
    })
    .then(function() {
      if (req.body.place_image) {
        return query('UPDATE places SET place_image = "' + req.body.place_image + '" WHERE place_id = ' + placeId);
      }
    })
    .then(function() {
      if (req.body.place_city_id) {
        return query('UPDATE places SET place_city_id = "' + req.body.place_city_id + '" WHERE place_id = ' + placeId);
      }
    });
}

module.exports = {
  getPlaces, getPlace, getPlacesInCity, createRestaurant, createEvent, createLandmark, createHotel, updateRestaurant, updateEvent, updateLandmark, updateHotel, deletePlace
};
