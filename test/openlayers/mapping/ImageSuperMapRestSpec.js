import { ImageSuperMapRest } from '../../../src/openlayers/mapping/ImageSuperMapRest';
import { MapService } from '../../../src/openlayers/services/MapService';
import { NDVIParameter } from '../../../src/common/iServer/NDVIParameter';
import { HillshadeParameter } from '../../../src/common/iServer/HillshadeParameter';
import { getQueryValue } from '../../tool/utils';

import Map from 'ol/Map';
import View from 'ol/View';
import ImageLayer from 'ol/layer/Image';
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';

var url = GlobeParameter.imageURL;
describe('openlayers_ImageSuperMapRest', () => {
    var originalTimeout;
    var testDiv, map, imageTileOptions, imageTileSource;
    var extent = [-102.919921875, -11.250000000000002, 122.080078125, 35.244140625];
    var resolution = 0.087890625;
    var pixelRatio = 1;
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
            var imageLayer = new ImageLayer({
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
                expect(imageTileSource).not.toBeNull();
                done();
            } catch (exception) {
                console.log("'initialize'案例失败：" + exception.name + ':' + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 0);
    });

    it('getImageInternal', () => {
       
        var tileUrl = imageTileSource.getImageInternal(extent, resolution, pixelRatio).src_;
        expect(tileUrl).toBe(
            GlobeParameter.mapServiceURL +
                '%E4%B8%96%E7%95%8C%E5%9C%B0%E5%9B%BE_Day/image.png?transparent=true&cacheEnabled=true&redirect=false&width=3840&height=794&viewBounds=%7B%22leftBottom%22%3A%7B%22x%22%3A-159.16992187500045%2C%22y%22%3A-22.895507812500092%7D%2C%22rightTop%22%3A%7B%22x%22%3A178.33007812500045%2C%22y%22%3A46.88964843750009%7D%7D'
        );
    });

    it('tileUrlFunction_tilePoxy', () => {
        imageTileOptions.tileProxy = 'tileProxy';
        var imageTileSourcetilePoxy = new ImageSuperMapRest(imageTileOptions);
        var tempOptions = {
            redirect: true,
            prjCoordSys: { epsgCode: 4326 }
        };
        var tileUrl = imageTileSourcetilePoxy.getImageInternal(extent, resolution, pixelRatio).src_;
        expect(tileUrl.startsWith('tileProxy')).toBeTrue();
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
        var tileUrl = imageTile.getImageInternal(extent, resolution, pixelRatio).src_;
        var urlTemp = tileUrl.split('?')[0];
        var format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe('png');

        imageTileOptions.format = 'bmp';
        imageTile = new ImageSuperMapRest(imageTileOptions);
        tileUrl = imageTile.getImageInternal(extent, resolution, pixelRatio).src_;
        urlTemp = tileUrl.split('?')[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe('bmp');

        imageTileOptions.format = 'jpg';
        imageTile = new ImageSuperMapRest(imageTileOptions);
        tileUrl = imageTile.getImageInternal(extent, resolution, pixelRatio).src_;
        urlTemp = tileUrl.split('?')[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe('jpg');

        imageTileOptions.format = 'gif';
        imageTile = new ImageSuperMapRest(imageTileOptions);
        tileUrl = imageTile.getImageInternal(extent, resolution, pixelRatio).src_;
        urlTemp = tileUrl.split('?')[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe('gif');
    });
    it('tileUrlFunction_rasterfunction_ndviParameter', () => {
        imageTileOptions.rasterfunction = new NDVIParameter({ redIndex: 0, nirIndex: 2 });
        var imageTile = new ImageSuperMapRest(imageTileOptions);
        var pixelRatio = '245';
        var coords = new Point(120.14, 30.24);
        var tileUrl = imageTile.getImageInternal(extent, resolution, pixelRatio).src_;
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
        var tileUrl = imageTile.getImageInternal(extent, resolution, pixelRatio).src_;
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
