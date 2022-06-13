const { src, dest, parallel, series } = require("gulp");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const browser_sync = require("browser-sync").create();
var gulp = require("gulp");

function cleanTask() {
  return src("./public/*").pipe(clean());
}

function copyVendorTask() {
  return src("./src/vendor/*").pipe(dest("./public"));
}

function copyAssetsTask() {
  return src("./src/assets/**/*").pipe(dest("./public"));
}

function JSTask() {
  return src("./src/js/*").pipe(dest("./public")).pipe(browser_sync.stream());
}

function HTMLTask() {
  return src("./src/html/*").pipe(dest("./public")).pipe(browser_sync.stream());
}

function watch() {
  browser_sync.init({
    server: {
      baseDir: "./public",
    },
  });
  gulp
    .watch("./src/html/**/*.html", HTMLTask)
    .on("change", browser_sync.reload);
  gulp.watch("./src/js/**/*.js", JSTask).on("change", browser_sync.reload);
}

exports.default = series(
  cleanTask,
  parallel(HTMLTask, copyAssetsTask, copyVendorTask, JSTask)
);
exports.watch = watch;
