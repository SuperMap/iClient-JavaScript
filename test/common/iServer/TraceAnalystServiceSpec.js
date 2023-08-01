import {TraceAnalystService} from '../../../src/common/iServer/TraceAnalystService';
import {TraceAnalystParameters} from '../../../src/common/iServer/TraceAnalystParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';


var serviceFailedEventArgsSystem = null,analystEventArgsSystem = null;
var initTraceAnalystService = (url,analyzeCompleted,analyzeFailed) => {
    return new TraceAnalystService(url,
        {
            eventListeners: {
                "processCompleted": analyzeCompleted,
                'processFailed': analyzeFailed
            }
        });
};

describe('TraceAnalystService', () => {
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
        var traceAnalystService = new TraceAnalystService(GlobeParameter.networkAnalystURL, { headers: myHeaders });
        expect(traceAnalystService).not.toBeNull();
        expect(traceAnalystService.headers).not.toBeNull();
        traceAnalystService.destroy();
    });
    
    it('crossOrigin', () => {
        var traceAnalystService = new TraceAnalystService(GlobeParameter.networkAnalystURL, { crossOrigin: false });
        expect(traceAnalystService).not.toBeNull();
        expect(traceAnalystService.crossOrigin).toBeFalsy();
        traceAnalystService.destroy();
    });

    //成功事件
    it('processAsync_success', (done) => {
        var networkAnalystURL = GlobeParameter.networkAnalystURL;
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
            try {
                var result = analystEventArgsSystem.result;
                expect(result).not.toBeNull();
                expect(result.nodes.length).toBe(1);
                traceAnalystService.destroy();
                expect(traceAnalystService.events).toBeNull();
                expect(traceAnalystService.eventListeners).toBeNull();
                traceAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TraceAnalystService" + exception.name + ":" + exception.message);
                traceAnalystService.destroy();
                traceAnalystParameters.destroy();
                done();
            }
        };
        var traceAnalystService = initTraceAnalystService(networkAnalystURL,analyzeCompleted,analyzeFailed);
        var traceAnalystParameters = new TraceAnalystParameters({
            edgeID:336,
            // nodeID:336,
            // 0:上游； 1：下游
            traceType:0,
            weightName:"",
            isUncertainDirectionValid: true,
            returnFeatures: true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(networkAnalystURL + "/traceup");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(streamFacilityAnalystResultJson)));
        });
        traceAnalystService.processAsync(traceAnalystParameters);
    });

    //参数不对,不发请求
    it('processAsync_fail', (done) => {
        var networkAnalystURL = GlobeParameter.networkAnalystURL;
        var flag = false;
        var analyzeCompleted = (serviceSucceedEventArgsSystem) => {
            flag = true;
        };
        var analyzeFailed = (serviceFailedEventArgs) => {
            flag = true;
        };
        var traceAnalystService = initTraceAnalystService(networkAnalystURL,analyzeCompleted,analyzeFailed);
        // edgeID和nodeID同时没有
        var traceAnalystParameters1 = new TraceAnalystParameters({
            traceType:1,
            weightName:"",
            isUncertainDirectionValid: true,
            returnFeatures: true
        });
        // edgeID和nodeID同时拥有
        var traceAnalystParameters2 = new TraceAnalystParameters({
            edgeID:336,
            nodeID:336,
            traceType:1,
            weightName:"",
            isUncertainDirectionValid: true,
            returnFeatures: true
        });
        // 没有traceType
        var traceAnalystParameters3 = new TraceAnalystParameters({
            edgeID:336,
            weightName:"",
            isUncertainDirectionValid: true,
            returnFeatures: true
        });
        traceAnalystService.processAsync(traceAnalystParameters1);
        traceAnalystService.processAsync(traceAnalystParameters2);
        traceAnalystService.processAsync(traceAnalystParameters3);
        expect(flag).toBeFalsy;
        done();
    });

});