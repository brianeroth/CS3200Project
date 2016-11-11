'use strict';

const Promise = require('bluebird');
const getSqlConnection = require('../lib/constants').getSqlConnection;
const internalServerError = require('../lib/constants').internalServerError;

/**
 * Get an account with id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getAccount(req) {
  return Promise.using(getSqlConnection(), function(pool) {
    return pool.query('SELECT * FROM admins WHERE admin_id = ' + req.params.id)
      .then(function(rows) {
        return rows;
      })
      .catch(function() {
        return internalServerError;
      });
  });
}

/**
 * Create an account.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createAccount(req) {
  if (!req.body.admin_name || !req.body.admin_username || !req.body.admin_password) {
    return Promise.reject({
      status: 406,
      message: 'Must provide admin\'s name, username, and password'
    });
  }

  return Promise.using(getSqlConnection(), function(pool) {
    return pool.query('INSERT INTO admins (admin_name, admin_username, admin_password) VALUES ("' + req.body.admin_name + '",  "' + req.body.admin_username + '", "' + req.body.admin_password + '")')
      .then(function(rows) {
        return rows;
      })
      .catch(function() {
        return internalServerError;
      });
  });
}

/**
 * Update an account.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateAccount(req) {
  var body = req.body;
  var updates = [];

  if (!req.body.admin_name && !req.body.admin_username && !req.body.admin_password) {
    return Promise.reject({
      status: 406,
      message: 'Must provide one of admin\'s name, username, and password'
    });
  }

  for (var key in body) {
    if (body.hasOwnProperty(key)) {
      updates.push([key, body[key]]);
    }
  }

  return Promise.using(getSqlConnection(), function(pool) {
    return Promise.map(updates, function(update) {
      return pool.query('UPDATE admins SET ' + update[0] + ' = "' + update[1] + '" WHERE admin_id = ' + req.params.id);
    });
  })
  .catch(function(err) {
    console.log(err);
    return internalServerError;
  });
}

/**
 * Delete an account.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function deleteAccount(req) {
  return Promise.resolve('stub');
}

module.exports = {
  getAccount, createAccount, updateAccount, deleteAccount
};
