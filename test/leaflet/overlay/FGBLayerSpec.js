import { FGBLayer } from '../../../src/leaflet/overlay/FGBLayer';
import { tiledMapLayer } from '../../../src/leaflet/mapping/TiledMapLayer';
var url = 'base/resources/data/capitals_data20.fgb';
var url1 = 'http://supermapiserver:8090/iserver/services/map-world/rest/maps/World';
describe('leaflet_FGBLayer', () => {
  var originalTimeout;
  var testDiv, map;
  beforeAll(() => {
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
    map = L.map('map', {
      preferCanvas: true,
      crs: L.CRS.EPSG4326,
      center: { lon: 0, lat: 0 },
      maxZoom: 18,
      zoom: 3
    });
    tiledMapLayer(url1).addTo(map);
  });

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  afterAll(() => {
    map.remove();
    window.document.body.removeChild(testDiv);
  });

  it('load bbox', (done) => {
    var count = 0;
    var fgblayer = new FGBLayer(url, {
      featureLoader: function (feature) {
        expect(['圣多美', '蒙罗维亚'].includes(feature.properties['CAPITAL'])).toBeTrue();
        count++;
        if (count === 2) {
          done();
        }
        return feature;
      }
    });
    fgblayer.addTo(map);
    expect(fgblayer.strategy).toBe('bbox');
    expect(fgblayer).not.toBeNull();
    expect(fgblayer.url).toBe(url);
  });

  it('load all', (done) => {
    var count = 0;
    var fgblayer = new FGBLayer(url, {
      strategy: 'all',
      featureLoader: function (feature) {
        count++;
        if (count === 19) {
          done();
        }
        return feature;
      }
    });
    fgblayer.addTo(map);
    expect(fgblayer).not.toBeNull();
    expect(fgblayer.url).toBe(url);
  });

  it('update extent', () => {
    var fgblayer = new FGBLayer(url, {
      featureLoader: function (feature) {
        return feature;
      }
    });
    fgblayer.addTo(map);
    map.fire('moveend', { target: map });
    expect(fgblayer).not.toBeNull();
    expect(fgblayer.url).toBe(url);
  });

  it('set extent', (done) => {
    var fgblayer = new FGBLayer(url, {
      extent: [0, 0, 21, 21],
      featureLoader: function (feature) {
        expect(feature.properties['CAPITAL']).toBe('圣多美');
        done();
        return feature;
      }
    });
    fgblayer.addTo(map);
    expect(fgblayer).not.toBeNull();
    expect(fgblayer.url).toBe(url);
  });
});
