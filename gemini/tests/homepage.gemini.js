gemini.suite('homepage', function(suite) {
    suite.setUrl('/')
        .setCaptureElements('.main-popup')
        .capture('plain');
});
