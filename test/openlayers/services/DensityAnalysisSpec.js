require('../../../src/openlayers/services/SpatialAnalystService');
var request = require('request');

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

    var resultDataset = "KernelDensity_openlayersTest";
    //点密度分析
    it('densityAnalysis', function (done) {
        var densityAnalystParameters = new SuperMap.DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            bounds: [3800, -3800, 8200, -2200],
            fieldName: "SmLength",
            searchRadius: 50,
            resultGridName: resultDataset,
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

    // 删除测试过程中产生的测试数据集
    it('delete test resources', function (done) {
        var testResult = GlobeParameter.datachangchunURL + resultDataset;
        request.delete(testResult);
        done();
    });
});