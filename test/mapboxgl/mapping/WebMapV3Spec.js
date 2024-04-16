import { WebMap } from '../../../src/mapboxgl/mapping/WebMap';
import { WebMap as WebMapV3 } from '../../../src/mapboxgl/mapping/webmap/v3/WebMap';
import '../../resources/WebMapV3.js';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';

describe('mapboxgl-webmap3.0', () => {
  var originalTimeout, testDiv;
  var server = 'http://localhost:8190/iportal/';
  var id = 617580084;
  var mapstudioWebmap;
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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    if (mapstudioWebmap && mapstudioWebmap.map) {
        const webMapV3 = mapstudioWebmap._getWebMapInstance ? mapstudioWebmap._getWebMapInstance() : mapstudioWebmap;
        webMapV3.clean && webMapV3.clean();
        mapstudioWebmap = null;
    }
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
    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    expect(mapstudioWebmap.options.target).toBe('map');
    expect(mapstudioWebmap.mapId).toBe(id);
    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
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
    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    expect(mapstudioWebmap.credentialKey).toBeUndefined();
    expect(mapstudioWebmap.credentialValue).toBeUndefined();
    expect(mapstudioWebmap.options.target).toBe('map');
    expect(mapstudioWebmap.mapId).toBe(id);
    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      expect(map.getZoom()).toBeCloseTo(3.412, 0.001);
      var center = map.getCenter();
      expect(+center.lat.toFixed(4)).toEqual(39.9478);
      expect(+center.lng.toFixed(4)).toEqual(116.3949);
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
        return Promise.resolve(new Response(mapstudioWebMap_symbol));
      } else if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_symbol));
      } else if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });

    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      var style = map.getStyle();
      const webMapV3 = mapstudioWebmap._getWebMapInstance();
      const mapInfo = JSON.parse(mapstudioWebMap_symbol);
      expect(style.layers.length).toBe(mapInfo.layers.length);
      expect(webMapV3.getLayers().length).toBeLessThanOrEqual(mapInfo.layers.length);
      expect(webMapV3.getLegendInfo().length).not.toBe(0);
      expect(webMapV3.getLayerCatalog().length).not.toBe(0);
      done();
    });
  });

  it('mapId is JSON', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map'
    });
    mapstudioWebmap.initializeMap(mapInfo);

    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      var style = map.getStyle();
      expect(style.layers.length).toBe(mapInfo.layers.length);
      expect(mapstudioWebmap.getLayers().length).toBeLessThanOrEqual(mapInfo.layers.length);
      expect(mapstudioWebmap.getLegendInfo().length).toBe(0);
      done();
    });
  });
});
