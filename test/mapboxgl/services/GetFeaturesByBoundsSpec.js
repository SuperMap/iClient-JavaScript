require('../../../src/mapboxgl/services/FeatureService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.dataServiceURL;
describe('mapboxgl_FeatureService_getFeaturesByBounds', function () {
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
    //数据集Bounds查询服务
    it('getFeaturesByBounds_test', function (done) {
        var sw = new mapboxgl.LngLat(-20, -20);
        var ne = new mapboxgl.LngLat(20, 20);
        var lngLatBounds = new mapboxgl.LngLatBounds(sw, ne);
        var boundsParam = new SuperMap.GetFeaturesByBoundsParameters({
            datasetNames: ["World:Capitals"],
            bounds: lngLatBounds
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.getFeaturesByBounds(boundsParam, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.options.data).toContain("World:Capitals");
                expect(serviceResult.result.featureCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("Point");
                    expect(features[i].geometry.coordinates.length).toEqual(2);
                }
                done();
            } catch (e) {
                console.log("'getFeaturesByBounds_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});