module('LineString');
function getLineString() {
    var point1 = new SuperMap.Geometry.Point(0, 0);
    var point2 = new SuperMap.Geometry.Point(1, 1);
    var point3 = new SuperMap.Geometry.Point(0, 3);
    var point4 = new SuperMap.Geometry.Point(4, 4);
    var points = [point1, point2, point3, point4];
    return new SuperMap.Geometry.LineString(points);
};
function getPoints() {
    var point1 = new SuperMap.Geometry.Point(0, 0);
    var point2 = new SuperMap.Geometry.Point(1, 1);
    var point3 = new SuperMap.Geometry.Point(2, 2);
    var point4 = new SuperMap.Geometry.Point(3, 3);
    return [point1, point2, point3, point4];
};


test("testLineString_removeComponent", function () {
    expect(5);
    var lineString = getLineString();
    equals(lineString.components.length, 4, " Property:length");
    equals(lineString.components[1].x, 1, " Property:x");
    var result = lineString.removeComponent(lineString.components[1]);
    ok(result, " Function:removeComponent");
    equals(lineString.components.length, 3, " Property:length");
    equals(lineString.components[1].x, 0, " Property:x");
});
test("testLineString_intersects", function () {
    expect(2);
    var lineString = getLineString();
    var point1 = new SuperMap.Geometry.Point(0, 0);
    var point2 = new SuperMap.Geometry.Point(1, 1);
    var point3 = new SuperMap.Geometry.Point(1, 2);
    var point4 = new SuperMap.Geometry.Point(1, 3);
    var points = [point1, point2, point3, point4];
    var ls = new SuperMap.Geometry.LineString(points);
    var ins = lineString.intersects(ls);
    ok(ins, "Function:intersects");
    point1 = new SuperMap.Geometry.Point(10, 10);
    point2 = new SuperMap.Geometry.Point(11, 11);
    point3 = new SuperMap.Geometry.Point(11, 12);
    point4 = new SuperMap.Geometry.Point(11, 13);
    points = [point1, point2, point3, point4];
    ls = new SuperMap.Geometry.LineString(points);
    ins = lineString.intersects(ls);
    ok(!ins, "Function:intersects");
});
test("testLineString_getSortedSegments", function () {
    expect(4);
    var point4 = new SuperMap.Geometry.Point(1, 3);
    var point1 = new SuperMap.Geometry.Point(0, 0);
    var point2 = new SuperMap.Geometry.Point(1, 1);
    var point3 = new SuperMap.Geometry.Point(1, 2);
    var points = [point4, point1, point2, point3];
    var ls = new SuperMap.Geometry.LineString(points);
    var lineString = ls.getSortedSegments();
    equals(ls.components.length, 4, " Property:length");
    equals(ls.components[0].x, 1, " Property:x");
    equals(lineString.length, 3, " Property:length");
    equals(lineString[0].x1, 0, " Property:x");
});
test("testLineString_splitWithSegment", function () {
    expect(2);
    var lineString = getLineString();
    var seg = {};
    seg.x1 = 0;
    seg.y1 = 0;
    seg.x2 = 1;
    seg.y2 = 1;
    var options = {tolerance: 0.1};
    var result = lineString.splitWithSegment(seg, options);
    equals(result.lines.length, 2, " Property:length");
    equals(result.lines[0].components[0].x, 0, " Property:x");
});
test("testLineString_split", function () {
    expect(2);
    var lineString = getLineString();
    var point4 = new SuperMap.Geometry.Point(1, 3);
    var point1 = new SuperMap.Geometry.Point(0, 0);
    var point2 = new SuperMap.Geometry.Point(1, 1);
    var point3 = new SuperMap.Geometry.Point(1, 2);
    var points = [point4, point1, point2, point3];
    var ls = new SuperMap.Geometry.LineString(points);
    var result = lineString.split(ls, null);
    equals(result.length, 3, " Property:length");
    equals(result[0].components[0].x, 1, " Property:x");
});
test("testLineString_splitWith", function () {
    expect(2);
    var lineString = getLineString();
    var point1 = new SuperMap.Geometry.Point(0, 0);
    var point2 = new SuperMap.Geometry.Point(1, 1);
    var point3 = new SuperMap.Geometry.Point(1, 2);
    var point4 = new SuperMap.Geometry.Point(1, 3);
    var points = [point1, point2, point3, point4];
    var ls = new SuperMap.Geometry.LineString(points);
    var options = {tolerance: 0.1};
    var result = ls.splitWith(lineString, options);
    equals(result.length, 2, " Property:length");
    equals(result[0].components[0].x, 0, " Property:x");
});
test("testLineString_getVertices", function () {
    expect(2);
    var lineString = getLineString();
    var result = lineString.getVertices();
    equals(result.length, 4, " Property:length");
    result = lineString.getVertices(false);
    equals(result.length, 2, " Property:length");
});
test("testLineString_distanceTo", function () {
    expect(2);
    var lineString = getLineString();
    var point = new SuperMap.Geometry.Point(1, 3);
    var result = lineString.distanceTo(point, null);
    equals(result, 0.24253562503633302, " Function:distanceTo");
    var point1 = new SuperMap.Geometry.Point(1, 0);
    var point2 = new SuperMap.Geometry.Point(2, 1);
    var point3 = new SuperMap.Geometry.Point(3, 2);
    var points = [point1, point2, point3];
    var ls = new SuperMap.Geometry.LineString(points)
    result = lineString.distanceTo(ls, null);
    equals(result, 1, " Function:distanceTo");
});
test("testLineString_simplify", function () {
    expect(4);
    var point1 = new SuperMap.Geometry.Point(0, 0);
    var point2 = new SuperMap.Geometry.Point(0, 0.1);
    var point3 = new SuperMap.Geometry.Point(1, 2);
    var point4 = new SuperMap.Geometry.Point(1, 3);
    var point5 = new SuperMap.Geometry.Point(2, 3);
    var points = [point1, point2, point3, point4, point5];
    var ls = new SuperMap.Geometry.LineString(points);
    equals(ls.components.length, 5, " Property:length");
    equals(ls.components[1].y, 0.1, " Property:y");
    var result = ls.simplify(0.2);
    equals(result.components.length, 4, " Property:length");
    equals(result.components[1].x, 1, " Property:x");
});
test("testLineString_createBspline", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.createBspline(points, 10);
    equals(result.components.length, 37, " Property:length");
    equals(result.components[1].x, 0.5, " Property:x");
});
test("testLineString_createBezier1", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.createBezier1(points, 2, 2);
    equals(result.components.length, 4, " Property:length");
    equals(result.components[0].x, 0, " Property:x");
});
test("testLineString_calculatePointsFBZ2", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.calculatePointsFBZ2(points, 2);
    equals(result.length, 4, " Property:length");
    equals(result[0].x, 0, " Property:x");
});
test("testLineString_calculatePointsFBZ3", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.calculatePointsFBZ3(points, 2);
    equals(result.length, 4, " Property:length");
    equals(result[0].x, 0, " Property:x");
});
test("testLineString_calculatePointsFBZN", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.calculatePointsFBZN(points, 2);
    equals(result.length, 3, " Property:length");
    equals(result[0].x, 0, " Property:x");
});
test("testLineString_createBezier2", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.createBezier2(points, 2);
    equals(result.components.length, 4, " Property:length");
    equals(result.components[1].x, 0, " Property:x");
});

test("testLineString_createBezier", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.createBezier(points, 2);
    equals(result.components.length, 4, " Property:length");
    equals(result.components[1].x, 1, " Property:x");
});
test("testLineString_createBezierN", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.createBezierN(points, 2);
    equals(result.components.length, 3, " Property:length");
    equals(result.components[1].x, 1.5, " Property:x");
});

test("testLineString_calculateCardinalPoints", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.calculateCardinalPoints(points);
    equals(result.length, 10, " Property:length");
    equals(result[0].x, 0, " Property:x");
});
test("testLineString_createCloseCardinal", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.createCloseCardinal(points);
    equals(result.length, 13, " Property:length");
    equals(result[0].x, 0, " Property:x");
});
test("testLineString_calculateCircle", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.calculateCircle(points);
    equals(result.length, 3, " Property:length");
    equals(result[0].x, 0, " Property:x");
});
test("testLineString_createLineEPS", function () {
    expect(2);
    var points = getPoints();
    var result = new SuperMap.Geometry.LineString.createLineEPS(points);
    equals(result.length, 4, " Property:length");
    equals(result[0].x, 0, " Property:x");
});
