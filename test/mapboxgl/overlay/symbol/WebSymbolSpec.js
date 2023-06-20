import {WebSymbol} from '../../../../src/mapboxgl/overlay/symbol/WebSymbol';
import mapboxgl from 'mapbox-gl';
var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';
describe('mapboxgl_WebSymbol', () => {
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

  it('init', (done) => {
    const url = './resources/symbols';
    new WebSymbol().init({basePath: url});
    expect(map.basePath).toBe(url);
    done();
  });

});
