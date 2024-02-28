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
        if (!map.getLayer('graticuleLayer_1')) {
            graticuleLayer = new GraticuleLayer({layerID :'graticuleLayer_1'});
            graticuleLayer.onAdd(map);
        }
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    afterAll(() => {
        if (map.getLayer('graticuleLayer_1')) {
            map.removeLayer('graticuleLayer_1');
        }
        document.body.removeChild(testDiv);
        map = null;
    });

    it('_initialize', done => {
        setTimeout(() => {
            expect(graticuleLayer).not.toBeNull();
            expect(graticuleLayer.renderer.canvas).not.toBeNull();
            expect(graticuleLayer.map).not.toBeNull();
            expect(graticuleLayer.mapContainer).not.toBeNull();
            expect(graticuleLayer.features).not.toBeNull();
            expect(graticuleLayer.options).not.toBeNull();
            done();
        }, 0);
    });

    it('setVisibility', () => {
        graticuleLayer.setVisibility(false);
        var visible = map.getLayoutProperty('graticuleLayer_1_line', 'visibility');
        expect(visible).toBe('none');
        graticuleLayer.setVisibility(true);
        visible = map.getLayoutProperty('graticuleLayer_1_line', 'visibility');
        expect(visible).toBe('visible');
    });

    it('setMinZoom', () => {
        graticuleLayer.setMinZoom(0);
        expect(graticuleLayer.options.minZoom).toEqual(0);
    });

    it('setMaxZoom', () => {
        graticuleLayer.setMaxZoom(10);
        expect(graticuleLayer.options.maxZoom).toEqual(10);
    });

    it('setShowLabel', () => {
        graticuleLayer.setShowLabel(false);
        expect(graticuleLayer.options.showLabel).toEqual(false);
    });

    it('setExtent', () => {
        graticuleLayer.setExtent([
            [0, 0],
            [50, 50]
        ]);
        expect(graticuleLayer.options.extent[0]).toEqual(0);
        expect(graticuleLayer.options.extent[3]).toEqual(50);
    });

    it('setStrokeStyle', () => {
        graticuleLayer.setStrokeStyle({ lineWidth: 3 });
        expect(graticuleLayer.options.strokeStyle.lineWidth).toEqual(3);
    });

    it('setLngLabelStyle', () => {
        graticuleLayer.setLngLabelStyle({ textSize: '12px' });
        expect(graticuleLayer.options.lngLabelStyle.textSize).toEqual('12px');
    });

    it('setLatLabelStyle', () => {
        graticuleLayer.setLatLabelStyle({ textSize: '12px' });
        expect(graticuleLayer.options.latLabelStyle.textSize).toEqual('12px');
    });

    it('setIntervals', () => {
        graticuleLayer.setIntervals(5);
        expect(graticuleLayer.renderer.options.interval).toEqual(5);
    });

    it('_calcInterval', () => {
        const interval = map.getZoom();
        const calcInterval = map => {
            return map.getZoom();
        };
        graticuleLayer.renderer._calcInterval(calcInterval);
        expect(graticuleLayer.renderer._currLngInterval).toBe(interval);
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

    it('onRemove', () => {
        graticuleLayer.onRemove();
        expect(graticuleLayer.renderer.canvas).toBeNull();
    });
});
