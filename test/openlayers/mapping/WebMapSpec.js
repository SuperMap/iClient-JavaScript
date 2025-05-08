import { WebMap } from '../../../src/openlayers/mapping/WebMap';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { Util as CommonUtil } from '../../../src/common/commontypes/Util';
import '../../resources/WebMapV5.js';
import { ArrayStatistic } from '../../../src/common/util/ArrayStatistic';
import { Util } from '../../../src/openlayers/core/Util';
import { StyleUtils } from '../../../src/openlayers/core/StyleUtils';
import { DataFlowService } from '../../../src/openlayers/services';
import { Server } from 'mock-socket';
import { Object as obj } from 'ol';
import Overlay from 'ol/Overlay';
import * as olControl from 'ol/control';
import Feature from 'ol/Feature';
import * as olProj from 'ol/proj';
import proj4 from 'proj4';
import * as olLayer from 'ol/layer';
import cloneDeep from 'lodash.clonedeep';

window.jsonsql = { query: () => {} };

describe('openlayers_WebMap', () => {
  var originalTimeout, testDiv, webMap;
  var server = 'http://127.0.0.1:8090/iportal/';
  var defaultServer = 'https://www.supermapol.com/';
  var defaultServeRequest = 'https://www.supermapol.com/web/maps/1788054202/map';
  var proxy = `${server}apps/viewer/getUrlResource.json?url=`;
  var id = 1788054202;
  beforeEach(() => {
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '50px';
    testDiv.style.height = '50px';
    window.document.body.appendChild(testDiv);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    webMap = null;
    window.document.body.removeChild(testDiv);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('initialize_TIANDITU_VEC', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_TIANDITU_VEC;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    const successCallback = () => {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.callBack).toBeUndefined();
      expect(datavizWebmap.errorCallback).toBeUndefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(view.getCenter()).toEqual([0, -7.081154551613622e-10]);
      expect(datavizWebmap.mapParams.title).toBe('tianditu');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    };
    var datavizWebmap = new WebMap(id, {
      server: server,
      successCallback
    });
  });

  it('initialize_TIANDITU_IMAGE', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_TIANDITU_IMAGE;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var overlayDiv = window.document.createElement('div');
    overlayDiv.setAttribute('id', 'marker-pop');
    window.document.body.appendChild(overlayDiv);

    const successCallback = () => {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(datavizWebmap.mapParams.title).toBe('image_tianditu');
      expect(datavizWebmap.mapParams.description).toBe('This is a image');
      /*spyOn(options.mapSetting, 'mapClickCallback');
            datavizWebmap.map.trigger('click');
            expect(options.mapSetting.mapClickCallback).toHaveBeenCalled();*/
      done();
    };
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {},
      mapSetting: {
        overlays: [
          new Overlay({
            id: 'marker-pop',
            positioning: 'bottom-center'
          })
        ],
        controls: olControl.defaults({
          attributionOptions: {
            collapsed: false
          },
          zoom: true,
          attribution: false
        }),
        mapClickCallback: function (evt) {}
      }
    };

    var datavizWebmap = new WebMap(id, options);
  });

  it('initialize_TIANDITU_TER', (done) => {
    const successCallback = () => {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBe('key');
      expect(datavizWebmap.credentialValue).toBe('keyValue');

      var view = datavizWebmap.map.getView();
      expect(datavizWebmap.mapParams.title).toBe('ter');
      expect(datavizWebmap.mapParams.description).toBe('tianditu_ter');
      done();
    };
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {},
      credentialKey: 'key',
      credentialValue: 'keyValue'
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_TIANDITU_TER;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);
  });

  it('initialize_BAIDU', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_BAIDU;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(datavizWebmap.mapParams.title).toBe('百度');
      expect(datavizWebmap.mapParams.description).toBe('');

      done();
    }
  });

  it('initialize_ZXYtILE 3857全球剖分', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebmap_ZXYTILE;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.mapParams.title).toBe('xyz');
      expect(datavizWebmap.layerAdded).toBe(1);
      done();
    }
  });

  it('initialize_ZXYtILE world 4326', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebmap_ZXYTILE_4326;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);
    function successCallback() {
      expect(datavizWebmap.mapParams.title).toBe('4326-zxy-tile');
      expect(datavizWebmap.layerAdded).toBe(1);
      done();
    }
  });
  it('initialize_ZXYtILE baseLayer 2326 epsgcode', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(xyzLayer2326)));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);
    function successCallback(map) {
      expect(datavizWebmap.mapParams.title).toBe('zxy_2326');
      expect(map.getView().getMinZoom()).toBe(10);
      expect(map.getLayers().getArray()[0].getMinZoom()).toBe(9);
      done();
    }
  });

  it('jsonsql', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_BAIDU;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      datavizWebmap.getFiterFeatures('2020年人口数> 20', [{ get: () => ({ '2020年人口数': 30 }) }]);
      datavizWebmap.getFiterFeatures('观测场海拔高度（米）>150', [{ get: () => ({ '观测场海拔高度（米）': 30 }) }]);
      // datavizWebmap.createDataflowLayer({filterCondition:'2020年人口数> 20', pointStyle:{}, wsUrl: 'ws://test/iserver/services/dataflow/dataflow/subscribe'}, [{ get: () => ({ '2020年人口数': 30 }) }]);
      done();
    }
  });
  it('isvj-5215', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_BAIDU;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);

    async function successCallback() {
      const parameters = {
        layerType: 'UNIQUE',
        visible: true,
        themeSetting: {
          themeField: 'UserID',
          customSettings: {
            0: {
              fillColor: '#D53E4F',
              strokeWidth: 1,
              offsetX: 0,
              offsetY: 0,
              fillOpacity: 0.9,
              type: 'BASIC_POINT',
              radius: 15,
              strokeColor: '#ffffff',
              strokeOpacity: 1
            },
            1: {
              fillColor: '#3288BD',
              strokeWidth: 1,
              offsetX: 0,
              offsetY: 0,
              fillOpacity: 0.9,
              type: 'BASIC_POINT',
              radius: 15,
              strokeColor: '#ffffff',
              strokeOpacity: 1
            },
            2: {
              fillColor: '#FC8D59',
              strokeWidth: 1,
              offsetX: 0,
              offsetY: 0,
              fillOpacity: 0.9,
              type: 'BASIC_POINT',
              radius: 15,
              strokeColor: '#ffffff',
              strokeOpacity: 1
            },
            3: {
              fillColor: '#99D594',
              strokeWidth: 1,
              offsetX: 0,
              offsetY: 0,
              fillOpacity: 0.9,
              type: 'BASIC_POINT',
              radius: 15,
              strokeColor: '#ffffff',
              strokeOpacity: 1
            },
            5: {
              fillColor: '#FEE08B',
              strokeWidth: 1,
              offsetX: 0,
              offsetY: 0,
              fillOpacity: 0.9,
              type: 'BASIC_POINT',
              radius: 15,
              strokeColor: '#ffffff',
              strokeOpacity: 1
            },
            8: {
              fillColor: '#E6F598',
              strokeWidth: 1,
              offsetX: 0,
              offsetY: 0,
              fillOpacity: 0.9,
              type: 'BASIC_POINT',
              radius: 15,
              strokeColor: '#ffffff',
              strokeOpacity: 1
            }
          },
          colors: ['#D53E4F', '#FC8D59', '#FEE08B', '#FFFFBF', '#E6F598', '#99D594', '#3288BD']
        },
        name: 'isvj-5215',
        featureType: 'POINT',
        labelStyle: {
          offsetX: 0,
          textBaseline: 'bottom',
          fontFamily: '黑体',
          offsetY: -19,
          outlineWidth: 0,
          textAlign: 'center',
          outlineColor: '#000000',
          fontSize: '14px',
          fill: '#333',
          backgroundFill: [255, 255, 255, 0.8],
          labelField: 'UserID'
        },
        style: {
          strokeWidth: 1,
          offsetX: 0,
          fillColor: '#E6F598',
          offsetY: 0,
          fillOpacity: 0.9,
          radius: 15,
          strokeColor: '#ffffff',
          type: 'BASIC_POINT',
          strokeOpacity: 1
        },
        projection: 'EPSG:4326',
        enableFields: ['UserID']
      };
      const res = await datavizWebmap.getUniqueStyleGroup(parameters, [{ get: () => ({ UserID: 30, UserID: 0 }) }]);
      expect(res.length).toBe(1);
      done();
    }
  });
  it('initialize_OPENSTREET', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_OPENSTREET;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      expect(datavizWebmap.mapParams.title).toBe('openstreet');
      expect(datavizWebmap.mapParams.description).toBe('');

      done();
    }
  });

  it('initialize_FAILD', (done) => {
    let options = {
      server: server,
      errorCallback
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      return Promise.reject();
    });
    var datavizWebmap = new WebMap(id, options);

    function errorCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      // expect(options.successCallback).not.toHaveBeenCalled();
      done();
    }
  });

  it('initialize_CLOUD', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_CLOUD;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(datavizWebmap.mapParams.title).toBe('GAOD');
      expect(datavizWebmap.mapParams.description).toBe('');

      done();
    }
  });

  it('initialize_UNDEFIED', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_UNDEFIED;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      expect(datavizWebmap.mapParams.title).toBe('undefinedMap');
      expect(datavizWebmap.mapParams.description).toBe('');

      done();
    }
  });

  it('createThemeLayer_Vector_Basis', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    let requestUrl = `${proxy}${encodeURIComponent(
      `${server}web/datas/675746998/content.json?pageSize=9999999&currentPage=1`
    )}`;
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Theme_base;
        return Promise.resolve(new Response(mapJson));
      } else if (url === requestUrl) {
        return Promise.resolve(new Response(csvData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(view.getZoom()).toBe(7);
      expect(view.getCenter()).toEqual([13428717.554131005, 3553719.2183414707]);
      expect(datavizWebmap.mapParams.title).toBe('theme_base');
      expect(datavizWebmap.mapParams.description).toBe('base style');

      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('浙江省高等院校(3)');
      done();
    }
  });

  it('createThemeLayer_Vector_Basis_Line', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    let requestUrl = `${proxy}${encodeURIComponent(
      `${server}web/datas/374284777/content.json?pageSize=9999999&currentPage=1`
    )}`;
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Theme_base_Line;
        return Promise.resolve(new Response(mapJson));
      } else if (url === requestUrl) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(view.getZoom()).toBe(10);
      expect(view.getCenter()).toEqual([12957099.912590493, 4857107.635483593]);
      expect(datavizWebmap.mapParams.title).toBe('Line_basis');
      expect(datavizWebmap.mapParams.description).toBe('');

      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('北京市轨道交通线路');
      done();
    }
  });

  it('createThemeLayer_Vector_IMAGE', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    let requestUrl = `${proxy}${encodeURIComponent(
      `${server}web/datas/675746998/content.json?pageSize=9999999&currentPage=1`
    )}`;
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Image;
        return Promise.resolve(new Response(mapJson));
      } else if (url === requestUrl) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      expect(datavizWebmap.mapParams.title).toBe('Image');
      expect(datavizWebmap.mapParams.description).toBe('');

      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('浙江省高等院校(3)');
      done();
    }
  });

  it('createThemeLayer_Vector_SVG', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    let requestUrl = `${proxy}${encodeURIComponent(
      `${server}web/datas/1782454383/content.json?pageSize=9999999&currentPage=1`
    )}`;
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_SVG;
        return Promise.resolve(new Response(mapJson));
      } else if (url === requestUrl) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);
    spyOn(datavizWebmap, 'createGraphicLayer');

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      expect(datavizWebmap.mapParams.title).toBe('无标题');
      expect(datavizWebmap.mapParams.description).toBe('');
      expect(datavizWebmap.createGraphicLayer).toHaveBeenCalled();

      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      done();
    }
  });

  it('createThemeLayer_Unique', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    let requestUrl = `${proxy}${encodeURIComponent(
      `${server}web/datas/658963918/content.json?pageSize=9999999&currentPage=1`
    )}`;
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Unique;
        return Promise.resolve(new Response(mapJson));
      } else if (url === requestUrl) {
        return Promise.resolve(new Response(xlsData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(view.getZoom()).toBe(12);
      expect(view.getCenter()).toEqual([12949175.717869252, 4864340.473197712]);
      expect(datavizWebmap.mapParams.title).toBe('Unique');
      expect(datavizWebmap.mapParams.description).toBe('');

      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('住宅_Lite(10)');
      done();
    }
  });

  it('createThemeLayer_Range', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    let requestUrl = `${proxy}${encodeURIComponent(
      `${server}web/datas/1236941499/content.json?pageSize=9999999&currentPage=1`
    )}`;
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Range;
        return Promise.resolve(new Response(mapJson));
      } else if (url === requestUrl) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(view.getZoom()).toBe(10);
      expect(view.getCenter()).toEqual([12957697.597143793, 4851476.112683487]);
      expect(datavizWebmap.mapParams.title).toBe('RANGE_LABEL');
      expect(datavizWebmap.mapParams.description).toBe('');

      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('北京市轨道交通线路(2)');
      expect(datavizWebmap.map.getLayers().getArray().length).toBe(3);
      done();
    }
  });

  it('createThemeLayer_Heat', (done) => {
    //插件里面i未定义报错
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    let requestUrl = `${proxy}${encodeURIComponent(
      `${server}web/datas/675746998/content.json?pageSize=9999999&currentPage=1`
    )}`;
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Heat;
        return Promise.resolve(new Response(mapJson));
      } else if (url === requestUrl) {
        return Promise.resolve(new Response(csvData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(view.getZoom()).toBe(7);
      expect(view.getCenter()).toEqual([13428717.554131005, 3553719.2183414707]);
      expect(datavizWebmap.mapParams.title).toBe('Heat');
      expect(datavizWebmap.mapParams.description).toBe('');
      done();
    }
  });

  it('createThemeLayer_Marker', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    let requestUrl = `${proxy}${encodeURIComponent(
      `${server}web/datas/579431262/content.json?pageSize=9999999&currentPage=1`
    )}`;
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_Marker;
        return Promise.resolve(new Response(mapJson));
      } else if (url === requestUrl) {
        return Promise.resolve(new Response(markerData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(Math.floor(view.getZoom())).toBe(2);
      expect(datavizWebmap.mapParams.title).toBe('标注图层');
      expect(datavizWebmap.mapParams.description).toBe('');

      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('未命名标注图层1');
      expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
      done();
    }
  });

  it('createThemeLayer_SUPERMAP_MAP', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_RestMap;
        return Promise.resolve(new Response(mapJson));
      } else {
        return Promise.resolve(new Response(jinJingMap));
      }
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(view.getZoom()).toBe(7);
      expect(view.getCenter()).toEqual([13010199.082679197, 4882852.518868368]);
      expect(datavizWebmap.mapParams.title).toBe('RestMap');
      expect(datavizWebmap.mapParams.description).toBe('restMap from jingjin');

      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('京津地区土地利用现状图');
      expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
      done();
    }
  });

  it('createThemeLayer_SUPERMAPREST_DATA', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_RestData;
        return Promise.resolve(new Response(mapJson));
      } else if (
        ur === 'https://www.supermapol.com/iserver/services/map-jingjin/rest/maps/京津地区土地利用现状图.json'
      ) {
        return Promise.resolve(new Response(jingjinData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    spyOn(FetchRequest, 'post').and.callFake((url) => {
      return Promise.resolve(new Response(supermapData));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(view.getZoom()).toBe(9);
      expect(view.getCenter()).toEqual([13013201.402643811, 4822518.728777889]);
      expect(datavizWebmap.mapParams.title).toBe('RestData');
      expect(datavizWebmap.mapParams.description).toBe('');

      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('Jingjin:BaseMap_P');
      expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
      done();
      datavizWebmap.map = null;
      datavizWebmap = null;
    }
  });

  it('WMS', (done) => {
    //插件里面i未定义报错
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_WMS;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('GetCapabilities')) {
        return Promise.resolve(new Response(wms_capabilities));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    //
    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      var view = datavizWebmap.map.getView();
      expect(view.getCenter()).toEqual([0, -7.081154551613622e-10]);
      expect(datavizWebmap.mapParams.title).toBe('wms');
      expect(datavizWebmap.mapParams.description).toBe('');
      //

      // expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      // expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('World');
      // expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
      done();
    }
  });

  /*    it('WMTS', (done) => {
            //第二次请求wmts参数值太大
            let options = {
                target:'map',
                server: server,
                errorCallback: function () {},
                callback: function () {}
            };
            let wmtsData ='<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://localhost:9876/iserver/services/map-world/wmts100/wmts,1.0,wmtsGetCapabilities_response.xsd"><<ows:OperationsMetadata><<ows:Operation name="GetCapabilities"></ows:Operation></ows:OperationsMetadata></Capabilities>';
  
            spyOn(FetchRequest, 'get').and.callFake((url) => {
                if (url.indexOf('map.json')>-1) {
                    var mapJson = datavizWebMap_WMTS;
                    return Promise.resolve(new Response(mapJson));
                } else if(url === 'http://localhost:9876/iserver/services/maps/wmts100?') {
                    return Promise.resolve(new Response(wmtsData));
                }
                return Promise.resolve(new Response(JSON.stringify({})));
            });
            spyOn(options, 'callback');
            var datavizWebmap = new WebMap(id, options);
  
            function successCallback() {
                expect(datavizWebmap.server).toBe(server);
                expect(datavizWebmap.errorCallback).toBeDefined();
                expect(datavizWebmap.credentialKey).toBeUndefined();
                expect(datavizWebmap.credentialValue).toBeUndefined();
  
                var view = datavizWebmap.map.getView();
                expect(view.getZoom()).toBe(1);
                expect(view.getCenter()).toEqual([0, 0]);
                expect(datavizWebmap.mapParams.title).toBe('wmts');
                expect(datavizWebmap.mapParams.description).toBe('');
                expect(options.callback).toHaveBeenCalled();
                expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
                expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('World_AirLine_Part');
                expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
                done();
            }
        });*/

  it('createWMTSSource', (done) => {
    let options = {
      server: defaultServer,
      successCallback,
      errorCallback: function () {}
    };

    function successCallback() {
      expect(datavizWebmap.server).toBe(defaultServer);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.mapParams.projection).toBe('EPSG:3857');
      expect(datavizWebmap.map.getLayers().getArray()[1].getSource().getUrls()[0]).toBe(
        'https://fake/iserver/services/map-china400/wmts100?'
      );
      done();
    }
    spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
      return true;
    });
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_WMTS;
        return Promise.resolve(new Response(mapJson));
      } else if (
        url.indexOf('iserver/services/maps/wmts100?&SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities') > -1
      ) {
        return Promise.resolve(new Response(wmtsInfo2));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);
  });

  it('createWMTSSource1', (done) => {
    //第二次请求wmts参数值太大
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_WMTS;
        return Promise.resolve(new Response(mapJson));
      } else if (url.includes('/iserver/services/maps/wmts100?')) {
        return Promise.resolve(new Response(wmtsInfo2));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { server: defaultServer });
    var layerInfo = JSON.parse(wmtsInfo1);
    datavizWebmap.baseProjection = 'EPSG:4326';
    datavizWebmap.createWMTSSource(layerInfo);

    setTimeout(() => {
      expect(datavizWebmap.server).toBe(defaultServer);
      done();
    }, 0);
  });

  it('changeWeight', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_WMTS;
        return Promise.resolve(new Response(mapJson));
      } else if (url.includes('/iserver/services/maps/wmts100?')) {
        return Promise.resolve(new Response(wmtsInfo2));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { server: defaultServer });
    var features = [];
    var feature = new Feature();
    feature.setProperties({
      field: '10'
    });
    features.push(feature);
    setTimeout(() => {
      datavizWebmap.fieldMaxValue = {
        field: 10
      };
      datavizWebmap.changeWeight(features, 'field');
      // expect(feature.get('weight')).toBe(1);
      done();
    }, 0);
  });

  it('createBaseLayer-wmts', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_WMTS;
        return Promise.resolve(new Response(mapJson));
      } else if (url.includes('/iserver/services/maps/wmts100?')) {
        return Promise.resolve(new Response(wmtsInfo2));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { successCallback, errorCallback, server: defaultServer });
    function successCallback() {}
    setTimeout(() => {
      var layerInfo = {
        layerType: 'WMTS',
        zIndex: 1,
        visible: true,
        projection: 'EPSG:4326',
        tileMatrixSet: 'c'
      };
      spyOn(datavizWebmap, 'createWMTSSource');
      datavizWebmap.createBaseLayer(layerInfo);
      expect(datavizWebmap.createWMTSSource).toHaveBeenCalled();
      done();
    }, 0);
    function errorCallback(error) {
      console.log(error);
    }
  });

  it('getWmtsInfo', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      let requestUrl = `https://www.supermapol.com/apps/viewer/getUrlResource.json?url=${encodeURIComponent(
        `${defaultServeRequest}.json`
      )}`;
      if (url === requestUrl) {
        var mapJson = datavizWebMap_WMTS;
        return Promise.resolve(new Response(mapJson));
      } else if (url.includes('/iserver/services/maps/wmts100?')) {
        return Promise.resolve(new Response(wmtsInfo2));
      } else {
        let wmtsData =
          '<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://localhost:9876/iserver/services/map-world/wmts100/wmts,1.0,wmtsGetCapabilities_response.xsd"><<ows:OperationsMetadata><<ows:Operation name="GetCapabilities"></ows:Operation></ows:OperationsMetadata></Capabilities>';
        return Promise.resolve(new Response(wmtsData));
      }
    });
    var datavizWebmap = new WebMap(id, { server: defaultServer });
    spyOn(datavizWebmap, 'isValidResponse').and.callFake(() => {
      return true;
    });
    setTimeout(() => {
      var layerInfo = {
        url: 'http://localhost:9876/iserver/services/maps/wmts100'
      };
      const successCallback = function () {};
      datavizWebmap.getWmtsInfo(layerInfo, successCallback);
      expect(datavizWebmap.isValidResponse).toHaveBeenCalled();
      done();
    }, 1000);
  });

  it('isValidResponse', (done) => {
    var datavizWebmap = new WebMap(id, { webMap: JSON.parse(datavizWebMap_BAIDU), successCallback });
    function successCallback() {
      var response = {};
      expect(datavizWebmap.isValidResponse(response)).toBe(false);
      done();
    }
  });

  it('getReslutionsFromScales', (done) => {
    var datavizWebmap = new WebMap({ webMap: JSON.parse(datavizWebMap_BAIDU), successCallback });
    function successCallback() {
      var scales = {
        TileMatrix: [
          {
            Identifier: ''
          }
        ]
      };
      expect(datavizWebmap.getReslutionsFromScales(scales, 96, 'degrees', 1000)).toBeDefined();
      done();
    }
  });

  it('getRangeStyleGroup', (done) => {
    let webMapObj = JSON.parse(datavizWebMap_BAIDU);
    var datavizWebmap = new WebMap({ webMap: webMapObj, successCallback });
    function successCallback() {
      var params =
        '{"layerType":"RANGE","visible":true,"themeSetting":{"themeField":"field","customSettings":{"0":{"color":"#bd10e0","segment":{"start":1, "end": 10}}},"segmentMethod":"square","segmentCount":6,"colors":["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"]},"name":"上海市可校外学习中心","featureType":"POINT","xyField":{"xField":"经度","yField":"纬度"},"style":{"strokeWidth":1,"fillColor":"#99D594","fillOpacity":0.9,"radius":5,"strokeColor":"#ffffff","type":"BASIC_POINT","strokeOpacity":1},"projection":"EPSG:4326","dataSource":{"type":"PORTAL_DATA","serverId":"1132407305"}}';
      var features = [];
      var feature = new Feature();
      feature.set('Properties', {
        field: 10
      });
      features.push(feature);
      spyOn(ArrayStatistic, 'getArraySegments').and.callFake(() => {
        return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
      });
      datavizWebmap.getRangeStyleGroup(JSON.parse(params), features);
      expect(ArrayStatistic.getArraySegments).toHaveBeenCalled();
      done();
    }
  });

  it('getRangeStyleGroup1', (done) => {
    spyOn(ArrayStatistic, 'getArraySegments').and.callFake(() => {
      return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
    });
    let webMapObj = JSON.parse(datavizWebMap_BAIDU);
    var datavizWebmap = new WebMap({ webMap: webMapObj, successCallback });
    function successCallback() {
      var params =
        '{"layerType":"RANGE","visible":true,"themeSetting":{"themeField":"field","customSettings":{"0":{"color":"#bd10e0","segment":{"start":1, "end": 10}}},"segmentMethod":"square","segmentCount":6,"colors":["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"]},"name":"上海市可校外学习中心","featureType":"POINT","xyField":{"xField":"经度","yField":"纬度"},"style":{"strokeWidth":1,"fillColor":"#99D594","fillOpacity":0.9,"radius":5,"strokeColor":"#ffffff","type":"BASIC_POINT","strokeOpacity":1},"projection":"EPSG:4326","dataSource":{"type":"PORTAL_DATA","serverId":"1132407305"}}';
      var features = [];
      var feature = new Feature();
      feature.set('field', 10);
      features.push(feature);
      datavizWebmap.getRangeStyleGroup(JSON.parse(params), features);
      expect(ArrayStatistic.getArraySegments).toHaveBeenCalled();
      done();
    }
  });

  it('refresh', (done) => {
    let refresh = false;
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = refresh ? datavizWebMap_BAIDU : datavizWebMap_TIANDITU_VEC;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, {
      server: server,
      successCallback: callback
    });

    function callback() {
      if (!refresh) {
        expect(datavizWebmap.baseLayer.name).toEqual('天地图');
        refresh = true;
        datavizWebmap.refresh();
      } else {
        expect(datavizWebmap.baseLayer.name).toEqual('百度地图');
        done();
      }
    }
  });
  it('webMapUrl', (done) => {
    let options = {
      server: server,
      webMap: defaultServeRequest,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_BAIDU;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      expect(datavizWebmap.mapParams.title).toBe('百度');
      expect(datavizWebmap.mapParams.description).toBe('');

      done();
    }
  });
  it('webMapObject', (done) => {
    let options = {
      server: server,
      webMap: JSON.parse(datavizWebMap_BAIDU),
      successCallback,
      errorCallback: function () {}
    };

    var datavizWebmap = new WebMap(options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();

      done();
    }
  });

  it('getScales EPSG:1', (done) => {
    //第二次请求wmts参数值太大
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_WMTS;
        return Promise.resolve(new Response(mapJson));
      } else if (url.includes('/iserver/services/maps/wmts100?')) {
        return Promise.resolve(new Response(wmtsInfo2));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    let proj = new olProj.Projection({
      units: '',
      code: 'EPSG:1'
    });
    olProj.addProjection(proj);
    var datavizWebmap = new WebMap(id, { server: defaultServer });
    var layerInfo = JSON.parse(wmtsInfo);
    datavizWebmap.baseProjection = 'EPSG:1';
    datavizWebmap.getScales({ ...layerInfo, projection: 'EPSG:1' });

    setTimeout(() => {
      expect(datavizWebmap.scales[0]).toBe('1:65789415978977.37');
      done();
    }, 0);
  });
  it('getScales EPSG:3857', (done) => {
    //第二次请求wmts参数值太大
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_WMTS;
        return Promise.resolve(new Response(mapJson));
      } else if (url.includes('/iserver/services/maps/wmts100?')) {
        return Promise.resolve(new Response(wmtsInfo2));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    let proj = new olProj.Projection({
      units: '',
      code: 'EPSG:1'
    });
    olProj.addProjection(proj);
    var datavizWebmap = new WebMap(id, { server: defaultServer });
    var layerInfo = JSON.parse(wmtsInfo);
    datavizWebmap.baseProjection = 'EPSG:3857';
    datavizWebmap.getScales({ ...layerInfo, projection: 'EPSG:1' });

    setTimeout(() => {
      expect(datavizWebmap.scales[0]).toBe('1:591658710.9091312');
      done();
    }, 0);
  });
  it('svg canvg', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_SVG;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('content.json') > -1) {
        return Promise.resolve(new Response(markerData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);
    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      datavizWebmap.stop;
      done();
    }
  });

  it('vector_svg', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_SVG1;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('content.json') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { server, successCallback });
    function successCallback() {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      done();
    }
  });

  it('vector_svg refresh', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_SVG1;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('content.json') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { server, successCallback });
    let count = 1;
    function successCallback() {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      if (count === 1) {
        datavizWebmap.refresh();
      }
      count === 2 && done();
      count += 1;
    }
  });

  it('server is end of iportal', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_SVG1;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('content.json') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { server: server.slice(0, -1), successCallback });

    function successCallback() {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      done();
    }
  });

  it('specify webmap url', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_SVG1;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('content.json') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { webMap: `${server}web/maps/${id}/map`, successCallback });
    function successCallback() {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      done();
    }
  });

  it('get mapInfo error', (done) => {
    var mapJsonData = JSON.parse(datavizWebMap_SVG1);
    mapJsonData.succeed = false;
    mapJsonData.error = 'sorry';
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('content.json') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { webMap: mapJsonData, errorCallback });
    function errorCallback(error, type) {
      expect(error).toBe(mapJsonData.error);
      expect(type).toBe('getMapFaild');
      done();
    }
  });

  it('center empty', (done) => {
    var mapJsonData = JSON.parse(datavizWebMap_SVG1);
    mapJsonData.center = [];
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('content.json') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { webMap: mapJsonData, successCallback });
    function successCallback() {
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      done();
    }
  });

  it('layer auto refrsh', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    let wmtsData =
      '<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://localhost:9876/iserver/services/map-world/wmts100/wmts,1.0,wmtsGetCapabilities_response.xsd"><<ows:OperationsMetadata><<ows:Operation name="GetCapabilities"></ows:Operation></ows:OperationsMetadata></Capabilities>';
    // let requestUrl = `${proxy}${encodeURIComponent('http://localhost:9876/iserver/services/map-world/wms130/World?MAP=World&&SERVICE=WMS&REQUEST=GetCapabilities')}`
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = wmsAutoUpdate;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('GetCapabilities')) {
        return Promise.resolve(new Response(wmtsData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);
    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      done();
    }
  });

  it('getMapInfoSuccess -1000', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_RestMap_1000;
        return Promise.resolve(new Response(JSON.stringify(mapJson)));
      }
      if (url.indexOf('prjCoordSys.wkt') > -1) {
        return Promise.resolve(
          new Response(
            'PROJCS["Xian 1980 / 3-degree Gauss-Kruger zone 38",GEOGCS["Xian 1980",DATUM["Xian_1980",SPHEROID["IAG 1975",6378140,298.257,AUTHORITY["EPSG","7049"]],AUTHORITY["EPSG","6610"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4610"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",114],PARAMETER["scale_factor",1],PARAMETER["false_easting",38500000],PARAMETER["false_northing",0],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AUTHORITY["EPSG","2362"]]'
          )
        );
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.mapParams.projection).toBe('EPSG:-1000');
      done();
    }
  });
  xit('getMapInfoSuccess BrowseMap', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
      return true;
    });
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_RestMap_2362;
        return Promise.resolve(new Response(JSON.stringify(mapJson)));
      }
      if (url.indexOf('prjCoordSys.wkt') > -1) {
        return Promise.resolve(
          new Response(
            'PROJCS["Xian 1980 / 3-degree Gauss-Kruger zone 38",GEOGCS["Xian 1980",DATUM["Xian_1980",SPHEROID["IAG 1975",6378140,298.257,AUTHORITY["EPSG","7049"]],AUTHORITY["EPSG","6610"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4610"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",114],PARAMETER["scale_factor",1],PARAMETER["false_easting",38500000],PARAMETER["false_northing",0],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AUTHORITY["EPSG","2362"]]'
          )
        );
      }
      if (url.indexOf('https://fake/iserver/services/map-100/rest/maps/map-100') > -1) {
        return Promise.resolve(new Response(mapInfo_1));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.baseProjection.getCode()).toBe('EPSG:0');
      done();
    }
  });

  xit('initialize_MVT', (done) => {
    window.olmsbak = window.olms;
    window.olms = {
      applyBackground: function () {},
      stylefunction: function () {
        return function () {};
      }
    };
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
      return true;
    });
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(datavizWebMap_MVT)));
      }
      if (url.indexOf('vectorstyles.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(vectorTile_style)));
      }
      if (url.indexOf('http://fake/iserver/services/map-China100/rest/maps/China.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(mapInfo2)));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      window.olms = window.olmsbak;
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.map.getLayers().getArray()[0] instanceof olLayer.VectorTile).toBeTrue();
      done();
    }
  });

  it('createThemeLayer_RANK_SYMBOL', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
      return true;
    });
    spyOn(ArrayStatistic, 'getArraySegments').and.callFake(() => {
      return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
    });
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_RANK_SYMBOL;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('web/datas/1236941499/content.json') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('省级政府');
      expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
      done();
    }
  });
  it('createLayer_geojson', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
      return true;
    });
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_geojson;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('marker.geojson') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
      expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('北京市轨道');
      expect(datavizWebmap.map.getLayers().getArray()[1].getSource().getFeatures().length).toBe(1);
      expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
      done();
    }
  });
  it('createLayer_migration', (done) => {
    let add = false;
    class ol3Echarts extends obj {
      appendTo() {
        add = true;
        return true;
      }
    }
    window.ol3Echarts = ol3Echarts;
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
      return true;
    });
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = migrationLayer;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('1184572358') > -1) {
        return Promise.resolve(new Response(csvData_migration));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);

    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      expect(datavizWebmap.errorCallback).toBeDefined();
      expect(datavizWebmap.credentialKey).toBeUndefined();
      expect(datavizWebmap.credentialValue).toBeUndefined();
      expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('中国暗色地图');
      expect(add).toBeTrue();
      done();
    }
  });

  it('createBaseLayer-SUPERMAP_REST-token', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url, params, options) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_RestMap_token;
        return Promise.resolve(new Response(mapJson));
      } else if (url.indexOf('content.json') > -1) {
        expect(url.indexOf('testtoken')).toBe(-1);
        return Promise.resolve(new Response(geojsonData));
      } else {
        expect(url.indexOf('testtoken')).not.toBe(-1);
        return Promise.resolve();
      }
    });
    var datavizWebmap = new WebMap(id, { successCallback, errorCallback, server: defaultServer });
    function successCallback(map, mapInfo, layers, baseLayer) {
      expect(baseLayer.credential).toEqual({ token: 'testtoken' });
      done();
    }
    function errorCallback(error) {
      console.log(error);
    }
  });
  it('administrativeInfoMap', (done) => {
    window.MunicipalData = {
      features: [
        {
          geometry: {
            coordinates: [
              [
                [
                  [113.5872766800001, 22.16493972869857],
                  [113.5980630750001, 22.13509586869991]
                ]
              ],
              [
                [
                  [113.5511133950001, 22.21679186869615],
                  [113.5623058550001, 22.1994578386969]
                ]
              ]
            ],
            type: 'MultiPolygon'
          },
          properties: { Name: '哈尔滨市', UserID: 0 },
          type: 'Feature'
        }
      ]
    };
    spyOn(FetchRequest, 'get').and.callFake((url, params, options) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = administrativeInfoMap;
        return Promise.resolve(new Response(JSON.stringify(mapJson)));
      } else if (url.indexOf('650203') > -1) {
        return Promise.resolve(new Response(JSON.stringify(csv_city_nogeo)));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { successCallback, errorCallback, server });
    function successCallback(map, mapInfo, layers, baseLayer) {
      expect(map.getLayers().getArray()[1].getSource().getFeatures()[0].get('attributes')['Name']).toBe('哈尔滨');
      expect(map.getLayers().getArray()[1].getSource().getFeatures()[0].getGeometry()).not.toBeNull();
      done();
    }
    function errorCallback(error) {
      console.log(error);
    }
  });
  it('administrativeInfoMap_Nowindow.MunicipalData', (done) => {
    window.MunicipalData = undefined;
    const MunicipalData = {
      features: [
        {
          geometry: {
            coordinates: [
              [
                [
                  [113.5872766800001, 22.16493972869857],
                  [113.5980630750001, 22.13509586869991]
                ]
              ],
              [
                [
                  [113.5511133950001, 22.21679186869615],
                  [113.5623058550001, 22.1994578386969]
                ]
              ]
            ],
            type: 'MultiPolygon'
          },
          properties: { Name: '哈尔滨市', UserID: 0 },
          type: 'Feature'
        }
      ]
    };
    spyOn(FetchRequest, 'get').and.callFake((url, params, options) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = administrativeInfoMap;
        return Promise.resolve(new Response(JSON.stringify(mapJson)));
      } else if (url.indexOf('650203') > -1) {
        return Promise.resolve(new Response(JSON.stringify(csv_city_nogeo)));
      } else if (url.indexOf('MunicipalData.js') > -1) {
        return Promise.resolve(new Response(`window.MunicipalData=${JSON.stringify(MunicipalData)}`));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { successCallback, errorCallback, server });
    function successCallback(map, mapInfo, layers, baseLayer) {
      expect(map.getLayers().getArray()[1].getSource().getFeatures()[0].get('attributes')['Name']).toBe('哈尔滨');
      expect(map.getLayers().getArray()[1].getSource().getFeatures()[0].getGeometry()).not.toBeNull();
      done();
    }
    function errorCallback(error) {
      console.log(error);
    }
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
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    spyOn(FetchRequest, 'post').and.callFake((url) => {
      if (url.indexOf('queryResults') > -1) {
        return Promise.resolve(new Response(supermapRestData));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { successCallback, errorCallback, server: defaultServer });
    function successCallback(map, mapInfo, layers, baseLayer) {
      expect(map.getLayers().getArray()[1].getSource().graphics[0].getGeometry().getCoordinates()[0]).toBeCloseTo(
        12961495.051608399,
        0.00001
      );
      done();
    }
    function errorCallback(error) {
      console.log(error);
    }
  });
  it('graticuleLayer', (done) => {
    window.geostats = class {
        setSerie() {}
        getClassEqInterval() {
            return [];
          }
    };
    spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
        return true;
      });
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1171594968/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(rangeLayer)));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { successCallback, errorCallback, server: defaultServer });
    function successCallback(map, mapInfo, layers, baseLayer) {
      expect(map.getLayers().getArray()[1].get('layerID')).toBe('graticule_layer');
      done();
    }
    function errorCallback(error) {
      console.log(error);
    }
  });
  it('add dataflow and update', (done) => {
    var urlDataFlow = 'ws://localhost:8004/dataflow';
    var urlDataFlow1 = 'ws://localhost:8004/dataflow/broadcast';
    var urlDataFlow2 = 'ws://localhost:8004/dataflow/subscribe';
    var mockServer = new Server(urlDataFlow);
    var mockServer1 = new Server(urlDataFlow1);
    var mockServer2 = new Server(urlDataFlow2);
    mockServer.on('connection', (socket) => {
      socket.on('close', () => {});
    });
    let socket2;
    mockServer1.on('connection', (socket) => {
      socket.on('message', (e) => {
        socket2 && socket2.send(e);
      });
      socket.on('close', () => {});
    });
    mockServer2.on('connection', (socket) => {
      socket2 = socket;
    });
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/676516522/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('dataflow.json') > -1) {
        const dataflowLayerDataCopy = JSON.parse(JSON.stringify(dataflowLayerData));
        dataflowLayerDataCopy.dataflow.urls[0].url = urlDataFlow;
        return Promise.resolve(new Response(JSON.stringify(dataflowLayerDataCopy.dataflow)));
      } else if (url.indexOf('broadcast') > -1) {
        return Promise.resolve(new Response(JSON.stringify(dataflowLayerData.broadcast)));
      } else if (url.indexOf('subscribe') > -1) {
        return Promise.resolve(new Response(JSON.stringify(dataflowLayerData.subscribe)));
      } else if (url.indexOf('map.json') > -1) {
        const dataflowLayerCopy = JSON.parse(JSON.stringify(dataflowLayer));
        dataflowLayerCopy.layers[0].url = urlDataFlow;
        dataflowLayerCopy.layers[1].url = urlDataFlow;
        dataflowLayerCopy.layers[2].url = urlDataFlow;
        dataflowLayerCopy.layers[3].url = urlDataFlow;
        return Promise.resolve(new Response(JSON.stringify(dataflowLayerCopy)));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, { successCallback, errorCallback, server: defaultServer });
    function successCallback(map, mapInfo, layers, baseLayer) {
      expect(map.getLayers().getArray().length).toBe(7);
      mockServer.stop();
      mockServer1.stop();
      mockServer2.stop();
      done();
    }
    function errorCallback(error) {
      console.log(error);
    }
  });

  it('tileTransformRequest', (done) => {
    const mapJSONObj = JSON.parse(datavizWebmap_ZXYTILE);
    mapJSONObj.layers = [
      {
        layerType: 'WMTS',
        name: 'World_AirLine_Part',
        visible: true,
        url: 'http://localhost:9876/iserver/services/maps/wmts100?',
        projection: 'EPSG:3857',
        tileMatrixSet: 'Custom_China'
      },
      {
        layerType: 'WMS',
        layers: ['0'],
        name: 'World',
        visible: true,
        url: 'http://localhost:9876/iserver/services/map-world/wms130/World?MAP=World&',
        projection: 'EPSG:3857'
      },
      {
        layerType: 'MAPBOXSTYLE',
        visible: true,
        name: 'China',
        dataSource: {
          type: 'EXTERNAL',
          url: 'http://localhost:8090/iserver/services/map-China100/restjsr/v1/vectortile/maps/China'
        }
      },
      {
        layerType: 'MARKER',
        name: '未命名标注图层1',
        visible: true,
        projection: 'EPSG:4326',
        dataSource: {
          type: 'PORTAL_DATA',
          serverId: '699444680'
        }
      }
    ];
    const tileCustomRequestHeaders = { Authorization: 'test token' };
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {},
      tileRequestParameters: function (url) {
        if (url && url.includes('tianditu.gov.cn')) {
          return;
        }
        return { headers: tileCustomRequestHeaders };
      }
    };
    spyOn(FetchRequest, 'get').and.callFake((fetchUrl) => {
      const url = decodeURIComponent(fetchUrl);
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(mapJSONObj)));
      }
      if (url.indexOf('/wmts100') > -1) {
        return Promise.resolve(new Response(wmtsInfo2));
      }
      if (url.indexOf('/wms130') > -1) {
        return Promise.resolve(new Response(wms_capabilities));
      }
      if (url.indexOf('content.json') > -1) {
        return Promise.resolve(new Response(geojsonData));
      }
      if (url.indexOf('style.json') > -1) {
        const styleJsonData = {
          center: [-6.692970425781022e-14, -2.289999370653732e-13],
          layers: [
            {
              paint: {
                'background-color': 'rgba(255,255,255,1.00)'
              },
              id: 'background',
              type: 'background'
            },
            {
              layout: {
                visibility: 'visible'
              },
              filter: ['all', ['==', '$type', 'Polygon']],
              metadata: {
                'layer:caption': 'World_Division_pg@China_L1-L13',
                'layer:name': 'World_Division_pl@China'
              },
              maxzoom: 24,
              paint: {
                'fill-color': 'rgba(145,185,234,1.00)',
                'fill-antialias': true
              },
              id: 'World_Division_pl@China(0_24)',
              source: 'China',
              'source-layer': 'World_Division_pg@China',
              type: 'fill',
              minzoom: 0
            }
          ],
          sources: {
            China: {
              tiles: [
                'http://localhost:8195/portalproxy/2b6651326d8ad1ff/iserver/services/map-China100/restjsr/v1/vectortile/maps/China/tiles/{z}/{x}/{y}.mvt'
              ],
              bounds: [-180, -90, 180, 90],
              type: 'vector'
            }
          },
          version: 8,
          zoom: 0
        };
        return Promise.resolve(new Response(JSON.stringify(styleJsonData)));
      }
      if (url.indexOf('China.json') > -1) {
        return Promise.resolve(
          new Response(
            `{"viewBounds":{"top":1.0018754171380693E7,"left":-1.0018754171380727E7,"bottom":-1.0018754171380745E7,"leftBottom":{"x":-1.0018754171380727E7,"y":-1.0018754171380745E7},"right":1.0018754171380712E7,"rightTop":{"x":1.0018754171380712E7,"y":1.0018754171380693E7}},"viewer":{"leftTop":{"x":0,"y":0},"top":0,"left":0,"bottom":256,"rightBottom":{"x":256,"y":256},"width":256,"right":256,"height":256},"distanceUnit":"METER","minVisibleTextSize":0.1,"coordUnit":"METER","scale":3.3803271432100002E-9,"description":"","paintBackground":true,"maxVisibleTextSize":1000,"maxVisibleVertex":3600000,"clipRegionEnabled":false,"antialias":true,"textOrientationFixed":false,"angle":0,"prjCoordSys":{"distanceUnit":"METER","projectionParam":{"centralParallel":0,"firstPointLongitude":0,"rectifiedAngle":0,"scaleFactor":1,"falseNorthing":0,"centralMeridian":0,"secondStandardParallel":0,"secondPointLongitude":0,"azimuth":0,"falseEasting":0,"firstStandardParallel":0},"epsgCode":3857,"coordUnit":"METER","name":"User Define","projection":{"name":"SPHERE_MERCATOR","type":"PRJ_SPHERE_MERCATOR"},"type":"PCS_USER_DEFINED","coordSystem":{"datum":{"name":"D_WGS_1984","type":"DATUM_WGS_1984","spheroid":{"flatten":0.00335281066474748,"name":"WGS_1984","axis":6378137,"type":"SPHEROID_WGS_1984"}},"unit":"DEGREE","spatialRefType":"SPATIALREF_EARTH_LONGITUDE_LATITUDE","name":"GCS_WGS_1984","type":"GCS_WGS_1984","primeMeridian":{"longitudeValue":0,"name":"Greenwich","type":"PRIMEMERIDIAN_GREENWICH"}}},"minScale":0,"markerAngleFixed":false,"overlapDisplayedOptions":{"allowPointWithTextDisplay":true,"horizontalOverlappedSpaceSize":0,"allowPointOverlap":false,"allowThemeGraduatedSymbolOverlap":false,"verticalOverlappedSpaceSize":0,"allowTextOverlap":false,"allowThemeGraphOverlap":false,"allowTextAndPointOverlap":false},"visibleScales":[1.6901635716026555E-9,3.3803271432053056E-9,6.760654286410611E-9,1.3521308572821242E-8,2.7042617145642484E-8,5.408523429128511E-8,1.0817046858256998E-7,2.1634093716513974E-7,4.3268187433028044E-7,8.653637486605571E-7,1.7307274973211203E-6,3.4614549946422405E-6,6.9229099892844565E-6],"visibleScalesEnabled":true,"customEntireBoundsEnabled":false,"clipRegion":{"center":null,"parts":null,"style":null,"prjCoordSys":null,"id":0,"type":"REGION","partTopo":null,"points":null},"maxScale":1.0E12,"customParams":"","center":{"x":-7.450580596923828E-9,"y":-2.60770320892334E-8},"dynamicPrjCoordSyses":[{"distanceUnit":null,"projectionParam":null,"epsgCode":0,"coordUnit":null,"name":null,"projection":null,"type":"PCS_ALL","coordSystem":null}],"colorMode":"DEFAULT","textAngleFixed":false,"overlapDisplayed":false,"userToken":{"userID":""},"cacheEnabled":true,"dynamicProjection":false,"autoAvoidEffectEnabled":true,"customEntireBounds":null,"name":"China","bounds":{"top":2.0037508342789087E7,"left":-2.0037508342789248E7,"bottom":-2.003750834278914E7,"leftBottom":{"x":-2.0037508342789248E7,"y":-2.003750834278914E7},"right":2.0037508342789244E7,"rightTop":{"x":2.0037508342789244E7,"y":2.0037508342789087E7}},"backgroundStyle":{"fillGradientOffsetRatioX":0,"markerSize":2.4,"fillForeColor":{"red":255,"green":255,"blue":255,"alpha":255},"fillGradientOffsetRatioY":0,"markerWidth":0,"markerAngle":0,"fillSymbolID":0,"lineColor":{"red":0,"green":0,"blue":0,"alpha":255},"markerSymbolID":0,"lineWidth":0.1,"markerHeight":0,"fillOpaqueRate":100,"fillBackOpaque":true,"fillBackColor":{"red":255,"green":255,"blue":255,"alpha":255},"fillGradientMode":"NONE","lineSymbolID":0,"fillGradientAngle":0}}`
          )
        );
      }
      if (url.indexOf('error.png') > -1) {
        return Promise.reject('error');
      }
      return Promise.resolve(new Response(JSON.stringify(new Blob([], { type: 'application/x-www-form-urlencoded' }))));
    });
    window.olmsbak = window.olms;
    window.olms = {
      applyBackground: function () {},
      stylefunction: function () {
        return function () {};
      }
    };
    var datavizWebmap = new WebMap(id, options);
    function successCallback() {
      const imageUrl = 'blob:fakeimage';
      spyOn(URL, 'createObjectURL').and.callFake(() => {
        return imageUrl;
      });
      window.olms = window.olmsbak;
      const layers = datavizWebmap.map.getLayers().getArray();
      expect(layers.length).toBe(mapJSONObj.layers.length + 1);
      expect(layers[1].getSource().tileLoadFunction).not.toBeUndefined();
      const fakeImage = {
        src: ''
      };
      const imageTile = {
        getImage: function () {
          return fakeImage;
        },
        setState: jasmine.createSpy('setState')
      };
      layers[1].getSource().tileLoadFunction(imageTile, 'http://scuccess.png');
      setTimeout(() => {
        expect(fakeImage.src).toBe(imageUrl);
        expect(imageTile.setState).not.toHaveBeenCalled();
        const tdtImage = 'http://tianditu.gov.cn/success.png';
        layers[1].getSource().tileLoadFunction(imageTile, tdtImage);
        setTimeout(() => {
          expect(fakeImage.src).toContain(tdtImage);
          fakeImage.src = '';
          expect(imageTile.setState).not.toHaveBeenCalled();
          layers[1].getSource().tileLoadFunction(imageTile, 'http://error.png');
          setTimeout(() => {
            expect(fakeImage.src).toBe('');
            expect(imageTile.setState).toHaveBeenCalledWith('error');
            done();
          }, 500);
        }, 500);
      }, 500);
    }
  });
  it('datavizWebMap_noServerIdMarker', (done) => {
    let options = {
      server: server,
      webMap: defaultServeRequest,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_noServerIdMarker;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(options);
    function successCallback() {
      expect(datavizWebmap.server).toBe(server);
      done();
    }
  });

  it('fix csv property length over title length', (done) => {
    window.cloneDeep = function (feature) {
      return cloneDeep(feature);
    };
    let options = {
      server: server,
      webMap: defaultServeRequest,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebMap_noServerIdMarker;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(options);
    function successCallback() {
      const features = [
        {
          geometry: {
            coordinates: [
              [
                [117.9612792600001, 31.50179038417261],
                [117.6538350116667, 31.36421118000805],
                [117.5036929400001, 31.00564246918011],
                [117.2036532125, 31.06033994834594],
                [117.0296223400001, 31.2610837141762],
                [117.1815134989584, 31.55480553729684],
                [116.7638726916668, 31.61569306000427],
                [116.7663789980209, 31.90478239979175],
                [117.0149495701043, 32.09548291728905],
                [116.9956159214584, 32.11601320312207],
                [117.0107175175001, 32.16395522082976],
                [117.00395803, 32.39582160415978],
                [117.1965708000001, 32.53416217415796],
                [117.3470498758334, 32.45553657999236],
                [117.3796553844792, 32.43855426426338],
                [117.4034777350001, 32.38868854999331],
                [117.3973120916668, 32.29735015499454],
                [117.5562772865626, 32.22039671520397],
                [117.8666145383334, 32.13696457999682],
                [117.8979449009376, 31.93163098958303],
                [117.9540050100001, 31.90536486416671],
                [117.9612792600001, 31.50179038417261]
              ]
            ],
            type: 'Polygon'
          },
          properties: {
            Name: '合肥市',
            PAC: 340102,
            UserID: 0,
            Province: '安徽省'
          },
          type: 'Feature'
        },
        {
          geometry: {
            coordinates: [
              [
                [116.9620359318751, 30.63692908460247],
                [116.9626803625001, 30.63792411335244],
                [116.9636623712501, 30.63948495199823],
                [116.9647166275001, 30.64103160251904],
                [116.9655092789584, 30.64199830803986],
                [116.9661609391667, 30.64248322168568],
                [116.9668600346876, 30.64271652616482],
                [116.9676117783334, 30.64279261251899],
                [116.9683829830209, 30.64278320543566],
                [116.9691700758334, 30.64280515585233]
              ]
            ],
            type: 'Polygon'
          },
          properties: {
            Name: '安庆市',
            PAC: 340823,
            UserID: 0,
            Province: '安徽省'
          },
          type: 'Feature'
        }
      ];
      const datas = [
        ['SmUserID', 'NAME', 'CODE', 'PROVINCE', 'Geometry'],
        [
          '0',
          '安庆市',
          '130100',
          'HEBEI',
          'POLYGON ((113.8395751199999495 38.7583869546093496',
          '113.8408729199999811 38.7573249546098353',
          '113.8452159599999476 38.7550289646109007',
          '113.8183570799999416 38.7584829846093086',
          '113.8292251199999754 38.7564389946102565',
          '113.8395751199999495 38.7583869546093496))'
        ],
        [
          '1',
          '合肥市',
          '130100',
          'HEBEI',
          'POLYGON ((113.8395751199999495 38.7583869546093496',
          '113.8408729199999811 38.7573249546098353',
          '113.8452159599999476 38.7550289646109007',
          '113.8183570799999416 38.7584829846093086',
          '113.8292251199999754 38.7564389946102565',
          '113.8395751199999495 38.7583869546093496))'
        ]
      ];
      const divisionType = 'City';
      const divisionField = 'NAME';
      const geojson = datavizWebmap.changeExcel2Geojson(features, datas, divisionType, divisionField);
      expect(geojson.features.length).toBe(2);
      expect(geojson.features[0].properties.hasOwnProperty(undefined)).toBeFalse();
      done();
    }
  });

  it('datavizWebMap_isCredentail_isAddProxy', (done) => {
    const serviceProxy = {
        "httpConnPoolInfo": null,
        "enableAccessStatistics": true,
        "scheme": null,
        "enableBuiltinProxy": true,
        "port": 8195,
        "proxyServerRootUrl": "http://127.0.0.1:8195/portalproxy",
        "rootUrlPostfix": "portalproxy",
        "enable": true,
        "httpsSetting": null,
        "cacheConfig": null
    };
    var datavizWebmap = new WebMap(id, { webMap: JSON.parse(datavizWebMap_BAIDU), successCallback, serviceProxy: serviceProxy });
    function successCallback() {
      const url = 'http://127.0.0.1:8195/portalproxy/11111/iserver/services/map-Population/rest/maps/PopulationDistribution/tileImage'
      const withCredential = datavizWebmap.isCredentail(url, false);
      const isProxy = datavizWebmap.isAddProxy(url, false);
      expect(withCredential).toBeTruthy();
      expect(isProxy).toBeFalse();
      done();
    }
  });
});
