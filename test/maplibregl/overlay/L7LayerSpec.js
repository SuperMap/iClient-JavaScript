import { L7Layer } from '../../../src/maplibregl/overlay/L7Layer';
import maplibregl from 'maplibre-gl';

var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';

describe('L7Layer', () => {
  var originalTimeout;
  var testDiv, map;
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
    document.body.removeChild(testDiv);
    map = null;
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
});
