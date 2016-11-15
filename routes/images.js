'use strict';

const Promise = require('bluebird');
const query = require('../lib/utils').query;

/**
 * Get all images.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getImages(req) {
  return query('SELECT * FROM images');
}

/**
 * Get an image with id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getImage(req) {
  return query('SELECT * FROM images WHERE image_id = ' + req.params.id);
}

/**
 * Get all images for a city.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getImagesForCity(req) {
  return query('SELECT * FROM images INNER JOIN city_images ON city_images.image_id = images.image_id AND city_images.city_id = ' + req.params.id);
}

/**
 * Create an image.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createImage(req) {
  if (!req.body || !req.body.image_path || !req.body.image_type || !req.body.image_city_id) {
    return Promise.reject({
      status: 406,
      message: 'Must provide image\'s path, type, and associated city'
    });
  }

  return query('INSERT INTO city_images (image_path, image_caption, image_type, image_city_id) VALUES ("' + req.body.image_path + '",  "' + req.body.image_caption + '", "' + req.body.image_type + '", "' + req.body.image_city_id + '")');
}

/**
 * Update an image.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateImage(req) {
  return Promise.resolve('stub');
}

/**
 * Delete an image.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function deleteImage(req) {
  return query('DELETE FROM images WHERE image_id = ' + req.params.id);
}

module.exports = {
  getImages, getImage, getImagesForCity, createImage, updateImage, deleteImage
};
