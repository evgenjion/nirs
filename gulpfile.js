var isProduction = process.argv.slice(-1)[0] === 'production',

    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    colors      = require('colors'),

    gulp        = require('gulp'),
    gulpif      = require('gulp-if'),
    
    concat      = require('gulp-concat'),
    insert      = require('gulp-insert'),
    uglify      = require('gulp-uglify'),
    es          = require('event-stream'),

    // Typescript
    typescript  = require('gulp-typescript'),
    tsConfig    = typescript.createProject('tsconfig.json', {
                      typescript: require('typescript')
                  }),

    // useful gulp debug
    print       = require('gulp-print')

    mocha       = require('gulp-spawn-mocha'),
    stylus      = require('gulp-stylus');


// - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - STYLUS: - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('stylus', function() {
    gulp.src('./frontend/styl/*.styl')
        // склеиваем, чтобы подтянулись конфиги
        .pipe(concat('style.styl'))
        .pipe(stylus(
         // { use: ['nib'] }
        )) // собираем stylus
    .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('./public/css/')) // записываем css
    .pipe(reload({stream: true}));
});

//TODO: можно собирать requirejs https://github.com/RobinThrift/gulp-requirejs
// - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - -JS/TypeScript BUILD: - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('js', function() {

    function ts() {
        return gulp.src('./frontend/js/modules/**/*.ts')
            .pipe(typescript(tsConfig))
            .on('error', function(e) { console.error(e.message); });
    }

    function js() {
        return gulp.src([
            './frontend/js/modules/**/*.js', 
            '!./frontend/js/modules/**/*.test.js' // Dont build tests as modules
        ]);
    }

    return es.merge(ts(), js())
            .pipe(gulpif(isProduction, uglify()))
            .pipe(gulp.dest('./public/js/'))
            .pipe(reload({stream: true}));
});

// - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - MAIN TASKS: - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('default', ['dev'], function() {});
gulp.task('dev', ['stylus', 'js'], function() {
    browserSync({
       proxy: "localhost:8080"
    });

    gulp.watch('./frontend/styl/*.styl', ['stylus']);
    gulp.watch('./frontend/js/**/*.js', ['js']).on('change', reload);
    gulp.watch('./frontend/js/**/*.ts', ['js']).on('change', reload);

    gulp.watch('./views/**/*.jade').on('change', reload);
});

gulp.task('production', ['stylus', 'js']);

console.log('Started as '.green + (isProduction ? 'production'.red : 'Dev'.blue )); 

// - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - TEST RUNNING: - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('client-test', ['js'], function() {

    // fabric.js нельзя загрузить через node.js(из которой запускаются тесты)
    // поэтому стабаем руками:(
    const fabricStub = `
        global.fabric = {
            Canvas: sinon.stub()
        };
    `;
    const commonTestsConfig = `
        'use strict';

        // Импорт зависимых библиотек
        let _ = require('lodash'),
            sinon = require('sinon'),
            {assert} = require('chai');

        let requirejs = require('requirejs');

        // Конфиг для require.
        requirejs.config({
            baseUrl: './public/js',
            nodeRequire: require
        });

        // Стабаем конструктор браузерный конструктор Websocket
        global.WebSocket = sinon.stub();

        // Стабаем fabric.js:
        ${fabricStub}
    `;

    gulp.src('./frontend/js/**/*.test.js')
    // Подписываем файлы, чтобы удобнее было смотреть склеенный файл
    .pipe(insert.transform(function(contents, file) {
        var comment = `\n/* Test file path: ${file.path} */\n`;
        return comment + contents;
    }))
    // Объединяем в один для того, чтобы единоразово подтянуть общий код для всех тестов
    .pipe(concat('all.test.js'))
     // Подключаем конфиги для require(единоразово),
     // чтобы подключать файл по зависимостям из тестов
    .pipe(insert.prepend(commonTestsConfig))
    .pipe(gulp.dest('./tests/'))
    .pipe(mocha({
        reporter: 'nyan'
    }));
    
});
