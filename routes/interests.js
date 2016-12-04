'use strict';

const Promise = require('bluebird');
const query = require('../lib/utils').query;

/**
 * Get all interests.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getInterests(req) {
  return query('SELECT * FROM interest_types');
}

/**
 * Get an interest with place id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getInterestsForPlace(req) {
  return query('SELECT interest_description FROM interest_types JOIN places_interesttypes ON interest_type_id = interest_id AND place_id = ' + req.params.id);
}

/**
 * Create an interest.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createInterest(req) {
  if (!req.body || !req.body.interest_description) {
    return Promise.reject({
      status: 406,
      message: 'Must provide interest type\'s description'
    });
  }

  return query('INSERT INTO interest_types (interest_description) VALUES ("' + req.body.interest_description + '")');
}

/**
 * Add an interest type to a place.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function addInterestTypeToPlaces(req) {
  return Promise.resolve()
    .then(function() {
      query('DELETE FROM places_interesttypes WHERE interest_type_id = ' + req.params.id);
    })
    .then(function() {
      for (var i = 0; i < req.body.places.length; i++) {
        query('INSERT INTO places_interesttypes (place_id, interest_type_id) VALUES ("' + req.body.places[i] + '", "' + req.params.id + '")');
      }
    });
}

/**
 * Delete an interest.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function deleteInterest(req) {
  return query('DELETE FROM interest_types WHERE interest_id = ' + req.params.id);
}

module.exports = {
  getInterests, getInterestsForPlace, createInterest, addInterestTypeToPlaces, deleteInterest
};
