import {TerrainCurvatureCalculationService} from '../../../src/common/iServer/TerrainCurvatureCalculationService';
import {TerrainCurvatureCalculationParameters} from '../../../src/common/iServer/TerrainCurvatureCalculationParameters';
import request from 'request';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
var serviceFailedEventArgsSystem = null, analystEventArgsSystem = null;
var TerrainCurvatureCalculationServiceCompleted = (event) => {
    analystEventArgsSystem = event;
};
var TerrainCurvatureCalculationServiceFailed = (event) => {
    serviceFailedEventArgsSystem = event;
};
var options = {
    eventListeners: {
        "processCompleted": TerrainCurvatureCalculationServiceCompleted,
        'processFailed': TerrainCurvatureCalculationServiceFailed
    }
};
var initTerrainCurvatureCalculationService = () => {
    return new TerrainCurvatureCalculationService(spatialAnalystURL, options);
};

describe('TerrainCurvatureCalculationService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "TerrainCurvature_commonTest";
    //成功事件
    it('success:processAsync', (done) => {
        var terrainCurvatureCalculationService = initTerrainCurvatureCalculationService();
        expect(terrainCurvatureCalculationService).not.toBeNull();
        expect(terrainCurvatureCalculationService.url).toEqual(spatialAnalystURL);
        var terrainCurvatureCalculationParameters = new TerrainCurvatureCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: resultDataset,
            deleteExistResultDataset: true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/JingjinTerrain@Jingjin/terraincalculation/curvature.json?returnContent=true");
            expect(params).toContain("'zFactor':1");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"averageCurvatureResult":{"succeed":true,"recordset":null,"message":null,"dataset":"TerrainCurvature_commonTest@Jingjin"}}`));
        });
        terrainCurvatureCalculationService.processAsync(terrainCurvatureCalculationParameters);
        terrainCurvatureCalculationService.events.on({"processCompleted": TerrainCurvatureCalculationServiceCompleted});
        setTimeout(() => {
            try {
                var terrainCurvatureCalculationResult = analystEventArgsSystem.result;
                expect(terrainCurvatureCalculationResult).not.toBeNull();
                expect(terrainCurvatureCalculationResult.succeed).toBeTruthy();
                expect(terrainCurvatureCalculationResult.averageCurvatureResult.dataset).toBe(resultDataset + "@Jingjin");
                terrainCurvatureCalculationService.destroy();
                expect(terrainCurvatureCalculationService.events).toBeNull();
                expect(terrainCurvatureCalculationService.eventListeners).toBeNull();
                terrainCurvatureCalculationParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TerrainCurvatureCalculationService_" + exception.name + ":" + exception.message);
                terrainCurvatureCalculationService.destroy();
                terrainCurvatureCalculationParameters.destroy();
                done();
            }
        }, 10000);
    });

    //测试失败事件
    it('fail:processAsync', (done) => {
        var terrainCurvatureCalculationService = initTerrainCurvatureCalculationService();
        var terrainCurvatureCalculationParameters = new TerrainCurvatureCalculationParameters({
            dataset: "XX@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: "TerrainCurvatureFail_commonTest",
            deleteExistResultDataset: true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/XX@Jingjin/terraincalculation/curvature.json?returnContent=true");
            expect(params).toContain("'zFactor':1");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据集XX@Jingjin不存在"}}`));
        });
        terrainCurvatureCalculationService.processAsync(terrainCurvatureCalculationParameters);
        terrainCurvatureCalculationService.events.on({'processFailed': TerrainCurvatureCalculationServiceFailed});
        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("数据集XX@Jingjin不存在");
                terrainCurvatureCalculationService.destroy();
                expect(terrainCurvatureCalculationService.events).toBeNull();
                expect(terrainCurvatureCalculationService.eventListeners).toBeNull();
                terrainCurvatureCalculationParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TerrainCurvatureCalculationService_" + exception.name + ":" + exception.message);
                terrainCurvatureCalculationService.destroy();
                terrainCurvatureCalculationParameters.destroy();
                done();
            }
        }, 10000);
    });
});



