'use strict';

const gulp = require('gulp'),
    pug = require('gulp-pug'),
    stylus = require('gulp-stylus'),
    cleancss = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    debug = require('gulp-debug'),
    gulpif = require('gulp-if'),
    newer = require('gulp-newer'),
    remember = require('gulp-remember'),
    cache = require('gulp-cached'),
    del = require('del'),
    browser = require('browser-sync').create();

const paths = {
    pug: {
        src: 'assets/pug/pages/*.pug',
        dest: 'public/',
        watch: 'assets/pug/**/*.pug'
    },
    stylus: {
        src: 'assets/static/styles/styles.styl',
        dest: 'public/',
        watch: 'assets/static/styles/**/**/**/*.styl'
    },
    js: {
        src: 'assets/static/scripts/*.js',
        dest: 'public/',
        watch: 'assets/static/scripts/*.js'
    }, 
    img: {
        src: 'assets/static/images/**/**/*',
        dest: 'public/images/',
        watch: 'assets/static/images/**/**/*'
    },
    fonts: {
        src: 'assets/static/fonts/**/*',
        dest: 'public/fonts/',
        watch: 'assets/static/fonts/**/*'
    },
    libs: {
        normalize: 'node_modules/normalize.css/normalize.css',
        jquery: 'node_modules/jquery/dist/jquery.min.js',
        dest: 'public/'
    },
    dir: 'public/'
}

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'

gulp.task('clean', () => {
    return del(paths.dir);
});

gulp.task('pug:build', () => {
    return gulp.src(paths.pug.src)
        .pipe(plumber({
            errorHandler: notify.onError()
        }))
        .pipe(pug({
            pretty: gulpif(isDevelopment, true) 
        }))
        .pipe(gulp.dest(paths.pug.dest));
});

gulp.task('stylus:build', () => {
    return gulp.src(paths.stylus.src)
        .pipe(plumber({
            errorHandler: notify.onError()
        }))
        .pipe(gulpif(isDevelopment, sourcemaps.init()))
        .pipe(stylus({
            compress: true,
            'include css': true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulpif(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest(paths.stylus.dest));
});

gulp.task('js:build', () => {
    return gulp.src(paths.js.src)
        .pipe(plumber({
            errorHandler: notify.onError()
        }))
        .pipe(gulpif(isDevelopment, sourcemaps.init()))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulpif(isDevelopment, uglify()))
        .pipe(concat('main.min.js'))
        .pipe(gulpif(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('img:build', () => {
    return gulp.src(paths.img.src)
        .pipe(newer(paths.img.dest))
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('fonts:build', () => {
    return gulp.src(paths.fonts.src)
        .pipe(newer(paths.fonts.dest))
        .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('libs:build:css', () => {
    return gulp.src(paths.libs.normalize)
        .pipe(cleancss())
        .pipe(concat('all.libs.min.css'))
        .pipe(gulp.dest(paths.libs.dest));
});

gulp.task('libs:build:js', () => {
    return gulp.src(paths.libs.jquery)
        .pipe(concat('all.libs.min.js'))
        .pipe(gulp.dest(paths.libs.dest));
});

gulp.task('watch', () => {
    gulp.watch(paths.pug.watch, gulp.series('pug:build'));
    gulp.watch(paths.stylus.watch, gulp.series('stylus:build'));
    gulp.watch(paths.js.watch, gulp.series('js:build'));
    gulp.watch(paths.img.watch, gulp.series('img:build'));
    gulp.watch(paths.fonts.watch, gulp.series('fonts:build'));
});

gulp.task('serve', () => {
    browser.init({
        server: paths.dir
    })

    gulp.watch(paths.dir + '**/**/*.*').on('change', browser.reload);
});

gulp.task('libs:build', 
    gulp.series('libs:build:css', 'libs:build:js'));

gulp.task('build', gulp.series(
    'libs:build', 'fonts:build', 'img:build', 'pug:build', 'stylus:build', 'js:build' 
));

gulp.task('default', 
    gulp.series('clean', 'build', gulp.parallel('serve', 'watch')));