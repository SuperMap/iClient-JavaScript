module("PointWithMeasure");

test("TestDefaultConstructor",function(){
    expect(3);
    var pointWithMeasure;
    pointWithMeasure = new SuperMap.REST.PointWithMeasure();
    ok(pointWithMeasure.measure == null, "measure");
    ok(pointWithMeasure.x == null, "x");
    ok(pointWithMeasure.y == null, "y");
});

test("TestConstructor",function(){
    expect(3);

    var pointWithMeasure = new SuperMap.REST.PointWithMeasure({
        measure: 5,
        x: 10,
        y: 20
    });
    ok(pointWithMeasure.measure == 5, "measure");
    ok(pointWithMeasure.x == 10, "x");
    ok(pointWithMeasure.y == 20, "y");      
});

test("TestDestructor",function(){
    expect(3);
    var pointWithMeasure = new SuperMap.REST.PointWithMeasure({
        measure: 5,
        x: 10,
        y: 20
    });
        
    pointWithMeasure.destroy();
    ok(pointWithMeasure.measure == null, "measure");
    ok(pointWithMeasure.x == null, "x");
    ok(pointWithMeasure.y == null, "y");
});

test("Test_fromJson",function(){
    var pointWithMeasure = SuperMap.REST.PointWithMeasure.fromJson();
    ok(pointWithMeasure == null, "pointWithMeasure");
});