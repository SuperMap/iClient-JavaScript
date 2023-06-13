import { HeatMapLayer } from '../../../src/maplibregl/overlay/HeatMapLayer';
import maplibregl from 'maplibre-gl';
import { truncate } from '@turf/turf';

var url = GlobeParameter.worldMapURL;
describe('maplibregl_HeatMapLayer', () => {
    var originalTimeout;
    var testDiv, map, heatLayer;
    beforeAll((done) => {
        testDiv = window.document.createElement('div');
        testDiv.setAttribute('id', 'map');
        testDiv.style.styleFloat = 'left';
        testDiv.style.marginLeft = '8px';
        testDiv.style.marginTop = '50px';
        testDiv.style.width = '500px';
        testDiv.style.height = '500px';
        window.document.body.appendChild(testDiv);

        map = new maplibregl.Map({
            container: 'map',
            style: {
                version: 8,
                sources: {
                    'raster-tiles': {
                        type: 'raster',
                        tiles: [url + '/zxyTileImage.png?z={z}&x={x}&y={y}'],
                        tileSize: 256
                    }
                },
                layers: [
                    {
                        id: 'simple-tiles',
                        type: 'raster',
                        source: 'raster-tiles',
                        minzoom: 0,
                        maxzoom: 9
                    }
                ]
            },
            center: [0, 0],
            zoom: 1
        });

        heatLayer = new HeatMapLayer('heatMap', {
            map: map,
            id: 'heatmap',
            radius: 45,
            featureWeight: 'value'
        });
        var heatPoints = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [0, 0]
                    },
                    properties: {
                        value: Math.random() * 9,
                        geoRadius: null
                    }
                }
            ]
        };
        heatLayer.addFeatures(heatPoints);
        map.on('load', () => {
          map.addLayer(heatLayer);
          done();
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
        window.document.body.removeChild(testDiv);
        map.removeLayer('heatmap');
        if(map.getLayer('heatmap_2')) {
          map.removeLayer('heatmap_2');
        }
    });

    it('initialize', () => {
        expect(heatLayer).not.toBeNull();
        expect(heatLayer.id).toBe('heatmap');
        expect(heatLayer.renderer).not.toBeNull();
        expect(heatLayer.renderer.radius).toEqual(45);
        expect(heatLayer.renderer.featureWeight).toBe('value');
        expect(heatLayer.features.features.length).toEqual(1);
        expect(heatLayer.renderer.colors.length).toEqual(5);
        expect(heatLayer.renderer.opacity).toEqual(1);
        expect(heatLayer.renderer.useGeoUnit).toBeFalsy();
    });

    it('toiClientFeature', () => {
        var heatPoints = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [0, 0]
                    },
                    properties: {
                        value: 2
                    }
                }
            ]
        };

        var toiClientFeature = heatLayer.renderer.toiClientFeature(heatPoints);
        expect(toiClientFeature).not.toBeNull();
        expect(toiClientFeature.length).toEqual(1);
        expect(toiClientFeature[0].CLASS_NAME).toBe('SuperMap.Feature.Vector');
    });

    it('addFeatures, removeFeatures, removeAllFeatures', () => {
        var heatPoints = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [0, 0]
                    },
                    properties: {
                        value: 2
                    }
                },
                {
                    type: 'feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [1, 1]
                    },
                    properties: {
                        value: 4
                    }
                },
                {
                    type: 'feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [2, 1]
                    },
                    properties: {
                        value: 8
                    }
                }
            ]
        };
        //测试addFeatures
        heatLayer.addFeatures(heatPoints);
        expect(heatLayer.renderer.features.length).toEqual(3);
        //测试removeFeatures
        var removeFeatures = [];
        heatLayer.removeFeatures(removeFeatures);
        expect(heatLayer.renderer.features.length).toEqual(3);

        heatLayer.removeFeatures(heatLayer.renderer.features[0]);
        expect(heatLayer.renderer.features.length).toEqual(2);

        removeFeatures.push(heatLayer.renderer.features[0]);
        heatLayer.removeFeatures(removeFeatures);
        expect(heatLayer.renderer.features.length).toEqual(1);

        removeFeatures = [];
        removeFeatures.push(heatLayer.renderer.features[0]);
        heatLayer.removeFeatures(removeFeatures);
        expect(heatLayer.renderer.features.length).toEqual(0);

        //测试removeAllFeatures
        heatLayer.addFeatures(heatPoints);
        heatLayer.removeFeatures(heatLayer.renderer.features);
        expect(heatLayer.renderer.features.length).toEqual(0);
    });

    it('setOpacity', () => {
        heatLayer.setOpacity(0.5);
        var opacity = heatLayer.renderer.rootCanvas.style.opacity;
        expect(opacity).toBe('0.5');
    });

    it('moveTo', () => {
        var heatMapLayer2 = new HeatMapLayer('heatMap', {
            map: map,
            id: 'heatmap_2',
            radius: 45,
            featureWeight: 'value'
        });
        var heatPoints = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [1, 1]
                    },
                    properties: {
                        value: Math.random() * 9,
                        geoRadius: null
                    }
                }
            ]
        };
        heatMapLayer2.addFeatures(heatPoints);
        map.addLayer(heatMapLayer2);

        const rootCanvas = heatLayer.renderer.rootCanvas;
        var children = rootCanvas.parentNode.children;
        var heatMapLayerIndexBefore, heatMapLayerIndexAfter;
        for (var i = 0; i < children.length; i++) {
            if (rootCanvas === children[i]) {
                heatMapLayerIndexBefore = i;
            }
        }

        heatLayer.moveTo('heatmap_2');

        for (var i = 0; i < children.length; i++) {
            if (rootCanvas === children[i]) {
                heatMapLayerIndexAfter = i;
            }
        }

        expect(heatMapLayerIndexBefore).toEqual(heatMapLayerIndexAfter);
        heatLayer.moveTo('heatmap_2', false);
        for (var i = 0; i < children.length; i++) {
            if (rootCanvas === children[i]) {
                heatMapLayerIndexAfter = i;
            }
        }
        expect(heatMapLayerIndexBefore).not.toEqual(heatMapLayerIndexAfter);
    });

    it('setVisibility', (done) => {
        heatLayer.setVisibility(false);
        expect(heatLayer.renderer.visibility).toBeFalsy();
        setTimeout(() => {
            expect(heatLayer.renderer.rootCanvas.style.display).toBe('none');
            heatLayer.setVisibility(true);
            done();
        }, 0);
    });

    it('removeFeatures', () => {
        heatLayer.removeFeatures(heatLayer.renderer.features);
        expect(heatLayer.renderer.features.length).toBeFalsy();
    });
    it('mapMove', (done) => {
        heatLayer.loadWhileAnimating = false;
        map.panBy([1, 1]);
        setTimeout(() => {
            expect(heatLayer.renderer.rootCanvas.style.transform).not.toBeNull()
            done();
        }, 0);
    });
    it('mapZoom', (done) => {
        map.setZoom(3);
        setTimeout(() => {
            expect(heatLayer.renderer.rootCanvas.style.display).toBe('block');
            done();
        }, 0);
    });
});
