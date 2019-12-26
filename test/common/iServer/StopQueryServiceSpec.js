import {StopQueryService} from '../../../src/common/iServer/StopQueryService';
import {StopQueryParameters} from '../../../src/common/iServer/StopQueryParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var stopQueryServiceEventArgsSystem = null, serviceFailedEventArgsSystem = null;
var initStopQueryService = (url,succeed,failed) => {
    return new StopQueryService(url, {
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

    it('headers', () => {
        let myHeaders = new Headers();
        var stopQueryService = new StopQueryService(GlobeParameter.trafficTransferURL, { headers: myHeaders });
        expect(stopQueryService).not.toBeNull();
        expect(stopQueryService.headers).not.toBeNull();
        stopQueryService.destroy();
    });
    
    it('crossOrigin', () => {
        var stopQueryService = new StopQueryService(GlobeParameter.trafficTransferURL, { crossOrigin: false });
        expect(stopQueryService).not.toBeNull();
        expect(stopQueryService.crossOrigin).toBeFalsy();
        stopQueryService.destroy();
    });

    it('processAsync_noParams', () => {
        var trafficTransferURL = GlobeParameter.trafficTransferURL;
        var flag=false;
        var succeed = (event) => {
            flag=true;
        };
        var failed = (event) => {
            flag=true;
        };
        var stopQueryService = initStopQueryService(trafficTransferURL,succeed,failed);
        stopQueryService.processAsync();
        expect(flag).toBeFalsy();
    });

    it('success:processAsync_returnPosition', (done) => {
        var trafficTransferURL = GlobeParameter.trafficTransferURL;
        var succeed = (event) => {
            stopQueryServiceEventArgsSystem = event;
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
        };
        var failed = (event) => {
            serviceFailedEventArgsSystem = event;
        };
        var stopQueryService = initStopQueryService(trafficTransferURL,succeed,failed);
        var stopQueryServiceParams = new StopQueryParameters({
            keyWord: '人民',
            returnPosition: true
        });
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            expect(testUrl).toBe(trafficTransferURL+"/stops/keyword/人民.json?");
            return Promise.resolve(new Response(`[{"name":"人民广场","alias":null,"stopID":164,"id":164,"position":{"x":5308.614037099708,"y":-3935.573639156803}}]`));
        });
        stopQueryService.processAsync(stopQueryServiceParams);
    });

    it('success:processAsync_returnPosition:false', (done) => {
        var trafficTransferURL = GlobeParameter.trafficTransferURL;
        var succeed = (event) => {
            stopQueryServiceEventArgsSystem = event;
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
        };
        var failed = (event) => {
            serviceFailedEventArgsSystem = event;

        };
        var stopQueryService = initStopQueryService(trafficTransferURL,succeed,failed);
        var stopQueryServiceParams = new StopQueryParameters({
            keyWord: '人民',
            returnPosition: false
        });
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            expect(testUrl).toBe(trafficTransferURL+"/stops/keyword/人民.json?");
            return Promise.resolve(new Response(`[{"name":"人民广场","alias":null,"stopID":164,"id":164,"position":null}]`));
        });
        stopQueryService.processAsync(stopQueryServiceParams);
    })
});
