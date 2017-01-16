module("ShapeParameter");
test("testShapeParameter_constructorDefault",function(){
    expect(1);
    var shapeParameters = new SuperMap.Feature.ShapeParameters()
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    shapeParameters.destroy();
});
test("testShapeParameter_destroy",function(){
    expect(2);
    var shapeParameters = new SuperMap.Feature.ShapeParameters()
    same(shapeParameters.refOriginalPosition,  [0, 0], "refOriginalPosition");
    shapeParameters.destroy();
    same(shapeParameters.refOriginalPosition, null);
});