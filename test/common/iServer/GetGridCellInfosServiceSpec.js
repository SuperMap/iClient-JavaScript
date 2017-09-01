require('../../../src/common/iServer/GetGridCellInfosService');

var eventCompleted ,
    eventFailed ;
var dataServiceURL = GlobeParameter.dataServiceURL;
function initGetGridCellInfosService(url){
    return new SuperMap.GetGridCellInfosService(url, {
        eventListeners: {
            "processCompleted": queryCompleted,
            "processFailed": queryError
        }});
}
function queryCompleted(event) {
    eventCompleted = event;
}
function queryError(event) {
    eventFailed = event;
}

describe('testGetGridCellInfosService_constructor',function(){
    it('constructor and destroy',function(){
        var getGridCellInfosService = initGetGridCellInfosService(dataServiceURL);
        expect(getGridCellInfosService.CLASS_NAME).toEqual("SuperMap.GetGridCellInfosService");
        expect(getGridCellInfosService.EVENT_TYPES.length).toEqual(2);
        expect(getGridCellInfosService.EVENT_TYPES[0]).toEqual("processCompleted");
        expect(getGridCellInfosService.EVENT_TYPES[1]).toEqual("processFailed");
        expect(getGridCellInfosService.events).not.toBeNull();
        expect(getGridCellInfosService.eventListeners).not.toBeNull();
        expect(getGridCellInfosService.datasetName).toBeNull();
        expect(getGridCellInfosService.dataSourceName).toBeNull();
        expect(getGridCellInfosService.datasetType).toBeNull();
        expect(getGridCellInfosService.X).toBeNull();
        expect(getGridCellInfosService.Y).toBeNull();

        getGridCellInfosService.destroy();
        expect(getGridCellInfosService.EVENT_TYPES).toBeNull();
        expect(getGridCellInfosService.events).toBeNull();
        expect(getGridCellInfosService.eventListeners).toBeNull();
    });
});

describe('testGetGridCellInfosService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('getGridCellInfos_Completed',function(done){
        var queryParam = new SuperMap.GetGridCellInfosParameters({
            datasetName: "LandCover",
            dataSourceName: "World",
            X: "110",
            Y: "50"
        });
        var myService = new SuperMap.GetGridCellInfosService(dataServiceURL, {
            eventListeners: {
                "processCompleted": queryCompleted,
                "processFailed": queryError
            }
        });
        myService.processAsync(queryParam);

        setTimeout(function() {
            try{
                expect(myService.url).toEqual(dataServiceURL + "/datasources/World/datasets/LandCover/gridValue.json?x=110&y=50");
                myService.destroy();
                queryParam.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("GetGridCellInfosService_" + exception.name + ":" + exception.message);
                myService.destroy();
                queryParam.destroy();
                done();
            }
        },2000);
    });

    it('getGridCellInfos_Failed',function(done){
        var url = dataServiceURL + "/datasources/World/datasets";
        var myService = new SuperMap.GetGridCellInfosService(url, {
            eventListeners: {
                "processCompleted": queryCompleted,
                "processFailed": queryError
            },
            X: 110,
            Y: 50
        });
        myService.processAsync();

        setTimeout(function() {
            try{
                expect(eventFailed).not.toBeNull();
                expect(eventFailed.succeed).toBeFalsy();
                expect(eventFailed.error.code).toEqual(404);
                expect(eventFailed.error.errorMsg).not.toBeNull();
                myService.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("GetGridCellInfosService_" + exception.name + ":" + exception.message);
                myService.destroy();
                done();
            }
        },2000)
    });
});

describe('testGetGridCellInfosService_getDatasetInfoCompleted',function(){
    it('getDatasetInfoCompleted',function(){
        var myService = new SuperMap.GetGridCellInfosService(dataServiceURL,{
            eventListeners: {
                "processCompleted": queryCompleted,
                "processFailed": queryError
            }
        });
        var result = {
            datasetInfo: {
                type: "GRID"
            }
        };
        myService.url = dataServiceURL + "/datasources/World/datasets/LandCover.json";
        myService.getDatasetInfoCompleted(result);
        expect(myService.datasetType).toBe("GRID");
    });
});

describe('testGetGridCellInfosService_getDatasetInfoFailed',function(){
    it('getDatasetInfoFailed',function(){
        var myService = initGetGridCellInfosService(dataServiceURL);
        var result = {};
        myService.getDatasetInfoFailed(result);
        expect(result).not.toBeNull();
    });
});

describe('testGetGridCellInfosService_queryGridInfos',function(){
    it('queryGridInfos',function(){
        var url = dataServiceURL + "/datasources/World/datasets/LandCover.json";
        var myService = initGetGridCellInfosService(url);
        myService.X = "110";
        myService.Y = "50";
        myService.queryGridInfos();
        expect(myService.url).toEqual(dataServiceURL + "/datasources/World/datasets/LandCover/imageValue.json?x=110&y=50");
    });
});

