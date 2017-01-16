module ("Painter");

test("default_attribution",function(){
    expect(4);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();

    ok(painter instanceof SuperMap.LevelRenderer.Painter, "painter instanceof SuperMap.LevelRenderer.Painter");
    equals(painter.CLASS_NAME,"SuperMap.LevelRenderer.Painter","CLASS_NAME");
    equals(painter.root,document.getElementById('lRendertest'),"root");
    equals(typeof painter.storage,"object","storage");

    painter.clear();
    painter.destroy();
});

test("TestPainter_delLayer",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        zLevel:0,
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();
    painter.delLayer(0);

    equals(painter._layers[0],undefined,"删除掉zLevel为0的图层");

    painter.clear();
    painter.destroy();
});

test("TestPainter_delLayer",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        zLevel:0,
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();
    painter.delLayer(1);

    equals(typeof painter._layers[0],"object","删除掉zLevel为1的图层");

    painter.clear();
    painter.destroy();
});

test("TestPainter_destroy",function(){
    expect(8);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();
    painter.destroy();

    equals(painter.root,null,"root");
    equals(painter.storage,null,"storage");
    equals(painter._domRoot,null,"_domRoot");
    equals(painter._layers,null,"_layers");
    equals(painter._zlevelList,null,"_zlevelList");
    equals(painter._layerConfig,null,"_layerConfig");
    equals(painter._bgDom,null,"_bgDom");
    equals(painter.shapeToImage,null,"shapeToImage");
});

test("TestPainter_dispose",function(){
    expect(4);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();
    painter.dispose();

    equals(painter.root,null,"root");
    equals(painter.storage,null,"storage");
    equals(painter._domRoot,null,"_domRoot");
    equals(painter._layers,null,"_layers");
});

test("TestPainter_getHeight",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();
    var height = painter.getHeight();

    equals(height,500,"height");

    painter.clear();
    painter.destroy();
});

test("TestPainter_getWidth",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();
    var width = painter.getWidth();

    equals(width,500,"width");

    painter.clear();
    painter.destroy();
});

test("TestPainter_modLayer",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        zLevel:0,
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();
    painter.modLayer(0,{
        position:[100,100]
    });

    equals(painter._layerConfig[0].position[0],100,"修改指定 zlevel 的绘制参数position");

    painter.clear();
    painter.destroy();
});

test("TestPainter_toDataURL1",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        zLevel:0,
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();
    var dataURL = painter.toDataURL();

    ok(typeof(dataURL)=="string","不含参数时获取图片url");
    painter.clear();
    painter.destroy();
});

test("TestPainter_toDataURL2",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();
    var painter = new SuperMap.LevelRenderer.Painter(document.getElementById('lRendertest'),storage);
    var smicpolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        zLevel:0,
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: '#000'
        }
    });
    storage.addRoot(smicpolygon);
    painter.render();
    var dataURL = painter.toDataURL("image","#000");

    ok(typeof(dataURL)=="string","含参数时获取图片url");

    painter.clear();
    painter.destroy();
});
