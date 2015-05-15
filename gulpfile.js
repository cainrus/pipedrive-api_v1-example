(function() {
    'use strict';

    var gulp = require("gulp");
    var babelify = require('babelify');
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
    var stylus = require('gulp-stylus');
    var sourcemaps = require('gulp-sourcemaps');

    gulp.task('js', function () {
        return browserify({
            entries: './src/es6/main.es6.js',
            debug: true,
            extensions: [".js", ".es6.js"]
        })
            .transform(babelify.configure({
                sourceMap: true
            }))
            .bundle()
            .on("error", function (err) {
                console.log("Error: " + err.message);
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./public/js'));
    });

    gulp.task('css', function () {
        gulp.src('./src/styl/main.styl')
            .pipe(sourcemaps.init())
            .pipe(stylus({
                compress: true
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./public/css'));
    });

    gulp.task('build', ['css', 'js']);
    gulp.task("watch", function () {
        gulp.watch('./src/**/*.es6.js', ['js'])
        gulp.watch('./src/styl/main.styl', ['css'])
    });

}());