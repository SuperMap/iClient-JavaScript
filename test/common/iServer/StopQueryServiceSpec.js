import {StopQueryService} from '../../../src/common/iServer/StopQueryService';
import {StopQueryParameters} from '../../../src/common/iServer/StopQueryParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var stopQueryServiceEventArgsSystem = null, serviceFailedEventArgsSystem = null;
var initStopQueryService = (url) => {
    return new StopQueryService(url);
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
        var stopQueryService = initStopQueryService(trafficTransferURL);
        stopQueryService.processAsync(succeed);
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
        var stopQueryService = initStopQueryService(trafficTransferURL);
        var stopQueryServiceParams = new StopQueryParameters({
            keyWord: '人民',
            returnPosition: true
        });
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            expect(testUrl).toBe(trafficTransferURL+"/stops/keyword/人民");
            return Promise.resolve(new Response(`[{"name":"人民广场","alias":null,"stopID":164,"id":164,"position":{"x":5308.614037099708,"y":-3935.573639156803}}]`));
        });
        stopQueryService.processAsync(stopQueryServiceParams, succeed);
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
        var stopQueryService = initStopQueryService(trafficTransferURL);
        var stopQueryServiceParams = new StopQueryParameters({
            keyWord: '人民',
            returnPosition: false
        });
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            expect(testUrl).toBe(trafficTransferURL+"/stops/keyword/人民");
            return Promise.resolve(new Response(`[{"name":"人民广场","alias":null,"stopID":164,"id":164,"position":null}]`));
        });
        stopQueryService.processAsync(stopQueryServiceParams, succeed);
    })
    it('success:processAsync_customQueryParam', (done) => {
        var trafficTransferURL = GlobeParameter.trafficTransferURL;
        var succeed = (event) => {
            stopQueryServiceEventArgsSystem = event;
            try {
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
        var stopQueryService = initStopQueryService(trafficTransferURL + '?key=123');
        var stopQueryServiceParams = new StopQueryParameters({
            keyWord: '人民',
            returnPosition: false
        });
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            expect(testUrl).toBe(trafficTransferURL+"/stops/keyword/人民?key=123");
            return Promise.resolve(new Response(`[{"name":"人民广场","alias":null,"stopID":164,"id":164,"position":null}]`));
        });
        stopQueryService.processAsync(stopQueryServiceParams, succeed);
    })
});
