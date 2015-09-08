module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),

	// less: {
	// 	options: {
	// 		paths: ['less/']
	// 	},
	// 	src: {        
	// 		expand: true,
	// 		cwd:    "less/",
	// 		src:    "*.less",
	// 		ext:    ".css",
	// 		dest:   "css/"
	// 	}
	// },

	sass: {
		dist: {
			options: {
				style: 'compressed',
				noCache: true
			},
			files: [{
				expand: true,
				cwd:    "sass/",
				src:    ["*.scss"],
				ext:    ".css",
				dest:  "css/"          
			}]
		}
	},

	watch: {
		options: {
			nospawn: true,
			livereload: true
		},
		// less: {
		// 	files: ['less/*.less'],
		// 	tasks: ['less']
		// },
		sass: {
			files: ['sass/*.scss'],
			tasks: ['sass']
		}
	}

});

  grunt.registerTask('default', ['watch']);
};