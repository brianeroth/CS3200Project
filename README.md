[![Build Status](https://travis-ci.org/brianeroth/CS3200Project.svg?branch=master)](https://travis-ci.org/brianeroth/CS3200Project)

# CS3200Project

This repository contains the API and web app for our CS 3200 project. 

## How to get setup

1. Run `git clone git@github.com:brianeroth/CS3200Project.git`
2. Run `npm install` to install dependencies
3. Start a MySQL Server using something like MAMP or MySQL Server
4. Run the import script in `_db/import.sql`
5. Rename `.env.sample` to `.env` and insert necessary keys, passwords, etc.

## Gulp tasks

There is one gulp task setup for the project:

1. `npm run serve` or simply `gulp` will start the Node.js server, and watch Sass directories for changes. The Node.js server will restart whenever there's a file changed.

## How it's running right now

The project relies on Node.js (with the Express framework) for the API and MySQL for the database. It also utilizes AngularJS on the front-end, along with Sass.

The entire front-end of the app is contained in the `/public` directory.

## Answers to Project Questions

There were no deviations from the progress report in terms of technologies, databases, etc.
