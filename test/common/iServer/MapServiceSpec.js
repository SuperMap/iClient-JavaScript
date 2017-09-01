require('../../../src/common/iServer/MapService');

var getMapStatusEventArgsSystem=null;
var serviceFailedEventArgsSystem=null;
var worldMapURL =  GlobeParameter.worldMapURL;

function initMapService() {
    getMapStatusEventArgsSystem=null;
    serviceFailedEventArgsSystem=null;
    return new SuperMap.MapService(worldMapURL);
}

//初始化注册事件监听器的Services
function initMapService_RegisterListener() {
    return new SuperMap.MapService(worldMapURL, {
        eventListeners: {'processFailed':GetMapStatusFailed,'processCompleted':GetMapStatusCompleted}}
    );
}
function GetMapStatusCompleted(getMapStatusEventArgs){
    getMapStatusEventArgsSystem = getMapStatusEventArgs;
}
function GetMapStatusFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('testMapService_constructor',function(){
    it('token',function(){
        var getMapService = new SuperMap.MapService(worldMapURL,{token:88888});
        expect(getMapService).not.toBeNull();
        expect(getMapService.token).toEqual(88888);
        getMapService.destroy();
    })
});

describe('testMapService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //通过的情况
    it('pass',function(done){
        var getMapService = initMapService_RegisterListener();
        expect(getMapService).not.toBeNull();
        expect(getMapService.url).toEqual(worldMapURL+".json");
        getMapService.processAsync();

        setTimeout(function() {
            try{
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
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("MapService_" + exception.name + ":" + exception.message);
                getMapService.destroy();
                done();
            }
        },2000);
    });

    it('fail',function(done){
        var mapServiceURL = GlobeParameter.mapServiceURL;
        var getMapService = new SuperMap.MapService(mapServiceURL + "MapNameError");
        getMapService.events.on({'processFailed':GetMapStatusFailed});
        getMapService.processAsync();

        setTimeout(function() {
            try{
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(404);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("MapService_" + exception.name + ":" + exception.message);
                getMapService.destroy();
                done();
            }
        },2000);
    })
});

/*
 function boundsEqual(jsonObject,bounds,tolerance){
    if(!(jsonObject && bounds)) {
        return false;
    }
    if(tolerance == undefined ){
        tolerance=1.0E-6;
    }
    Math
    if(Math.abs(jsonObject.left - bounds.left) <tolerance  && Math.abs(jsonObject.bottom - bounds.bottom) <tolerance  && Math.abs(jsonObject.right - bounds.right)  <tolerance &&  Math.abs(jsonObject.top - bounds.top) <tolerance ){
        return true;
    }else{
        return false;
    }
}*/
