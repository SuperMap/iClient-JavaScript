import {GetLayersInfoService} from '../../../src/common/iServer/GetLayersInfoService';

var serviceFailedEventArgsSystem = null;
var getFieldsEventArgsSystem = null;
var initGetLayersInfoService = (url) => {
    return new GetLayersInfoService(url, options);
};
var getLayersInfoServiceCompleted = (result) => {
    getFieldsEventArgsSystem = result;
};
var getLayersInfoServiceFailed = (result) => {
    serviceFailedEventArgsSystem = result;
};
var options = {
    eventListeners: {
        processCompleted: getLayersInfoServiceCompleted,
        processFailed: getLayersInfoServiceFailed
    }
};

describe('GetLayersInfoService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor, destroy', () => {
        var vectorURL = GlobeParameter.vectorURL;
        var getLayersInfoService = initGetLayersInfoService(vectorURL);
        expect(getLayersInfoService).not.toBeNull();
        getLayersInfoService.destroy();
        expect(getLayersInfoService.events).toBeNull();
        expect(getLayersInfoService.eventListeners).toBeNull();
    });

    it('processAsync_Vector', (done) => {
        var vectorURL = GlobeParameter.vectorURL;
        var getLayersInfoService = initGetLayersInfoService(vectorURL);
        getLayersInfoService.processAsync();
        setTimeout(() => {
            try {
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.subLayers.layers).not.toBeNull();
                getLayersInfoService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetLayersInfoService_" + exception.name + ":" + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        }, 2000);
    });

    it('processAsync_image', (done) => {
        var imageURL = GlobeParameter.imageURL;
        var getLayersInfoService = initGetLayersInfoService(imageURL);
        getLayersInfoService.processAsync();
        setTimeout(() => {
            try {
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.subLayers.layers).not.toBeNull();
                getLayersInfoService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetLayersInfoService_" + exception.name + ":" + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        }, 2000);
    });

    it('processAsync_grid', (done) => {
        var gridURL = GlobeParameter.gridURL;
        var getLayersInfoService = initGetLayersInfoService(gridURL);
        getLayersInfoService.processAsync();
        setTimeout(() => {
            try {
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.subLayers.layers).not.toBeNull();
                getLayersInfoService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetLayersInfoService_" + exception.name + ":" + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        }, 2000);
    });
});
