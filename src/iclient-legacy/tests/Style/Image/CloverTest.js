module('Style_Image_Clover');

test('test_Clover_Constructor',function(){
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
    equal(clover.radius,15,'clover.radius');
    equal(clover.angle,60,'clover.angle');
    equal(clover.count,3,'clover.count');
    equal(clover.fill.color,'#00ff00','clover.fill.color');
    equal(clover.stroke.color,'#669966','clover.stroke.color');
    equal(clover.stroke.width,1,'clover.stroke.width');
    clover.destroy();
});

test('test_Clover_destroy',function(){
    expect(5);
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
    clover.destroy();
    equal(clover.radius,null,'clover.radius');
    equal(clover.angle,null,'clover.angle');
    equal(clover.count,null,'clover.count');
    equal(clover.fill,null,'clover.fill');
    equal(clover.stroke,null,'clover.stroke');
});

test('test_clover_render',function(){
    expect(3);
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
    clover.render();
    equal(clover.size[0],2*(clover.radius+clover.stroke.width)+1,'circle.size[0]');
    ok(clover.canvas !== null,"canvas is null");
    equal(clover.anchor[0],clover.radius+clover.stroke.width+1/2,'circle.anchor[0]');
});