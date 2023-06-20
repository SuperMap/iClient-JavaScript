import CompositeSymbolRender from '../../../../src/mapboxgl/overlay/symbol/CompositeSymbolRender';
import mapboxgl from 'mapbox-gl';
var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';
describe('mapboxgl_symbol_CompositeSymbolRender', () => {
  var testDiv, map, handler;
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
      center: [0, 0],
      zoom: 3
    });
  });
  beforeEach(() => {
    handler = new CompositeSymbolRender(map);
  });

  afterEach(() => {
    handler = null;
  });

  afterAll(() => {
    document.body.removeChild(testDiv);
    map = null;
  });

  it('constructor', () => {
     expect(handler.map).toBe(map); 
     expect(handler.singleSymbol).toBeDefined(); 
     expect(handler.layerIds).toEqual({}); 
  });

  it('addLayer', () => {
    const layer = {
      "id": "Landuse_R@Jingjin#line",
      "source": "jingjin",
      "source-layer": "Landuse_R@Jingjin",
      "type": "line"
    }, symbol = [{
      "paint": {
        "line-width": 0.38,
        "line-color": "rgba(74,74,74,1.00)"
      } 
    }];
    spyOn(handler.singleSymbol, 'addLayer');
    handler.addLayer(layer, symbol, '1');
    expect(handler.singleSymbol.addLayer).toHaveBeenCalled();
    expect(handler.layerIds[layer.id].length).toBe(1);
  });

  it('addLayerId', () => {
    handler.layerIds['layerId'] = ['child1'];
    handler.addLayerId('layerId', 'child1');
    expect(handler.layerIds['layerId'].length).toBe(1);
  });

  it('removeLayerId', () => {
    handler.layerIds['layerId'] = ['child1'];
    handler.removeLayerId('layerId');
    expect(handler.layerIds['layerId']).toBeUndefined();
  });

  it('getLayerIds', () => {
    const childs = ['child1', 'child2'];
    handler.layerIds['layerId'] = childs;
    const result = handler.getLayerIds('layerId');
    expect(result.length).toBe(2);
    expect(result).toEqual(childs);
  });

  it('getLayerId', () => {
    const childs = ['child1', 'child2'];
    handler.layerIds['layerId'] = childs;
    const result = handler.getLayerId('child2');
    expect(result).toEqual('layerId');
  });

});
