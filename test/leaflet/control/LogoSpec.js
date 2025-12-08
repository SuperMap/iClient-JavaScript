import { Logo, logo } from '../../../src/leaflet/control/Logo';
import { tiledMapLayer } from '../../../src/leaflet/mapping/TiledMapLayer';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { mockCreateTile } from '../../tool/mock_leaflet';

var url = GlobeParameter.ChinaProvincesURL;
describe('leaflet_Logo', () => {
  var originalTimeout;
  var testDiv, map, logo1;
  beforeAll(() => {
    testDiv = document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    document.body.appendChild(testDiv);
    mockCreateTile();
    map = L.map('map', {
      crs: L.CRS.EPSG4326,
      center: [33.03, 104.79],
      zoom: 3
    });
    spyOn(FetchRequest, 'get').and.callFake((testUrl, params) => {
      if (testUrl.indexOf('ChinaProvinces/tilesets') > -1) {
        return Promise.resolve(new Response(JSON.stringify({})));
      }
      return Promise.resolve();
    });
    var baseLayer = tiledMapLayer(url).addTo(map);
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
    map.remove();
  });

  it('init_null,', () => {
    logo1 = new Logo({}).addTo(map);
    expect(logo1._container.className.includes('iclient-leaflet-logo')).toBeTruthy();

  });

  it('init_all', () => {
    logo1 = new Logo({
      imageUrl: 'http://test.com/test.png',
      width: '100px',
      height: '100px',
      position: 'topleft',
      alt: 'iclient test'
    }).addTo(map);
    expect(logo1._container.childNodes[0].tagName).toBe('IMG');
    expect(logo1._container.childNodes[0].alt).toBe('iclient test');
  });

  it('init_link', () => {
    logo1 = logo({
      imageUrl: 'http://test.com/test.png',
      link: 'https://iclient.supermap.io/test',
      width: '100px',
      height: '100px',
      position: 'topleft',
      alt: 'testtest'
    }).addTo(map);
    expect(logo1._container.childNodes[0].tagName).toBe('A');
    expect(logo1._container.childNodes[0].href).toBe('https://iclient.supermap.io/test');
  });
  it('init_no_width', () => {
    logo1 = new Logo({
      imageUrl: 'http://test.com/test.png',
      position: 'topleft',
      alt: 'iclient test'
    }).addTo(map);
    expect(logo1._container.childNodes[0].tagName).toBe('IMG');
    expect(logo1._container.childNodes[0].alt).toBe('iclient test');
  });
});
