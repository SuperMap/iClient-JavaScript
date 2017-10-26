require('../../../src/mapboxgl/services/SpatialAnalystService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_thiessenAnalysis', function () {
    var serviceResult;
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    //泰森多边形分析 数据集泰森多边形
    it('thiessenAnalysis_datasets_test', function (done) {
        var datasetThiessenAnalystParameters = new SuperMap.DatasetThiessenAnalystParameters({
            dataset: "Town_P@Jingjin"
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.thiessenAnalysis(datasetThiessenAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.regions.type).toEqual("FeatureCollection");
                var features = serviceResult.result.regions.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].geometry.type).toEqual("MultiPolygon");
                    var coordinates = features[i].geometry.coordinates[0][0];
                    expect(coordinates.length).toBeGreaterThan(2);
                    for (var j = 0; j < coordinates.length; j++) {
                        expect(coordinates[j].length).toEqual(2);
                    }
                }
                done();
            } catch (e) {
                console.log("'thiessenAnalysis_datasets_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });
    //泰森多边形分析 几何泰森多边形
    it('thiessenAnalysis_geometry_test', function (done) {
        var pointsList = [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [116.1916654036, 39.8888542507]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [116.7031567225, 40.0118542507]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [116.2156351162, 39.8963250173]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [116.2740019864, 40.0000124079]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [116.6003285499, 39.8970574832]
            }
        }];
        var gThiessenAnalystParameters = new SuperMap.GeometryThiessenAnalystParameters({
            points: pointsList
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.thiessenAnalysis(gThiessenAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.regions.type).toEqual("FeatureCollection");
                var features = serviceResult.result.regions.features;
                expect(features.length).toEqual(5);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].geometry.type).toEqual("MultiPolygon");
                    var coordinates = features[i].geometry.coordinates[0][0];
                    for (var j = 0; j < coordinates.length; j++) {
                        expect(coordinates[j].length).toEqual(2);
                    }
                }
                done();
            } catch (e) {
                console.log("'thiessenAnalysis_geometry_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });
});