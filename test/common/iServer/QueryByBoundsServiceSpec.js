require('../../../src/common/iServer/QueryByBoundsService');

var serviceFailedEventArgsSystem = null;
var serviceCompletedEventArgsSystem = null;
var worldMapURL = GlobeParameter.mapServiceURL + "World Map";

function initQueryByBoundsService() {
    return new SuperMap.QueryByBoundsService(worldMapURL);
}
var options = {
    eventListeners: {
        'processFailed':QueryByBoundsFailed,
        'processCompleted':QueryByBoundsCompleted
    }
};
//服务初始化时注册事件监听函数
function initQueryByBoundsService_RegisterListener() {
    return new SuperMap.QueryByBoundsService(worldMapURL, options);
}
function QueryByBoundsFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}
function QueryByBoundsCompleted(serviceCompletedEventArgs){
    serviceCompletedEventArgsSystem=serviceCompletedEventArgs;
}

describe('testQueryByBoundsService_constructor',function(){
    it('constructor and destroy',function(){
        var queryByBoundsService = initQueryByBoundsService();
        expect(queryByBoundsService).not.toBeNull();
        expect(queryByBoundsService.url).toEqual(worldMapURL + "/queryResults.json?");
        queryByBoundsService.destroy();
        expect(queryByBoundsService.EVENT_TYPES).toBeNull();
        expect(queryByBoundsService.events).toBeNull();
        expect(queryByBoundsService.returnContent).toBeNull();
    })
});

describe('testQueryByBoundsService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceFailedEventArgsSystem = null;
        serviceCompletedEventArgsSystem = null;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('pass',function(done){
        var queryByBoundsService = initQueryByBoundsService_RegisterListener();
        var queryByBoundsParameters = new SuperMap.QueryByBoundsParameters({
            customParams:null,
            expectCount:100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams:new Array(new SuperMap.FilterParameter({
                attributeFilter:"SmID<21",
                name:"Countries@World",
            })),
            returnContent:true,
            bounds:new SuperMap.Bounds(0,0,100,100)
        });
        queryByBoundsParameters.startRecord=0;
        queryByBoundsParameters.holdTime=10;
        returnCustomResult=false;
        queryByBoundsService.processAsync(queryByBoundsParameters);

        setTimeout(function() {
            try{
                var queryResult = serviceCompletedEventArgsSystem.result.recordsets[0].features;
                expect(queryResult).not.toBeNull();
                expect(queryResult.type).toBe("FeatureCollection");
                expect(queryResult.features.length).toEqual(15);
                queryByBoundsService.destroy();
                expect(queryByBoundsService.EVENT_TYPES).toBeNull();
                expect(queryByBoundsService.events).toBeNull();
                expect(queryByBoundsService.returnContent).toBeNull();
                queryByBoundsParameters.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("QueryByBoundsService_" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            }
        },4000);
    });

    it('customsResult',function(done){
        var queryByBoundsService = initQueryByBoundsService_RegisterListener();
        var queryByBoundsParameters = new SuperMap.QueryByBoundsParameters({
            customParams:null,
            expectCount:100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams:new Array(new SuperMap.FilterParameter({
                attributeFilter:"SmID<3",
                name:"Countries@World",
            })),
            returnContent:false,
            bounds:new SuperMap.Bounds(0,0,100,100)
        });
        queryByBoundsParameters.startRecord=0;
        queryByBoundsParameters.holdTime=10;
        queryByBoundsParameters.returnCustomResult=true;
        queryByBoundsService.processAsync(queryByBoundsParameters);

        setTimeout(function() {
            try{
                var queryResult = serviceCompletedEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.succeed).toBeTruthy();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                expect(queryResult.customResult).not.toBeNull();
                expect(queryResult.customResult.bottom).toEqual(41.19657897949219);
                expect(queryResult.customResult.left).toEqual(-180);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("QueryByBoundsService_" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            }
        },4000);
    });

    //查询参数为空
    it('fail',function(done){
        var queryByBoundsService = initQueryByBoundsService_RegisterListener();
        var queryByBoundsParameters = new SuperMap.QueryByBoundsParameters({
            customParams:null,
            expectCount:100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTE,
            queryParams:new Array(),
            bounds:new SuperMap.Bounds(0,0,100,100)
        });
        queryByBoundsParameters.startRecord=0;
        queryByBoundsParameters.holdTime=10;
        returnCustomResult=false;
        queryByBoundsService.processAsync(queryByBoundsParameters);

        setTimeout(function() {
            try{
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("QueryByBoundsService_" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            }
        },4000);
    })
});

