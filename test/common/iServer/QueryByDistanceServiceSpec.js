require('../../../src/common/iServer/QueryByDistanceService');

var serviceFailedEventArgsSystem = null;
var serviceCompletedEventArgsSystem = null;
var worldMapURL = GlobeParameter.mapServiceURL + "World Map";

function initQueryByDistanceService() {
    return new SuperMap.REST.QueryByDistanceService(worldMapURL);
}
var options = {
    eventListeners: {
        'processFailed':QueryByDistanceFailed,
        'processCompleted':QueryByDistanceCompleted
    }
};
//服务初始化时注册事件监听函数
function initQueryByDistanceService_RegisterListener() {
    return new SuperMap.REST.QueryByDistanceService(worldMapURL, options);
}
function QueryByDistanceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}
function QueryByDistanceCompleted(serviceCompletedEventArgs){
    serviceCompletedEventArgsSystem=serviceCompletedEventArgs;
}

describe('testQueryByBoundsService_constructor',function(){
    it('constructor and destroy',function(){
        var queryByDistanceService = initQueryByDistanceService();
        expect(queryByDistanceService).not.toBeNull();
        expect(queryByDistanceService.url).toEqual(worldMapURL+ "/queryResults.jsonp?");
        queryByDistanceService.destroy();
        expect(queryByDistanceService.EVENT_TYPES).toBeNull();
        expect(queryByDistanceService.events).toBeNull();
        expect(queryByDistanceService.returnContent).toBeNull();
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

    it('returnContent',function(done){
        var queryByDistanceService = initQueryByDistanceService_RegisterListener();
        var queryByDistanceParameters = new SuperMap.QueryByDistanceParameters({
            customParams: null,
            startRecord: 1,
            queryOption: SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array(new SuperMap.FilterParameter({
                name: "Capitals@World"
            })),
            returnContent: true,
            distance: 20,
            geometry: new SuperMap.Geometry.Point(-50, -10)
        });
        queryByDistanceParameters.holdTime = 10;
        queryByDistanceService.processAsync(queryByDistanceParameters);

        setTimeout(function() {
            try{
                var queryResult = serviceCompletedEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(serviceCompletedEventArgsSystem.result[0].type).toBe("FeatureCollection");
                expect(serviceCompletedEventArgsSystem.result[0].features.length).toEqual(5);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            } catch (excepion) {
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            }
        }, 6000);
    });

    it('pass',function(done){
        var queryByDistanceService = initQueryByDistanceService_RegisterListener();
        var queryByDistanceParameters = new SuperMap.QueryByDistanceParameters({
            customParams: null,
            expectCount: 100,
            queryOption: SuperMap.QueryOption.GEOMETRY,
            queryParams: new Array(new SuperMap.FilterParameter({
                name: "Capitals@World"
            })),
            returnContent: false,
            distance: 20,
            isNearest: true,
            geometry: new SuperMap.Geometry.Point(-50, -10)
        });
        queryByDistanceParameters.startRecord = 0;
        queryByDistanceParameters.holdTime = 10;
        queryByDistanceService.processAsync(queryByDistanceParameters);

        setTimeout(function() {
            try {
                var queryResult = serviceCompletedEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                expect(queryResult.succeed).toBeTruthy();
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            } catch (excepion) {
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            }
        }, 6000);
    });

    it('fail',function(done){
        var queryByDistanceService = initQueryByDistanceService_RegisterListener();
        var queryByDistanceParameters = new SuperMap.QueryByDistanceParameters({
            customParams: null,
            expectCount: 100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTE,
            queryParams: new Array(),
            geometry: new SuperMap.Geometry.Point(-50, -10),
            distance:20
        });
        queryByDistanceParameters.startRecord = 0;
        queryByDistanceParameters.holdTime = 10;
        queryByDistanceService.events.on({ 'processFailed': queryFailed });
        queryByDistanceService.processAsync(queryByDistanceParameters);

        function queryFailed(e) {
            failedResult = e;
        }

        setTimeout(function() {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(failedResult.error.code).toEqual(400);
                expect(failedResult.error.errorMsg).not.toBeNull();
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            } catch (excepion) {
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            }
        }, 6000);

    })
});

