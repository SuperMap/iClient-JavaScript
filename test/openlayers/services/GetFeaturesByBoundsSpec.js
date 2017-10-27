require('../../../src/openlayers/services/FeatureService');
var featureServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};
describe('openlayers_FeatureService_getFeaturesByBounds', function () {
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
    it('getFeaturesByBounds', function (done) {
        var polygon = new ol.geom.Polygon([[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]);
        var boundsParam = new SuperMap.GetFeaturesByBoundsParameters({
            datasetNames: ["World:Capitals"],
            bounds: polygon.getExtent()
        });
        var getFeaturesByBoundsService = new ol.supermap.FeatureService(featureServiceURL, options);
        getFeaturesByBoundsService.getFeaturesByBounds(boundsParam, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(getFeaturesByBoundsService).not.toBeNull();
                expect(getFeaturesByBoundsService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.featureCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features;
                expect(features).not.toBeNull();
                expect(features.length).toEqual(20);
                expect(features[0].properties.CAPITAL).toEqual("蒙罗维亚");
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("Point");
                    expect(features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(features[0].id).not.toBeNull();
                expect(features[0].geometry.type).toEqual("Point");
                done();
            } catch (exception) {
                console.log("'getFeaturesByBounds'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});