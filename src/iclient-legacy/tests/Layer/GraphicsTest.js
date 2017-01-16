module('Graphics');
test('test_Layer_Graphics_constractor',function(){
    expect(3);
    var graphicsLayer = new SuperMap.Layer.Graphics("graphicsLayer");
    ok(!graphicsLayer.renderer.hitDetection,'graphicsLayer.renderer.hitDetection is false');
    equal(graphicsLayer.graphics.length,0,'graphicsLayer.graphics.length is 0');
    equal(graphicsLayer.name,'graphicsLayer','graphicsLayer.graphics.name');
    graphicsLayer.destroy();
});

test('test_Layer_Graphics_destroy',function(){
    expect(5);
    var graphicsLayer = new SuperMap.Layer.Graphics("graphicsLayer");
    graphicsLayer.destroy();
    equal(graphicsLayer.graphics,null,'graphicsLayer.graphics');
    equal(graphicsLayer.selectedGraphics,null,'graphicsLayer.selectedGraphics');
    equal(graphicsLayer.unrenderedGraphics,null,'graphicsLayer.unrenderedGraphics');
    equal(graphicsLayer.renderer,null,'graphicsLayer.renderer');
    equal(graphicsLayer.drawn,null,'graphicsLayer.drawn');
});

test('test_Layer_Graphics_removeMap', function(){
    expect(1);
    var graphicsLayer = new SuperMap.Layer.Graphics("graphicsLayer");
    graphicsLayer.removeMap();
    ok(!graphicsLayer.drawn,'is false');
    graphicsLayer.destroy();
});

test("test_Layer_Graphics_addGraphics", function () {
    expect(6);
    var clover  = new SuperMap.Style.Clover({
        radius: 15,
        angle: 60,
        count: 3,
        fill: new SuperMap.Style.Fill({
            color: "#00ff00"
        }),
        stroke: new SuperMap.Style.Stroke({
            color: "#669966",
            width: 1
        })
    });
    var layer = new SuperMap.Layer.Graphics(name, {isBaseLayer: true});
    var point = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointGraphic = new SuperMap.Graphic(point);
    pointGraphic.style = {image: clover};
    var point2 = new SuperMap.Geometry.Point(-100.04, 45.68);
    var pointGraphic2 = new SuperMap.Graphic(point2);
    pointGraphic2.style = {image: clover};
    var map = new SuperMap.Map({
        div: "map",
        layers: [layer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });
    //测试触发成功事件。
    layer.events.register('graphicsadded', null, function(obj) {
        equals(obj.succeed, true, "测试添加成功时候的标识");
        layer.events.remove("graphicsadded");
    });

    layer.addGraphics([pointGraphic]);
    equals(layer.graphics[0].id, pointGraphic.id, "测试单一graphic添加是否成功。");

    layer.removeAllGraphics();
    layer.addGraphics([pointGraphic, pointGraphic2]);
    equals(layer.graphics[0].id, pointGraphic.id, "测试数组graphic添加是否成功。");
    equals(layer.graphics[1].id, pointGraphic2.id, "测试数组graphic添加是否成功。");

    layer.removeAllGraphics();
    //测试添加graphic失败触发失败事件。
    var pointGraphic3 = new SuperMap.Graphic();
    layer.events.register('graphicsadded', null, function(obj) {
        equals(obj.succeed, false, "测试添加不成功时候的标识");
        equals(obj.graphics[0].id, pointGraphic3.id, "测试添加不成功的graphic数组");
        layer.events.destroy();
    });
    layer.addGraphics([pointGraphic3]);

    point.destroy();
    point2.destroy();
    pointGraphic.destroy();
    pointGraphic2.destroy();
    pointGraphic3.destroy();
});


test("test_Layer_Vector_getGraphicsByAttribute", function () {
    expect(4);
    var layer = new SuperMap.Layer.Graphics(name, {isBaseLayer: true});

    // graphic_1
    var geometry_1 = new SuperMap.Geometry.Point(-28.63, 153.64);
    var attributes_1 = {
        humpty: 'dumpty',
        clazz: 1
    };
    var graphic_1 = new SuperMap.Graphic(geometry_1, attributes_1);
    graphic_1.fid = 'g_01'; // to identify later

    // graphic_2
    var geometry_2 = new SuperMap.Geometry.Point(-27.48, 153.05);
    var attributes_2 = {
        // this graphic has attribute humpty === undefined
        clazz: '1'
    };
    var graphic_2 = new SuperMap.Graphic(geometry_2, attributes_2);
    graphic_2.fid = 'g_02'; // to identify later

    // graphic_3
    var geometry_3 = new SuperMap.Geometry.Point(-33.74, 150.3);
    var attributes_3 = {
        humpty: 'foobar',
        clazz: 1
    };
    var graphic_3 = new SuperMap.Graphic(geometry_3, attributes_3);
    graphic_3.fid = 'g_03'; // to identify later

    equals(layer.getGraphicsByAttribute("clazz", "1").length, 0, "测试在没有添加graphic时候使用这个方法");

    layer.addGraphics([graphic_1, graphic_2, graphic_3]);
    equals(layer.getGraphicsByAttribute("humpty", "dumpty")[0].id, graphic_1.id, "测试在添加三个graphic后，查找属性名为humpty属性值为dumpty的graphic");

    equals(layer.getGraphicsByAttribute("clazz", 1).length, 2, "测试查找属性名为：clazz，属性值为数字1的graphic数目");

    equals(layer.getGraphicsByAttribute("clazz", '1').length, 1, "测试查找属性名为：clazz，属性值为字符1的graphic数目");

});

test("test_Layer_Vector_removeGraphics", function () {
    expect(7);

    var layer = new SuperMap.Layer.Graphics(name);
    var log;

    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointGraphic1 = new SuperMap.Graphic(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointGraphic2 = new SuperMap.Graphic(point2);

    // 1 test
    layer.addGraphics([pointGraphic1, pointGraphic2]);
    layer.removeGraphics([pointGraphic1]);
    equals(layer.graphics[pointGraphic1.id], undefined, "从feature对象中删除一个feature。");

    // 1 test
   layer.removeGraphics(layer.graphics);
    equals(layer.graphics.length, 0,
        "测试传入数据为layer.features时候删除全部feature");

    // 4 tests
    log = [];
    layer.addGraphics([pointGraphic1, pointGraphic2]);
    layer.events.register("graphicsremoved", null, function(obj) {
        log.push(obj);
    });
    layer.removeGraphics(layer.graphics);
    equals(log.length, 1,
        "测试featuresremoved事件只被触发了一次");
    equals(log[0].graphics.length, 0,
        "测试在调用后删除失败的feature个数");
    equals(log[0].succeed, true,
        "测试在调用后返回的删除标识是否成功");
    layer.events.remove("graphicsremoved");

    // 3 test
    layer.events.register("graphicsremoved", null, function(obj) {
        equals(obj.graphics[0].id, pointGraphic1.id,
            "测试在调用后删除失败的feature");
        equals(obj.succeed, false,
            "测试在调用后返回的删除标识是否成功");
        layer.events.remove("graphicsremoved");
    });
    layer.removeGraphics(pointGraphic1);
});

test("test_Layer_Vector_getGraphicsBy", function () {
    expect(2);
    var layer = new SuperMap.Layer.Graphics(name, {isBaseLayer: true});

    // feature_1
    var geometry_1 = new SuperMap.Geometry.Point(-28.63, 153.64);
    var attributes_1 = {
        humpty: 'dumpty',
        clazz: 1
    };
    var graphic_1 = new SuperMap.Graphic(geometry_1, attributes_1);
    graphic_1.fid = 'f_01'; // to identify later

    // feature_3
    var geometry_3 = new SuperMap.Geometry.Point(-33.74, 150.3);
    var attributes_3 = {
        humpty: 'foobar',
        clazz: 1
    };

    var graphic_3 = new SuperMap.Graphic(geometry_3, attributes_3);
    graphic_3.fid = 'f_03'; // to identify later

    equals(layer.getGraphicBy("fid", "f_01"), null, "测试在没有添加feature时候使用这个方法");

    layer.addGraphics([graphic_1, graphic_3]);
    equals(layer.getGraphicBy("fid", "f_01").id, graphic_1.id, "测试在添加三个feature后，查找属性名为fid属性值为f_01的feature");
});
