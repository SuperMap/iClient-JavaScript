import {SpatialAnalystService} from '../../../src/maplibregl/services/SpatialAnalystService';
import {TerrainCurvatureCalculationParameters} from '../../../src/common/iServer/TerrainCurvatureCalculationParameters';
import request from 'request';
import { FetchRequest } from '../../../src/common/util/FetchRequest';


var url = GlobeParameter.spatialAnalystURL;
var options = {

};
describe('maplibregl_SpatialAnalystService_terrainCurvatureCalculate', () => {
    var serviceResult;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "TerrainCurvature_maplibreglTest";
    //地形曲率计算
    it('terrainCurvatureCalculate', (done) => {
        var terrainCurvatureCalculationParameters = new TerrainCurvatureCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: resultDataset,
            deleteExistResultDataset: true
        });
        var service = new SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/JingjinTerrain@Jingjin/terraincalculation/curvature?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.zFactor).toBe(1);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"averageCurvatureResult":{"succeed":true,"recordset":null,"message":null,"dataset":"TerrainCurvature_maplibreglTest@Jingjin"}}`));
        });
        service.terrainCurvatureCalculate(terrainCurvatureCalculationParameters, (result) => {
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
});