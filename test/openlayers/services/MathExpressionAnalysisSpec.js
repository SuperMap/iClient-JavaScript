require('../../../src/openlayers/services/SpatialAnalystService');

var originalTimeout, serviceResults;
var sampleServiceUrl = GlobeParameter.spatialAnalystURL;
describe('openlayers_SpatialAnalystService_mathExpressionAnalysis', function () {
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    //栅格代数运算
    it('mathExpressionAnalysis test', function (done) {
        var mathExpressionAnalysisParameters = new SuperMap.MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "Jingjin",
            resultGridName: "MathExpressionAnalysis_Result",
            deleteExistResultDataset: true
        });
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(sampleServiceUrl);
        spatialAnalystService.mathExpressionAnalysis(mathExpressionAnalysisParameters, function (serviceResult) {
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