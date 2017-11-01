require('../../../src/openlayers/services/SpatialAnalystService');
var request = require('request');

var originalTimeout, serviceResults;
var sampleServiceUrl = GlobeParameter.spatialAnalystURL;
describe('openlayers_SpatialAnalystService_terrainCurvatureCalculate', function () {
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "TerrainCurvature_openlayersTest";
    //地形曲率计算
    it('terrainCurvatureCalculate', function (done) {
        var terrainCurvatureCalculationParameters = new SuperMap.TerrainCurvatureCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: resultDataset,
            deleteExistResultDataset: true
        });
        //向iServer发起地形曲率计算请求
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(sampleServiceUrl);
        spatialAnalystService.terrainCurvatureCalculate(terrainCurvatureCalculationParameters, function (serviceResult) {
            serviceResults = serviceResult;
        });
        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.recordset).not.toBeNull();
            done();
        }, 8000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', function (done) {
        var testResult = GlobeParameter.datajingjinURL + resultDataset;
        request.delete(testResult);
        done();
    });
});