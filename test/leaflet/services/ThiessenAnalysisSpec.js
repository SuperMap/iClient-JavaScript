require('../../../src/leaflet/services/spatialAnalystService');

var spatialAnalystURL = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};
describe('leaflet_SpatialAnalystService_thiessenAnalysis', function () {
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
    it('thiessenAnalysis_test', function (done) {
        var dsThiessenAnalystParameters = new SuperMap.DatasetThiessenAnalystParameters({
            dataset: "Factory@Changchun"
        });
        var thiessenAnalystService = L.supermap.spatialAnalystService(spatialAnalystURL, options);
        thiessenAnalystService.thiessenAnalysis(dsThiessenAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(thiessenAnalystService).not.toBeNull();
                expect(thiessenAnalystService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBe(true);
                var regions = serviceResult.result.regions;
                expect(regions).not.toBeNull();
                expect(regions.features).not.toBeNull();
                expect(regions.features.length).toBeGreaterThan(0);
                for (var i = 0; i < regions.features.length; i++) {
                    expect(regions.features[i].type).toEqual("Feature");
                    expect(regions.features[i].geometry.type).toEqual("MultiPolygon");
                    var coordinates = regions.features[i].geometry.coordinates;
                    expect(coordinates).not.toBeNull();
                    expect(coordinates[0][0].length).toBeGreaterThan(0);
                    for (var j = 0; j < coordinates[0][0].length; j++) {
                        expect(coordinates[0][0][j].length).toEqual(2);
                    }
                }
                expect(regions.type).toEqual("FeatureCollection");
                thiessenAnalystService.destroy();
                done();

            } catch (exception) {
                console.log("'thiessenAnalysis_test'案例失败" + exception.name + ":" + exception.message);
                thiessenAnalystService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});