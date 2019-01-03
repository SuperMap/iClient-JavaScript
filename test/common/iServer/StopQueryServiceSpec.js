import {StopQueryService} from '../../../src/common/iServer/StopQueryService';
import {StopQueryParameters} from '../../../src/common/iServer/StopQueryParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var trafficTransferURL = GlobeParameter.trafficTransferURL;
var stopQueryServiceEventArgsSystem = null, serviceFailedEventArgsSystem = null;
var succeed = (event) => {
    stopQueryServiceEventArgsSystem = event;
};
var failed = (event) => {
    serviceFailedEventArgsSystem = event;
};
var initStopQueryService = () => {
    return new StopQueryService(trafficTransferURL, {
        eventListeners: {
            processCompleted: succeed,
            processFailed: failed
        }
    });
};

describe('StopQueryService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        stopQueryServiceEventArgsSystem = null;
        serviceFailedEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('processAsync_noParams', (done) => {
        var stopQueryService = initStopQueryService();
        stopQueryService.processAsync();
        setTimeout(() => {
            try {
                expect((stopQueryService.processAsync()) === undefined).toBeTruthy();
                stopQueryService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("StopQueryService_" + exception.name + ":" + exception.message);
                stopQueryService.destroy();
                done();
            }
        }, 2000);
    });

    it('success:processAsync_returnPosition', (done) => {
        var stopQueryService = initStopQueryService();
        var stopQueryServiceParams = new StopQueryParameters({
            keyWord: '人民',
            returnPosition: true
        });
        spyOn(FetchRequest, 'get').and.callFake(() => {
            return Promise.resolve(new Response(`[{"name":"人民广场","alias":null,"stopID":164,"id":164,"position":{"x":5308.614037099708,"y":-3935.573639156803}}]`));
        });
        stopQueryService.processAsync(stopQueryServiceParams);
        setTimeout(() => {
            try {
                expect(stopQueryServiceEventArgsSystem.result).not.toBeNull();
                expect(stopQueryServiceEventArgsSystem.result[0].position).not.toBeNull();
                stopQueryService.destroy();
                expect(stopQueryService.eventListeners).toBeNull();
                expect(stopQueryService.events).toBeNull();
                stopQueryServiceParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("StopQueryService_" + exception.name + ":" + exception.message);
                stopQueryService.destroy();
                stopQueryServiceParams.destroy();
                done();
            }
        }, 2000);
    });

    it('success:processAsync_returnPosition:false', (done) => {
        var stopQueryService = initStopQueryService();
        var stopQueryServiceParams = new StopQueryParameters({
            keyWord: '人民',
            returnPosition: false
        });
        spyOn(FetchRequest, 'get').and.callFake(() => {
            return Promise.resolve(new Response(`[{"name":"人民广场","alias":null,"stopID":164,"id":164,"position":null}]`));
        });
        stopQueryService.processAsync(stopQueryServiceParams);
        setTimeout(() => {
            try {
                var result = stopQueryServiceEventArgsSystem.result;
                expect(result).not.toBeNull();
                expect(result[0].position).toBeNull();
                expect(result[0]).not.toBeNull();
                stopQueryService.destroy();
                stopQueryServiceParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("StopQueryService_" + exception.name + ":" + exception.message);
                stopQueryService.destroy();
                stopQueryServiceParams.destroy();
                done();
            }
        }, 2000);
    })
});
