import { Logo } from '../../../src/openlayers/control/Logo';
import { TileSuperMapRest } from '../../../src/openlayers/mapping/TileSuperMapRest';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';

describe('openlayers_Logo', () => {
  var map, baseLayer, testDiv;
  beforeAll(() => {
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
    var url = GlobeParameter.China4326URL;
    map = new Map({
      target: 'map',
      view: new View({
        center: [104.79, 33.03],
        zoom: 4,
        projection: 'EPSG:4326'
      })
    });
    baseLayer = new TileSuperMapRest({
      origin: [-180, 90],
      url: url,
      wrapX: true
    });
    map.addLayer(
      new TileLayer({
        source: baseLayer,
        projection: 'EPSG:4326'
      })
    );
  });
  afterAll(() => {
    document.body.removeChild(testDiv);
  });

  it('initialize default', (done) => {
    var logo = new Logo();
    expect(logo).not.toBeNull();
    expect(logo.element.className).toBe('ol-control-logo ol-unselectable ol-control');
    done();
  });

  it('initialize options', (done) => {
    const options = {
      imageUrl: 'http://test.com/test.png',
      width: '80px',
      alt: 'iclient test'
    };
    var logo = new Logo(options);
    expect(logo).not.toBeNull();
    expect(logo.options.width).toBe('80px');
    expect(logo.element.childNodes[0].tagName).toBe('IMG');
    expect(logo.element.childNodes[0].alt).toBe('iclient test');
    done();
  });

  it('initialize options link', (done) => {
    const options = {
      imageUrl: 'http://test.com/test.png',
      width: '80px',
      alt: 'iclient test',
      link: 'https://iclient.supermap.io/test'
    };
    var logo = new Logo(options);
    expect(logo).not.toBeNull();
    expect(logo.options.width).toBe('80px');
    expect(logo.element.childNodes[0].tagName).toBe('A');
    expect(logo.element.childNodes[0].href).toBe('https://iclient.supermap.io/test');
    done();
  });
});
