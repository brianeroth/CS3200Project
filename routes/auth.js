'use strict';

const query = require('../lib/utils').query;

/**
 * Logs in a user.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function login(req) {
  return query('SELECT admin_id, admin_name, admin_username FROM admins WHERE admin_username = "' req.params.username + '" AND admin_password = "' req.params.password + '"');
}

module.exports = {
  login
};
