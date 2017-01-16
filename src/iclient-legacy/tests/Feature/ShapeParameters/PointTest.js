module("ShapeParameterPoint");
test("testShapeParameterPoint_constructorDefault",function(){
    expect(4);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Point(100, 100)
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    equal(shapeParameters.x, 100, "x");
    equal(shapeParameters.y, 100, "y");
    equal(shapeParameters.r, 6, "r");
    shapeParameters.destroy();
});
test("testShapeParameterPoint_destroy",function(){
    expect(8);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Point(100, 100)
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    equal(shapeParameters.x, 100, "x");
    equal(shapeParameters.y, 100, "y");
    equal(shapeParameters.r, 6, "r");
    shapeParameters.destroy();
    same(shapeParameters.refOriginalPosition, null, "refOriginalPosition: null");
    equal(shapeParameters.x, null, "x: null");
    equal(shapeParameters.y, null, "y: null");
    equal(shapeParameters.r, null, "r: null");
});