import {TilesetsService} from '../../../src/common/iServer/TilesetsService';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var tileSetsURL = "http://supermap:8090/iserver/services/map-changchun/rest/maps/长春市区图";
var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var analyzeFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var analyzeCompleted = (analyseCompletedEventArgs) => {
    serviceCompletedEventArgsSystem = analyseCompletedEventArgs;
};
var initTilesetsService_Register = () => {
    return new TilesetsService(tileSetsURL,
        {
            eventListeners: {
                "processCompleted": analyzeCompleted,
                'processFailed': analyzeFailed
            }
        });
};

describe('TilesetsService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor, destroy', () => {
        var tilesetsService = initTilesetsService_Register();
        tilesetsService.events.on({"processCompleted": analyzeCompleted});
        expect(tilesetsService.url).toEqual(tileSetsURL);
        expect(tilesetsService.CLASS_NAME).toBe("SuperMap.TilesetsService");
        tilesetsService.destroy();
        expect(tilesetsService.eventListeners).toBeNull();
        expect(tilesetsService.EVENT_TYPES).toBeNull();
        expect(tilesetsService.events).toBeNull();
    });

    //成功事件
    it('processAsync_success', (done) => {
        var tilesetsService = initTilesetsService_Register();
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('GET');
            expect(testUrl).toBe(tileSetsURL + "/tilesets.json?");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(tilesetsEscapedJson));
        });
        tilesetsService.processAsync();
        setTimeout(() => {
            expect(serviceCompletedEventArgsSystem.type).toBe("processCompleted");
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
        }, 1500);
    });
});