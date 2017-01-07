describe('Core module', function() {
    let Module, Utils;
    before(function(done) {
        // Импорт amd модуля
        requirejs(['core/core', 'core/utils'], function(core, utils) {
            Module = core;
            Utils = utils;
            done();
        });
    });

    it('should return instance of Utils.EventSupport', function() {
        assert.instanceOf(Module, Utils.EventSupport);
    });
});
