module("Route");

test("TestDefaultConstructor", function() {
    expect(3);
    var route = new SuperMap.REST.Route();
    ok(route.length == null, "length");
    ok(route.maxM == null, "maxM");
    ok(route.minM == null, "minM");    
});

test("TestConstructor", function() {
    var points =[],
        length = 5204.708735589092,
        maxM = 5203.360137410352,
        minM = 0;
    expect(3);
    var route = new SuperMap.REST.Route(points,{
        length: length,
        maxM: maxM,
        minM: minM
    });

    equal(route.length, length, "length");
    equal(route.maxM, maxM, "maxM");    
    equal(route.minM, minM, "minM");
});

test("TestDestructor", function() {
    var points =[],
        length = 5204.708735589092,
        maxM = 5203.360137410352,
        minM = 0;
    expect(3);
    var route = new SuperMap.REST.Route(points,{
        length: length,
        maxM: maxM,
        minM: minM
    });

    route.destroy();
    ok(route.length == null, "length");
    ok(route.maxM == null, "maxM");
    ok(route.minM == null, "minM");
});