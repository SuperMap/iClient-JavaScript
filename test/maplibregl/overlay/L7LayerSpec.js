import maplibregl from 'maplibre-gl';
import mbglmap from '../../tool/mock_mapboxgl_map';
import * as L7 from '../../../src/maplibregl/overlay/L7/l7-render';
import * as mockL7 from '../../tool/mock_l7';
import { L7Layer } from '../../../src/maplibregl/overlay/L7Layer';

var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';

describe('L7Layer', () => {
  var originalTimeout;
  var testDiv, map, getL7Scene, setLayoutProperty;
  var data = [
    {
      id: '5011000000404',
      name: '铁路新村(华池路)',
      longitude: 121.4316962,
      latitude: 31.26082325,
      unit_price: 71469.4,
      count: 2
    }
  ];
  beforeAll((done) => {
    getL7Scene = maplibregl.Map.prototype.getL7Scene;
    setLayoutProperty = maplibregl.Map.prototype.setLayoutProperty;
    mbglmap.prototype.getL7Scene = getL7Scene;
    spyOn(maplibregl, 'Map').and.callFake(mbglmap);

    spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'GeometryLayer').and.callFake(mockL7.GeometryLayer);
    spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
    spyOn(L7, 'Mapbox').and.callFake(mockL7.Mapbox);
    // Scene = mockL7.Scene;
    // Mapbox = mockL7.Mapbox;
    // maplibregl.Map.prototype.getCRS = () => ({ fromWGS84: (val) => val, getExtent: () => [] });
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
    map = new maplibregl.Map({
      container: testDiv,
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
      zoom: 13
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
    document.body.removeChild(testDiv);
    map = null;
  });

  it('getL7Scene', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(56)
      .color('#4cfd47');
    expect(maplibregl.Map.prototype.$l7scene).not.toBeNull();
    map.getL7Scene().then((scene) => {
      expect(scene).not.toBeNull();
      done();
    });
  });

  it('PointLayer', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('name', [
        'circle',
        'triangle',
        'square',
        'pentagon',
        'hexagon',
        'octogon',
        'hexagram',
        'rhombus',
        'vesica'
      ])
      .size('unit_price', [10, 25])
      .active(true)
      .color('name', ['#5B8FF9', '#5CCEA1', '#5D7092', '#F6BD16', '#E86452'])
      .style({
        opacity: 0.3,
        strokeWidth: 2
      });
    map.addLayer(layer);
    expect(l7Layer).not.toBeNull();
    expect(layer.type).toBe('custom');
    map.removeLayer(layer.id);
    done();
  });

  it('PointLayer animate', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(56)
      .color('#4cfd47');
    map.addLayer(layer);
    expect(l7Layer).not.toBeNull();
    expect(layer.type).toBe('custom');
    map.removeLayer(layer.id);
    done();
  });

  it('GeometryLayer spriteAnimate', (done) => {
    var layer = new L7Layer({ type: 'GeometryLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .shape('sprite')
      .size(10)
      .style({
        heightfixed: true,
        mapTexture: '../../resources/img/sprite.png', // snow
        center: [120, 30],
        spriteCount: 60,
        spriteRadius: 10,
        spriteTop: 2500000
      });
    map.addLayer(layer);
    expect(l7Layer).not.toBeNull();
    expect(layer.type).toBe('custom');
    map.removeLayer(layer.id);
    done();
  });

  it('PointLayer rerender', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(56)
      .color('#4cfd47');
    map.addLayer(layer);
    expect(l7Layer).not.toBeNull();
    expect(layer.type).toBe('custom');
    layer.reRender();
    done();
  });

  it('PointLayer removeLayer', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(56)
      .color('#4cfd47');
    map.addLayer(layer);
    expect(l7Layer).not.toBeNull();
    expect(layer.type).toBe('custom');
    map.removeLayer(layer.id);
    done();
  });

  it('PointLayer setVisibility', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(56)
      .color('#4cfd47');
    map.addLayer(layer);
    map.style.fire = () => {};
    map.style.setLayoutProperty = () => {};
    map.overlayLayersManager = { [layer.id]: layer };
    expect(l7Layer).not.toBeNull();
    map.setLayoutProperty = setLayoutProperty;
    spyOn(l7Layer, 'show');
    spyOn(l7Layer, 'hide');
    spyOn(map.style, 'setLayoutProperty');

    map.setLayoutProperty(layer.id, 'visibility', 'hidden');
    expect(l7Layer.hide).toHaveBeenCalled();
    expect(map.style.setLayoutProperty).toHaveBeenCalled();

    map.setLayoutProperty(layer.id, 'visibility', 'visible');
    expect(l7Layer.show).toHaveBeenCalled();
    expect(map.style.setLayoutProperty).toHaveBeenCalled();

    done();
  });
});
