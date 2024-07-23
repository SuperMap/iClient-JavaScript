import SymbolHandler from '../../../../src/mapboxgl/overlay/symbol/SymbolHandler';
import mapboxgl from 'mapbox-gl';
var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';
describe('mapboxgl_symbol_SymbolHandler', () => {
  var testDiv, map, handler;
  var originalTimeout;
  beforeAll((done) => {
    new mapboxgl.supermap.WebSymbol().init();
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
          },
          "jingjin": {
            "tiles": [
                GlobeParameter.jingjinMapURL + "/tileFeature.mvt?z={z}&x={x}&y={y}"
              ],
            "type": "vector"
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
      center: [0, 0],
      zoom: 3
    });
    setTimeout(() => {
        done();
    }, 0);
  });
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;
    handler = new SymbolHandler(map);
  });

  afterEach(() => {
    handler = null;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  afterAll(() => {
    document.body.removeChild(testDiv);
    map = null;
  });

  it('constructor', () => {
     expect(handler.map).toBe(map);
     expect(handler.symbolManager).toBeDefined();
     expect(handler.singleSymbolRender).toBeDefined();
     expect(handler.compositeSymbolRender).toBeDefined();
  });
  // it('addLayer-symbolId', () => {
  //   const layer = {
  //       "id": "Landuse_R@Jingjin#line",
  //       "source": "jingjin",
  //       "source-layer": "Landuse_R@Jingjin",
  //       "type": "line",
  //       "symbol": 'line-962464'
  //   };
  //   const symbol = {paint: {'line-color': '#0083bc'}};
  //   spyOn(handler.symbolManager, 'getSymbol').and.callFake(() => {return symbol;});
  //   spyOn(handler, 'setSymbolTolayer')
  //   spyOn(handler.singleSymbolRender, 'addLayer')
  //   handler.addLayer(layer);
  //   const result = handler.getLayerSymbol("Landuse_R@Jingjin#line");
  //   expect(result).toEqual("line-962464");
  // });
  it('addLayer-symbolId-1', () => {
    const layer = {
        "id": "Landuse_R@Jingjin#line",
        "source": "jingjin",
        "source-layer": "Landuse_R@Jingjin",
        "type": "line",
        "symbol": 'line-962464'
    };
    spyOn(handler.symbolManager, 'getSymbol').and.returnValue(null);
    spyOn(handler.map, 'fire');
    handler.addLayer(layer);
    expect(handler.map.fire).toHaveBeenCalled();
  });
  it('addLayer-symbolId-expression', () => {
    const expression = [
        "case",
        ["all", ["<=", ["get", "dMaxZValue"], 70]], "PoPdensity_R_MAX70",
        ["all", [">", ["get", "dMaxZValue"], 70],["<=", ["get", "dMaxZValue"], 140]], "PoPdensity_R_MAX140",
        "Country_R"
    ];
    const layer = {
        "id": "Landuse_R@Jingjin#line",
        "source": "jingjin",
        "source-layer": "Landuse_R@Jingjin",
        "type": "line",
        "symbol": expression
    };
    spyOn(handler.symbolManager, 'getSymbol').and.returnValue(null);
    spyOn(handler.compositeSymbolRender, 'addLayerId');
    handler.addLayer(layer);
    const result = handler.getLayerSymbol("Landuse_R@Jingjin#line");
    expect(result).toEqual(expression);
    expect(handler.compositeSymbolRender.addLayerId).toHaveBeenCalled();
  });

  it('setSymbol-noLayer', () => {
    spyOn(handler.map, 'getStyle').and.returnValue({
        layers: []
    });
    spyOn(handler.map, 'fire');
    handler.setSymbol('北京市小学');
    expect(handler.map.fire).toHaveBeenCalled();

  });
  it('setSymbol-layer', () => {
    spyOn(handler.map, 'getStyle').and.returnValue({
        layers: [{
           id: "Landuse_R@Jingjin#line2"
        }]
    });
    spyOn(handler.map, 'fire');
    spyOn(handler.map, 'removeLayer');
    spyOn(handler, 'addLayer');
    handler.setSymbol('Landuse_R@Jingjin#line2', 'line-962477');
    expect(handler.map.fire).not.toHaveBeenCalled();
    expect(handler.map.removeLayer).toHaveBeenCalled();
    expect(handler.addLayer).toHaveBeenCalled();
  });

  it('getMatchLayers', () => {
    const expression = [
        "match",
        ["get", "DLBM"],
        "011", "polygon-955880", //水田
        "013", "polygon-955464", //旱地
        "polygon-0"
    ];
    const layer = {
        "id": "landuse@landuse(0_24)",
        "source": "landuse",
        "source-layer": "landuse@landuse",
        "type": "fill",
        "symbol": expression,
        "filter": ['>=', 'count', 10]
    };
    const result = handler.getMatchLayers(layer);
    expect(result.length).toEqual(3);
    expect(result[1].filter[0]).toEqual('all');
    expect(result[1].filter[2]).toEqual(['==', 'DLBM', '011']);
  });

  it('getCaseLayers', () => {
    const expression = [
        "case",
        ["all", ["<=", ["get", "dMaxZValue"], 70]], "PoPdensity_R_MAX70",
        ["all", [">", ["get", "dMaxZValue"], 70],["<=", ["get", "dMaxZValue"], 140]], "PoPdensity_R_MAX140",
        "Country_R"
    ];
    const layer = {
        "id": "Landuse_R@Jingjin#line",
        "source": "jingjin",
        "source-layer": "Landuse_R@Jingjin",
        "type": "line",
        "symbol": expression,
        "filter": ['>=', 'count', 10]
    };
    const result = handler.getCaseLayers(layer);
    expect(result.length).toEqual(3);
    expect(result[1].filter[2]).toEqual([
        "all",
        [
            "<=",
            [
                "get",
                "dMaxZValue"
            ],
            70
        ]
    ]);
  });

  it('addExpressionLayer-noLayer', () => {
    const expression = [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'height']
    ];
    const layer = {
        "id": "Landuse_R@Jingjin#line1",
        "source": "jingjin",
        "source-layer": "Landuse_R@Jingjin",
        "type": "line",
        "symbol": expression,
        "filter": ['>=', 'count', 10]
    };
    spyOn(handler.map, 'fire');
    handler.addExpressionLayer(layer, '111');
    expect(handler.map.fire).toHaveBeenCalled();
  });

  it('getSymbolRender-single', () => {
    const result = handler.getSymbolRender({'line-color': '#ffffff'});
    expect(result).toEqual(handler.singleSymbolRender);
  });

  it('getSymbolRender-multi', () => {
    const result = handler.getSymbolRender([{'line-color': '#ffffff'}, {'line-width': 5}]);
    expect(result).toEqual(handler.compositeSymbolRender);
  });

  it('addSymbolImageToMap', () => {
    spyOn(handler.symbolManager, 'addImageInfo');
    spyOn(handler.map, 'addImage');
    const image = new Image();
    handler.addSymbolImageToMap({
        paint: {
            'line-pattern': 'line-123456'
        }
    }, image);
    expect(handler.symbolManager.addImageInfo).toHaveBeenCalled();
    expect(handler.map.addImage).toHaveBeenCalled();
  });
  it('addSymbolImageToMap-hasImage', () => {
    spyOn(handler.symbolManager, 'addImageInfo');
    spyOn(handler.map, 'addImage');
    spyOn(handler.map, 'hasImage').and.returnValue(true);
    const image = new Image();
    handler.addSymbolImageToMap({
        paint: {
            'line-pattern': 'line-123456'
        }
    }, image);
    expect(handler.symbolManager.addImageInfo).not.toHaveBeenCalled();
    expect(handler.map.addImage).not.toHaveBeenCalled();
  });

  it('addSymbol-repeatSymbol', () => {
    spyOn(handler.symbolManager, 'getSymbol').and.returnValue({paint: {'line-width': 10}});
    spyOn(handler.map, 'fire');
    handler.addSymbol('jingjin', {paint: {'line-width': 10}});
    expect(handler.map.fire).toHaveBeenCalled();
  });
  it('addSymbol-symbol', () => {
    spyOn(handler.symbolManager, 'getSymbol').and.returnValue(null);
    spyOn(handler.symbolManager, 'addSymbol');
    handler.addSymbol('jingjin', {paint: {'line-width': 10}});
    expect(handler.symbolManager.addSymbol).toHaveBeenCalled();
  });
  it('addSymbol-noSupportSymbol', () => {
    spyOn(handler.symbolManager, 'getSymbol').and.returnValue(null);
    spyOn(handler.map, 'fire');
    handler.addSymbol('jingjin', {paint: {'line-pattern': [
        "case",
        ["all", ["<=", ["get", "dMaxZValue"], 70]], "PoPdensity_R_MAX70",
        ["all", [">", ["get", "dMaxZValue"], 70],["<=", ["get", "dMaxZValue"], 140]], "PoPdensity_R_MAX140",
        "Country_R"
    ]}});
    expect(handler.map.fire).toHaveBeenCalled();
  });

  it('hasSymbol', () => {
    const result = handler.hasSymbol();
    expect(result).toBeFalse();
  });

  it('removeSymbol', () => {
    spyOn(handler.symbolManager, 'removeSymbol');
    handler.removeSymbol();
    expect(handler.symbolManager.removeSymbol).toHaveBeenCalled();
  });

  it('getLayerIds', () => {
    spyOn(handler.compositeSymbolRender, 'getLayerIds');
    handler.getLayerIds();
    expect(handler.compositeSymbolRender.getLayerIds).toHaveBeenCalled();
  });

  it('getLayerId', () => {
    spyOn(handler.compositeSymbolRender, 'getLayerId');
    handler.getLayerId();
    expect(handler.compositeSymbolRender.getLayerId).toHaveBeenCalled();
  });

  it('removeLayerId', () => {
    spyOn(handler.compositeSymbolRender, 'removeLayerId');
    handler.removeLayerId();
    expect(handler.compositeSymbolRender.removeLayerId).toHaveBeenCalled();
  });

  it('removeLayerId1', () => {
    spyOn(handler.map.style, 'getLayer').and.returnValue({
        id: 'testRemoveLayerId'
    });
    const symbol = {'paint': {'line-color': '#0fffff'}};
    spyOn(handler, 'getLayerSymbol').and.returnValue(symbol);
    const result = handler.getLayer('testRemoveLayerId');
    expect(result.symbol).toEqual(symbol);
  });

  it('getLayer-noSymbol', () => {
    spyOn(handler.map, 'getLayerBySymbolBak').and.returnValue({
        id: 'testRemoveLayerId'
    });
    spyOn(handler, 'getLayerSymbol').and.returnValue(null);
    const result = handler.getLayer('testRemoveLayerId');
    expect(result.symbol).toBeUndefined();
  });

  it('getLayer-noLayer', () => {
    spyOn(handler.map, 'getLayerBySymbolBak').withArgs('testRemoveLayerId').and.returnValue(null).withArgs('child1').and.returnValue({
        id: "child1",
        type: "line"
    });
    const symbol = {
        paint: {
            "line-color": "#000000"
        }
    };
    spyOn(handler, 'getLayerSymbol').and.returnValue(symbol);
    spyOn(handler, 'getLayerIds').and.returnValue(['child1', 'child2']);
    const result = handler.getLayer('testRemoveLayerId');
    expect(result.id).toBe('testRemoveLayerId');
    expect(result.symbol).toEqual(symbol);
  });

  it('removeLayer', () => {
    spyOn(handler, 'getLayerIds').and.returnValue(['child1', 'child2']);
    spyOn(handler.map.style, 'removeLayer');
    spyOn(handler, 'removeLayerId');
    handler.removeLayer();
    expect(handler.map.style.removeLayer).toHaveBeenCalled();
    expect(handler.removeLayerId).toHaveBeenCalled();
  });

  it('removeLayer-noLayer', () => {
    spyOn(handler, 'getLayerIds').and.returnValue([]);
    spyOn(handler.map.style, 'removeLayer');
    spyOn(handler, 'removeLayerId');
    handler.removeLayer();
    expect(handler.map.style.removeLayer).toHaveBeenCalled();
    expect(handler.removeLayerId).not.toHaveBeenCalled();
  });

  it('getStyle-hasSymbol', () => {
    spyOn(handler.map.style, 'serialize').and.returnValue({
        layers: [
            {
                id: "symbolLayerId1"
            }
        ]
    });
    spyOn(handler, 'hasSymbol').and.returnValue(true);
    spyOn(handler, 'getLayerId').and.returnValue(["child1", "child2"]);
    spyOn(handler, 'getLayerSymbol').and.returnValue({
        paint: {
            'line-color': '#ffffff'
        }
    });
    const result = handler.getStyle();
    expect(result.layers[0].symbol).toEqual({
        paint: {
            'line-color': '#ffffff'
        }
    });
  });

  it('getStyle-hasSymbol2', () => {
    spyOn(handler.map.style, 'serialize').and.returnValue({
        layers: [
            {
                id: "symbolLayerId1"
            }
        ]
    });
    spyOn(handler, 'hasSymbol').and.returnValue(true);
    spyOn(handler, 'getLayerId').and.returnValue(undefined);
    spyOn(handler, 'getLayerSymbol').and.returnValue({
        paint: {
            'line-color': '#ffffff'
        }
    });
    const result = handler.getStyle();
    expect(result.layers[0].symbol).toEqual({
        paint: {
            'line-color': '#ffffff'
        }
    });
  });

  it('getStyle-noSymbol', () => {
    spyOn(handler.map.style, 'serialize').and.returnValue({
        layers: [
            {
                id: "symbolLayerId1"
            }
        ]
    });
    spyOn(handler, 'hasSymbol').and.returnValue(true);
    spyOn(handler, 'getLayerId').and.returnValue(undefined);
    spyOn(handler, 'getLayerSymbol').and.returnValue(undefined);
    const result = handler.getStyle();
    expect(result.layers[0].symbol).toBeUndefined();
  });

  it('getStyle-hasSymbol-false', () => {
    spyOn(handler.map.style, 'serialize').and.returnValue({
        layers: [
            {
                id: "symbolLayerId1"
            }
        ]
    });
    spyOn(handler, 'hasSymbol').and.returnValue(false);
    const result = handler.getStyle();
    expect(result).toEqual({
        layers: [
            {
                id: "symbolLayerId1"
            }
        ]
    });
  });

  it('getFirstLayerId', () => {
    spyOn(handler.compositeSymbolRender, 'getLayerIds').and.returnValue(["child1", "child2"]);
    const result = handler.getFirstLayerId();
    expect(result).toEqual("child1");
  });

  it('moveLayer', () => {
    spyOn(handler.compositeSymbolRender, 'getLayerIds').and.returnValue(["child1", "child2"]);
    spyOn(handler.map.style, 'moveLayer');
    handler.moveLayer();
    expect(handler.map.style.moveLayer).toHaveBeenCalledTimes(2);
  });

  it('moveLayer-noLayerIds', () => {
    spyOn(handler.compositeSymbolRender, 'getLayerIds').and.returnValue(undefined);
    spyOn(handler.map.style, 'moveLayer');
    handler.moveLayer();
    expect(handler.map.style.moveLayer).toHaveBeenCalledTimes(1);
  });

  it('setFilter-mapboxexpression', () => {
    const symbol = [
        "match",
        ["get", "DLBM"],
        "011", "polygon-955880", //水田
        "013", "polygon-955464", //旱地
        "polygon-0"
    ];
    spyOn(handler.map.style, 'setFilter');
    const filter = ['>=', 'count', 10];
    spyOn(handler.compositeSymbolRender, 'getLayerIds').and.returnValue(["child1", "child2"]);
    handler.setSymbolTolayer('setFilterLayerId', symbol);
    handler.setFilter("setFilterLayerId", filter);
    expect(handler.map.style.setFilter).toHaveBeenCalled();
  });
  it('setFilter', () => {
    const symbol = "polygon-0";
    spyOn(handler.map.style, 'setFilter');
    const filter = ['>=', 'count', 10];
    spyOn(handler.compositeSymbolRender, 'getLayerIds').and.returnValue(["child1", "child2"]);
    handler.setSymbolTolayer('setFilterLayerId', symbol);
    handler.setFilter("setFilterLayerId", filter);
    expect(handler.map.style.setFilter).toHaveBeenCalledTimes(2);
  });

  it('getFilter', () => {
    spyOn(handler.map.style, 'getFilter');
    spyOn(handler.map.style, 'getLayer').and.returnValue({});
    handler.getFilter("setFilterLayerId");
    expect(handler.map.style.getFilter).toHaveBeenCalled();
  });
  it('setLayerZoomRange', () => {
    const layerId = 'Landuse_R2';
    spyOn(handler, 'getLayerIds')
      .withArgs(layerId)
      .and.returnValue([layerId]);

    spyOn(handler.map.style, 'setLayerZoomRange')
      .withArgs(layerId, 10, undefined)
      .and.returnValue(null);

    handler.setLayerZoomRange(layerId, 10);
    expect(handler.map.style.setLayerZoomRange).toHaveBeenCalledWith(layerId, 10, undefined);

  });
  it('setLayerZoomRange-2', () => {
    const layerId = 'Landuse_R2';
    spyOn(handler, 'getLayerIds')
      .withArgs(layerId)
      .and.returnValue([]);

    spyOn(handler.map.style, 'setLayerZoomRange')
      .withArgs(layerId, 10, undefined)
      .and.returnValue(null);

    handler.setLayerZoomRange(layerId, 10);
    expect(handler.map.style.setLayerZoomRange).toHaveBeenCalledWith(layerId, 10, undefined);

  });

  it('setPaintProperty', () => {
    const layerId = 'Landuse_R2';
    spyOn(handler, 'getLayerIds')
      .withArgs(layerId)
      .and.returnValue([layerId]);
    spyOn(handler.map.style, 'setPaintProperty')
      .withArgs(layerId, 'line-color', 'rgba(1, 1, 1, 1.00)', undefined)
      .and.returnValue(null);

    handler.setPaintProperty(layerId, "line-color", "rgba(1, 1, 1, 1.00)");
    expect(handler.map.style.setPaintProperty).toHaveBeenCalled();
  });

  it('setLayoutProperty', () => {
    const layerId = 'Landuse_R2';

    spyOn(handler, 'getLayerIds')
      .withArgs(layerId)
      .and.returnValue([layerId]);
    spyOn(handler.map.style, 'setLayoutProperty')
      .withArgs('Landuse_R2', "line-join", "miter", undefined)
      .and.returnValue(null);

    handler.setLayoutProperty(layerId, "line-join", "miter");
    expect(handler.map.style.setLayoutProperty).toHaveBeenCalled();
  });

  it('get-Paint-Layout-Property', () => {
    const layerId = 'Landuse_R2';

    spyOn(handler, 'getFirstLayerId')
      .withArgs(layerId)
      .and.returnValue("Landuse_R2");
    spyOn(handler.map.style, 'getPaintProperty')
      .withArgs(layerId, "line-color")
      .and.returnValue("rgba(0, 0, 0, 1.00)");
    spyOn(handler.map.style, 'getLayoutProperty')
      .withArgs(layerId, "line-join")
      .and.returnValue("miter");
    spyOn(handler.map.style, 'setPaintProperty')
      .withArgs(layerId, 'line-color', 'rgba(1, 1, 1, 1.00)', undefined)
      .and.returnValue(null);
    spyOn(handler.map.style, 'setLayoutProperty')
      .withArgs(layerId, "line-join", "miter", undefined)
      .and.returnValue(null);

    const paintProperty = handler.getPaintProperty(layerId, "line-color");
    const target = "rgba(0, 0, 0, 1.00)";
    expect(paintProperty).toEqual(target);

    handler.setLayoutProperty(layerId, "line-join", "miter");
    const layoutProperty = handler.getLayoutProperty(layerId, "line-join");
    expect(layoutProperty).toEqual("miter");

    handler.setPaintProperty(layerId, "line-color", "rgba(1, 1, 1, 1.00)");
    expect(handler.map.style.setPaintProperty).toHaveBeenCalled();
  });

  it('updateSymbol', () => {
    // symbol不存在
    handler.updateSymbol("test", {});
    // symbol包含表达式
    handler.addSymbol("line-single", {
      paint: {
        "line-width":5.29,
        "line-color": "black"
      }
    })
    handler.updateSymbol("line-single", {
      paint: {
        "line-width":5.29,
        "line-color": ["match"]
      }
    });
    handler.updateSymbol("line-single", {
      paint: {
        "line-width": 10,
        "line-color": "red"
      }
    });
    expect(handler.symbolManager.getSymbol("line-single").paint["line-width"]).toBe(10);
    expect(handler.symbolManager.getSymbol("line-single").paint["line-color"]).toBe("red");
  })

  it('setSymbolProperty', () => {
    // symbol不存在
    handler.setSymbolProperty("test");
    handler.addSymbol("line-single", {
      paint: {
        "line-width":5.29,
        "line-color": "black"
      }
    })
    handler.addSymbol("line-composite", [{
      "paint":{
        "line-width": 5.29,
        "line-color":"rgba(254, 177, 0, 1.00)"
      },
      "layout":{
        "line-cap":"round",
        "line-join":"round"
      }},
      {"paint":{
        "line-width":3.02,
        "line-color":"rgba(255, 255, 255, 1.00)"
      }
      }]);
    // value为表达式
    handler.setSymbolProperty("line-single", 0, "line-color", ["match"]);
    // index错误
    handler.setSymbolProperty("line-composite", 3, "line-cap", "butt");
    handler.setSymbolProperty("line-composite", 0, "line-cap", "butt");
    const cap = handler.getSymbolProperty("line-composite", 0, "line-cap");
    expect(cap).toBe('butt');

    handler.setSymbolProperty("line-composite", 1, "line-join", "butt");
    const joinc = handler.getSymbolProperty("line-composite", 1, "line-join");
    expect(joinc).toBe('butt');

    handler.setSymbolProperty("line-single", 0, "line-width", 10);
    const width = handler.getSymbolProperty("line-single", 0, "line-width");
    expect(width).toBe(10);

    handler.setSymbolProperty("line-single", 0, "line-join", "butt");
    const join = handler.getSymbolProperty("line-single", 0, "line-join");
    expect(join).toBe('butt');
  });

  it("getSymbolProperty", () => {
    expect(handler.getSymbolProperty("test")).toBe(undefined);
  })

  it("updateLayerSymbol", () => {
    spyOn(handler, 'setSymbol');
    handler.setSymbolTolayer("layerId", "line-single");
    handler.updateLayerSymbol("line-composit");
    expect(handler.setSymbol).not.toHaveBeenCalled();
    handler.updateLayerSymbol("line-single");
    expect(handler.setSymbol).toHaveBeenCalled();
  })
});
