import mapboxgl from 'mapbox-gl';
import mbglmap, { CRS } from '../../tool/mock_mapboxgl_map';
import { WebMap } from '../../../src/mapboxgl/mapping/WebMap';
import * as MapManagerUtil from '../../../src/mapboxgl/mapping/webmap/MapManager';
import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest';
import { ArrayStatistic } from '@supermapgis/iclient-common/util/ArrayStatistic';
import '../../resources/WebMapV5.js';

describe('mapboxgl_WebMap', () => {
  var originalTimeout, testDiv;
  var server = 'http://fack:8190/iportal/';
  var id = 1788054202;
  var datavizWebmap;
  beforeEach(() => {
    spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    mapboxgl.CRS = CRS;

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
    window.jsonsql = { query: () => {} };
  });
  afterEach(() => {
    if (datavizWebmap && datavizWebmap.map) {
      datavizWebmap.map.remove();
      datavizWebmap.map = null;
      datavizWebmap = null;
    }
    window.document.body.removeChild(testDiv);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    mapboxgl.CRS = undefined;
    window.jsonsql = undefined;
  });
  it('initialize_TIANDITU_VEC', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_TIANDITU_VEC1;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, {
      server: server
    });
    datavizWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(datavizWebmap.callBack).toBeUndefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      var map = datavizWebmap.map;

      expect(map).not.toBe(null);
      expect(map.getZoom()).toBeCloseTo(1, 0.001);
      var center = map.getCenter();
      expect(+center.lat.toFixed(4)).toEqual(34);
      expect(+center.lng.toFixed(4)).toEqual(110);
      expect(datavizWebmap.mapParams.title).toBe('tianditu');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('resize', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_CLOUD;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', ({ map }) => {
      datavizWebmap.resize();
      expect(map.resize).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('setMapId', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_CLOUD;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(id, options);
    datavizWebmap.once('mapcreatesucceeded', () => {
      datavizWebmap.setMapId('testID');
      expect(datavizWebmap.mapId).toEqual('testID');
      datavizWebmap.on('mapcreatesucceeded', () => {
        done();
      });
    });
  });
  it('jsonsql', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_CLOUD;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      const webMapV2 = datavizWebmap._getWebMapInstance();
      webMapV2.getFilterFeatures('2020年人口数>20', [{ properties: { '2020年人口数': 30 } }]);
      webMapV2.getFilterFeatures('观测场海拔高度（米）>150', [{ properties: { '观测场海拔高度（米）': 150 } }]);
      done();
    });
  });

  it('setWebMapOptions', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_CLOUD;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(id, options);
    datavizWebmap.once('mapcreatesucceeded', () => {
      expect(datavizWebmap.options.server).toBe(server);
      expect(datavizWebmap.options.serverUrl).toBe(datavizWebmap.options.server);
      const nextUrl = 'http://www.test.com';
      datavizWebmap.setWebMapOptions({ server: nextUrl });
      datavizWebmap.on('mapcreatesucceeded', () => {
        expect(datavizWebmap.options.server).toBe(`${nextUrl}/`);
        expect(datavizWebmap.options.serverUrl).toBe(datavizWebmap.options.server);
        done();
      });
    });
  });

  it('setMapOptions', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_TIANDITU_VEC1;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(id, {
      server: server
    });
    let mapOptions = {
      center: [20, 0],
      zoom: 10,
      minZoom: 10,
      maxZoom: 12,
      isWorldCopy: true
    };
    datavizWebmap.on('mapcreatesucceeded', () => {
      datavizWebmap.setCenter(mapOptions.center);
      expect(datavizWebmap.mapOptions.center).toEqual(mapOptions.center);
      datavizWebmap.setZoom(mapOptions.zoom);
      expect(datavizWebmap.mapOptions.zoom).toBe(mapOptions.zoom);
      datavizWebmap.setMinZoom(mapOptions.minZoom);
      expect(datavizWebmap.mapOptions.minZoom).toBe(mapOptions.minZoom);
      datavizWebmap.setMaxZoom(mapOptions.maxZoom);
      expect(datavizWebmap.mapOptions.maxZoom).toBe(mapOptions.maxZoom);
      datavizWebmap.setRenderWorldCopies(mapOptions.isWorldCopy);
      expect(datavizWebmap.mapOptions.renderWorldCopies).toBe(mapOptions.isWorldCopy);
      done();
    });
  });
  it('initialize_TIANDITU_IMAGE', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_TIANDITU_IMAGE1;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });

    let options = {
      server: server
    };
    datavizWebmap = new WebMap(id, options);

    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(2, 0.001);
      expect(datavizWebmap.mapParams.title).toBe('image_tianditu');
      expect(datavizWebmap.mapParams.description).toBe('This is a image');
      done();
    });
  });

  it('initialize_TIANDITU_TER', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_TIANDITU_TER;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);

    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.mapParams.description).toBe('tianditu_ter');
      done();
    });
  });

  it('initialize_OPENSTREET', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_OPENSTREET;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(2, 0.001);
      // expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
      expect(datavizWebmap.mapParams.title).toBe('openstreet');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('initialize_FAILD mapcreatefailed', (done) => {
    let options = {
      server: server
    };
    const errorMsg = 'test error';
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      return Promise.reject('test error');
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatefailed', ({ error }) => {
      expect(error).toBe(errorMsg);
      expect(datavizWebmap.mapParams).toBeUndefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      done();
    });
  });

  it('initialize_FAILD getmapfailed', (done) => {
    let options = {
      server: server
    };
    const errorMsg = 'test error';
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      return Promise.reject('test error');
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('getmapfailed', ({ error }) => {
      expect(error).toBe(errorMsg);
      expect(datavizWebmap.mapParams).toBeUndefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      done();
    });
  });

  it('initialize_CLOUD mapcreatesucceeded', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_CLOUD;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBe(1);
      expect(datavizWebmap.mapParams.title).toBe('GAOD');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('initialize_CLOUD addlayerssucceeded', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_CLOUD;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('addlayerssucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBe(1);
      expect(datavizWebmap.mapParams.title).toBe('GAOD');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('initialize_GOOGLE', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_GOOGLE;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(1, 0.001);
      //expect(map.getCenter()).toEqual([0, -7.081154551613622e-10]);
      expect(datavizWebmap.mapParams.title).toBe('google_map');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('createThemeLayer_Vector_Basis', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Theme_base;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(csvData));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(7, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
      expect(datavizWebmap.mapParams.title).toBe('theme_base');
      expect(datavizWebmap.mapParams.description).toBe('base style');
      done();
    });
  });

  it('createThemeLayer_Vector_Basis_Line', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Theme_base_Line;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(10, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.39560889343755, 39.93917738600353));
      expect(datavizWebmap.mapParams.title).toBe('Line_basis');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('createThemeLayer_Vector_IMAGE', (done) => {
    let options = {
      server: server
    };

    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Image;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      spyOn(datavizWebmap.map, 'loadImage').and.callFake((url, cb) => {
        let img = new Image();
        img.onload = () => {
          isLoaded = true;
          load.emxit(url);
        };
        img.src = url;
        cb(img);
      });
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      expect(datavizWebmap.mapParams.title).toBe('Image');
      expect(datavizWebmap.mapParams.description).toBe('');
      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(7, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
      done();
    });
  });

  it('createThemeLayer_Unique', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Unique;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(xlsData));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(12, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.32442464111327, 39.98897628932847));
      expect(datavizWebmap.mapParams.title).toBe('Unique');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('createThemeLayer_Range', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Range;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve();
    });
    spyOn(ArrayStatistic, 'getArraySegments').and.callFake(() => {
      return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', function () {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(10, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.40097798513067, 39.900378604132094));
      expect(datavizWebmap.mapParams.title).toBe('RANGE_LABEL');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('createThemeLayer_Heat', (done) => {
    //插件里面i未定义报错
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Heat;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(csvData));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(7, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
      expect(datavizWebmap.mapParams.title).toBe('Heat');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('createThemeLayer_Marker', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Marker;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(markerData));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(2, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(8.437500000000002, -7.710991655433243));
      expect(datavizWebmap.mapParams.title).toBe('标注图层');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('createThemeLayer_SUPERMAP_MAP_datasource', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_RestMap1;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    spyOn(FetchRequest, 'post').and.callFake((url) => {
      if (url.indexOf('queryResults') > -1) {
        return Promise.resolve(new Response(supermapRestData));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(9, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.46675928388, 40.15816517545865));
      expect(datavizWebmap.mapParams.title).toBe('RestMap');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('createThemeLayer_SUPERMAP_MAP', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_RestMap;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', function () {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(7, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.87260685408502, 40.11626853496025));
      expect(datavizWebmap.mapParams.title).toBe('RestMap');
      expect(datavizWebmap.mapParams.description).toBe('restMap from jingjin');
      done();
    });
  });

  it('createThemeLayer_SUPERMAPREST_DATA', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_RestData;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    spyOn(FetchRequest, 'post').and.callFake((url) => {
      return Promise.resolve(new Response(supermapData));
    });
    var datavizWebmap = new WebMap(id, options);

    datavizWebmap.on('mapcreatesucceeded', function () {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(9, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.8995771532053, 39.700527641334965));
      expect(datavizWebmap.mapParams.title).toBe('RestData');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('createThemeLayer_SUPERMAPREST_DATA preferServer', (done) => {
    let options = {
      server: server,
      preferServer: true
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_RestData;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    spyOn(FetchRequest, 'post').and.callFake((url) => {
      expect(url).toBe('http://fakeiserver/iserver/services/data-jingjin/rest/data/featureResults.geojson?returnContent=true');
      return Promise.resolve(new Response(JSON.stringify(JSON.parse(markerData2.content))));
    });
    var datavizWebmap = new WebMap(id, options);

    datavizWebmap.on('mapcreatesucceeded', function () {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map.getZoom()).toBeCloseTo(9, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.8995771532053, 39.700527641334965));
      expect(datavizWebmap.mapParams.title).toBe('RestData');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('WMS', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_WMS;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(wmsCapabilitiesTextWith130));
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var map = datavizWebmap.map;
      expect(map).not.toBe(null);
      expect(map.getZoom()).toBeCloseTo(1, 0.001);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(0, 0));
      expect(datavizWebmap.mapParams.title).toBe('wms');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    });
  });

  it('getRangeStyleGroup', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_TIANDITU_VEC;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    spyOn(ArrayStatistic, 'getArraySegments').and.callFake(() => {
      return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
    });
    var datavizWebmap = new WebMap(id, {
      server: server
    });
    datavizWebmap.on('mapcreatesucceeded', () => {
      var params =
        '{"layerType":"RANGE","visible":true,"themeSetting":{"themeField":"field","customSettings":{"0":{"color":"#bd10e0","segment":{"start":1, "end": 10}}},"segmentMethod":"square","segmentCount":6,"colors":["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"]},"name":"上海市可校外学习中心","featureType":"POINT","xyField":{"xField":"经度","yField":"纬度"},"style":{"strokeWidth":1,"fillColor":"#99D594","fillOpacity":0.9,"radius":5,"strokeColor":"#ffffff","type":"BASIC_POINT","strokeOpacity":1},"projection":"EPSG:4326","dataSource":{"type":"PORTAL_DATA","serverId":"1132407305"}}';
      var features = [];
      let feature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [116, 39]
        },
        properties: {
          field: 10
        }
      };
      features.push(feature);
      const webMapV2 = datavizWebmap._getWebMapInstance();
      webMapV2.getRangeStyleGroup(JSON.parse(params), features);
      expect(ArrayStatistic.getArraySegments).toHaveBeenCalled();
      done();
    });
  });

  it('dashStyle', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_TIANDITU_VEC1;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, {
      server: server
    });
    let style = [
      { strokeDashstyle: 'solid' },
      { strokeDashstyle: 'dot' },
      { strokeDashstyle: 'dashdot' },
      { strokeDashstyle: 'dash' },
      { strokeDashstyle: '' },
      { strokeDashstyle: 'longdash' },
      { strokeDashstyle: 'longdashdot' }
    ];

    datavizWebmap.on('mapinitialized', () => {
      const webMapV2 = datavizWebmap._getWebMapInstance();
      expect(webMapV2.getDashStyle(style[0].strokeDashstyle).length).toBe(0);
      expect(webMapV2.getDashStyle(style[1].strokeDashstyle).length).toBe(2);
      expect(webMapV2.getDashStyle(style[2].strokeDashstyle).length).toBe(4);
      expect(webMapV2.getDashStyle(style[4].strokeDashstyle)).toEqual([]);
      expect(webMapV2.getDashStyle(style[3].strokeDashstyle).length).toBe(2);
      expect(webMapV2.getDashStyle(style[5].strokeDashstyle).length).toBe(2);
      expect(webMapV2.getDashStyle(style[6].strokeDashstyle).length).toBe(4);
      done();
    });
  });

  it('vector_svg', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_SVG1;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve();
    });

    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      // spyOn(datavizWebmap, '_getCanvasFromSVG').and.callFake((svg_url, svgDiv, cb) => {
      //     let canvas = document.createElement('canvas');
      //     canvas.width = '150px';
      //     cb(canvas);
      // });
      spyOn(datavizWebmap.map, 'loadImage').and.callFake((url, cb) => {
        let img = new Image();
        img.onload = () => {
          isLoaded = true;
          load.emxit(url);
        };
        img.src = url;
        cb(img);
      });
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      done();
    });
  });
  it('vector_symbol', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_symbol;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      done();
    });
  });
  it('_getFiterFeatures', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_TIANDITU_VEC1;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      const webMapV2 = datavizWebmap._getWebMapInstance();
      webMapV2.getFilterFeatures('SmID>20', geojsonData);
      let feature =
        '[{ "type" : "Feature", "properties" : { "name" : "aaaa" }, "geometry" : { "type" : "Polygon", "coordinates" : [ [[92.6806640625, 35.9957853864], [92.548828125, 29.8025179058], [99.9755859375, 33.541394669], [92.6806640625, 35.9957853864]], [[110.830078125, 34.5246614718], [103.6326255336, 36.859947123], [109.7218666539, 40.599259339], [110.830078125, 34.5246614718]] ] } } ]';
      webMapV2._handleMultyPolygon(JSON.parse(feature));
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      done();
    });
  });
  it('datavizWebMap_WMTS', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(datavizWebMap_WMTS3));
      }
      return Promise.resolve(new Response(wmtsCapabilitiesText));
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      done();
    });
  });
  it('datavizWebMap_WMTS_Custom', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_WMTS2;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('wmts') > -1) {
        return Promise.resolve(new Response(wmtsInfoCustom));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);

    datavizWebmap.on('mapcreatesucceeded', function () {
      setTimeout(() => {
        expect(datavizWebmap.map.getStyle().layers.length).toBe(2);
        done();
      }, 100);
    });
  });

  it('initialize_MVT', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_MVT;
        return Promise.resolve(new Response(JSON.stringify(mapJson)));
      }
      if (url.indexOf('tileFeature/vectorstyles.json') > -1) {
        var stye = {
          version: 8,
          sources: {
            'raster-tiles': {
              type: 'raster',
              tiles: ['base/resources/img/baiduTileTest.png'],
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
        };
        return Promise.resolve(new Response(JSON.stringify(stye)));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, {
      server: server
    });
    datavizWebmap.on('mapcreatesucceeded', () => {
      var map = datavizWebmap.map;
      expect(map).not.toBe(null);
      setTimeout(() => {
        expect(map.getStyle().sources['raster-tiles']).not.toBe(undefined);
        done();
      }, 1000);
    });
  });
  it('createMarkerLayer_svg', (done) => {
    let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Marker;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(JSON.stringify(svgmarker)));
      }
      return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', () => {
      var map = datavizWebmap.map;
      setTimeout(() => {
        expect(map._layers['未命名标注图层1']).not.toBe(undefined);
        done();
      }, 1000);
    });
  });

  it('switch map and reset center zoom CRS', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(datavizWebMap_Marker));
      }
      if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(markerData));
      }
      return Promise.resolve();
    });
    const commonMapOptions = {
      container: 'map',
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: ['https://test'],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 5,
            maxzoom: 20
          }
        ]
      },
      center: [120.143, 30.236],
      zoom: 3,
      bounds: {
        getEast: () => 2,
        getWest: () => -1,
        getSouth: () => 2,
        getNorth: () => -1
      }
    };
    var datavizWebmap = new WebMap(
      id,
      {
        server: server
      },
      commonMapOptions
    );
    const callback = function () {
      let zoom = datavizWebmap.mapOptions.zoom;
      let center = datavizWebmap.mapOptions.center;
      expect(zoom).toBe(commonMapOptions.zoom);
      expect(center).toEqual(commonMapOptions.center);
      datavizWebmap.setStyle({});
      expect(datavizWebmap.mapOptions.zoom).toBeNull();
      expect(datavizWebmap.mapOptions.center).toBeNull();
      datavizWebmap.once('mapcreatesucceeded', ({ map }) => {
        center = [116, 30];
        zoom = 16;
        datavizWebmap.setCenter(center);
        expect(datavizWebmap.mapOptions.center).toEqual(center);
        datavizWebmap.setZoom(zoom);
        expect(datavizWebmap.mapOptions.zoom).toBe(zoom);
        datavizWebmap.setMapId('');
        datavizWebmap.setStyle({
          version: 8,
          sources: {
            source1: {
              type: 'raster',
              tileSize: 256,
              tiles: ['base/resources/img/baiduTileTest.png']
            }
          },
          layers: [
            {
              id: 'layer1',
              type: 'raster',
              source: 'source1',
              minzoom: 0,
              maxzoom: 22
            }
          ]
        });
        expect(datavizWebmap.mapOptions.zoom).toBe(zoom);
        expect(datavizWebmap.mapOptions.center).toEqual(center);
        datavizWebmap.map = map;
        spyOn( map, 'setCRS');
        spyOn(map, 'getCRS').and.callFake((crs) => {
          if (crs === 'EPSG:4326') {
            return crs;
          }
          return null;
        });
        datavizWebmap.setCRS('EPSG:4326');
        expect(map.setCRS).not.toHaveBeenCalled();
        datavizWebmap.setCRS('EPSG:3857');
        expect(map.setCRS).toHaveBeenCalled();
        datavizWebmap.map = null;
        datavizWebmap.once('mapcreatesucceeded', ({ layers }) => {
          expect(layers.length).toBe(1);
          done();
        });
      });
    };
    datavizWebmap.once('mapcreatesucceeded', callback);
  });

  it('copy layer', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(datavizWebMap_geojson));
      }
      return Promise.resolve(new Response(geojsonData));
    });
    var datavizWebmap = new WebMap(
      '',
      {
        server: server
      },
      {
        style: {
          version: 8,
          sources: {
            source1: {
              type: 'raster',
              tileSize: 256,
              tiles: ['base/resources/img/baiduTileTest.png']
            }
          },
          layers: [
            {
              id: 'layer1',
              type: 'raster',
              source: 'source1',
              minzoom: 0,
              maxzoom: 22
            }
          ]
        },
        center: [116, 39],
        zoom: 3
      }
    );
    datavizWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(map.getZoom()).toBe(3);
      expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116, 39));
      expect(map.getStyle().layers.length).toBe(1);
      const layerToCopy = 'layer1';
      expect(map.style._layers[layerToCopy]).not.toBeUndefined();
      const copiedLayerId = `${layerToCopy}_copy`;
      datavizWebmap.copyLayer(layerToCopy, { id: copiedLayerId });
      expect(map.getStyle().layers.length).toBe(1);
      expect(map.style._layers[copiedLayerId]).toBeUndefined();
      done();
    });
  });

  it('test mapstyle checkSameLayer', (done) => {
    const commonOption = {
      server: 'http://fack:8190/iportal/',
      target: 'map',
      withCredentials: false
    };
    datavizWebmap = new WebMap(
      '',
      { ...commonOption },
      { style: { version: 8, sources: {}, layers: [] }, center: [0, 0], zoom: 1, crs: 'EPSG:3857' }
    );
    const callback = function (data) {
      const appreciableLayers = datavizWebmap.getLayers();
      expect(appreciableLayers.length).toBe(0);
      const webMap1 = new WebMap('', { ...commonOption, map: data.map, checkSameLayer: true }, mapOptionsList[0]);
      webMap1.once('mapcreatesucceeded', ({ layers }) => {
        expect(layers.length).toBe(2);
        expect(layers[0].reused).toBeUndefined();
        expect(layers[0].id).toBe('China4269@DataSource');
        expect(layers[1].reused).toBeUndefined();
        expect(layers[1].id).toBe('424149619$geometry');
        const webMap2 = new WebMap('', { ...commonOption, map: data.map, checkSameLayer: true }, mapOptionsList[1]);
        webMap2.once('mapcreatesucceeded', ({ layers, map }) => {
          expect(layers.length).toBe(2);
          expect(layers[0].reused).toBeTruthy();
          expect(layers[0].id).toBe('China4269@DataSource');
          expect(layers[1].reused).toBeUndefined();
          expect(layers[1].id).toContain('424149619$geometry');
          let layersOnMap = map.getStyle().layers;
          expect(layersOnMap.length).toBe(3);
          expect(layersOnMap[0].id).toBe('China4269@DataSource');
          expect(layersOnMap[1].id).toBe('未命名数据');
          expect(layersOnMap[2].id).toContain('未命名数据_');
          const listenEvents = {};
          spyOn(map, 'off').and.callFake((type, cb) => {
            listenEvents[type] = cb;
          });
          webMap2.cleanLayers();
          layersOnMap = map.getStyle().layers;
          expect(layersOnMap.length).toBe(2);
          expect(layersOnMap[0].id).toBe('China4269@DataSource');
          expect(layersOnMap[1].id).toBe('未命名数据');
          expect(listenEvents.styledata).not.toBeUndefined();
          webMap1.cleanLayers();
          done();
        });
      });
    };
    datavizWebmap.once('mapcreatesucceeded', callback);
  });

  it('toggle mapstyle layers visible', (done) => {
    const commonOption = {
      server: 'http://fack:8190/iportal/',
      target: 'map',
      withCredentials: false
    };
    datavizWebmap = new WebMap('', { ...commonOption }, mapOptionsList[0]);
    const callback = function () {
      let layers = datavizWebmap.getLayers();
      expect(layers.length).toBe(2);
      expect(layers[0].id).toBe('China4269@DataSource');
      expect(layers[0].visible).toBeTruthy();
      datavizWebmap.toggleLayerVisible(layers[0], false);
      layers = datavizWebmap.getLayers();
      expect(layers[0].visible).toBeFalsy();
      datavizWebmap.once('layerupdatechanged', () => {
        layers = datavizWebmap.getLayers();
        expect(layers[0].visible).toBeTruthy();
        done();
      });
      datavizWebmap.setLayersVisible([layers[0]], 'visible');
    };
    datavizWebmap.once('mapcreatesucceeded', callback);
  });

  it('rectifyLayersOrder', (done) => {
    const commonOption = {
      server: 'http://fack:8190/iportal/',
      target: 'map',
      withCredentials: false
    };
    datavizWebmap = new WebMap('', { ...commonOption }, mapOptionsList[0]);
    const callback = function ({ map }) {
      let layers = datavizWebmap.getLayers();
      expect(layers.length).toBe(2);
      let newLayers = [layers[1], layers[0]];
      datavizWebmap.rectifyLayersOrder(newLayers);
      const layersOnMap = map.getStyle().layers;
      expect(layersOnMap[0].id).toBe('未命名数据');
      done();
    };
    datavizWebmap.once('mapcreatesucceeded', callback);
  });

  it('getWebMapType', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Marker;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('content.json?') > -1) {
        return Promise.resolve(new Response(JSON.stringify(svgmarker)));
      }
      return Promise.resolve();
    });
    const commonOption = {
      server: 'http://fack:8190/iportal/',
      target: 'map',
      withCredentials: false
    };
    datavizWebmap = new WebMap('', { ...commonOption }, mapOptionsList[0]);

    const callback = function () {
      var datavizWebmap2 = new WebMap(id, {
        server: server
      });
      datavizWebmap2.once('mapcreatesucceeded', function () {
        const type1 = datavizWebmap.getWebMapType();
        const type2 = datavizWebmap2.getWebMapType();
        expect(type1).toBe('MapStyle');
        expect(type2).toBe('WebMap2');
        datavizWebmap2.cleanLayers();
        done();
      });
    };
    datavizWebmap.once('mapcreatesucceeded', callback);
  });

  it('test transformRequest when url includes iportalproxy', (done) => {
    const iportalServiceProxyUrl = 'http://localhost:8195/portalproxy';
    const tileCustomRequestHeaders = { 'Authorization': 'test token' };
    const commonOption = {
      server: 'http://fack:8190/iportal/',
      target: 'map',
      withCredentials: false,
      iportalServiceProxyUrlPrefix: iportalServiceProxyUrl,
      tileTransformRequest: (url) => {
        if (url.includes(iportalServiceProxyUrl)) {
          return { headers: tileCustomRequestHeaders };
        }
      }
    };
    const mapOptions = {
      style: {
        version: 8,
        sources: {
          baseLayer: {
            type: 'raster',
            tiles: ['https://test'],
            tileSize: 256
          }
        },
        layers: [{ id: 'baseLayer', type: 'raster', source: 'baseLayer' }]
      },
      center: [107.7815, 39.9788],
      zoom: 5,
      renderWorldCopies: false,
      crs: 'EPSG:3857',
      minzoom: 0,
      maxzoom: 22
    };
    datavizWebmap = new WebMap('', { ...commonOption }, { ...mapOptions });
    datavizWebmap.on('mapinitialized', ({ map }) => {
      let mockTileUrl =
        'http://localhost:8195/portalproxy/7c851958ab40a5e0/iserver/services/map_world1_y6nykx3f/rest/maps/World1/tileimage.png?scale=6.760654286410619e-9&x=1&y=0&width=256&height=256&transparent=true&redirect=false&cacheEnabled=true&origin=%7B%22x%22%3A-180%2C%22y%22%3A90%7D';
      let transformed = datavizWebmap._handler.mapOptions.transformRequest(mockTileUrl, 'Tile');
      expect(transformed.credentials).toBe('include');
      expect(transformed.headers).toEqual(tileCustomRequestHeaders);
      expect(transformed.url).toBe(mockTileUrl);
      mockTileUrl = 'https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark';
      transformed = map.options.transformRequest(mockTileUrl, 'Tile');
      expect(transformed.credentials).toBeUndefined();
      expect(transformed.headers).toBeUndefined();
      done();
    });
  });
});
