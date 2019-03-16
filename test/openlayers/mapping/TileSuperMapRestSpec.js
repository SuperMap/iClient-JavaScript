import ol from 'openlayers';
import {
    TileSuperMapRest
} from '../../../src/openlayers/mapping/TileSuperMapRest';
import {
    MapService
} from '../../../src/openlayers/services/MapService';

var url = GlobeParameter.imageURL;
describe('openlayers_TileSuperMapRest', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('initialize', () => {
        var tileOptions = {
            url: url,
            prjCoordSys: {
                "epsgCode": 4326
            }
        };
        var tileSource = new TileSuperMapRest(tileOptions);
        expect(tileSource.options).not.toBeNull();
        expect(tileSource.options.serverType).toBe("ISERVER");
        expect(tileSource.urls.length).toBe(1);
    });

    it('tileUrlFunction', () => {
        var tempOptions = {
            url: url,
            extent: [0, 0, 90, 90],
            prjCoordSys: {
                "epsgCode": 4326
            }
        };
        var tileSourcetile = new TileSuperMapRest(tempOptions);
        var pixelRatio = "245";
        var coords = new ol.geom.Point(120.14, 30.24);
        var tileUrl = tileSourcetile.tileUrlFunction(coords, pixelRatio, ol.proj.get("EPSG:4326"));
        expect(tileUrl).not.toBeNull();
        expect(tileSourcetile.getTileGrid().getTileSize()).toEqual(256);
        expect(tileSourcetile.getTileGrid().getResolution(0)).toEqual(90.0 / 256);
    });

    it('tileUrlFunction_tilePoxy', () => {
        var tileOptions = {
            url: url,
            prjCoordSys: {
                "epsgCode": 4326
            },
            tileProxy : "tileProxy"
        };
        var tileSourcetilePoxy = new TileSuperMapRest(tileOptions);
        var pixelRatio = "245";
        var coords = new ol.geom.Point(120.14, 30.24);
        var tileUrl = tileSourcetilePoxy.tileUrlFunction(coords, pixelRatio, ol.proj.get("EPSG:4326"));
        expect(tileUrl).not.toBeNull();
    });

});