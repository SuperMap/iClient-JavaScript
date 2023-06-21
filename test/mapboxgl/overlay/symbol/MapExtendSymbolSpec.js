import mapboxgl from 'mapbox-gl';
import "../../../../src/mapboxgl/overlay/symbol/MapExtendSymbol";
import { FetchRequest } from '../../../../src/common/util/FetchRequest';

describe('MapExtendSymbol', () => {
    var url = 'http://localhost:8099/s3h4sgb3/iserver/services/map-china400/rest/maps/China';
    var testDiv, map;
    var originalTimeout;
    beforeAll((done) => {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);
        map = new mapboxgl.Map({
            container: 'map',
            style: {
                "version": 8,
                "sources": {
                    "raster-tiles": {
                        "type": "raster",
                        "tiles": [url + '/zxyTileImage.png?z={z}&x={x}&y={y}'],
                        "tileSize": 256
                    },
                    "全国人口密度空间分布图": {
                        "tiles": [
                            "http:/fake:8090/iserver/services/map-Population/rest/maps/PopulationDistribution/tileFeature.mvt?z={z}&x={x}&y={y}"
                        ],
                        "type": "vector"
                    }
                },
                "layers": [{
                    "id": "simple-tiles",
                    "type": "raster",
                    "source": "raster-tiles",
                    "minzoom": 0,
                    "maxzoom": 22
                }]
            },
            center: [116.40, 39.79],
            zoom: 3
        });
        map.on('load', function () {
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
        map.remove();
    });

    it('map.loadSymbol point-1', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((path) => {
            return Promise.resolve(new Response("{\"layout\":{\"icon-image\":\"point-1\"}}"));
        });
        map.loadSymbol("point-1", (error, symbol) => {
            expect(error).toBe(null);
            expect(symbol.layout["icon-image"]).toBe("point-1");
            done();
        })
    });

    it('map.loadSymbol error', () => {
        map.loadSymbol({}, (error, symbol) => {
            expect(error).not.toBeNull();
            expect(symbol).toBe(undefined);
        })
        spyOn(FetchRequest, 'get').and.callFake((path) => {
            return Promise.reject();
        });
        map.loadSymbol("point-1", (error, symbol) => {
            expect(error).not.toBeNull();
            expect(symbol).toBe(undefined);
        })
    });

    it('map.addSymbol', (done) => {
        map.addSymbol("start", { "layout": { "icon-image": "point-1" } });
        expect(map.hasSymbol('start')).toBeTruthy();
        done();
    });

    it('map.removeSymbol', (done) => {
        map.removeSymbol("start");
        expect(map.hasSymbol('start')).toBeFalsy();
        done();
    });

    it('map.hasSymbol', (done) => {
        expect(map.hasSymbol()).toBeFalsy();
        done();
    });

    it('map.addLayer no symbol', (done) => {
        map.addLayer({
            "id": "PopDensity_R@Population",
            "source": "全国人口密度空间分布图",
            "source-layer": "PopDensity_R@Population",
            "type": "fill",
            "paint": {
                "fill-color": "rgba(197,88,254,1.00)",
                "fill-antialias": true
            }
        });
        const layer = map.getLayer("PopDensity_R@Population");
        expect(layer).not.toBeNull();
        expect(layer.id).toBe("PopDensity_R@Population");
        done();
    });

    it('map.addLayer symbol', (done) => {
        map.addSymbol("start", { "layout": { "icon-image": "point-1" } });
        map.addLayer({
            "id": "PopDensity_P@Population",
            "source": "全国人口密度空间分布图",
            "source-layer": "PopDensity_R@Population",
            "type": "symbol",
            "symbol": "start"
        });
        const layer = map.getLayer("PopDensity_P@Population");
        expect(layer).not.toBeNull();
        expect(layer.id).toBe("PopDensity_P@Population");
        expect(layer.symbol).toBe("start");
        done();
    });

    it('map.moveLayer', (done) => {
        const styleLayers = map.getStyle().layers;
        expect(styleLayers.length).toBe(3);
        expect(styleLayers[1].id).toBe("PopDensity_R@Population");
        expect(styleLayers[2].id).toBe("PopDensity_P@Population");
        map.moveLayer("PopDensity_P@Population", "PopDensity_R@Population");
        const newLayers = map.getStyle().layers;
        expect(newLayers.length).toBe(3);
        expect(newLayers[1].id).toBe("PopDensity_P@Population");
        expect(newLayers[2].id).toBe("PopDensity_R@Population");
        map.moveLayer("PopDensity_P@Population");
        done();
    });

    it('map.moveLayer no beforeId', (done) => {
        map.moveLayer("PopDensity_P@Population");
        const newLayers = map.getStyle().layers;
        expect(newLayers.length).toBe(3);
        expect(newLayers[2].id).toBe("PopDensity_P@Population");
        done();
    });

    it('map.moveLayer error id', (done) => {
        map.moveLayer("PopDensity");
        const newLayers = map.getStyle().layers;
        expect(newLayers.length).toBe(3);
        done();
    });

    it('map.removeLayer error id', (done) => {
        map.removeLayer("PopDensity");
        const newLayers = map.getStyle().layers;
        expect(newLayers.length).toBe(3);
        done();
    });

    it('map.removeLayer id', (done) => {
        map.removeLayer("PopDensity_P@Population");
        const newLayers = map.getStyle().layers;
        expect(newLayers.length).toBe(2);
        expect(newLayers[1].id).toBe("PopDensity_R@Population");
        done();
    });

    it('map.setPaintProperty', (done) => {
        map.setPaintProperty("PopDensity_P@Population");
        map.setPaintProperty("PopDensity_R@Population", "fill-color", "black");
        expect(map.getPaintProperty("PopDensity_R@Population", "fill-color")).toBe("black");
        done();
    });

    it('map.setLayoutProperty', (done) => {
        map.setLayoutProperty("PopDensity_P@Population");
        map.getLayoutProperty("PopDensity_P@Population", "visibility");
        map.setLayoutProperty("PopDensity_R@Population", "visibility", "visible");
        expect(map.getLayoutProperty("PopDensity_R@Population", "visibility")).toBe("visible");
        done();
    });

    it('setLayerZoomRange', () => {
        map.setLayerZoomRange('PopDensity_R@Population', 2, 5);
        expect(map.getLayer('PopDensity_R@Population').minzoom).toBe(2);
        expect(map.getLayer('PopDensity_R@Population').maxzoom).toBe(5);
    });

    it('setFilter', () => {
        map.getFilter("PopDensity_P@Population");
        map.setFilter("PopDensity_P@Population", []);
        expect(map.getFilter('PopDensity_R@Population')).toBe(undefined);
        map.setFilter('PopDensity_R@Population', [
            "all",
            [
                "==",
                "$type",
                "LineString"
            ]
        ]);
        expect(map.getFilter('PopDensity_R@Population')).toEqual([
            "all",
            [
                "==",
                "$type",
                "LineString"
            ]
        ]);
    });

    it('map.setSymbol', () => {
        map.addSymbol("polygon", [
            {
                paint: {
                    'fill-color': "rgba(255, 0, 0, 0.5)"
                }
            },
            {
                paint: {
                    'fill-color': "rgba(0, 0, 255, 0.5)"
                }
            }
        ])
        expect(map.getLayer("PopDensity_R@Population").symbol).toBe(undefined);
        map.setSymbol("PopDensity_R@Population", "polygon");
        expect(map.getLayer("PopDensity_R@Population").symbol).toBe("polygon");
        map.setLayerZoomRange('PopDensity_R@Population', 2, 5);
    })

    it('setStyle', () => {
        map.setStyle({
            "version": 8,
            "sources": {
                "raster-tiles": {
                    "type": "raster",
                    "tiles": [url + '/zxyTileImage.png?z={z}&x={x}&y={y}'],
                    "tileSize": 256
                },
                "全国人口密度空间分布图": {
                    "tiles": [
                        "http:/fake:8090/iserver/services/map-Population/rest/maps/PopulationDistribution/tileFeature.mvt?z={z}&x={x}&y={y}"
                    ],
                    "type": "vector"
                }
            },
            "layers": [{
                "id": "simple-tiles",
                "type": "raster",
                "source": "raster-tiles",
                "minzoom": 0,
                "maxzoom": 22
            }, {
                "id": "PopDensity_P@Population",
                "source": "全国人口密度空间分布图",
                "source-layer": "PopDensity_R@Population",
                "type": "symbol",
                "symbol": "start"
            }]
        });
        const layers = map.getStyle().layers;
        expect(layers.length).toBe(2);
        expect(layers[1].symbol).toBe("start");
        expect(layers[0].id).toBe("simple-tiles");
    });
});