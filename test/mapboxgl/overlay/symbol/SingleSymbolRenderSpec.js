import SingleSymbolRender from '../../../../src/mapboxgl/overlay/symbol/SingleSymbolRender'
import mapboxgl from 'mapbox-gl';

var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';
describe('mapboxgl_SingleSymbolRender', () => {
  var testDiv, map, singleSymbolRender;
  beforeAll(() => {
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
    singleSymbolRender = new SingleSymbolRender(map);
  });

  afterEach(() => {
    singleSymbolRender = null;
  });

  afterAll(() => {
    document.body.removeChild(testDiv);
    map = null;
  });

  it('addLayer', () => {
    var layer = {
      "id": "Landuse_R@Jingjin#line",
      "source": "jingjin",
      "source-layer": "Landuse_R@Jingjin",
      "type": "line"
    };
    const beforeId = 'layer-id';
    var symbol = {
      "paint": {
        "line-width": 0.38,
        "line-color": "rgba(74,74,74,1.00)"
      }
    };
    spyOn(map, 'addLayerBySymbolBak');
    singleSymbolRender.addLayer(layer, symbol, beforeId);
    expect(map.addLayerBySymbolBak).toHaveBeenCalledWith({ ...layer, ...symbol }, beforeId);
  });

  it('addLayer-null', () => {
    var layer = {
      "id": "Landuse_R@Jingjin#line",
      "source": "jingjin",
      "source-layer": "Landuse_R@Jingjin",
      "type": "line",
      "layout": {
        'visibility': 'none'
      },
      "paint": {
        'line-color': '#fff'
      }
    };
    const beforeId = 'layer-id';
    var symbol = {};
    spyOn(map, 'addLayerBySymbolBak');
    singleSymbolRender.addLayer(layer, symbol, beforeId);
    expect(map.addLayerBySymbolBak).toHaveBeenCalledWith({ ...layer }, beforeId);
  });

});
