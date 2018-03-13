import {UpdateEdgeWeightService} from '../../../src/common/iServer/UpdateEdgeWeightService';

var networkAnalystURL = GlobeParameter.networkAnalystURL;
var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var updateEdgeWeightFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var updateEdgeWeightCompleted = (serviceCompletedEventArgs) => {
    serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
};
var initUpdateEdgeWeightService_RegisterListener = () => {
    return new UpdateEdgeWeightService(networkAnalystURL,
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

    it('processAsync_noParams', (done) => {
        var myUpdateEdgeWeightService = initUpdateEdgeWeightService_RegisterListener();
        expect(myUpdateEdgeWeightService).not.toBeNull();
        myUpdateEdgeWeightService.processAsync();
        setTimeout(() => {
            try {
                expect(typeof(myUpdateEdgeWeightService.processAsync()) === "undefined").toBeTruthy();
                myUpdateEdgeWeightService.destroy();
                expect(myUpdateEdgeWeightService.EVENT_TYPES).toBeNull();
                expect(myUpdateEdgeWeightService.events).toBeNull();
                expect(myUpdateEdgeWeightService.eventListeners).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("UpdateEdgeWeightService_" + exception.name + ":" + exception.message);
                myUpdateEdgeWeightService.destroy();
                done();
            }
        }, 2000)
    });
});