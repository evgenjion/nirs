var isDev = process.env.NIRS_ENV === 'development',

    browserSync = require('browser-sync'),
    reload      = browserSync.reload,

    gulp        = require('gulp'),
    concat      = require('gulp-concat'),
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

gulp.task('js', function() {
    gulp.src('./src/js/modules/**/*.js')
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
