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

#### Mutual presentations edit. Interactive web-canvas.
  * Drawing geometric figures, lines and arows, transformation, transfer of them.
  * Writing text
  * Ability to real time watching of changing document
  * Ability to give permissions of drawing.

===

#### Run app
``` bash
$ make

# Be shure that mongod started.
$ node app.js

# Start on specific PORT(8080 by default)
$ PORT=80 node app.js
```

#### Testing
```
# make unit-tests
$ make test
```

##### Screenshot testing
You should run phantomjs as a webdriver: `$ phantomjs --webdriver=4444`

*Run:*
`$ npm run gemini`

or call certain test directly:
`$ node_modules/.bin/gemini-gui gemini/tests/test.gemini.js`
