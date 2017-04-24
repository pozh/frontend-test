'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var webpack = require('webpack-stream');

var $ = require('gulp-load-plugins')();


gulp.task('jshint', function() {
  return gulp.src('./src/assets/js/main.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('js', function() {
  return gulp.src('./src/assets/js/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/assets/js/'));
});


gulp.task('views', function(){
  return gulp.src([
      '!./src/views/_*.jade',
      './src/views/*.jade'
    ])
    .pipe($.jade({pretty: true}))
    .on('error', $.util.log)
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({stream: true, reloadDelay: 300}));
});


gulp.task('styles', function () {
  var browsers = [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
    'Opera 12.1'
  ];
  return gulp.src('./src/assets/styles/main.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.sass())
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.concat('main.css'))
    .pipe($.postcss([
        require('autoprefixer')({
          browsers: browsers
        })
      ]))
    .pipe(gulp.dest('./dist/assets/styles/'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('images', function() {
  return gulp.src('./src/assets/images/**/*')
    .pipe($.imagemin())
    .pipe(gulp.dest('./dist/assets/images/'));
});


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './dist/'
    },
    ghostMode: true,
    notify: false
  });
});


gulp.task('watch', ['build'], function() {
  gulp.watch('src/assets/images/**/*', ['images']);
  gulp.watch('src/assets/styles/*', ['styles']);
  gulp.watch('src/assets/js/*', ['js']);
  gulp.watch('src/views/**/*.jade', ['views']);
  gulp.start('browser-sync');
});


gulp.task('build', ['styles', 'views', 'images', 'js']);


gulp.task('default', ['build'], function() {
  gulp.start('watch');
});
