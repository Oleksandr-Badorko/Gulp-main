const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("styles", function () {
  return (
    gulp
      .src("./scss/styles.scss")
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./css"))
      .pipe(browserSync.stream())
  );
});

gulp.task("watch", function () {
  browserSync.init({
    server: "./",
  });

  gulp.watch("./scss/**/*.scss", gulp.series("styles"));
  gulp.watch(["./*.html", "./js/**/*.js"]).on("change", browserSync.reload);
});

gulp.task("default", gulp.series("styles", "watch"));