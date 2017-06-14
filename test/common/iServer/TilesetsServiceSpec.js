require('../../../src/common/iServer/TilesetsService');

var serviceFailedEventArgsSystem = null;
var serviceCompletedEventArgsSystem = null;
var tileSetsURL = GlobeParameter.tileSetsURL;
function initTilesetsService_Register() {
    return new SuperMap.REST.TilesetsService(tileSetsURL,
        {eventListeners:{
            "processCompleted": analyzeCompleted,
            'processFailed': analyzeFailed
        }});
}
function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function analyzeCompleted(analyseCompletedEventArgs) {
    serviceCompletedEventArgsSystem = analyseCompletedEventArgs;
}

describe('testTilesetsService',function(){
    it('constructor and destroy',function(){
        var tilesetsService = initTilesetsService_Register();
        tilesetsService.events.on({"processCompleted": analyzeCompleted});
        expect(tilesetsService.url).toEqual(tileSetsURL);
        expect(tilesetsService.CLASS_NAME).toBe("SuperMap.REST.TilesetsService");
        tilesetsService.destroy();
        expect(tilesetsService.eventListeners).toBeNull();
        expect(tilesetsService.EVENT_TYPES).toBeNull();
        expect(tilesetsService.events).toBeNull();
    });
});

describe('testTilesetsService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //成功事件
    it('pass',function(done){
        var tilesetsService = initTilesetsService_Register();
        tilesetsService.processAsync();

        setTimeout(function () {
            try {
                var analyseResult = serviceCompletedEventArgsSystem.result;
                expect(analyseResult).not.toBeNull();
                expect(analyseResult.succeed).toBeTruthy();
                expect(analyseResult.length).toEqual(1);
                expect(serviceCompletedEventArgsSystem.result[0].name).toBe("smtiles_tileset_-2107465189");
                expect(serviceCompletedEventArgsSystem.result[0].metaData.mapName).toBe("ChinaProvinces");
               // expect(serviceCompletedEventArgsSystem.result[0].metaData.resolutions.length).toEqual(3);
                expect(serviceCompletedEventArgsSystem.result[0].metaData.resolutions[0]).toEqual(0.24598888713);
                expect(serviceCompletedEventArgsSystem.result[0].metaData.resolutions[1]).toEqual(0.12299444357);
                // expect(serviceCompletedEventArgsSystem.result[0].metaData.scaleDenominators.length).toEqual(3);
                expect(serviceCompletedEventArgsSystem.result[0].metaData.scaleDenominators[0]).toEqual(103496154.92075206);
                expect(serviceCompletedEventArgsSystem.result[0].metaData.scaleDenominators[1]).toEqual(51748077.46247971);
                expect(serviceCompletedEventArgsSystem.result[0].metaData.tileFormat).toBe("PNG");
                expect(serviceCompletedEventArgsSystem.result[0].metaData.tileHeight).toEqual(256);
                expect(serviceCompletedEventArgsSystem.result[0].metaData.tileWidth).toEqual(256);
                tilesetsService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TilesetsService_" + exception.name + ":" + exception.message);
                tilesetsService.destroy();
                done();
            }
        }, 6000);
    });
});