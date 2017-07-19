require('../../../src/common/iServer/TerrainCurvatureCalculationService');

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;

var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
var options = {
    eventListeners:{"processCompleted": TerrainCurvatureCalculationServiceCompleted,
        'processFailed': TerrainCurvatureCalculationServiceFailed}
};
function initTerrainCurvatureCalculationService() {
    return new SuperMap.TerrainCurvatureCalculationService(spatialAnalystURL, options);
}
function TerrainCurvatureCalculationServiceCompleted(event){
    analystEventArgsSystem = event;
}
function TerrainCurvatureCalculationServiceFailed(event){
    serviceFailedEventArgsSystem = event;
}

describe('testTerrainCurvatureCalculationService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //成功事件
    it('pass',function(done){
        var terrainCurvatureCalculationService = initTerrainCurvatureCalculationService();
        expect(terrainCurvatureCalculationService).not.toBeNull();
        expect(terrainCurvatureCalculationService.url).toEqual(spatialAnalystURL);
        var terrainCurvatureCalculationParameters = new SuperMap.TerrainCurvatureCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: "CurvatureA_Test",
            deleteExistResultDataset: true
        });
        terrainCurvatureCalculationService.processAsync(terrainCurvatureCalculationParameters);
        terrainCurvatureCalculationService.events.on({"processCompleted":TerrainCurvatureCalculationServiceCompleted});

        setTimeout(function(){
            try{
                var terrainCurvatureCalculationResult = analystEventArgsSystem.result;
                expect(terrainCurvatureCalculationResult).not.toBeNull();
                expect(terrainCurvatureCalculationResult.succeed).toBeTruthy();
                expect(terrainCurvatureCalculationResult.averageCurvatureResult.dataset).toBe("CurvatureA_Test@Jingjin");
                terrainCurvatureCalculationService.destroy();
                expect(terrainCurvatureCalculationService.events).toBeNull();
                expect(terrainCurvatureCalculationService.eventListeners).toBeNull();
                terrainCurvatureCalculationParameters.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("TerrainCurvatureCalculationService_" + exception.name + ":" + exception.message);
                terrainCurvatureCalculationService.destroy();
                terrainCurvatureCalculationParameters.destroy();
                done();
            }
        },10000);
    });

    //测试失败事件
    it('failed',function(done){
        var terrainCurvatureCalculationService = initTerrainCurvatureCalculationService();
        var terrainCurvatureCalculationParameters = new SuperMap.TerrainCurvatureCalculationParameters({
            dataset: "XX@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: "CurvatureA_Test",
            deleteExistResultDataset: true
        });
        terrainCurvatureCalculationService.processAsync(terrainCurvatureCalculationParameters);
        terrainCurvatureCalculationService.events.on({'processFailed': TerrainCurvatureCalculationServiceFailed});

        setTimeout(function(){
            try{
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
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("TerrainCurvatureCalculationService_" + exception.name + ":" + exception.message);
                terrainCurvatureCalculationService.destroy();
                terrainCurvatureCalculationParameters.destroy();
                done();
            }
        },10000);
    });
});



