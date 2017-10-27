require('../../../../src/common/commontypes/geometry/LineString');

describe('LineString', function () {
    var roadLine;
    beforeEach(function () {
        var points = [new SuperMap.Geometry.Point(4933.319287022352, -3337.3849141502124),
            new SuperMap.Geometry.Point(4960.9674060199022, -3349.3316322355736),
            new SuperMap.Geometry.Point(5075.3145648369318, -3378.0037556404409),
            new SuperMap.Geometry.Point(5006.0235999418364, -3358.8890067038628),
            new SuperMap.Geometry.Point(5305.19551436013, -3376.9669111768926)];
        roadLine = new SuperMap.Geometry.LineString(points);
    });

    it('initialize', function () {
        expect(roadLine).not.toBeNull();
        expect(roadLine.components.length).toEqual(5);
    });

    it('removeComponent', function () {
        var point = new SuperMap.Geometry.Point(4960.9674060199022, -3349.3316322355736);
        var removeComponent = roadLine.removeComponent(point);
        expect(removeComponent).toBeTruthy();
    });

    it('getSortedSegments', function () {
        var segments = roadLine.getSortedSegments();
        expect(segments).not.toBeNull();
        expect(segments.length).toEqual(4);
        expect(segments[0].x1).toBeLessThan(segments[0].x2);
        expect(segments[1].x1).toBeLessThan(segments[1].x2);
        expect(segments[2].x1).toBeLessThan(segments[2].x2);
        expect(segments[3].x1).toBeLessThan(segments[3].x2);
    });

    it('getVertices', function () {
        var vertices1, vertices2, vertices3;
        //nodes = true
        vertices1 = roadLine.getVertices(true);
        expect(vertices1).not.toBeNull();
        expect(vertices1.length).toEqual(2);
        //nodes = false
        vertices2 = roadLine.getVertices(false);
        expect(vertices2).not.toBeNull();
        expect(vertices2.length).toEqual(3);
        //nodes = ""
        vertices3 = roadLine.getVertices();
        expect(vertices3).not.toBeNull();
        expect(vertices3.length).toEqual(5);
    });

    it('calculateCircle', function () {
        var points1 = [], points2 = [], points3 = [];
        //两点：
        points1.push(new SuperMap.Geometry.Point(-50, 30));
        points1.push(new SuperMap.Geometry.Point(-30, 50));
        var circle1 = SuperMap.Geometry.LineString.calculateCircle(points1);
        expect(circle1.length).toEqual(2);
        //三点p1.x != p3.x：
        points2.push(new SuperMap.Geometry.Point(-50, 30));
        points2.push(new SuperMap.Geometry.Point(-30, 50));
        points2.push(new SuperMap.Geometry.Point(-20, 60));
        var circle2 = SuperMap.Geometry.LineString.calculateCircle(points2);
        expect(circle2.length).toEqual(3);
        //三点p1.x == p3.x：
        points3.push(new SuperMap.Geometry.Point(-50, 30));
        points3.push(new SuperMap.Geometry.Point(-30, 50));
        points3.push(new SuperMap.Geometry.Point(-50, 60));
        var circle3 = SuperMap.Geometry.LineString.calculateCircle(points3);
        expect(circle3.length).toBeGreaterThan(3);
    });

    it('createLineEPS', function () {
        var points = [];
        points.push(new SuperMap.Geometry.Point(-50, 30));
        points.push(new SuperMap.Geometry.Point(-30, 50, "LTypeArc"));
        points.push(new SuperMap.Geometry.Point(2, 60));
        points.push(new SuperMap.Geometry.Point(8, 20));
        var lineEPS = SuperMap.Geometry.LineString.createLineEPS(points);
        expect(lineEPS.length).toEqual(74);
        var points1 = [];
        points1.push(new SuperMap.Geometry.Point(-50, 30));
        points1.push(new SuperMap.Geometry.Point(-30, 50, "LTypeCurve"));
        points1.push(new SuperMap.Geometry.Point(2, 60));
        points1.push(new SuperMap.Geometry.Point(8, 20));
        var lineEPS1 = SuperMap.Geometry.LineString.createLineEPS(points1);
        expect(lineEPS1.length).toEqual(4);
    });

    it('createLineArc', function () {
        var lineArc1, lineArc2, lineArc3;
        var list = [], i, len, points = [];
        points.push(new SuperMap.Geometry.Point(-50, 30));
        points.push(new SuperMap.Geometry.Point(-30, 50, "LTypeArc"));
        points.push(new SuperMap.Geometry.Point(2, 60));
        points.push(new SuperMap.Geometry.Point(8, 20));
        //i = 0;
        i = 0;
        len = 2;
        lineArc1 = SuperMap.Geometry.LineString.createLineArc(list, i, len, points);
        expect(lineArc1[0].length).toEqual(2);
        //i = len -1;
        i = 1;
        len = 2;
        lineArc2 = SuperMap.Geometry.LineString.createLineArc(list, i, len, points);
        expect(lineArc2[0].length).toEqual(4);
        //i = "";
        i = 1;
        len = 4;
        lineArc3 = SuperMap.Geometry.LineString.createLineArc(list, i, len, points);
        expect(lineArc3[0].length).toEqual(76);
    });

    it('addPointEPS', function () {
        var pointEPS1, pointEPS2, pointEPS3;
        var type = "LTypeArc", i, len, points = [];
        points.push(new SuperMap.Geometry.Point(-50, 30));
        points.push(new SuperMap.Geometry.Point(-30, 50, "LTypeArc"));
        points.push(new SuperMap.Geometry.Point(2, 60));
        points.push(new SuperMap.Geometry.Point(8, 20));
        //i = 0;
        i = 0;
        len = 2;
        pointEPS1 = SuperMap.Geometry.LineString.addPointEPS(points, i, len, type);
        expect(pointEPS1[0].length).toEqual(2);
        //i = len -1;
        i = 1;
        len = 2;
        pointEPS2 = SuperMap.Geometry.LineString.addPointEPS(points, i, len, type);
        expect(pointEPS2[0].length).toEqual(2);
        //i = "";
        i = 1;
        len = 4;
        pointEPS3 = SuperMap.Geometry.LineString.addPointEPS(points, i, len, type);
        expect(pointEPS3[0].length).toEqual(73);
    });
});