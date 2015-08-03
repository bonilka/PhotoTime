'use strict';
 var gulp = require('gulp');
 var browserSync = require('browser-sync').create();
 var normalize = require('normalize');
 var stylus = require('gulp-stylus');
 var nib = require('nib');
 var watch = require('gulp-watch');
 var jade = require('gulp-jade');

 // gulp.task('sass', function () {
 //   gulp.src('./sass/**/*.scss')
 //     .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
 //     .pipe(gulp.dest('./css'));
 // });
 gulp.task('stylus', function() {
   gulp.src('./assets/stylus/style.styl')
     .pipe(stylus({ use: nib(), compress: false}))
     .pipe(gulp.dest('./public/css/'));
 });
 gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('./assets/jade/**/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: false
    }))
    .pipe(gulp.dest('./public/'))
});
gulp.task('watch', function() {
  gulp.run ('stylus');
  gulp.run ('jade');
  browserSync.init({
       server: "./public"
   });
  gulp.watch("./public/*.html").on('change', browserSync.reload);
  gulp.watch("./public/js/*.js").on('change', browserSync.reload);
  gulp.watch("./public/css/*.css").on('change', browserSync.reload);
  gulp.watch('./assets/stylus/*', ['stylus']);
  gulp.watch('./assets/jade/**/*.jade', ['jade']);

});
