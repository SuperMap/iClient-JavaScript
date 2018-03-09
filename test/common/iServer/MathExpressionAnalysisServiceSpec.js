import {MathExpressionAnalysisService} from '../../../src/common/iServer/MathExpressionAnalysisService';
import {MathExpressionAnalysisParameters} from '../../../src/common/iServer/MathExpressionAnalysisParameters';
import request from 'request';

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
var options = {
    eventListeners: {
        'processFailed': MathExpressionAnalysisServiceFailed,
        'processCompleted': MathExpressionAnalysisServiceCompleted
    }
};
var initMathExpressionAnalysisService = () => {
    return new MathExpressionAnalysisService(spatialAnalystURL, options);
}
var MathExpressionAnalysisServiceCompleted = (getMapStatusEventArgs) => {
    analystEventArgsSystem = getMapStatusEventArgs;
}
var MathExpressionAnalysisServiceFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('MathExpressionAnalysisService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "MathExpression_commonTest";
    //通过的情况
    it('pass:processAsync', (done) => {
        var mathExpressionAnalysisService = initMathExpressionAnalysisService();
        expect(mathExpressionAnalysisService).not.toBeNull();
        expect(mathExpressionAnalysisService.url).toEqual(spatialAnalystURL);
        var mathExpressionAnalysisParameters = new MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "Jingjin",
            resultGridName: resultDataset,
            deleteExistResultDataset: true
        });
        mathExpressionAnalysisService.processAsync(mathExpressionAnalysisParameters);
        mathExpressionAnalysisService.events.on({"processCompleted": MathExpressionAnalysisServiceCompleted});
        setTimeout(() => {
            try {
                var mathExpressionAnalysisResult = analystEventArgsSystem.result;
                expect(mathExpressionAnalysisResult).not.toBeNull();
                expect(mathExpressionAnalysisResult.dataset).not.toBeNull();
                mathExpressionAnalysisService.destroy();
                expect(mathExpressionAnalysisService.EVENT_TYPES).toBeNull();
                expect(mathExpressionAnalysisService.events).toBeNull();
                expect(mathExpressionAnalysisService.eventListeners).toBeNull();
                mathExpressionAnalysisParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MathExpressionAnalysisService_" + exception.name + ":" + exception.message);
                mathExpressionAnalysisService.destroy();
                mathExpressionAnalysisParameters.destroy();
                done();
            }
        }, 10000);
    });

    it('fail:processAsync', (done) => {
        var mathExpressionAnalysisService = initMathExpressionAnalysisService();
        expect(mathExpressionAnalysisService).not.toBeNull();
        var mathExpressionAnalysisParameters = new MathExpressionAnalysisParameters({
            dataset: "XX@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "XX",
            resultGridName: "MathExpressionFail_commonTest",
            deleteExistResultDataset: true
        });
        mathExpressionAnalysisService.processAsync(mathExpressionAnalysisParameters);
        mathExpressionAnalysisService.events.on({"processFailed": MathExpressionAnalysisServiceFailed});
        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                mathExpressionAnalysisService.destroy();
                mathExpressionAnalysisParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MathExpressionAnalysisService_" + exception.name + ":" + exception.message);
                mathExpressionAnalysisService.destroy();
                mathExpressionAnalysisParameters.destroy();
                done();
            }
        }, 6000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done) => {
        var testResult = GlobeParameter.datajingjinURL + resultDataset;
        request.delete(testResult);
        done();
    });
});

