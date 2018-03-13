import {TransferSolutionService} from '../../../src/common/iServer/TransferSolutionService';
import {TransferSolutionParameters} from '../../../src/common/iServer/TransferSolutionParameters';
import {TransferTactic} from '../../../src/common/REST';
import {TransferPreference} from '../../../src/common/REST';

var trafficTransferURL = GlobeParameter.trafficTransferURL;
var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var succeed = (event) => {
    serviceCompletedEventArgsSystem = event;
};
var failed = (event) => {
    serviceFailedEventArgsSystem = event;
};
var initTransferSolutionService = () => {
    return new TransferSolutionService(trafficTransferURL, {
        eventListeners: {
            processCompleted: succeed,
            processFailed: failed
        }
    });
};

describe('TransferSolutionService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('processAsync_noParams', (done) => {
        var service = initTransferSolutionService();
        service.processAsync();

        setTimeout(() => {
            try {
                expect(typeof(service.processAsync()) === "undefined").toBeTruthy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TransferSolutionService_" + exception.name + ":" + exception.message);
                service.destroy();
                done();
            }
        }, 2000);
    });

    it('success:processAsync', (done) => {
        var service = initTransferSolutionService();
        var params = new TransferSolutionParameters({
            solutionCount: 5,
            transferTactic: TransferTactic.LESS_TIME,
            transferPreference: TransferPreference.NONE,
            walkingRatio: 10,
            points: [175, 179]
        });
        service.events.on({"processCompleted": succeed});
        service.processAsync(params);
        setTimeout(() => {
            try {
                var result = serviceCompletedEventArgsSystem.result;
                expect(result).not.toBeNull();
                expect(result.defaultGuide).not.toBeNull();
                expect(result.defaultGuide.count).toEqual(5);
                expect(result.solutionItems).not.toBeNull();
                service.destroy();
                expect(service.events == null).toBeTruthy();
                expect(service.eventListeners == null).toBeTruthy();
                params.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TransferSolutionService_" + exception.name + ":" + exception.message);
                service.destroy();
                params.destroy();
                done();
            }
        }, 2000);
    });
});
