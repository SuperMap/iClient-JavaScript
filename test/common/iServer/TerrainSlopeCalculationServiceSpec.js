import {TerrainSlopeCalculationService} from '../../../src/common/iServer/TerrainSlopeCalculationService';
import {TerrainSlopeCalculationParameters} from '../../../src/common/iServer/TerrainSlopeCalculationParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null, analystEventArgsSystem = null;
var initTerrainSlopeCalculationService = (url,TerrainSlopeCalculationServiceCompleted,TerrainSlopeCalculationServiceFailed) => {
    return new TerrainSlopeCalculationService(url, {
        eventListeners: {
            "processCompleted": TerrainSlopeCalculationServiceCompleted,
            'processFailed': TerrainSlopeCalculationServiceFailed
        }
    });
};

describe('TerrainSlopeCalculationService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it('headers', () => {
        let myHeaders = new Headers();
        var terrainSlopeCalculationService = new TerrainSlopeCalculationService(GlobeParameter.spatialAnalystURL, { headers: myHeaders });
        expect(terrainSlopeCalculationService).not.toBeNull();
        expect(terrainSlopeCalculationService.headers).not.toBeNull();
        terrainSlopeCalculationService.destroy();
    });
    
    it('crossOrigin', () => {
        var terrainSlopeCalculationService = new TerrainSlopeCalculationService(GlobeParameter.spatialAnalystURL, { crossOrigin: false });
        expect(terrainSlopeCalculationService).not.toBeNull();
        expect(terrainSlopeCalculationService.crossOrigin).toBeFalsy();
        terrainSlopeCalculationService.destroy();
    });

    //成功事件
    it('success:processAsync', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var TerrainSlopeCalculationServiceCompleted = (event) => {
            analystEventArgsSystem = event;
            try {
                var terrainSlopeCalculationResult = analystEventArgsSystem.result;
                expect(terrainSlopeCalculationResult).not.toBeNull();
                expect(terrainSlopeCalculationResult.succeed).toBeTruthy();
                expect(terrainSlopeCalculationResult.dataset).toBe("testResult@Jingjin");
                terrainSlopeCalculationService.destroy();
                expect(terrainSlopeCalculationService.events).toBeNull();
                expect(terrainSlopeCalculationService.eventListeners).toBeNull();
                terrainSlopeCalculationParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TerrainSlopeCalculationService_" + exception.name + ":" + exception.message);
                terrainSlopeCalculationService.destroy();
                terrainSlopeCalculationParameters.destroy();
                done();
            }
        };
        var TerrainSlopeCalculationServiceFailed = (event) => {
            serviceFailedEventArgsSystem = event;
        };
        var terrainSlopeCalculationService = initTerrainSlopeCalculationService(spatialAnalystURL,TerrainSlopeCalculationServiceCompleted,TerrainSlopeCalculationServiceFailed);
        expect(terrainSlopeCalculationService).not.toBeNull();
        expect(terrainSlopeCalculationService.url).toEqual(spatialAnalystURL);
        var terrainSlopeCalculationParameters = new TerrainSlopeCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            zFactor:1, 
            slopeType:"DEGREE", 
            terrainAnalystSetting:{"boundsType":"UNION", "cellSizeType":"MAX"}, 
            resultDatasetName:"testResult", 
            deleteExistResultDataset:true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/JingjinTerrain@Jingjin/terraincalculation/slope?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.resultDatasetName).toBe("testResult");
            expect(paramsObj.deleteExistResultDataset).toBeTruthy();
            return Promise.resolve(new Response(`{
                "succeed": true,
                "recordset": null,
                "message": null,
                "dataset": "testResult@Jingjin",
                "status": null
            }`));
        });
        terrainSlopeCalculationService.processAsync(terrainSlopeCalculationParameters);
    });

    //测试失败事件
    it('fail:processAsync', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var TerrainSlopeCalculationServiceCompleted = (event) => {
            analystEventArgsSystem = event;
        };
        var TerrainSlopeCalculationServiceFailed = (event) => {
            serviceFailedEventArgsSystem = event;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("数据集XX@Jingjin不存在");
                terrainSlopeCalculationService.destroy();
                expect(terrainSlopeCalculationService.events).toBeNull();
                expect(terrainSlopeCalculationService.eventListeners).toBeNull();
                terrainSlopeCalculationParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TerrainSlopeCalculationService_" + exception.name + ":" + exception.message);
                terrainSlopeCalculationService.destroy();
                terrainSlopeCalculationParameters.destroy();
                done();
            }
        };
        var terrainSlopeCalculationService = initTerrainSlopeCalculationService(spatialAnalystURL,TerrainSlopeCalculationServiceCompleted,TerrainSlopeCalculationServiceFailed);
        var terrainSlopeCalculationParameters = new TerrainSlopeCalculationParameters({
            dataset: "XX@Jingjin",
            terrainAnalystSetting:{"boundsType":"UNION", "cellSizeType":"MAX"}, 
            resultDatasetName:"testResult", 
            deleteExistResultDataset:true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/XX@Jingjin/terraincalculation/slope?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.resultDatasetName).toBe("testResult");
            expect(paramsObj.deleteExistResultDataset).toBeTruthy();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据集XX@Jingjin不存在"}}`));
        });
        terrainSlopeCalculationService.processAsync(terrainSlopeCalculationParameters);
    });
});



