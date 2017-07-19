require('../../../src/common/iServer/GetFeaturesByBoundsService');

var serviceFailedEventArgsSystem = null;
var serviceSucceedEventArgsSystem = null;
//服务初始化时注册事件监听函数
var url = GlobeParameter.dataServiceURL;
var options = {
    eventListeners: {
        'processFailed': serviceFailed,
        'processCompleted':serviceCompleted
    }
};
function initGetFeaturesByBoundsService_RegisterListener() {
    return new SuperMap.GetFeaturesByBoundsService(url, options);
}
function serviceCompleted(serviceSucceedEventArgs){
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
}
function serviceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('testGetFeaturesByBoundsService',function(){
    it('constructor and destroy',function(){
        var getFeaturesByBoundsService = initGetFeaturesByBoundsService_RegisterListener();
        getFeaturesByBoundsService.events.on({
            'processFailed': serviceFailed,
            'processCompleted':serviceCompleted
        });
        expect(getFeaturesByBoundsService).not.toBeNull();
        expect(getFeaturesByBoundsService.CLASS_NAME).toEqual("SuperMap.GetFeaturesByBoundsService");
        getFeaturesByBoundsService.destroy();
        expect(getFeaturesByBoundsService.EVENT_TYPES).toBeNull();
        expect(getFeaturesByBoundsService.events).toBeNull();
    })
});

describe('testGetFeaturesByBoundsService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('basicTest_pass',function(done){
        var getFeaturesByBoundsService = initGetFeaturesByBoundsService_RegisterListener();
        var boundsParams = new SuperMap.GetFeaturesByBoundsParameters({
            datasetNames: ["World:Countries"],
            bounds: new SuperMap.Bounds(0,0,90,90)
        });
        getFeaturesByBoundsService.processAsync(boundsParams);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result.features;
                expect(analystResult).not.toBeNull();
                expect(analystResult.type).toEqual("FeatureCollection");
                expect(analystResult.features).not.toBeNull();
                expect(analystResult.features.length).toBeGreaterThan(0);
                getFeaturesByBoundsService.destroy();
                boundsParams.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesByBoundsService_" + exception.name + ":" + exception.message);
                getFeaturesByBoundsService.destroy();
                boundsParams.destroy();
                done();
            }
        },4000);
    })
});