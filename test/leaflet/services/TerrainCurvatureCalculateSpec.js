require('../../../src/leaflet/services/SpatialAnalystService');
var request = require('request');

var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('leaflet_SpatialAnalystService_terrainCurvatureCalculate', function () {
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

    var resultDataset = "TerrainCurvature_leafletTest";
    it('terrainCurvatureCalculate', function (done) {
        var terrainCurvatureCalculationParameters = new SuperMap.TerrainCurvatureCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: resultDataset,
            deleteExistResultDataset: true
        });
        var terrainCurvatureCalculationService = L.supermap.spatialAnalystService(spatialAnalystURL, options);
        terrainCurvatureCalculationService.terrainCurvatureCalculate(terrainCurvatureCalculationParameters, function (result) {
            serviceResult = result;
            try {
                expect(terrainCurvatureCalculationService).not.toBeNull();
                expect(terrainCurvatureCalculationService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.averageCurvatureResult.dataset).toEqual(resultDataset + "@Jingjin");
                expect(serviceResult.result.averageCurvatureResult.succeed).toBe(true);
                terrainCurvatureCalculationService.destroy();
                done();
            } catch (exception) {
                console.log("'terrainCurvatureCalculate'案例失败" + exception.name + ":" + exception.message);
                terrainCurvatureCalculationService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', function (done) {
        var testResult = GlobeParameter.datajingjinURL + resultDataset;
        request.delete(testResult);
        done();
    });
});