'use strict';

const Promise = require('bluebird');

/**
 * Get all interests.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getInterests(req) {
  return Promise.resolve('stub');
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
  return Promise.resolve('stub');
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
  return Promise.resolve('stub');
}

module.exports = {
  getInterests, getInterest, createInterest, updateInterest, deleteInterest
};
