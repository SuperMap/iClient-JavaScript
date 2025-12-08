import { WebMap } from '../../../src/openlayers/mapping/WebMap.js';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { Util as CommonUtil } from '../../../src/common/commontypes/Util';
import '../../resources/WebMapV5.js';
import { ArrayStatistic } from '../../../src/common/util/ArrayStatistic';
import { Util } from '../../../src/openlayers/core/Util.js';
import { StyleUtils } from '../../../src/openlayers/core/StyleUtils.js';
import { DataFlowService } from '../../../src/openlayers/services/index.js';
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
  const originCookie = window.document.cookie;
  const originalNavigator = window.navigator;
  var id = 1788054202;
  let cookieValue;
  const datsets = [
    {
      name: 'test',
      type: 'POINT'
    }
  ];
  const result1 = {
    fileId: 'test',
    datasetName: 'test',
    dataItemServices: [
      {
        serviceType: 'RESTMAP',
        accessCount: 0,
        address: 'http://fack:8090/iserver/services/map_sichuan-7-/rest',
        dataID: 1386367586,
        createTime: null,
        serviceStatus: 'PUBLISHED',
        editable: false,
        updateTime: null,
        serviceNode: '2e7t6p3r',
        serviceID: 'map_sichuan-7-',
        serviceName: 'map_sichuan-7-'
      },
      {
        serviceType: 'RESTDATA',
        accessCount: 0,
        address: 'http://fack:8090/iserver/services/data_sichuan-7-/rest',
        dataID: 1386367586,
        createTime: null,
        serviceStatus: 'PUBLISHED',
        editable: true,
        updateTime: null,
        serviceNode: '2e7t6p3r',
        serviceID: 'data_sichuan-7-',
        serviceName: 'data_sichuan-7-'
      }
    ]
  };
  const mapsInfo = [
    {
      resourceConfigID: 'map',
      supportedMediaTypes: ['application/json'],
      path: 'http://fack:8090/iserver/services/map_sichuan-7-/rest/maps/test',
      name: 'test',
      resourceType: 'StaticResource'
    }
  ];
  const mapInfo = {
    prjCoordSys: {
      distanceUnit: 'METER',
      epsgCode: 4326,
      coordUnit: 'DEGREE',
      type: 'PCS_EARTH_LONGITUDE_LATITUDE'
    },
    visibleScales: [],
    dpi: 96,
    scale: 5.080888406217531e-7,
    maxScale: 1.000000000000032e12,
    center: {
      x: 116.84538255155,
      y: 39.7881922283
    },
    bounds: {
      top: 42.31307532235788,
      left: 114.58902605452259,
      bottom: 37.76434929128856,
      leftBottom: {
        x: 114.58902605452259,
        y: 37.76434929128856
      },
      right: 119.51371730073062,
      rightTop: {
        x: 119.51371730073062,
        y: 42.31307532235788
      }
    },
    coordUnit: 'DEGREE'
  };
  const dataSourceInfo = {
    datasourceNames: ['supermap1_pg'],
    childUriList: ['http://fack:8090/iserver/services/data_sichuan-3-/rest/data/datasources/name/supermap1_pg'],
    datasourceCount: 1
  };
  const datasetsInfo = {
    datasetCount: 1,
    datasetNames: ['dataGeoJson_2529638'],
    childUriList: [
      'http://fack:8090/iserver/services/data_sichuan-3-/rest/data/datasources/supermap1_pg/datasets/dataGeoJson_2529638'
    ]
  };
  beforeAll(() => {
    Object.defineProperty(document, 'cookie', {
      get() {
        return cookieValue;
      },
      set() {}
    });
    // 重置navigator
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true
    });
    spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
      return true;
    });
  });

  afterAll(() => {
    window.document.cookie = originCookie;
    window.navigator = originalNavigator;
  });
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

  it('getCookie', () => {
    cookieValue = 'testKey=testValue;language=zh-CN;another=value';

    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        var mapJson = datavizWebmap_ZXYTILE;
        return Promise.resolve(new Response(mapJson));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    const webmap = new WebMap(id, { server: server });
    expect(webmap.getCookie('testKey')).toBe('testValue');
    expect(webmap.getCookie('language')).toBe('zh-CN');
    expect(webmap.getCookie('nonexistent')).toBeNull();
    // 测试大小写不敏感
    expect(webmap.getCookie('TESTKEY')).toBe('testValue');
    expect(webmap.getCookie('LANGUAGE')).toBe('zh-CN');
  });

  it('formatCookieLang', () => {
    const webmap = new WebMap(id, { server: server });

    // 测试各种语言代码映射
    expect(webmap.formatCookieLang('zh')).toBe('zh-CN');
    expect(webmap.formatCookieLang('ar')).toBe('ar-EG');
    expect(webmap.formatCookieLang('bg')).toBe('bg-BG');
    expect(webmap.formatCookieLang('ca')).toBe('ca-ES');
    expect(webmap.formatCookieLang('cs')).toBe('cs-CZ');
    expect(webmap.formatCookieLang('da')).toBe('da-DK');
    expect(webmap.formatCookieLang('de')).toBe('de-DE');
    expect(webmap.formatCookieLang('el')).toBe('el-GR');
    expect(webmap.formatCookieLang('es')).toBe('es-ES');
    expect(webmap.formatCookieLang('et')).toBe('et-EE');
    expect(webmap.formatCookieLang('fa')).toBe('fa-IR');
    expect(webmap.formatCookieLang('fl')).toBe('fi-FI');
    expect(webmap.formatCookieLang('fr')).toBe('fr-FR');
    expect(webmap.formatCookieLang('he')).toBe('he-IL');
    expect(webmap.formatCookieLang('hu')).toBe('hu-HU');
    expect(webmap.formatCookieLang('id')).toBe('id-ID');
    expect(webmap.formatCookieLang('is')).toBe('is-IS');
    expect(webmap.formatCookieLang('it')).toBe('it-IT');
    expect(webmap.formatCookieLang('ja')).toBe('ja-JP');
    expect(webmap.formatCookieLang('ko')).toBe('ko-KR');
    expect(webmap.formatCookieLang('ku')).toBe('ku-IQ');
    expect(webmap.formatCookieLang('mn')).toBe('mn-MN');
    expect(webmap.formatCookieLang('nb')).toBe('nb-NO');
    expect(webmap.formatCookieLang('ne')).toBe('ne-NP');
    expect(webmap.formatCookieLang('nl')).toBe('nl-NL');
    expect(webmap.formatCookieLang('pl')).toBe('pl-PL');
    expect(webmap.formatCookieLang('pt')).toBe('pt-PT');
    expect(webmap.formatCookieLang('ru')).toBe('ru-RU');
    expect(webmap.formatCookieLang('sk')).toBe('sk-SK');
    expect(webmap.formatCookieLang('sl')).toBe('sl-SI');
    expect(webmap.formatCookieLang('sr')).toBe('sr-RS');
    expect(webmap.formatCookieLang('sv')).toBe('sv-SE');
    expect(webmap.formatCookieLang('th')).toBe('th-TH');
    expect(webmap.formatCookieLang('tr')).toBe('tr-TR');
    expect(webmap.formatCookieLang('uk')).toBe('uk-UA');
    expect(webmap.formatCookieLang('vi')).toBe('vi-VN');
    expect(webmap.formatCookieLang('en')).toBe('en-US');

    // 测试未知语言代码
    expect(webmap.formatCookieLang('unknown')).toBe('en-US');
  });

  it('getLang_with_cookie', () => {
    cookieValue = 'language=zh';
    const webmap = new WebMap(id, { server: server });
    spyOn(webmap, 'formatCookieLang').and.returnValue('zh-CN');
    spyOn(navigator, 'language').and.returnValue('en-US');

    const lang = webmap.getLang();
    expect(lang).toBe('zh-CN');
    expect(webmap.formatCookieLang).toHaveBeenCalledWith('zh');
  });

  it('getLang_without_cookie', () => {
    cookieValue = '';
    const webmap = new WebMap(id, { server: server });
    // 模拟navigator.language属性
    Object.defineProperty(window, 'navigator', {
      value: {
        language: 'fr-FR',
        browserLanguage: undefined
      },
      writable: true
    });

    const lang = webmap.getLang();
    expect(lang).toBe('fr-FR');
  });

  it('getLang_without_cookie_IE_compatibility', () => {
    cookieValue = '';
    const webmap = new WebMap(id, { server: server });
    // 模拟navigator没有language属性但有browserLanguage属性
    Object.defineProperty(window, 'navigator', {
      value: {
        language: undefined,
        browserLanguage: 'de-DE'
      },
      writable: true
    });

    const lang = webmap.getLang();
    expect(lang).toBe('de-DE');
  });

  it('isSupportWebp', (done) => {
    const webmap = new WebMap(id, { server: server });
    spyOn(webmap, 'isIE').and.returnValue(false);
    spyOn(webmap, 'isFirefox').and.returnValue(false);
    spyOn(webmap, 'isChrome').and.returnValue(false);
    spyOn(FetchRequest, 'get').and.returnValue(Promise.resolve(new Response('', { status: 200 })));

    const url = 'http://fakeurl';
    const token = null;
    const proxy = false;

    const promise = webmap.isSupportWebp(url, token, proxy);
    expect(Promise.resolve(promise)).toBe(promise); // 检查返回值是否为Promise

    promise.then((result) => {
      expect(result).toBe(true);
      expect(FetchRequest.get).toHaveBeenCalled();
      done();
    });
  });

  it('isSupportWebp_IE_not_support', () => {
    const webmap = new WebMap(id, { server: server });
    spyOn(webmap, 'isIE').and.returnValue(true);

    const url = 'http://fakeurl';
    const token = null;
    const proxy = false;

    const result = webmap.isSupportWebp(url, token, proxy);
    expect(result).toBe(false);
  });

  it('isSupportWebp_Firefox_old_version_not_support', () => {
    const webmap = new WebMap(id, { server: server });
    spyOn(webmap, 'isIE').and.returnValue(false);
    spyOn(webmap, 'isFirefox').and.returnValue(true);
    spyOn(webmap, 'getFirefoxVersion').and.returnValue(60);

    const url = 'http://fakeurl';
    const token = null;
    const proxy = false;

    const result = webmap.isSupportWebp(url, token, proxy);
    expect(result).toBe(false);
  });

  it('isSupportWebp_Chrome_old_version_not_support', () => {
    const webmap = new WebMap(id, { server: server });
    spyOn(webmap, 'isIE').and.returnValue(false);
    spyOn(webmap, 'isFirefox').and.returnValue(false);
    spyOn(webmap, 'isChrome').and.returnValue(true);
    spyOn(webmap, 'getChromeVersion').and.returnValue(25);

    const url = 'http://fakeurl';
    const token = null;
    const proxy = false;

    const result = webmap.isSupportWebp(url, token, proxy);
    expect(result).toBe(false);
  });

  it('isSupportWebp_request_failed', (done) => {
    const webmap = new WebMap(id, { server: server });
    spyOn(webmap, 'isIE').and.returnValue(false);
    spyOn(webmap, 'isFirefox').and.returnValue(false);
    spyOn(webmap, 'isChrome').and.returnValue(false);
    spyOn(FetchRequest, 'get').and.returnValue(Promise.reject(new Error('Network error')));

    const url = 'http://fakeurl';
    const token = null;
    const proxy = false;

    const promise = webmap.isSupportWebp(url, token, proxy);
    expect(Promise.resolve(promise)).toBe(promise); // 检查返回值是否为Promise

    promise.then((result) => {
      expect(result).toBe(false);
      done();
    });
  });

  it('renameLayerId_no_duplicate', () => {
    const webmap = new WebMap(id, { server: server });

    const layers = [{ id: 'layer1' }, { id: 'layer2' }];
    const curLayer = { id: 'layer3' };

    webmap.renameLayerId(layers, curLayer);

    // 没有重复应该保持不变
    expect(curLayer.id).toBe('layer3');
  });

  it('renameLayerId_with_duplicate', () => {
    const webmap = new WebMap(id, { server: server });

    const layers = [{ id: 'layer1' }, { id: 'layer2' }];
    const curLayer = { id: 'layer1' };

    webmap.renameLayerId(layers, curLayer);

    // 有重复应该添加(1)后缀
    expect(curLayer.id).toBe('layer1(1)');
  });

  it('renameLayerId_with_duplicate_and_existing_suffix', () => {
    const webmap = new WebMap(id, { server: server });

    const layers = [{ id: 'layer1' }, { id: 'layer1(1)' }];
    const curLayer = { id: 'layer1' };

    webmap.renameLayerId(layers, curLayer);

    // 如果已经存在带后缀的图层，应该递增
    expect(curLayer.id).toBe('layer1(2)');
  });

  it('renameLayerId_recursive_rename_if_still_duplicate', () => {
    const webmap = new WebMap(id, { server: server });

    const layers = [{ id: 'layer1' }, { id: 'layer1(1)' }];
    const curLayer = { id: 'layer1' };

    webmap.renameLayerId(layers, curLayer);

    // 如果重命名后仍然重复，应该再次递增
    expect(curLayer.id).toBe('layer1(2)');
  });
  it('webmap_relationRestData', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(accessTypeRestData));
      }
      if (url.indexOf('675746998/datasets.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(datsets)));
      }
      if (url.indexOf('675746998.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(result1)));
      }
      if (url.indexOf('data_sichuan-7-/rest/data/datasources.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(dataSourceInfo)));
      }
      if (url.indexOf('data_sichuan-7-/rest/data/datasources/supermap1_pg/datasets') > -1) {
        return Promise.resolve(new Response(JSON.stringify(datasetsInfo)));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    spyOn(FetchRequest, 'post').and.callFake((url) => {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            features: [
              {
                stringID: null,
                fieldNames: ['SmID', 'SORIND'],
                geometry: {
                  center: {
                    x: -93.716546,
                    y: 29.668007
                  },
                  parts: [1],
                  style: null,
                  prjCoordSys: null,
                  id: 222,
                  type: 'POINT',
                  partTopo: null,
                  points: [
                    {
                      x: -93.716546,
                      y: 29.668007
                    }
                  ]
                },
                fieldValues: ['222', 'US,US,reprt,USCG OPFAC'],
                ID: 222
              }
            ]
          })
        )
      );
    });
    var datavizWebmap = new WebMap(id, options);

    async function successCallback() {
      setTimeout(() => {
        expect(datavizWebmap.map.getLayers().getLength()).toBe(2);
        expect(datavizWebmap.layers[0].autoUpdateInterval).not.toBeNull();
        clearInterval(datavizWebmap.layers[0].autoUpdateInterval);
        done();
      }, 30);
    }
  });

  it('webmap_relationRestMap', (done) => {
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };

    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(accessTypeRestMap));
      }
      if (url.indexOf('675746998/datasets.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(datsets)));
      }
      if (url.indexOf('675746998.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(result1)));
      }
      if (url.indexOf('data_sichuan-7-/rest/data/datasources.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(dataSourceInfo)));
      }
      if (url.indexOf('data_sichuan-7-/rest/data/datasources/supermap1_pg/datasets') > -1) {
        return Promise.resolve(new Response(JSON.stringify(datasetsInfo)));
      }
      if (url.indexOf('/map_sichuan-7-/rest/maps.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(mapsInfo)));
      }
      if (url.indexOf('/map_sichuan-7-/rest/maps/test.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(mapInfo)));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);

    async function successCallback() {
      setTimeout(() => {
        expect(datavizWebmap.map.getLayers().getLength()).toBe(2);
        expect(datavizWebmap.layers[0].autoUpdateInterval).not.toBeNull();
        clearInterval(datavizWebmap.layers[0].autoUpdateInterval);
        done();
      }, 30);
    }
  });
  it('createLayer_migration', (done) => {
    let add = false;
    let elayer = null;
    class ol3Echarts extends obj {
      appendTo() {
        elayer = this;
        add = true;
        return true;
      }
      getChartOptions() {
        return {};
      }
      clear() {
        return true;
      }
      setChartOptions() {
        return true;
      }
      unset() {
        return true;
      }
    }
    window.ol3Echarts = ol3Echarts;
    let options = {
      server: server,
      successCallback,
      errorCallback: function () {}
    };
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
      expect(elayer).not.toBeNull();
      expect(elayer.type).toBe('ECHARTS');
      elayer.setVisible(false);
      elayer.setVisible(true);
      done();
    }
  });
  it('createLayer_mvt', (done) => {
    function successCallback() {
      const layerInfo = {
        url: 'https://fack:8090/iserver/services/map-mvt-test/rest/maps/test',
        projection: 'EPSG:3857',
        featureType: 'LINE' // REGION
      };
      const layer = datavizWebmap.addVectorTileLayer(layerInfo, 1, 'RESTDATA').then((layer) => {
        expect(layerInfo.layerID).not.toBeNull();
        done();
      });
    }
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
  });
});
