'use strict';

const Promise = require('bluebird');
const getSqlConnection = require('../lib/constants').getSqlConnection;
const internalServerError = require('../lib/constants').internalServerError;

/**
 * Get all cities.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getCities(req) {
  return Promise.using(getSqlConnection(), function(pool) {
    return pool.query('SELECT * FROM cities')
      .then(function(rows) {
        return rows;
      })
      .catch(function() {
        return internalServerError;
      });
  });
}

/**
 * Get a city with id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getCity(req) {
  return Promise.using(getSqlConnection(), function(pool) {
    return pool.query('SELECT * FROM cities WHERE city_id = ' + req.params.id)
      .then(function(rows) {
        return rows;
      })
      .catch(function() {
        return internalServerError;
      });
  });
}

/**
 * Create a city.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createCity(req) {
  return Promise.resolve('stub');
}

/**
 * Update a city.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateCity(req) {
  return Promise.resolve('stub');
}

/**
 * Delete a city.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function deleteCity(req) {
  return Promise.resolve('stub');
}

module.exports = {
  getCities, getCity, createCity, updateCity, deleteCity
};
