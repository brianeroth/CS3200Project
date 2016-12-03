'use strict';

const Promise = require('bluebird');
const getSqlConnection = require('../lib/constants').getSqlConnection;
const internalServerError = require('../lib/constants').internalServerError;

/**
 * Helper function to query the database.
 *
 * @param {String} queryString The string query
 * @return {Promise} The promise
 */
function query(queryString) {
  return Promise.using(getSqlConnection(), function(pool) {
    return pool.query(queryString)
      .then(function(rows) {
        return rows;
      })
      .catch(function(err) {
        console.error(err);
        return internalServerError;
      });
  });
}

module.exports = {
  query
};
