import {ConnectedEdgesAnalystService} from '@supermap/iclient-common/iServer/ConnectedEdgesAnalystService';
import {ConnectedEdgesAnalystParameters} from '@supermap/iclient-common/iServer/ConnectedEdgesAnalystParameters';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';


var serviceFailedEventArgsSystem = null,analystEventArgsSystem = null;
var initConnectedEdgesAnalystService = (url,analyzeCompleted,analyzeFailed) => {
    return new ConnectedEdgesAnalystService(url,
        {
            eventListeners: {
                "processCompleted": analyzeCompleted,
                'processFailed': analyzeFailed
            }
        });
};

describe('ConnectedEdgesAnalystService', () => {
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
        var connectedEdgesAnalystService = new ConnectedEdgesAnalystService(GlobeParameter.networkAnalystURL, { headers: myHeaders });
        expect(connectedEdgesAnalystService).not.toBeNull();
        expect(connectedEdgesAnalystService.headers).not.toBeNull();
        connectedEdgesAnalystService.destroy();
    });
    
    it('crossOrigin', () => {
        var connectedEdgesAnalystService = new ConnectedEdgesAnalystService(GlobeParameter.networkAnalystURL, { crossOrigin: false });
        expect(connectedEdgesAnalystService).not.toBeNull();
        expect(connectedEdgesAnalystService.crossOrigin).toBeFalsy();
        connectedEdgesAnalystService.destroy();
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
                connectedEdgesAnalystService.destroy();
                expect(connectedEdgesAnalystService.events).toBeNull();
                expect(connectedEdgesAnalystService.eventListeners).toBeNull();
                connectedEdgesAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ConnectedEdgesAnalystService" + exception.name + ":" + exception.message);
                connectedEdgesAnalystService.destroy();
                connectedEdgesAnalystParameters.destroy();
                done();
            }
        };
        var connectedEdgesAnalystService = initConnectedEdgesAnalystService(networkAnalystURL,analyzeCompleted,analyzeFailed);
        var connectedEdgesAnalystParameters = new ConnectedEdgesAnalystParameters({
            connected: false,
            returnFeatures: true,
            edgeIDs:[2,3,500]
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(networkAnalystURL + "/connectededges");
            expect(options).not.toBeNull();
            expect(options.connected).toBeFalsy();
            return Promise.resolve(new Response(JSON.stringify(streamFacilityAnalystResultJson)));
        });
        connectedEdgesAnalystService.processAsync(connectedEdgesAnalystParameters);
    });

    //参数不对
    it('processAsync_fail', (done) => {
        var networkAnalystURL = GlobeParameter.networkAnalystURL;
        var flag = false;
        var analyzeCompleted = (serviceSucceedEventArgsSystem) => {
            flag = true;
        };
        var analyzeFailed = (serviceFailedEventArgs) => {
            flag = true;
        };
        var connectedEdgesAnalystService = initConnectedEdgesAnalystService(networkAnalystURL,analyzeCompleted,analyzeFailed);
        // edgeIDs和nodeIDs同时没有
        var connectedEdgesAnalystParameters1 = new ConnectedEdgesAnalystParameters({});
        // edgeIDs和nodeIDs同时拥有
        var connectedEdgesAnalystParameters2 = new ConnectedEdgesAnalystParameters({
            edgeIDs:[1],
            nodeIDs:[1]
        });
        connectedEdgesAnalystService.processAsync(connectedEdgesAnalystParameters1);
        connectedEdgesAnalystService.processAsync(connectedEdgesAnalystParameters2);
        expect(flag).toBeFalsy;
        done();
    });

});