import {TerrainAspectCalculationService} from '../../../src/common/iServer/TerrainAspectCalculationService';
import {TerrainAspectCalculationParameters} from '../../../src/common/iServer/TerrainAspectCalculationParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null, analystEventArgsSystem = null;
var initTerrainAspectCalculationService = (url) => {
    return new TerrainAspectCalculationService(url);
};

describe('TerrainAspectCalculationService', () => {
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
        var terrainAspectCalculationService = new TerrainAspectCalculationService(GlobeParameter.spatialAnalystURL, { headers: myHeaders });
        expect(terrainAspectCalculationService).not.toBeNull();
        expect(terrainAspectCalculationService.headers).not.toBeNull();
        terrainAspectCalculationService.destroy();
    });
    
    it('crossOrigin', () => {
        var terrainAspectCalculationService = new TerrainAspectCalculationService(GlobeParameter.spatialAnalystURL, { crossOrigin: false });
        expect(terrainAspectCalculationService).not.toBeNull();
        expect(terrainAspectCalculationService.crossOrigin).toBeFalsy();
        terrainAspectCalculationService.destroy();
    });

    //成功事件
    it('success:processAsync', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var TerrainAspectCalculationServiceCompleted = (event) => {
            analystEventArgsSystem = event;
            try {
                var terrainAspectCalculationResult = analystEventArgsSystem.result;
                expect(terrainAspectCalculationResult).not.toBeNull();
                expect(terrainAspectCalculationResult.succeed).toBeTruthy();
                expect(terrainAspectCalculationResult.dataset).toBe("testResult@Jingjin");
                terrainAspectCalculationService.destroy();
                terrainAspectCalculationParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TerrainAspectCalculationService_" + exception.name + ":" + exception.message);
                terrainAspectCalculationService.destroy();
                terrainAspectCalculationParameters.destroy();
                done();
            }
        };
        var TerrainAspectCalculationServiceFailed = (event) => {
            serviceFailedEventArgsSystem = event;
        };
        var terrainAspectCalculationService = initTerrainAspectCalculationService(spatialAnalystURL);
        expect(terrainAspectCalculationService).not.toBeNull();
        expect(terrainAspectCalculationService.url).toEqual(spatialAnalystURL);
        var terrainAspectCalculationParameters = new TerrainAspectCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            terrainAnalystSetting:{"boundsType":"UNION", "cellSizeType":"MAX"}, 
            resultDatasetName:"testResult", 
            deleteExistResultDataset:true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/JingjinTerrain@Jingjin/terraincalculation/aspect?returnContent=true");
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
        terrainAspectCalculationService.processAsync(terrainAspectCalculationParameters, TerrainAspectCalculationServiceCompleted);
    });

    //测试失败事件
    it('fail:processAsync', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var TerrainAspectCalculationServiceCompleted = (event) => {
            analystEventArgsSystem = event;
        };
        var TerrainAspectCalculationServiceFailed = (event) => {
            serviceFailedEventArgsSystem = event;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("数据集XX@Jingjin不存在");
                terrainAspectCalculationService.destroy();
                terrainAspectCalculationParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TerrainAspectCalculationService_" + exception.name + ":" + exception.message);
                terrainAspectCalculationService.destroy();
                terrainAspectCalculationParameters.destroy();
                done();
            }
        };
        var terrainAspectCalculationService = initTerrainAspectCalculationService(spatialAnalystURL);
        var terrainAspectCalculationParameters = new TerrainAspectCalculationParameters({
            dataset: "XX@Jingjin",
            terrainAnalystSetting:{"boundsType":"UNION", "cellSizeType":"MAX"}, 
            resultDatasetName:"testResult", 
            deleteExistResultDataset:true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/XX@Jingjin/terraincalculation/aspect?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.resultDatasetName).toBe("testResult");
            expect(paramsObj.deleteExistResultDataset).toBeTruthy();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据集XX@Jingjin不存在"}}`));
        });
        terrainAspectCalculationService.processAsync(terrainAspectCalculationParameters, TerrainAspectCalculationServiceFailed);
    });
});



