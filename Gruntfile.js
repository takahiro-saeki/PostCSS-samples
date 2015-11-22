module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-simple-ejs');
  grunt.registerTask('default', ['postcss','watch','ejs:dev','connect']);
  grunt.initConfig({
    postcss: {
      options: {
        processors: [
          require('postcss-partial-import')(),
          require('postcss-extend')(),
          require('postcss-mixins')(),
          require('autoprefixer')(),
          require('postcss-nested')(),
          require('postcss-simple-vars')(),
          require('postcss-size')(),
          require('postcss-sprites')({
            spritePath    : 'template/img/main.png',
            from: 'css/app.css',
            to: 'css/app2.css'
          }),
          require('cssnext')(),
          require('postcss-media-minmax')()
          //require('cssnano')()
        ]
      },
      //dist: {
        //src: ['css/*.css'],
        //dest: 'template/css/style.css'
      //}
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
        files: 'css/*.css',
        tasks: ['postcss']
      }
    }
  });
};
