import { createWebMapBaseExtending } from '../../../src/common/mapping/WebMapBase';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import * as epsgDefine from '../../../src/common/mapping/utils/epsg-define';
import cloneDeep from 'lodash.clonedeep';

describe('WebMapBaseSpec.js', () => {
  const id = 123;
  const options = {
    accessKey: undefined,
    accessToken: undefined,
    excludePortalProxyUrl: undefined,
    iportalServiceProxyUrlPrefix: undefined,
    isSuperMapOnline: undefined,
    proxy: undefined,
    serverUrl: '/iportal',
    target: 'map',
    tiandituKey: undefined,
    withCredentials: false
  };
  const mapOptions = {
    style: {
      layers: [],
      sources: {},
      version: 8
    }
  };
  const map = {
    getZoom: () => 2,
    setZoom: () => {},
    setMaxBounds: () => {},
    setMinZoom: () => {},
    setMaxZoom: () => {},
    getSource: () => {
      return {
        _data: {
          features: [
            {
              geometry: {}
            }
          ]
        }
      };
    }
  };

  const mock_geostats = class {
    getClassEqInterval() {
      return this.arrayData;
    }
    setSerie(arrayData) {
      this.arrayData = arrayData;
    }
  };

  const rankSymbolStyleParams = {
    themeField: 'SmUserID',
    features: [
      {
        type: 'Feature',
        properties: {
          SmUserID: 0,
          col: '11111',
          des: 'test1',
          index: 0
        },
        geometry: {
          type: 'Point',
          coordinates: [116.36331703990744, 39.89942692791154]
        }
      },
      {
        type: 'Feature',
        properties: {
          SmUserID: 0,
          col: '22222',
          des: 'test2',
          index: 1
        },
        geometry: {
          type: 'Point',
          coordinates: [116.37438913096268, 39.89976329032906]
        }
      },
      {
        type: 'Feature',
        properties: {
          SmUserID: 0,
          col: '33333',
          des: 'test3',
          index: 2
        },
        geometry: {
          type: 'Point',
          coordinates: [116.38141290077355, 39.9767738835847]
        }
      }
    ],
    parameters: {
      layerType: 'RANK_SYMBOL',
      visible: 'visible',
      themeSetting: {
        maxRadius: 12,
        themeField: 'col',
        customSettings: {
          0: {
            segment: {
              start: 11111,
              end: 22222
            }
          },
          1: {
            segment: {
              start: 22222,
              end: 33333.01
            }
          }
        },
        minRadius: 6,
        segmentMethod: 'offset',
        segmentCount: 2
      },
      filterCondition: "col != ''",
      name: '站点1',
      featureType: 'POINT',
      style: {
        strokeWidth: 1,
        fillColor: '#24B391',
        offsetX: 0,
        offsetY: 0,
        fillOpacity: 0.9,
        radius: 9,
        strokeColor: '#ffffff',
        type: 'BASIC_POINT',
        strokeOpacity: 1
      },
      projection: 'EPSG:4326',
      enableFields: ['SmUserID', 'des', 'col'],
      dataSource: {
        accessType: 'DIRECT',
        type: 'PORTAL_DATA',
        serverId: '1170299840'
      },
      layerID: '站点1-1'
    },
    layerInfo: {
      layerType: 'RANK_SYMBOL',
      visible: 'visible',
      themeSetting: {
        maxRadius: 12,
        themeField: 'SmUserID',
        customSettings: {},
        minRadius: 6,
        segmentMethod: 'offset',
        segmentCount: 2
      },
      filterCondition: "col != ''",
      name: '站点1',
      featureType: 'POINT',
      style: {
        strokeWidth: 1,
        fillColor: '#24B391',
        offsetX: 0,
        offsetY: 0,
        fillOpacity: 0.9,
        radius: 9,
        strokeColor: '#ffffff',
        type: 'BASIC_POINT',
        strokeOpacity: 1
      },
      projection: 'EPSG:4326',
      enableFields: ['SmUserID', 'des', 'col'],
      dataSource: {
        accessType: 'DIRECT',
        type: 'PORTAL_DATA',
        serverId: '1170299840'
      },
      layerID: '站点1-1'
    }
  };

  const rangeUniqueStyleParams = {
    rangeLayer: {
      layerType: 'RANGE',
      visible: 'visible',
      themeSetting: {
        themeField: 'col',
        customSettings: {
          0: {
            segment: {
              start: 11111,
              end: 22222.1
            }
          },
          1: {
            segment: {
              start: 22222.1,
              end: 33333.1
            }
          }
        },
        segmentMethod: 'offset',
        segmentCount: 2,
        colors: ['#ffc6c4', '#f4a3a8', '#e38191', '#cc607d', '#ad466c', '#8b3058', '#672044']
      },
      filterCondition: "col != ''",
      name: '站点1',
      featureType: 'POINT',
      style: {
        strokeWidth: 1,
        fillColor: '#f4a3a8',
        offsetX: 0,
        offsetY: 0,
        fillOpacity: 0.9,
        radius: 8,
        strokeColor: '#ffffff',
        type: 'BASIC_POINT',
        strokeOpacity: 1
      },
      projection: 'EPSG:4326',
      enableFields: ['SmUserID', 'col'],
      dataSource: {
        accessType: 'DIRECT',
        type: 'PORTAL_DATA',
        serverId: '1170299840'
      },
      layerID: '站点1-1'
    },
    uniqueLayer: {
      layerType: 'UNIQUE',
      visible: 'visible',
      themeSetting: {
        themeField: 'col',
        customSettings: {
          11111: {
            fillColor: '#D53E4F',
            strokeWidth: 1,
            offsetX: 0,
            offsetY: 0,
            fillOpacity: 0.9,
            type: 'BASIC_POINT',
            radius: 8,
            strokeColor: '#ffffff',
            strokeOpacity: 1
          },
          22222: {
            fillColor: '#3288BD',
            strokeWidth: 1,
            offsetX: 0,
            offsetY: 0,
            fillOpacity: 0.9,
            type: 'BASIC_POINT',
            radius: 8,
            strokeColor: '#ffffff',
            strokeOpacity: 1
          },
          33333: {
            fillColor: '#FC8D59',
            strokeWidth: 1,
            offsetX: 0,
            offsetY: 0,
            fillOpacity: 0.9,
            type: 'BASIC_POINT',
            radius: 8,
            strokeColor: '#ffffff',
            strokeOpacity: 1
          }
        },
        colors: ['#D53E4F', '#FC8D59', '#FEE08B', '#FFFFBF', '#E6F598', '#99D594', '#3288BD']
      },
      name: '站点1',
      featureType: 'POINT',
      style: {
        strokeWidth: 1,
        offsetX: 0,
        fillColor: '#FC8D59',
        offsetY: 0,
        fillOpacity: 0.9,
        radius: 8,
        strokeColor: '#ffffff',
        type: 'BASIC_POINT',
        strokeOpacity: 1
      },
      projection: 'EPSG:4326',
      enableFields: ['SmUserID', 'col'],
      dataSource: {
        accessType: 'DIRECT',
        type: 'PORTAL_DATA',
        serverId: '1170299840'
      },
      layerID: '站点1-1'
    }
  };

  const WebMapBase = createWebMapBaseExtending();

  it('default SuperClass', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.triggerEvent).not.toBeUndefined();
    expect(webMapBase.fire).toBeUndefined();
    done();
  });

  it('invoke attract methods', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(() => webMapBase._initWebMap()).toThrow(new Error('_initWebMap is not implemented'));
    expect(() => webMapBase._getMapInfo()).toThrow(new Error('_getMapInfo is not implemented'));
    expect(() => webMapBase._createMap()).toThrow(new Error('_createMap is not implemented'));
    expect(() => webMapBase._initBaseLayer()).toThrow(new Error('_initBaseLayer is not implemented'));
    expect(() => webMapBase._initOverlayLayer()).toThrow(new Error('_initOverlayLayer is not implemented'));
    expect(() => webMapBase._addLayerSucceeded()).toThrow(new Error('_addLayerSucceeded is not implemented'));
    expect(() => webMapBase._unproject()).toThrow(new Error('_unproject is not implemented'));
    expect(() => webMapBase.clean()).toThrow(new Error('clean is not implemented'));
    done();
  });

  it('echartslayer', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    const chart = {
      resize: () => {}
    };
    const spy = spyOn(chart, 'resize').and.callThrough();
    webMapBase.echartslayer = [{ chart }];
    webMapBase.echartsLayerResize();
    expect(spy.calls.count()).toBe(1);
    done();
  });

  it('setMapId mapId is number', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase._initWebMap = () => {};
    const spy = spyOn(webMapBase, '_initWebMap').and.callThrough();
    jasmine.clock().install();
    const changedMapId = 666;
    expect(webMapBase.webMapInfo).toBeUndefined();
    expect(webMapBase.mapId).toBe(id);
    webMapBase.setMapId(changedMapId);
    jasmine.clock().tick(10);
    expect(spy.calls.count()).toBe(1);
    expect(webMapBase.mapId).toBe(changedMapId);
    expect(webMapBase.webMapInfo).toBeNull();
    jasmine.clock().uninstall();
    done();
  });

  it('setMapId mapId is obj', (done) => {
    const mapId = {
      value: 123
    };
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase._initWebMap = () => {};
    const spy = spyOn(webMapBase, '_initWebMap').and.callThrough();
    jasmine.clock().install();
    expect(webMapBase.webMapInfo).toBeUndefined();
    expect(webMapBase.mapId).toBe(id);
    webMapBase.setMapId(mapId);
    jasmine.clock().tick(10);
    expect(spy.calls.count()).toBe(1);
    expect(webMapBase.mapId).toBe(id);
    expect(webMapBase.webMapInfo).toEqual(mapId);
    jasmine.clock().uninstall();
    done();
  });

  it('setMapId mapId is empty', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase._initWebMap = () => {};
    const spy = spyOn(webMapBase, '_initWebMap').and.callThrough();
    jasmine.clock().install();
    expect(webMapBase.webMapInfo).toBeUndefined();
    expect(webMapBase.mapId).toBe(id);
    webMapBase.setMapId();
    jasmine.clock().tick(10);
    expect(spy.calls.count()).toBe(0);
    expect(webMapBase.webMapInfo).toBeUndefined();
    expect(webMapBase.mapId).toBe(id);
    jasmine.clock().uninstall();
    done();
  });

  it('serverUrl default', (done) => {
    const webMapBase = new WebMapBase(id, { ...options, serverUrl: '' }, cloneDeep(mapOptions));
    expect(webMapBase.serverUrl).not.toBe(options.serverUrl);
    expect(webMapBase.serverUrl).toBe('https://www.supermapol.com');
    done();
  });

  it('setServerUrl', (done) => {
    const serverUrl = 'http://fake.iportal.com';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.serverUrl).toBe(options.serverUrl);
    webMapBase.setServerUrl(serverUrl);
    expect(webMapBase.serverUrl).toBe(serverUrl);
    done();
  });

  it('withCredentials default', (done) => {
    const webMapBase = new WebMapBase(id, { ...options, withCredentials: undefined }, cloneDeep(mapOptions));
    expect(webMapBase.withCredentials).not.toBeUndefined();
    expect(webMapBase.withCredentials).toBe(false);
    done();
  });

  it('setWithCredentials', (done) => {
    const withCredentials = true;
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.withCredentials).toBe(false);
    webMapBase.setWithCredentials(withCredentials);
    expect(webMapBase.withCredentials).toBe(true);
    done();
  });

  it('setProxy', (done) => {
    const proxy = 'http://test';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.proxy).toBeUndefined();
    webMapBase.setProxy(proxy);
    expect(webMapBase.proxy).toBe(proxy);
    done();
  });

  it('setZoom', (done) => {
    const zoom = 3;
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase.map = map;
    const spy = spyOn(map, 'setZoom').and.callThrough();
    expect(webMapBase.mapOptions.zoom).toBeUndefined();
    webMapBase.setZoom(zoom);
    expect(webMapBase.mapOptions.zoom).toBe(zoom);
    expect(spy.calls.count()).toBe(1);
    spy.calls.reset();
    done();
  });

  //maxBounds真实值？？？
  it('setMaxBounds', (done) => {
    const maxBounds = 10;
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase.map = map;
    const spy = spyOn(map, 'setMaxBounds').and.callThrough();
    expect(webMapBase.mapOptions.maxBounds).toBeUndefined();
    webMapBase.setMaxBounds(maxBounds);
    expect(webMapBase.mapOptions.maxBounds).toBe(maxBounds);
    expect(spy.calls.count()).toBe(1);
    spy.calls.reset();
    done();
  });

  it('setMinZoom', (done) => {
    const minZoom = 1;
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase.map = map;
    const spy = spyOn(map, 'setMinZoom').and.callThrough();
    expect(webMapBase.mapOptions.minZoom).toBeUndefined();
    webMapBase.setMinZoom(minZoom);
    expect(webMapBase.mapOptions.minZoom).toBe(minZoom);
    expect(spy.calls.count()).toBe(1);
    spy.calls.reset();
    done();
  });

  it('setMinZoom minZoom is undefined', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase.map = map;
    const spy = spyOn(map, 'setMinZoom').and.callThrough();
    expect(webMapBase.mapOptions.minZoom).toBeUndefined();
    webMapBase.setMinZoom();
    expect(webMapBase.mapOptions.minZoom).toBeUndefined();
    expect(spy.calls.count()).toBe(0);
    spy.calls.reset();
    done();
  });

  it('setMaxZoom', (done) => {
    const maxZoom = 19;
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase.map = map;
    const spy = spyOn(map, 'setMaxZoom').and.callThrough();
    expect(webMapBase.mapOptions.maxZoom).toBeUndefined();
    webMapBase.setMaxZoom(maxZoom);
    expect(webMapBase.mapOptions.maxZoom).toBe(maxZoom);
    expect(spy.calls.count()).toBe(1);
    spy.calls.reset();
    done();
  });

  it('setMaxZoom maxZoom is undefined', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase.map = map;
    const spy = spyOn(map, 'setMaxZoom').and.callThrough();
    expect(webMapBase.mapOptions.maxZoom).toBeUndefined();
    webMapBase.setMaxZoom();
    expect(webMapBase.mapOptions.maxZoom).toBeUndefined();
    expect(spy.calls.count()).toBe(0);
    spy.calls.reset();
    done();
  });

  it('initWebMap for empty map', (done) => {
    const webMapBase = new WebMapBase('', options, cloneDeep(mapOptions));
    webMapBase.clean = () => {};
    webMapBase._createMap = () => {};
    const spy = spyOn(webMapBase, '_createMap').and.callThrough();
    webMapBase.initWebMap();
    expect(webMapBase.serverUrl).toBe(`${options.serverUrl}/`);
    expect(spy.calls.count()).toBe(1);
    done();
  });

  it('initWebMap for mapJson', (done) => {
    const webMapBase = new WebMapBase('', options, cloneDeep(mapOptions));
    webMapBase.clean = () => {};
    webMapBase._getMapInfo = () => {};
    webMapBase.webMapInfo = datavizWebMap_MVT;
    const spy = spyOn(webMapBase, '_getMapInfo').and.callThrough();
    expect(webMapBase.mapParams).toBeUndefined();
    webMapBase.initWebMap();
    expect(webMapBase.serverUrl).toBe(`${options.serverUrl}/`);
    expect(webMapBase.mapParams).toEqual({
      title: datavizWebMap_MVT.title,
      description: datavizWebMap_MVT.description
    });
    expect(spy.calls.count()).toBe(1);
    done();
  });

  it('initWebMap for webmap success', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(datavizWebMap_MVT)));
      }
      return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
    });
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase.clean = () => {};
    webMapBase._getMapInfo = (mapInfo, _taskID) => {
      expect(mapInfo).toEqual(datavizWebMap_MVT);
      expect(webMapBase._taskID).toEqual(_taskID);
      expect(webMapBase.mapParams).toEqual({
        title: datavizWebMap_MVT.title,
        description: datavizWebMap_MVT.description
      });
      done();
    };
    expect(webMapBase.mapParams).toBeUndefined();
    webMapBase.initWebMap();
    expect(webMapBase.serverUrl).toBe(`${options.serverUrl}/`);
  });

  it('initWebMap for webmap catch', (done) => {
    const errorMsg = '未匹配到https://fakeiportal.supermap.io/iportal/web/maps/123/map.json';
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      return Promise.reject(errorMsg);
    });
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase.clean = () => {};
    webMapBase.on({
      getmapinfofailed: ({ error }) => {
        expect(error).toBe(errorMsg);
        expect(webMapBase.mapParams).toBeUndefined();
        done();
      }
    });
    expect(webMapBase.mapParams).toBeUndefined();
    webMapBase.initWebMap();
    expect(webMapBase.serverUrl).toBe(`${options.serverUrl}/`);
  });

  it('getBaseLayerType layerType', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getBaseLayerType({ layerType: 'TIANDITU_TER' })).toBe('TIANDITU');
    expect(webMapBase.getBaseLayerType({ layerType: 'TILE' })).toBe('TILE');
    expect(webMapBase.getBaseLayerType({ layerType: 'SUPERMAP_REST' })).toBe('TILE');
    expect(webMapBase.getBaseLayerType({ layerType: 'CLOUD_BLACK' })).toBe('CLOUD');
    expect(webMapBase.getBaseLayerType({ layerType: 'CLOUD' })).toBe('CLOUD');
    expect(webMapBase.getBaseLayerType({ layerType: 'OSM' })).toBe('XYZ');
    expect(webMapBase.getBaseLayerType({ layerType: 'JAPAN_ORT' })).toBe('XYZ');
    expect(webMapBase.getBaseLayerType({ layerType: 'JAPAN_RELIEF' })).toBe('XYZ');
    expect(webMapBase.getBaseLayerType({ layerType: 'JAPAN_PALE' })).toBe('XYZ');
    expect(webMapBase.getBaseLayerType({ layerType: 'JAPAN_STD' })).toBe('XYZ');
    expect(webMapBase.getBaseLayerType({ layerType: 'GOOGLE_CN' })).toBe('XYZ');
    expect(webMapBase.getBaseLayerType({ layerType: 'GOOGLE' })).toBe('XYZ');
    expect(webMapBase.getBaseLayerType({ layerType: 'MAPBOXSTYLE' })).toBe('MAPBOXSTYLE');
    done();
  });

  it('getMapurls is default', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getMapurls().CLOUD).toBe(
      'http://t2.dituhui.com/FileService/image?map=quanguo&type=web&x={x}&y={y}&z={z}'
    );
    const testUrl = 'http://fake.url';
    expect(webMapBase.getMapurls({ CLOUD: testUrl }).CLOUD).toBe(testUrl);
    expect(webMapBase.getMapurls().CLOUD_BLACK).toBe('http://t3.dituhui.com/MapService/getGdp?x={x}&y={y}&z={z}');
    expect(webMapBase.getMapurls({ CLOUD_BLACK: testUrl }).CLOUD_BLACK).toBe(testUrl);
    expect(webMapBase.getMapurls().OSM).toBe('https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    expect(webMapBase.getMapurls({ OSM: testUrl }).OSM).toBe(testUrl);
    expect(webMapBase.getMapurls().JAPAN_ORT).toBe('https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg');
    done();
  });

  it('getLayerFeatures success', (done) => {
    const wktResponse = `PROJCS["China_2000_3_DEGREE_GK_Zone_39N",GEOGCS["GCS_China_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101,AUTHORITY["EPSG","7044"]]],PRIMEM["Greenwich",0.0,AUTHORITY["EPSG","8901"]],UNIT["DEGREE",0.017453292519943295],AUTHORITY["EPSG","4490"]],PROJECTION["Transverse_Mercator",AUTHORITY["EPSG","9807"]],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",117.0],PARAMETER["Latitude_Of_Origin",0.0],PARAMETER["Scale_Factor",1.0],UNIT["METER",1.0],AUTHORITY["EPSG","4548"]]`;
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify({ wkt: wktResponse })));
    });
    const layer = {
      dataSource: { accessType: 'DIRECT', type: 'PORTAL_DATA', serverId: '366831804' },
      enableFields: ['SmID', '标准名称', '起点x', '起点y', '终点x', '终点y'],
      featureType: 'LINE',
      layerID: '北京市轨道交通线路',
      layerType: 'UNIQUE',
      name: '北京市轨道交通线路',
      projection: 'EPSG:2362',
      style: { strokeWidth: 6, lineDash: 'solid', strokeColor: '#3288bd', type: 'LINE', strokeOpacity: 1 },
      themeSetting: { themeField: 'SmID', customSettings: {}, colors: [] },
      visible: true
    };
    const _taskID = '123';
    const type = 'hosted';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase._taskID = _taskID;
    const response1 = { type: 'feature', features: [] };
    const response2 = wktResponse;
    const spy1 = spyOn(webMapBase.webMapService, 'getLayerFeatures').and.callFake(() => {
      return {
        then: (resolveCb) => {
          resolveCb(response1).then(() => {
            expect(webMapBase._initOverlayLayer).toHaveBeenCalledWith(layer, response1.features);
            const params = spy2.calls.allArgs()[0];
            expect(params[0]).toBe(layer.projection);
            expect(params[1]).toEqual(response2);
            spy1.calls.reset();
            spy2.calls.reset();
            done();
          });
          return {
            catch: () => {}
          };
        }
      };
    });
    const spy2 = spyOn(epsgDefine, 'registerProjection').and.callThrough();
    webMapBase._initOverlayLayer = jasmine.createSpy('callback');
    webMapBase.getLayerFeatures(layer, _taskID, type);
  });

  it('getLayerFeatures failure', (done) => {
    const layer = {
      dataSource: { accessType: 'DIRECT', type: 'PORTAL_DATA', serverId: '366831804' },
      enableFields: ['SmID', '标准名称', '起点x', '起点y', '终点x', '终点y'],
      featureType: 'LINE',
      layerID: '北京市轨道交通线路',
      layerType: 'UNIQUE',
      name: '北京市轨道交通线路',
      projection: 'EPSG:2362',
      style: { strokeWidth: 6, lineDash: 'solid', strokeColor: '#3288bd', type: 'LINE', strokeOpacity: 1 },
      themeSetting: { themeField: 'SmID', customSettings: {}, colors: [] },
      visible: true
    };
    const errorMsg = 'ooh error';
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.reject(errorMsg);
    });
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase._addLayerSucceeded = jasmine.createSpy('callback');
    const spy = spyOn(webMapBase, '_getLayerFeaturesSucceeded').and.callThrough();
    webMapBase.on({
      getlayerdatasourcefailed: ({ error }) => {
        expect(error.message).toBe(errorMsg);
        expect(webMapBase._addLayerSucceeded).toHaveBeenCalledTimes(1);
        expect(spy.calls.count()).toBe(0);
        done();
      }
    });
    webMapBase.getLayerFeatures(layer, undefined, 'hosted');
  });

  it('setFeatureInfo feature comes from dataViz', (done) => {
    let feature = {
      dv_v5_markerInfo: {
        dataViz_title: 'jiuzhaigou',
        title: '老虎海',
        subtitle: '树正沟景点-老虎海'
      },
      geometry: { type: 'Point', coordinates: [0, 1] },
      properties: {
        title: '老虎海1',
        subtitle: '树正沟景点-老虎海1',
        imgUrl: './laohuhai.png',
        description: '老虎海海拔2298米',
        index: 1
      },
      type: 'Feature'
    };
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    let res = webMapBase.setFeatureInfo(feature);
    expect(res).toEqual(feature.dv_v5_markerInfo);
    expect(res.title).toBe('老虎海1');
    expect(feature.properties.title).toBeUndefined();
    expect(res.title).toBe(feature.dv_v5_markerInfo.title);
    expect(res.subtitle).toBe('树正沟景点-老虎海1');
    expect(feature.properties.subtitle).toBeUndefined();
    expect(res.subtitle).toBe(feature.dv_v5_markerInfo.subtitle);
    expect(feature.properties.description).not.toBeUndefined();
    expect(feature.properties.imgUrl).not.toBeUndefined();
    expect(feature.properties.index).not.toBeUndefined();
    feature = {
      dv_v5_markerInfo: {
        title: '老虎海',
        subtitle: '树正沟景点-老虎海'
      },
      geometry: { type: 'Point', coordinates: [0, 1] },
      properties: {
        title: '老虎海1',
        subtitle: '树正沟景点-老虎海1',
        imgUrl: './laohuhai.png',
        description: '老虎海海拔2298米',
        index: 1
      },
      type: 'Feature'
    };
    res = webMapBase.setFeatureInfo(feature);
    expect(res).toEqual(feature.dv_v5_markerInfo);
    expect(res.title).toBe('老虎海');
    expect(feature.properties.title).not.toBeUndefined();
    expect(res.title).toBe(feature.dv_v5_markerInfo.title);
    expect(res.subtitle).toBe('树正沟景点-老虎海');
    expect(feature.properties.subtitle).not.toBeUndefined();
    expect(res.subtitle).toBe(feature.dv_v5_markerInfo.subtitle);
    feature = {
      geometry: { type: 'Point', coordinates: [0, 1] },
      properties: {
        title: '老虎海',
        subtitle: '树正沟景点-老虎海',
        imgUrl: './laohuhai.png',
        description: '老虎海海拔2298米',
        index: 1
      },
      type: 'Feature'
    };
    res = webMapBase.setFeatureInfo(feature);
    expect(res).toBeUndefined();
    done();
  });

  it('setFeatureInfo feature not comes from dataViz', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    const feature = {
      geometry: { type: 'Point', coordinates: [0, 1] },
      properties: {
        title: '老虎海',
        subtitle: '树正沟景点-老虎海',
        imgUrl: './laohuhai.png',
        description: '老虎海海拔2298米',
        index: 1
      },
      type: 'Feature'
    };
    expect(webMapBase.setFeatureInfo(feature)).toBeUndefined();
    done();
  });

  it('getRankStyleGroup filter invalid fieldValue', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    window.geostats = mock_geostats;
    const parameters = cloneDeep(rankSymbolStyleParams.parameters);
    parameters.themeSetting.customSettings = {};
    expect(webMapBase.getRankStyleGroup('des', rankSymbolStyleParams.features, parameters)).toBe(false);
    window.geostats = undefined;
    done();
  });

  it('getRankStyleGroup success', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    window.geostats = mock_geostats;
    const res = webMapBase.getRankStyleGroup(
      rankSymbolStyleParams.themeField,
      rankSymbolStyleParams.features,
      rankSymbolStyleParams.parameters
    );
    expect(res.length).toBe(2);
    window.geostats = undefined;
    done();
  });

  it('createRankStyleSource', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    window.geostats = mock_geostats;
    const parameters = { ...rankSymbolStyleParams.parameters, filterCondition: '' };
    const res = webMapBase.createRankStyleSource(parameters, rankSymbolStyleParams.features);
    expect(res.styleGroups.length).toBe(2);
    expect(res.parameters).toEqual(parameters);
    window.geostats = undefined;
    done();
  });

  it('getRestMapLayerInfo', (done) => {
    const restMapInfo = {
      bounds: {
        left: 10,
        top: 10,
        bottom: 10,
        right: 10
      },
      coordUnit: 'm',
      visibleScales: 18,
      url: 'http://test'
    };
    const layer = {
      layerType: '',
      orginEpsgCode: '',
      units: '',
      extent: '',
      visibleScales: '',
      url: '',
      sourceType: ''
    };
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getRestMapLayerInfo(restMapInfo, layer).layerType).toBe('TILE');
    done();
  });

  it('handleLayerFeatures', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    const res = webMapBase.handleLayerFeatures(rankSymbolStyleParams.features, rankSymbolStyleParams.layerInfo);
    expect(res).toEqual(rankSymbolStyleParams.features);
    done();
  });

  it('getFilterFeatures no mock jsonsql', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    const res = webMapBase.getFilterFeatures('col > 11111', rankSymbolStyleParams.features);
    expect(res.length).toBe(0);
    done();
  });

  it('getFilterFeatures mock jsonsql', (done) => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    window.jsonsql = {
      query: (sql, { attributes }) => {
        if (+attributes.col > 11111) {
          return [attributes];
        }
        return;
      }
    };
    const res = webMapBase.getFilterFeatures('col > 11111', rankSymbolStyleParams.features);
    expect(res.length).toBe(rankSymbolStyleParams.features.length - 1);
    window.jsonsql = undefined;
    done();
  });

  it('getEchartsLayerOptions', (done) => {
    const layerInfo = {
      layerType: 'MIGRATION',
      labelSetting: {
        fontFamily: '微软雅黑',
        color: '#62AD16',
        show: false
      },
      visible: 'visible',
      name: '国内航班数据_100',
      featureType: 'POINT',
      from: {
        xField: 'X',
        yField: 'Y',
        type: 'XY_FIELD'
      },
      projection: 'EPSG:4326',
      to: {
        xField: '到达城市x',
        yField: '到达城市y',
        type: 'XY_FIELD'
      },
      enableFields: [
        '出发城市',
        'Y',
        'X',
        '到达城市',
        '到达城市y',
        '到达城市x',
        '起飞机场',
        '起飞机场y',
        '起飞机场x',
        '降落机场',
        '降落机场y',
        '降落机场x'
      ],
      lineSetting: {
        curveness: 0.2,
        color: '#62AD16',
        width: 1,
        type: 'solid',
        opacity: 0.6
      },
      dataSource: {
        accessType: 'DIRECT',
        type: 'PORTAL_DATA',
        serverId: '1645576091'
      },
      animationSetting: {
        symbol: 'arrow',
        symbolSize: 17,
        show: true,
        constantSpeed: 40
      },
      layerID: '国内航班数据_100'
    };
    const features = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [80.293842, 41.188341]
        },
        properties: {
          出发城市: '阿克苏',
          Y: '41.188341',
          X: '80.293842',
          到达城市: '北京',
          到达城市y: '39.92998578',
          到达城市x: '116.395645',
          起飞机场: '阿克苏机场',
          起飞机场y: '41.26940127',
          起飞机场x: '80.30091874',
          降落机场: '首都机场',
          降落机场y: '40.06248537',
          降落机场x: '116.5992671',
          index: '0'
        }
      }
    ];
    const coordinateSystem = 'GLMap';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    const res = webMapBase.getEchartsLayerOptions(layerInfo, features, coordinateSystem);
    expect(res.series[0].effect.constantSpeed).toBe(layerInfo.animationSetting.constantSpeed);
    done();
  });

  it('getDashStyle str is solid', () => {
    const str = 'solid';
    const strokeWidth = 2;
    const type = 'array';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getDashStyle(str, strokeWidth, type)).toEqual([]);
  });

  it('getDashStyle str is dot', () => {
    const str = 'dot';
    const strokeWidth = 2;
    const type = 'array';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getDashStyle(str, strokeWidth, type)).toEqual([1, 8]);
  });

  it('getDashStyle str is dash', () => {
    const str = 'dash';
    const strokeWidth = 2;
    const type = 'array';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getDashStyle(str, strokeWidth, type)).toEqual([8, 8]);
  });

  it('getDashStyle str is dashrailway', () => {
    const str = 'dashrailway';
    const strokeWidth = 2;
    const type = 'array';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getDashStyle(str, strokeWidth, type)).toEqual([16, 24]);
  });

  it('getDashStyle str is dashdot', () => {
    const str = 'dashdot';
    const strokeWidth = 2;
    const type = 'array';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getDashStyle(str, strokeWidth, type)).toEqual([8, 8, 2, 8]);
  });

  it('getDashStyle str is longdash', () => {
    const str = 'longdash';
    const strokeWidth = 2;
    const type = 'array';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getDashStyle(str, strokeWidth, type)).toEqual([16, 8]);
  });

  it('getDashStyle str is longdashdot', () => {
    const str = 'longdashdot';
    const strokeWidth = 2;
    const type = 'array';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getDashStyle(str, strokeWidth, type)).toEqual([16, 8, 1, 8]);
  });

  it('getDashStyle no params', () => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getDashStyle()).toEqual([]);
  });

  it('getDashStyle params str is Array', () => {
    const str = ['longdashdot'];
    const strokeWidth = 2;
    const type = 'array';
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getDashStyle(str, strokeWidth, type)).toEqual(['longdashdot']);
  });

  it('getDashStyle params str is normal string', () => {
    const str = 'longdashdot longdash';
    const strokeWidth = 2;
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase.getDashStyle(str, strokeWidth)).toEqual(['longdashdot', 'longdash']);
  });

  it('getCanvasFromSVG', (done) => {
    const mockRes = {
      start: jasmine.createSpy('start'),
      stop: jasmine.createSpy('stop')
    };
    window.canvg = {
      default: {
        from: (ctx) => {
          return {
            then: (resolveCb) => {
              resolveCb(mockRes);
            }
          };
        }
      }
    };
    const svgUrl = 'http://testsvg';
    const divDom = {
      appendChild: jasmine.createSpy('appendChild')
    };
    const callBack = jasmine.createSpy('callBack');
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase.getCanvasFromSVG(svgUrl, divDom, callBack);
    expect(divDom.appendChild).toHaveBeenCalled();
    expect(callBack).toHaveBeenCalled();
    expect(webMapBase.canvgsV.length).toBe(1);
    window.canvg = undefined;
    done();
  });

  it('getCanvasFromSVG no svgUrl ', (done) => {
    const divDom = {
      appendChild: jasmine.createSpy('appendChild')
    };
    const callBack = jasmine.createSpy('callBack');
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase.getCanvasFromSVG('', divDom, callBack);
    expect(divDom.appendChild).toHaveBeenCalled();
    expect(callBack).toHaveBeenCalled();
    expect(webMapBase.canvgsV.length).toBe(0);
    done();
  });

  it('getRangeStyleGroup', () => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    const res = webMapBase.getRangeStyleGroup(rangeUniqueStyleParams.rangeLayer, rankSymbolStyleParams.features);
    expect(res.length).toBe(2);
  });

  it('getRangeStyleGroup no themeField', () => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    const nextLayerInfo = cloneDeep(rangeUniqueStyleParams.rangeLayer);
    nextLayerInfo.themeSetting.themeField = '';
    const res = webMapBase.getRangeStyleGroup(nextLayerInfo, rankSymbolStyleParams.features);
    expect(res).toBeUndefined();
  });

  it('getUniqueStyleGroup', () => {
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    const res = webMapBase.getUniqueStyleGroup(rangeUniqueStyleParams.uniqueLayer, rankSymbolStyleParams.features);
    expect(res.length).toBe(3);
    const themeField = rangeUniqueStyleParams.uniqueLayer.themeSetting.themeField;
    expect(res[0].themeField).toBe(themeField);
    expect(res[0].value).toBe(rankSymbolStyleParams.features[0].properties[themeField]);
    expect(res[1].themeField).toBe(themeField);
    expect(res[1].value).toBe(rankSymbolStyleParams.features[1].properties[themeField]);
    expect(res[2].themeField).toBe(themeField);
    expect(res[2].value).toBe(rankSymbolStyleParams.features[2].properties[themeField]);
  });

  it('handleSvgColor', () => {
    const style = {
      fillColor: '#000',
      fillOpacity: 1,
      strokeOpacity: 1,
      strokeWidth: 2
    };
    const fillSpy = jasmine.createSpy('fill');
    const strokeSpy = jasmine.createSpy('stroke');
    const canvas = {
      getContext: () => {
        return {
          fill: fillSpy,
          stroke: strokeSpy
        };
      }
    };
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase.handleSvgColor(style, canvas);
    expect(fillSpy).toHaveBeenCalled();
    expect(strokeSpy).toHaveBeenCalled();
  });

  it('_createOptions open animation', () => {
    const lineData = [
      {
        coords: [
          [1.295350519989875e7, 4851338.019912067],
          [1.295350519989875e7, 4851338.019912067]
        ]
      }
    ];
    const layerInfo = {
      animationSetting: {
        symbol: 'pin',
        symbolSize: 15,
        show: true,
        constantSpeed: 40
      },
      dataSource: { accessType: 'DIRECT', type: 'PORTAL_DATA', serverId: '1249258329' },
      enableFields: ['SmID', 'SmX', 'SmY', 'SmLibTileID', 'SmUserID', 'SmGeometrySize', 'SmGeoPosition', '标准名称'],
      featureType: 'POINT',
      from: {
        xField: 'SmX',
        yField: 'SmY',
        type: 'XY_FIELD'
      },
      labelSetting: {
        fontFamily: '黑体',
        color: '#62AD16',
        show: true
      },
      layerID: '北京市轨道交通站点',
      layerType: 'MIGRATION',
      lineSetting: {
        curveness: 0.2,
        color: '#792b1b',
        width: 1,
        type: 'solid',
        opacity: 0.6
      },
      name: '北京市轨道交通站点',
      projection: 'EPSG:4326',
      to: {
        xField: 'SmX',
        yField: 'SmY',
        type: 'XY_FIELD'
      },
      visible: 'visible'
    };
    const pointData = [1.295350519989875e7, 4851338.019912067];
    const coordinateSystem = 'GLMap';
    const result = {
      series: [
        {
          coordinateSystem: 'GLMap',
          data: [
            {
              coords: [
                [12953505.19989875, 4851338.019912067],
                [12953505.19989875, 4851338.019912067]
              ]
            }
          ],
          effect: { constantSpeed: 40, show: true, symbol: 'pin', symbolSize: 15, trailLength: 0 },
          lineStyle: { normal: { color: '#792b1b', curveness: 0.2, opacity: 0.6, type: 'solid', width: 1 } },
          name: 'line-series',
          type: 'lines',
          zlevel: 1
        },
        {
          coordinateSystem: 'GLMap',
          data: [12953505.19989875, 4851338.019912067],
          itemStyle: { normal: { color: '#792b1b' } },
          label: {
            normal: { color: '#62AD16', fontFamily: '黑体', formatter: '{b}', position: 'right', show: true }
          },
          name: 'point-series',
          type: 'effectScatter',
          rippleEffect: {
            brushType: 'stroke'
          },
          zlevel: 2
        }
      ],
      animation: false
    };
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase._createOptions(layerInfo, lineData, pointData, coordinateSystem)).toEqual(result);
  });

  it('_createOptions close animation', () => {
    const lineData = [
      {
        coords: [
          [1.295350519989875e7, 4851338.019912067],
          [1.295350519989875e7, 4851338.019912067]
        ]
      }
    ];
    const layerInfo = {
      animationSetting: {
        symbol: 'pin',
        symbolSize: 15,
        show: false,
        constantSpeed: 40
      },
      dataSource: { accessType: 'DIRECT', type: 'PORTAL_DATA', serverId: '1249258329' },
      enableFields: ['SmID', 'SmX', 'SmY', 'SmLibTileID', 'SmUserID', 'SmGeometrySize', 'SmGeoPosition', '标准名称'],
      featureType: 'POINT',
      from: {
        xField: 'SmX',
        yField: 'SmY',
        type: 'XY_FIELD'
      },
      labelSetting: {
        fontFamily: '黑体',
        color: '#62AD16',
        show: true
      },
      layerID: '北京市轨道交通站点',
      layerType: 'MIGRATION',
      lineSetting: {
        curveness: 0.2,
        color: '#792b1b',
        width: 1,
        type: 'solid',
        opacity: 0.6
      },
      name: '北京市轨道交通站点',
      projection: 'EPSG:4326',
      to: {
        xField: 'SmX',
        yField: 'SmY',
        type: 'XY_FIELD'
      },
      visible: 'visible'
    };
    const pointData = [1.295350519989875e7, 4851338.019912067];
    const coordinateSystem = 'GLMap';
    const result = {
      series: [
        {
          coordinateSystem: 'GLMap',
          data: [
            {
              coords: [
                [12953505.19989875, 4851338.019912067],
                [12953505.19989875, 4851338.019912067]
              ]
            }
          ],
          effect: { constantSpeed: 40, show: false, symbol: 'pin', symbolSize: 15, trailLength: 0 },
          lineStyle: { normal: { color: '#792b1b', curveness: 0.2, opacity: 0.6, type: 'solid', width: 1 } },
          name: 'line-series',
          type: 'lines',
          zlevel: 1
        },
        {
          coordinateSystem: 'GLMap',
          data: [12953505.19989875, 4851338.019912067],
          itemStyle: { normal: { color: '#792b1b' } },
          label: {
            normal: { color: '#62AD16', fontFamily: '黑体', formatter: '{b}', position: 'right', show: true }
          },
          name: 'point-series',
          type: 'scatter',
          zlevel: 2
        }
      ],
      animation: false
    };
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    expect(webMapBase._createOptions(layerInfo, lineData, pointData, coordinateSystem)).toEqual(result);
  });

  it('_getLayerFeaturesSucceeded', () => {
    const result = {
      features: [
        {
          geometry: { type: 'Point', coordinates: [] },
          properties: {
            SmID: '1',
            SmX: '1.295350519989875E7',
            SmY: '4851338.019912067',
            SmLibTileID: '1',
            SmUserID: '0'
          },
          type: 'Feature'
        }
      ],
      type: 'feature'
    };
    const result1 = {
      restMaps: [
        {
          geometry: { type: 'Point', coordinates: [] },
          properties: {
            SmID: '1',
            SmX: '1.295350519989875E7',
            SmY: '4851338.019912067',
            SmLibTileID: '1',
            SmUserID: '0'
          },
          type: 'Feature'
        }
      ],
      type: 'restMap'
    };
    const result2 = {
      features: [
        {
          geometry: { type: 'Point', coordinates: [] },
          properties: {
            SmID: '1',
            SmX: '1.295350519989875E7',
            SmY: '4851338.019912067',
            SmLibTileID: '1',
            SmUserID: '0'
          },
          type: 'Feature'
        }
      ],
      type: 'mvt'
    };
    const result3 = {
      features: [
        {
          geometry: { type: 'Point', coordinates: [] },
          properties: {
            SmID: '1',
            SmX: '1.295350519989875E7',
            SmY: '4851338.019912067',
            SmLibTileID: '1',
            SmUserID: '0'
          },
          type: 'feature'
        }
      ],
      type: 'dataflow'
    };
    const result4 = {
      features: [
        {
          geometry: { type: 'Point', coordinates: [] },
          properties: {
            SmID: '1',
            SmX: '1.295350519989875E7',
            SmY: '4851338.019912067',
            SmLibTileID: '1',
            SmUserID: '0'
          },
          type: 'feature'
        }
      ],
      type: 'noServerId'
    };
    const layer = {
      animationSetting: {
        symbol: 'pin',
        symbolSize: 15,
        show: false,
        constantSpeed: 40
      },
      dataSource: { accessType: 'DIRECT', type: 'PORTAL_DATA', serverId: '1249258329' },
      enableFields: ['SmID', 'SmX', 'SmY', 'SmLibTileID', 'SmUserID', 'SmGeometrySize', 'SmGeoPosition', '标准名称'],
      featureType: 'POINT',
      from: {
        xField: 'SmX',
        yField: 'SmY',
        type: 'XY_FIELD'
      },
      labelSetting: {
        fontFamily: '黑体',
        color: '#62AD16',
        show: true
      },
      layerID: '北京市轨道交通站点',
      layerType: 'MIGRATION',
      lineSetting: {
        curveness: 0.2,
        color: '#792b1b',
        width: 1,
        type: 'solid',
        opacity: 0.6
      },
      name: '北京市轨道交通站点',
      projection: 'EPSG:4326',
      to: {
        xField: 'SmX',
        yField: 'SmY',
        type: 'XY_FIELD'
      },
      visible: 'visible'
    };
    const webMapBase = new WebMapBase(id, options, cloneDeep(mapOptions));
    webMapBase._initOverlayLayer = jasmine.createSpy('callback');
    const spy = webMapBase._initOverlayLayer;
    webMapBase._getLayerFeaturesSucceeded(result, layer);
    expect(spy).toHaveBeenCalledWith(layer, result.features);
    spy.calls.reset();
    webMapBase._getLayerFeaturesSucceeded(result1, layer);
    expect(spy).toHaveBeenCalledWith(layer, result1.restMaps);
    expect(layer.layerType).toBe('restMap');
    spy.calls.reset();
    webMapBase._getLayerFeaturesSucceeded(result2, layer);
    expect(spy).toHaveBeenCalledWith(layer, result2);
    expect(layer.layerType).toBe('mvt');
    spy.calls.reset();
    webMapBase._getLayerFeaturesSucceeded(result3, layer);
    expect(spy).toHaveBeenCalledWith(layer);
    spy.calls.reset();
    webMapBase._getLayerFeaturesSucceeded(result4, layer);
    expect(spy).toHaveBeenCalledWith(layer);
  });
});
