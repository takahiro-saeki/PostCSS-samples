module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['postcss','connect','watch','ejs:dev']);
  grunt.initConfig({
    postcss: {
      options: {
        processors: [
          require('postcss-partial-import')(),
          require('postcss-mixins')(),
          require('postcss-advanced-variables')(),
          require('postcss-extend')(),
          require('autoprefixer')(),
          require('postcss-nested')(),
          require('postcss-simple-vars')(),
          require('postcss-size')(),
          require('postcss-sprites')({
            spritePath : 'template/img/main.png',
            from: 'css/app.css',
            to: 'css/app2.css'
          }),
          require('cssnext')(),
          require('postcss-write-svg')(),
          require("postcss-custom-properties")()
          //require('cssnano')()
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css'],
          dest: 'template/css/',
          ext: '.css'
        }]
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
      },
      postcss: {
        files: ['css/common/*.css','css/*.css'],
        tasks: ['postcss']
      }
    }
  });
};
