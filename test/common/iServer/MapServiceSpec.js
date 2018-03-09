﻿import {MapService} from '../../../src/common/iServer/MapService';

var worldMapURL = GlobeParameter.worldMapURL;
//初始化注册事件监听器的Services
var getMapStatusEventArgsSystem = null;
var serviceFailedEventArgsSystem = null;
var GetMapStatusCompleted = (getMapStatusEventArgs) => {
    getMapStatusEventArgsSystem = getMapStatusEventArgs;
};
var GetMapStatusFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var initMapService_RegisterListener = () => {
    return new MapService(worldMapURL, {
            eventListeners: {'processFailed': GetMapStatusFailed, 'processCompleted': GetMapStatusCompleted}
        }
    );
};

describe('MapService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor_token', () => {
        var getMapService = new MapService(worldMapURL, {token: 88888});
        expect(getMapService).not.toBeNull();
        expect(getMapService.token).toEqual(88888);
        getMapService.destroy();
    });

    //通过的情况
    it('success:processAsync', (done) => {
        var getMapService = initMapService_RegisterListener();
        expect(getMapService).not.toBeNull();
        expect(getMapService.url).toEqual(worldMapURL);
        getMapService.processAsync();
        setTimeout(() => {
            try {
                var getMapStatusResult = getMapStatusEventArgsSystem.result;
                expect(getMapStatusEventArgsSystem).not.toBeNull();
                expect(getMapStatusResult).not.toBeNull();
                expect(getMapStatusResult.scale).toEqual(4.6292443017131065e-9);
                expect(getMapStatusResult.bounds.bottom).toEqual(-90);
                expect(getMapStatusResult.bounds.left).toEqual(-180);
                expect(getMapStatusResult.viewBounds.bottom).toEqual(-65.71902951328238);
                expect(getMapStatusResult.viewBounds.left).toEqual(-65.71902951328238);
                expect(getMapStatusResult.viewer).not.toBeNull();
                expect(getMapStatusResult.viewer.height).toEqual(256);
                expect(getMapStatusResult.viewer.width).toEqual(256);
                getMapService.destroy();
                expect(getMapService.EVENT_TYPES).toBeNull();
                expect(getMapService.events).toBeNull();
                expect(getMapService.eventListeners).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MapService_" + exception.name + ":" + exception.message);
                getMapService.destroy();
                done();
            }
        }, 2000);
    });

    it('fail:processAsync', (done) => {
        var mapServiceURL = GlobeParameter.mapServiceURL;
        var getMapService = new MapService(mapServiceURL + "MapNameError");
        getMapService.events.on({'processFailed': GetMapStatusFailed});
        getMapService.processAsync();
        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(404);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MapService_" + exception.name + ":" + exception.message);
                getMapService.destroy();
                done();
            }
        }, 2000);
    })
});
