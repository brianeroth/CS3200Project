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
      message: 'Type parameter required.',
    });
  }
  return query('SELECT * FROM places INNER JOIN '+ req.query.type + ' ON ' + req.query.type + '.place_id = places.place_id AND place_city_id = ' + req.params.id);
}

/**
 * Get all places with interests.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getPlaceWithInterest(req) {
  return Promise.resolve('stub');
}

/**
 * Create a place.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createPlace(req) {
  return Promise.resolve('stub');
}

/**
 * Update a place.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updatePlace(req) {
  return Promise.resolve('stub');
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

module.exports = {
  getPlaces, getPlace, getPlacesInCity, getPlaceWithInterest, createPlace, updatePlace, deletePlace
};
