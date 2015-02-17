var gulp = require('gulp'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus');

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
    .pipe(gulp.dest('./public/css/')); // записываем css
});

gulp.task('default', ['stylus'], function() {
});
