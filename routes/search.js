'use strict';

const Promise = require('bluebird');
const query = require('../lib/utils').query;

/**
 * Searchs for like cities.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function search(req) {
  if (!req.query || !req.query.search) {
    return Promise.reject({
      status: 406,
      message: 'Must provide a search query'
    });
  }

  return query('SELECT * FROM Cities WHERE city_name LIKE "%' + req.query.search + '%"');
}

module.exports = {
  search
};
