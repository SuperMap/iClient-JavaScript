import {UpdateTurnNodeWeightService} from '../../../src/common/iServer/UpdateTurnNodeWeightService';

var networkAnalystURL = GlobeParameter.networkAnalystURL;
var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var updateTurnNodeWeightFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var updateTurnNodeWeightCompleted = (serviceCompletedEventArgs) => {
    serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
};
var initUpdateTurnNodeWeightService_RegisterListener = () => {
    return new UpdateTurnNodeWeightService(networkAnalystURL,
        {
            eventListeners: {
                'processFailed': updateTurnNodeWeightFailed,
                'processCompleted': updateTurnNodeWeightCompleted
            }
        }
    );
};

describe('UpdateTurnNodeWeightService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('processAsync', (done) => {
        var myUpdateTurnNodeWeightService = initUpdateTurnNodeWeightService_RegisterListener();
        expect(myUpdateTurnNodeWeightService).not.toBeNull();
        myUpdateTurnNodeWeightService.processAsync();
        setTimeout(() => {
            try {
                expect(typeof(myUpdateTurnNodeWeightService.processAsync()) === "undefined").toBeTruthy();
                myUpdateTurnNodeWeightService.destroy();
                expect(myUpdateTurnNodeWeightService.EVENT_TYPES).toBeNull();
                expect(myUpdateTurnNodeWeightService.events).toBeNull();
                expect(myUpdateTurnNodeWeightService.eventListeners).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("UpdateTurnNodeWeightService_" + exception.name + ":" + exception.message);
                myUpdateTurnNodeWeightService.destroy();
                done();
            }
        }, 2000)
    })
});