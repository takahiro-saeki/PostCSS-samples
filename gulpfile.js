var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var simplevars = require('postcss-simple-vars');
var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var nestedcss = require('postcss-nested');
var corepostcss = require('postcss');
var categories = require('./data/cat-colors.json');

var dataloop = function(css) {
    for ( var category in categories.colorList ) {
        var colorSet = categories.colorList[category];
        var borderTop = colorSet[0];
        var borderBottom = colorSet[1];
        var rule = corepostcss.rule({ selector: '.cat-' + category });
        rule.append({ prop: 'border-top', value: '1px solid ' + borderTop});
        rule.append({ prop: 'border-bottom', value: '1px solid ' + borderBottom + ";"});
        css.append(rule);
    }
};

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}),
        simplevars,
        nestedcss,
        dataloop
    ];
    return gulp.src('./preCSS/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});

// Static server
gulp.task('browser-sync', function() {
     browserSync({
          server: {
                baseDir: "./"
          }
     });
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));
});

// Images
gulp.task('images', function() {
  return gulp.src('img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Watch
gulp.task('watch', function() {

    // Watch .css files
    gulp.watch('preCSS/**/*.css', ['css', browserSync.reload]);

    // Watch .js files
    gulp.watch(['js/**/*.js','main.js'], ['scripts', browserSync.reload]);

    // Watch image files
    gulp.watch('img/**/*', ['images']);

    // Watch any files in dist/, reload on change
    gulp.watch("*.html", browserSync.reload);

});

gulp.task('default', ['css', 'browser-sync', 'scripts', 'watch']);
