module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-simple-ejs');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('default', ['postcss','watch','ejs:dev']);
  grunt.initConfig({
    postcss: {
      options: {
        processors: [
        ]
      },
      dist: {
        src: 'css/style.css',
        dest: 'template/css/style.css'
      }
    },
    ejs: {
      dev: {
        templateRoot: 'ejs',
        template: [ '*.html.ejs' ],
        dest: 'template',
        options: {}
      }
    },
    connect: {
      livereload: {
        options: {
          port: 8888
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      ejs: {
        files: ['**/*.ejs'],
        tasks: ['ejs:dev']
      }
    }
  });
};
