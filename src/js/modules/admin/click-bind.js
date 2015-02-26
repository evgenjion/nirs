define('admin/click-bind', ['core/core'], function(NIRS) {
    $(function() {

        $('.tools__item').on('click', function(e) {
            // set draw type from class name
            NIRS.trigger('set-draw-type', _.last(e.target.className.split('_')));
            console.log(NIRS.getDrawType());
        });

        var canvas = new fabric.Canvas('canvas');

        var rect = new fabric.Rect({
            left: 20,
            top: 20,
            fill: 'red',
            width: 20,
            height: 20
        });


        canvas.add(rect);

        // запрещаем выделять
        canvas.selection = false;


        //var text = new fabric.Text('hello world', { left: 100, top: 100 });
        //canvas.add(text);

        // изменяем параметры:
        //rect.set({ left: 20, top: 50 });
        //canvas.renderAll();
    });
});
