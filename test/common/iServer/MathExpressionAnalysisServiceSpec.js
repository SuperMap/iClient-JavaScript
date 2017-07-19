require('../../../src/common/iServer/MathExpressionAnalysisService');

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
var options =  {
    eventListeners: {
        'processFailed':MathExpressionAnalysisServiceFailed,
        'processCompleted':MathExpressionAnalysisServiceCompleted
    }
};
function initMathExpressionAnalysisService() {
    return new SuperMap.MathExpressionAnalysisService(spatialAnalystURL, options);
}
function MathExpressionAnalysisServiceCompleted(getMapStatusEventArgs){
    analystEventArgsSystem = getMapStatusEventArgs;
}
function MathExpressionAnalysisServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('testMathExpressionAnalysisService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //通过的情况
    it('pass',function(done){
        var mathExpressionAnalysisService = initMathExpressionAnalysisService();
        expect(mathExpressionAnalysisService).not.toBeNull();
        expect(mathExpressionAnalysisService.url).toEqual(spatialAnalystURL);
        var mathExpressionAnalysisParameters = new SuperMap.MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            "expression": "[Jingjin.JingjinTerrain] + 600",
            "targetDatasource": "Jingjin",
            "resultGridName": "MathExpressionAnalysis_Result",
            deleteExistResultDataset: true
        });
        mathExpressionAnalysisService.processAsync(mathExpressionAnalysisParameters);
        mathExpressionAnalysisService.events.on({"processCompleted":MathExpressionAnalysisServiceCompleted});

        setTimeout(function() {
            try{
                var mathExpressionAnalysisResult = analystEventArgsSystem.result;
                expect(mathExpressionAnalysisResult).not.toBeNull();
                expect(mathExpressionAnalysisResult.dataset).not.toBeNull();
                mathExpressionAnalysisService.destroy();
                expect(mathExpressionAnalysisService.EVENT_TYPES).toBeNull();
                expect(mathExpressionAnalysisService.events).toBeNull();
                expect(mathExpressionAnalysisService.eventListeners).toBeNull();
                mathExpressionAnalysisParameters.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("MathExpressionAnalysisService_" + exception.name + ":" + exception.message);
                mathExpressionAnalysisService.destroy();
                mathExpressionAnalysisParameters.destroy();
                done();
            }
        },10000);
    });

    it('fail',function(done){
        var mathExpressionAnalysisService = initMathExpressionAnalysisService();
        expect(mathExpressionAnalysisService).not.toBeNull();
        var mathExpressionAnalysisParameters = new SuperMap.MathExpressionAnalysisParameters({
            dataset: "XX@Jingjin",
            "expression": "[Jingjin.JingjinTerrain] + 600",
            "targetDatasource": "XX",
            "resultGridName": "MathExpressionAnalysis_Result_Test",
            deleteExistResultDataset: true
        });
        mathExpressionAnalysisService.processAsync(mathExpressionAnalysisParameters);
        mathExpressionAnalysisService.events.on({"processFailed":MathExpressionAnalysisServiceFailed});

        setTimeout(function() {
            try{
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                mathExpressionAnalysisService.destroy();
                mathExpressionAnalysisParameters.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("MathExpressionAnalysisService_" + exception.name + ":" + exception.message);
                mathExpressionAnalysisService.destroy();
                mathExpressionAnalysisParameters.destroy();
                done();
            }
        },6000);
    })
});

