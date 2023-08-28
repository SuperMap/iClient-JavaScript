import maplibregl from 'maplibre-gl';
import { FetchRequest } from '../../../../src/common/util/FetchRequest';

describe('maplibregl_MapExtendSymbol', () => {
    // CI测试挂了
    // var url = GlobeParameter.ChinaURL;
    // var populationUrl = GlobeParameter.populationURL;
    var testDiv, map;
    var originalTimeout;
    // 尝试解决方法来源 https://github.com/jestjs/jest/issues/1256
    var createMap = () => {
        return new Promise((resolve) => {
            var map = new maplibregl.Map({
                container: 'map',
                style: {
                    "version": 8,
                    "sources": {
                       /*  "raster-tiles": {
                            "type": "raster",
                            "tiles": [url + '/zxyTileImage.png?z={z}&x={x}&y={y}'],
                            "tileSize": 256
                        },
                        "全国人口密度空间分布图": {
                            "tiles": [
                                populationUrl + "/tileFeature.mvt?z={z}&x={x}&y={y}"
                            ],
                            "type": "vector"
                        } */
                    },
                    "layers": [/* {
                        "id": "simple-tiles",
                        "type": "raster",
                        "source": "raster-tiles",
                        "minzoom": 0,
                        "maxzoom": 22
                    } */]
                },
                center: [116.40, 39.79],
                zoom: 3
            });
            map.on('load', function () {
                resolve(map);
            });
        })
    }
    beforeAll(async () => {
        new maplibregl.supermap.WebSymbol().init();
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);
        map = await createMap();
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
        map = null;
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
  
    it('map.addLayer exists layerID', () => {
        spyOn(map.symbolHandler, 'getLayerIds').and.returnValue(["point-1", "point-2"]);
        spyOn(map.symbolHandler, 'addLayer');
        spyOn(map, 'addLayerBySymbolBak');
        const mylayer = {
            "id": "PopDensity_P@Population",
            "source": "全国人口密度空间分布图",
            "source-layer": "PopDensity_R@Population",
            "type": "symbol",
            "symbol": "start"
        };
        map.addLayer(mylayer);
        expect(map.symbolHandler.getLayerIds).toHaveBeenCalled();
        expect(map.symbolHandler.addLayer).not.toHaveBeenCalled();
        expect(map.addLayerBySymbolBak).not.toHaveBeenCalled();
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
    it('map.updateSymbol', () => {
        spyOn(map.symbolHandler, 'updateSymbol');
        map.updateSymbol("line-1", {
            paint: {
                "line-width": 10
            }
        });
        expect(map.symbolHandler.updateSymbol).toHaveBeenCalled();
    });
    it('map.setSymbolProperty', () => {
        spyOn(map.symbolHandler, 'setSymbolProperty');
        map.setSymbolProperty("line-1", 0, "line-width", 5);
        expect(map.symbolHandler.setSymbolProperty).toHaveBeenCalled();
    });
    it('map.getSymbolProperty', () => {
        spyOn(map.symbolHandler, 'getSymbolProperty').and.returnValue(5);
        const value = map.getSymbolProperty("line-1", 0, "line-width");
        expect(map.symbolHandler.getSymbolProperty).toHaveBeenCalled();
        expect(value).toBe(5);
    });
    it('map.getSymbol', () => {
        spyOn(map.symbolHandler, 'getSymbol').and.returnValue({
            paint: {
                "icon-color": "red"
            }
        });
        const value = map.getSymbol("point-1");
        expect(map.symbolHandler.getSymbol).toHaveBeenCalled();
        expect(value.paint["icon-color"]).toBe("red");
    });
    it('map.on', () => {
        spyOn(map, 'onBak');
        spyOn(map.style, 'getLayer').and.returnValue({
            id: "point"
        });
        spyOn(map.symbolHandler, 'getLayerIds').and.returnValue([]);
        const listnener = () => {};
        map.on("click", "point", listnener);
        expect(map.onBak).toHaveBeenCalled();
        expect(map.style.getLayer).toHaveBeenCalled();
        expect(map.symbolHandler.getLayerIds).not.toHaveBeenCalled();
    });
    it('map.on getLayerIds', () => {
        spyOn(map, 'onBak');
        spyOn(map.style, 'getLayer').and.returnValue(undefined);
        spyOn(map.symbolHandler, 'getLayerIds').and.returnValue(["point-1", "point-2"]);
        map.on("click", "point", () => {});
        expect(map.onBak).toHaveBeenCalled();
        expect(map.style.getLayer).toHaveBeenCalled();
        expect(map.symbolHandler.getLayerIds).toHaveBeenCalled();
    });
    it('map.once', () => {
        spyOn(map, 'onceBak');
        spyOn(map.style, 'getLayer').and.returnValue({
            id: "point"
        });
        spyOn(map.symbolHandler, 'getLayerIds').and.returnValue([]);
        map.once("click", "point", () => {});
        expect(map.onceBak).toHaveBeenCalled();
        expect(map.style.getLayer).toHaveBeenCalled();
        expect(map.symbolHandler.getLayerIds).not.toHaveBeenCalled();
    });
    it('map.once getLayerIds', () => {
        spyOn(map, 'onceBak');
        spyOn(map.style, 'getLayer').and.returnValue(undefined);
        spyOn(map.symbolHandler, 'getLayerIds').and.returnValue(["point-1", "point-2"]);
        map.once("click", "point", () => {});
        expect(map.onceBak).toHaveBeenCalled();
        expect(map.style.getLayer).toHaveBeenCalled();
        expect(map.symbolHandler.getLayerIds).toHaveBeenCalled();
    });
    it('map.off', () => {
        spyOn(map, 'offBak');
        spyOn(map.style, 'getLayer').and.returnValue({
            id: "point"
        });
        spyOn(map.symbolHandler, 'getLayerIds').and.returnValue([]);
        map.off("click", "point", () => {});
        expect(map.offBak).toHaveBeenCalled();
        expect(map.style.getLayer).toHaveBeenCalled();
        expect(map.symbolHandler.getLayerIds).not.toHaveBeenCalled();
    });
    it('map.off getLayerIds', () => {
        spyOn(map, 'offBak');
        spyOn(map.style, 'getLayer').and.returnValue(undefined);
        spyOn(map.symbolHandler, 'getLayerIds').and.returnValue(["point-1", "point-2"]);
        map.off("click", "point", () => {});
        expect(map.offBak).toHaveBeenCalled();
        expect(map.style.getLayer).toHaveBeenCalled();
        expect(map.symbolHandler.getLayerIds).toHaveBeenCalled();
    });
});