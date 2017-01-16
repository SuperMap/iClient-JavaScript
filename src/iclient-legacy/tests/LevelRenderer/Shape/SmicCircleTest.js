module("LevelRender_Shape_SmicCircle");

test("TestSmicCircle_constructor",function(){
    expect(2);
    var circle = new SuperMap.LevelRenderer.Shape.SmicCircle();

    equals(circle.CLASS_NAME,"SuperMap.LevelRenderer.Shape.SmicCircle","CLASS_NAME");
    same(circle.refOriginalPosition,[0,0],"refOriginalPosition is [0,0]");

    circle.destroy();
});

test("TestSmicCircle_destroy",function(){
    expect(4);
    var circle = new SuperMap.LevelRenderer.Shape.SmicCircle();

    equals(circle.CLASS_NAME,"SuperMap.LevelRenderer.Shape.SmicCircle","CLASS_NAME");
    same(circle.refOriginalPosition,[0,0],"refOriginalPosition is [0,0]");

    circle.destroy();

    equals(circle.type,null,"test destroy");
    equals(circle.refOriginalPosition,null,"test destroy")
});

test("TestSmicCircle_buildPath",function(){
    expect(1);
    var circle = new SuperMap.LevelRenderer.Shape.SmicCircle();
    var ctx = document.createElement("canvas").getContext("2d");
    var style = {x:1, y:1,r:1};
    var value = circle.buildPath(ctx,style);
    ok(value,"function:buildPath");
    circle.destroy();
});

test("TestSmicCircle_getRect",function(){
    expect(4);
    var circle = new SuperMap.LevelRenderer.Shape.SmicCircle();
    var style = {x:10,y:10,r:9,lineWidth:1};
    var result = circle.getRect(style);
    equals(result.x,1,"result.x");
    equals(result.y,1,"result.y");
    equals(result.height,18,"result.height");
    equals(result.width,18,"result.width");
    circle.destroy();
});