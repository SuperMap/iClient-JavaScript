require('../../../src/common/iServer/GetFeaturesBySQLService');

var serviceFailedEventArgsSystem = null;
var getFeaturesEventArgsSystem = null;
var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    eventListeners: {
        processCompleted: getFeaturesBySQLCompleted,
        processFailed: getFeaturesBySQLFailed
    }
};
function initGetFeaturesBySQLService() {
    return new SuperMap.GetFeaturesBySQLService(dataServiceURL, options);
}
function getFeaturesBySQLFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function getFeaturesBySQLCompleted(getFeaturesEventArgs){
    getFeaturesEventArgsSystem = getFeaturesEventArgs;
}


describe('testGetFeaturesBySQLService_processAsync',function(){
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
        var getFeaturesBySQLService = initGetFeaturesBySQLService();
        var getFeaturesBySQLParameters = new SuperMap.GetFeaturesBySQLParameters({
            datasetNames:["World:Countries"],
            queryParameter:new SuperMap.FilterParameter({
                attributeFilter:"SmID>0",
                name:"Countries@World"
            }),
            returnContent:false
        });
        getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);

        setTimeout(function(){
            try{
                var getFeaturesResult = getFeaturesEventArgsSystem.result;
                expect(getFeaturesBySQLService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.newResourceID).not.toBeNull();
                expect(getFeaturesResult.newResourceLocation).not.toBeNull();

                getFeaturesBySQLService.destroy();
                expect(getFeaturesBySQLService.EVENT_TYPES).toBeNull();
                expect(getFeaturesBySQLService.events).toBeNull();
                expect(getFeaturesBySQLService.eventListeners).toBeNull();
                expect(getFeaturesBySQLService.returnContent).toBeNull();
                expect(getFeaturesBySQLService.fromIndex).toBeNull();
                expect(getFeaturesBySQLService.toIndex).toBeNull();
                getFeaturesBySQLParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesBySQLService_" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                getFeaturesBySQLParameters.destroy();
                done();
            }
        },2000);
    });

    //直接返回查询结果
    it('returnContent',function(done){
        var getFeaturesBySQLService = initGetFeaturesBySQLService();
        var getFeaturesBySQLParameters = new SuperMap.GetFeaturesBySQLParameters({
            datasetNames:["World:Countries"],
            queryParameter:new SuperMap.FilterParameter({
                attributeFilter:"SMID<10",
                name:"Countries@World",
            }),
            returnContent:true,
            fromIndex:2,
            toIndex:10
        });
        getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);

        setTimeout(function() {
            try{
                var getFeaturesResult = getFeaturesEventArgsSystem.result.features;
                expect(getFeaturesBySQLService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.type).toBe("FeatureCollection");
                expect(getFeaturesResult.features).not.toBeNull();
                expect(getFeaturesResult.features[0].type).toBe("Feature");
                getFeaturesBySQLService.destroy();
                getFeaturesBySQLParameters.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesBySQLService_" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                getFeaturesBySQLParameters.destroy();
                done();
            }
        },2000)
    });

    //测试没有传入参数时的情况
    it('noParams',function(done){
        var getFeaturesBySQLService = initGetFeaturesBySQLService();
        var getFeaturesBySQLParameters = new SuperMap.GetFeaturesBySQLParameters({
            datasetNames:["World:Countries"],
            returnContent:true,
            fromIndex:2,
            toIndex:10
        });
        getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);

        setTimeout(function() {
            try{
                expect(getFeaturesBySQLService).not.toBeNull();
                expect(serviceFailedEventArgsSystem.result).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesBySQLService.destroy();
                getFeaturesBySQLParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesBySQLService_" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                getFeaturesBySQLParameters.destroy();
                done();
            }
        },2000)
    });

    //查询目标图层不存在情况
    it('LayerNotExist',function(done){
        var getFeaturesBySQLService = initGetFeaturesBySQLService();
        var getFeaturesBySQLParameters = new SuperMap.GetFeaturesBySQLParameters({
            datasetNames:["World:Countriess"],
            queryParameter:new SuperMap.FilterParameter({
                attributeFilter:"SMID<10",
                name:"Countries@World"
            }),
            returnContent:true,
            fromIndex:2,
            toIndex:10
        });
        getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);
        setTimeout(function(){
            try{
                expect(getFeaturesBySQLService).not.toBeNull();
                expect(serviceFailedEventArgsSystem.result).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesBySQLService.destroy();
                getFeaturesBySQLParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesBySQLService_" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                getFeaturesBySQLParameters.destroy();
                done();
            }
        },2000);
    })
});
