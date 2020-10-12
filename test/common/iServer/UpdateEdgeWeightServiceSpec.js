import {UpdateEdgeWeightService} from '../../../src/common/iServer/UpdateEdgeWeightService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var initUpdateEdgeWeightService_RegisterListener = (url,updateEdgeWeightFailed,updateEdgeWeightCompleted) => {
    return new UpdateEdgeWeightService(url,
        {
            eventListeners: {
                'processFailed': updateEdgeWeightFailed,
                'processCompleted': updateEdgeWeightCompleted
            }
        }
    );
};

describe('UpdateEdgeWeightService', () => {
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
        var myUpdateEdgeWeightService = new UpdateEdgeWeightService(GlobeParameter.networkAnalystURL, { headers: myHeaders });
        expect(myUpdateEdgeWeightService).not.toBeNull();
        expect(myUpdateEdgeWeightService.headers).not.toBeNull();
        myUpdateEdgeWeightService.destroy();
    });
    
    it('crossOrigin', () => {
        var myUpdateEdgeWeightService = new UpdateEdgeWeightService(GlobeParameter.networkAnalystURL, { crossOrigin: false });
        expect(myUpdateEdgeWeightService).not.toBeNull();
        expect(myUpdateEdgeWeightService.crossOrigin).toBeFalsy();
        myUpdateEdgeWeightService.destroy();
    });

    it('processAsync_noParams', (done) => {
        var networkAnalystURL = GlobeParameter.networkAnalystURL;
        var myUpdateEdgeWeightService;
        var updateEdgeWeightFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var updateEdgeWeightCompleted = (serviceCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
            try {
                expect(typeof(myUpdateEdgeWeightService.processAsync()) === "undefined").toBeTruthy();
                myUpdateEdgeWeightService.destroy();
                expect(myUpdateEdgeWeightService.EVENT_TYPES).toBeNull();
                expect(myUpdateEdgeWeightService.events).toBeNull();
                expect(myUpdateEdgeWeightService.eventListeners).toBeNull();
                expect(serviceCompletedEventArgsSystem).not.toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("UpdateEdgeWeightService_" + exception.name + ":" + exception.message);
                myUpdateEdgeWeightService.destroy();
                done();
            }
        };
        var updateEdgeWeightParam = new SuperMap.UpdateEdgeWeightParameters({
            edgeId:"20",
            fromNodeId:"26",
            toNodeId:"109",
            weightField:"time",
            edgeWeight:"25"
        });
        myUpdateEdgeWeightService = initUpdateEdgeWeightService_RegisterListener(networkAnalystURL,updateEdgeWeightFailed,updateEdgeWeightCompleted);
        expect(myUpdateEdgeWeightService).not.toBeNull();
        spyOn(FetchRequest, 'put').and.callFake((testUrl,params) => {
            expect(testUrl).toBe(networkAnalystURL+"/edgeweight/20/fromnode/26/tonode/109/weightfield/time");
            expect(params).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        myUpdateEdgeWeightService.processAsync(updateEdgeWeightParam);

    });
});