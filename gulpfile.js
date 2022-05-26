const { src, dest, parallel,series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const concat = require('gulp-concat')
const browser_sync = require('browser-sync').create();
var gulp = require('gulp');

function cleanTask() {
  return src('./dest/*')
  .pipe(clean())
}

function sassTask() {
  return src('./src/sass/*')
  .pipe(sass())
  .pipe(concat('styles.css'))
  .pipe(dest(('./dest')))
  .pipe(browser_sync.stream())
}

function copyVendorTask() {
  return src('./src/vendor/*')
  .pipe(dest(('./dest')))
}

function copyAssetsTask() {
  return src('./src/assets/**/*')
  .pipe(dest(('./dest')))
}

function JSTask() {
  return src('./src/js/*')
  .pipe(dest(('./dest')))
  .pipe(browser_sync.stream())
}

function HTMLTask() {
  return src('./src/html/*')
  .pipe(dest(('./dest')))
  .pipe(browser_sync.stream())
}

function watch(){
  browser_sync.init({
    server: {
      baseDir: './dest'
    }
  });
  gulp.watch('./src/sass/**/*.sass',sassTask);
  gulp.watch('./src/html/**/*.html',HTMLTask).on('change', browser_sync.reload);
  gulp.watch('./src/js/**/*.js',JSTask).on('change', browser_sync.reload);

}


exports.default = series(cleanTask, parallel(HTMLTask, sassTask, copyAssetsTask,copyVendorTask,JSTask));
exports.watch = watch;