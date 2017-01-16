module("ShapeParameterLabel");
test("testShapeParameterLabel_constructorDefault",function(){
    expect(4);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Label(100, 100, "text")
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    equal(shapeParameters.x, 100, "x");
    equal(shapeParameters.y, 100, "y");
    equal(shapeParameters.text, "text", "text");
    shapeParameters.destroy();
});
test("testShapeParameterLabel_destroy",function(){
    expect(8);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Label(100, 100, "text")
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    equal(shapeParameters.x, 100, "x");
    equal(shapeParameters.y, 100, "y");
    equal(shapeParameters.text, "text", "text");
    shapeParameters.destroy();
    same(shapeParameters.refOriginalPosition, null, "refOriginalPosition: null");
    equal(shapeParameters.x, null, "x: null");
    equal(shapeParameters.y, null, "y: null");
    equal(shapeParameters.text, null, "text: null");
});