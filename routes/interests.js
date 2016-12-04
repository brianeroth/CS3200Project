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
 * Get an interest with id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getInterest(req) {
  return Promise.resolve('stub');
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
 * Update an interest.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateInterest(req) {
  return Promise.resolve('stub');
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
  getInterests, getInterest, createInterest, updateInterest, deleteInterest
};
