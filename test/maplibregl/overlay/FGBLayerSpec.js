import { FGBLayer } from '../../../src/maplibregl/overlay/FGBLayer';
import maplibregl from 'maplibre-gl';
var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';
var fgbUrl = 'base/resources/data/capitals_data20.fgb';
// var url = 'https://iserver.supermap.io/iserver/services/map-china400/rest/maps/ChinaDark/zxyTileImage.png?z={z}&x={x}&y={y}'
describe('maplibregl_FGBLayer', () => {
  var originalTimeout;
  var testDiv, map, fgblayer;
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
      container: 'map',
      style: {
        version: 8,
        sources: {},
        layers: []
      },
      center: [0, 0],
      zoom: 3
    });
    map.on('load', function () {
      done();
    });
  }, 50000);
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });

  afterEach(() => {
    if (fgblayer) {
      map.removeLayer(fgblayer.id);
      fgblayer = null;
    }
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  afterAll(() => {
    document.body.removeChild(testDiv);
    map = null;
  });

  it('load bbox', (done) => {
    var count = 0;
    fgblayer = new FGBLayer({
      url: fgbUrl,
      featureLoader: function (feature) {
        expect(['圣多美', '蒙罗维亚'].includes(feature.properties['CAPITAL'])).toBeTrue();
        count++;
        return feature;
      }
    });
    // fgblayer.onAdd(map);
    map.addLayer(fgblayer);
    var cb = () => {
      if (fgblayer && map.getLayer(fgblayer.layerId)) {
        map.off('sourcedata', cb);
        expect(fgblayer.strategy).toBe('bbox');
        expect(fgblayer).not.toBeNull();
        expect(fgblayer.url).toBe(fgbUrl);
        expect(count).toBe(2);
        done();
      }
    };
    map.on('sourcedata', cb);
  });

  it('load all', (done) => {
    var count = 0;
    fgblayer = new FGBLayer({
      url: fgbUrl,
      strategy: 'all',
      featureLoader: function (feature) {
        count++;
        return feature;
      }
    });
    map.addLayer(fgblayer);

    var cb = () => {
      if (fgblayer && map.getLayer(fgblayer.layerId)) {
        map.off('sourcedata', cb);
        expect(fgblayer.url).toBe(fgbUrl);
        expect(count).toBe(19);
        done();
      }
    };
    map.on('sourcedata', cb);
  });

  it('set extent', (done) => {
    var count = 0;
    fgblayer = new FGBLayer({
      url: fgbUrl,
      extent: [0, 0, 21, 21],
      featureLoader: function (feature) {
        count++;
        expect(feature.properties['CAPITAL']).toBe('圣多美');
        return feature;
      }
    });
    map.addLayer(fgblayer);

    var cb = () => {
      if (fgblayer && map.getLayer(fgblayer.layerId)) {
        map.off('sourcedata', cb);
        expect(fgblayer).not.toBeNull();
        expect(fgblayer.url).toBe(fgbUrl);
        expect(count).toBe(1);
        done();
      }
    };
    map.on('sourcedata', cb);
  });

  it('render moveLayer onRemove setVisibility', (done) => {
    var count = 0;
    fgblayer = new FGBLayer({
      url: fgbUrl,
      extent: [0, 0, 21, 21],
      featureLoader: function (feature) {
        count++;
        expect(feature.properties['CAPITAL']).toBe('圣多美');
        return feature;
      }
    });
    map.addLayer(fgblayer);
    fgblayer.render();

    var cb = () => {
      if (fgblayer && map.getLayer(fgblayer.layerId)) {
        map.off('sourcedata', cb);
        fgblayer.moveLayer(fgblayer.id);
        fgblayer.setVisibility(false);
        map.removeLayer(fgblayer.id);
        fgblayer = null;
        expect(count).toBe(1);
        done();
      }
    };
    map.on('sourcedata', cb);
  });
});
