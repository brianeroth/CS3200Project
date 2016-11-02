/**
 * The main entry point for the app. Make sure that "debug" is set to false in production, or weird things might show up on the front-end for testing purposes.
 */
angular.module('cs3200project', ['ngRoute']).constant('CONFIG', {
  DEBUG: true,
  SITE_NAME: 'CS 3200 Project'
});
