import { GraticuleLayer } from '../../../src/mapboxgl/overlay/GraticuleLayer';
import mapboxgl from 'mapbox-gl';
import { Feature } from '@supermap/iclient-common';
var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';

describe('mapboxgl_GraticuleLayer', () => {
    var originalTimeout;
    var testDiv, map, graticuleLayer;
    beforeAll(() => {
        testDiv = window.document.createElement('div');
        testDiv.setAttribute('id', 'map');
        testDiv.style.styleFloat = 'left';
        testDiv.style.marginLeft = '8px';
        testDiv.style.marginTop = '50px';
        testDiv.style.width = '500px';
        testDiv.style.height = '500px';
        window.document.body.appendChild(testDiv);
        map = new mapboxgl.Map({
            container: 'map',
            style: {
                version: 8,
                sources: {
                    'raster-tiles': {
                        type: 'raster',
                        tiles: [url],
                        tileSize: 256
                    }
                },
                layers: [
                    {
                        id: 'simple-tiles',
                        type: 'raster',
                        source: 'raster-tiles',
                        minzoom: 0,
                        maxzoom: 22
                    }
                ]
            },
            center: [112, 37.94],
            zoom: 3
        });
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        if (!map.getLayer('sm-graticule-layer')) {
            graticuleLayer = new GraticuleLayer(map);
            graticuleLayer.onAdd(map);
        }
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    afterAll(() => {
        if (map.getLayer('sm-graticule-layer')) {
            map.removeLayer('sm-graticule-layer');
        }
        document.body.removeChild(testDiv);
        map = null;
    });

    it('_initialize', done => {
        setTimeout(() => {
            expect(graticuleLayer).not.toBeNull();
            expect(graticuleLayer.canvas).not.toBeNull();
            expect(graticuleLayer.map).not.toBeNull();
            expect(graticuleLayer.mapContainer).not.toBeNull();
            expect(graticuleLayer.features).not.toBeNull();
            expect(graticuleLayer.options).not.toBeNull();
            done();
        }, 6000);
    });

    it('setVisibility', () => {
        graticuleLayer.setVisibility(false);
        var visible = map.getLayoutProperty('sm-graticule-layer', 'visibility');
        expect(visible).toBe('none');
        graticuleLayer.setVisibility(true);
        visible = map.getLayoutProperty('sm-graticule-layer', 'visibility');
        expect(visible).toBe('visible');
    });

    it('_calcInterval', () => {
        const interval = map.getZoom();
        const calcInterval = map => {
            return map.getZoom();
        };
        graticuleLayer._calcInterval(calcInterval);
        expect(graticuleLayer._currLngInterval).toBe(interval);
    });

    it('_getLatPoints', () => {
        const features = [
            {
                type: 'Feature',
                geometry: {
                    coordinates: [
                        [160, 80],
                        [180, 80]
                    ],
                    type: 'LineString'
                }
            }
        ];
        const points = graticuleLayer._getLatPoints([170, 180], '', 180, features);
        expect(points[0][0]).toEqual(180);
        expect(points[0][1]).toEqual(80);
    });

    it('removeFromMap', () => {
        graticuleLayer.removeFromMap();
        expect(graticuleLayer.canvas).toBeNull();
    });
});
