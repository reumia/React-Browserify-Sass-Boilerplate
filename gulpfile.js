var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    to5ify = require('6to5ify'),
    source = require('vinyl-source-stream'),
    sourcemaps  = require('gulp-sourcemaps');

gulp.task('browserify', function () {
    watchify(browserify('./src/js/app.js'))
        .transform(to5ify)
        .bundle()
        .on('error', function(err) {
            console.error(err.message);
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('/map'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', ['browserify', 'sass']);

gulp.task('watch', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: false,
            port: 9999,
            fallback: './app.html'
        }));
    gulp.start('default');
    gulp.watch('./src/js/*.js', ['browserify']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});