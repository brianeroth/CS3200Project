'use strict';

const Promise = require('bluebird');
const query = require('../lib/utils').query;

/**
 * Get all city images.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getCityImages(req) {
  return query('SELECT * FROM city_images');
}

/**
 * Get a city image with id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getCityImage(req) {
  return query('SELECT * FROM city_images WHERE image_id = ' + req.params.id);
}

/**
 * Get a city images with from city.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getCityImagesForCity(req) {
  return query('SELECT * FROM city_images WHERE image_city_id = ' + req.params.id);
}

/**
 * Create a city image.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createCityImage(req) {
  if (!req.body || !req.body.image_path || !req.body.image_caption || !req.body.image_type || !req.body.image_city_id) {
    return Promise.reject({
      status: 406,
      message: 'Must provide image\'s path, caption, type, and associated city'
    });
  }

  return query('INSERT INTO city_images (image_path, image_caption, image_type, image_city_id) VALUES ("' + req.body.image_path + '",  "' + req.body.image_caption + '", "' + req.body.image_type + '", "' + req.body.image_city_id + '")');
}

/**
 * Update a city image.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateCityImage(req) {
  if (!req.body || (!req.body.image_path && req.body.image_caption && !req.body.image_type && !req.body.image_city_id)) {
    return Promise.reject({
      status: 406,
      message: 'Must provide image\'s path, caption, type, or associated city'
    });
  }

  return Promise.resolve()
    .then(function() {
      if (req.body.image_path) {
        return query('UPDATE city_images SET image_path = "' + req.body.image_path + '" WHERE image_id  = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.image_caption) {
        return query('UPDATE city_images SET image_caption = "' + req.body.image_caption + '" WHERE image_id  = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.image_type) {
        return query('UPDATE city_images SET image_type = "' + req.body.image_type + '" WHERE image_id = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.image_city_id) {
        return query('UPDATE city_images SET image_city_id = "' + req.body.image_city_id + '" WHERE image_id = ' + req.params.id);
      }
    });
}

/**
 * Delete a city image.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function deleteCityImage(req) {
  return query('DELETE FROM city_images WHERE image_id = ' + req.params.id);
}

module.exports = {
  getCityImages, getCityImage, getCityImagesForCity, createCityImage, updateCityImage, deleteCityImage
};
