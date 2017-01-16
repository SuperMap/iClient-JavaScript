module('Graphic');
test('testGraphic_constructorDefault',function(){
    expect(2);
    var graphic = new SuperMap.Graphic();
    equals(graphic.geometry,null,"Property.geometry");
    equals(graphic.style,null,"Property.style");
    graphic.destroy();
});

 test('testGraphic_constructor',function(){
     expect(3);
     var point = new SuperMap.Geometry.Point(0,1);
     var attributes = {index: 1};
     var style = {color: "#ff0000"};
     var graphic = new SuperMap.Graphic(point,attributes,style);
     equal(graphic.geometry.x,0,"Property.geometry.x");
     equal(graphic.attributes.index,1,"Property.attributes.index");
     equal(graphic.style.color,"#ff0000","Property.style.color");
     point.destroy();
     attributes = null;
     style = null;
     graphic.destroy();
 });

test('testGraphic_destroy',function(){
    expect(3);
    var point = new SuperMap.Geometry.Point(0,1);
    var attributes = {index: 1};
    var style = {color: "#ff0000"};
    var graphic = new SuperMap.Graphic(point,attributes,style);
    graphic.destroy();
    equal(graphic.geometry,null,"Property.geometry");
    equal(graphic.attributes,null,"Property.attributes");
    equal(graphic.style,null,"Property.style");
    point.destroy();
    attributes = null;
    style = null;
});

test('testGraphic_clone',function(){
    expect(3);
    var point = new SuperMap.Geometry.Point(0,1);
    var attributes = {index: 1};
    var style = {color: "#ff0000"};
    var graphic = new SuperMap.Graphic(point,attributes,style);
    var new_graphic = graphic.clone();
    equal(new_graphic.geometry.x,0,"Property.geometry.x");
    equal(new_graphic.attributes.index,1,"Property.attributes.index");
    equal(new_graphic.style.color,"#ff0000","Property.style.color");
    point.destroy();
    attributes = null;
    style = null;
    graphic.destroy();
    new_graphic.destroy();
});

