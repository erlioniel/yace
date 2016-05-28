module.exports = function (grunt) {

	// Load Grunt tasks declared in the package.json file.
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		ts: {
			base: {
				src: ['src/**/*.ts'],
				out: '<%= pkg.name %>.js',
				options: {
					module: "amd",
					target: "es5"
				}
			},
			tests: {
				src: ['tests/**/*.ts'],
				dest: 'build/tests/',
				options: {
					module: 'commonjs',
					target: "es5"
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
				src: '<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js'
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
		'ts:base',
		'uglify'
	]);

	grunt.registerTask('tests', [
		'clean:tests',
		'ts:tests',
		'mochaTest:tests'
	]);
};