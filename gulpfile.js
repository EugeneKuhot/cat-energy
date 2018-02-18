"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var htmlmin = require("gulp-htmlmin");
var minify = require("gulp-csso");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var run = require("run-sequence");
var del = require("del");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

gulp.task("html", function() {
  return gulp.src("./source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("./build"))
    .pipe(server.stream());
});

gulp.task("style", function() {
  gulp.src("./source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("./build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"))
    .pipe(server.stream());
});


gulp.task("scripts", function () {
  return gulp.src("source/js/**/*.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("./source/img/**/*")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
      ]))
    .pipe(gulp.dest("./build/img"))
});

gulp.task("webp", function() {
  return gulp.src("./source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("./build/img"));
});

gulp.task("sprite", function() {
  return gulp.src("./build/img/inline-icons/*.svg")
    .pipe(svgstore({
      inLineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("./build/img"))
});

gulp.task("serve", function() {
  server.init({
    server: "./build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("./source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("./source/*.html", ["html"]);
  gulp.watch("./source/js/*.js", ["scripts"]);
});

gulp.task("copy", function() {
  return gulp.src([
    "./source/fonts/**/*.{woff,woff2}",
    "./source/img/**"
  ], {
    base: "./source/"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    "scripts",
    "images",
    "sprite",
    "html",
    "webp",
    done
  );
});
