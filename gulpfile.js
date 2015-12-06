
var gulp   = require('gulp')
, uglify   = require("gulp-uglify")
, jshint   = require("gulp-jshint")
, rename   = require('gulp-rename')
, graceful = require('graceful-fs')
, concat   = require('gulp-concat');


var js_sources = [
    'src/TweenMax.min.js', 
    'src/howler.min.js', 
    'src/Sounds.js', 
    'src/ScreenManager.js', 
    'src/ColorWheel.js',
    'src/Game.js', 
    'src/app.js'
];


gulp.task('build', ['compile-js'], function() {});


gulp.task('compile-js', function () {
    gulp.src(js_sources)
    .pipe(concat('concat.js'))
    .pipe(uglify())
    .pipe(rename('color-coder.js'))
    .pipe(gulp.dest('js/'));
});


gulp.task('lint', function () {
    gulp.src(js_sources)
    .pipe(jshint({ sub: true, loopfunc: true }))
    .pipe(jshint.reporter());
});


gulp.task('watch', function () {
    gulp.watch(js_sources, ['build']);
});