import {TerrainCutFillCalculationService} from '../../../src/common/iServer/TerrainCutFillCalculationService';
import {TerrainCutFillCalculationParameters} from '../../../src/common/iServer/TerrainCutFillCalculationParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null, analystEventArgsSystem = null;
var initTerrainCutFillCalculationService = (url) => {
    return new TerrainCutFillCalculationService(url);
};

describe('TerrainCutFillCalculationService', () => {
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
        var terrainCutFillCalculationService = new TerrainCutFillCalculationService(GlobeParameter.spatialAnalystURL, { headers: myHeaders });
        expect(terrainCutFillCalculationService).not.toBeNull();
        expect(terrainCutFillCalculationService.headers).not.toBeNull();
        terrainCutFillCalculationService.destroy();
    });
    
    it('crossOrigin', () => {
        var terrainCutFillCalculationService = new TerrainCutFillCalculationService(GlobeParameter.spatialAnalystURL, { crossOrigin: false });
        expect(terrainCutFillCalculationService).not.toBeNull();
        expect(terrainCutFillCalculationService.crossOrigin).toBeFalsy();
        terrainCutFillCalculationService.destroy();
    });

    //成功事件
    it('success:processAsync', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var TerrainCutFillCalculationServiceCompleted = (event) => {
            analystEventArgsSystem = event;
            try {
                var terrainCutFillCalculationResult = analystEventArgsSystem.result;
                expect(terrainCutFillCalculationResult).not.toBeNull();
                expect(terrainCutFillCalculationResult.succeed).toBeTruthy();
                expect(terrainCutFillCalculationResult.dataset).toBe("cutfill@Jingjin");
                expect(terrainCutFillCalculationResult.fillArea).toBe(6584.200807058389);
                terrainCutFillCalculationService.destroy();
                terrainCutFillCalculationParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TerrainCutFillCalculationService_" + exception.name + ":" + exception.message);
                terrainCutFillCalculationService.destroy();
                terrainCutFillCalculationParameters.destroy();
                done();
            }
        };
        var TerrainCutFillCalculationServiceFailed = (event) => {
            serviceFailedEventArgsSystem = event;
        };
        var terrainCutFillCalculationService = initTerrainCutFillCalculationService(spatialAnalystURL);
        expect(terrainCutFillCalculationService).not.toBeNull();
        expect(terrainCutFillCalculationService.url).toEqual(spatialAnalystURL);
        var terrainCutFillCalculationParameters = new TerrainCutFillCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            cutFillType:"REGION3D",
            region3D:"{\"bounds\":{\"bottom\":39.5,\"center\":{\"x\":116.2,\"y\":40.0},\"height\":1.0,\"left\":115.4,\"leftBottom\":{\"x\":115.4,\"y\":39.5},\"right\":117.0,\"rightTop\":{\"x\":117.0,\"y\":40.5},\"top\":40.5,\"valid\":true,\"width\":1.6},\"id\":0,\"parts\":[4],\"points\":[{\"x\":115.4,\"y\":40.0,\"z\":-5.0},{\"x\":116.4,\"y\":39.5,\"z\":0.0},{\"x\":117.0,\"y\":40.5,\"z\":5.0},{\"x\":115.4,\"y\":40.0,\"z\":-5.0}],\"rotationX\":0.0,\"rotationY\":0.0,\"rotationZ\":0.0,\"scaleX\":0.0,\"scaleY\":0.0,\"scaleZ\":0.0,\"type\":\"REGION3D\"}",
            resultDataset:"cutfill", 
            buildPyramid:true,
            deleteExistResultDataset:true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/JingjinTerrain@Jingjin/terraincalculation/cutfill?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.resultDataset).toBe("cutfill");
            expect(paramsObj.deleteExistResultDataset).toBeTruthy();
            return Promise.resolve(new Response(`{
                "fillArea": 6584.200807058389,
                "remainderArea": 0,
                "succeed": true,
                "fillVolume": 203845.38005984636,
                "message": null,
                "dataset": "cutfill@Jingjin",
                "cutArea": 6150486331.391543,
                "cutVolume": 1345394487658.8027,
                "status": null
            }`));
        });
        terrainCutFillCalculationService.processAsync(terrainCutFillCalculationParameters, TerrainCutFillCalculationServiceCompleted);
    });

    //测试失败事件
    it('fail:processAsync', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var TerrainCutFillCalculationServiceCompleted = (event) => {
            analystEventArgsSystem = event;
        };
        var TerrainCutFillCalculationServiceFailed = (event) => {
            serviceFailedEventArgsSystem = event;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("数据集XX@Jingjin不存在");
                terrainCutFillCalculationService.destroy();
                terrainCutFillCalculationParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TerrainCutFillCalculationService_" + exception.name + ":" + exception.message);
                terrainCutFillCalculationService.destroy();
                terrainCutFillCalculationParameters.destroy();
                done();
            }
        };
        var terrainCutFillCalculationService = initTerrainCutFillCalculationService(spatialAnalystURL);
        var terrainCutFillCalculationParameters = new TerrainCutFillCalculationParameters({
            dataset: "XX@Jingjin",
            cutFillType:"REGION3D",
            region3D:"{\"bounds\":{\"bottom\":39.5,\"center\":{\"x\":116.2,\"y\":40.0},\"height\":1.0,\"left\":115.4,\"leftBottom\":{\"x\":115.4,\"y\":39.5},\"right\":117.0,\"rightTop\":{\"x\":117.0,\"y\":40.5},\"top\":40.5,\"valid\":true,\"width\":1.6},\"id\":0,\"parts\":[4],\"points\":[{\"x\":115.4,\"y\":40.0,\"z\":-5.0},{\"x\":116.4,\"y\":39.5,\"z\":0.0},{\"x\":117.0,\"y\":40.5,\"z\":5.0},{\"x\":115.4,\"y\":40.0,\"z\":-5.0}],\"rotationX\":0.0,\"rotationY\":0.0,\"rotationZ\":0.0,\"scaleX\":0.0,\"scaleY\":0.0,\"scaleZ\":0.0,\"type\":\"REGION3D\"}",
            resultDataset:"cutfill", 
            buildPyramid:true,
            deleteExistResultDataset:true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/XX@Jingjin/terraincalculation/cutfill?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.resultDataset).toBe("cutfill");
            expect(paramsObj.deleteExistResultDataset).toBeTruthy();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据集XX@Jingjin不存在"}}`));
        });
        terrainCutFillCalculationService.processAsync(terrainCutFillCalculationParameters, TerrainCutFillCalculationServiceFailed);
    });
});



