/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-4-17
 * Time: 上午11:34
 * To change this template use File | Settings | File Templates.
 */
module('Point');
test("testPoint_constructorDefault", function () {
    expect(3);
    var point = new SuperMap.Geometry.Point(0, 0);
    equals(point.x, 0, "Property:x");
    equals(point.y, 0, "Property:y");
    equals(point.tag, null, "Property:tag");
    point.destroy();

});
test("testPoint_constructor", function () {
    expect(4);
    var point = new SuperMap.Geometry.Point(0, 0, null, 0);
    equals(point.x, 0, "Property:x");
    equals(point.y, 0, "Property:y");
    equals(point.type, 'NONE', "Property:type");
    equals(point.tag, 0, "Property:tag");
    point.destroy();
});
test("testPoint_cloneDefault", function () {
    expect(2);
    var point = new SuperMap.Geometry.Point(0, 0);
    var pointClone = point.clone();
    equals(pointClone.x, 0, "Function:clone");
    equals(pointClone.y, 0, "Function:clone");
    point.destroy();
    pointClone.destroy();
});
test("testPoint_clone", function () {
    expect(1);
    var point = new SuperMap.Geometry.Point(0, 0);
    var point1 = point.clone(2);
    equals(point1, 2, "Function:clone");
    point.destroy();
});
test("testPoint_calculateBounds", function () {
    expect(4);
    var point = new SuperMap.Geometry.Point(10, 10);
    point.calculateBounds();
    equals(point.bounds.left, 10, "Function:calculateBounds");
    equals(point.bounds.right, 10, "Function:calculateBounds");
    equals(point.bounds.top, 10, "Function:calculateBounds");
    equals(point.bounds.bottom, 10, "Function:calculateBounds");
    point.destroy();
});
test("testPoint_distanceTo", function () {
    var point = new SuperMap.Geometry.Point(0, 0);
    var point1 = new SuperMap.Geometry.Point(10, 0);
    var num = point.distanceTo(point1);
    equals(num, 10, "Function:distanceTo");
    point.destroy();
    point1.destroy();
});
test("testPoint_distanceTo1", function () {
    expect(1);
    var point = new SuperMap.Geometry.Point(0, 0);
    var point1 = new SuperMap.Geometry.Point(10, 0);
    var num = point.distanceTo(point1, {details: true, edge: false});
    equals(num, 10, "Function:distanceTo");
    point.destroy();
    point1.destroy();
});
test("testPoint_distanceTo2", function () {
    expect(1);
    var point = new SuperMap.Geometry.Point(0, 0);
    var point1 = new SuperMap.Geometry.Point(10, 0);
    var point2 = new SuperMap.Geometry.Point(10, 10);
    var line = new SuperMap.Geometry.LineString([point1, point2]);
    var num = point.distanceTo(line, {details: true, edge: false});
    equals(num, 10, "Function:distanceTo");
});
test("testPoint_distanceTo3", function () {
    expect(5);
    var point = new SuperMap.Geometry.Point(0, 0);
    var point1 = new SuperMap.Geometry.Point(10, 0);
    var point2 = new SuperMap.Geometry.Point(10, 10);
    var line = new SuperMap.Geometry.LineString([point1, point2]);
    var num = point.distanceTo(line, {details: true, edge: true});
    equals(num.x0, 0, "Function:distanceTo");
    equals(num.y0, 0, "Function:distanceTo");
    equals(num.x1, 10, "Function:distanceTo");
    equals(num.y1, 0, "Function:distanceTo");
    equals(num.distance, 10, "Function:distanceTo");
});
test("testPoint_equalsDefault", function () {
    expect(1);
    var point = new SuperMap.Geometry.Point(0, 0);
    var isequals = point.equals();
    ok(!isequals, "Function:equals");
});
test("testPoint_equals", function () {
    expect(1);
    var point = new SuperMap.Geometry.Point(0, 0);
    var geo = {x: 0, y: 0};
    var isequals = point.equals(geo);
    ok(isequals, "Function:equals");
});
test("testPoint_toShortString", function () {
    expect(1);
    var point = new SuperMap.Geometry.Point(10, 11);
    var str = point.toShortString();
    equals(str, "10, 11", "Function:toShortString");
});
test("testPoint_move", function () {
    expect(3);
    var point = new SuperMap.Geometry.Point(10, 11);
    point.move(10, 0);
    equals(point.x, 20, "Function:move");
    equals(point.y, 11, "Function:move");
    equals(point.bounds, null, "Function:move");
});
test("testPoint_rotate", function () {
    expect(3);
    var point = new SuperMap.Geometry.Point(10, 11);
    var center = new SuperMap.Geometry.Point(0, 0);
    point.rotate(180, center);
    var pointy = point.y;
    var num = pointy.toFixed(2);
    equals(parseInt(point.x), -10, "Function:rotate");
    equals(num, -11, "Function:rotate");
    equals(point.bounds, null, "Function:move");
});
test("testPoint_getCentroid", function () {
    expect(2);
    var point = new SuperMap.Geometry.Point(10, 11);
    var center = point.getCentroid();
    equals(center.x, 10, "Function:getCentroid");
    equals(center.y, 11, "Function:getCentroid");
    point.destroy();
});
test("testPoint_intersectsDefaultToPoint", function () {
    expect(1);
    var point = new SuperMap.Geometry.Point(10, 11);
    var geo = new SuperMap.Geometry.Point(0, 1);
    var result = point.intersects(geo);
    ok(!result, "Function:intersects");
    point.destroy();
});
test("testPoint_intersectsPointToLine", function () {
    expect(1);
    var point = new SuperMap.Geometry.Point(10, 10);
    var geo = new SuperMap.Geometry.Point(0, 0);
    var geo1 = new SuperMap.Geometry.Point(11, 11);
    var line = new SuperMap.Geometry.LineString([geo, geo1]);
    var result = point.intersects(line);
    ok(result, "Function:intersects");
});
test("testPoint_transform", function () {
    expect(2);
    var point = new SuperMap.Geometry.Point(116, 39);
    var point1 = point.transform(new SuperMap.Projection("EPSG:4326"), new SuperMap.Projection("EPSG:900913"));
    equals(point1.x, 12913060.930222222, "Function:transform");
    equals(point1.y, 4721671.571922845, "Function:transform");
    point.destroy();
});
test("testPoint_getVertices", function () {
    expect(2);
    var point = new SuperMap.Geometry.Point(116, 39);
    var point1 = point.getVertices(1);
    equals(point1[0].x, 116, "Function:getVertices");
    equals(point1[0].y, 39, "Function:getVertices");
    point.destroy();
});
test("testPoint_destroy", function () {
    expect(2);
    var point = new SuperMap.Geometry.Point(116, 39);
    point.destroy();
    equals(point.x, null, "Function:destroy");
    equals(point.y, null, "Function:destroy");
});