const gulp = require('gulp');
const del = require('del');
const { dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const eslint = require('gulp-eslint');
const csslint = require('gulp-csslint');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const inject = require('gulp-inject');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const purgecss = require('gulp-purgecss');

sass.compiler = require('node-sass');

const SRC = 'src';
const DIST = 'dist';

function clean() {
  return del([`${DIST}/**/*`]);
}

function copy() {
  return gulp.src(`${SRC}/**/*`).pipe(dest(DIST));
}

function buildJs() {
  return gulp
    .src([
      `${DIST}/js/jquery.js`,
      `${DIST}/js/home.js`,
      `${DIST}/js/produto.js`,
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest(`${DIST}/js`));
}

function compileCss() {
  return gulp
    .src(`${DIST}/scss/styles.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest(`${DIST}/css`));
}

function minifyCss() {
  return gulp
    .src(`${DIST}/css/styles.css`)
    .pipe(cleanCSS())
    .pipe(
      rename({
        basename: 'main',
        suffix: '.min',
      })
    )
    .pipe(dest(`${DIST}/css`));
}

function cssLint() {
  return gulp
    .src(`${DIST}/css/styles.css`)
    .pipe(
      csslint({
        ids: false,
        'order-alphabetical': false,
      })
    )
    .pipe(csslint.formatter('stylish'));
}

buildCss = series(compileCss, minifyCss);
buildCssLint = series(compileCss, cssLint, minifyCss);

function buildHtml() {
  const sources = gulp.src(
    [`${DIST}/js/main.min.js`, `${DIST}/css/main.min.css`],
    {
      read: false,
    }
  );
  return gulp
    .src(`${DIST}/*.html`)
    .pipe(inject(sources, { relative: true }))
    .pipe(dest(DIST));
}

function purgeCss() {
  return gulp
    .src([`${DIST}/**/*.css`, `!${DIST}/css/bootstrap.css`])
    .pipe(
      purgecss({
        content: [`${DIST}/*.html`],
      })
    )
    .pipe(dest(DIST));
}

function buildImg() {
  return gulp
    .src(`${DIST}/img/**/*`)
    .pipe(imagemin())
    .pipe(dest(`${DIST}/img`));
}

function server() {
  browserSync.init({
    server: `./${DIST}`,
  });

  watch([`${SRC}/**/*.js`]).on('change', (path) => {
    return gulp
      .src(path)
      .pipe(eslint(`${SRC}/eslintconfig.js`))
      .pipe(eslint.format());
  });
  csslint.addFormatter('csslint-stylish');
  watch(
    [
      `${DIST}/css/*.css`,
      `${DIST}/scss/*.scss`,
      `!${DIST}/css/+(styles|main.min).css`,
    ],
    buildCssLint
  );
  watch([`${DIST}/**/*.html`, `${DIST}/css/main.min.css`]).on('change', reload);
}

const build = series(
  clean,
  copy,
  parallel(
    buildImg,
    series(parallel(buildCss, buildJs), buildHtml, purgeCss, server)
  )
);

module.exports = {
  clean: clean,
  copy: copy,
  server: server,
  buildImg: buildImg,
  buildJs: buildJs,
  buildCss: buildJs,
  buildHtml: buildHtml,
  purgeCss: purgeCss,

  default: build,
};
