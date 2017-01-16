module("ShapeParameterImage");
test("testShapeParameterImage_constructorDefault",function(){
    expect(4);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Image(100, 100, "imgUrl")
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    equal(shapeParameters.x, 100, "x");
    equal(shapeParameters.y, 100, "y");
    equal(shapeParameters.image, "imgUrl", "imgUrl");
    shapeParameters.destroy();
});
test("testShapeParameterImage_destroy",function(){
    expect(8);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Image(100, 100, "imgUrl")
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    equal(shapeParameters.x, 100, "x");
    equal(shapeParameters.y, 100, "y");
    equal(shapeParameters.image, "imgUrl", "imgUrl");
    shapeParameters.destroy();
    same(shapeParameters.refOriginalPosition, null, "refOriginalPosition: null");
    equal(shapeParameters.x, null, "x: null");
    equal(shapeParameters.y, null, "y: null");
    equal(shapeParameters.image, null, "image: null");
});