gemini.suite('boards-paint', function(suite) {
    // GEMINI_MASTER_TEST_ENV закостыленно в backend/dao/users.js
    suite.setUrl('/boards/paint/GEMINI_MASTER_TEST_ENV')
        .setCaptureElements('.content')
        .capture('plain');
});
