import { WebMap } from '../../../src/mapboxgl/mapping/WebMap';
import '../../resources/WebMapV3.js';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';

describe('mapboxgl-webmap3.0', () => {
  var originalTimeout, testDiv;
  var server = 'http://localhost:8190/iportal/';
  var id = 617580084;
  beforeEach(() => {
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
  });
  afterEach(() => {
    window.document.body.removeChild(testDiv);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('initialize_background', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = mapstudioWebMap_background;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('617580084.json') > -1) {
        var appInfo = mapstudioAppInfo;
        return Promise.resolve(new Response(appInfo));
      }
      return Promise.resolve();
    });
    var mapstudioWebmap = new WebMap(id, {
      server: server
    });
    expect(mapstudioWebmap.target).toBe('map');
    expect(mapstudioWebmap.mapId).toBe(id);
    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      expect(mapstudioWebmap.mapParams.title).toBe('空地图');
      expect(mapstudioWebmap.mapParams.description).toBe('');
      var style = map.getStyle();
      expect(style.name).toBe(mapstudioWebmap.mapParams.title);
      expect(style.layers.length).toBe(1);
      expect(style.sources).toEqual({});
      done();
    });
  });

  it('initialize_raster', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = mapstudioWebMap_raster;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('617580084.json') > -1) {
        var appInfo = mapstudioAppInfo;
        return Promise.resolve(new Response(appInfo));
      }
      return Promise.resolve();
    });
    var mapstudioWebmap = new WebMap(id, {
      server: server
    });
    expect(mapstudioWebmap.credentialKey).toBeUndefined();
    expect(mapstudioWebmap.credentialValue).toBeUndefined();
    expect(mapstudioWebmap.target).toBe('map');
    expect(mapstudioWebmap.mapId).toBe(id);
    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      expect(map.getZoom()).toBeCloseTo(3.412, 0.001);
      var center = map.getCenter();
      expect(+center.lat.toFixed(4)).toEqual(36.1106);
      expect(+center.lng.toFixed(4)).toEqual(108.7344);
      expect(mapstudioWebmap.mapParams.title).toBe('restmap服务');
      expect(mapstudioWebmap.mapParams.description).toBe('');
      var style = map.getStyle();
      expect(style.name).toBe(mapstudioWebmap.mapParams.title);
      expect(style.layers.length).toBe(2);
      done();
    });
  });

  it('vector_symbol', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = mapstudioWebMap_symbol;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('617580084.json') > -1) {
        var appInfo = mapstudioAppInfo;
        return Promise.resolve(new Response(appInfo));
      }
      return Promise.resolve();
    });
    var mapstudioWebmap = new WebMap(id, {
      server: server
    });

    mapstudioWebmap.on('mapinitialized', ({ map }) => {
      spyOn(map, 'loadImage').and.callFake((url, cb) => {
        let img = new Image();
        img.onload = () => {
          isLoaded = true;
          load.emxit(url);
        };
        img.src = url;
        cb(img);
      });
    });

    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      var style = map.getStyle();
      expect(style.layers.length).toBe(3);
      done();
    });
  });
});
