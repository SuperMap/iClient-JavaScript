require('../../../src/mapboxgl/services/FeatureService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.dataServiceURL;
describe('mapboxgl_FeatureService_getFeaturesByBuffer', function () {
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

    //数据集Buffer查询服务
    it('getFeaturesByBuffer_geometry', function (done) {
        var queryBufferGeometry = {
            "type": "Polygon",
            "coordinates": [[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]
        };
        var bufferParam = new SuperMap.GetFeaturesByBufferParameters({
            datasetNames: ["World:Capitals"],
            bufferDistance: 30,
            geometry: queryBufferGeometry
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.getFeaturesByBuffer(bufferParam, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            expect(service).not.toBeNull();
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.succeed).toBe(true);
            expect(serviceResult.object.options.data).toContain("World:Capitals");
            expect(serviceResult.result.featureCount).not.toBeNull();
            // expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
            expect(serviceResult.result.features.type).toEqual("FeatureCollection");
            var features = serviceResult.result.features.features;
            for (var i = 0; i < features.length; i++) {
                expect(features[i].id).not.toBeNull();
                expect(features[i].type).toEqual("Feature");
                expect(features[i].properties).not.toBeNull();
                expect(features[i].geometry.type).toEqual("Point");
                expect(features[i].geometry.coordinates.length).toEqual(2);
            }
            done();
        }, 5000);
    });
});