import {MathExpressionAnalysisService} from '../../../src/common/iServer/MathExpressionAnalysisService';
import {MathExpressionAnalysisParameters} from '../../../src/common/iServer/MathExpressionAnalysisParameters';
import request from 'request';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var initMathExpressionAnalysisService = (url,MathExpressionAnalysisServiceFailed,MathExpressionAnalysisServiceCompleted) => {
    return new MathExpressionAnalysisService(url, {
        eventListeners: {
            'processFailed': MathExpressionAnalysisServiceFailed,
            'processCompleted': MathExpressionAnalysisServiceCompleted
        }
    });
};
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
    
    it('headers', () => {
      let myHeaders = new Headers();
      var mathExpressionAnalysisService = new MathExpressionAnalysisService(GlobeParameter.spatialAnalystURL, { headers: myHeaders });
      expect(mathExpressionAnalysisService).not.toBeNull();
      expect(mathExpressionAnalysisService.headers).not.toBeNull();
      mathExpressionAnalysisService.destroy();
    });
    
    it('crossOrigin', () => {
        var mathExpressionAnalysisService = new MathExpressionAnalysisService(GlobeParameter.spatialAnalystURL, { crossOrigin: false });
        expect(mathExpressionAnalysisService).not.toBeNull();
        expect(mathExpressionAnalysisService.crossOrigin).toBeFalsy();
        mathExpressionAnalysisService.destroy();
    });

    //通过的情况
    it('pass:processAsync', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var MathExpressionAnalysisServiceCompleted = (getMapStatusEventArgs) => {
            analystEventArgsSystem = getMapStatusEventArgs;
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
        };
        var MathExpressionAnalysisServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var mathExpressionAnalysisService = initMathExpressionAnalysisService(spatialAnalystURL,MathExpressionAnalysisServiceFailed,MathExpressionAnalysisServiceCompleted);
        expect(mathExpressionAnalysisService).not.toBeNull();
        expect(mathExpressionAnalysisService.url).toEqual(spatialAnalystURL);
        var mathExpressionAnalysisParameters = new MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "Jingjin",
            resultGridName: resultDataset,
            deleteExistResultDataset: true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/JingjinTerrain@Jingjin/mathanalyst?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.expression).toBe("[Jingjin.JingjinTerrain] + 600");
            expect(paramsObj.resultGridName).toBe("MathExpression_commonTest");
            return Promise.resolve(new Response(`{"succeed":true,"recordset":null,"message":null,"dataset":"MathExpression_commonTest@Jingjin"}`));
        });
        mathExpressionAnalysisService.processAsync(mathExpressionAnalysisParameters);
        mathExpressionAnalysisService.events.on({"processCompleted": MathExpressionAnalysisServiceCompleted});
    });

    it('fail:processAsync', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var MathExpressionAnalysisServiceCompleted = (getMapStatusEventArgs) => {
            analystEventArgsSystem = getMapStatusEventArgs;
        };
        var MathExpressionAnalysisServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
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
        };
        var mathExpressionAnalysisService = initMathExpressionAnalysisService(spatialAnalystURL,MathExpressionAnalysisServiceFailed,MathExpressionAnalysisServiceCompleted);
        expect(mathExpressionAnalysisService).not.toBeNull();
        var mathExpressionAnalysisParameters = new MathExpressionAnalysisParameters({
            dataset: "XX@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "XX",
            resultGridName: "MathExpressionFail_commonTest",
            deleteExistResultDataset: true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/XX@Jingjin/mathanalyst?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.expression).toBe("[Jingjin.JingjinTerrain] + 600");
            expect(paramsObj.resultGridName).toBe("MathExpressionFail_commonTest");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据集XX@Jingjin不存在"}}`));
        });
        mathExpressionAnalysisService.processAsync(mathExpressionAnalysisParameters);
        mathExpressionAnalysisService.events.on({"processFailed": MathExpressionAnalysisServiceFailed});
    });
});

