require('../../../src/mapboxgl/services/SpatialAnalystService');
var mapboxgl = require('mapbox-gl');
var request = require('request');

var url = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_terrainCurvatureCalculate', function () {
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

    var resultDataset = "TerrainCurvature_mapboxglTest";
    //地形曲率计算
    it('terrainCurvatureCalculate', function (done) {
        var terrainCurvatureCalculationParameters = new SuperMap.TerrainCurvatureCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: resultDataset,
            deleteExistResultDataset: true
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.terrainCurvatureCalculate(terrainCurvatureCalculationParameters, function (result) {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.averageCurvatureResult.dataset).toEqual(resultDataset + "@Jingjin");
                expect(serviceResult.result.averageCurvatureResult.succeed).toEqual(true);
                done();
            } catch (e) {
                console.log("'terrainCurvatureCalculate'案例失败" + e.name + ":" + e.message);
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