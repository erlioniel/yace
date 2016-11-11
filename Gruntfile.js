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
					moduleResolution: "classic",
					target: "es5"
				}
			},
			examples: {
				src: ['examples/**/*.ts'],
				options: {
					module: 'amd',
					moduleResolution: "classic",
					target: 'es5',
					isolatedModules: true
				}
			},
			tests: {
				src: ['tests/**/*.ts'],
				dest: 'build/tests/',
				options: {
					module: 'commonjs',
					moduleResolution: "classic",
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

		clean: {
			all: ['build'],
			build: ['build/raw/', 'builds/dist/'],
			tests: ['build/tests/']
		},

		watch: {
			default: {
				files: ['src/**/*.ts', 'examples/**/*.ts'],
				tasks: ['dev-build', 'ts:examples']
			}
		}
	});

	grunt.registerTask('dev-build', [
		'ts:base'
	]);

	grunt.registerTask('prod-build', [
		'default',
		'uglify'
	]);

	grunt.registerTask('tests', [
		'clean:tests',
		'ts:tests',
		'mochaTest:tests'
	]);
};