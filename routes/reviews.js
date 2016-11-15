'use strict';

const Promise = require('bluebird');
const query = require('../lib/utils').query;

/**
 * Get all reviews.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getReviews(req) {
  return query('SELECT * FROM reviews');
}

/**
 * Get a review with id.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getReview(req) {
  return query('SELECT * FROM reviews WHERE review_id = ' + req.param.id);
}

/**
 * Get all reviews for a place.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function getReviewsForPlace(req) {
  return query('SELECT * FROM reviews WHERE review_place_id = ' + req.param.id);
}

/**
 * Create a review.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function createReview(req) {
  if (!req.body || !req.body.review_author || !req.body.review_star_rating || !req.body.review_date_posted || !req.body.review_place_id) {
    return Promise.reject({
      status: 406,
      message: 'Must provide a review\'s author, star rating, date posted, and place'
    });
  }

  return query('INSERT INTO reviews (review_author, review_star_rating, review_description, review_date_posted, review_place_id) VALUES ("' + req.body.review_author + '",  "' + req.body.review_star_rating + '", "' + req.body.review_description + '", "' + req.body.review_date_posted + '", "' + req.body.review_place_id + ')');
}

/**
 * Update a review.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function updateReview(req) {
  if (!req.body || (!req.body.review_author && !req.body.review_star_rating && !req.body.review_date_posted && !req.body.review_place_id)) {
    return Promise.reject({
      status: 406,
      message: 'Must provide a review\'s author, star rating, date posted, or place'
    });
  }

  return Promise.resolve()
    .then(function() {
      if (req.body.review_author) {
        return query('UPDATE reviews SET review_author = "' + req.body.review_author + '" WHERE review_id = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.review_star_rating) {
        return query('UPDATE reviews SET review_star_rating = "' + req.body.review_star_rating + '" WHERE review_id = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.review_date_posted) {
        return query('UPDATE reviews SET review_date_posted = "' + req.body.review_date_posted + '" WHERE review_id = ' + req.params.id);
      }
    })
    .then(function() {
      if (req.body.review_place_id) {
        return query('UPDATE reviews SET review_place_id = "' + req.body.review_place_id + '" WHERE review_id = ' + req.params.id);
      }
    });
}

/**
 * Delete a review.
 *
 * @param {Object} req The request object
 * @return {Promise} The promise
 */
function deleteReview(req) {
  return query('DELETE FROM reviews WHERE review_id = ' + req.param.id);
}

module.exports = {
  getReviews, getReview, getReviewsForPlace, createReview, updateReview, deleteReview
};
