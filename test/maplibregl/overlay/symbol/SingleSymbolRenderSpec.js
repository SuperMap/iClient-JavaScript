import SingleSymbolRender from '../../../../src/maplibregl/overlay/symbol/SingleSymbolRender'

describe('SingleSymbolRender', () => {
  var testDiv, map, singleSymbolRender;
  beforeAll(() => {
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
    map = {
      addLayerBySymbolBak: () => {}
    };
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
