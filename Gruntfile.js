module.exports = function (grunt) {

	// Load Grunt tasks declared in the package.json file.
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		typescript: {
			base: {
				src: ['src/**/*.ts'],
				dest: 'build/raw/',
				options: {
					module: 'amd'
				}
			},
			tests: {
				src: ['tests/**/*.ts'],
				dest: 'build/tests/',
				options: {
					module: 'commonjs'
				}
			}
		},

		bower: {
			dev: {
				dest: 'vendor/',
				options: {
					expand: true
				}
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

		mochaTest: {
			tests: {
				options: {
					reporter: 'spec',
					colors: true
				},
				src: ['build/tests/tests/**/*.js']
			}
		},

		tsd: {
			refresh: {
				options: {
					command: 'reinstall',
					latest: true,
					config: 'tsd.json',
				}
			}
		},

		clean: {
			all: ['build'],
			build: ['build/raw/', 'builds/dist/'],
			tests: ['build/tests/']
		}
	});

	grunt.registerTask('default', [
		'clean:build',
		'typescript:base'
	]);

	grunt.registerTask('tests', [
		'clean:tests',
		'typescript:tests',
		'mochaTest:tests'
	]);
};