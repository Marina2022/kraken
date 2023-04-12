import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import browser from "browser-sync";
import sourcemaps from "gulp-sourcemaps";
import terser from "gulp-terser";
import del from "gulp-clean";
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminOptipng from "imagemin-optipng";

export const clean = () => {
  return gulp.src("build").pipe(del({ force: true }));
};

const scripts = () => {
  return gulp
    .src("source/js/**/*.js")
    //.pipe(terser())  // минификатор js
    .pipe(gulp.dest("build/js"))
    .pipe(browser.stream());
};

export const optimizeImg = () => {
  return gulp
    .src("source/img/**/*.*")
    .pipe(
      imagemin([
        imageminMozjpeg({ quality: 75, progressive: true }),
        imageminOptipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(gulp.dest("build/img"));
};

export const flagSprite = () => {
  return gulp
    .src("source/img/flags/*.svg")
    .pipe(svgstore())
    .pipe(rename("flagSprite.svg"))
    .pipe(gulp.dest("build/img"));
};

const copyImg = () => {
  return gulp.src("source/img/**/*.*").pipe(gulp.dest("build/img"));
};

const makeWebp = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
};

export const html = () => {
  return gulp
    .src("source/**/*.html")
    //.pipe(htmlmin({ collapseWhitespace: true }))  // это минифай, потом верни
    .pipe(gulp.dest("build"));
};

export const php = () => {
  return gulp
    .src("source/**/*.php")
    .pipe(gulp.dest("build"));
};


export const styles = () => {
  return gulp
    .src("source/sass/**/*.+(scss|sass|css)", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

// Server

const server = (done) => {
  browser.init({
    //proxy: "http://localhost/bestcode/build",  // чтобы запускался с локалки, ура!
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/*.html").on("change", gulp.series(html, browser.reload));
  gulp.watch("source/**/*.png").on("change", gulp.series(copy, browser.reload));
  gulp.watch("source/**/*.jpg").on("change", gulp.series(copy, browser.reload));
  gulp.watch("source/**/*.svg").on("change", gulp.series(copy, browser.reload));
  gulp.watch("source/**/*.php").on("change", gulp.series(php, browser.reload));
  gulp.watch("source/js/**/*.js").on("change", gulp.series(scripts));
  gulp.watch("source/img/**/*").on("all", gulp.series(optimizeImg));
};

export const copy = () => {
  return gulp
    .src(["source/fonts/*", "source/*.ico", "source/img/**/*.jpg", "source/img/**/*.png", "source/*.php",  "source/css/**/*.css",  "source/*.png", "source/*.ico", "source/*.json", "source/video/**/*.mp4" ], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
};

export default gulp.series(
  clean,
  copy,
  styles,
  html,
  php,
  scripts,
  copyImg,
  makeWebp,
  server,
  watcher
);
