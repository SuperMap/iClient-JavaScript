require('../../../src/common/iServer/GetFeaturesByIDsService');

var serviceFailedEventArgsSystem=null;
var getFeatureEventArgsSystem=null;
var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    eventListeners: {
        processCompleted: getFeaturesByIDsCompleted,
        processFailed: getFeaturesByIDsFailed
    }
};
function initGetFeaturesByIDsService() {
    return new SuperMap.GetFeaturesByIDsService(dataServiceURL, options);
}
function getFeaturesByIDsFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}
function getFeaturesByIDsCompleted(getFeaturesEventArgs){
    getFeatureEventArgsSystem=getFeaturesEventArgs;
}

describe('testGetFeaturesByIDsService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //不直接返回查询结果
    it('NotReturnContent',function(done){
        var getFeaturesByIDsService = initGetFeaturesByIDsService();
        var getFeaturesByIDsParameters = new SuperMap.GetFeaturesByIDsParameters({
            returnContent:false,
            datasetNames: ["World:Capitals"],
            fromIndex: 0,
            fields: ["SMID"],
            toIndex:-1,
            IDs: [1,2,3]
        });
        getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);

        setTimeout(function(){
            try{
                var getFeaturesResult = getFeatureEventArgsSystem.result;
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.newResourceID).not.toBeNull();
                expect(getFeaturesResult.newResourceLocation).not.toBeNull();
                getFeaturesByIDsService.destroy();
                expect(getFeaturesByIDsService.EVENT_TYPES).toBeNull();
                expect(getFeaturesByIDsService.events).toBeNull();
                expect(getFeaturesByIDsService.eventListeners).toBeNull();
                expect(getFeaturesByIDsService.returnContent).toBeNull();
                getFeaturesByIDsParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesByIDsService_" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            }
        },2000);
    });

    it('returnContent',function(done){
        var getFeaturesByIDsService = initGetFeaturesByIDsService();
        var getFeaturesByIDsParameters = new SuperMap.GetFeaturesByIDsParameters({
            returnContent: true,
            datasetNames: ["World:Capitals"],
            fromIndex: 0,
            toIndex:-1,
            IDs: [1,2,3]
        });
        getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);

        setTimeout(function() {
            try{
                var getFeaturesResult = getFeatureEventArgsSystem.result.features;
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.type).toBe("FeatureCollection");
                expect(getFeaturesResult.features).not.toBeNull();
                expect(getFeaturesResult.features[0].type).toBe("Feature");
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesByIDsService_" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            }
        },2000)
    });

    //测试没有传入参数时的情况
    it('noParams',function(done){
        var getFeaturesByIDsService = initGetFeaturesByIDsService();
        var getFeaturesByIDsParameters = new SuperMap.GetFeaturesByIDsParameters({
            IDs: []
        });
        getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);

        setTimeout(function() {
            try{
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(serviceFailedEventArgsSystem.result).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesByIDsService_" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            }
        },2000)
    });

    //查询目标图层不存在情况
    it('LayerNotExist',function(done){
        var getFeaturesByIDsService = initGetFeaturesByIDsService();
        var getFeaturesByIDsParameters = new SuperMap.GetFeaturesByIDsParameters({
            returnContent:false,
            datasetNames: ["World:CapitalsNotExsit"],
            fromIndex: 0,
            toIndex:-1,
            IDs: [1,2,3]
        });
        getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters );

        setTimeout(function() {
            try{
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(serviceFailedEventArgsSystem.result).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesByIDsService_" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            }
        },2000)
    })
});

