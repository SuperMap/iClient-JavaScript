module('Style_Image_RegularShape');

test('test_RegularShape_constractor',function(){
    expect(8);
    //有内接圆半径
    var regularShape = new SuperMap.Style.RegularShape({
        pointsLength: 5,
        radius: 15,
        radius1: 8,
        angle: 60,
        fill: new SuperMap.Style.Fill({
            color: "rgba(176, 61, 35, 0.4)"
        }),
        stroke: new SuperMap.Style.Stroke({
            color: "rgba(145, 43, 20, 1)",
            width: 1
        })
    });
    equal(regularShape.pointsLength,10,'regularShape.pointLength');
    equal(regularShape.radius,15,'regularShape.radius');
    equal(regularShape.radius1,8,'regularShape.radius1');
    equal(regularShape.angle,1.0471975511965976 ,'regularShape.angle');
    equal(regularShape.fill.color,'rgba(176, 61, 35, 0.4)','regularShape.fill.color');
    equal(regularShape.stroke.color,'rgba(145, 43, 20, 1)','regularShape.stroke.color');
    equal(regularShape.stroke.width,'1','regularShape.stroke.width');
    regularShape.destroy();

    //无内接圆半径
    regularShape = new SuperMap.Style.RegularShape({
        pointsLength: 5,
        radius: 15,
        angle: 60,
        fill: new SuperMap.Style.Fill({
            color: "rgba(176, 61, 35, 0.4)"
        }),
        stroke: new SuperMap.Style.Stroke({
            color: "rgba(145, 43, 20, 1)",
            width: 1
        })
    });
    equal(regularShape.pointsLength,5,'regularShape.pointLength');
});

test('test_RegularShape_destroy',function(){
    expect(6);
    var regularShape = new SuperMap.Style.RegularShape({
        pointsLength: 5,
        radius: 15,
        radius1: 8,
        angle: 60,
        fill: new SuperMap.Style.Fill({
            color: "rgba(176, 61, 35, 0.4)"
        }),
        stroke: new SuperMap.Style.Stroke({
            color: "rgba(145, 43, 20, 1)",
            width: 1
        })
    });
    regularShape.destroy();
    equal(regularShape.pointsLength,null,'regularShape.pointLength');
    equal(regularShape.radius,null,'regularShape.radius');
    equal(regularShape.radius1,null,'regularShape.radius1');
    equal(regularShape.angle,null,'regularShape.angle');
    equal(regularShape.fill,null,'regularShape.fill');
    equal(regularShape.stroke,null,'regularShape.stroke');
});

test('test_RegularShape_render',function(){
    expect(3);
    var regularShape = new SuperMap.Style.RegularShape({
        pointsLength: 5,
        radius: 15,
        radius1: 8,
        angle: 60,
        fill: new SuperMap.Style.Fill({
            color: "rgba(176, 61, 35, 0.4)"
        }),
        stroke: new SuperMap.Style.Stroke({
            color: "rgba(145, 43, 20, 1)",
            width: 1
        })
    });
    regularShape.render();
    ok(regularShape.canvas !== null,'regularShape.canvas');
    equal(regularShape.size[0],2*(regularShape.radius+regularShape.stroke.width)+1,'regularShape.size[0]');
    equal(regularShape.anchor[0],regularShape.size[0]/2,'regularShape.anchor[0]');
});

