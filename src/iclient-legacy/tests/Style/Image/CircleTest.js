module('Style_Image_Circle');

test('test_Circle_constuctor',function(){
    expect(4);
    var circle = new SuperMap.Style.Circle({
        radius: 6,
        fill: new SuperMap.Style.Fill({
            color: "rgba(238, 153, 0, 0.4)"
        }),
        stroke: new SuperMap.Style.Stroke({
            color: "rgba(238,153,0,1)",
            width: 1
        })
    });
    equal(circle.radius, 6,'circle.radius');
    equal(circle.fill.color, "rgba(238, 153, 0, 0.4)", 'circle.fill.color');
    equal(circle.stroke.color, "rgba(238,153,0,1)", 'circle.stroke.color');
    equal(circle.stroke.width, 1,'circle.stroke.width');
    circle.destroy();
});

test('test_Circle_destroy',function(){
    expect(3);
    var circle = new SuperMap.Style.Circle({
        radius: 6,
        fill: new SuperMap.Style.Fill({
            color: "rgba(238, 153, 0, 0.4)"
        }),
        stroke: new SuperMap.Style.Stroke({
            color: "rgba(238,153,0,1)",
            width: 1
        })
    });
    circle.destroy();
    equal(circle.radius, null,'circle.radius');
    equal(circle.fill, null, 'circle.fill');
    equal(circle.stroke, null, 'circle.stroke');
});

test('test_Circle_render',function(){
    expect(3);
    var circle = new SuperMap.Style.Circle({
        radius: 6,
        fill: new SuperMap.Style.Fill({
            color: "rgba(238, 153, 0, 0.4)"
        }),
        stroke: new SuperMap.Style.Stroke({
            color: "rgba(238,153,0,1)",
            width: 1
        })
    });
    circle.render();
    equal(circle.size[0],2*(circle.radius+circle.stroke.width)+1,'circle.size[0]');
    ok(circle.canvas !== null,"canvas is null");
    equal(circle.anchor[0],circle.radius+circle.stroke.width+1/2,'circle.anchor[0]');
    circle.destroy();
});