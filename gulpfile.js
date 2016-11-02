'use strict';

const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const yargs = require('yargs');

const themeDir = 'public/assets/';

gulp.task('default', ['styles', 'scripts', 'svgs'], function() {
  nodemon({script: 'app.js'});
  gulp.watch(themeDir + 'css/*.scss', ['styles']);
  gulp.watch(themeDir + 'js/*.js', ['scripts']);
  gulp.watch(themeDir + 'svg/*.svg', ['svgs']);
});

gulp.task('styles', function() {
  gulp.src(themeDir + 'css/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.', {
      includeContent: false, sourceRoot: 'src'
    }))
    .pipe(gulp.dest(themeDir + 'css/build/'));
});

gulp.task('svgs', function() {
  gulp.src(themeDir + 'svg/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest(themeDir + 'svg/build/'));
});

gulp.task('scripts', function() {
  gulp.src(themeDir + 'js/*.js')
    .pipe(concat('production.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(themeDir + 'js/build/'));
});

gulp.task('eslint', () => {
  var stream = gulp.src(['**/*.js', '!node_modules/**', '!coverage/**'])
    .pipe(eslint({
      quiet: true,
      globals: [
        'angular'
      ]
    }))
    .pipe(eslint.format());

  if (yargs.argv.failTaskOnError) {
    stream = stream.pipe(eslint.failAfterError());
  }

  return stream;
});
