import {TilesetsService} from '../../../src/common/iServer/TilesetsService';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;

var initTilesetsService_Register = (url,analyzeCompleted,analyzeFailed) => {
    return new TilesetsService(url,
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

    it('headers', () => {
        let myHeaders = new Headers();
        var tilesetsService = new TilesetsService("http://supermap:8090/iserver/services/map-changchun/rest/maps/长春市区图", { headers: myHeaders });
        expect(tilesetsService).not.toBeNull();
        expect(tilesetsService.headers).not.toBeNull();
        tilesetsService.destroy();
    });
    
    it('crossOrigin', () => {
        var tilesetsService = new TilesetsService("http://supermap:8090/iserver/services/map-changchun/rest/maps/长春市区图", { crossOrigin: false });
        expect(tilesetsService).not.toBeNull();
        expect(tilesetsService.crossOrigin).toBeFalsy();
        tilesetsService.destroy();
    });

    it('constructor, destroy', () => {
        var tileSetsURL = "http://supermap:8090/iserver/services/map-changchun/rest/maps/长春市区图";
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var analyzeCompleted = (analyseCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = analyseCompletedEventArgs;
        };
        var tilesetsService = initTilesetsService_Register(tileSetsURL,analyzeCompleted,analyzeFailed);
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
        var tileSetsURL = "http://supermap:8090/iserver/services/map-changchun/rest/maps/长春市区图";
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var analyzeCompleted = (analyseCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = analyseCompletedEventArgs;
            expect(serviceCompletedEventArgsSystem.type).toBe("processCompleted");
            var analyseResult = serviceCompletedEventArgsSystem.result;
            expect(analyseResult).not.toBeNull();
            expect(analyseResult.succeed).toBeTruthy();
            expect(analyseResult.length).toEqual(1);
            expect(analyseResult[0].name).toBe("smtiles_tileset_1116742863");
            expect(analyseResult[0].metaData.mapName).toBe("长春市区图");
            expect(analyseResult[0].metaData.resolutions[0]).toBeCloseTo(34.80645971, 0.00001);
            expect(analyseResult[0].metaData.resolutions[1]).toBeCloseTo(17.403229855, 0.00001);
            expect(analyseResult[0].metaData.scaleDenominators[0]).toBeCloseTo(131551.973707087, 0.00001);
            expect(analyseResult[0].metaData.scaleDenominators[1]).toBeCloseTo(65775.9868535433, 0.00001);
            expect(analyseResult[0].metaData.tileFormat).toBe("PNG");
            expect(analyseResult[0].metaData.tileType).toBe("Image");
            expect(analyseResult[0].metaData.tileHeight).toEqual(256);
            expect(analyseResult[0].metaData.tileWidth).toEqual(256);
            tilesetsService.destroy();
            done();
        };
        var tilesetsService = initTilesetsService_Register(tileSetsURL,analyzeCompleted,analyzeFailed);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe('GET');
            expect(testUrl).toBe(tileSetsURL + "/tilesets");
            return Promise.resolve(new Response(JSON.stringify(tilesetsEscapedJson)));
        });
        tilesetsService.processAsync();
    });
});