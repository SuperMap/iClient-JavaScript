require('../../../src/common/iServer/GetLayersInfoService');

var serviceFailedEventArgsSystem = null;
var getFieldsEventArgsSystem = null;
var options = {
    eventListeners: {
        processCompleted: getLayersInfoServiceCompleted,
        processFailed: getLayersInfoServiceFailed
    }
};
function initGetLayersInfoService(url) {
    return new SuperMap.GetLayersInfoService(url, options);
}
function getLayersInfoServiceCompleted(result) {
    getFieldsEventArgsSystem = result;
}
function getLayersInfoServiceFailed(result) {
    serviceFailedEventArgsSystem = result;
}

describe('GetLayersInfoService', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor, destroy', function () {
        var vectorURL = GlobeParameter.vectorURL;
        var getLayersInfoService = initGetLayersInfoService(vectorURL);
        expect(getLayersInfoService).not.toBeNull();
        getLayersInfoService.destroy();
        expect(getLayersInfoService.events).toBeNull();
        expect(getLayersInfoService.eventListeners).toBeNull();
    });

    it('processAsync_Vector', function (done) {
        var vectorURL = GlobeParameter.vectorURL;
        var getLayersInfoService = initGetLayersInfoService(vectorURL);
        getLayersInfoService.processAsync();
        setTimeout(function () {
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

    it('processAsync_image', function (done) {
        var imageURL = GlobeParameter.imageURL;
        var getLayersInfoService = initGetLayersInfoService(imageURL);
        getLayersInfoService.processAsync();
        setTimeout(function () {
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

    it('processAsync_grid', function (done) {
        var gridURL = GlobeParameter.gridURL;
        var getLayersInfoService = initGetLayersInfoService(gridURL);
        getLayersInfoService.processAsync();
        setTimeout(function () {
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
