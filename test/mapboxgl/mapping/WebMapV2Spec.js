import mapboxgl from 'mapbox-gl';
import mbglmap, { CRS } from '../../tool/mock_mapboxgl_map';
import { WebMap } from '../../../src/mapboxgl/mapping/WebMap';
import * as MapManagerUtil from '../../../src/mapboxgl/mapping/webmap/MapManager';
import { ArrayStatistic } from '@supermapgis/iclient-common/util/ArrayStatistic';
import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest';
import '../../resources/WebMapV5.js';

window.jsonsql = { query: () => [{}] };

window.canvg = {
  default: {
    from: (ctx, url, callback) =>
      Promise.resolve({ stop: jasmine.createSpy('stop'), start: jasmine.createSpy('start') })
  }
};

window.geostats = class {
  setSerie() {}
};

window.EchartsLayer = class {
  constructor() {
    this.chart = {
      setOption() {}
    };
  }
};

function DataFlowService(serviceUrl) {
  const dataflowFeature = {
    geometry: {
      type: 'Point',
      coordinates: [116.588918, 40.07108]
    },
    properties: {
      id: 1
    }
  };
  const dataflowData = JSON.stringify(dataflowFeature);
  this.initBroadcast = () => {
    return this;
  };
  this.broadcast = () => {
    return this;
  };
  this.initSubscribe = () => {
    return {
      on: (event, callback) => {
        if (event === 'messageSucceeded') {
          if (serviceUrl.includes('MultiLineString')) {
            callback({
              featureResult: {
                geometry: {
                  type: 'MultiLineString',
                  coordinates: [
                    [
                      [0, 0],
                      [10, 10]
                    ]
                  ]
                },
                properties: {
                  id: 1
                }
              }
            });
          } else if (serviceUrl.includes('LineString')) {
            callback({
              featureResult: {
                geometry: {
                  type: 'LineString',
                  coordinates: [
                    [0, 0],
                    [10, 10]
                  ]
                },
                properties: {
                  id: 1
                }
              }
            });
          } else if (serviceUrl.includes('Line')) {
            callback({
              featureResult: {
                geometry: {
                  type: 'Line',
                  coordinates: [
                    [0, 0],
                    [10, 10]
                  ]
                },
                properties: {
                  id: 1
                }
              }
            });
          } else if (serviceUrl.includes('MultiPolygon')) {
            callback({
              featureResult: {
                geometry: {
                  type: 'MultiPolygon',
                  coordinates: [
                    [
                      [0, 0],
                      [10, 10],
                      [20, 20],
                      [0, 0]
                    ]
                  ]
                },
                properties: {
                  id: 1
                }
              }
            });
          } else if (serviceUrl.includes('Polygon')) {
            callback({
              featureResult: {
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [0, 0],
                      [10, 10],
                      [20, 20],
                      [0, 0]
                    ]
                  ]
                },
                properties: {
                  id: 1
                }
              }
            });
          } else {
            callback({
              featureResult: {
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0]
                },
                properties: {
                  id: 1
                }
              },
              data: dataflowData
            });
          }
        } else {
          callback();
        }
      },
      off: () => {}
    };
  };
  this.setExcludeField = () => {};
  this.on = (event, callback) => {
    callback();
  };
}

describe('mapboxgl_WebMapV2', () => {
  var originalTimeout, testDiv;
  var server = 'http://fack:8190/iportal/';
  var id = 1788054202;
  var datavizWebmap;
  var commonMap;
  var layerIdMapList = {};
  var sourceIdMapList = {};
  var commonOption = {
    accessKey: undefined,
    accessToken: undefined,
    excludePortalProxyUrl: undefined,
    iportalServiceProxyUrlPrefix: undefined,
    isSuperMapOnline: undefined,
    proxy: undefined,
    server: 'http://fack:8190/iportal/',
    target: 'map',
    tiandituKey: undefined,
    withCredentials: false
  };
  var commonMapOptions = {
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
  beforeEach(() => {
    spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    mapboxgl.CRS = CRS;
    commonMap = {
      style: {},
      resize: jasmine.createSpy('resize').and.callFake(() => {}),
      getZoom: () => {
        return 2;
      },
      setZoom: jasmine.createSpy('setZoom').and.callFake(() => {}),
      setCRS: jasmine.createSpy('setCRS').and.callFake(() => {}),
      getCenter: () => {
        return {
          lng: 1,
          lat: 2
        };
      },
      setCenter: jasmine.createSpy('setCenter').and.callFake(() => {}),
      getBearing: () => 2,
      setBearing: jasmine.createSpy('setBearing').and.callFake(() => {}),
      getPitch: () => 2,
      setPitch: jasmine.createSpy('setPitch').and.callFake(() => {}),
      getStyle: () => {
        let layers = [];
        if (layerIdMapList) {
          for (const key in layerIdMapList) {
            layers.push(layerIdMapList[key]);
          }
        }
        return {
          sources: sourceIdMapList,
          layers
        };
      },
      addSource: (sourceId, sourceInfo) => {
        sourceIdMapList[sourceId] = sourceInfo;
        if (sourceInfo.type === 'geojson') {
          sourceIdMapList[sourceId]._data = sourceInfo.data;
          sourceIdMapList[sourceId].setData = (function (sourceId) {
            return function (data) {
              sourceIdMapList[sourceId]._data = data;
            };
          })(sourceId);
        }
        if (sourceInfo.type === 'raster' && sourceInfo.rasterSource === 'iserver') {
          sourceIdMapList[sourceId].clearTiles = jasmine.createSpy('test').and.callFake(() => {});
          sourceIdMapList[sourceId].update = jasmine.createSpy('update').and.callFake(() => {});
        }
      },
      getSource: (sourceId) => {
        return sourceIdMapList[sourceId];
      },
      removeSource: (sourceId) => {
        delete sourceIdMapList[sourceId];
      },
      triggerRepaint: jasmine.createSpy('triggerRepaint').and.callFake(() => {}),
      style: {
        sourceCaches: sourceIdMapList
      },
      getLayer: (layerId) => {
        return layerIdMapList[layerId];
      },
      removeLayer: (layerId) => {
        delete layerIdMapList[layerId];
      },
      getCRS: () => {
        return {
          epsgCode: 'EPSG:3857',
          getExtent: () => jasmine.createSpy('getExtent')
        };
      },
      getAppreciableLayers: () => {
        return Object.values(layerIdMapList);
      },
      addLayer: (layerInfo) => {
        layerIdMapList[layerInfo.id] = layerInfo;
        if (typeof layerInfo.source === 'object') {
          const source = Object.assign({}, layerInfo.source);
          layerIdMapList[layerInfo.id].source = layerInfo.id;
          commonMap.addSource(layerInfo.id, source);
        }
        if (commonMap.style) {
          if (!commonMap.style._layers) {
            commonMap.style._layers = {};
          }
          commonMap.style._layers[layerInfo.id] = layerIdMapList[layerInfo.id];
        }
      },
      moveLayer: jasmine.createSpy('moveLayer').and.callFake(() => {}),
      overlayLayersManager: {},
      on: () => {},
      off: () => {},
      fire: () => {},
      setLayoutProperty: jasmine.createSpy('setLayoutProperty').and.callFake(() => {}),
      setPaintProperty: jasmine.createSpy('test'),
      addStyle: jasmine.createSpy('addStyle').and.callFake(() => {}),
      remove: jasmine.createSpy('remove').and.callFake(() => {}),
      setRenderWorldCopies: jasmine.createSpy('setRenderWorldCopies').and.callFake(() => {}),
      setStyle: jasmine.createSpy('setStyle').and.callFake(() => {}),
      loadImage: function (src, callback) {
        callback(null, { width: 15 });
      },
      addImage: function () {},
      hasImage: function () {
        return false;
      }
    };
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
    if (datavizWebmap) {
      datavizWebmap.clean();
      datavizWebmap.map = null;
      datavizWebmap = null;
    }
    sourceIdMapList = {};
    layerIdMapList = {};
    commonMap.style.sourceCaches = sourceIdMapList;
    window.document.body.removeChild(testDiv);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    mapboxgl.CRS = undefined;
  });

  it('test baseLayer layers count maploaded', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(webmap_MAPBOXSTYLE_Tile)));
      }
      if (url.indexOf('maps/China_4326/style.json') > -1) {
        return Promise.resolve(new Response(styleJson));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(id, {
      server: server
    });
    datavizWebmap.on('addlayerssucceeded', (data) => {
      expect(data.map.addStyle).toHaveBeenCalledTimes(1);
      const mvtStyleData = JSON.parse(styleJson);
      const sourceLayers = mvtStyleData.layers
        .filter((item) => item.type !== 'background')
        .map((item) => item['source-layer']);
      expect(datavizWebmap.getAppreciableLayers().length).toBe(Array.from(new Set(sourceLayers)).length + 1);
      done();
    });
  });

  it('add uniqueLayer with id is num', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      } else if (url.indexOf('datas/1960447494/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('datas/144371940/content.json')) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      }
    });
    datavizWebmap = new WebMap(id, {
      server: server
    });
    const callback = function () {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(uniqueLayer_polygon.layers.length + 1);
      datavizWebmap.getAppreciableLayers().forEach((item) => {
        expect(item.renderLayers.length).toBeGreaterThanOrEqual(1);
      });
      expect(
        datavizWebmap.map.getStyle().layers.find((item) => {
          return item.type === 'fill';
        }).paint['fill-opacity']
      ).toBe(1);
      expect(
        datavizWebmap.map.getStyle().layers.find((item) => {
          return item.type === 'fill';
        }).paint['fill-color'][3]
      ).toBe('rgba(213,62,79,0.9000)');
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('_getMapCenter 4490', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(raster4490));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(
      id,
      {
        target: 'map',
        serverUrl: 'http://fake/fakeiportal',
        withCredentials: false
      },
      {
        style: {
          version: 8,
          sources: {},
          layers: []
        }
      }
    );
    datavizWebmap.on('addlayerssucceeded', ({ map }) => {
      const center = map.getCenter();
      expect(center.lat).toEqual(44);
      expect(center.lng).toEqual(129);
      done();
    });
  });

  it('add uniqueLayer point', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('datas/676516522/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('datas/13136933/content.json')) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
      }
    });
    const id = {
      ...uniqueLayer_point,
      level: '',
      visibleExtent: [0, 1, 2, 3]
    };
    datavizWebmap = new WebMap(id, {
      server: server
    });
    const callback = function (data) {
      expect(data.map).not.toBeUndefined();
      expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add vectorLayer_polygon', (done) => {
    const id = vectorLayer_polygon;
    datavizWebmap = new WebMap(id, { ...commonOption });
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add heatLayer', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1920557079/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      return Promise.resolve();
    });
    const id = heatLayer;
    datavizWebmap = new WebMap(id, { ...commonOption });
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add rangeLayer', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1171594968/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      return Promise.resolve();
    });
    const id = rangeLayer;
    const callback = function (data) {
      datavizWebmap.setZoom(2);
      datavizWebmap.map.getZoom = function () {
        return 2;
      };
      datavizWebmap.map.fire('zoomend');
      datavizWebmap.setZoom(5);
      datavizWebmap.map.getZoom = function () {
        return 5;
      };
      datavizWebmap.map.fire('zoomend');
      expect(data).not.toBeUndefined();
      done();
    };
    datavizWebmap = new WebMap(id, { ...commonOption });
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('setRenderWorldCopies', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      } else if (url.indexOf('datas/1960447494/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('datas/144371940/content.json')) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      }
    });
    datavizWebmap = new WebMap(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
    datavizWebmap.on('addlayerssucceeded', (data) => {
      expect(data.map.setRenderWorldCopies).not.toHaveBeenCalled();
      datavizWebmap.setRenderWorldCopies(true);
      expect(data.map.setRenderWorldCopies).toHaveBeenCalled();
      done();
    });
  });

  it('getFilterFeatures 2020年人口总数', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('web/maps/test/map.json') > -1) {
        return Promise.resolve(new Response(raster4490));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(
      'test',
      {
        target: 'map',
        serverUrl: 'http://fake/fakeiportal',
        withCredentials: false
      },
      {
        style: {
          version: 8,
          sources: {},
          layers: []
        }
      }
    );

    datavizWebmap.on('addlayerssucceeded', () => {
      datavizWebmap._handler._updateDataFlowFeature = jasmine.createSpy('test');
      datavizWebmap._handler._handleDataflowFeatures(
        {
          filterCondition: '2020年人口总数>10',
          pointStyle: {
            fillColor: '#ee4d5a',
            strokeWidth: 1,
            fillOpacity: 0.9,
            radius: 8,
            strokeColor: '#ffffff',
            type: 'BASIC_POINT',
            strokeOpacity: 1
          },
          layerID: 'test-empty'
        },
        { data: JSON.stringify({ properties: { '2020年人口总数': 15 } }) }
      );
      const res = datavizWebmap._handler.getFilterFeatures('2020年人口总数>10', [
        { properties: { '2020年人口总数': 15 } }
      ]);
      expect(res.length).toBe(1);
      const res1 = datavizWebmap._handler.getFilterFeatures('气压传感器海拔高度（米）>2000', [
        { properties: { '气压传感器海拔高度（米）': 15 } }
      ]);
      expect(res1.length).toBe(1);
      done();
    });
  });

  it('request wkt info with EPSFG Prefix and test visibleExtend', (done) => {
    const epsgeCode = 'EPSG:1000';
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('datas/676516522/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('datas/13136933/content.json')) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
      } else if (url.indexOf('rest/maps/ChinaDark/prjCoordSys.wkt')) {
        return Promise.resolve(new Response(epsgeCode));
      } else if (url.indexOf('rest/maps/ChinaDark.json')) {
        return Promise.resolve(new Response(mapJson));
      }
    });
    const mapOptions = {
      ...commonMapOptions,
      bounds: undefined,
      interactive: true,
      minZoom: 22,
      maxZoom: 0
    };
    const errorSpy = spyOn(console, 'error').and.callFake(() => {});
    datavizWebmap = new WebMap(uniqueLayer_point, { ...commonOption, map: commonMap }, mapOptions);
    datavizWebmap.on('addlayerssucceeded', () => {
      expect(errorSpy.calls.count()).toBe(0);
      done();
    });
  });

  it('request wkt info and visibleExtend without EPSFG Prefix ', (done) => {
    const epsgeCode =
      'PROJCS["Google Maps Global Mercator",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]],PROJECTION["Mercator_2SP"],PARAMETER["standard_parallel_1",0],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",0],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AXIS["Northing", "NORTH"],AXIS["Easting", "EAST"],UNIT["Meter",1],EXTENSION["PROJ4","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"],AUTHORITY["EPSG","900913"]]';
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/676516522/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('web/datas/13136933/content.json')) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
      }
    });
    const id = { ...uniqueLayer_point, projection: epsgeCode };
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
      done();
    };
    datavizWebmap = new WebMap(id, { ...commonOption });
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('layerType is VECTOR and multi style points', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1920557079/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('web/datas/13136933/content.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
      }
      return Promise.resolve();
    });
    const id = vectorLayer_point;
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
      done();
    };
    datavizWebmap = new WebMap(id, { ...commonOption, map: commonMap }, undefined);
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('test getSource is empty', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1920557079/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      return Promise.resolve();
    });
    const style = vectorLayer_line.layers[0].style;
    const roadId = {
      ...vectorLayer_line,
      layers: [
        {
          ...vectorLayer_line.layers[0],
          style: [style, style]
        }
      ]
    };
    const mapOptions = undefined;
    const map = {
      ...commonMap,
      getSource: () => ''
    };
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(roadId.layers.length + 1);
      done();
    };
    datavizWebmap = new WebMap(roadId, { ...commonOption }, mapOptions, map);
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add vectorLayer_line subway and set dash style', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1920557079/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      return Promise.resolve();
    });
    const style = vectorLayer_line.layers[0].style;
    const subwayId = {
      ...vectorLayer_line,
      layers: [
        {
          ...vectorLayer_line.layers[0],
          style: [
            style,
            {
              ...style,
              lineDash: 'dash'
            }
          ]
        }
      ]
    };
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(subwayId.layers.length + 1);
      done();
    };
    datavizWebmap = new WebMap(subwayId, { ...commonOption, map: commonMap }, undefined);
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add rangeLayer last end === fieldValue', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1171594968/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      return Promise.resolve();
    });
    const id = rangeLayer;
    datavizWebmap = new WebMap(id, { ...commonOption });
    const callback = () => {
      const mockFun = spyOn(datavizWebmap._handler, '_addOverlayToMap');
      datavizWebmap._handler.getRangeStyleGroup = () => {
        return [
          {
            style: {
              strokeWidth: 1,
              fillColor: '#ffc6c4',
              fillOpacity: 0.9,
              lineDash: 'solid',
              strokeColor: '#ffffff',
              type: 'POLYGON',
              strokeOpacity: 1
            },
            color: '#ffc6c4',
            start: 20000000000.98,
            end: 333333350000000000
          },
          {
            style: {
              strokeWidth: 1,
              fillColor: '#f4a3a8',
              fillOpacity: 0.9,
              lineDash: 'solid',
              strokeColor: '#ffffff',
              type: 'POLYGON',
              strokeOpacity: 1
            },
            color: '#f4a3a8',
            start: 333333350000000000,
            end: 666666680000000000
          },
          {
            style: {
              strokeWidth: 1,
              fillColor: '#e38191',
              fillOpacity: 0.9,
              lineDash: 'solid',
              strokeColor: '#ffffff',
              type: 'POLYGON',
              strokeOpacity: 1
            },
            color: '#e38191',
            start: 666666680000000000,
            end: 1000000010000000000
          },
          {
            style: {
              strokeWidth: 1,
              fillColor: '#cc607d',
              fillOpacity: 0.9,
              lineDash: 'solid',
              strokeColor: '#ffffff',
              type: 'POLYGON',
              strokeOpacity: 1
            },
            color: '#cc607d',
            start: 1000000010000000000,
            end: 1333333340000000000
          },
          {
            style: {
              strokeWidth: 1,
              fillColor: '#ad466c',
              fillOpacity: 0.9,
              lineDash: 'solid',
              strokeColor: '#ffffff',
              type: 'POLYGON',
              strokeOpacity: 1
            },
            color: '#ad466c',
            start: 1333333340000000000,
            end: 1666666670000000000
          },
          {
            style: {
              strokeWidth: 1,
              fillColor: '#8b3058',
              fillOpacity: 0.9,
              lineDash: 'solid',
              strokeColor: '#ffffff',
              type: 'POLYGON',
              strokeOpacity: 1
            },
            color: '#8b3058',
            start: 1666666670000000000,
            end: 2000000000000000000
          }
        ];
      };
      const layerInfo = {
        layerType: 'RANGE',
        visible: 'visible',
        themeSetting: {
          themeField: 'TAX',
          customSettings: {},
          segmentMethod: 'offset',
          segmentCount: 6,
          colors: ['#ffc6c4', '#f4a3a8', '#e38191', '#cc607d', '#ad466c', '#8b3058', '#672044']
        },
        name: 'DataSource:DEMARCACION_TERRITORIAL_Tax',
        featureType: 'POLYGON',
        style: {
          strokeWidth: 1,
          fillColor: '#8b3058',
          fillOpacity: 0.9,
          lineDash: 'solid',
          strokeColor: '#ffffff',
          type: 'POLYGON',
          strokeOpacity: 1
        },
        projection: 'EPSG:4326',
        enableFields: ['TAX'],
        dataSource: {
          type: 'REST_DATA',
          url: 'http://test:8090/iserver/services/data-JSON_test/rest/data',
          dataSourceName: 'DataSource:DEMARCACION_TERRITORIAL_Tax'
        },
        layerID: 'DataSource:DEMARCACION_TERRITORIAL_Tax'
      };
      const features = [
        {
          type: 'Feature',
          properties: {
            TAX: '2.0E18',
            index: '0'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 1
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.00000000000098E12',
            index: '1'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 2
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '2'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 3
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '3'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 4
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '4'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 5
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '5'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 6
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '6'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 7
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '7'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 8
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '8'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 9
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '9'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 10
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '10'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 11
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '11'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 12
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '12'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 13
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '13'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 14
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '14'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 15
        },
        {
          type: 'Feature',
          properties: {
            TAX: '2.000000000098E10',
            index: '15'
          },
          geometry: {
            type: 'MultiPolygon'
          },
          id: 16
        }
      ];
      datavizWebmap._handler._createRangeLayer(layerInfo, features);
      expect(mockFun).toHaveBeenCalledTimes(2);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add markerLayer correctly', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/123456/content.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['MARKER_GEOJSON'])));
      }
      return Promise.resolve();
    });
    const id = markerLayer;
    datavizWebmap = new WebMap(id, { ...commonOption });
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toEqual(id.layers.length + 1);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add markerLayer layerOrder correctly', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/123456/content.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['MARKER_GEOJSON'])));
      }
      return Promise.resolve();
    });
    const id = markerLayer;
    datavizWebmap = new WebMap(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBeGreaterThanOrEqual(id.layers.length + 1);
      const layers = data.map.getStyle().layers;
      expect(layers[layers.length - 2].id).toBe('民航数-TEXT-7');
      expect(layers[layers.length - 1].type).toBe('circle');
      expect(layers[layers.length - 1].paint['circle-color']).toBe('#de2b41');
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('markerLayer url is error', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/123456/content.json') > -1) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              ...layerData_geojson['MARKER_GEOJSON'],
              content:
                '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":[{"type":"Feature","properties":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"dv_v5_markerStyle":{"fillColor":"#FFF","fillOpacity":"0.6","strokeColor":"#fff","strokeOpacity":"0,6","strokeWidth":"400","src":"apps/dataviz/static/imgs/markers/mark_red.svg","scale":1,"anchor":[0.5,0.5],"imgWidth":48,"imgHeight":43},"dv_v5_markerInfo":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"geometry":{"type":"Point","coordinates":[103.59008789062496,30.31598771855792]}}]}'
            })
          )
        );
      }
      return Promise.resolve();
    });
    const id = markerLayer;
    datavizWebmap = new WebMap(id, { ...commonOption });
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('markerLayer point linstring and text', (done) => {
    const content =
      '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":[{"type":"Feature","properties":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"dv_v5_markerStyle":{"strokeColor":"#0081E2","strokeOpacity":1,"strokeWidth":5,"lineCap":"round","lineDash":"solid"},"dv_v5_markerInfo":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"geometry":{"type":"LineString","coordinates":[[103.21230856170534,35.93252826339496],[96.80142450317665,31.772281946203208]]}},{"type":"Feature","properties":{"dataViz_title":"这是文字"},"dv_v5_markerStyle":{"text":"这是文字","font":"33px 宋体","placement":"point","textAlign":"right","fillColor":"#595959","backgroundFill":"#ee8b8b","borderColor":"rgba(255,255,255,0)","borderWidth":4,"padding":[8,8,8,8],"maxWidth":358},"dv_v5_markerInfo":{"dataViz_title":"这是文字"},"geometry":{"type":"Point","coordinates":[101.56249999999991,26.728112105878537]}},{"type":"Feature","properties":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"dv_v5_markerStyle":{"src":"http://172.16.14.44:8190/iportal/apps/dataviz/static/imgs/markers/mark_red.png","scale":1,"anchor":[0.5,0.5],"imgWidth":48,"imgHeight":43},"dv_v5_markerInfo":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"geometry":{"type":"Point","coordinates":[93.72012106170533,30.646288585669723]}},{"type":"Feature","properties":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"dv_v5_markerStyle":{"src":"http://172.16.14.44:8190/iportal/apps/dataviz/static/imgs/markers//ktv_red.png","scale":1,"anchor":[0.5,0.5],"imgWidth":48,"imgHeight":43},"dv_v5_markerInfo":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"geometry":{"type":"Point","coordinates":[95.91738668670534,35.145840549134476]}},{"type":"Feature","properties":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"dv_v5_markerStyle":{"radius":10,"fillColor":"#53C41A","fillOpacity":0.73,"strokeColor":"#e20057","strokeOpacity":1,"strokeWidth":4},"dv_v5_markerInfo":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"geometry":{"type":"Point","coordinates":[101.36660543670533,38.107643862311676]}}]}';
    const newLayerData_geojson = {
      ...layerData_geojson['MARKER_GEOJSON'],
      content
    };
    const contentData = JSON.parse(content);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1795361105/content.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(newLayerData_geojson)));
      }
      return Promise.resolve();
    });
    const layers = [
      {
        layerType: 'MARKER',
        visible: true,
        name: '未命名标注图层1',
        serverId: '1795361105'
      }
    ];
    const id = {
      ...markerLayer,
      layers
    };
    datavizWebmap = new WebMap(id, { ...commonOption });
    const callback = function (data) {
      const appreciableLayers = datavizWebmap.getAppreciableLayers();
      expect(appreciableLayers.length).toBe(layers.length + 1);
      const layerID = layers[0].name;
      const firstMarkerLayer = appreciableLayers.find((item) => item.id === layerID);
      expect(firstMarkerLayer).toBeTruthy();
      expect(firstMarkerLayer.type).toBe('line');
      expect(appreciableLayers.some((item) => item.id.includes(`${layerID}-LINESTRING`))).toBeFalsy();
      expect(appreciableLayers.some((item) => item.renderLayers.includes(`${layerID}-TEXT-1`))).toBeTruthy();
      expect(appreciableLayers.some((item) => item.renderLayers.includes(`${layerID}-POINT-4`))).toBeTruthy();
      expect(appreciableLayers.some((item) => item.renderLayers.includes(`${layerID}-POINT-2`))).toBeTruthy();
      expect(appreciableLayers.some((item) => item.renderLayers.includes(`${layerID}-POINT-3`))).toBeTruthy();
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add migrationLayer', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1184572358/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(JSON.parse(migrationLayer), { ...commonOption });
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toEqual(data.layers.length);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add ranksymbolLayer', (done) => {
    spyOn(ArrayStatistic, 'getArraySegments').and.callFake(() => {
      return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
    });
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/676516522/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      return Promise.resolve();
    });
    const id = ranksymbolLayer;
    datavizWebmap = new WebMap(id, { ...commonOption });
    const callback = function (data) {
      const appreciableLayers = datavizWebmap.getAppreciableLayers();
      expect(appreciableLayers.length).toBe(id.layers.length + 1);
      const layersOnMap = data.map.getStyle().layers;
      expect(layersOnMap.length).toBe(id.layers.length + 2);
      expect(layersOnMap[1].id).toBe('民航数据');
      expect(layersOnMap[3].id).toBe('民航数据-label');
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add dataflow and update', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/676516522/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('iserver/services/dataflowTest/dataflow.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(dataflowLayerData.dataflow)));
      } else if (url.indexOf('iserver/services/dataflowTest/dataflow/broadcast') > -1) {
        return Promise.resolve(new Response(JSON.stringify(dataflowLayerData.broadcast)));
      } else if (url.indexOf('iserver/services/dataflowTest/dataflow/subscribe') > -1) {
        return Promise.resolve(new Response(JSON.stringify(dataflowLayerData.subscribe)));
      }
      return Promise.resolve();
    });
    const spyTest = spyOn(mapboxgl.supermap, 'DataFlowService').and.callFake(DataFlowService);
    datavizWebmap = new WebMap(dataflowLayer, { ...commonOption, map: commonMap }, undefined);
    const callback = function (data) {
      if (data.allLoaded) {
        const appreciableLayers = datavizWebmap.getAppreciableLayers();
        expect(spyTest.calls.count()).toBe(dataflowLayer.layers.length);
        expect(appreciableLayers.length).toBe(dataflowLayer.layers.length + 1);
        const updateLayer = { ...dataflowLayer.layers[2], id: appreciableLayers[3].renderLayers[0] };
        datavizWebmap.updateOverlayLayer(updateLayer);
        setTimeout(() => {
          expect(commonMap.setLayoutProperty).toHaveBeenCalledTimes(1);
          done();
        }, 500);
      }
    };
    datavizWebmap.on('addlayerchanged', callback);
  });

  it('setBearing', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      } else if (url.indexOf('datas/1960447494/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('datas/144371940/content.json')) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      }
    });
    datavizWebmap = new WebMap(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
    datavizWebmap.on('addlayerssucceeded', (data) => {
      expect(datavizWebmap.mapOptions.bearing).toBeUndefined();
      datavizWebmap.setBearing();
      expect(datavizWebmap.mapOptions.bearing).toBeUndefined();
      expect(data.map.setBearing).not.toHaveBeenCalled();
      const bearing = 20;
      datavizWebmap.setBearing(bearing);
      expect(datavizWebmap.mapOptions.bearing).toBe(bearing);
      expect(data.map.setBearing).toHaveBeenCalled();
      done();
    });
  });

  it('setPitch', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      } else if (url.indexOf('datas/1960447494/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('datas/144371940/content.json')) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      }
    });
    datavizWebmap = new WebMap(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
    datavizWebmap.on('addlayerssucceeded', (data) => {
      expect(datavizWebmap.mapOptions.pitch).toBeUndefined();
      datavizWebmap.setPitch();
      expect(data.map.setPitch).not.toHaveBeenCalled();
      const pitch = 60;
      datavizWebmap.setPitch(pitch);
      expect(datavizWebmap.mapOptions.pitch).toBe(pitch);
      expect(data.map.setPitch).toHaveBeenCalled();
      done();
    });
  });

  it('setStyle', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      } else if (url.indexOf('datas/1960447494/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('datas/144371940/content.json')) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      }
    });
    const style = JSON.parse(styleJson);
    datavizWebmap = new WebMap(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
    datavizWebmap.once('addlayerssucceeded', (e) => {
      expect(e.map).not.toBeNull();
      datavizWebmap.setMapId('');
      datavizWebmap.setStyle(style);
      expect(datavizWebmap.mapOptions.style).toEqual(style);
      datavizWebmap.once('addlayerssucceeded', ({ layers }) => {
        expect(layers.length).toBe(2);
        expect(datavizWebmap.getAppreciableLayers()).toEqual(layers);
        const layerList = datavizWebmap.getLayerCatalog();
        expect(layerList.length).toBe(2);
        expect(layerList[0].children).not.toBeUndefined();
        done();
      });
    });
  });

  it('setRasterTileSize', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      } else if (url.indexOf('datas/1960447494/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('datas/144371940/content.json')) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      }
    });
    datavizWebmap = new WebMap(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
    datavizWebmap.on('addlayerssucceeded', () => {
      const spy = spyOn(datavizWebmap, '_updateRasterSource');
      datavizWebmap.setRasterTileSize(-1);
      expect(spy).not.toHaveBeenCalled();
      datavizWebmap.setRasterTileSize(2);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it('cleanLayers', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      } else if (url.indexOf('datas/1960447494/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('datas/144371940/content.json')) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      }
    });
    datavizWebmap = new WebMap(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(uniqueLayer_polygon.layers.length + 1);
      expect(datavizWebmap._cacheCleanLayers.length).not.toBe(0);
      const getSourceSpy = spyOn(data.map, 'getSource').and.callFake(() => true);
      const removeSourceSpy = spyOn(data.map, 'removeSource');
      datavizWebmap._cacheCleanLayers = [
        {
          renderLayers: ['layer1'],
          renderSource: { id: 'source1' },
          l7Layer: true
        },
        {
          renderLayers: ['layer2'],
          renderSource: { id: 'source2' }
        }
      ];
      datavizWebmap.cleanLayers();
      expect(getSourceSpy).toHaveBeenCalledTimes(2);
      expect(removeSourceSpy).toHaveBeenCalledTimes(1);
      expect(datavizWebmap._cacheCleanLayers.length).toBe(0);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('updateOverlayLayer unique', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      } else if (url.indexOf('datas/1960447494/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('datas/144371940/content.json')) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      }
    });
    datavizWebmap = new WebMap(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(uniqueLayer_polygon.layers.length + 1);
      const layerInfo = { ...uniqueLayer_polygon.layers[0], id: uniqueLayer_polygon.layers[0].name };
      const features = [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [116.588918, 40.07108]
          },
          properties: {
            latitude: '40.07108',
            longitude: '116.588918',
            altitude: '',
            geometry: 'Point',
            机场: '北京/首都',
            X坐标: '116.588918',
            Y坐标: '40.07108',
            名次: '1',
            '2017旅客吞吐量（人次）': '95786296 ',
            '2016旅客吞吐量（人次）': '94393454 ',
            '同比增速%': '-1.5',
            张家界: '94393454 ',
            index: '0'
          }
        }
      ];
      const spy = spyOn(datavizWebmap._handler, '_initOverlayLayer');
      datavizWebmap.updateOverlayLayer(layerInfo, features);
      expect(spy).toHaveBeenCalled();
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('updateOverlayLayer GraphicLayer', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1920557079/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('web/datas/13136933/content.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
      }
      return Promise.resolve();
    });
    const id = vectorLayer_point;
    datavizWebmap = new WebMap(id, { ...commonOption, map: commonMap }, undefined);
    const callback = function (data) {
      const sourceData1 = data.map.getSource('浙江省高等院校(3)')._data.features;
      expect(sourceData1.length).toBe(2);
      const layerInfo = { ...vectorLayer_point.layers[0], id: vectorLayer_point.layers[0].name };
      const features = [
        {
          type: 'Feature',
          properties: {
            机场: '上海/浦东',
            X坐标: '121.812361 ',
            Y坐标: '31.093992 ',
            名次: '2',
            '2017旅客吞吐量（人次）': '70,001,237 ',
            '2016旅客吞吐量（人次）': '66,002,414 ',
            '同比增速%': '3.5 ',
            '2017货邮吞吐量（吨）': '3,824,279.9 ',
            '2016货邮吞吐量（吨）': '3,440,279.7 ',
            '2017起降架次（架次）': '496,774 ',
            '2016起降架次（架次）': '479,902 ',
            index: 1
          },
          geometry: { type: 'Point', coordinates: [Array] }
        }
      ];
      const spy = spyOn(datavizWebmap._handler, '_createGraphicLayer').and.callThrough();
      datavizWebmap.updateOverlayLayer(layerInfo, features);
      expect(spy).toHaveBeenCalled();
      const sourceData2 = data.map.getSource('浙江省高等院校(3)')._data.features;
      expect(sourceData2.length).toBe(1);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add baselayer which is baidu', (done) => {
    const callback = function (data) {
      expect(data).not.toBeUndefined();
      done();
    };
    datavizWebmap = new WebMap(baseLayers['BAIDU']);
    datavizWebmap.on('notsupportbaidumap', callback);
  });

  it('isvj-5215', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('web/maps/test/map.json') > -1) {
        return Promise.resolve(new Response(raster4490));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(
      'test',
      {
        target: 'map',
        serverUrl: 'http://fake/fakeiportal',
        withCredentials: false
      },
      {
        style: {
          version: 8,
          sources: {},
          layers: []
        }
      }
    );
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
    datavizWebmap.on('addlayerssucceeded', () => {
      datavizWebmap._updateDataFlowFeature = jasmine.createSpy();
      const res = datavizWebmap._handler.getUniqueStyleGroup(parameters, [
        { properties: { UserID: 30 } },
        { properties: { UserID: 0 } }
      ]);
      expect(res.length).toBe(2);
      done();
    });
  });

  it('crs not support', (done) => {
    spyOn(mapboxgl.CRS, 'get').and.callFake(() => {});
    datavizWebmap = new WebMap(baseLayers['BAIDU']);
    const callback = ({ error }) => {
      expect(error.message).toBe('Unsupported coordinate system!');
      done();
    };
    datavizWebmap.on('getmapinfofailed', callback);
  });

  it('add baselayer which is bing', (done) => {
    const metaInfo = {
      resourceSets: [
        {
          resources: [
            {
              __type: 'ImageryMetadata:http://schemas.microsoft.com/search/local/ws/rest/v1',
              imageHeight: 256,
              imageUrl:
                'https://{subdomain}.ssl.ak.dynamic.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=zh-CN&it=G,L&shading=hill&og=2505&n=z',
              imageUrlSubdomains: ['t0', 't1', 't2', 't3'],
              imageWidth: 256
            }
          ]
        }
      ],
      statusCode: 200,
      statusDescription: 'OK'
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('Imagery/Metadata/RoadOnDemand') > -1) {
        return Promise.resolve(new Response(JSON.stringify(metaInfo)));
      }
      return Promise.resolve();
    });
    const callback = function (data) {
      expect(data).not.toBeUndefined();
      done();
    };
    datavizWebmap = new WebMap(baseLayers['BING'], {
      bingMapsKey: 'AhOVlIlR89XkNyDsXBAb7TjabrEokPoqhjk4ncLm9cQkJ5ae_JyhgV1wMcWnVrko'
    });
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add baselayer which is goole_cn', (done) => {
    const callback = function (data) {
      expect(data).not.toBeUndefined();
      done();
    };
    datavizWebmap = new WebMap(baseLayers['GOOGLE']);
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add wmsLayer with correct url and version is less than 1.3', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map-world/wms130') > -1) {
        return Promise.resolve(new Response(wmsCapabilitiesText));
      }
      return Promise.resolve();
    });
    const mapData = {
      ...wmsLayer,
      layers: [
        {
          ...wmsLayer.layers[0],
          url: 'http://fake/iserver/services/map-world/wms130/%E4%B8%96%E7%95%8C%E5%9C%B0%E5%9B%BE_Day'
        }
      ]
    };
    datavizWebmap = new WebMap(mapData);
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(mapData.layers.length + 1);
      expect(data).not.toBeUndefined();
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add wmsLayer with correct url and version is 1.3.0', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map-world/wms130') > -1) {
        return Promise.resolve(new Response(wmsCapabilitiesTextWith130));
      }
      return Promise.resolve();
    });
    const callback = function (data) {
      expect(data).not.toBeUndefined();
      expect(data.map.getSource('世界地图_Day').tiles[0].indexOf('{bbox-wms-1.3.0}')).toBeGreaterThan(-1);
      done();
    };
    datavizWebmap = new WebMap({
      ...wmsLayer,
      projection: 'EPSG:4326',
      center: { x: 0, y: 0 },
      layers: [
        {
          ...wmsLayer.layers[0],
          url: 'http://fack/iserver/services/map-world/wms130/%E4%B8%96%E7%95%8C%E5%9C%B0%E5%9B%BE_Day?'
        }
      ]
    });
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add wmtsLayer with correct url', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map-china400/wmts100') > -1) {
        return Promise.resolve(new Response(wmtsCapabilitiesText));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(baseLayers['WMTS'], { ...commonOption });
    const callback = function (data) {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(baseLayers['WMTS'].layers.length + 1);
      expect(data).not.toBeUndefined();
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('add wmtsLayer with error url', (done) => {
    const errorMsg = 'test wmts error';
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.reject(errorMsg);
    });
    const callback = function (data) {
      expect(data).not.toBeUndefined();
      expect(data.error.message).toBe(errorMsg);
      done();
    };
    datavizWebmap = new WebMap({
      ...wmtsLayer,
      layers: [{ ...wmtsLayer.layers[0], url: '/iserver/services/map-china400/wmts100' }]
    });
    datavizWebmap.on('getmapinfofailed', callback);
  });

  it('tile layer', (done) => {
    datavizWebmap = new WebMap(
      restmapLayer,
      { ...commonOption, ignoreBaseProjection: true, map: commonMap },
      { ...commonMapOptions }
    );
    datavizWebmap.once('addlayerssucceeded', () => {
      expect(datavizWebmap._handler._layerTimerList.length).toBe(1);
      done();
    });
  });

  it('other layer except tile layer', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1920557079/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(heatLayer, { ...commonOption, map: commonMap }, { ...commonMapOptions });
    const callback = function () {
      expect(datavizWebmap._handler._layerTimerList.length).toBe(1);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('different projection', (done) => {
    const callback = function (data) {
      expect(data).not.toBeUndefined();
      done();
    };
    const map = {
      ...commonMap,
      getCRS: () => {
        return {
          epsgCode: 'EPSG:4326',
          getExtent: () => jasmine.createSpy('getExtent')
        };
      }
    };
    datavizWebmap = new WebMap(restmapLayer, { ...commonOption, map: map }, {});
    datavizWebmap.on('projectionisnotmatch', callback);
  });

  it('add online map', (done) => {
    datavizWebmap = new WebMap(baseLayers['TILE'], {
      isSuperMapOnline: true,
      serverUrl: 'https://www.supermapol.com'
    });
    datavizWebmap.on('addlayerssucceeded', () => {
      const {
        baseLayer: { url }
      } = baseLayers['TILE'];
      const mockTileUrl =
        `${url}/tileimage.png?scale=3.380327143205318e-9&x=1&y=0&width=256&height=256&transparent=true&redirect=false&cacheEnabled=true&origin=%7B%22x%22%3A-20037508.3427892%2C%22y%22%3A20037508.3427892%7D`.replace(
          'https://',
          'http://'
        );
      const transformed = datavizWebmap.map.options.transformRequest(mockTileUrl, 'Tile');
      const expectResult = `https://www.supermapol.com/apps/viewer/getUrlResource.png?url=${encodeURIComponent(
        mockTileUrl
      )}&parentResType=MAP&parentResId=undefined`;
      expect(transformed.url).toBe(expectResult);
      expect(transformed.credentials).toBeUndefined();
      done();
    });
  });

  it('add iportal map', (done) => {
    datavizWebmap = new WebMap(baseLayers['BAIDU']);
    datavizWebmap.on('addlayerssucceeded', () => {
      const mockTileUrl = '';
      const transformed = datavizWebmap.map.options.transformRequest(mockTileUrl);
      expect(transformed.url).toBe(mockTileUrl);
      done();
    });
  });

  it('test fadeDuration', (done) => {
    const tiles = [
      'https://t0.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t1.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t2.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t3.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t4.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t5.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t6.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t7.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}'
    ];
    const mapOptions = {
      style: {
        version: 8,
        sources: {
          baseLayer: {
            type: 'raster',
            tiles,
            tileSize: 256
          }
        },
        layers: [{ id: 'baseLayer', type: 'raster', source: 'baseLayer' }]
      },
      center: [107.7815, 39.9788],
      zoom: 5,
      renderWorldCopies: false,
      crs: {
        epsgCode: 'EPSG:3857'
      },
      minzoom: 0,
      maxzoom: 22
    };
    datavizWebmap = new WebMap('', { ...commonOption }, { ...mapOptions, fadeDuration: 300 });
    datavizWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(map.options.fadeDuration).toBe(300);
      done();
    });
  });
  it('test transformRequest when proxy is string', (done) => {
    const proxyStr = 'http://localhost:8080/iportal/apps/viewer/getUrlResource.png?url=';
    const tiles = [
      'https://t0.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t1.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t2.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t3.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t4.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t5.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t6.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t7.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}'
    ];
    const mapOptions = {
      style: {
        version: 8,
        sources: {
          baseLayer: {
            type: 'raster',
            tiles,
            tileSize: 256
          }
        },
        layers: [{ id: 'baseLayer', type: 'raster', source: 'baseLayer' }]
      },
      center: [107.7815, 39.9788],
      zoom: 5,
      renderWorldCopies: false,
      crs: {
        epsgCode: 'EPSG:3857'
      },
      minzoom: 0,
      maxzoom: 22
    };
    datavizWebmap = new WebMap('', { ...commonOption, proxy: proxyStr }, { ...mapOptions });
    datavizWebmap.on('addlayerssucceeded', () => {
      const mockTileUrl = tiles[0].replace('{x}', 6).replace('{y}', 8).replace('{z}', 10);
      const transformed = datavizWebmap._handler.mapOptions.transformRequest(mockTileUrl, 'Tile');
      expect(transformed.url).toBe(`${proxyStr}${encodeURIComponent(mockTileUrl)}`);
      done();
    });
  });

  it('test transformRequest when proxy is false', (done) => {
    const tiles = [
      'https://t0.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t1.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t2.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t3.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t4.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t5.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t6.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      'https://t7.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}'
    ];
    const mapOptions = {
      style: {
        version: 8,
        sources: {
          baseLayer: {
            type: 'raster',
            tiles,
            tileSize: 256
          }
        },
        layers: [{ id: 'baseLayer', type: 'raster', source: 'baseLayer' }]
      },
      center: [107.7815, 39.9788],
      zoom: 5,
      renderWorldCopies: false,
      crs: {
        epsgCode: 'EPSG:3857'
      },
      minzoom: 0,
      maxzoom: 22
    };
    datavizWebmap = new WebMap('', { ...commonOption }, { ...mapOptions });
    datavizWebmap.on('addlayerssucceeded', () => {
      const mockTileUrl = tiles[0].replace('{x}', 6).replace('{y}', 8).replace('{z}', 10);
      const transformed = datavizWebmap._handler.mapOptions.transformRequest(mockTileUrl, 'Tile');
      expect(transformed.url).toBe(mockTileUrl);
      done();
    });
  });

  it('layerFilter', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/1920557079/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(
      vectorLayer_line,
      {
        layerFilter: function (layer) {
          return layer.name === '浙江省高等院校(3)';
        }
      },
      undefined,
      null
    );
    const callback = function () {
      expect(datavizWebmap.getAppreciableLayers().length).toBe(1);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('check label layer repeat and labelField', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/datas/676516522/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      if (url.indexOf('web/datas/13136933/content.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
      }
      return Promise.resolve();
    });
    const id = {
      ...uniqueLayer_multi_points,
      level: '',
      visibleExtent: [0, 1, 2, 3]
    };
    const callback = function (data) {
      const appreciableLayers = datavizWebmap.getAppreciableLayers();
      expect(appreciableLayers.length).toBe(id.layers.length + 1);
      expect(data.map.getLayer('jiuzhaigou2-label')).toBeUndefined();
      expect(data.map.getLayer('jiuzhaigou2-1-label')).toBeUndefined();
      expect(data.map.getLayer('jiuzhaigou2-2-label')).not.toBeUndefined();
      expect(datavizWebmap._handler).not.toBeUndefined();
      const spy = spyOn(datavizWebmap._handler, '_addLayer');
      datavizWebmap._handler._addLabelLayer({ layerID: 'jiuzhaigou2-2' });
      expect(spy).not.toHaveBeenCalled();
      done();
    };
    datavizWebmap = new WebMap(id, { ...commonOption });
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('sourcelist overlayLayersManager and extra layers', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      } else if (url.indexOf('web/datas/1960447494/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('web/datas/144371940/content.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      }
    });
    datavizWebmap = new WebMap(id, { ...commonOption });
    const callback = function (data) {
      const appreciableLayers1 = datavizWebmap.getAppreciableLayers();
      expect(appreciableLayers1.length).toBe(uniqueLayer_polygon.layers.length + 1);
      expect(appreciableLayers1.length).toBeGreaterThanOrEqual(data.layers.length);
      data.map.overlayLayersManager = {
        GraticuleLayer: {
          id: 'GraticuleLayer',
          overlay: true,
          sourceId: 'GraticuleLayer',
          visible: true
        },
        EchartLayer: {
          id: 'EchartLayer',
          visibility: 'visible',
          source: {
            type: 'geoJSON',
            data: null
          }
        },
        GraticuleLayer1: {
          id: 'GraticuleLayer',
          overlay: true,
          sourceId: 'GraticuleLayer'
        }
      };
      expect(data.map).toEqual(datavizWebmap._handler.map);
      const appreciableLayers2 = datavizWebmap.getAppreciableLayers();
      expect(appreciableLayers2.length).toBe(uniqueLayer_polygon.layers.length + 1 + 2);
      data.map.addLayer({
        paint: {},
        id: '北京市',
        source: {
          tiles: [
            'http://localhost:8190/iportal/services/../web/datas/435608982/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22parent%22%2C%22adcode%22%2C%22level%22%2C%22centroid%22%2C%22childrenNum%22%2C%22center%22%2C%22subFeatureIndex%22%2C%22name%22%2C%22acroutes%22%2C%22geometry%22%5D&geometryFieldName=geometry'
          ],
          bounds: [115.423411, 39.442758, 117.514583, 41.0608],
          type: 'vector'
        },
        'source-layer': '435608982$geometry',
        type: 'fill'
      });
      const appreciableLayers3 = datavizWebmap.getAppreciableLayers();
      expect(appreciableLayers3.length).toBe(uniqueLayer_polygon.layers.length + 1 + 2 + 1);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('layer order', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      } else if (url.indexOf('web/datas/1960447494/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('web/datas/144371940/content.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      }
    });
    const map = {
      ...commonMap,
      getStyle: () => {
        let layers = [];
        if (layerIdMapList) {
          for (const key in layerIdMapList) {
            layers.push(layerIdMapList[key]);
          }
        }
        // 模拟图层加载顺序
        const delayerLayerIds = ['市级行政区划_1_2', '市级行政区划_1_2-strokeLine'];
        delayerLayerIds.forEach((id) => {
          const index = layers.findIndex((layer) => layer.id === id);
          if (index !== -1) {
            const delayerLayer = layers.splice(index, 1)[0];
            layers.push(delayerLayer);
          }
        });
        return {
          sources: sourceIdMapList,
          layers
        };
      }
    };
    datavizWebmap = new WebMap(id, { ...commonOption }, {}, map);
    const callback = function (data) {
      const appreciableLayers = datavizWebmap.getAppreciableLayers();
      expect(appreciableLayers[1].id).toBe('市级行政区划_1_2');
      expect(appreciableLayers[2].id).toBe('北京市轨道交通线路(2)');
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('tdt label order', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              ...tiandituLayer,
              layers: [
                {
                  layerType: 'MARKER',
                  visible: true,
                  name: '民航数',
                  serverId: 123456,
                  layerStyle: {
                    labelField: 'minghang'
                  }
                }
              ]
            })
          )
        );
      } else if (url.indexOf('web/datas/123456/content.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['MARKER_GEOJSON'])));
      }
      return Promise.resolve();
    });
    datavizWebmap = new WebMap(id, { ...commonOption });
    datavizWebmap.on('addlayerssucceeded', (data) => {
      const appreciableLayers = datavizWebmap.getAppreciableLayers();
      expect(appreciableLayers.length).toBe(2);
      expect(appreciableLayers[0].id).toBe('天地图地形');
      expect(appreciableLayers[0].renderLayers[1]).toBe('天地图地形-tdt-label');
      expect(appreciableLayers[1].id).toBe('民航数');
      expect(appreciableLayers[1].renderLayers.length).toBe(10);
      const layersOnMap = data.map.getStyle().layers;
      expect(layersOnMap.length).toBeGreaterThan(appreciableLayers.length);
      expect(layersOnMap[1].id).toBe('天地图地形-tdt-label');
      done();
    });
  });

  it('MAPBOXSTYLE layer order', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(mvtLayer)));
      }
      if (url.indexOf('web/datas/676516522/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      if (url.indexOf('ChinaqxAlberts_4548%40fl-new/style.json') > -1) {
        return Promise.resolve(new Response(styleJson));
      }
    });
    datavizWebmap = new WebMap(id, { ...commonOption });
    const callback = function () {
      const appreciableLayers = datavizWebmap.getAppreciableLayers();
      expect(appreciableLayers[1].id).toBe('ChinaqxAlberts_4548@fl-new');
      expect(appreciableLayers[2].id).toBe('民航数据');
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('MAPBOXSTYLE layer repeat', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(mvtLayer)));
      }
      if (url.indexOf('web/datas/676516522/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      }
      if (url.indexOf('ChinaqxAlberts_4548%40fl-new/style.json') > -1) {
        return Promise.resolve(new Response(styleJson));
      }
    });
    datavizWebmap = new WebMap(id, { ...commonOption });
    const callback = function (data) {
      const appreciableLayers = datavizWebmap.getAppreciableLayers();
      const sourceLayers = JSON.parse(styleJson)
        .layers.filter((item) => item.type !== 'background')
        .map((item) => item['source-layer']);
      const uniqueSourceLayers = Array.from(new Set(sourceLayers));
      expect(appreciableLayers.length).toBe(2 + uniqueSourceLayers.length);
      expect(uniqueSourceLayers.length).toBe(1);
      expect(appreciableLayers[0].id).toBe('China');
      expect(appreciableLayers[1].id).toBe('ChinaqxAlberts_4548@fl-new');
      expect(appreciableLayers[2].id).toBe('民航数据');
      const cacheLayerIds = appreciableLayers.reduce((ids, item) => ids.concat(item.renderLayers), []);
      expect(cacheLayerIds.length).toBe(4);
      const webMap = new WebMap(id, { ...commonOption, map: data.map });
      webMap.on('addlayerssucceeded', () => {
        const appreciableLayers = webMap.getAppreciableLayers();
        expect(appreciableLayers.length).toBe(2);
        expect(appreciableLayers[0].id).toBe('China-1');
        expect(appreciableLayers[1].id).toBe('民航数据-1');
        webMap.clean();
        done();
      });
    };
    datavizWebmap.on('addlayerssucceeded', callback);
  });

  it('exclude source and layer', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      } else if (url.indexOf('1788054202/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      } else if (url.indexOf('web/datas/1960447494/content.json') > -1) {
        return Promise.resolve(new Response(layerData_CSV));
      } else if (url.indexOf('web/datas/144371940/content.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      }
    });
    datavizWebmap = new WebMap(id, { ...commonOption });
    const callback = function (data) {
      const appreciableLayers1 = datavizWebmap.getAppreciableLayers();
      expect(appreciableLayers1.length).toBe(uniqueLayer_polygon.layers.length + 1);
      expect(appreciableLayers1.length).toBeGreaterThanOrEqual(data.layers.length);
      data.map.addLayer({
        paint: {},
        id: '北京市-identify-SM-highlighted',
        source: {
          tiles: [
            'http://localhost:8190/iportal/services/../web/datas/435608982/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22parent%22%2C%22adcode%22%2C%22level%22%2C%22centroid%22%2C%22childrenNum%22%2C%22center%22%2C%22subFeatureIndex%22%2C%22name%22%2C%22acroutes%22%2C%22geometry%22%5D&geometryFieldName=geometry'
          ],
          bounds: [115.423411, 39.442758, 117.514583, 41.0608],
          type: 'vector'
        },
        type: 'fill'
      });
      data.map.addSource('mapbox-gl-draw-hot', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
      data.map.addLayer({
        metadata: {},
        paint: {
          'circle-color': '#f75564'
        },
        id: 'draw-vertex-active.hot',
        source: 'mapbox-gl-draw-hot',
        type: 'circle'
      });
      const appreciableLayers2 = datavizWebmap.getAppreciableLayers();
      expect(appreciableLayers2.length).toBe(uniqueLayer_polygon.layers.length + 1);
      done();
    };
    datavizWebmap.on('addlayerssucceeded', callback);
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
    datavizWebmap = new WebMap(id, {
      server: server
    });
    datavizWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(map.getStyle().layers.length).toBe(2);
      const layerToCopy = '北京市轨道';
      expect(map.style._layers[layerToCopy]).not.toBeUndefined();
      const copiedLayerId = `${layerToCopy}_copy`;
      datavizWebmap.copyLayer(layerToCopy, { id: copiedLayerId });
      expect(map.getStyle().layers.length).toBe(2);
      expect(map.style._layers[copiedLayerId]).toBeUndefined();
      done();
    });
  });
});
