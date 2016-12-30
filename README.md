# nirs

[![Build Status][travis-build-status]][travis]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]

[travis]:               https://travis-ci.org/evgenjion/nirs
[travis-build-status]:  https://travis-ci.org/evgenjion/nirs.svg?branch=dev
[test-img]:             https://img.shields.io/travis/evgenjion/nirs.svg?label=tests

[coveralls]:    https://coveralls.io/github/evgenjion/nirs?branch=dev
[coverage-img]: https://coveralls.io/repos/github/evgenjion/nirs/badge.svg?branch=dev

### Work in progress

#### Совместное редактирование презентаций на основе Canvas. Или интерактивная веб доска
  * Язык программирования – JavaScript
  * Основа - http://fabricjs.com
  * Создание, перемещение, трансформация базовых геометрических фигур
  * Возможность вывести текст внутри фигур
  * возможность создать линии, стрелки
  * снаппинг фигур и стрелок/линий ( если линия привязана к краю фигуры, то при перемещении фигуры, край линии также идет вслед за ней)
  * Наблюдать за редактированием документа могут сразу несколько человек, редактировать может тоьлко один, но он может передать право управления другому учаснику


===

#### Запуск приложения
``` bash
$ make
$ node app.js
```

