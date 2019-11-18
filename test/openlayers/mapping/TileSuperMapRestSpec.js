import ol from 'openlayers';
import { TileSuperMapRest } from '../../../src/openlayers/mapping/TileSuperMapRest';
import {NDVIParameter} from '../../../src/common/iServer/NDVIParameter';
import {HillshadeParameter} from '../../../src/common/iServer/HillshadeParameter';
import {getQueryValue} from '../../tool/utils';

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
                epsgCode: 4326
            }
        };
        var tileSource = new TileSuperMapRest(tileOptions);
        expect(tileSource.options).not.toBeNull();
        expect(tileSource.options.serverType).toBe('ISERVER');
        expect(tileSource.urls.length).toBe(1);
    });

    it('tileUrlFunction', () => {
        var tempOptions = {
            url: url,
            extent: [0, 0, 90, 90],
            prjCoordSys: {
                epsgCode: 4326
            }
        };
        var tileSourcetile = new TileSuperMapRest(tempOptions);
        var pixelRatio = '245';
        var coords = new ol.geom.Point(120.14, 30.24);
        var tileUrl = tileSourcetile.tileUrlFunction(coords, pixelRatio, ol.proj.get('EPSG:4326'));
        expect(tileUrl).not.toBeNull();
        expect(tileSourcetile.getTileGrid().getTileSize()).toEqual(256);
        expect(tileSourcetile.getTileGrid().getResolution(0)).toEqual(90.0 / 256);
    });

    it('tileUrlFunction_tilePoxy', () => {
        var tileOptions = {
            url: url,
            prjCoordSys: {
                epsgCode: 4326
            },
            tileProxy: 'tileProxy'
        };
        var tileSourcetilePoxy = new TileSuperMapRest(tileOptions);
        var pixelRatio = '245';
        var coords = new ol.geom.Point(120.14, 30.24);
        var tileUrl = tileSourcetilePoxy.tileUrlFunction(coords, pixelRatio, ol.proj.get('EPSG:4326'));
        expect(tileUrl).not.toBeNull();
    });
    it('tileUrlFunction_rasterfunction_ndviParameter', () => {
        var tileOptions = {
            url: url,
            prjCoordSys: {
                epsgCode: 4326
            },
            rasterfunction: new NDVIParameter({ redIndex: 0, nirIndex: 2 })
        };
        var tileSourcetilePoxy = new TileSuperMapRest(tileOptions);
        var pixelRatio = '245';
        var coords = new ol.geom.Point(120.14, 30.24);
        var tileUrl = tileSourcetilePoxy.tileUrlFunction(coords, pixelRatio, ol.proj.get('EPSG:4326'));
        expect(tileUrl).not.toBeNull();
        const ndviParameterValue = getQueryValue(tileUrl, 'rasterfunction');
        expect(ndviParameterValue).not.toBeNull;
        const ndviParameter = JSON.parse(decodeURIComponent(ndviParameterValue));
        expect(ndviParameter.type).toBe('NDVI');
        expect(ndviParameter.redIndex).toBe(0);
        expect(ndviParameter.nirIndex).toBe(2);
        expect(ndviParameter.colorMap).toBe(
            '0:ffffe5ff;0.1:f7fcb9ff;0.2:d9f0a3ff;0.3:addd8eff;0.4:78c679ff;0.5:41ab5dff;0.6:238443ff;0.7:006837ff;1:004529ff'
        );
    });
    it('tileUrlFunction_rasterfunction_hillshadeParameter', () => {
        var tileOptions = {
            url: url,
            prjCoordSys: {
                epsgCode: 4326
            },
            rasterfunction:new HillshadeParameter({altitude:10,azimuth:200})
        };
        var tileSourcetilePoxy = new TileSuperMapRest(tileOptions);
        var pixelRatio = '245';
        var coords = new ol.geom.Point(120.14, 30.24);
        var tileUrl = tileSourcetilePoxy.tileUrlFunction(coords, pixelRatio, ol.proj.get('EPSG:4326'));
        expect(tileUrl).not.toBeNull();
        const hillshadeParameterValue = getQueryValue(tileUrl,'rasterfunction');
        expect(hillshadeParameterValue).not.toBeNull;
        const hillshadeParameter = JSON.parse(decodeURIComponent(hillshadeParameterValue));
        expect(hillshadeParameter.type).toBe("HILLSHADE");
        expect(hillshadeParameter.altitude).toBe(10);
        expect(hillshadeParameter.azimuth).toBe(200);
        expect(hillshadeParameter.zFactor).toBe(1);
    });
});
