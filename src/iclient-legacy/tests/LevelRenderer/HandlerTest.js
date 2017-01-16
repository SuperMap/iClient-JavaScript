module ("Handler");

test("default_attribution",function(){
    expect(4);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var handler = new SuperMap.LevelRenderer.Handler(document.getElementById('lRendertest'),storage,painter);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        zLevel:0,
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();

    ok(handler instanceof SuperMap.LevelRenderer.Handler, "painter instanceof SuperMap.LevelRenderer.Handler");
    equals(handler.CLASS_NAME,"SuperMap.LevelRenderer.Handler","CLASS_NAME");
    equals(handler.root,document.getElementById('lRendertest'),"root");
    equals(typeof handler.storage,"object","storage");

    painter.destroy();
});

test("testHandler_destroy",function(){
    expect(8);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var handler = new SuperMap.LevelRenderer.Handler(document.getElementById('lRendertest'),storage,painter);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        zLevel:0,
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();
    handler.destroy();

    equals(handler.root,null,"root");
    equals(handler._domHover,null,"_domHover");
    equals(handler.storage,null,"storage");
    equals(handler.painter,null,"painter");
    equals(handler._lastX,null,"_lastX");
    equals(handler._lastY,null,"_lastY");
    equals(handler._mouseX,null,"_mouseX");
    equals(handler._findHover,null,"_findHover");

    painter.destroy();
});

test("testHandler_dispose",function(){
    expect(4);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var handler = new SuperMap.LevelRenderer.Handler(document.getElementById('lRendertest'),storage,painter);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        zLevel:0,
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();
    handler.dispose();

    equals(handler.root,null,"root");
    equals(handler._domHover,null,"_domHover");
    equals(handler.storage,null,"storage");
    equals(handler.painter,null,"painter");

    painter.destroy();
});

