module("ShapeParameterSector");
test("testShapeParameterSector_constructorDefault",function(){
    expect(7);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Sector(100, 100, 50, 0, 135, 20)
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    equal(shapeParameters.x, 100, "x");
    equal(shapeParameters.y, 100, "y");
    equal(shapeParameters.r, 50, "r");
    equal(shapeParameters.startAngle, 0, "startAngle");
    equal(shapeParameters.endAngle, 135, "endAngle");
    equal(shapeParameters.r0, 20, "r0");
    shapeParameters.destroy();
});
test("testShapeParameterSector_destroy",function(){
    expect(14);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Sector(100, 100, 50, 0, 135, 20)
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    equal(shapeParameters.x, 100, "x");
    equal(shapeParameters.y, 100, "y");
    equal(shapeParameters.r, 50, "r");
    equal(shapeParameters.startAngle, 0, "startAngle");
    equal(shapeParameters.endAngle, 135, "endAngle");
    equal(shapeParameters.r0, 20, "r0");
    shapeParameters.destroy();
    same(shapeParameters.refOriginalPosition, null, "refOriginalPosition: null");
    equal(shapeParameters.x, null, "x");
    equal(shapeParameters.y, null, "y");
    equal(shapeParameters.r, null, "r");
    equal(shapeParameters.startAngle, null, "startAngle");
    equal(shapeParameters.endAngle, null, "endAngle");
    equal(shapeParameters.r0, null, "r0");
});