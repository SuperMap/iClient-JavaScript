import mapboxgl from 'mapbox-gl';
import mbglmap, { CRS, proj4, revertCRS } from '../../tool/mock_mapboxgl_map.js';
import { WebMap } from '../../../src/mapboxgl/mapping/WebMap.js';
import * as MapManagerUtil from '../../../src/mapboxgl/mapping/webmap/MapManager.js';
import { ArrayStatistic } from '@supermapgis/iclient-common/util/ArrayStatistic.js';
import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest.js';
import '../../resources/WebMapV5.js';
import { Canvg } from 'canvg';

describe('mapboxgl_WebMapV2_2', () => {
  var originalTimeout, testDiv;
  var server = 'http://fack:8190/iportal/';
  var id = 1788054202;
  var datavizWebmap;
  var commonMap;
  var layerIdMapList = {};
  var sourceIdMapList = {};
  var commonOption = {
    credentialKey: undefined,
    credentialValue: undefined,
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
  const serviceProxy = {
    httpConnPoolInfo: null,
    enableAccessStatistics: true,
    scheme: null,
    enableBuiltinProxy: true,
    port: 8195,
    proxyServerRootUrl: 'http://127.0.0.1:8195/portalproxy',
    rootUrlPostfix: 'portalproxy',
    enable: true,
    httpsSetting: null,
    cacheConfig: null
  };
  const portalConfig = { serviceProxy: serviceProxy };
  var dataFlowServiceSpyTest;
  beforeEach(() => {
    spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    mapboxgl.CRS = CRS;
    mapboxgl.proj4 = proj4;
    commonMap = {
      style: {},
      resize: jasmine.createSpy('resize').and.callFake(() => {}),
      getZoom: () => {
        return 2;
      },
      getMaxZoom: () => {
        return 22;
      },
      setZoom: jasmine.createSpy('setZoom').and.callFake(() => {}),
      setMaxZoom: jasmine.createSpy('setZoom').and.callFake(() => {}),
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
      getLayers: () => {
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
    window.jsonsql = { query: () => [{}] };
    spyOn(Canvg, 'from').and.callFake((ctx, url, callback) =>
      Promise.resolve({ stop: jasmine.createSpy('stop'), start: jasmine.createSpy('start') })
    );
    window.geostats = class {
      setSerie() {}
    };
    window.EchartsLayer = class {
      constructor() {
        this.chart = {
          setOption() {}
        };
      }

      resize() {}

      remove() {}
    };
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
    mapboxgl.proj4 = undefined;
    window.jsonsql = undefined;
    window.geostats = undefined;
    window.EchartsLayer = undefined;
    dataFlowServiceSpyTest = null;
    revertCRS();
  });

  it('ZXYTILE baseLayer 2326', (done) => {
    let options = {
      server: server
    };

    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(xyzLayer2326)));
      }
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(portalConfig)));
      }
      console.log()
      return Promise.resolve(new Response(JSON.stringify({})));
    });
    var datavizWebmap = new WebMap(id, options);
    datavizWebmap.on('mapcreatesucceeded', (data) => {
      expect(datavizWebmap.mapParams.title).toBe('zxy_2326');
      done();
    });
  });

  it('createThemeLayerVectorSVG', (done) => {
    let options = {
      server: server
    };
    const mapJSON = {
      extent: {
        leftBottom: {
          x: -20037508.342789244,
          y: -25819498.513543323
        },
        rightTop: {
          x: 20037508.342789244,
          y: 20037508.34258019
        }
      },
      maxScale: '1:144447.9275',
      level: 10.870999111120563,
      center: {
        x: 12934623.19688413,
        y: 4857107.635483593
      },
      baseLayer: {
        layerType: 'TILE',
        name: '中国暗色地图',
        url: 'https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark'
      },
      layers: [
        {
          layerType: 'UNIQUE',
          visible: true,
          themeSetting: {
            themeField: 'SmID',
            customSettings: {
              0: {
                fillColor: '#3288bd',
                strokeWidth: 1,
                offsetX: 0,
                offsetY: 0,
                fillOpacity: 0.9,
                type: 'BASIC_POINT',
                radius: 8,
                strokeColor: '#ffffff',
                url: 'http://fack:8190/iportal/resources/portal/dataviz/markericon/symbol-input-51902.png',
                strokeOpacity: 1
              },
              1: {
                fillColor: '#d53e4f',
                strokeWidth: 1,
                offsetX: 0,
                offsetY: 0,
                fillOpacity: 0.9,
                type: 'SVG_POINT',
                radius: 8,
                strokeColor: '#ffffff',
                url: 'http://fack:8190/iportal/resources/portal/dataviz/markericon/symbol-input-51902.svg',
                strokeOpacity: 1
              },
              2: {
                fillColor: '#d6404f',
                strokeWidth: 1,
                offsetX: 0,
                offsetY: 0,
                fillOpacity: 0.9,
                type: 'SVG_POINT',
                radius: 8,
                strokeColor: '#ffffff',
                url: 'http://fack:8190/iportal/resources/portal/dataviz/markericon/symbol-input-44f49.svg',
                strokeOpacity: 1
              },
              3: {
                fillColor: '#3489bb',
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
          name: '北京市轨道交通站点(13)(2)',
          featureType: 'POINT',
          style: {
            strokeWidth: 1,
            offsetX: 0,
            fillColor: '#3288bd',
            offsetY: 0,
            fillOpacity: 0.9,
            radius: 8,
            strokeColor: '#ffffff',
            type: 'BASIC_POINT',
            strokeOpacity: 1
          },
          projection: 'EPSG:4326',
          enableFields: [
            'SmID',
            'SmX',
            'SmY',
            'SmLibTileID',
            '1111SmUserID',
            'SmGeometrySize',
            'SmGeoPosition',
            '1111标准名称'
          ],
          dataSource: {
            accessType: 'DIRECT',
            type: 'PORTAL_DATA',
            serverId: '301115524'
          }
        }
      ],
      description: '',
      projection: 'EPSG:3857',
      minScale: '1:591658710.91',
      title: 'svg_custom',
      version: '2.4.3',
      rootUrl: 'http://fack:8190/iportal/'
    };
    var features = {
      type: 'FeatureCollection',
      features: [
        {
          geometry: {
            type: 'Point',
            coordinates: [116.36331703990744, 39.89942692791154]
          },
          properties: {
            SmID: '1',
            SmX: '1.295350519989875E7',
            SmY: '4851338.019912067',
            SmLibTileID: '1',
            '1111SmUserID': '0',
            SmGeometrySize: '20',
            SmGeoPosition: '393216',
            '1111标准名称': '长椿街站'
          },
          type: 'Feature'
        },
        {
          geometry: {
            type: 'Point',
            coordinates: [116.37438913096268, 39.89976329032906]
          },
          properties: {
            SmID: '2',
            SmX: '1.2954737739437036E7',
            SmY: '4851386.827488521',
            SmLibTileID: '1',
            '1111SmUserID': '0',
            SmGeometrySize: '20',
            SmGeoPosition: '393236',
            '1111标准名称': '宣武门站'
          },
          type: 'Feature'
        },
        {
          geometry: {
            type: 'Point',
            coordinates: [116.37438913096268, 39.89976329032906]
          },
          properties: {
            SmID: '3',
            SmX: '1.2954737739437036E7',
            SmY: '4851386.827488521',
            SmLibTileID: '1',
            '1111SmUserID': '0',
            SmGeometrySize: '20',
            SmGeoPosition: '393236',
            '1111标准名称': '宣武门站'
          },
          type: 'Feature'
        },
        {
          geometry: {
            type: 'Point',
            coordinates: [116.38435616441622, 39.9000638944286]
          },
          properties: {
            SmID: '0',
            SmX: '1.2955847264525805E7',
            SmY: '4851430.446588028',
            SmLibTileID: '1',
            '1111SmUserID': '0',
            SmGeometrySize: '20',
            SmGeoPosition: '393276',
            '1111标准名称': '和平门站'
          },
          type: 'Feature'
        }
      ]
    };
    const dataJSON = {
      fileName: '北京市轨道交通站点(13)(2).geojson',
      type: 'GEOJSON',
      lineNumber: null,
      content: JSON.stringify(features)
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(mapJSON)));
      }
      if (url.indexOf('content.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(dataJSON)));
      }
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(portalConfig)));
      }
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);
    // spyOn(datavizWebmap, 'createGraphicLayer');

    datavizWebmap.on('mapcreatesucceeded', (data) => {
      expect(datavizWebmap.map.getStyle().layers.length).toBe(3);
      done();
    });
  });

  it('createOverlayLayer_mvt', (done) => {
    let options = {
      server: server
    };
    const mapJSON = {
      extent: {
        leftBottom: {
          x: -20037508.3427892,
          y: -20037508.3427892
        },
        rightTop: {
          x: 20037508.3427892,
          y: 20037508.3427892
        }
      },
      maxScale: '1:144447.92746805',
      level: 1,
      center: {
        x: -1.862645149230957e-9,
        y: -2.60770320892334e-8
      },
      baseLayer: {
        layerType: 'TILE',
        name: '中国暗色地图',
        url: 'https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark'
      },
      layers: [
        {
          layerType: 'MAPBOXSTYLE',
          proxy: false,
          visible: true,
          name: 'China',
          dataSource: {
            type: 'ARCGIS_VECTORTILE',
            url: 'http://fack:8090/iserver/services/map-china400/restjsr/v1/vectortile/maps/China'
          }
        }
      ],
      description: '',
      projection: 'EPSG:3857',
      minScale: '1:591658710.909131',
      title: 'mvt问题',
      version: '2.4.3',
      rootUrl: 'http://fack:8190/iportal/'
    };
    const vectorTile_style_arcgis = {
      metadata: {
        mapcenter: [-757640.0606130529, 3387809.2036870196],
        indexbounds: [345754.3017317925, 2500241.087997996, 3374092.172217019, 5528578.958483222],
        mapscale: 3.908743924597e-8,
        epsgcode: 4548,
        topscale: 4.4733009479210134e-8,
        mapbounds: [-3351272.4427074995, 819239.9879898131, 1835992.3214813927, 5956378.419384226]
      },
      sources: {
        'ChinaqxAlberts_4548@fl': {
          url: './tileFeature.json',
          bounds: [-180, -90, 180, 90],
          type: 'vector'
        },
        ChinaqxAlberts_tiles: {
          tiles: ['./tileFeature.mvt'],
          bounds: [-180, -90, 180, 90],
          type: 'vector'
        }
      },
      center: [104.02637148052703, 29.96217012533226],
      name: 'ChinaqxAlberts_4548@fl',
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
          metadata: {
            'layer:caption': 'ChinaqxAlberts_4548@fl',
            'layer:name': 'ChinaqxAlberts_4548@fl'
          },
          maxzoom: 24,
          paint: {
            'fill-color': 'rgba(151,191,242,1.00)',
            'fill-antialias': true
          },
          id: 'ChinaqxAlberts_4548@fl(0_24)',
          source: 'ChinaqxAlberts_4548@fl',
          'source-layer': 'ChinaqxAlberts_4548@fl',
          type: 'fill',
          minzoom: 0
        }
      ],
      zoom: 0,
      version: 8
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(mapJSON)));
      }
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(portalConfig)));
      }
      if (url.indexOf('/style.json')) {
        return Promise.resolve(new Response(JSON.stringify(vectorTile_style_arcgis)));
      }
      console.log('FetchRequest', url);
      return Promise.resolve(new Response(JSON.stringify({})));
    });

    var datavizWebmap = new WebMap(id, options);
    // spyOn(datavizWebmap, 'createGraphicLayer');

    datavizWebmap.on('mapcreatesucceeded', (data) => {
      try {
        expect(datavizWebmap.map.getStyle().layers.length).toBe(2);
        debugger;
        const originLayerInfo = datavizWebmap._handler._mapInfo.layers.find((layer) => {
          return layer.layerID === 'China';
        });
        originLayerInfo.layerType = 'mvt';
        debugger;
        datavizWebmap.updateOverlayLayer(
          { id: 'China' },
          {
            featureType: 'MULTIPOLYGON',
            info: {
              url: 'http://fack:8090/iserver/services/map-china400/restjsr/v1/vectortile/maps/China'
            }
          }
        );
        datavizWebmap.updateOverlayLayer(
          { id: 'China' },
          {
            featureType: 'LINESTRING',
            info: {
              url: 'http://fack:8090/iserver/services/map-china400/restjsr/v1/vectortile/maps/China'
            }
          }
        );
        datavizWebmap.updateOverlayLayer(
          { id: 'China' },
          {
            featureType: 'POINT',
            info: { url: 'http://fack:8090/iserver/services/map-china400/restjsr/v1/vectortile/maps/China' }
          }
        );
        done();
      } catch (error) {
        console.log(error);
        done();
      }
    });
  });
});
