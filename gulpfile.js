"use strict";

const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    jsmin = require('gulp-jsmin'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    imagemin = require('imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    imageminOptipng = require('imagemin-optipng');

const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'src/dist'
    },
    scripts: {
        src: 'src/js/index.js',
        dest: 'src/js'
    },
    babelPolyfill: {
        src: 'node_modules/babel-polyfill/dist/polyfill.js'
    },
    images: {
        src: './src/images/**/*.{jpg,png}',
        dest: 'src/dist/images'
    }
};

const styles = () =>
    gulp.src(paths.styles.src)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.styles.dest));

const scripts = () =>
    gulp.src([paths.babelPolyfill.src, paths.scripts.src])
        .pipe(babel({
            "plugins": [
                "transform-object-assign",
                "transform-object-rest-spread"
            ],
            "presets": [
                [
                    "env",
                    {
                        "targets": {
                            "browsers": ["last 3 versions"]
                        }
                    }
                ]
            ]
        }))
        .pipe(jsmin())
        .pipe(concat('index.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));

// imagemin
const imageMin = () =>
    imagemin([paths.images.src], paths.images.dest, {
        plugins: [
            imageminMozjpeg({quality: 90}),
            imageminOptipng()
        ]
    }).then(files => {
        console.log('images optimized');
    });

// watch
const watch = () => {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
};

const defaultTasks = gulp.parallel(watch);

gulp.task('watch', defaultTasks);
