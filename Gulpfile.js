var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');
var mario = require('gulp-plumber');

var path = {
  js: [
    'node_modules/moment/moment.js',
    'node_modules/react/dist/react.js'
  ],
  jsx: 'www_src/jsx/*.jsx',
  html: 'www_src/*.html',
  css: 'www_src/**/*.css',
  img: 'www_src/**/*.png'
}

gulp.task('default', ['html', 'css', 'jsx', 'img', 'js'], function(){
  
});

gulp.task('jsx', function(){
  gulp.src(path.jsx)
  .pipe(mario())
  .pipe(react({harmony: true}))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('www/js/'));
});

gulp.task('html', function(){
  gulp.src(path.html)
  .pipe(gulp.dest('www'));
});

gulp.task('js', function(){
  gulp.src(path.js)
  .pipe(gulp.dest('www/js/'));
});

gulp.task('css', function(){
  gulp.src(path.css)
  .pipe(gulp.dest('www'));
});

gulp.task('img', function(){
  gulp.src(path.img)
  .pipe(gulp.dest('www'));
});

gulp.task('watch', ['default'], function(){
  gulp.watch(path.jsx, ['jsx']);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.css, ['css']);
  gulp.watch(path.img, ['img']);
});