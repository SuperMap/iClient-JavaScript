import { ImageTileSuperMapRest } from '../../../src/openlayers/mapping/ImageTileSuperMapRest';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';

var url = GlobeParameter.imageTileURL;
describe('openlayers_ImageTile', () => {
    var originalTimeout;
    var testDiv, map;
    beforeAll(() => {
        testDiv = document.createElement('div');
        testDiv.setAttribute('id', 'map');
        testDiv.style.styleFloat = 'left';
        testDiv.style.marginLeft = '8px';
        testDiv.style.marginTop = '50px';
        testDiv.style.width = '500px';
        testDiv.style.height = '500px';
        document.body.appendChild(testDiv);
        map = new Map({
            target: 'map',
            view: new View({
                center: [12957388, 4853991],
                zoom: 11
            })
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

    it('initialize', (done) => {
        var imageTileOptions = {
            url,
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
            sqlFilter: 'select * from xxx',
            tileProxy: 'tileProxy'
        };
        var imageTileSource = new ImageTileSuperMapRest(imageTileOptions);
        expect(imageTileSource).not.toBeNull();
        expect(imageTileOptions).not.toBeNull();
        expect(imageTileSource.options.collectionId).toBe('test');
        expect(imageTileSource.options.renderingRule).not.toBeNull();
        expect(imageTileSource.options.names[0]).toBe('test.tif');
        expect(imageTileSource.options.ids[0]).toBe(1);
        expect(imageTileSource.options.datetimeFilter).toBe('2018-02-12T23:20:50Z');
        expect(imageTileSource.options.sqlFilter).toBe('select * from xxx');
        expect(imageTileSource.tileProxy).toBe('tileProxy');
        done();
    });
});
