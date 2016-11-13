'use strict';

const Promise = require('bluebird');
const getSqlConnection = require('../lib/constants').getSqlConnection;
const internalServerError = require('../lib/constants').internalServerError;

/**
 * Get all hours of operation.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getHours(req) {
  return Promise.using(getSqlConnection(), function(pool) {
    return pool.query('SELECT * FROM operational_hours')
      .then(function(rows) {
        return rows;
      })
      .catch(function() {
        return internalServerError;
      });
  });
}

/**
 * Get hour of operation with id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getHour(req) {
  return Promise.using(getSqlConnection(), function(pool) {
    return pool.query('SELECT * FROM operational_hours WHERE op_hours_id = ' + req.params.id)
      .then(function(rows) {
        return rows;
      })
      .catch(function() {
        return internalServerError;
      });
  });
}

/**
 * Get hours of operation for a place.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getHoursForPlace(req) {
  return Promise.using(getSqlConnection(), function(pool) {
    return pool.query('SELECT * FROM operational_hours WHERE op_hours_place_id = ' + req.params.id)
      .then(function(rows) {
        return rows;
      })
      .catch(function() {
        return internalServerError;
      });
  });
}

/**
 * Create an hour of operation.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createHour(req) {
  return Promise.resolve('stub');
}

/**
 * Update an hour of operation.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateHour(req) {
  return Promise.resolve('stub');
}

/**
 * Delete an hour of operation.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function deleteHour(req) {
  return Promise.using(getSqlConnection(), function(pool) {
    return pool.query('DELETE FROM operational_hours WHERE op_hours_id = ' + req.params.id)
      .then(function(rows) {
        return rows;
      })
      .catch(function() {
        return internalServerError;
      });
  });
}

module.exports = {
  getHours, getHour, getHoursForPlace, createHour, updateHour, deleteHour
};
