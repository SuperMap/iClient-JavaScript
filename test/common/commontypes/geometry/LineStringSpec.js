import { LineString as GeometryLineString } from '../../../../src/common/commontypes/geometry/LineString';
import { Point as GeometryPoint } from '../../../../src/common/commontypes/geometry/Point';

describe('LineString', function () {
    var roadLine;
    beforeEach(function () {
        var points = [new GeometryPoint(4933.319287022352, -3337.3849141502124),
            new GeometryPoint(4960.9674060199022, -3349.3316322355736),
            new GeometryPoint(5075.3145648369318, -3378.0037556404409),
            new GeometryPoint(5006.0235999418364, -3358.8890067038628),
            new GeometryPoint(5305.19551436013, -3376.9669111768926)];
        roadLine = new GeometryLineString(points);
    });

    it('initialize', function () {
        expect(roadLine).not.toBeNull();
        expect(roadLine.components.length).toEqual(5);
    });

    it('removeComponent', function () {
        var point = new GeometryPoint(4960.9674060199022, -3349.3316322355736);
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
        points1.push(new GeometryPoint(-50, 30));
        points1.push(new GeometryPoint(-30, 50));
        var circle1 = GeometryLineString.calculateCircle(points1);
        expect(circle1.length).toEqual(2);
        //三点p1.x != p3.x：
        points2.push(new GeometryPoint(-50, 30));
        points2.push(new GeometryPoint(-30, 50));
        points2.push(new GeometryPoint(-20, 60));
        var circle2 = GeometryLineString.calculateCircle(points2);
        expect(circle2.length).toEqual(3);
        //三点p1.x == p3.x：
        points3.push(new GeometryPoint(-50, 30));
        points3.push(new GeometryPoint(-30, 50));
        points3.push(new GeometryPoint(-50, 60));
        var circle3 = GeometryLineString.calculateCircle(points3);
        expect(circle3.length).toBeGreaterThan(3);
    });

    it('createLineEPS', function () {
        var points = [];
        points.push(new GeometryPoint(-50, 30));
        points.push(new GeometryPoint(-30, 50, "LTypeArc"));
        points.push(new GeometryPoint(2, 60));
        points.push(new GeometryPoint(8, 20));
        var lineEPS = GeometryLineString.createLineEPS(points);
        expect(lineEPS.length).toEqual(74);
        var points1 = [];
        points1.push(new GeometryPoint(-50, 30));
        points1.push(new GeometryPoint(-30, 50, "LTypeCurve"));
        points1.push(new GeometryPoint(2, 60));
        points1.push(new GeometryPoint(8, 20));
        var lineEPS1 = GeometryLineString.createLineEPS(points1);
        expect(lineEPS1.length).toEqual(4);
    });

    it('createLineArc', function () {
        var lineArc1, lineArc2, lineArc3;
        var list = [], i, len, points = [];
        points.push(new GeometryPoint(-50, 30));
        points.push(new GeometryPoint(-30, 50, "LTypeArc"));
        points.push(new GeometryPoint(2, 60));
        points.push(new GeometryPoint(8, 20));
        //i = 0;
        i = 0;
        len = 2;
        lineArc1 = GeometryLineString.createLineArc(list, i, len, points);
        expect(lineArc1[0].length).toEqual(2);
        //i = len -1;
        i = 1;
        len = 2;
        lineArc2 = GeometryLineString.createLineArc(list, i, len, points);
        expect(lineArc2[0].length).toEqual(4);
        //i = "";
        i = 1;
        len = 4;
        lineArc3 = GeometryLineString.createLineArc(list, i, len, points);
        expect(lineArc3[0].length).toEqual(76);
    });

    it('addPointEPS', function () {
        var pointEPS1, pointEPS2, pointEPS3;
        var type = "LTypeArc", i, len, points = [];
        points.push(new GeometryPoint(-50, 30));
        points.push(new GeometryPoint(-30, 50, "LTypeArc"));
        points.push(new GeometryPoint(2, 60));
        points.push(new GeometryPoint(8, 20));
        //i = 0;
        i = 0;
        len = 2;
        pointEPS1 = GeometryLineString.addPointEPS(points, i, len, type);
        expect(pointEPS1[0].length).toEqual(2);
        //i = len -1;
        i = 1;
        len = 2;
        pointEPS2 = GeometryLineString.addPointEPS(points, i, len, type);
        expect(pointEPS2[0].length).toEqual(2);
        //i = "";
        i = 1;
        len = 4;
        pointEPS3 = GeometryLineString.addPointEPS(points, i, len, type);
        expect(pointEPS3[0].length).toEqual(73);
    });
});
