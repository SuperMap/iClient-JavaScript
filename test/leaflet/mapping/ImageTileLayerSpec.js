import { imageTileLayer } from '../../../src/leaflet/mapping/ImageTileLayer';
import { mockCreateTile } from '../../tool/mock_leaflet';

var url = GlobeParameter.imageTileURL;
describe('leaflet_ImageTileLayer', () => {
    var originalTimeout;
    var testDiv, map, imageLayer;
    beforeAll(() => {
        testDiv = document.createElement('div');
        testDiv.setAttribute('id', 'map');
        testDiv.style.styleFloat = 'left';
        testDiv.style.marginLeft = '8px';
        testDiv.style.marginTop = '50px';
        testDiv.style.width = '500px';
        testDiv.style.height = '500px';
        document.body.appendChild(testDiv);
        mockCreateTile();
        map = L.map('map', {
            center: [0, 0],
            maxZoom: 18,
            zoom: 1
        });
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        imageLayer = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        document.body.removeChild(testDiv);
        map.remove();
    });

    it('initialize', () => {
        var tempOptions = {
            collectionId: 'test',
            renderingRule: {
                displayMode: 'STRETCHED',
                displayBands: '0',
                interpolationMode: 'NEARESTNEIGHBOR',
                stretchOption: { stretchType: 'NONE' },
                colorTable: [
                    '0:176,241,229',
                    '10:222,251,180',
                    '20:69,177,57',
                    '30:83,158,61',
                    '50:226,161,4',
                    '80:142,16,0',
                    '100:155,118,87',
                    '200:255,255,255'
                ],
                gridFuncOptions: [{ Altitude: 45.0, Azimuth: 135.0, ZFactor: 0.00001, girdFuncName: 'GFHillShade' }]
            },
            names: ['test.tif'],
            ids: [1],
            datetimeFilter: '2018-02-12T23:20:50Z',
            sqlFilter: 'select * from xxx'
        };
        var imageLayer = imageTileLayer(url, tempOptions).addTo(map);
        expect(imageLayer).not.toBeNull();
        expect(imageLayer.options.collectionId).toBe('test');
        expect(imageLayer.options.renderingRule).not.toBeNull();
        expect(imageLayer.options.names[0]).toBe('test.tif');
        expect(imageLayer.options.ids[0]).toBe(1);
        expect(imageLayer.options.datetimeFilter).toBe('2018-02-12T23:20:50Z');
        expect(imageLayer.options.sqlFilter).toBe('select * from xxx');
    });

    it('getTileUrl', () => {
        var options = { format: 'png', collectionId: 'test' };
        var layer = imageTileLayer(url, options).addTo(map);
        expect(layer.getTileUrl({ x: 30, y: 24, z: 0 })).toBe(
            'http://localhost:9876/iserver/services/imageservice-hainan2image/restjsr/collections/test/tile.png?transparent=true&cacheEnabled=true&z=2&x=30&y=24'
        );
    });

    it('getTileUrl_remove', () => {
        var coords = { x: 0, y: 0, z: 0 };
        var layer = imageTileLayer(url, {
            collectionId: 'test'
        }).addTo(map);
        expect(layer.getTileUrl(coords)).toBe(
            'http://localhost:9876/iserver/services/imageservice-hainan2image/restjsr/collections/test/tile.png?transparent=true&cacheEnabled=true&z=2&x=0&y=0'
        );
        layer.remove();
        layer.addTo(map);
        expect(layer.getTileUrl(coords)).toBe(
            'http://localhost:9876/iserver/services/imageservice-hainan2image/restjsr/collections/test/tile.png?transparent=true&cacheEnabled=true&z=2&x=0&y=0'
        );
    });
});
