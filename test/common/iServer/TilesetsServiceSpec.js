require('../../../src/common/iServer/TilesetsService');

var serviceFailedEventArgsSystem = null;
var serviceCompletedEventArgsSystem = null;
var tileSetsURL = GlobeParameter.tileSetsURL;
function initTilesetsService_Register() {
    return new SuperMap.TilesetsService(tileSetsURL,
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
        expect(tilesetsService.CLASS_NAME).toBe("SuperMap.TilesetsService");
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
                expect(analyseResult[0].name).toBe("smtiles_tileset_1116742863");
                expect(analyseResult[0].metaData.mapName).toBe("长春市区图");
                expect(analyseResult[0].metaData.resolutions[0]).toEqual(34.80645971);
                expect(analyseResult[0].metaData.resolutions[1]).toEqual(17.403229855);
                expect(analyseResult[0].metaData.scaleDenominators[0]).toEqual(131551.9737070866);
                expect(analyseResult[0].metaData.scaleDenominators[1]).toEqual(65775.9868535433);
                expect(analyseResult[0].metaData.tileFormat).toBe("PNG");
                expect(analyseResult[0].metaData.tileType).toBe("Image");
                expect(analyseResult[0].metaData.tileHeight).toEqual(256);
                expect(analyseResult[0].metaData.tileWidth).toEqual(256);
                tilesetsService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TilesetsService_" + exception.name + ":" + exception.message);
                tilesetsService.destroy();
                done();
            }
        }, 2000);
    });
});