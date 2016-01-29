module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-typescript');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
	    base: {
		src: ['src/**/*.ts'],
		dest: 'js/',
		options: {
		    module: 'amd',
		    target: 'es5'
		}
	    }
        }
    });
};
