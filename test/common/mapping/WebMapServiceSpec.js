import { WebMapService } from '../../../src/common/mapping/WebMapService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

describe('WebMapServiceSpec.js', () => {
  const mapId = 123;
  const options = {
    accessKey: undefined,
    accessToken: undefined,
    excludePortalProxyUrl: undefined,
    iportalServiceProxyUrlPrefix: undefined,
    isSuperMapOnline: undefined,
    proxy: undefined,
    serverUrl: 'https://fakeiportal.supermap.io/iportal',
    target: 'map',
    tiandituKey: undefined,
    withCredentials: false
  };

  const REST_DATA_SQL_RESULT = {
    datasetInfos: [
      {
        fieldInfos: [
          {
            name: 'SmID',
            caption: 'SmID',
            type: 'INT32'
          },
          {
            name: 'NAME',
            caption: '名称',
            type: 'WTEXT'
          }
        ]
      }
    ],
    features: [
      {
        fieldNames: ['SMID', 'NAME'],
        geometry: {
          center: {
            x: 101.84004968,
            y: 26.0859968692659
          },
          type: 'POINT',
          parts: [1],
          points: [
            {
              x: 101.84004968,
              y: 26.0859968692659
            }
          ]
        },
        fieldValues: ['1', '四川省']
      }
    ]
  };

  const REST_MAP_SQL_RESULT = {
    datasetInfos: [
      {
        fieldInfos: [
          {
            name: 'SmID',
            caption: 'SmID',
            type: 'INT32'
          },
          {
            name: 'NAME',
            caption: '名称',
            type: 'WTEXT'
          }
        ]
      }
    ],
    recordsets: [
      {
        features: REST_DATA_SQL_RESULT.features,
        fieldCaptions: ['SmID', 'NAME'],
        fieldTypes: ['INT32', 'WTEXT'],
        fields: ['SmID', '名称']
      }
    ]
  };

  it('setMapId if typeof MapId is num', (done) => {
    const service = new WebMapService(mapId);
    service.setMapId(mapId);
    expect(service.mapId).toBe(mapId);
    expect(service.mapInfo).toBe(null);
    done();
  });

  it('setMapId if typeof MapId is object', () => {
    const mapId = vectorTile_style;
    const service = new WebMapService(mapId, options);
    service.setMapId(mapId);
    expect(service.mapId).toBe('');
    expect(service.mapInfo).toBe(mapId);
  });

  it('setServerUrl', () => {
    const serverUrl = 'https://fakeiportal.supermap.io';
    const service = new WebMapService(mapId, options);
    expect(service.serverUrl).toBe('https://fakeiportal.supermap.io/iportal');
    service.setServerUrl(serverUrl);
    expect(service.serverUrl).toBe(serverUrl);
  });

  it('setWithCredentials', () => {
    const withCredentials = true;
    const service = new WebMapService(mapId, options);
    expect(service.withCredentials).toBe(false);
    service.setWithCredentials(withCredentials);
    expect(service.withCredentials).toBe(true);
  });

  it('setProxy', () => {
    const proxy = 'https://fakeiportal.supermap.io/iportal';
    const service = new WebMapService(mapId, options);
    expect(service.proxy).toBe(undefined);
    service.setProxy(proxy);
    expect(service.proxy).toBe(proxy);
  });

  it('ServerUrl has "/" at the end', () => {
    const serverUrl = 'https://fakeiportal.supermap.io/iportal';
    const service = new WebMapService(mapId, options);
    service.handleServerUrl(serverUrl);
    expect(service.serverUrl).toBe('https://fakeiportal.supermap.io/iportal/');
  });

  it('get MapInfo by mapId', (done) => {
    const newOptions = {
      ...options,
      serverUrl: 'https://fakeiportal.supermap.io/iportal/8095/portalproxy/' // 没有通过处理在末尾加 '/',在此处理
    };
    const newIportal_serviceProxy = {
      serviceProxy: {
        ...iportal_serviceProxy.serviceProxy,
        proxyServerRootUrl: undefined
      }
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(datavizWebMap_MVT)));
      }
      return Promise.resolve(new Response(JSON.stringify(newIportal_serviceProxy)));
    });
    const newUniqueLayer_polygon = {
      ...datavizWebMap_MVT,
      mapParams: {
        title: datavizWebMap_MVT.title,
        description: datavizWebMap_MVT.description
      }
    };
    const service = new WebMapService(mapId, newOptions);
    service.getMapInfo().then((mapInfo) => {
      expect(mapInfo).toEqual(newUniqueLayer_polygon);
      done();
    });
  });

  it('fail to get MapInfo by mapId', (done) => {
    const options = {
      ...options,
      serverUrl: 'https://fakeiportal.supermap.io/iportal/' // 没有通过处理在末尾加 '/',在此处理
    };
    const errorMsg = '未匹配到https://fakeiportal.supermap.io/iportal/web/maps/123/map.json';
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        return Promise.reject(errorMsg);
      }
      return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
    });
    const service = new WebMapService(mapId, options);
    service.getMapInfo().catch((error) => {
      expect(error).toBe(errorMsg);
      done();
    });
  });

  it('get the wrong iPortal service proxy', (done) => {
    const options = {
      ...options,
      serverUrl: 'https://fakeiportal.supermap.io/iportal/'
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    const service = new WebMapService(mapId, options);
    service.getMapInfo().catch((error) => {
      expect(error).toBe('serviceProxyFailed');
      done();
    });
  });

  it('fail to get iPortal service proxy', (done) => {
    const newOptions = {
      ...options,
      serverUrl: 'https://fakeiportal.supermap.io/iportal/' // 没有通过处理在末尾加 '/',在此处理
    };
    const errorMsg = '未匹配到https://fakeiportal.supermap.io/iportal/web/config/portal.json';
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.reject(errorMsg);
    });
    const service = new WebMapService(mapId, newOptions);
    service.getMapInfo().catch((error) => {
      expect(error).toBe('未匹配到https://fakeiportal.supermap.io/iportal/web/config/portal.json');
      done();
    });
  });

  it('get Layer Features from GeoJson Data', (done) => {
    const newOptions = {
      ...options,
      iportalServiceProxyUrlPrefix: 'https://fakeiportal.supermap.io/',
      proxy: 'https://fakeiportal.supermap.io/iportal',
      serverUrl: 'https://fakeiportal.supermap.io/iportal/' // 没有通过处理在末尾加 '/',在此处理
    };
    const JsonData = {
      content: JSON.stringify({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              icon: 'theatre1'
            },
            geometry: {
              type: 'Point',
              coordinates: [-77.038659, 38.931567]
            }
          }
        ]
      }),
      fileName: '北京市.geojson',
      lineNumber: null,
      type: 'GEOJSON'
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(JsonData)));
    });
    const type = 'hosted';
    const layer = {
      dataSource: {
        serverId: '123',
        accessType: 'DIRECT'
      }
    };
    const baseProjection = 'EPSG:3857';
    const service = new WebMapService(mapId, newOptions);
    service.getLayerFeatures(type, layer, baseProjection).then((data) => {
      expect(data.features.length).toBe(1);
      done();
    });
  });

  it('get Layer Features from CSV', (done) => {
    const newOptions = {
      ...options,
      proxy: 'https://fakeiportal.supermap.io/iportal/',
      serverUrl: 'https://fakeiportal.supermap.io/iportal/' // 没有通过处理在末尾加 '/',在此处理
    };
    const testCsvData =
      '{"fileName":"民航数据.csv","type":"CSV","lineNumber":222,"content":{"colTitles":["latitude","longitude","altitude","geometry","机场","X坐标","Y坐标","名次","2017旅客吞吐量（人次）","2016旅客吞吐量（人次）","同比增速%","张家界"],"rows":[["40.07108","116.588918","","Point","北京/首都","116.588918","40.07108","1","95786296 ","94393454 ","-1.5","94393454 "],["40.07108","116.588918","","Point","北京/首都","116.588918","40.07108","","95786296 ","94393454 ","-1.5","94393454 "]]}}';
    const administrative_data = `window.MunicipalData = {
      features: [{
        geometry: {
          coordinates: [[[[113.5872766800001, 22.16493972869857], [113.5980630750001, 22.13509586869991]]], [[[113.5511133950001, 22.21679186869615], [113.5623058550001, 22.1994578386969]]]],
          type: 'MultiPolygon'
        },
        properties: { Name: '张家界', UserID: 0 },
        type: 'Feature'
      }]
    }`;
    window.ProvinceData = {
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
          properties: { Name: '张家界', UserID: 0, Province: '湖南' },
          type: 'Feature'
        }
      ],
      type: 'FeatureCollection'
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.includes('/MunicipalData')) {
        return Promise.resolve(new Response(administrative_data));
      }
      return Promise.resolve(new Response(testCsvData));
    });
    const type = 'hosted';
    const layer = {
      dataSource: {
        serverId: '123',
        administrativeInfo: {
          divisionType: 'City',
          divisionField: '张家界'
        }
      }
    };
    const baseProjection = 'EPSG:3857';
    const service = new WebMapService(mapId, newOptions);
    service.getLayerFeatures(type, layer, baseProjection).then((data) => {
      expect(data.features.length).toBe(1);
      done();
    });
  });

  it('get Layer Features from shp Data', (done) => {
    const newOptions = {
      ...options,
      proxy: 'https://fakeiportal.supermap.io/iportal/',
      serverUrl: 'https://fakeiportal.supermap.io/iportal/' // 没有通过处理在末尾加 '/',在此处理
    };
    const ShpData = {
      content: JSON.stringify({
        layers: [
          {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  icon: 'theatre1'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [-77.038659, 38.931567]
                }
              }
            ]
          }
        ]
      }),
      fileName: '北京市.shp',
      lineNumber: null,
      type: 'SHP'
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(ShpData)));
    });
    const type = 'hosted';
    const layer = {
      dataSource: {
        serverId: '123',
        accessType: 'DIRECT'
      }
    };
    const baseProjection = 'EPSG:3857';
    const service = new WebMapService(mapId, newOptions);
    service.getLayerFeatures(type, layer, baseProjection).then((data) => {
      expect(data.features.length).toBe(1);
      done();
    });
  });

  it('get Layer Features from mvt', (done) => {
    const newOptions = {
      ...options,
      proxy: 'https://fakeiportal.supermap.io/iportal/',
      serverUrl: 'https://fakeiportal.supermap.io/iportal/' // 没有通过处理在末尾加 '/',在此处理
    };
    const result = [
      {
        name: 'test',
        type: 'FeatureCollection'
      }
    ];
    const result1 = {
      fileId: 'test',
      datasetName: 'test',
      dataItemServices: [
        {
          serviceType: 'RESTDATA',
          address: 'https://fakeiportal.supermap.io/iportal/'
        }
      ]
    };
    const datasource = {
      code: 200,
      datasourceNames: ['captial']
    };
    const datasetsInfo = {
      datasetInfo: {
        prjCoordSys: {
          epsgCode: '3857'
        },
        bounds: [0, 1, 0, 1]
      }
    };
    const result2 = {
      error: {
        code: 400
      }
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.includes('/web/datas/123/datasets')) {
        return Promise.resolve(new Response(JSON.stringify(result)));
      }
      if (url.includes('/web/datas/123')) {
        return Promise.resolve(new Response(JSON.stringify(result1)));
      }
      if (url.includes('/data/datasources/captial/datasets/test?parentResType=MAP&parentResId=123/tilefeature.mvt')) {
        return Promise.resolve(new Response(JSON.stringify(result2)));
      }
      if (url.includes('/data/datasources/captial/datasets/test?parentResType=MAP&parentResId=123')) {
        return Promise.resolve(new Response(JSON.stringify(datasetsInfo)));
      }
      return Promise.resolve(new Response(JSON.stringify(datasource)));
    });
    const type = 'hosted';
    const layer = {
      serverId: '123',
      layerType: 'HOSTED_TILE'
    };
    const baseProjection = 'EPSG:3857';
    const service = new WebMapService(mapId, newOptions);
    service.getLayerFeatures(type, layer, baseProjection).then((data) => {
      expect(data.type).toBe('mvt');
      done();
    });
  });

  it('get Layer Features if LayerInfo from rest_data success', (done) => {
    const type = 'rest_data';
    const layer = {
      dataSource: {
        url: 'https://fakeiportal.supermap.io/iportal/processCompleted'
      },
      enableFields: ['latitude']
    };
    const baseProjection = 'EPSG:3857';
    const result = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            SMID: '1',
            NAME: '四川省'
          },
          geometry: {
            type: 'Point',
            coordinates: [101.84004968, 26.0859968692659]
          }
        }
      ]
    };
    spyOn(FetchRequest, 'post').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(REST_DATA_SQL_RESULT)));
    });
    const service = new WebMapService(mapId, options);
    service.getLayerFeatures(type, layer, baseProjection).then((data) => {
      expect(data.features[0].geometry).toEqual(result.features[0].geometry);
      done();
    });
  });

  it('features will apply caption field when with caption config', (done) => {
    const type = 'rest_data';
    const layer = {
      dataSource: {
        url: 'https://fakeiportal.supermap.io/iportal/processCompleted'
      },
      enableFields: ['latitude']
    };
    spyOn(FetchRequest, 'post').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(REST_DATA_SQL_RESULT)));
    });
    const baseProjection = 'EPSG:3857';
    const service = new WebMapService(mapId, options);
    service.getLayerFeatures(type, layer, baseProjection).then((data) => {
      expect(data.features[0].properties['名称']).toBe('四川省');
      done();
    });
  });

  it('get layer features if layerInfo from rest_data fail', (done) => {
    const type = 'rest_data';
    const layer = {
      dataSource: {
        url: 'https://fakeiportal.supermap.io/iportal/processFailed'
      },
      enableFields: ['latitude']
    };
    spyOn(FetchRequest, 'post').and.callFake(() => {
      return Promise.reject('get features faild');
    });
    const baseProjection = 'EPSG:4326';
    const service = new WebMapService(mapId, options);
    service.getLayerFeatures(type, layer, baseProjection).catch((error) => {
      expect(error.error).toBe('get features faild');
      done();
    });
  });

  it('get layer empty features if layerInfo from rest_data', (done) => {
    const type = 'rest_data';
    const layer = {
      dataSource: {
        url: 'https://fakeiportal.supermap.io/iportal/processFailed'
      },
      enableFields: ['latitude']
    };
    spyOn(FetchRequest, 'post').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify({ data: '404' })));
    });
    const baseProjection = 'EPSG:4326';
    const service = new WebMapService(mapId, options);
    service.getLayerFeatures(type, layer, baseProjection).catch((error) => {
      expect(error).toBe('features must be valid');
      done();
    });
  });

  it('get Layer Features if LayerInfo from rest_map success', (done) => {
    const type = 'rest_map';
    const layer = {
      dataSource: {
        url: 'https://fakeiportal.supermap.io/iportal/processCompleted'
      },
      enableFields: ['latitude']
    };
    const baseProjection = 'EPSG:3857';
    const result = {
      features: [
        {
          geometry: { coordinates: [101.84004968, 26.0859968692659], type: 'Point' },
          properties: { NAME: '四川省', SMID: '1', index: '0', lat: 26.0859968692659, lon: 101.84004968 },
          type: 'Feature'
        }
      ],
      type: 'feature'
    };
    spyOn(FetchRequest, 'post').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(REST_MAP_SQL_RESULT)));
    });
    const service = new WebMapService(mapId, options);
    service.getLayerFeatures(type, layer, baseProjection).then((data) => {
      expect(data).toEqual(result);
      done();
    });
  });

  it('get layer features if layerInfo from rest_map fail', (done) => {
    const type = 'rest_map';
    const layer = {
      dataSource: {
        url: 'https://fakeiportal.supermap.io/iportal/processFailed'
      },
      enableFields: ['latitude']
    };
    spyOn(FetchRequest, 'post').and.callFake(() => {
      return Promise.reject('get features faild');
    });
    const baseProjection = 'EPSG:4326';
    const service = new WebMapService(mapId, options);
    service.getLayerFeatures(type, layer, baseProjection).catch((error) => {
      expect(error.error).toBe('get features faild');
      done();
    });
  });

  it('get layer features if LayerInfo from dataflow success', (done) => {
    const res = {
      featureMetaData: {
        featureType: 'Point',
        fieldInfos: [
          {
            name: 'text',
            type: 'TEXT'
          },
          {
            name: 'long',
            type: 'LONG'
          },
          {
            name: 'numberw',
            type: 'Number'
          }
        ]
      },
      urls: [
        {
          url: 'https://fakeiportal.supermap.io/iserver/services/dataflow'
        }
      ]
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(res)));
    });
    const type = 'dataflow';
    const layer = {
      dataSource: {
        dataTypes: {}
      },
      url: 'https://fakeiportal.supermap.io/iportal/processCompleted',
      credential: {
        token: '123'
      }
    };
    const baseProjection = 'EPSG:1000';
    const result = { type: 'dataflow' };
    const service = new WebMapService(mapId, options);
    service.getLayerFeatures(type, layer, baseProjection).then((data) => {
      expect(data).toEqual(result);
      done();
    });
  });

  it('get layer features if LayerInfo from dataflow fail', (done) => {
    const type = 'dataflow';
    const layer = {
      dataSource: {
        dataTypes: {}
      },
      url: 'https://fakeiportal.supermap.io/iportal/processFailed',
      credential: {
        token: '123'
      }
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.reject('get features faild');
    });
    const baseProjection = 'EPSG:1000';
    const service = new WebMapService(mapId, options);
    service.getLayerFeatures(type, layer, baseProjection).catch((error) => {
      expect(error).toBeUndefined();
      done();
    });
  });

  it('get layer features if LayerInfo from user_data success', (done) => {
    const returnData = {
      features: [
        {
          geometry: { coordinates: [101.84004968, 26.0859968692659], type: 'Point' },
          properties: { NAME: '四川省', SMID: '1', index: '0', lat: 26.0859968692659, lon: 101.84004968 },
          type: 'Feature'
        }
      ],
      type: 'FeatureCollection'
    };
    const result = { type: 'feature', features: returnData.features };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(returnData)));
    });
    const type = 'user_data';
    const layer = {
      dataSource: {
        url: 'https://fakeiportal.supermap.io/iportal'
      },
      enableFields: ['latitude']
    };
    const baseProjection = 'EPSG:3857';
    const service = new WebMapService(mapId, options);
    service.getLayerFeatures(type, layer, baseProjection).then((data) => {
      expect(data).toEqual(result);
      done();
    });
  });

  it('getWmsInfo', done => {
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(wmsCapabilitiesText));
    });
    const layerInfo = {
      layerID: 'China',
      layerType: 'WMS',
      layers: ['0'],
      name: 'China',
      url: 'https://fakeiportal.supermap.io/iportal?',
      visible: true
    };
    const service = new WebMapService(mapId, options);
    service.getWmsInfo(layerInfo).then(data => {
      expect(data).toEqual({ version: '1.1.1' });
      done();
    });
  });

  it('getWmtsInfo', done => {
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(wmtsCapabilitiesText));
    });
    const layerInfo = {
      layer: 'ChinaDark',
      layerID: 'China',
      layerType: 'WMS',
      layers: ['0'],
      name: 'China',
      url: 'https://fakeiportal.supermap.io/iportal?',
      visible: true
    };
    const mapCRS = {};
    const service = new WebMapService(mapId, options);
    service.getWmtsInfo(layerInfo, mapCRS).then(data => {
      expect(data.kvpResourceUrl).toBe('http://fakeiserver.supermap.io/iserver/services/map-china400/wmts-china?');
      done();
    });
  });

  it('getWmtsInfo without Layer', done => {
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(wmtsInfoCustom));
    });
    const layerInfo = {
      layer: 'ChinaDark',
      layerID: 'China',
      layerType: 'WMS',
      layers: ['0'],
      name: 'China',
      url: 'https://fakeiportal.supermap.io/iportal?',
      visible: true
    };
    const mapCRS = {};
    const service = new WebMapService(mapId, options);
    service.getWmtsInfo(layerInfo, mapCRS).then(data => {
      expect(data.kvpResourceUrl).toBe('');
      done();
    });
  });

  it('getWmtsInfo someTileMatrixOK', done => {
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(wmtsCapabilitiesOthertileMatrixSet));
    });
    const layerInfo = {
      dpi: 90.7142857142857,
      layer: 'images_2022_0.5',
      layerType: 'WMTS',
      name: 'images_2022_0.5',
      requestEncoding: 'KVP',
      tileMatrixSet: 'tianditu',
      url: 'http://fake:8090/wmts',
      visible: true
    };
    const mapCRS = {};
    const service = new WebMapService(mapId, options);
    service.getWmtsInfo(layerInfo, mapCRS).then(data => {
      expect(data.matchMaxZoom).toBe(22);
      expect(data.matchMinZoom).toBe(1);
      done();
    });
  });

  it('getWmtsInfo someTileMatrixOK2', done => {
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(wmtsCapabilitiesOthertileMatrixSet));
    });
    const layerInfo = {
      dpi: 90.7142857142857,
      layer: 'images_2022_0.5',
      layerType: 'WMTS',
      name: 'images_2022_0.5',
      requestEncoding: 'KVP',
      tileMatrixSet: 'tianditu1',
      url: 'http://fake:8090/wmts',
      visible: true
    };
    const mapCRS = {};
    const service = new WebMapService(mapId, options);
    service.getWmtsInfo(layerInfo, mapCRS).then(data => {
      expect(data.matchMaxZoom).toBe(7);
      expect(data.matchMinZoom).toBe(1);
      done();
    });
  });

  it('getWmtsInfo noTileMatrixOK', done => {
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(wmtsCapabilitiesOthertileMatrixSet));
    });
    const layerInfo = {
      dpi: 90.7142857142857,
      layer: 'images_2022_0.5',
      layerType: 'WMTS',
      name: 'images_2022_0.5',
      requestEncoding: 'KVP',
      tileMatrixSet: 'default028mm',
      url: 'http://fake:8090/wmts',
      visible: true
    };
    const mapCRS = {};
    const service = new WebMapService(mapId, options);
    service.getWmtsInfo(layerInfo, mapCRS).catch(error => {
      expect(error.message).toBe('TileMatrixSetNotSuppport');
      done();
    });
  });

  it('getWmtsInfo_single_property', done => {
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(wmtsCapabilitiesTextWithSingleProperty));
    });
    const layerInfo = {
      layer: 'ChinaDark',
      layerID: 'China',
      layerType: 'WMS',
      layers: ['0'],
      name: 'China',
      url: 'https://fakeiportal.supermap.io/iportal?',
      visible: true
    };
    const mapCRS = {};
    const service = new WebMapService(mapId, options);
    service.getWmtsInfo(layerInfo, mapCRS).then(data => {
      expect(data.kvpResourceUrl).toBe('http://fakeiserver.supermap.io/iserver/services/map-china400/wmts-china?');
      done();
    });
  });

  it('get datasource on rest_data type', () => {
    const layer = {
      dataSource: { accessType: 'DIRECT', type: 'REST_DATA' }
    };
    const service = new WebMapService(mapId, options);
    expect(service.getDatasourceType(layer)).toBe('rest_data');
  });
  
  it('get datasource on rest_map type', () => {
    const layer = {
      dataSource: { accessType: 'DIRECT', type: 'REST_MAP', url: '123' }
    };
    const service = new WebMapService(mapId, options);
    expect(service.getDatasourceType(layer)).toBe('rest_map');
  });

  it('get datasource on dataflow type', () => {
    const layer = {
      layerType: 'DATAFLOW_HEAT'
    };
    const service = new WebMapService(mapId, options);
    expect(service.getDatasourceType(layer)).toBe('dataflow');
  });

  it('get datasource on user_data type', () => {
    const layer = {
      dataSource: { type: 'USER_DATA' }
    };
    const service = new WebMapService(mapId, options);
    expect(service.getDatasourceType(layer)).toBe('user_data');
  });

  it('get Layer Features from rest_data and dataSource is Chinese', done => {
    spyOn(FetchRequest, 'post').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(REST_DATA_SQL_RESULT)));
    });
    const type = 'rest_data';
    const layer = {
      dataSource: {
        "type": "REST_DATA",
        "url": "https://fakeiportal.supermap.io/iportal/portalproxy/98587ae90bec41bd/iserver/services/data-ZhongGuoDiTu/rest/data",
        "dataSourceName": "%E4%B8%AD%E5%9B%BD%E7%9F%A2%E9%87%8F%E6%95%B0%E6%8D%AE:飞机场"
      },
      enableFields: ['latitude']
    };
    const baseProjection = 'EPSG:3857';
    const service = new WebMapService(mapId, options);
    const spy = spyOn(service, '_getFeatureBySQL').and.callThrough();;
    service.getLayerFeatures(type, layer, baseProjection).then(() => {
      const params = spy.calls.allArgs()[0];
      expect(params[0]).toBe(layer.dataSource.url);
      expect(params[1]).toEqual(["中国矢量数据:飞机场"]);
      expect(params[4]).toEqual(baseProjection);
      done();
    });
  });

  it('handleWithCredentials', (done) => {
    const mapId = vectorTile_style;
    const service = new WebMapService(mapId, { ...options, iportalServiceProxyUrlPrefix: 'https://fakeiportal.supermap.io/portalproxy' });
    expect(service.handleWithCredentials(null, 'https://www.supermapol.com/url', true)).toBe('');
    const url = 'http://fakeurl';
    expect(service.handleWithCredentials('https://fakeiportal.supermap.io/iportal/proxy', null, false)).toBeTruthy();
    expect(service.handleWithCredentials('https://fakeiportal.supermap.io/iportal/proxy', 'https://fakeiportal.supermap.io/iportal/proxy/url', false)).toBeTruthy();
    expect(service.handleWithCredentials('https://fakeiportal/proxy', null, true)).toBeTruthy();
    expect(service.handleWithCredentials(null, 'https://fakeiportal.supermap.io/portalproxy/url', false)).toBeTruthy();
    expect(service.handleWithCredentials(null, url, true)).toBeTruthy();
    expect(service.handleWithCredentials(null, url)).toBeFalsy();
    done();
  });
});
