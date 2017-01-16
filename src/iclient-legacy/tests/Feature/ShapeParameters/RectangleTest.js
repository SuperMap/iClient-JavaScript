module("ShapeParameterRectangle");
test("testShapeParameterRectangle_constructorDefault",function(){
    expect(5);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Rectangle(100, 100, 200, 300);
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    equal(shapeParameters.x, 100, "x");
    equal(shapeParameters.y, 100, "y");
    equal(shapeParameters.width, 200, "width");
    equal(shapeParameters.height, 300, "height");
    shapeParameters.destroy();
});
test("testShapeParameterRectangle_destroy",function(){
    expect(10);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Rectangle(100, 100, 200, 300)
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    equal(shapeParameters.x, 100, "x");
    equal(shapeParameters.y, 100, "y");
    equal(shapeParameters.width, 200, "width");
    equal(shapeParameters.height, 300, "height");
    shapeParameters.destroy();
    same(shapeParameters.refOriginalPosition, null, "refOriginalPosition: null");
    equal(shapeParameters.x, null, "x");
    equal(shapeParameters.y, null, "y");
    equal(shapeParameters.width, null, "width");
    equal(shapeParameters.height, null, "height");
});