import {TransferPathService} from '../../../src/common/iServer/TransferPathService';
import {TransferPathParameters} from '../../../src/common/iServer/TransferPathParameters';
import {FetchRequest} from "@supermap/iclient-common";

var trafficTransferURL = GlobeParameter.trafficTransferURL;
var serviceFailedEventArgsSystem = null, analystEventArgsSystem = null;
var initTransferPathService = (url,succeed,failed) => {
    return new TransferPathService(trafficTransferURL, {
        eventListeners: {
            "processCompleted": succeed,
            "processFailed": failed
        }
    });
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

    it('headers', () => {
        let myHeaders = new Headers();
        var transferPathService = new TransferPathService(trafficTransferURL, { headers: myHeaders });
        expect(transferPathService).not.toBeNull();
        expect(transferPathService.headers).not.toBeNull();
        transferPathService.destroy();
    });
    
    it('crossOrigin', () => {
        var transferPathService = new TransferPathService(trafficTransferURL, { crossOrigin: false });
        expect(transferPathService).not.toBeNull();
        expect(transferPathService.crossOrigin).toBeFalsy();
        transferPathService.destroy();
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
        var succeed = (event) => {
            analystEventArgsSystem = event;
            try {
                var result = analystEventArgsSystem.result;
                expect(result).not.toBeNull();
                expect(result.succeed).toBeTruthy();
                expect(result.items.length).toBeGreaterThan(0);
                expect(result.count).toEqual(1);
                expect(result.totalDistance).toBeCloseTo(3732.3529872895324);
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
        };
        var failed = (event) => {
            serviceFailedEventArgsSystem = event;
        };
        var service = initTransferPathService(trafficTransferURL,succeed,failed);
        var params = new TransferPathParameters({
            transferLines: [
                {"lineID": 27, "startStopIndex": 3, "endStopIndex": 4},
                {"lineID": 12, "startStopIndex": 5, "endStopIndex": 9}
            ],
            points: [175, 164]
        });
        spyOn(FetchRequest, 'commit').and.callFake((method,testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(trafficTransferURL+"/path.json?");
            return Promise.resolve(new Response(JSON.stringify(transferPathServiceResult)));
        });
        service.processAsync(params);
    })
});
