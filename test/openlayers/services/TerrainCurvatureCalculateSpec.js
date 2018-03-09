import request from 'request';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {TerrainCurvatureCalculationParameters} from '../../../src/common/iServer/TerrainCurvatureCalculationParameters';

var originalTimeout, serviceResults;
var sampleServiceUrl = GlobeParameter.spatialAnalystURL;
describe('openlayers_SpatialAnalystService_terrainCurvatureCalculate', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "TerrainCurvature_openlayersTest";
    //地形曲率计算
    it('terrainCurvatureCalculate', (done) => {
        var terrainCurvatureCalculationParameters = new TerrainCurvatureCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: resultDataset,
            deleteExistResultDataset: true
        });
        //向iServer发起地形曲率计算请求
        var spatialAnalystService = new SpatialAnalystService(sampleServiceUrl);
        spatialAnalystService.terrainCurvatureCalculate(terrainCurvatureCalculationParameters, (serviceResult) => {
            serviceResults = serviceResult;
        });
        setTimeout(() => {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.recordset).not.toBeNull();
            done();
        }, 8000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done) => {
        var testResult = GlobeParameter.datajingjinURL + resultDataset;
        request.delete(testResult);
        done();
    });
});