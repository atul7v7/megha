'use strict'

// required plugins
var autoprefixer = require('autoprefixer');
var browsersync = require('browser-sync').create();
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var minifyjs = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var terser = require('gulp-terser');
var combineMediaQuery = require('postcss-combine-media-query');
var mediaQueriesSplitter = require('gulp-media-queries-splitter');
var del = require('del');

// BrowserSync
async function browserSync(done) {
  browsersync.init({
    open: false,
    port: 3000,
    server: {
      baseDir: './'
    }
  });
  done();
}
// html
async function html() {
  return gulp
    .src([
      './*.html',
    ])
    .pipe(browsersync.stream());
}

// clean
async function clean() {
  return del(['./assets/dist/']);
};

//scss to css
async function sass() {
  return gulp.src('./assets/src/scss/main.scss')
    .pipe(sass({ outputStyle: "expanded" })) // css in expended form
    .pipe(gulp.dest('./assets/dist/css'));
};

//minify js
function scripts() {
  return (
    gulp
      .src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/owl.carousel/dist/owl.carousel.js',
        './assets/src/js/**/*',
      ])
      .pipe(plumber())
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./assets/dist/js/'))
      .pipe(terser())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./assets/dist/js/'))
      .pipe(browsersync.stream())
  );
}

// images
async function images() {
  return gulp
    .src('./assets/src/image/**/*')
    .pipe(newer('./assets/dist/image'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest('./assets/dist/image'));
}

// fonts
function fonts() {
  return (
    gulp
      .src('./assets/src/fonts/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('./assets/dist/fonts'))
      .pipe(browsersync.stream())
  );
}

//spilt media queries
async function spilt() {
  return gulp
    .src([
      './assets/src/scss/main.scss',
    ])
    .pipe(plumber())
    .pipe(concat('main.css'))
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./assets/dist/css/"))
    .pipe(postcss([autoprefixer(), combineMediaQuery()]))
    .pipe(gulp.dest("./assets/dist/css/"))
    .pipe(mediaQueriesSplitter([
      { media: 'none', filename: 'base.css' },
      { media: [{ min: '576px', minUntil: '768px' }, { min: '576px', max: '768px' }], filename: 'tablet.css' },
      { media: { min: '768px' }, filename: 'desktop.css' },
    ]))
    .pipe(gulp.dest("./assets/dist/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss[cssnano()])
    .pipe(gulp.dest("./assets/dist/css/"))
    .pipe(browsersync.stream());
};

//minify css
async function css() {
  return gulp
    .src([
      './assets/src/scss/main.scss'
    ])
    .pipe(plumber())
    .pipe(concat('main.css'))
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./assets/dist/css/"))
    // .pipe(postcss([autoprefixer(), combineMediaQuery()]))
    .pipe(gulp.dest("./assets/dist/css/"))
    .pipe(mediaQueriesSplitter([
      { media: 'none', filename: 'base.css' },
      { media: [{ min: '576px', minUntil: '768px' }, { min: '576px', max: '768px' }], filename: 'tablet.css' },
      { media: { min: '768px' }, filename: 'desktop.css' },
    ]))
    .pipe(gulp.dest("./assets/dist/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cssnano())
    .pipe(gulp.dest("./assets/dist/css/"))
    .pipe(browsersync.stream());
}

// watch changes
async function watchFiles() {
  gulp.watch('./assets/src/scss/**/*', css);
  gulp.watch('./assets/src/js/**/*', scripts);
  gulp.watch('./assets/src/image/**/*', images);
  gulp.watch('./assets/src/fonts/**/*', fonts);
  gulp.watch('./*.html', html);
}

const start = gulp.series(clean, images, fonts, css, scripts, html);
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.images = images;
exports.css = css;
exports.scripts = scripts;
exports.clean = clean;
exports.watch = watch;
exports.default = gulp.series(start, watch);