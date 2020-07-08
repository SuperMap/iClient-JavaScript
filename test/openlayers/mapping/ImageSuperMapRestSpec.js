import { ImageSuperMapRest } from '../../../src/openlayers/mapping/ImageSuperMapRest';
import { MapService } from '../../../src/openlayers/services/MapService';
import { NDVIParameter } from '../../../src/common/iServer/NDVIParameter';
import { HillshadeParameter } from '../../../src/common/iServer/HillshadeParameter';
import { getQueryValue } from '../../tool/utils';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';

var url = GlobeParameter.imageURL;
describe('openlayers_ImageSuperMapRest', () => {
    var originalTimeout;
    var testDiv, map, imageTileOptions, imageTileSource;
    beforeAll(() => {
        testDiv = document.createElement('div');
        testDiv.setAttribute('id', 'map');
        testDiv.style.styleFloat = 'left';
        testDiv.style.marginLeft = '8px';
        testDiv.style.marginTop = '50px';
        testDiv.style.width = '500px';
        testDiv.style.height = '500px';
        document.body.appendChild(testDiv);
        //只测了serverType为iserver得情况
        new MapService(url).getMapInfo(serviceResult => {
            map = new Map({
                target: 'map',
                view: new View({
                    center: [12957388, 4853991],
                    zoom: 11
                })
            });
            imageTileOptions = ImageSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            imageTileSource = new ImageSuperMapRest(imageTileOptions);
            var imageLayer = new TileLayer({
                source: imageTileSource
            });
            map.addLayer(imageLayer);
        });
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        document.body.removeChild(testDiv);
    });

    it('initialize', done => {
        setTimeout(() => {
            try {
                expect(imageTileOptions).not.toBeNull();
                expect(imageTileOptions.serverType).toBe('ISERVER');
                expect(imageTileOptions.crossOrigin).toBe('anonymous');
                expect(imageTileSource).not.toBeNull();
                expect(imageTileSource.urls.length).toBe(1);
                done();
            } catch (exception) {
                console.log("'initialize'案例失败：" + exception.name + ':' + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 6000);
    });

    it('tileUrlFunction', () => {
        var tempOptions = {
            redirect: true,
            prjCoordSys: { epsgCode: 4326 }
        };
        /*expect(imageLayerObject).not.toBeNull();
         expect(imageLayerObject.options.redirect).toBe(true);
         expect(imageLayerObject.options.prjCoordSys.epsgCode).toBe(4326);*/
        var pixelRatio = '245';
        var coords = new Point(120.14, 30.24);
        var tileUrl = imageTileSource.tileUrlFunction(coords, pixelRatio, tempOptions);
        expect(tileUrl).toBe(
            GlobeParameter.mapServiceURL +
                '%E4%B8%96%E7%95%8C%E5%9C%B0%E5%9B%BE_Day/image.png?transparent=true&cacheEnabled=true&redirect=false&width=256&height=256&viewBounds=%7B%22leftBottom%22%20:%20%7B%22x%22:NaN,%22y%22:NaN%7D,%22rightTop%22%20:%20%7B%22x%22:NaN,%22y%22:NaN%7D%7D'
        );
        expect(imageTileSource.getTileGrid().getTileSize()).toEqual(256);
    });

    it('tileUrlFunction_tilePoxy', () => {
        imageTileOptions.tileProxy = 'tileProxy';
        var imageTileSourcetilePoxy = new ImageSuperMapRest(imageTileOptions);
        var tempOptions = {
            redirect: true,
            prjCoordSys: { epsgCode: 4326 }
        };
        var pixelRatio = '245';
        var coords = new Point(120.14, 30.24);
        var tileUrl = imageTileSourcetilePoxy.tileUrlFunction(coords, pixelRatio, tempOptions);
        // expect(tileUrl).toBe("tileProxyhttp%3A%2F%2Flocalhost%3A8090%2Fiserver%2Fservices%2Fmap-world%2Frest%2Fmaps%2F%25E4%25B8%2596%25E7%2595%258C%25E5%259C%25B0%25E5%259B%25BE_Day%2Fimage.png%3F%26transparent%3Dtrue%26cacheEnabled%3Dfalse%26width%3D256%26height%3D256%26viewBounds%3D%257B%2522leftBottom%2522%2520%3A%2520%257B%2522x%2522%3ANaN%2C%2522y%2522%3ANaN%257D%2C%2522rightTop%2522%2520%3A%2520%257B%2522x%2522%3ANaN%2C%2522y%2522%3ANaN%257D%257D");
        expect(tileUrl).not.toBeNull();
    });

    it('tileUrlFunction_format', () => {
        if (imageTileOptions.tileProxy) {
            delete imageTileOptions['tileProxy'];
        }
        imageTileOptions.format = 'png';
        var imageTile = new ImageSuperMapRest(imageTileOptions);
        var tempOptions = {
            redirect: true,
            prjCoordSys: { epsgCode: 4326 }
        };
        var pixelRatio = '245';
        var coords = new Point(120.14, 30.24);
        var tileUrl = imageTile.tileUrlFunction(coords, pixelRatio, tempOptions);
        var urlTemp = tileUrl.split('?')[0];
        var format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe('png');

        imageTileOptions.format = 'bmp';
        imageTile = new ImageSuperMapRest(imageTileOptions);
        tileUrl = imageTile.tileUrlFunction(coords, pixelRatio, tempOptions);
        urlTemp = tileUrl.split('?')[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe('bmp');

        imageTileOptions.format = 'jpg';
        imageTile = new ImageSuperMapRest(imageTileOptions);
        tileUrl = imageTile.tileUrlFunction(coords, pixelRatio, tempOptions);
        urlTemp = tileUrl.split('?')[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe('jpg');

        imageTileOptions.format = 'gif';
        imageTile = new ImageSuperMapRest(imageTileOptions);
        tileUrl = imageTile.tileUrlFunction(coords, pixelRatio, tempOptions);
        urlTemp = tileUrl.split('?')[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe('gif');
    });
    it('tileUrlFunction_rasterfunction_ndviParameter', () => {
        imageTileOptions.rasterfunction = new NDVIParameter({ redIndex: 0, nirIndex: 2 });
        var imageTile = new ImageSuperMapRest(imageTileOptions);
        var pixelRatio = '245';
        var coords = new Point(120.14, 30.24);
        var tileUrl = imageTile.tileUrlFunction(coords, pixelRatio, olProj.get('EPSG:4326'));
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
        imageTileOptions.rasterfunction = new HillshadeParameter({ altitude: 10, azimuth: 200 });
        var imageTile = new ImageSuperMapRest(imageTileOptions);
        var pixelRatio = '245';
        var coords = new Point(120.14, 30.24);
        var tileUrl = imageTile.tileUrlFunction(coords, pixelRatio, olProj.get('EPSG:4326'));
        expect(tileUrl).not.toBeNull();
        const hillshadeParameterValue = getQueryValue(tileUrl, 'rasterfunction');
        expect(hillshadeParameterValue).not.toBeNull;
        const hillshadeParameter = JSON.parse(decodeURIComponent(hillshadeParameterValue));
        expect(hillshadeParameter.type).toBe('HILLSHADE');
        expect(hillshadeParameter.altitude).toBe(10);
        expect(hillshadeParameter.azimuth).toBe(200);
        expect(hillshadeParameter.zFactor).toBe(1);
    });
});
