var isProduction = process.argv.slice(-1)[0] === 'production',

    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    colors      = require('colors'),

    gulp        = require('gulp'),
    gulpif      = require('gulp-if'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    stylus      = require('gulp-stylus');

// Собираем Stylus
gulp.task('stylus', function() {
    gulp.src('./src/styl/*.styl')
        // склеиваем, чтобы подтянулись конфиги
        .pipe(concat('style.styl'))
        .pipe(stylus(
         // { use: ['nib'] }
        )) // собираем stylus
    .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    //.pipe(myth()) // добавляем префиксы - http://www.myth.io/
    .pipe(gulp.dest('./public/css/')) // записываем css
    .pipe(reload({stream: true}));
});

//TODO: можно собирать requirejs https://github.com/RobinThrift/gulp-requirejs
gulp.task('js', function() {
    gulp.src('./src/js/modules/**/*.js')
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest('./public/js/'))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['dev'], function() {});

gulp.task('dev', ['stylus', 'js'], function() {
    browserSync({
       proxy: "localhost:8080"
    });

    gulp.watch('./src/styl/*.styl', ['stylus']);
    gulp.watch('./src/js/**/*.js', ['js']).on('change', reload);
    gulp.watch('./views/**/*.jade').on('change', reload);
});

gulp.task('production', ['stylus', 'js']);

console.log('Started as '.green + (isProduction ? 'production'.red : 'Dev'.blue ));
