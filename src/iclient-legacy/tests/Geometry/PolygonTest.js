module("Polygon");
test("testPolygon_constructorDefault", function () {
    expect(2);
    var polygon = new SuperMap.Geometry.Polygon();
    equal(polygon.components.length, 0, "function:constructorDefault");
    same(polygon.componentTypes, ["SuperMap.Geometry.LinearRing"], "function:constructorDefault");
    polygon.destroy();
});
test("testPolygon_constructor", function () {
    expect(3);
    var point1 = new SuperMap.Geometry.Point(0, 4010338);
    var point2 = new SuperMap.Geometry.Point(1063524, 4010338);
    var point3 = new SuperMap.Geometry.Point(1063524, 3150322);
    var point4 = new SuperMap.Geometry.Point(0, 3150322);
    var points = [point1, point2, point3, point4];
    var linearRing = new SuperMap.Geometry.LinearRing(points);
    var polygon = new SuperMap.Geometry.Polygon([linearRing]);
    equal(polygon.components.length, 1, "function:constructor");
    equal(polygon.components[0].id, linearRing.id, "function:constructor");
    same(polygon.componentTypes, ["SuperMap.Geometry.LinearRing"], "function:constructor");
    polygon.destroy();
});
test("testPolygon_getArea", function () {
    expect(1);
    var point1 = new SuperMap.Geometry.Point(0, 4010338);
    var point2 = new SuperMap.Geometry.Point(1063524, 4010338);
    var point3 = new SuperMap.Geometry.Point(1063524, 3150322);
    var point4 = new SuperMap.Geometry.Point(0, 3150322);
    var points = [point1, point2, point3, point4];
    var linearRing = new SuperMap.Geometry.LinearRing(points);
    var polygon = new SuperMap.Geometry.Polygon([linearRing]);
    var area = polygon.getArea();
    var expectArea = 1063524 * (4010338 - 3150322);
    equal(area, expectArea, "function:getArea");
    polygon.destroy();
});
test("testPolygon_intersects", function () {
    //geometry为LinearString类型，目标几何对象与原几何对象不相交
    expect(1);
    var points = [new SuperMap.Geometry.Point(0, 5), new SuperMap.Geometry.Point(5, 5)];
    var linearString = new SuperMap.Geometry.LineString(points);
    var polygon = new SuperMap.Geometry.Polygon([linearString]);
    var points1 = [new SuperMap.Geometry.Point(2, 0), new SuperMap.Geometry.Point(2, 2)];
    var geometry = new SuperMap.Geometry.LineString(points1);
    var intersect = polygon.intersects(geometry);
    ok(!intersect, "function:intersects");
    polygon.destroy();
});
test("testPolygon_intersects1", function () {
    //geometry为Polygon类型，目标几何对象与原几何对象不相交
    expect(1);
    var point1 = new SuperMap.Geometry.Point(0, 4010338);
    var point2 = new SuperMap.Geometry.Point(1063524, 4010338);
    var point3 = new SuperMap.Geometry.Point(1063524, 3150322);
    var point4 = new SuperMap.Geometry.Point(0, 3150322);
    var points = [point1, point2, point3, point4];
    var linearRing = new SuperMap.Geometry.LinearRing(points);
    var polygon = new SuperMap.Geometry.Polygon([linearRing]);
    var point5 = new SuperMap.Geometry.Point(0, 10);
    var point6 = new SuperMap.Geometry.Point(10, 10);
    var point7 = new SuperMap.Geometry.Point(10, 20);
    var point8 = new SuperMap.Geometry.Point(0, 20);
    var points2 = [point5, point6, point7, point8];
    var linearRing1 = new SuperMap.Geometry.LinearRing(points2);
    var geometry = new SuperMap.Geometry.Polygon([linearRing1]);
    var intersect = polygon.intersects(geometry);
    ok(!intersect, "function:intersects1");
    polygon.destroy();
});
test("testPolygon_distanceTo", function () {
    expect(3);
    var point1 = new SuperMap.Geometry.Point(0, 4010338);
    var point2 = new SuperMap.Geometry.Point(1063524, 4010338);
    var point3 = new SuperMap.Geometry.Point(1063524, 3150322);
    var point4 = new SuperMap.Geometry.Point(0, 3150322);
    var points = [point1, point2, point3, point4];
    var linearRing = new SuperMap.Geometry.LinearRing(points);
    var polygon = new SuperMap.Geometry.Polygon([linearRing]);
    //options为默认参数(edge默认为true)，目标几何对象不包含在原几何对象内
    var geometry1 = new SuperMap.Geometry.Point(1100000, 4010338);
    var distance1 = polygon.distanceTo(geometry1);
    var expectDiatance1 = 1100000 - 1063524;
    equal(distance1, expectDiatance1, "function:distanceTo");
    //options为默认参数(edge默认为true)，目标几何对象包含在原几何对象内
    var geometry2 = new SuperMap.Geometry.Point(1000000, 4010338);
    var distance2 = polygon.distanceTo(geometry2);
    var expectDiatance2 = 4010338 - 4010338;
    equal(distance2, expectDiatance2, "function:distanceTo");
    //options中的edge为false，目标几何对象与原几何对象相交
    var geometry3 = new SuperMap.Geometry.Point(1063524, 4000000);
    var options = {details: false, edge: false};
    var distance3 = polygon.distanceTo(geometry3, options);
    equal(distance3, 0, "function:distanceTo");
    polygon.destroy();
});
test("testPolygon_createRegularPolygon", function () {
    expect(2);
    var origin = new SuperMap.Geometry.Point(5, 0);
    var radius = 6, sides = 50, rotation = 270;
    var polygon = SuperMap.Geometry.Polygon.createRegularPolygon(origin, radius, sides, rotation);
    equal(polygon.components.length, 1, "function:createRegularPolygon");
    equal(polygon.components[0].components.length, sides + 1, "function:createRegularPolygon");
    polygon.destroy();
});
test("testPolygon_createRegularPolygonTriangle", function () {
    expect(2);
    var origin = new SuperMap.Geometry.Point(5, 0);
    var height = 2, width = 2, lineLength = 1, angel = 270;
    var polygon = SuperMap.Geometry.Polygon.createRegularPolygonTriangle(origin, height, width, lineLength, angel);
    equal(polygon.components.length, 2, "function:createRegularPolygon");
    equal(polygon.polygonType, "Triangle", "function:createRegularPolygonTriangle");
    polygon.destroy();
});
test("testPolygon_createBsplinesurface", function () {
    expect(2);
    var origin = new SuperMap.Geometry.Point(5, 0);
    var height = 2, width = 2, angel = 270;
    var polygon = SuperMap.Geometry.Polygon.createBsplinesurface(origin, height, width, angel);
    equal(polygon.components.length, 1, "function:createRegularPolygon");
    equal(polygon.polygonType, "Bspline", "function:createBsplinesurface");
    polygon.destroy();
});