// load plugins
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    wiredep = require('wiredep').stream,
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload;

// paths of the project
var path = {
    watch: {
        html: [
            'index.html'
        ],
        js: [
            'js/main.js'
        ],
        css: 'css/main.css'
    }
};

// connect with the root development folder
gulp.task('connect', ['watch'], function () {
    connect.server({
        port: 9002,
        base: '',
        open: false
    });

    browserSync.init({
        notify: false,
        port: 8082,
        server: {
            baseDir: [
                ''
            ]
        }
    });
});

// convert scss to css
gulp.task('css', function () {
    return gulp.src(path.watch.css).pipe(reload({stream: true}));
});

// watch for changes in scss, html, js
gulp.task('watch', function () {
    gulp.watch(path.watch.html).on('change', reload);
    gulp.watch(path.watch.js).on('change', reload);
    gulp.watch(path.watch.css, ['css']);
});

// start by default
gulp.task('default', ['css', 'connect']);