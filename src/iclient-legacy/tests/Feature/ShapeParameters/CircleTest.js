module("ShapeParameterSector");
test("testShapeParameterCircle_constructorDefault",function(){
    expect(4);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Circle(1,1,1);
    same(shapeParameters.refOriginalPosition,[0,0],"refOriginalPosition");
    equal(shapeParameters.x,1,'x');
    equal(shapeParameters.y,1,'y');
    equal(shapeParameters.r,1,'r');
    shapeParameters.destroy();
});
test("testShapeParametersCircle_destroy",function(){
    expect(8);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Circle(1,1,1);
    same(shapeParameters.refOriginalPosition,[0,0],"refOriginalPosition");
    equal(shapeParameters.x,1,'x');
    equal(shapeParameters.y,1,'y');
    equal(shapeParameters.r,1,'r');
    shapeParameters.destroy();
    same(shapeParameters.refOriginalPosition,null,"refOriginalPosition: null");
    equal(shapeParameters.x,null,'x');
    equal(shapeParameters.y,null,'y');
    equal(shapeParameters.r,null,'r');
});