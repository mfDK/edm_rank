var gulp = require('gulp');
var jshint = require('gulp-jshint');

// Task for linting all JS files
gulp.task('js', function() {
    return gulp.src(['server.js', 'src/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
