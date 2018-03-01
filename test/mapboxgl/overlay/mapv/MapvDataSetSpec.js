require('../../../../src/mapboxgl/overlay/mapv/MapvDataSet');
var mapboxgl = require('mapbox-gl');
window.mapboxgl = mapboxgl;

describe('mapboxgl_MapvDataSet', function () {
    it('getPoint', function () {
        var point = [106.540545, 29.531714];
        var mapvDataSet = mapboxgl.supermap.MapvDataSet;
        var dataset = mapvDataSet.getPoint(point);
        expect(dataset).not.toBeNull();
        expect(dataset._data.length).toEqual(1);
        var data = dataset._data[0];
        expect(data.geometry.type).toEqual("Point");
        expect(data.geometry.coordinates.length).toEqual(2);
        expect(data.geometry.coordinates[0]).toEqual(106.540545);
        expect(data.geometry.coordinates[1]).toEqual(29.531714);
        data = null;
    });

    it('getPoints', function () {
        var points = [{
            "geometry": {
                "type": "Point",
                "coordinates": [106.63530472117604, 29.492206977571094]
            }
        }, {
            "geometry": {
                "type": "Point",
                "coordinates": [106.63530472117604, 29.492206977571094]
            }
        }];
        var mapvDataSet = mapboxgl.supermap.MapvDataSet;
        var dataset = mapvDataSet.getPoints(points);
        expect(dataset).not.toBeNull();
        expect(dataset._data.length).toEqual(2);
        expect(dataset._data[0].geometry.type).toEqual('Point');
        expect(dataset._data[0].geometry.coordinates.length).toEqual(2);
        expect(dataset._data[0].geometry.coordinates[0]).toEqual(106.63530472117604);
        expect(dataset._data[0].geometry.coordinates[1]).toEqual(29.492206977571094);
        expect(dataset._data[1].geometry.type).toEqual('Point');
        expect(dataset._data[1].geometry.coordinates.length).toEqual(2);
        expect(dataset._data[1].geometry.coordinates[0]).toEqual(106.63530472117604);
        expect(dataset._data[1].geometry.coordinates[1]).toEqual(29.492206977571094);
    });

    it('getCurveLines', function () {
        var startPoint = [10, 20];
        var linePoints = [{
            "geometry": {
                "type": "Point",
                "coordinates": [100, 30]
            }
        }, {
            "geometry": {
                "type": "Point",
                "coordinates": [101, 29]
            }
        }];
        var mapvDataSet = mapboxgl.supermap.MapvDataSet;
        var dataset = mapvDataSet.getCurveLines(startPoint, linePoints);
        expect(dataset).not.toBeNull();
        expect(dataset._data.length).toEqual(2);
        for (var i = 0; i < dataset._data.length; i++) {
            expect(dataset._data[i].geometry.type).toEqual("LineString");
            expect(dataset._data[i].geometry.coordinates.length).toEqual(41);
            var coordinates = dataset._data[i].geometry.coordinates;
            for (var j = 0; j < coordinates.length; j++) {
                expect(coordinates[j].length).toEqual(2);
            }
        }
    });

    it('getCurveDynamicPoints', function () {
        var point = [10, 20];
        var endPoints = [{
            "geometry": {
                "type": "Point",
                "coordinates": [100, 30]
            }
        }, {
            "geometry": {
                "type": "Point",
                "coordinates": [101, 29]
            }
        }];
        var mapvDataSet = mapboxgl.supermap.MapvDataSet;
        var dataset = mapvDataSet.getCurveDynamicPoints(point, endPoints);
        expect(dataset).not.toBeNull();
        expect(dataset._data.length).toBeGreaterThan(0);
        for (var i = 0; i < dataset._data.length; i++) {
            expect(dataset._data[i].time).toBeGreaterThanOrEqual(0);
            expect(dataset._data[i].geometry.type).toEqual("Point");
            expect(dataset._data[i].geometry.coordinates.length).toEqual(2);
        }

    })
});