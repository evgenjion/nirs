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
        global.window = undefined;
    });

    describe('#getCurrentBoardId()', function() {
        it('should return text after last /', function() {
            assert.equal(Utils.getCurrentBoardId(), 'path');
        });
    });

    describe('#EventSupport()', function() {
        let Observer,
            handler,
            handler1;

        beforeEach(function() {
            Observer = new Utils.EventSupport();
            handler = sinon.stub();
            handler1 = sinon.stub();
        });

        afterEach(function() {
            sinon.restore();
        });

        it('should add handler to an event and call on trigger', function(){
            const eventName = 'EVENT_NAME';

            Observer.on(eventName, handler);
            Observer.trigger(eventName);

            assert(handler.calledOnce, 'Handler wasnt called after combination of .on(e, handler) and trigger(e)');
        });

        it('should add handler and remove it with .un()', function(){
            const eventName = 'EVENT_NAME';

            Observer.on(eventName, handler);
            Observer.un(eventName, handler);

            Observer.trigger(eventName);

            assert(handler.notCalled, 'Handler was called after combination of .on(e, handler) and un(e, handler)');
        });

        it('should remove only one handler with .un()', function(){
            const eventName = 'EVENT_NAME';

            Observer.on(eventName, handler);
            Observer.on(eventName, handler1);
            Observer.un(eventName, handler);

            Observer.trigger(eventName);

            assert(handler.notCalled, 'Handler was called after combination of .on(e, handler) and un(e, handler)');
            assert(handler1.calledOnce, 'Handler wasnt called after combination of .on(e, handler) .un(e, AnotherHandler) and trigger(e)');
        });

        it('should remove all handlers with .off()', function(){
            const eventName = 'EVENT_NAME';

            Observer.on(eventName, handler);
            Observer.on(eventName, handler1);

            Observer.off(eventName);

            Observer.trigger(eventName);

            assert(handler.notCalled, 'Handler was called after combination of .on(e, handler) and off(e)');
            assert(handler1.notCalled, 'Handler was called after combination of .on(e, handler) and off(e)');
        });
    })
});
