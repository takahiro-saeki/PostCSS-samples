module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['postcss','connect','watch','ejs:dev','concat']);
  grunt.initConfig({
    concat: {
      dist: {
        src: 'js/common.js',
        dest: 'template/js/common.js'
      }
    },
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
            spritePath : 'img/main.png',
            from: 'css/_sass.css',
            to: 'template/css/style.css'
          }),
          require('cssnext')(),
          require('postcss-write-svg')()
          //require('cssnano')()
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css'],
          dest: 'template/css',
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
      },
      concat: {
        files: ['js/*.js'],
        tasks: ['concat']
      }
    }
  });
};
