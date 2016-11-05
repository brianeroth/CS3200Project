'use strict';

/**
 * Get an account with id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getAccount(req) {
  return Promise.resolve('stub');
}

/**
 * Create an account.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createAccount(req) {
  return Promise.resolve('stub');
}

/**
 * Update an account.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateAccount(req) {
  return Promise.resolve('stub');
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
