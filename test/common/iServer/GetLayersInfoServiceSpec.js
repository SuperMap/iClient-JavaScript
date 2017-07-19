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

describe("testGetLayersInfoService_constructor", function() {
    it('constructor and destroy',function(){
        var vectorURL = GlobeParameter.vectorURL;
        var getLayersInfoService = initGetLayersInfoService(vectorURL);
        expect(getLayersInfoService).not.toBeNull();
        getLayersInfoService.destroy();
        expect(getLayersInfoService.events).toBeNull();
        expect(getLayersInfoService.eventListeners).toBeNull();
    })
});

describe('testGetLayersInfoService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('Vector',function(done){
        var vectorURL = GlobeParameter.vectorURL;
        var getLayersInfoService = initGetLayersInfoService(vectorURL);
        getLayersInfoService.processAsync();

        setTimeout(function() {
            try{
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.subLayers.layers).not.toBeNull();
                getLayersInfoService.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("GetLayersInfoService_" + exception.name + ":" + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        },2000);
    });

    it('image',function(done){
        var imageURL = GlobeParameter.imageURL;
        var getLayersInfoService = initGetLayersInfoService(imageURL);
        getLayersInfoService.processAsync();

        setTimeout(function() {
            try{
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.subLayers.layers).not.toBeNull();
                getLayersInfoService.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("GetLayersInfoService_" + exception.name + ":" + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        },2000);
    });

    it('grid',function(done){
        var gridURL = GlobeParameter.gridURL;
        var getLayersInfoService = initGetLayersInfoService(gridURL);
        getLayersInfoService.processAsync();

        setTimeout(function() {
            try{
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.subLayers.layers).not.toBeNull();
                getLayersInfoService.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("GetLayersInfoService_" + exception.name + ":" + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        },2000);
    });
});
