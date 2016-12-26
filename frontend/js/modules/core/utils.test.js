'use strict';

let _ = require('lodash'),
    sinon = require('sinon'),
    {assert} = require('chai');



describe('Utils module', function() {
    let Utils;
    
    const LOCATION = 'fake/address/location/path';

    before(function(done){
        // Импорт amd модуля
        requirejs(['core/utils'], function (coreUtils) {
            Utils = coreUtils;
            done();
        });

        _.set(global, 'window.location.href', LOCATION);
    });

    after(function(){
        
    });

    describe('#getCurrentBoardId()', function() {
        it('should return text after last /', function() {
            assert.equal(Utils.getCurrentBoardId(), 'path');
        });
    });

    describe('#EventSupport()', function() {
        let Observer;

        before(function() {
            Observer = new Utils.EventSupport();
        });

        // TODO:
    })
});