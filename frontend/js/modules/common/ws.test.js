describe('Common websocket module', function(){
    let WS;
    before(function(done){
        // Импорт amd модуля
        requirejs(['common/ws'], function (ws) {
            WS = ws.WebsocketTransport;
            done();
        });
    });

    it('should have static property "types" with types of event', function(){
        assert.property(WS, 'types');

        assert.property(WS.types, 'CONNECT');
        assert.property(WS.types, 'DRAW_START');
        assert.property(WS.types, 'DRAW_PROGRESS');
        assert.property(WS.types, 'DRAW_END');
        assert.property(WS.types, 'EVENT');
    });

    describe('instance', function(){
        before(function(){
            global.WebSocket = sinon.spy();
        });

        after(function(){
            global.WebSocket = undefined;
        });

        it('should have property socket which is instance of window.WebSocket', function(){
            const ws = new WS();

            assert.instanceOf(ws.socket, WebSocket);
        });
    });
});