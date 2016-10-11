'use strict';

require('dotenv').config();
const path = require('path');
const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const constants = require('./lib/constants');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

/**
 * Spin up the server.
 */
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});
