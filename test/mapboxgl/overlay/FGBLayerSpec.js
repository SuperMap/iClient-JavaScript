import { FGBLayer } from '../../../src/mapboxgl/overlay/FGBLayer';
import mapboxgl from 'mapbox-gl';
var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';
var fgbUrl = 'base/resources/data/capitals_data20.fgb';
describe('mapboxgl_FGBLayer', () => {
  var originalTimeout;
  var testDiv, map;
  beforeAll((done) => {
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

  it('load bbox', (done) => {
    var count = 0;
    var fgblayer = new FGBLayer({
      url: fgbUrl,
      featureLoader: function (feature) {
        expect(['圣多美', '蒙罗维亚'].includes(feature.properties['CAPITAL'])).toBeTrue();
        count++;
        if (count === 2) {
          done();
        }
        return feature;
      }
    });
    fgblayer.onAdd(map);
    expect(fgblayer.strategy).toBe('bbox');
    expect(fgblayer).not.toBeNull();
    expect(fgblayer.url).toBe(fgbUrl);
  });

  it('load all', (done) => {
    var count = 0;
    var fgblayer = new FGBLayer({
      url: fgbUrl,
      strategy: 'all',
      featureLoader: function (feature) {
        count++;
        if (count === 19) {
          done();
        }
        return feature;
      }
    });
    fgblayer.onAdd(map);
    expect(fgblayer.url).toBe(fgbUrl);
  });

  it('set extent', (done) => {
    var fgblayer = new FGBLayer({
      url: fgbUrl,
      extent: [0, 0, 21, 21],
      featureLoader: function (feature) {
        expect(feature.properties['CAPITAL']).toBe('圣多美');
        done();
        return feature;
      }
    });
    fgblayer.onAdd(map);
    expect(fgblayer).not.toBeNull();
    expect(fgblayer.url).toBe(fgbUrl);
  });

  it('render moveLayer onRemove setVisibility', (done) => {
    var fgblayer = new FGBLayer({
      url: fgbUrl,
      extent: [0, 0, 21, 21],
      featureLoader: function (feature) {
        expect(feature.properties['CAPITAL']).toBe('圣多美');
        done();
        return feature;
      }
    });
    fgblayer.onAdd(map);
    fgblayer.render();
    fgblayer.moveLayer(fgblayer.layerId, 'simple-tiles');
    fgblayer.setVisibility(false);
    fgblayer.onRemove();
    expect(fgblayer).not.toBeNull();
  });

});
