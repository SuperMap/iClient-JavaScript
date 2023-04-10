import { FGB } from '../../../src/openlayers/overlay/FGB';
import { TileSuperMapRest } from '../../../src/openlayers/mapping/TileSuperMapRest';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import { all, bbox } from 'ol/loadingstrategy';
var url = 'base/resources/data/capitals_data20.fgb';
var url1 = GlobeParameter.China4326URL;
describe('openlayers_FGB', () => {
  var originalTimeout;
  var testDiv, map, fgbSource;
  beforeAll(() => {
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);

    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 5,
        projection: 'EPSG:4326'
      })
    });
    map.addLayer(
      new TileLayer({
        source: new TileSuperMapRest({
          url: url1
        })
      })
    );
  });
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    fgbSource = new FGB({
      url,
      strategy: all
    });
    var vectorLayer = new VectorLayer({
      source: fgbSource
    });
    map.addLayer(vectorLayer);
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  afterAll(() => {
    window.document.body.removeChild(testDiv);
  });

  it('load bbox', (done) => {
    var count = 0;
    var fgbSource = new FGB({
      url,
      strategy: bbox,
      featureLoader: function (feature) {
        expect(['圣多美', '蒙罗维亚'].includes(feature.values_['CAPITAL'])).toBeTrue();
        count++;
        if (count === 2) {
        done();
        }
        return feature;
      }
    });
    map.addLayer(new VectorLayer({
      source: fgbSource
    }));
    expect(fgbSource).not.toBeNull();
    expect(fgbSource.url).toBe(url);
  });

  it('load all', (done) => {
    var count = 0;
    var fgbSource = new FGB({
      url,
      strategy: all,
      featureLoader: function (feature) {
        count++;
        if (count === 19) {
          done();
        }
        return feature;
      }
    });
    map.addLayer(new VectorLayer({
      source: fgbSource
    }));
    expect(fgbSource).not.toBeNull();
    expect(fgbSource.url).toBe(url);
  });

  it('set extent', (done) => {
    var fgbSource = new FGB({
      url,
      extent: [0, 0, 21, 21],
      featureLoader: (feature) => {
        expect(feature.values_['CAPITAL']).toBe('圣多美');
        done();
        return feature;
      }
    });
    map.addLayer(new VectorLayer({
      source: fgbSource
    }));
    expect(fgbSource).not.toBeNull();
    expect(fgbSource.url).toBe(url);
  });
});
