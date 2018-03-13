import {TransferPathService} from '../../../src/common/iServer/TransferPathService';
import {TransferPathParameters} from '../../../src/common/iServer/TransferPathParameters';

var trafficTransferURL = GlobeParameter.trafficTransferURL;
var serviceFailedEventArgsSystem = null, analystEventArgsSystem = null;
var succeed = (event) => {
    analystEventArgsSystem = event;
};
var failed = (event) => {
    serviceFailedEventArgsSystem = event;
};
var options = {
    eventListeners: {
        "processCompleted": succeed,
        "processFailed": failed
    }
};
var initTransferPathService = () => {
    return new TransferPathService(trafficTransferURL, options);
};

describe('TransferPathService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('processAsync_noParams', (done) => {
        var service = initTransferPathService();
        service.processAsync();
        setTimeout(() => {
            try {
                expect(typeof(service.processAsync()) === "undefined").toBeTruthy();
                service.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TransferPathService_" + exception.name + ":" + exception.message);
                service.destroy();
                done();
            }
        }, 1500)
    });

    it('success:processAsync', (done) => {
        var service = initTransferPathService();
        var params = new TransferPathParameters({
            transferLines: [
                {"lineID": 27, "startStopIndex": 3, "endStopIndex": 4},
                {"lineID": 12, "startStopIndex": 5, "endStopIndex": 9}
            ],
            points: [175, 164]
        });
        service.processAsync(params);

        setTimeout(() => {
            try {
                var result = analystEventArgsSystem.result;
                expect(result).not.toBeNull();
                expect(result.succeed).toBeTruthy();
                expect(result.items.length).toBeGreaterThan(0);
                expect(result.count).toEqual(4);
                expect(result.totalDistance).toEqual(3732.3529872895324);
                service.destroy();
                expect(service.events).toBeNull();
                expect(service.eventListeners).toBeNull();
                params.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TransferPathService_" + exception.name + ":" + exception.message);
                service.destroy();
                params.destroy();
                done();
            }
        }, 1500);
    })
});
