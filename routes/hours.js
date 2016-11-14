'use strict';

const Promise = require('bluebird');
const query = require('../lib/utils').query;

/**
 * Get all hours of operation.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getHours(req) {
  return query('SELECT * FROM operational_hours');
}

/**
 * Get hour of operation with id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getHour(req) {
  return query('SELECT * FROM operational_hours WHERE op_hours_id = ' + req.params.id);
}

/**
 * Get hours of operation for a place.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getHoursForPlace(req) {
  return query('SELECT * FROM operational_hours WHERE op_hours_place_id = ' + req.params.id)
}

/**
 * Create an hour of operation.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createHour(req) {
  if (!req.body || !req.body.op_hours_day_of_week || !req.body.op_hours_open_time || !req.body.op_hours_close_time || !req.body.op_hours_place_id) {
    return Promise.reject({
      status: 406,
      message: 'Must provide an hours\'s day, open time, close time, and place'
    });
  }

  return query('INSERT INTO operational_hours (op_hours_day_of_week, op_hours_open_time, op_hours_close_time, op_hours_place_id) VALUES ("' + req.body.op_hours_day_of_week + '",  "' + req.body.op_hours_open_time + '", "' + req.body.op_hours_close_time + '", "' + req.body.op_hours_place_id + '")');
}

/**
 * Update an hour of operation.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateHour(req) {
  if (!req.body || (!req.body.op_hours_day_of_week && !req.body.op_hours_open_time && !req.body.op_hours_close_time && !req.body.op_hours_place_id)) {
    return Promise.reject({
      status: 406,
      message: 'Must provide an hours\'s day, open time, close time, or place'
    });
  }

  return Promise.resolve()
    .then(function() {
      if (req.body.op_hours_day_of_week) {
        return query('UPDATE operational_hours SET op_hours_day_of_week = "' + req.body.op_hours_day_of_week + '" WHERE op_hours_place_id = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.op_hours_open_time) {
        return query('UPDATE operational_hours SET op_hours_open_time = "' + req.body.op_hours_open_time + '" WHERE op_hours_place_id = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.op_hours_close_time) {
        return query('UPDATE operational_hours SET op_hours_close_time = "' + req.body.op_hours_close_time + '" WHERE op_hours_place_id = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.op_hours_place_id) {
        return query('UPDATE operational_hours SET op_hours_place_id = "' + req.body.op_hours_place_id + '" WHERE op_hours_place_id = ' + req.params.id);
      }
    });
}

/**
 * Delete an hour of operation.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function deleteHour(req) {
  return query('DELETE FROM operational_hours WHERE op_hours_id = ' + req.params.id);
}

module.exports = {
  getHours, getHour, getHoursForPlace, createHour, updateHour, deleteHour
};
