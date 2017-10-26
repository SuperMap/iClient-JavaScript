require('../../../src/openlayers/services/SpatialAnalystService');

var originalTimeout, serviceResults;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
describe('openlayers_SpatialAnalystService_densityAnalysis', function () {
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    //点密度分析
    it('densityAnalysis test', function (done) {
        var densityAnalystParameters = new SuperMap.DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            bounds: [3800, -3800, 8200, -2200],
            fieldName: "SmLength",
            searchRadius: 50,
            resultGridName: "KernelDensity_Result",
            deleteExistResultDataset: true
        });
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
        spatialAnalystService.densityAnalysis(densityAnalystParameters, function (serviceResult) {
            serviceResults = serviceResult;
        });

        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });
});