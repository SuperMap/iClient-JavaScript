require('../../../src/mapboxgl/services/FeatureService');
var mapboxgl = require('mapbox-gl');
var url = GlobeParameter.dataServiceURL;

describe('mapboxgl_FeatureService_getFeaturesByIDs', function () {
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
    //数据集ID查询服务
    it('getFeaturesByIDs_test', function (done) {
        var idsParam = new SuperMap.GetFeaturesByIDsParameters({
            IDs: [247],
            datasetNames: ["World:Countries"]
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.getFeaturesByIDs(idsParam, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.options.data).toContain("World:Countries");
                expect(serviceResult.result.featureCount).toEqual(1);
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                expect(serviceResult.result.features.features[0].id).toEqual(247);
                expect(serviceResult.result.features.features[0].type).toEqual("Feature");
                expect(serviceResult.result.features.features[0].geometry.type).toEqual("MultiPolygon");
                var coordinates = serviceResult.result.features.features[0].geometry.coordinates;
                expect(coordinates.length).toBeGreaterThan(0);
                for (var i = 0; i < coordinates.length; i++) {
                    expect(coordinates[i][0].length).toBeGreaterThan(0);
                    for (var j = 0; j < coordinates[i][0].length; j++) {
                        expect(coordinates[i][0][j].length).toEqual(2);
                    }
                }
                done();

            } catch (e) {
                console.log("'getFeaturesByIDs_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });
});