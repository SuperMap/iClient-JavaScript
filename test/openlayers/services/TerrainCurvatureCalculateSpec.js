import request from 'request';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {TerrainCurvatureCalculationParameters} from '../../../src/common/iServer/TerrainCurvatureCalculationParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(sampleServiceUrl + "/datasets/JingjinTerrain@Jingjin/terraincalculation/curvature?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.zFactor).toEqual(1.0);
            expect(paramsObj.deleteExistResultDataset).toBeTruthy();
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"averageCurvatureResult":{"succeed":true,"recordset":null,"message":null,"dataset":"TerrainCurvature_openlayersTest@Jingjin"}}`));
        });
        spatialAnalystService.terrainCurvatureCalculate(terrainCurvatureCalculationParameters, (serviceResult) => {
            serviceResults = serviceResult;
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.recordset).not.toBeNull();
            done();
        });
    });
});