module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        clean: ['js', 'src/**/**.js'],
        
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'js/',
                options: {
                    module: 'amd',
                    target: 'es5'
                }
            }
        },

        concat: {
            dist: {
                src: ['js/**/*.js'],
                dest: 'bin/js/robster.js'
            }
        },

        connect: {
            server: {
                options: {
                    port: 8090,
                    base: './bin',
                    keepalive: true
                }
            }
        },
        
        copy: {
            main: {
                files: [
                    {
                    expand: true,
                    src: ['bower_components/phaser/build/phaser.min.js'],
                    dest: 'bin/js',
                    filter: 'isFile',
                    flatten: true
                }
                ]
            }
        }
    });
    
    grunt.registerTask('build', ['clean', 'typescript', 'concat', 'copy']);
    grunt.registerTask('run', ['build', 'connect']);
};
