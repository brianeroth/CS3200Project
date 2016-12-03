'use strict';

require('dotenv').config();
const mysql = require('promise-mysql');
const Promise = require('bluebird');

const internalServerError = Promise.reject({
  status: 500,
  message: 'Internal Server Error'
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

function getSqlConnection() {
  return pool.getConnection()
    .disposer(function(connection) {
      pool.releaseConnection(connection);
    });
}

module.exports = {
  getSqlConnection, internalServerError
};
