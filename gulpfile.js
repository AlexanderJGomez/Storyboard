/* File: gulpfile.js */
'use strict';
// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

gulp.task('watch', ['webpack-dev-server', 'serve:dev'], function() {

});

gulp.task('serve:dev', function() {
	console.log('working');
	nodemon({
		script: 'app.js',
		ext: 'html js jade',
		env: {
			'NODE_ENV': 'development',
			'COOKIE_SECRET': 'foobar',
			'SESSION_SECRET': 'foobar'
		},
		ignore: [
			'public/*.*',
			'public/**/*.*'
		]
	}).on('restart', function() {
		console.log('restarted!');
	});
});


var devServer = {};
gulp.task('webpack-dev-server', function(callback) {
	console.log('running');
	devServer = new WebpackDevServer(webpack(webpackConfig), {
		contentBase: 'http://localhost:8888',
		publicPath: webpackConfig.output.publicPath,
		hot: true,
		stats: { colors: true },
		noInfo: true
	});
	devServer.listen(8888, 'localhost', function(err) {
		if(err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'http://localhost:8888');
		callback();
	});
	return;
});