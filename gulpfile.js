var gulp = require('gulp'),
	ulgify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
    validator = require('gulp-html'),
	sourceMaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

// Javascript tasks
gulp.task('scripts', function(){
	gulp.src('js/*.js')
	.pipe(concat('scripts.js'))
	.pipe(ulgify())
	.pipe(gulp.dest('js'))
	.pipe(reload({stream: true}));
});

// CSS tasks
gulp.task('sass', function(){
	gulp.src('./scss/*.scss')
//	.pipe(concat('styles.scss'))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./css'))
	.pipe(reload({stream: true}));
});

// HTML
gulp.task('html', function() {
  return gulp.src('./index.html')
  .pipe(validator())
  .pipe(gulp.dest('dist/'));
});

// Server and watch tasks
gulp.task('default', ['sass', 'scripts'], function() {

    browserSync({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch("./js/*.js", ['scripts']);
    gulp.watch("./*.html").on('change', reload);
});

