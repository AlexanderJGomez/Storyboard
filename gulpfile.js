/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon');

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

gulp.task('watch', function(){
	nodemon({
		script: 'app.js',
		ext: 'html js jade css',
		env: {
			'NODE_ENV' : 'devlopment',
			'COOKIE_SECRET' : 'foobar',
			'SESSION_SECRET': 'foobar'
		},
		ignore: [
			'public/*.*',
			'public/**/*.*'
		]
	}).on('restart', function() {
		console.log('restarted');
	});
});
