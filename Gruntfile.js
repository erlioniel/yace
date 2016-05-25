module.exports = function (grunt) {

	// Load Grunt tasks declared in the package.json file.
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		typescript: {
			base: {
				src: ['src/**/*.ts'],
				dest: 'build/raw/<%= pkg.name %>.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'build/raw/<%= pkg.name %>.js',
				dest: 'build/dist/<%= pkg.name %>.min.js'
			}
		},

		clean: ['build/']
	});

	grunt.registerTask('default', [
		'clean',
		'typescript',
		'uglify'
	]);
};