require('../../../src/Core/iServer/GetLayersInfoService');

var serviceFailedEventArgsSystem = null;
var getFieldsEventArgsSystem = null;
var options = {
    eventListeners: {
        processCompleted: getLayersInfoServiceCompleted,
        processFailed: getLayersInfoServiceFailed
    }
};
function initGetLayersInfoService(url) {
    return new SuperMap.REST.GetLayersInfoService(url, options);
}
function getLayersInfoServiceCompleted(result) {
    getFieldsEventArgsSystem = result;
}
function getLayersInfoServiceFailed(result) {
    serviceFailedEventArgsSystem = result;
}

describe("testGetLayersInfoService_constructor", function() {
    it('constructor and destroy',function(){
        var vectorURL = "http://localhost:8090/iserver/services/map-world/rest/maps/World/";
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
        var vectorURL = "http://localhost:8090/iserver/services/map-world/rest/maps/World/";
        var getLayersInfoService = initGetLayersInfoService(vectorURL);
        getLayersInfoService.processAsync();

        setTimeout(function() {
            try{
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.subLayers.layers).not.toBeNull();
                getLayersInfoService.destroy();
                done();
            }catch(excepion){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        },6000);
    });

    it('image',function(done){
        var imageURL = "http://localhost:8090/iserver/services/map-world/rest/maps/世界地图_Day";
        var getLayersInfoService = initGetLayersInfoService(imageURL);
        getLayersInfoService.processAsync();

        setTimeout(function() {
            try{
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.subLayers.layers).not.toBeNull();
                getLayersInfoService.destroy();
                done();
            }catch(excepion){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        },6000);
    });

    it('grid',function(done){
        var gridURL = "http://localhost:8090/iserver/services/map-jingjin/rest/maps/京津地区土地利用现状图";
        var getLayersInfoService = initGetLayersInfoService(gridURL);
        getLayersInfoService.processAsync();

        setTimeout(function() {
            try{
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.subLayers.layers).not.toBeNull();
                getLayersInfoService.destroy();
                done();
            }catch(excepion){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        },6000);
    });
});
