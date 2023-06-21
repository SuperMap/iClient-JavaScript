import mapboxgl from 'mapbox-gl';
import "../../../../src/mapboxgl/overlay/symbol/MapExtendSymbol";
import { FetchRequest } from '../../../../src/common/util/FetchRequest';

describe('MapExtendSymbol', () => {
    var url = GlobeParameter.ChinaURL;
    var populationUrl = GlobeParameter.populationURL;
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
                            populationUrl + "/tileFeature.mvt?z={z}&x={x}&y={y}"
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
        setTimeout(() => {
            done();
        }, 0);
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

    it('map.moveLayer', () => {
        spyOn(map.style, 'getLayer').and.returnValue({
            id: 'PopDensity_P@Population'
        });
        spyOn(map, 'moveLayerBySymbolBak');
        map.moveLayer("PopDensity_P@Population", "PopDensity_R@Population");
        expect(map.moveLayerBySymbolBak).toHaveBeenCalled();
    });

    it('map.moveLayer no beforeId', () => {
        spyOn(map.style, 'getLayer').and.returnValue({
            id: 'PopDensity_P@Population'
        });
        spyOn(map, 'moveLayerBySymbolBak');
        map.moveLayer("PopDensity_P@Population");
        expect(map.moveLayerBySymbolBak).toHaveBeenCalled();
    });

    it('map.moveLayer no Layer', () => {
        spyOn(map.style, 'getLayer').and.returnValue(null);
        spyOn(map, 'moveLayerBySymbolBak');
        spyOn(map, '_update');
        map.moveLayer("PopDensity_P@Population");
        expect(map.moveLayerBySymbolBak).not.toHaveBeenCalled();
        expect(map._update).toHaveBeenCalled();
    });

    it('map.removeLayer no Layer', () => {
        spyOn(map.style, 'getLayer').and.returnValue(null);
        spyOn(map, 'removeLayerBySymbolBak');
        map.removeLayer("PopDensity_P@Population");
        expect(map.removeLayerBySymbolBak).not.toHaveBeenCalled();
    });

    it('map.removeLayer id', () => {
        spyOn(map.style, 'getLayer').and.returnValue({
            id: 'PopDensity_P@Population'
        });
        spyOn(map, 'removeLayerBySymbolBak');
        spyOn(map.symbolHandler, 'removeLayer');
        map.removeLayer("PopDensity_P@Population");
        expect(map.removeLayerBySymbolBak).toHaveBeenCalled();
    });

    it('setLayerZoomRange', () => {
        spyOn(map.style, 'getLayer').and.returnValue({
            id: 'PopDensity_P@Population'
        });
        spyOn(map.style, 'setLayerZoomRange');
        spyOn(map, '_update');
        map.setLayerZoomRange('PopDensity_R@Population', 2, 5);
        expect(map.style.setLayerZoomRange).toHaveBeenCalled();
    });

    it('setLayerZoomRange-noLayer', () => {
        spyOn(map.style, 'getLayer').and.returnValue(null);
        spyOn(map.style, 'setLayerZoomRange');
        spyOn(map.symbolHandler, 'setLayerZoomRange');
        map.setLayerZoomRange('PopDensity_R@Population', 2, 5);
        expect(map.symbolHandler.setLayerZoomRange).toHaveBeenCalled();
    });

    it('map.setSymbol', () => {
        spyOn(map.symbolHandler, 'setSymbol');
        map.setSymbol("PopDensity_R@Population", "polygon");
        expect(map.symbolHandler.setSymbol).toHaveBeenCalled();
    });
    it('map.addLayer no symbol', () => {
        const mylayer = {
          "id": "PopDensity_R@Population",
          "source": "全国人口密度空间分布图",
          "source-layer": "PopDensity_R@Population",
          "type": "fill",
          "paint": {
            "fill-color": "rgba(197,88,254,1.00)",
            "fill-antialias": true
          }
        }
        spyOn(map.style, 'addLayer');
        spyOn(map.style, 'getLayer')
          .withArgs("PopDensity_R@Population")
          .and.returnValue(mylayer);;
        map.addLayer(mylayer);
        const layer = map.getLayer("PopDensity_R@Population");
        expect(layer).not.toBeNull();
    });
  
    it('map.addLayer symbol', () => {
        spyOn(map.style, 'addLayer');
        spyOn(map.style, 'addImage');
        const mylayer = {
            "id": "PopDensity_P@Population",
            "source": "全国人口密度空间分布图",
            "source-layer": "PopDensity_R@Population",
            "type": "symbol",
            "symbol": "start"
        }
        spyOn(map.style, 'getLayer').and.returnValue(mylayer);

        map.addSymbol("start", { "layout": { "icon-image": "point-1" } });
        map.addLayer(mylayer);
        const layer = map.getLayer("PopDensity_P@Population");
        expect(layer).not.toBeNull();
    });
  
    it('setFilter', () => {
        spyOn(map.style, 'setFilter');
        spyOn(map.style, 'getFilter')
        .and.returnValue([ 'all', [ '==', '$type', 'LineString' ] ]);
        spyOn(map.style, 'getLayer')
        .and.returnValue({
            "id": "PopDensity_P@Population",
            "source": "全国人口密度空间分布图",
            "source-layer": "PopDensity_R@Population",
            "type": "symbol",
        });
        map.setFilter('PopDensity_R@Population', [ 'all', [ '==', '$type', 'LineString' ] ]);
        expect(map.getFilter('PopDensity_R@Population')).toEqual([ 'all', [ '==', '$type', 'LineString' ] ]);
    });
    it('map.setLayoutProperty', () => {
        const layerId = 'Landuse_R2';

        spyOn(map.style, 'getLayer')
            .and.returnValue(layerId);
        spyOn(map.style, 'setLayoutProperty')
            .and.returnValue(null);

        map.setLayoutProperty(layerId, "line-join", "miter");
        expect(map.style.setLayoutProperty).toHaveBeenCalled();

        spyOn(map.style, 'getLayoutProperty')
            .withArgs(layerId, "line-join")
            .and.returnValue("miter");
        map.getLayoutProperty(layerId, "line-join");
        expect(map.style.getLayoutProperty).toHaveBeenCalled();
    });
    it('map.setPaintProperty', () => {
        spyOn(map.style, 'getLayer').and.returnValue({
            id: 'PopDensity_P@Population'
        });
        spyOn(map.style, 'setPaintProperty');
        spyOn(map.style, 'getPaintProperty');
        spyOn(map, '_update');
        map.setPaintProperty("PopDensity_R@Population", "fill-color", "black");
        map.getPaintProperty("PopDensity_P@Population", "fill-color");
        expect(map.style.setPaintProperty).toHaveBeenCalled();
        expect(map.style.getPaintProperty).toHaveBeenCalled();
    });

});