import { ScaleLine } from '../../../src/openlayers/control/ScaleLine';
import { TileSuperMapRest } from '../../../src/openlayers/mapping/TileSuperMapRest';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';

describe('openlayers_ScaleLine', () => {
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
    var scaleControl = new ScaleLine();
    expect(scaleControl).not.toBeNull();
    expect(scaleControl.render).not.toBeUndefined();
    expect(scaleControl.minWidth_).toBe(64);
    expect(scaleControl.getUnits()).toBe('metric');
    expect(scaleControl.innerElement_.className).toBe('ol-scale-line-inner');
    done();
  });

  it('initialize options', (done) => {
    const options = {
      className: 'ol-scale-test',
      minWidth: 80,
      units: 'imperial'
    };
    var scaleControl = new ScaleLine(options);
    expect(scaleControl).not.toBeNull();
    expect(scaleControl.minWidth_).toBe(80);
    expect(scaleControl.getUnits()).toBe('imperial');
    expect(scaleControl.innerElement_.className).toBe('ol-scale-test-inner');
    done();
  });

  it('initialize and addTo map', (done) => {
    var scaleControl = new ScaleLine();
    expect(scaleControl).not.toBeNull();
    expect(scaleControl.render).not.toBeUndefined();
    map.addControl(scaleControl);
    map.once('postrender', () => {
      expect(scaleControl.viewState_).not.toBeNull();
      expect(scaleControl.renderedHTML_).not.toBeNull();
      expect(scaleControl.renderedVisible_).toBeTruthy();
      done();
    });
  });

  it('test updateElementRepair', (done) => {
    var scaleControl = new ScaleLine();
    scaleControl.yn = true;
    scaleControl.c = { style: { display: 'block' } };
    scaleControl.updateElementRepair();
    expect(scaleControl.viewState_).toBeNull();
    expect(scaleControl.renderedVisible_).toBeFalsy();
    expect(scaleControl.element.style.display).toBe('none');
    done();
  });
});
