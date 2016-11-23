'use strict';

const Promise = require('bluebird');
const query = require('../lib/utils').query;

/**
 * Get all cities.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getCities(req) {
  return query('SELECT * FROM cities');
}

/**
 * Get a city with id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getCity(req) {
  return query('SELECT * FROM cities WHERE city_id = ' + req.params.id);
}

/**
 * Create a city.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createCity(req) {
  if (!req.body || !req.body.city_name || !req.body.city_description || !req.body.city_country || !req.body.city_state) {
    return Promise.reject({
      status: 406,
      message: 'Must provide city\'s name, description, country, and state'
    });
  }

  return query('INSERT INTO cities (city_name, city_description, city_country, city_state) VALUES ("' + req.body.city_name + '",  "' + req.body.city_description + '", "' + req.body.city_country + '", "' + req.body.city_state + '")');
}

/**
 * Update a city.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateCity(req) {
  console.log(req.body);
  if (!req.body || (!req.body.city_name && !req.body.city_description && !req.body.city_country && !req.body.city_state)) {
    return Promise.reject({
      status: 406,
      message: 'Must provide city\'s name, description, country, or state'
    });
  }

  return Promise.resolve()
    .then(function() {
      if (req.body.city_name) {
        return query('UPDATE cities SET city_name = "' + req.body.city_name + '" WHERE city_id = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.city_description) {
        return query('UPDATE cities SET city_description = "' + req.body.city_description + '" WHERE city_id = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.city_country) {
        return query('UPDATE cities SET city_country = "' + req.body.city_country + '" WHERE city_id = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.city_state) {
        return query('UPDATE cities SET city_state = "' + req.body.city_state + '" WHERE city_id = ' + req.params.id);
      }
    });
}

/**
 * Delete a city.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function deleteCity(req) {
  return query('DELETE FROM cities WHERE city_id = ' + req.params.id);
}

module.exports = {
  getCities, getCity, createCity, updateCity, deleteCity
};
