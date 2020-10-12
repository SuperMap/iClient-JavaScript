import {TerrainCurvatureCalculationService} from '../../../src/common/iServer/TerrainCurvatureCalculationService';
import {TerrainCurvatureCalculationParameters} from '../../../src/common/iServer/TerrainCurvatureCalculationParameters';
import request from 'request';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null, analystEventArgsSystem = null;
var initTerrainCurvatureCalculationService = (url,TerrainCurvatureCalculationServiceCompleted,TerrainCurvatureCalculationServiceFailed) => {
    return new TerrainCurvatureCalculationService(url, {
        eventListeners: {
            "processCompleted": TerrainCurvatureCalculationServiceCompleted,
            'processFailed': TerrainCurvatureCalculationServiceFailed
        }
    });
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

    it('headers', () => {
        let myHeaders = new Headers();
        var terrainCurvatureCalculationService = new TerrainCurvatureCalculationService(GlobeParameter.spatialAnalystURL, { headers: myHeaders });
        expect(terrainCurvatureCalculationService).not.toBeNull();
        expect(terrainCurvatureCalculationService.headers).not.toBeNull();
        terrainCurvatureCalculationService.destroy();
    });
    
    it('crossOrigin', () => {
        var terrainCurvatureCalculationService = new TerrainCurvatureCalculationService(GlobeParameter.spatialAnalystURL, { crossOrigin: false });
        expect(terrainCurvatureCalculationService).not.toBeNull();
        expect(terrainCurvatureCalculationService.crossOrigin).toBeFalsy();
        terrainCurvatureCalculationService.destroy();
    });

    //成功事件
    it('success:processAsync', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var TerrainCurvatureCalculationServiceCompleted = (event) => {
            analystEventArgsSystem = event;
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
        };
        var TerrainCurvatureCalculationServiceFailed = (event) => {
            serviceFailedEventArgsSystem = event;
        };
        var terrainCurvatureCalculationService = initTerrainCurvatureCalculationService(spatialAnalystURL,TerrainCurvatureCalculationServiceCompleted,TerrainCurvatureCalculationServiceFailed);
        expect(terrainCurvatureCalculationService).not.toBeNull();
        expect(terrainCurvatureCalculationService.url).toEqual(spatialAnalystURL);
        var terrainCurvatureCalculationParameters = new TerrainCurvatureCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: resultDataset,
            deleteExistResultDataset: true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/JingjinTerrain@Jingjin/terraincalculation/curvature?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.zFactor).toEqual(1.0);
            expect(paramsObj.deleteExistResultDataset).toBeTruthy();
            expect(paramsObj.averageCurvatureName).toBe("TerrainCurvature_commonTest");
            return Promise.resolve(new Response(`{"averageCurvatureResult":{"succeed":true,"recordset":null,"message":null,"dataset":"TerrainCurvature_commonTest@Jingjin"}}`));
        });
        terrainCurvatureCalculationService.processAsync(terrainCurvatureCalculationParameters);
        terrainCurvatureCalculationService.events.on({"processCompleted": TerrainCurvatureCalculationServiceCompleted});
    });

    //测试失败事件
    it('fail:processAsync', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var TerrainCurvatureCalculationServiceCompleted = (event) => {
            analystEventArgsSystem = event;
        };
        var TerrainCurvatureCalculationServiceFailed = (event) => {
            serviceFailedEventArgsSystem = event;
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
        };
        var terrainCurvatureCalculationService = initTerrainCurvatureCalculationService(spatialAnalystURL,TerrainCurvatureCalculationServiceCompleted,TerrainCurvatureCalculationServiceFailed);
        var terrainCurvatureCalculationParameters = new TerrainCurvatureCalculationParameters({
            dataset: "XX@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: "TerrainCurvatureFail_commonTest",
            deleteExistResultDataset: true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/XX@Jingjin/terraincalculation/curvature?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.zFactor).toEqual(1.0);
            expect(paramsObj.deleteExistResultDataset).toBeTruthy();
            expect(paramsObj.averageCurvatureName).toBe("TerrainCurvatureFail_commonTest");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据集XX@Jingjin不存在"}}`));
        });
        terrainCurvatureCalculationService.processAsync(terrainCurvatureCalculationParameters);
        terrainCurvatureCalculationService.events.on({'processFailed': TerrainCurvatureCalculationServiceFailed});
    });
});



