import {Route} from '../../../src/common/iServer/Route';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {LineString} from '../../../src/common/commontypes/geometry/LineString';

describe('Route', () => {
    var originalTimeout;
    var routeLocatorEventArgsSystem = null, serviceFailedEventArgsSystem = null;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        routeLocatorEventArgsSystem = null;
        serviceFailedEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor', () => {
        var lineString = new LineString();
        var options = {
            "id": 1,
            "length": 1024,
            "maxM": 1000,
            "minM": 100,
            "type": "LINESTRING"
        };
        var route = new Route([lineString], options);
        expect(route).not.toBeNull();
        expect(route.id).toBe(1);
        expect(route.length).toBe(1024);
        expect(route.maxM).toBe(1000);
        expect(route.minM).toBe(100);
        expect(route.type).toBe("LINESTRING");
    });

    it('toJson', () => {
        var lineString = new LineString();
        var options = {
            "id": 1,
            "length": 1024,
            "maxM": 1000,
            "minM": 100,
            "style": "",
            "center": 5000,
            "type": "LINESTRING",
            "parts": [1]
        };
        var route = new Route([lineString], options);
        var tojson = route.toJson();
        expect(tojson).not.toBeNull();
        expect(typeof (tojson)).toBe('string');
        expect(tojson).toBe('{"id":1,"center":5000,"style":,"length":1024,"maxM":1000,"minM":100,"type":"LINESTRING","parts":[1],"points":[]}');
    });

    it('toJson_withComponents', (done) => {
        try {
            var points = [new Point(4933.319287022352, -3337.3849141502124),
                new Point(4960.9674060199022, -3349.3316322355736),
                new Point(5006.0235999418364, -3358.8890067038628),
                new Point(5075.3145648369318, -3378.0037556404409),
                new Point(5305.19551436013, -3376.9669111768926)];
            var roadLine = new LineString(points);
            var options = {
                "id": 1,
                "length": 1024,
                "maxM": 1000,
                "minM": 100,
                "type": "LINESTRING",
                "parts": [1]
            };
            var route = new Route([roadLine], options);
            var tojson = route.toJson();
            expect(tojson).not.toBeNull();
            expect(typeof (tojson)).toBe('string');
        } catch (e) {
            expect(false).toBeFalsy();
            console.log("toJson_withEmptyComponents" + e.name + ":" + e.message);
            done();
        }
    });

    it('destroy', () => {
        var points = [new Point(4933.319287022352, -3337.3849141502124),
            new Point(4960.9674060199022, -3349.3316322355736),
            new Point(5006.0235999418364, -3358.8890067038628),
            new Point(5075.3145648369318, -3378.0037556404409),
            new Point(5305.19551436013, -3376.9669111768926)];
        var roadLine = new LineString(points);
        var options = {
            "id": 1,
            "length": 1024,
            "maxM": 1000,
            "minM": 100,
            "type": "LINESTRING",
            "parts": [1]
        };
        var route = new Route([roadLine], options);
        route.destroy();
        expect(route.id).toBeNull();
        expect(route.center).toBeNull();
        expect(route.style).toBeNull();
        expect(route.length).toBeNull();
        expect(route.maxM).toBeNull();
        expect(route.minM).toBeNull();
        expect(route.type).toBeNull();
        expect(route.parts).toBeNull();
        expect(route.components).toBeNull();
        expect(route.componentTypes).toBeNull();
    });

    it('fromJson', () => {
        var jsonobj = {
            "id": 1,
            "length": 1024,
            "maxM": 1000,
            "minM": 100,
            "type": "POINT",
            "points": [{
                "measure": 0,
                "y": -6674.466867067764,
                "x": 3817.3527876130133
            }],
            "parts": [1]
        };
        var result = Route.fromJson(jsonobj);
        expect(result).not.toBeNull();
        expect(result instanceof Route).toBeTruthy();
        expect(result.id).toBe(1);
        expect(result.length).toBe(1024);
        expect(result.maxM).toBe(1000);
        expect(result.minM).toBe(100);
        expect(result.type).toBe("POINT");
        expect(result.parts).toBe(jsonobj.parts);
    });
});