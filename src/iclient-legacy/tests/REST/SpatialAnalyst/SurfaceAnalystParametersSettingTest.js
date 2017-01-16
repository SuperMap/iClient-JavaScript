module("surfaceAnalystParametersSetting");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {

    var surfaceAnalystParametersSetting,
        myClipRegion = new SuperMap.Geometry();
    surfaceAnalystParametersSetting = new SuperMap.REST.SurfaceAnalystParametersSetting({
        clipRegion: myClipRegion
    });

    ok(surfaceAnalystParametersSetting != null, "not null");
    equal(surfaceAnalystParametersSetting.clipRegion, null, "surfaceAnalystParametersSetting.clipRegion");
    equal(surfaceAnalystParametersSetting.datumValue, 0, "surfaceAnalystParametersSetting.datumValue");
    equal(surfaceAnalystParametersSetting.expectedZValues, null, "surfaceAnalystParametersSetting.expectedZValues");
    equal(surfaceAnalystParametersSetting.interval, 0, "surfaceAnalystParametersSetting.interval");
    equal(surfaceAnalystParametersSetting.resampleTolerance, 0, "surfaceAnalystParametersSetting.resampleTolerance");
    equal(surfaceAnalystParametersSetting.smoothMethod, SuperMap.REST.SmoothMethod.BSPLINE, "surfaceAnalystParametersSetting.smoothMethod");
    equal(surfaceAnalystParametersSetting.smoothness, 0, "surfaceAnalystParametersSetting.smoothness");
    
    surfaceAnalystParametersSetting.destroy();
    equal(surfaceAnalystParametersSetting.clipRegion, null, "surfaceAnalystParametersSetting.clipRegion");
});

//测试clipRegion是否被正确转换
test("TestProperty_clipRegion", function () {

    var surfaceAnalystParametersSetting,
        myClipRegion = new SuperMap.Geometry(),
        linearRing = new SuperMap.Geometry.LinearRing([
                new SuperMap.Geometry.Point(-632542,4610338),
                new SuperMap.Geometry.Point(1063524,4610338),
                new SuperMap.Geometry.Point(1063524,3150322),
                new SuperMap.Geometry.Point(-632542,3150322)
            ]),        
        geo = new SuperMap.Geometry.Polygon([linearRing]);
        //clipRegionResult = {id:0, style:null, parts:[5], points:[{x:-632542, y:4610338}, {x:1063524, y:4610338}, {x:1063524, y:3150322}, {x:-632542, y:3150322}, {x:-632542, y:4610338}], type:"REGION"};
    surfaceAnalystParametersSetting = new SuperMap.REST.SurfaceAnalystParametersSetting({
        clipRegion: geo
    });

    ok(surfaceAnalystParametersSetting != null, "not null");
    equal(surfaceAnalystParametersSetting.clipRegion.parts.length, 1, "surfaceAnalystParametersSetting.clipRegion.parts.length");
    equal(surfaceAnalystParametersSetting.clipRegion.points.length, 5, "surfaceAnalystParametersSetting.clipRegion.points.length");
    equal(surfaceAnalystParametersSetting.clipRegion.type, "REGION", "surfaceAnalystParametersSetting.clipRegion.type");
    equal(surfaceAnalystParametersSetting.datumValue, 0, "surfaceAnalystParametersSetting.datumValue");
    equal(surfaceAnalystParametersSetting.expectedZValues, null, "surfaceAnalystParametersSetting.expectedZValues");
    equal(surfaceAnalystParametersSetting.interval, 0, "surfaceAnalystParametersSetting.interval");
    equal(surfaceAnalystParametersSetting.resampleTolerance, 0, "surfaceAnalystParametersSetting.resampleTolerance");
    equal(surfaceAnalystParametersSetting.smoothMethod, SuperMap.REST.SmoothMethod.BSPLINE, "surfaceAnalystParametersSetting.smoothMethod");
    equal(surfaceAnalystParametersSetting.smoothness, 0, "surfaceAnalystParametersSetting.smoothness");
    
    surfaceAnalystParametersSetting.destroy();
    equal(surfaceAnalystParametersSetting.clipRegion, null, "surfaceAnalystParametersSetting.clipRegion");
});