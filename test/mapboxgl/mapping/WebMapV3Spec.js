import mapboxgl from 'mapbox-gl';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { createWebMapV3Extending } from '../../../src/common/mapping/WebMapV3';
import { createMapClassExtending } from '../../../src/common/mapping/MapBase';
import { L7LayerUtil } from '../../../src/common/mapping/utils/L7LayerUtil';
import { WebMap } from '../../../src/mapboxgl/mapping/WebMap';
import * as MapManagerUtil from '../../../src/mapboxgl/mapping/webmap/MapManager';
import { CRSManager } from '../../../src/mapboxgl/mapping/webmap/CRSManager';
import { featureFilter, expression } from '@mapbox/mapbox-gl-style-spec';
import spec from '@mapbox/mapbox-gl-style-spec/reference/v8';
import { L7, L7Layer } from '../../../src/mapboxgl/overlay/L7Layer';
import * as mockL7 from '../../tool/mock_l7';
import mbglmap, { CRS, proj4, revertCRS } from '../../tool/mock_mapboxgl_map';
import '../../resources/WebMapV3.js';
import '../../resources/WebMapV5.js';

describe('mapboxgl-webmap3.0', () => {
  var originalTimeout, testDiv;
  var server = 'http://localhost:8190/iportal/';
  var id = 617580084;
  var mapstudioWebmap;
  const l7LayerUtil = L7LayerUtil({ featureFilter, expression, spec, L7Layer, L7 });
  const extendOptions = {
    MapManager: MapManagerUtil.default,
    mapRepo: mapboxgl,
    crsManager: new CRSManager(),
    l7LayerUtil
  };
  const WebMapV3 = createWebMapV3Extending(createMapClassExtending(mapboxgl.Evented), extendOptions);
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
    mapboxgl.Map.prototype.overlayLayersManager = {};
    mbglmap.prototype.getL7Scene = mapboxgl.Map.prototype.getL7Scene;
    mapboxgl.CRS = CRS;
    mapboxgl.proj4 = proj4;
  });
  afterEach(() => {
    if (mapstudioWebmap && mapstudioWebmap.map) {
      const webMapV3 = mapstudioWebmap._getWebMapInstance ? mapstudioWebmap._getWebMapInstance() : mapstudioWebmap;
      webMapV3.clean && webMapV3.clean();
      mapstudioWebmap = null;
    }
    window.document.body.removeChild(testDiv);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    mbglmap.prototype.getL7Scene = undefined;
    mapboxgl.CRS = undefined;
    mapboxgl.proj4 = undefined;
    revertCRS();
  });

  it('initialize_background', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = mapstudioWebMap_background;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('617580084.json') > -1) {
        var appInfo = masBackgroundAppInfo;
        return Promise.resolve(new Response(appInfo));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    expect(mapstudioWebmap.options.target).toBe('map');
    expect(mapstudioWebmap.mapId).toBe(id);
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(mapstudioWebmap.map).toEqual(map);
      expect(mapstudioWebmap.mapParams.title).toBe('空地图');
      expect(mapstudioWebmap.mapParams.description).toBe('');
      const style = map.getStyle();
      expect(style.name).toBe(mapstudioWebmap.mapParams.title);
      expect(style.layers.length).toBe(1);
      expect(style.sources).toEqual({});
      done();
    });
  });

  it('initialize_raster', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = mapstudioWebMap_raster;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('617580084.json') > -1) {
        var appInfo = mapstudioAppInfo;
        return Promise.resolve(new Response(appInfo));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server,
      iportalServiceProxyUrlPrefix: 'initialize_raster'
    });
    expect(mapstudioWebmap.credentialKey).toBeUndefined();
    expect(mapstudioWebmap.credentialValue).toBeUndefined();
    expect(mapstudioWebmap.options.target).toBe('map');
    expect(mapstudioWebmap.mapId).toBe(id);
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      expect(map.getZoom()).toBeCloseTo(3.412, 0.001);
      var center = map.getCenter();
      expect(+center.lat.toFixed(4)).toEqual(39.9478);
      expect(+center.lng.toFixed(4)).toEqual(116.3949);
      expect(mapstudioWebmap.mapParams.title).toBe('restmap服务');
      expect(mapstudioWebmap.mapParams.description).toBe('');
      const style = map.getStyle();
      expect(style.name).toBe(mapstudioWebmap.mapParams.title);
      expect(style.layers.length).toBe(2);
      done();
    });
  });

  it('vector_symbol', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(mapstudioWebMap_symbol));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_symbol));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });

    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      const webMapV3 = mapstudioWebmap._getWebMapInstance();
      const mapInfo = JSON.parse(mapstudioWebMap_symbol);
      expect(style.layers.length).toBe(mapInfo.layers.length);
      expect(webMapV3.getLegends().length).not.toBe(0);
      expect(webMapV3.getLayerCatalog().length).not.toBe(0);
      expect(webMapV3.getLayerCatalog().length).toBeLessThanOrEqual(webMapV3.getLayers().length);
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
      target: 'map',
      iportalServiceProxyUrlPrefix: 'mapId is JSON'
    });
    mapstudioWebmap.initializeMap(mapInfo);

    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBe(mapInfo.layers.length);
      const appreciableLayers = mapstudioWebmap.getLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      expect(mapstudioWebmap.getLegends().length).toBe(0);
      map.addLayer({
        metadata: {},
        paint: {
          'background-color': '#242424'
        },
        id: 'ms-background12',
        type: 'background'
      });
      expect(map.getStyle().layers.length).toBe(mapInfo.layers.length + 1);
      expect(mapstudioWebmap.getLayers().length).toBe(appreciableLayers.length + 1);
      expect(mapstudioWebmap.getLayerCatalog().length).toBe(layerCatalogs.length + 1);
      done();
    });
  });

  it('projection is 4490 and not include mapbox-gl-enhance', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    const nextMapInfo = {
      ...mapInfo,
      crs: {
        name: 'EPSG:4490',
        extent: [-180, -270, 180, 90],
        wkt: 'GEOGCS["China Geodetic Coordinate System 2000", DATUM["China 2000", SPHEROID["CGCS2000", 6378137.0, 298.257222101, AUTHORITY["EPSG","1024"]], AUTHORITY["EPSG","1043"]], PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], UNIT["degree", 0.017453292519943295], AXIS["Geodetic latitude", NORTH], AXIS["Geodetic longitude", EAST], AUTHORITY["EPSG","4490"]]'
      }
    };
    spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    mapboxgl.CRS = undefined;
    mapstudioWebmap = new WebMap(nextMapInfo, {
      server: server,
      target: 'map'
    });
    mapstudioWebmap.on('mapcreatefailed', ({ error }) => {
      const throwError =
        'WebMap needs to include mapbox-gl-enhance.js. Refer to the example: https://iclient.supermap.io/examples/mapboxgl/editor.html#mvtVectorTile_2362';
      expect(mapstudioWebmap.map).toBeUndefined();
      expect(error).toBe(throwError);
      done();
    });
  });

  it('projection is 4490 and include mapbox-gl-enhance', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    const nextMapInfo = {
      ...mapInfo,
      crs: {
        name: 'EPSG:4490',
        extent: [-180, -270, 180, 90],
        wkt: 'GEOGCS["China Geodetic Coordinate System 2000", DATUM["China 2000", SPHEROID["CGCS2000", 6378137.0, 298.257222101, AUTHORITY["EPSG","1024"]], AUTHORITY["EPSG","1043"]], PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], UNIT["degree", 0.017453292519943295], AXIS["Geodetic latitude", NORTH], AXIS["Geodetic longitude", EAST], AUTHORITY["EPSG","4490"]]'
      }
    };
    spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(nextMapInfo, {
      server: server,
      target: 'map',
      iportalServiceProxyUrlPrefix: 'projection is 4490 and include mapbox-gl-enhance'
    });

    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBe(nextMapInfo.layers.length);
      const appreciableLayers = mapstudioWebmap.getLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      expect(mapstudioWebmap.getLegends().length).toBe(0);
      done();
    });
  });

  it('projection is 4490 and with map', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    spyOn(mapboxgl, 'Map').and.callFake(mbglmap);
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    const nextMapInfo = {
      ...mapInfo,
      crs: {
        name: 'EPSG:4490',
        extent: [-180, -270, 180, 90],
        wkt: 'GEOGCS["China Geodetic Coordinate System 2000", DATUM["China 2000", SPHEROID["CGCS2000", 6378137.0, 298.257222101, AUTHORITY["EPSG","1024"]], AUTHORITY["EPSG","1043"]], PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], UNIT["degree", 0.017453292519943295], AXIS["Geodetic latitude", NORTH], AXIS["Geodetic longitude", EAST], AUTHORITY["EPSG","4490"]]'
      }
    };
    mapstudioWebmap = new WebMapV3(nextMapInfo, {
      server: server,
      target: 'map'
    });
    const existedMap = new mapboxgl.Map({
      container: testDiv,
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            paint: {
              'background-color': '#242424'
            },
            id: 'background1',
            type: 'background'
          }
        ]
      },
      crs: 'EPSG:4490',
      center: [116.640545, 40.531714],
      zoom: 7
    });
    existedMap.getCRS = function () {
      return { epsgCode: 'EPSG:4490' };
    };
    existedMap.on('load', function () {
      mapstudioWebmap.initializeMap(nextMapInfo, existedMap);
    });
    const isSameCrs = extendOptions.crsManager.isSameProjection(existedMap, 'EPSG:4326');
    expect(isSameCrs).toBe(true);
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(mapstudioWebmap._appendLayers).toBe(true);
      expect(map).toEqual(existedMap);
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBe(nextMapInfo.layers.length + 1);
      const appreciableLayers = mapstudioWebmap.getLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      done();
    });
  });

  it('overlayLayersManager', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map',
      iportalServiceProxyUrlPrefix: 'overlayLayersManager'
    });
    mapstudioWebmap.initializeMap(mapInfo);

    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBe(mapInfo.layers.length);
      const appreciableLayers = mapstudioWebmap.getLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      expect(mapstudioWebmap.getLegends().length).toBe(0);
      map.overlayLayersManager = {
        GraticuleLayer: {
          id: 'GraticuleLayer',
          overlay: true,
          sourceId: 'GraticuleLayer',
          visible: true,
          type: 'custom'
        },
        EchartLayer: {
          id: 'EchartLayer',
          visibility: 'visible',
          source: {
            type: 'geoJSON',
            data: null
          },
          type: 'custom'
        },
        TestLayer: {
          id: 'TestLayer',
          overlay: true,
          type: 'custom'
        },
        TestLayer2: {
          id: 'TestLayer2',
          overlay: true,
          type: 'custom',
          visible: false
        },
        GraticuleLayer1: {
          id: 'GraticuleLayer',
          overlay: true,
          type: 'custom'
        }
      };
      const validNum = 4;
      const appreciableLayers2 = mapstudioWebmap.getLayers();
      expect(appreciableLayers2.length).toBe(appreciableLayers.length + validNum);
      expect(mapstudioWebmap.getLayerCatalog().length).toBe(layerCatalogs.length + validNum);
      expect(appreciableLayers2.find((item) => item.id === 'EchartLayer')).toBeTruthy();
      const testLayer = appreciableLayers2.find((item) => item.id === 'TestLayer');
      expect(testLayer).not.toBeUndefined();
      expect(testLayer.visible).toBeTruthy();
      expect(testLayer.renderSource.id).toBeUndefined();
      const testLayer2 = appreciableLayers2.find((item) => item.id === 'TestLayer2');
      expect(testLayer2).not.toBeUndefined();
      expect(testLayer2.visible).toBeFalsy();
      done();
    });
  });

  it('filter drill test', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const mapInfo = JSON.parse(mapstudioWebMap_drill);
    const originMapInfo = JSON.parse(mapstudioWebMap_drill);
    const mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map'
    });
    mapstudioWebmap.on('layercreatefailed', ({ error, error_code }) => {
      expect(['drill'].indexOf(error.split(' ')[0]) > -1).toBeTruthy();
      expect(error_code).toBe('DRILL_LAYERS_NOT_SUPPORTED');
    });
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      const style = map.getStyle();
      expect(style.layers.length).toBeLessThan(originMapInfo.layers.length);
      expect(style.layers.length).toBe(mapInfo.layers.length);
      expect(mapstudioWebmap.getLayers().length).toBe(1);
      expect(mapstudioWebmap.getLayerCatalog().length).toBe(1);
      done();
    });
    mapstudioWebmap.initializeMap(mapInfo);
  });

  it('filter drill ui id test', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const mapInfo = JSON.parse(mapstudioWebMap_drill_layers1);
    const originMapInfo = JSON.parse(mapstudioWebMap_drill_layers1);
    const mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map'
    });
    mapstudioWebmap.on('layercreatefailed', ({ error, error_code }) => {
      expect(['drill'].indexOf(error.split(' ')[0]) > -1).toBeTruthy();
      expect(error_code).toBe('DRILL_LAYERS_NOT_SUPPORTED');
    });
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      const style = map.getStyle();
      expect(style.layers.length).toBeLessThan(originMapInfo.layers.length);
      expect(style.layers.length).toBe(mapInfo.layers.length);
      expect(mapstudioWebmap.getLayers().length).toBe(1);
      expect(mapstudioWebmap.getLayerCatalog().length).toBe(1);
      done();
    });
    mapstudioWebmap.initializeMap(mapInfo);
  });

  it('filter drill interaction changed test', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const mapInfo = JSON.parse(mapstudioWebMap_drill_layers2);
    const originMapInfo = JSON.parse(mapstudioWebMap_drill_layers2);
    const mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map'
    });
    mapstudioWebmap.on('layercreatefailed', ({ error, error_code }) => {
      expect(['drill'].indexOf(error.split(' ')[0]) > -1).toBeTruthy();
      expect(error_code).toBe('DRILL_LAYERS_NOT_SUPPORTED');
    });
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      const style = map.getStyle();
      expect(style.layers.length).toBeLessThan(originMapInfo.layers.length);
      expect(style.layers.length).toBe(mapInfo.layers.length);
      expect(mapstudioWebmap.getLayers().length).toBe(1);
      expect(mapstudioWebmap.getLayerCatalog().length).toBe(1);
      done();
    });
    mapstudioWebmap.initializeMap(mapInfo);
  });

  it('exclude source and layer', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map',
      iportalServiceProxyUrlPrefix: 'exclude source and layer'
    });
    mapstudioWebmap.initializeMap(mapInfo);

    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBe(mapInfo.layers.length);
      const appreciableLayers = mapstudioWebmap.getLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      map.addLayer({
        metadata: {},
        paint: {
          'background-color': '#242424'
        },
        id: 'layer-identify-SM-highlighted',
        type: 'background'
      });
      map.addSource('mapbox-gl-draw-hot', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
      map.addLayer({
        metadata: {},
        paint: {
          'circle-color': '#f75564'
        },
        id: 'draw-vertex-active.hot',
        source: 'mapbox-gl-draw-hot',
        type: 'circle'
      });
      expect(mapstudioWebmap.getLayers().length).toBe(appreciableLayers.length);
      expect(mapstudioWebmap.getLayerCatalog().length).toBe(layerCatalogs.length);
      done();
    });
  });

  it('load l7Layers', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_L7Layers);
    spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'LineLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'PolygonLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'HeatmapLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
    spyOn(L7, 'Mapbox').and.callFake(mockL7.Mapbox);
    mapboxgl.Map.prototype.getCRS = function () {
      return { epsgCode: mapInfo.crs.name, getExtent: () => {} };
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(mapstudioWebMap_L7Layers));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_L7Layers));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124Items));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124));
      }
      return Promise.resolve();
    });
    const mapOptions = {
      transformRequest: function (url) {
        return { url };
      }
    };
    spyOn(mapOptions, 'transformRequest').and.callThrough();
    mapstudioWebmap = new WebMap(
      id,
      {
        server: server
      },
      mapOptions
    );
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBeLessThan(mapInfo.layers.length);
      const appreciableLayers = mapstudioWebmap.getLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      expect(mapstudioWebmap.getLegends().length).toBe(8);
      expect(mapOptions.transformRequest.calls.count()).toBeGreaterThan(0);
      delete mapboxgl.Map.prototype.getCRS;
      done();
    });
  });

  it('projectionnotmatch', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);

    const existedMap = new mapboxgl.Map({
      container: testDiv,
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            paint: {
              'background-color': '#242424'
            },
            id: 'background1',
            type: 'background'
          }
        ]
      },
      center: [116.640545, 40.531714],
      zoom: 7
    });
    existedMap.getCRS = function () {
      return { epsgCode: '' };
    };
    mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map'
    });
    existedMap.on('load', function () {
      mapstudioWebmap.initializeMap(mapInfo, existedMap);
    });

    mapstudioWebmap.on('projectionnotmatch', () => {
      expect(mapstudioWebmap.map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(existedMap);
      const style = mapstudioWebmap.map.getStyle();
      expect(style.layers.length).toBe(1);
      done();
    });
  });

  it('layerdatas', (done) => {
    const spyTest = spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(apstudioWebMap_layerData));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_layerData));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      expect(map.style.addGlyphs).toHaveBeenCalledTimes(1);
      const style = map.getStyle();
      const webMapV3 = mapstudioWebmap._getWebMapInstance();
      const mapInfo = JSON.parse(apstudioWebMap_layerData);
      expect(style.layers.length).toBe(mapInfo.layers.length);
      const appreciableLayers = webMapV3.getLayers();
      const layerList = webMapV3.getLayerCatalog();
      expect(layerList.length).toBe(5);
      expect(appreciableLayers.length).toBe(5);
      expect(
        appreciableLayers.some(
          (item) =>
            item.id === '北京市轨道交通线路-打印(1)' &&
            item.dataSource.type === 'STRUCTURE_DATA' &&
            item.dataSource.serverId === '720626591'
        )
      ).toBeTruthy();
      expect(
        appreciableLayers.some((item) => item.id === 'Buildings_R_3857@Buildings' && item.dataSource.type === void 0)
      ).toBeTruthy();
      expect(
        appreciableLayers.some(
          (item) =>
            item.id === 'ms_New_LINE_1718091329989_7' &&
            item.dataSource.type === 'REST_DATA' &&
            item.dataSource.url.match(/\/iserver\/services\/data-Building\/rest\/data$/) &&
            item.dataSource.serverId === void 0
        )
      ).toBeTruthy();
      expect(
        appreciableLayers.some(
          (item) =>
            item.renderSource.id === 'ms_M_3857_1719917169016_4' &&
            item.dataSource.type === 'REST_MAP' &&
            item.dataSource.url.match(/\/iserver\/services\/map-multi0508\/rest\/maps$/) &&
            item.dataSource.mapName === 'M_3857'
        )
      ).toBeTruthy();
      expect(
        appreciableLayers.some((item) => item.id === 'CHINA_DARK' && !Object.keys(item.dataSource).length)
      ).toBeTruthy();
      spyTest.calls.reset();
      done();
    });
  });

  it('transformRequest', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(mapstudioAppInfo));
      }
      return Promise.resolve();
    });
    const spyTest = spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    const mapInfo = JSON.parse(mapstudioWebMap_raster);
    const iportalServiceProxyUrlPrefix = 'http://localhost:8195/portalproxy';
    const tileCustomRequestHeaders = { Authorization: 'test token' };
    mapstudioWebmap = new WebMap(mapInfo, {
      server: server,
      target: 'map',
      iportalServiceProxyUrlPrefix,
      tileTransformRequest: (url) => {
        if (url.includes(iportalServiceProxyUrlPrefix)) {
          return { headers: tileCustomRequestHeaders };
        }
      }
    });
    mapstudioWebmap.on('mapinitialized', ({ map }) => {
      expect(map).not.toBeUndefined();
      let mockTileUrl =
        'http://localhost:8195/portalproxy/7c851958ab40a5e0/iserver/services/map_world1_y6nykx3f/rest/maps/World1/tileimage.png?scale=6.760654286410619e-9&x=1&y=0&width=256&height=256&transparent=true&redirect=false&cacheEnabled=true&origin=%7B%22x%22%3A-180%2C%22y%22%3A90%7D';
      let transformed = map.options.transformRequest(mockTileUrl, 'Tile');
      expect(transformed.credentials).toBe('include');
      expect(transformed.headers).toEqual(tileCustomRequestHeaders);
      mockTileUrl = 'https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark';
      transformed = map.options.transformRequest(mockTileUrl, 'Tile');
      expect(transformed.credentials).toBeUndefined();
      expect(transformed.headers).toBeUndefined();
      spyTest.calls.reset();
      done();
    });
  });

  it('filter legend', (done) => {
    mbglmap.prototype.getL7Scene = mapboxgl.Map.prototype.getL7Scene;
    const spyTest = spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'LineLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'PolygonLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'HeatmapLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
    spyOn(L7, 'Mapbox').and.callFake(mockL7.Mapbox);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(mapstudioWebMap_L7Layers2));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_L7Layers2));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124Items));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      const webmapInstance = mapstudioWebmap._getWebMapInstance();
      expect(webmapInstance.getLegends().length).toBe(4);
      spyTest.calls.reset();
      done();
    });
  });

  it('copy l7Layer', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_L7Layers);
    spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'LineLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'PolygonLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'HeatmapLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
    spyOn(L7, 'Mapbox').and.callFake(mockL7.Mapbox);
    mapboxgl.Map.prototype.getCRS = function () {
      return { epsgCode: mapInfo.crs.name, getExtent: () => {} };
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(mapstudioWebMap_L7Layers));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_L7Layers));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124Items));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      const webmapInstance = mapstudioWebmap._getWebMapInstance();
      expect(map).not.toBeUndefined();
      expect(webmapInstance.map).toEqual(map);
      let appreciableLayers = webmapInstance.getLayers();
      let overlayLayers = Object.keys(map.overlayLayersManager);
      const idToCopy = 'ms_站点3_1715739627423_909';
      webmapInstance.copyLayer(idToCopy, { id: `${idToCopy}-SM-` }).then(() => {
        const currentOverlayLayers = Object.keys(map.overlayLayersManager);
        const currentAppreciableLayers = webmapInstance.getLayers();
        expect(currentOverlayLayers.length).toBe(overlayLayers.length + 1);
        expect(currentAppreciableLayers.length).toBe(appreciableLayers.length);
        appreciableLayers = currentAppreciableLayers;
        overlayLayers = currentOverlayLayers;
        webmapInstance.copyLayer(idToCopy).then(() => {
          const currentOverlayLayers = Object.keys(map.overlayLayersManager);
          const currentAppreciableLayers = webmapInstance.getLayers();
          expect(currentOverlayLayers.length).toBe(overlayLayers.length + 1);
          expect(currentAppreciableLayers.length).toBe(appreciableLayers.length + 1);
          delete mapboxgl.Map.prototype.getCRS;
          done();
        });
      });
    });
  });

  it('copy raster layer', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(mapstudioWebMap_symbol));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_symbol));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });

    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      const webmapInstance = mapstudioWebmap._getWebMapInstance();
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      const webMapV3 = mapstudioWebmap._getWebMapInstance();
      const mapInfo = JSON.parse(mapstudioWebMap_symbol);
      expect(style.layers.length).toBe(mapInfo.layers.length);
      let layersOnMap = mapInfo.layers;
      let sourcesOnMap = mapInfo.sources;
      let appreciableLayers = webMapV3.getLayers();
      expect(webMapV3.getLayerCatalog().length).toBeLessThanOrEqual(appreciableLayers.length);
      const idToCopy = 'CHINA_DARK';
      const nextSource = {
        tiles: [
          'https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark/tileimage.png?scale={scale}&x={x}&y={y}&width={width}&height={height}&transparent=true&redirect=false&cacheEnabled=true'
        ],
        tileSize: 512,
        type: 'raster'
      };
      webmapInstance.copyLayer(idToCopy, { source: nextSource }).then(() => {
        const { layers, sources } = map.getStyle();
        expect(layers.length).toBe(layersOnMap.length + 1);
        expect(Object.keys(sources).length).toBe(Object.keys(sourcesOnMap).length + 1);
        expect(sources[`${idToCopy}_copy`]).not.toBeUndefined();
        done();
      });
    });
  });

  it('updateOverlayLayer', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_L7Layers);
    spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'LineLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'PolygonLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'HeatmapLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
    spyOn(L7, 'Mapbox').and.callFake(mockL7.Mapbox);
    mapboxgl.Map.prototype.getCRS = function () {
      return { epsgCode: mapInfo.crs.name, getExtent: () => {} };
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(mapstudioWebMap_L7Layers));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_L7Layers));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124Items));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124));
      }
      return Promise.resolve();
    });
    const mapOptions = {
      transformRequest: function (url) {
        return { url };
      }
    };
    spyOn(mapOptions, 'transformRequest').and.callThrough();
    mapstudioWebmap = new WebMap(
      id,
      {
        server: server
      },
      mapOptions
    );
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      const webmapInstance = mapstudioWebmap._getWebMapInstance();
      const layerInfo = {
        id: '北京市轨道交通线路减',
        renderSource: {
          id: 'ms_1052943054_1715672103742_8',
          type: 'geojson'
        }
      };
      const features = [
        {
          id: '1',
          type: 'Feature',
          properties: {
            终点y: '39.948990864179734',
            SmID: 1,
            标准名称: '地铁二号线',
            起点x: '116.38050072430798',
            smpid: 1,
            起点y: '39.94888011518407',
            testID: 1,
            终点x: '116.39553809862188'
          }
        }
      ];
      webmapInstance.updateOverlayLayer(layerInfo, features, '标准名称');
      const newFeatures = map.getSource('ms_1052943054_1715672103742_8').getData().features;
      expect(newFeatures.length).toBe(1);
      delete mapboxgl.Map.prototype.getCRS;
      done();
    });
  });

  it('test group', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const mapInfo = JSON.parse(mapstudioWebMap_group);
    const mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map'
    });
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      const appreciableLayers = mapstudioWebmap.getLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      done();
    });
    mapstudioWebmap.initializeMap(mapInfo);
  });

  it('add sprite when map instance as param', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    spyOn(mapboxgl, 'Map').and.callFake(mbglmap);
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    const crsInfo = {
      name: 'EPSG:4490',
      extent: [-180, -270, 180, 90],
      wkt: 'GEOGCS["China Geodetic Coordinate System 2000", DATUM["China 2000", SPHEROID["CGCS2000", 6378137.0, 298.257222101, AUTHORITY["EPSG","1024"]], AUTHORITY["EPSG","1043"]], PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], UNIT["degree", 0.017453292519943295], AXIS["Geodetic latitude", NORTH], AXIS["Geodetic longitude", EAST], AUTHORITY["EPSG","4490"]]'
    };
    const crs = new CRS(crsInfo.name, crsInfo.wkt, crsInfo.extent, 'degree');
    const nextMapInfo = {
      ...mapInfo,
      crs: crsInfo
    };
    mapstudioWebmap = new WebMapV3(nextMapInfo, {
      server: server,
      target: 'map'
    });
    const existedMap = new mapboxgl.Map({
      container: testDiv,
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            paint: {
              'background-color': '#242424'
            },
            id: 'background1',
            type: 'background'
          }
        ]
      },
      crs,
      center: [116.640545, 40.531714],
      zoom: 7
    });
    existedMap.on('load', function () {
      mapstudioWebmap.initializeMap(nextMapInfo, existedMap);
    });
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(mapstudioWebmap._appendLayers).toBe(true);
      expect(map).toEqual(existedMap);
      expect(mapstudioWebmap.map).toEqual(map);
      expect(map.addStyle).toHaveBeenCalled();
      done();
    });
  });

  it('label legend', (done) => {
    mbglmap.prototype.getL7Scene = mapboxgl.Map.prototype.getL7Scene;
    const spyTest = spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'LineLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'PolygonLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'HeatmapLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
    spyOn(L7, 'Mapbox').and.callFake(mockL7.Mapbox);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(mapstudioWebMap_labelLegend));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_labelLegend));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });

    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      const webMapV3 = mapstudioWebmap._getWebMapInstance();
      expect(map).not.toBeUndefined();
      expect(webMapV3.getLegends().length).toBe(9);
      const testLegend = webMapV3.getLegends().filter((item) => {
        return item.layerId === '上海市可校外学习中心(1)';
      });
      expect(testLegend.length).toBe(2);
      expect(testLegend[0].styleGroup[0].fieldValue).toBe('上海市可校外学习中心(1)');
      expect(testLegend[1].styleGroup[0].fieldValue).toBe('学习中心（点）名称');
      mbglmap.prototype.getL7Scene = undefined;
      spyTest.calls.reset();
      done();
    });
  });

  it('handle sprite option is object like { sourceId: url }', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite/rectangle') > -1) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              rectangle: {
                pixelRatio: 1,
                width: 104,
                x: 0,
                y: 0,
                height: 104
              }
            })
          )
        );
      } else if (url.indexOf('/sprite/circle') > -1) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              circle: {
                pixelRatio: 1,
                width: 104,
                x: 104,
                y: 0,
                height: 104
              }
            })
          )
        );
      } else if (url.indexOf('/sprite/triangle') > -1) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              triangle: {
                pixelRatio: 1,
                width: 104,
                x: 0,
                y: 104,
                height: 104
              }
            })
          )
        );
      }
      return Promise.resolve();
    });
    spyOn(mapboxgl, 'Map').and.callFake(mbglmap);
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    mapInfo.sprite = {
      rectangle: 'http://localhost:9876/base/resources/data/sprite/rectangle',
      circle: 'http://localhost:9876/base/resources/data/sprite/circle',
      triangle: 'http://localhost:9876/base/resources/data/sprite/triangle'
    };
    mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map',
      relatedInfo: {
        description: '测试111'
      }
    });
    const existedMap = new mapboxgl.Map({
      container: testDiv,
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            paint: {
              'background-color': '#242424'
            },
            id: 'background1',
            type: 'background'
          }
        ]
      },
      crs: 'EPSG:3857',
      center: [116.640545, 40.531714],
      zoom: 7
    });
    existedMap.on('load', function () {
      mapstudioWebmap.initializeMap(mapInfo, existedMap);
    });
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(mapstudioWebmap.mapParams.description).toBe('测试111');
      expect(Object.keys(mapstudioWebmap._spriteDatas).length).toBe(3);
      expect(map.addStyle).toHaveBeenCalled();
      done();
    });
  });

  it('test webmapv3 checkSameLayer', (done) => {
    spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('1209527958/map.json') > -1) {
        return Promise.resolve(new Response(mapstudioWebMap_raster));
      }
      if (url.indexOf('1209527958.json') > -1) {
        return Promise.resolve(new Response(mapstudioAppInfo));
      }
      if (url.indexOf('106007908/map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(mapstudioWebMap_raster_append)));
      }
      if (url.indexOf('106007908.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(msProjectINfo_raster_append)));
      }
    });
    const commonOption = {
      server: 'http://fack:8190/iportal/',
      target: 'map',
      withCredentials: false
    };
    mapstudioWebmap = new WebMap(
      '',
      { ...commonOption },
      { style: { version: 8, sources: {}, layers: [] }, center: [0, 0], zoom: 1, crs: 'EPSG:3857' }
    );
    const callback = function (data) {
      const appreciableLayers = mapstudioWebmap.getLayers();
      expect(appreciableLayers.length).toBe(0);
      const webMap1 = new WebMap(1209527958, { ...commonOption, map: data.map, checkSameLayer: true });
      webMap1.once('mapcreatesucceeded', ({ layers }) => {
        expect(layers.length).toBe(2);
        expect(layers[0].reused).toBeUndefined();
        expect(layers[0].id).toBe('CHINA_DARK');
        expect(layers[1].reused).toBeUndefined();
        expect(layers[1].id).toBe('PopulationDistribution');
        const webMap2 = new WebMap(106007908, { ...commonOption, map: data.map, checkSameLayer: true });
        webMap2.once('mapcreatesucceeded', ({ layers, map }) => {
          expect(layers.length).toBe(3);
          expect(layers[0].reused).toBeTruthy();
          expect(layers[0].id).toBe('CHINA_DARK');
          expect(layers[1].reused).toBeTruthy();
          expect(layers[1].id).toBe('PopulationDistribution');
          expect(layers[2].reused).toBeUndefined();
          expect(layers[2].id).toBe('未命名数据');
          let layersOnMap = map.getStyle().layers;
          expect(layersOnMap.length).toBe(3);
          expect(layersOnMap[0].id).toBe('CHINA_DARK');
          expect(layersOnMap[1].id).toBe('PopulationDistribution');
          expect(layersOnMap[2].id).toBe('未命名数据');
          const listenEvents = {};
          spyOn(map, 'off').and.callFake((type, cb) => {
            listenEvents[type] = cb;
          });
          webMap2.cleanLayers();
          layersOnMap = map.getStyle().layers;
          expect(layersOnMap.length).toBe(2);
          expect(layersOnMap[0].id).toBe('CHINA_DARK');
          expect(layersOnMap[1].id).toBe('PopulationDistribution');
          expect(listenEvents.styledata).not.toBeUndefined();
          webMap1.cleanLayers();
          done();
        });
      });
    };
    mapstudioWebmap.once('mapcreatesucceeded', callback);
  });

  it('test webmap with l7layers append l7layers', (done) => {
    spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    const mapInfo = JSON.parse(mapstudioWebMap_L7Layers);
    spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'LineLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'PolygonLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'HeatmapLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
    spyOn(L7, 'Mapbox').and.callFake(mockL7.Mapbox);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf(`${id}/map.json`) > -1) {
        return Promise.resolve(new Response(JSON.stringify({ ...mapInfo, crs: 'EPSG:3857' })));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_L7Layers));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124Items));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124));
      }
      if (url.indexOf('411950022/map.json') > -1) {
        return Promise.resolve(new Response(mapstudioWebMap_chart));
      }
      if (url.indexOf('411950022.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_chart));
      }
      if (url.indexOf('/web/datas/888034348/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/888034348/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    mapstudioWebmap.once('mapcreatesucceeded', ({ map: firstMap, layers: firstLayersList }) => {
      expect(firstMap).not.toBeUndefined();
      const style = firstMap.getStyle();
      expect(style.layers.length).toEqual(mapInfo.layers.length);
      const webMap1 = new WebMap(id, { server, map: firstMap });
      webMap1.once('mapcreatesucceeded', ({ map, layers }) => {
        expect(map).toEqual(firstMap);
        expect(layers.length).toBe(firstLayersList.length);
        expect(map.$l7scene).not.toBeUndefined();
        const mapSpy = spyOn(map, 'remove');
        const sceneSpy = spyOn(map.$l7scene, 'removeAllLayer');
        webMap1.cleanLayers();
        expect(mapSpy).not.toHaveBeenCalled();
        expect(sceneSpy).not.toHaveBeenCalled();
        const webMap2 = new WebMap(411950022, { server, map: firstMap });
        webMap2.once('mapcreatesucceeded', ({ layers }) => {
          expect(layers.length).toBe(4);
          expect(layers[3].type).toBe('chart');
          const removeMarkerSpy = spyOn(map.$l7scene, 'removeMarkerLayer').and.callThrough();
          webMap2.cleanLayers();
          expect(removeMarkerSpy).toHaveBeenCalledTimes(1);
          done();
        });
      });
    });
  });

  it('toggle WebMapV3 layers visible', (done) => {
    spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    const mapInfo = JSON.parse(mapstudioWebMap_L7Layers);
    spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'LineLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'PolygonLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'HeatmapLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
    spyOn(L7, 'Mapbox').and.callFake(mockL7.Mapbox);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify({ ...mapInfo, crs: 'EPSG:3857' })));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_L7Layers));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124Items));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    mapstudioWebmap.once('mapcreatesucceeded', () => {
      let layers = mapstudioWebmap.getLayers();
      expect(layers.length).toBeGreaterThan(0);
      expect(layers[0].title).toBe('3D格网热力');
      expect(layers[0].visible).toBeTruthy();
      mapstudioWebmap.toggleLayerVisible(layers[0], false);
      layers = mapstudioWebmap.getLayers();
      expect(layers[0].visible).toBeFalsy();
      mapstudioWebmap.once('layerupdatechanged', () => {
        layers = mapstudioWebmap.getLayers();
        expect(layers[0].visible).toBeTruthy();
        done();
      });
      mapstudioWebmap.setLayersVisible([layers[0]], 'visible');
    });
  });

  it('layerCatalog separate ui id and render id', (done) => {
    spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(mapstudioWebMap_separate_layerCatalogId));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_separate_layerCatalogId));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });

    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      const webMapV3 = mapstudioWebmap._getWebMapInstance();
      const mapInfo = JSON.parse(mapstudioWebMap_separate_layerCatalogId);
      expect(style.layers.length).toBe(mapInfo.layers.length);
      expect(webMapV3.getLegends().length).not.toBe(0);
      const layerCatalogs = webMapV3.getLayerCatalog();
      expect(layerCatalogs.length).not.toBe(0);
      expect(layerCatalogs.length).toBe(mapInfo.metadata.layerCatalog.length);
      const appreciableLayers = webMapV3.getLayers();
      expect(layerCatalogs.length).toBe(appreciableLayers.length);
      done();
    });
  });

  it('when  builtIn crs was defined, dont set repeat', (done) => {
    spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        var mapJson = mapstudioWebMap_raster;
        return Promise.resolve(new Response(mapJson));
      }
      if (url.indexOf('617580084.json') > -1) {
        var appInfo = mapstudioAppInfo;
        return Promise.resolve(new Response(appInfo));
      }
      return Promise.resolve();
    });
    const originCrs = mapboxgl.CRS.get('EPSG:3857');
    const crsSetSpy = spyOn(mapboxgl.CRS, 'set').and.callThrough();
    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(crsSetSpy).not.toHaveBeenCalled();
      expect(mapboxgl.CRS.get('EPSG:3857')).toEqual(originCrs);
      expect(mapboxgl.CRS.get('EPSG:3857')).toEqual(map.getCRS());
      done();
    });
  });

  it('when uncommon crs was defined, dont set repeat', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    const wkt_4221 =
      'GEOGCS["Beijing 1954",DATUM["Beijing_1954",SPHEROID["Krassowsky 1940",6378245,298.3],TOWGS84[15.8,-154.4,-82.3,0,0,0,0]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4221"]]';
    const epsgCode = 'EPSG:4221';
    const nextMapInfo = {
      ...mapInfo,
      crs: {
        name: epsgCode,
        extent: [-180, -85, 180, 85],
        wkt: wkt_4221
      }
    };
    spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const originCrs = mapboxgl.CRS.get(epsgCode);
    const crsSetSpy = spyOn(mapboxgl.CRS, 'set').and.callThrough();
    mapstudioWebmap = new WebMap(nextMapInfo, {
      server: server,
      target: 'map'
    });

    mapstudioWebmap.once('mapcreatesucceeded', ({ map: map1 }) => {
      expect(originCrs).toBeFalsy();
      expect(mapboxgl.CRS.get(epsgCode)).toBeTruthy();
      expect(mapboxgl.CRS.get(epsgCode)).toEqual(map1.getCRS());
      expect(crsSetSpy).toHaveBeenCalledTimes(2);
      expect(map1.getCRS().getEpsgCode()).toBe(epsgCode);
      expect(map1.getCRS().getWKT()).toBe(wkt_4221);
      const originRange = [-180, 85];
      expect(map1.getCRS().getOrigin()).toEqual(originRange);
      mapstudioWebmap.setMapId({
        ...mapInfo,
        crs: {
          name: epsgCode,
          extent: [-120, -65, 120, 65],
          wkt: wkt_4221
        }
      });
      mapstudioWebmap.once('mapcreatesucceeded', ({ map: map2 }) => {
        expect(mapboxgl.CRS.get(epsgCode)).toBeTruthy();
        expect(mapboxgl.CRS.get(epsgCode)).toEqual(map2.getCRS());
        expect(map1.getCRS()).toEqual(map2.getCRS());
        expect(crsSetSpy).toHaveBeenCalledTimes(2);
        expect(map2.getCRS().getEpsgCode()).toBe(epsgCode);
        expect(map2.getCRS().getWKT()).toBe(wkt_4221);
        expect(map2.getCRS().getOrigin()).toEqual(originRange);
        delete mapboxgl.CRS[epsgCode.replace(':', '')];
        done();
      });
    });
  });

  it('setStyle', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(mapstudioWebMap_symbol));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msProjectINfo_symbol));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/1052943054/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124Items));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });

    mapstudioWebmap.once('mapcreatesucceeded', ({ map: map1 }) => {
      expect(map1).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map1);
      const style = map1.getStyle();
      const mapInfo = JSON.parse(mapstudioWebMap_symbol);
      expect(style.layers.length).toBe(mapInfo.layers.length);
      const legends = mapstudioWebmap.getLegends();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      const appreciableLayers = mapstudioWebmap.getLayers();
      expect(legends.length).not.toBe(0);
      expect(layerCatalogs.length).not.toBe(0);
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      expect(mapstudioWebmap.webMapInfo).toBeFalsy();
      expect(mapstudioWebmap.mapId).toBe(id);
      const cleanLayersSpy = spyOn(mapstudioWebmap, 'cleanLayers').and.callThrough();
      const nextMapInfo = JSON.parse(mapstudioWebMap_L7Layers);
      spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
      spyOn(L7, 'LineLayer').and.callFake(mockL7.PointLayer);
      spyOn(L7, 'PolygonLayer').and.callFake(mockL7.PointLayer);
      spyOn(L7, 'HeatmapLayer').and.callFake(mockL7.PointLayer);
      spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
      spyOn(L7, 'Mapbox').and.callFake(mockL7.Mapbox);
      mapstudioWebmap.map.addStyle = function ({ sprite }) {
        expect(sprite).toEqual(nextMapInfo.sprite);
      };
      mapboxgl.Map.prototype.getCRS = function () {
        return { epsgCode: nextMapInfo.crs.name, getExtent: () => {} };
      };
      mapstudioWebmap.options.relatedInfo = JSON.parse(msProjectINfo_L7Layers);
      mapstudioWebmap.setStyle(nextMapInfo, true);
      expect(cleanLayersSpy).toHaveBeenCalled();
      expect(mapstudioWebmap.webMapInfo).toEqual(nextMapInfo);
      expect(mapstudioWebmap.mapId).toBeFalsy();
      mapstudioWebmap.once('mapcreatesucceeded', ({ map: map2 }) => {
        expect(map2).not.toBeUndefined();
        expect(mapstudioWebmap.map).toEqual(map2);
        expect(map2).toEqual(map1);
        const style2 = map2.getStyle();
        expect(style2.layers.length).toBeLessThan(nextMapInfo.layers.length);
        expect(style2).not.toEqual(style);
        const legends2 = mapstudioWebmap.getLegends();
        const layerCatalogs2 = mapstudioWebmap.getLayerCatalog();
        const appreciableLayers2 = mapstudioWebmap.getLayers();
        expect(legends2.length).toBe(8);
        expect(legends2).not.toEqual(legends);
        expect(layerCatalogs2.length).not.toBe(0);
        expect(layerCatalogs2).not.toEqual(layerCatalogs);
        expect(layerCatalogs2.length).toBeLessThanOrEqual(appreciableLayers2.length);
        expect(appreciableLayers2).not.toEqual(appreciableLayers);
        delete mapboxgl.Map.prototype.getCRS;
        done();
      });
    });
  });
  it('webmap3.0 projectinfo popupInfo', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('web/config/portal.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      }
      if (url.indexOf('map.json') > -1) {
        return Promise.resolve(new Response(msPopupInfoMap));
      }
      if (url.indexOf('617580084.json') > -1) {
        return Promise.resolve(new Response(msPopupInfo));
      }
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    mapstudioWebmap = new WebMap(id, {
      server: server
    });

    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    mapstudioWebmap.on('mapcreatesucceeded', () => {
      const popupInfo = mapstudioWebmap.getPopupInfos();
      const Data = [
        {
          elements: [
            {
              fieldName: 'geometry',
              type: 'FIELD'
            },
            {
              type: 'DIVIDER'
            },
            {
              type: 'IMAGE',
              title: '无标题',
              value:
                'https://pic1.arkoo.com/56D0B40F99F841DF8A2425762AE2565D/picture/o_1i4qop009177v1tgf14db15he1iaj1is.jpg'
            },
            {
              type: 'DIVIDER'
            },
            {
              type: 'TEXT',
              infos: [
                {
                  insert: '这是一段文本信息\n'
                }
              ]
            }
          ],
          title: 'A点',
          layerId: 'A点'
        },
        {
          elements: [
            {
              fieldName: 'geometry',
              type: 'FIELD',
              fieldCaption: 'geometry'
            },
            {
              type: 'DIVIDER'
            },
            {
              type: 'TEXT',
              infos: [
                {
                  insert: ['concat', '这是一段文本信息', ['get', 'smpid'], '\n']
                }
              ]
            },
            {
              type: 'DIVIDER'
            },
            {
              type: 'IMAGE',
              title: ['concat', '无标题', ['get', 'adcode'], '-图片'],
              value: ['concat', ['get', 'adcode']]
            },
            {
              type: 'IMAGE',
              title: '无标题',
              value: ['concat', ['get', 'adcode']]
            },
            {
              type: 'VIDEO',
              title: '无标题-视频',
              value: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4'
            },
            {
              type: 'DIVIDER'
            },
            {
              type: 'IMAGE',
              title: ['concat', '无标题图片', ['get', 'adcode']],
              value: ['concat', ['get', 'name'], ['get', 'smpid']]
            }
          ],
          title: 'A面',
          layerId: 'A面'
        },
        {
          elements: [
            {
              fieldName: 'geometry',
              type: 'FIELD',
              fieldCaption: 'geometry'
            },
            {
              type: 'DIVIDER'
            },
            {
              type: 'TEXT',
              infos: [
                {
                  insert: ['concat', '这是一段文本信息', ['get', 'smpid'], '\n']
                }
              ]
            },
            {
              type: 'DIVIDER'
            },
            {
              type: 'IMAGE',
              title: ['concat', '无标题', ['get', 'adcode'], '-图片'],
              value: ['concat', ['get', 'adcode']]
            },
            {
              type: 'IMAGE',
              title: '无标题',
              value: ['concat', ['get', 'adcode']]
            },
            {
              type: 'VIDEO',
              title: '无标题-视频',
              value: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4'
            },
            {
              type: 'DIVIDER'
            },
            {
              type: 'IMAGE',
              title: ['concat', '无标题图片', ['get', 'adcode']],
              value: ['concat', ['get', 'name'], ['get', 'smpid']]
            }
          ],
          title: 'A面',
          layerId: 'A面1'
        }
      ];
      expect(popupInfo).toEqual(Data);

      const popupInfo1 = mapstudioWebmap._handler._getPopupInfos({
        catalogs: [
          {
            visible: true,
            catalogType: 'group',
            children: [
              {
                visible: true,
                catalogType: 'group',
                children: [
                  {
                    filter: ['all', ['==', '$type', 'Point'], ['has', 'NAME'], ['!=', 'NAME', '']],
                    visualization: {
                      renderer: [
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [3, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'left'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'NAME'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'marker_907936_6_A5A5A5',
                              style: {
                                layout: {
                                  'icon-image': 'marker_907936_6_A5A5A5'
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 11.55
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(115,106,79,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 6
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        },
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [3, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'left'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'NAME'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'marker_907936_6_A5A5A5',
                              style: {
                                layout: {
                                  'icon-image': 'marker_907936_6_A5A5A5'
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 11.55
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(115,106,79,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 6
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          },
                          type: 'text'
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'Town_P@Jingjin#1#1',
                    id: 'Town_P@Jingjin#1#1(12_24)',
                    serviceLayerGroupId: 'Level_5',
                    title: 'Town_P@Jingjin#1',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [12, 24],
                    layersContent: ['Town_P@Jingjin#1#1(12_24)']
                  },
                  {
                    filter: ['all', ['==', '$type', 'LineString'], ['has', 'name_1'], ['!=', 'name_1', '']],
                    visualization: {
                      renderer: [
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0.24
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'line'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'name_1'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: '',
                              style: {
                                layout: {
                                  'icon-image': ''
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 10.5
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(63,11,10,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        },
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0.24
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'line'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'name_1'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: '',
                              style: {
                                layout: {
                                  'icon-image': ''
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 10.5
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(63,11,10,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          },
                          type: 'text'
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'Road_L@Jingjin#8',
                    id: 'Road_L@Jingjin#8(12_24)',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'KD',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'KD_1',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'NAME',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmLength',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmTopoError',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'name_1',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'name_2_len',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'name_3_len',
                          type: 'FIELD'
                        }
                      ],
                      title: 'Road_L_街道'
                    },
                    serviceLayerGroupId: 'Level_5',
                    title: 'Road_L_街道',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [12, 24],
                    layersContent: ['Road_L@Jingjin#8(12_24)']
                  },
                  {
                    visible: true,
                    catalogType: 'group',
                    children: [
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['<', 'KD_1', 3]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(255,206,16,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 8.31,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(255,206,16,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 8.31
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#3',
                        id: 'Road_L@Jingjin#3_range_1(12_24)',
                        serviceLayerGroupId: 'Level_5',
                        title: 'min < X < 3',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [12, 24],
                        layersContent: ['Road_L@Jingjin#3_range_1(12_24)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 3], ['<', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(250,246,162,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 8.31,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(250,246,162,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 8.31
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#3',
                        id: 'Road_L@Jingjin#3_range_2(12_24)',
                        serviceLayerGroupId: 'Level_5',
                        title: '3 <= X < 4',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [12, 24],
                        layersContent: ['Road_L@Jingjin#3_range_2(12_24)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(255,255,255,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 6.8,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(255,255,255,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 6.8
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#3',
                        id: 'Road_L@Jingjin#3_range_3(12_24)',
                        serviceLayerGroupId: 'Level_5',
                        title: '4 <= X < max',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [12, 24],
                        layersContent: ['Road_L@Jingjin#3_range_3(12_24)']
                      }
                    ],
                    name: 'Road_L@Jingjin#3',
                    id: 'group_Road_L@Jingjin#3_1764665757037_33'
                  },
                  {
                    visible: true,
                    catalogType: 'group',
                    children: [
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['<', 'KD_1', 3]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(172,107,0,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 9.83,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(172,107,0,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 9.83
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#2',
                        id: 'Road_L@Jingjin#2_range_1(12_24)',
                        serviceLayerGroupId: 'Level_5',
                        title: 'min < X < 3',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [12, 24],
                        layersContent: ['Road_L@Jingjin#2_range_1(12_24)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 3], ['<', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(195,183,147,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 9.83,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(195,183,147,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 9.83
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#2',
                        id: 'Road_L@Jingjin#2_range_2(12_24)',
                        serviceLayerGroupId: 'Level_5',
                        title: '3 <= X < 4',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [12, 24],
                        layersContent: ['Road_L@Jingjin#2_range_2(12_24)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(180,180,180,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 9.07,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(180,180,180,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 9.07
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#2',
                        id: 'Road_L@Jingjin#2_range_3(12_24)',
                        serviceLayerGroupId: 'Level_5',
                        title: '4 <= X < max',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [12, 24],
                        layersContent: ['Road_L@Jingjin#2_range_3(12_24)']
                      }
                    ],
                    name: 'Road_L@Jingjin#2',
                    id: 'group_Road_L@Jingjin#2_1764665757037_37'
                  },
                  {
                    visible: true,
                    catalogType: 'group',
                    children: [
                      {
                        filter: ['all', ['==', '$type', 'Polygon']],
                        visualization: {
                          renderer: [
                            {
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'polygon-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible'
                                    },
                                    paint: {
                                      'fill-color': 'rgba(184,221,165,1.00)',
                                      'fill-opacity': 1,
                                      'fill-antialias': true
                                    }
                                  }
                                }
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(184,221,165,1.00)'
                              },
                              antialias: {
                                type: 'simple',
                                value: true
                              },
                              outlineColor: {
                                type: 'simple',
                                value: '#FFFFFF'
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'GreenFeild_R@Jingjin#2#1',
                        id: 'GreenFeild_R@Jingjin#2#1(12_24)',
                        serviceLayerGroupId: 'Level_5',
                        title: 'GreenFeild_R@Jingjin',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [12, 24],
                        layersContent: ['GreenFeild_R@Jingjin#2#1(12_24)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'Polygon']],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(184,221,165,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 0.38,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(184,221,165,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 0.38
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'GreenFeild_R@Jingjin#2#1',
                        id: 'GreenFeild_R@Jingjin#2#1_outline(12_24)',
                        serviceLayerGroupId: 'Level_5',
                        title: 'GreenFeild_R@Jingjin',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [12, 24],
                        layersContent: ['GreenFeild_R@Jingjin#2#1_outline(12_24)']
                      }
                    ],
                    name: 'GreenFeild_R@Jingjin',
                    id: 'group_GreenFeild_R@Jingjin#2#1_1764665757037_41'
                  }
                ],
                name: 'Level_5',
                id: 'group_Level_5_1764665757036_27'
              },
              {
                visible: true,
                catalogType: 'group',
                children: [
                  {
                    filter: ['all', ['==', '$type', 'Point'], ['has', 'ADMINNAME'], ['!=', 'ADMINNAME', '']],
                    visualization: {
                      renderer: [
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'ADMINNAME'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'BGRR_4489C9_9_{ADMINNAME_len}',
                              style: {
                                layout: {
                                  'icon-image': 'BGRR_4489C9_9_{ADMINNAME_len}'
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 10.5
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(255,255,255,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        },
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'ADMINNAME'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'BGRR_4489C9_9_{ADMINNAME_len}',
                              style: {
                                layout: {
                                  'icon-image': 'BGRR_4489C9_9_{ADMINNAME_len}'
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 10.5
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(255,255,255,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          },
                          type: 'text'
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'County_P@Jingjin#1',
                    id: 'County_P@Jingjin#1(9_13)',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'ADMINNAME',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'ADMINNAME_len',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        }
                      ],
                      title: 'County_P@Jingjin#1'
                    },
                    serviceLayerGroupId: 'Level_3',
                    title: 'County_P@Jingjin#1',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [9, 13],
                    layersContent: ['County_P@Jingjin#1(9_13)']
                  },
                  {
                    visible: true,
                    catalogType: 'group',
                    children: [
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['<', 'KD_1', 3]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(255,165,56,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 0.76,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(255,165,56,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 0.76
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#10',
                        id: 'Road_L@Jingjin#10_range_1(9_10)',
                        serviceLayerGroupId: 'Level_3',
                        title: 'min <= X < 3',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [9, 10],
                        layersContent: ['Road_L@Jingjin#10_range_1(9_10)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 3], ['<', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(250,225,143,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 0.76,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(250,225,143,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 0.76
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#10',
                        id: 'Road_L@Jingjin#10_range_2(9_10)',
                        serviceLayerGroupId: 'Level_3',
                        title: '3 <= X < 4',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [9, 10],
                        layersContent: ['Road_L@Jingjin#10_range_2(9_10)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(235,232,152,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 0.76,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(235,232,152,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 0.76
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#10',
                        id: 'Road_L@Jingjin#10_range_3(9_10)',
                        serviceLayerGroupId: 'Level_3',
                        title: '4 <= X < max',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [9, 10],
                        layersContent: ['Road_L@Jingjin#10_range_3(9_10)']
                      }
                    ],
                    name: 'Road_L@Jingjin',
                    id: 'group_Road_L@Jingjin#10_1764665757037_47'
                  }
                ],
                name: 'Level_3',
                id: 'group_Level_3_1764665757037_44'
              },
              {
                visible: true,
                catalogType: 'group',
                children: [
                  {
                    filter: ['all', ['==', '$type', 'LineString'], ['has', 'name_2'], ['!=', 'name_2', '']],
                    visualization: {
                      renderer: [
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'name_2'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'BGRR_6C9F41_8_{name_2_len}',
                              style: {
                                layout: {
                                  'icon-image': 'BGRR_6C9F41_8_{name_2_len}'
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 8.4
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(255,255,255,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['MS PGothic Bold', 'MS PGothic']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        },
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'name_2'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'BGRR_6C9F41_8_{name_2_len}',
                              style: {
                                layout: {
                                  'icon-image': 'BGRR_6C9F41_8_{name_2_len}'
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 8.4
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(255,255,255,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['MS PGothic Bold', 'MS PGothic']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          },
                          type: 'text'
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'Road_L@Jingjin#7',
                    id: 'Road_L@Jingjin#7(10_12)',
                    serviceLayerGroupId: 'Level_4',
                    title: 'Road_L_国道',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [10, 12],
                    layersContent: ['Road_L@Jingjin#7(10_12)']
                  },
                  {
                    filter: ['all', ['==', '$type', 'LineString'], ['has', 'name_3'], ['!=', 'name_3', '']],
                    visualization: {
                      renderer: [
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'name_3'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'BGRR_CC603F_8_{name_3_len}',
                              style: {
                                layout: {
                                  'icon-image': 'BGRR_CC603F_8_{name_3_len}'
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 8.4
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(255,255,255,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['MS PGothic Bold', 'MS PGothic']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        },
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'name_3'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'BGRR_CC603F_8_{name_3_len}',
                              style: {
                                layout: {
                                  'icon-image': 'BGRR_CC603F_8_{name_3_len}'
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 8.4
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(255,255,255,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['MS PGothic Bold', 'MS PGothic']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          },
                          type: 'text'
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'Road_L@Jingjin#6',
                    id: 'Road_L@Jingjin#6(10_12)',
                    serviceLayerGroupId: 'Level_4',
                    title: 'Road_L_省道',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [10, 12],
                    layersContent: ['Road_L@Jingjin#6(10_12)']
                  },
                  {
                    visible: true,
                    catalogType: 'group',
                    children: [
                      {
                        filter: ['all', ['==', '$type', 'LineString']],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(181,181,181,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-cap': 'square',
                                      'line-join': 'miter'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 3.4,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(181,181,181,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'square'
                              },
                              width: {
                                type: 'simple',
                                value: 3.4
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Railway_L@Jingjin',
                        id: 'Railway_L@Jingjin_0(10_12)',
                        serviceLayerGroupId: 'Level_4',
                        title: 'Railway_L@Jingjin',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [10, 12],
                        layersContent: ['Railway_L@Jingjin_0(10_12)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString']],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [10, 10]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(255,255,255,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-cap': 'square',
                                      'line-join': 'miter'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 1.51,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-dasharray': [10, 10],
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(255,255,255,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'square'
                              },
                              width: {
                                type: 'simple',
                                value: 1.51
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Railway_L@Jingjin',
                        id: 'Railway_L@Jingjin_1(10_12)',
                        serviceLayerGroupId: 'Level_4',
                        title: 'Railway_L@Jingjin',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [10, 12],
                        layersContent: ['Railway_L@Jingjin_1(10_12)']
                      }
                    ],
                    name: 'Railway_L@Jingjin',
                    id: 'group_Railway_L@Jingjin_1764665757037_58'
                  },
                  {
                    visible: true,
                    catalogType: 'group',
                    children: [
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['<', 'KD_1', 3]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(255,206,16,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 1.51,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(255,206,16,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 1.51
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#5',
                        id: 'Road_L@Jingjin#5_range_1(10_12)',
                        serviceLayerGroupId: 'Level_4',
                        title: 'min < X < 3',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [10, 12],
                        layersContent: ['Road_L@Jingjin#5_range_1(10_12)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 3], ['<', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(250,246,162,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 1.51,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(250,246,162,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 1.51
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#5',
                        id: 'Road_L@Jingjin#5_range_2(10_12)',
                        serviceLayerGroupId: 'Level_4',
                        title: '3 <= X < 4',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [10, 12],
                        layersContent: ['Road_L@Jingjin#5_range_2(10_12)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(255,255,255,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 1.51,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(255,255,255,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 1.51
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#5',
                        id: 'Road_L@Jingjin#5_range_3(10_12)',
                        serviceLayerGroupId: 'Level_4',
                        title: '4 <= X < max',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [10, 12],
                        layersContent: ['Road_L@Jingjin#5_range_3(10_12)']
                      }
                    ],
                    name: 'Road_L@Jingjin#5',
                    id: 'group_Road_L@Jingjin#5_1764665757037_61'
                  },
                  {
                    visible: true,
                    catalogType: 'group',
                    children: [
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['<', 'KD_1', 3]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(172,107,0,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 3.02,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(172,107,0,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 3.02
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#4',
                        id: 'Road_L@Jingjin#4_range_1(10_12)',
                        serviceLayerGroupId: 'Level_4',
                        title: 'min < X < 3',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [10, 12],
                        layersContent: ['Road_L@Jingjin#4_range_1(10_12)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 3], ['<', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(195,183,147,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 3.02,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(195,183,147,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 3.02
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#4',
                        id: 'Road_L@Jingjin#4_range_2(10_12)',
                        serviceLayerGroupId: 'Level_4',
                        title: '3 <= X < 4',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [10, 12],
                        layersContent: ['Road_L@Jingjin#4_range_2(10_12)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(180,180,180,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 3.02,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(180,180,180,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 3.02
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#4',
                        id: 'Road_L@Jingjin#4_range_3(10_12)',
                        serviceLayerGroupId: 'Level_4',
                        title: '4 <= X < max',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [10, 12],
                        layersContent: ['Road_L@Jingjin#4_range_3(10_12)']
                      }
                    ],
                    name: 'Road_L@Jingjin#4',
                    id: 'group_Road_L@Jingjin#4_1764665757038_65'
                  },
                  {
                    visible: true,
                    catalogType: 'group',
                    children: [
                      {
                        filter: ['all', ['==', '$type', 'Polygon']],
                        visualization: {
                          renderer: [
                            {
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'polygon-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible'
                                    },
                                    paint: {
                                      'fill-color': 'rgba(184,221,165,1.00)',
                                      'fill-opacity': 1,
                                      'fill-antialias': true
                                    }
                                  }
                                }
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(184,221,165,1.00)'
                              },
                              antialias: {
                                type: 'simple',
                                value: true
                              },
                              outlineColor: {
                                type: 'simple',
                                value: '#FFFFFF'
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'GreenFeild_R@Jingjin#2#2',
                        id: 'GreenFeild_R@Jingjin#2#2(10_12)',
                        serviceLayerGroupId: 'Level_4',
                        title: 'GreenFeild_R@Jingjin',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [10, 12],
                        layersContent: ['GreenFeild_R@Jingjin#2#2(10_12)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'Polygon']],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(184,221,165,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 0.38,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(184,221,165,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 0.38
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'GreenFeild_R@Jingjin#2#2',
                        id: 'GreenFeild_R@Jingjin#2#2_outline(10_12)',
                        serviceLayerGroupId: 'Level_4',
                        title: 'GreenFeild_R@Jingjin',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [10, 12],
                        layersContent: ['GreenFeild_R@Jingjin#2#2_outline(10_12)']
                      }
                    ],
                    name: 'GreenFeild_R@Jingjin',
                    id: 'group_GreenFeild_R@Jingjin#2#2_1764665757038_69'
                  }
                ],
                name: 'Level_4',
                id: 'group_Level_4_1764665757037_53'
              },
              {
                visible: true,
                catalogType: 'group',
                children: [
                  {
                    filter: ['all', ['==', '$type', 'Point'], ['has', 'ADMINNAME'], ['!=', 'ADMINNAME', '']],
                    visualization: {
                      renderer: [
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'ADMINNAME'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: '',
                              style: {
                                layout: {
                                  'icon-image': ''
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 11.55
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(255,255,255,1.00)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(164,0,91,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 1
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        },
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'ADMINNAME'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: '',
                              style: {
                                layout: {
                                  'icon-image': ''
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 11.55
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(255,255,255,1.00)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(164,0,91,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 1
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          },
                          type: 'text'
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'County_P@Jingjin#2',
                    id: 'County_P@Jingjin#2(8_9)',
                    serviceLayerGroupId: 'Level_2',
                    title: '行政区划名称',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [8, 9],
                    layersContent: ['County_P@Jingjin#2(8_9)']
                  },
                  {
                    filter: ['all', ['==', '$type', 'Point'], ['has', 'ADMINNAME'], ['!=', 'ADMINNAME', '']],
                    visualization: {
                      renderer: [
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'bottom'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'ADMINNAME'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: '',
                              style: {
                                layout: {
                                  'icon-image': ''
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 12.6
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(255,255,255,1.00)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(192,0,0,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 1
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        },
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'bottom'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'ADMINNAME'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: '',
                              style: {
                                layout: {
                                  'icon-image': ''
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 12.6
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(255,255,255,1.00)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(192,0,0,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 1
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          },
                          type: 'text'
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'Captital_P@Jingjin#2#1',
                    id: 'Captital_P@Jingjin#2#1(8_8)',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'ADMINCODE',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'ADMINNAME',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        }
                      ],
                      title: 'Captital_P@Jingjin#2'
                    },
                    serviceLayerGroupId: 'Level_2',
                    title: 'Captital_P@Jingjin#2',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [8, 8],
                    layersContent: ['Captital_P@Jingjin#2#1(8_8)']
                  },
                  {
                    visible: true,
                    catalogType: 'group',
                    children: [
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['<', 'KD_1', 3]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(255,165,56,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 0.76,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(255,165,56,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 0.76
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#1#1',
                        id: 'Road_L@Jingjin#1#1_range_1(8_9)',
                        serviceLayerGroupId: 'Level_2',
                        title: 'min <= X < 3',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [8, 9],
                        layersContent: ['Road_L@Jingjin#1#1_range_1(8_9)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 3], ['<', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(250,225,143,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 0.76,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(250,225,143,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 0.76
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#1#1',
                        id: 'Road_L@Jingjin#1#1_range_2(8_9)',
                        serviceLayerGroupId: 'Level_2',
                        title: '3 <= X < 4',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [8, 9],
                        layersContent: ['Road_L@Jingjin#1#1_range_2(8_9)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'LineString'], ['>=', 'KD_1', 4]],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(235,232,152,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 0.76,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(235,232,152,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 0.76
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Road_L@Jingjin#1#1',
                        id: 'Road_L@Jingjin#1#1_range_3(8_9)',
                        serviceLayerGroupId: 'Level_2',
                        title: '4 <= X < max',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [8, 9],
                        layersContent: ['Road_L@Jingjin#1#1_range_3(8_9)']
                      }
                    ],
                    name: 'Road_L@Jingjin#1',
                    id: 'group_Road_L@Jingjin#1#1_1764665757038_77'
                  }
                ],
                name: 'Level_2',
                id: 'group_Level_2_1764665757038_72'
              },
              {
                visible: true,
                catalogType: 'group',
                children: [
                  {
                    visible: true,
                    catalogType: 'group',
                    children: [
                      {
                        filter: [
                          'all',
                          ['==', '$type', 'Point'],
                          ['==', 'ADMINNAME', '北京'],
                          ['has', 'ADMINNAME'],
                          ['!=', 'ADMINNAME', '']
                        ],
                        visualization: {
                          renderer: [
                            {
                              rotate: {
                                type: 'simple',
                                value: 0
                              },
                              textLetterSpacing: {
                                type: 'simple',
                                value: 0
                              },
                              textTranslate: {
                                type: 'simple',
                                value: [0, -7]
                              },
                              color: {
                                type: 'simple',
                                value: '#000000'
                              },
                              symbolPlacement: {
                                type: 'simple',
                                value: 'point'
                              },
                              textAnchor: {
                                type: 'simple',
                                value: 'bottom'
                              },
                              translate: {
                                type: 'simple',
                                value: [0, 1]
                              },
                              textRotate: {
                                type: 'simple',
                                value: 360
                              },
                              textField: {
                                type: 'simple',
                                value: 'ADMINNAME'
                              },
                              textHaloBlur: {
                                type: 'simple',
                                value: 0
                              },
                              transform: {
                                type: 'simple',
                                value: 'none'
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'marker_75_3_FF0000',
                                  style: {
                                    layout: {
                                      'icon-image': 'marker_75_3_FF0000'
                                    }
                                  }
                                }
                              },
                              textTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              justify: {
                                type: 'simple',
                                value: 'left'
                              },
                              ignorePlacement: {
                                type: 'simple',
                                value: false
                              },
                              textAllowOverlap: {
                                type: 'simple',
                                value: false
                              },
                              maxWidth: {
                                type: 'simple',
                                value: 10
                              },
                              textSize: {
                                type: 'simple',
                                value: 12.6
                              },
                              textHaloColor: {
                                type: 'simple',
                                value: 'rgba(255,255,255,1.00)'
                              },
                              textColor: {
                                type: 'simple',
                                value: 'rgba(192,0,0,1.00)'
                              },
                              size: {
                                type: 'simple',
                                value: 14
                              },
                              allowOverlap: {
                                type: 'simple',
                                value: false
                              },
                              translateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              anchor: {
                                type: 'simple',
                                value: 'center'
                              },
                              textOpacity: {
                                type: 'simple',
                                value: 1
                              },
                              textHaloWidth: {
                                type: 'simple',
                                value: 1
                              },
                              lineHeight: {
                                type: 'simple',
                                value: 1.2
                              },
                              textFont: {
                                type: 'simple',
                                value: ['Microsoft YaHei']
                              },
                              textIgnorePlacement: {
                                type: 'simple',
                                value: false
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            },
                            {
                              rotate: {
                                type: 'simple',
                                value: 0
                              },
                              textLetterSpacing: {
                                type: 'simple',
                                value: 0
                              },
                              textTranslate: {
                                type: 'simple',
                                value: [0, -7]
                              },
                              color: {
                                type: 'simple',
                                value: '#000000'
                              },
                              symbolPlacement: {
                                type: 'simple',
                                value: 'point'
                              },
                              textAnchor: {
                                type: 'simple',
                                value: 'bottom'
                              },
                              translate: {
                                type: 'simple',
                                value: [0, 1]
                              },
                              textRotate: {
                                type: 'simple',
                                value: 360
                              },
                              textField: {
                                type: 'simple',
                                value: 'ADMINNAME'
                              },
                              textHaloBlur: {
                                type: 'simple',
                                value: 0
                              },
                              transform: {
                                type: 'simple',
                                value: 'none'
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'marker_75_3_FF0000',
                                  style: {
                                    layout: {
                                      'icon-image': 'marker_75_3_FF0000'
                                    }
                                  }
                                }
                              },
                              textTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              justify: {
                                type: 'simple',
                                value: 'left'
                              },
                              ignorePlacement: {
                                type: 'simple',
                                value: false
                              },
                              textAllowOverlap: {
                                type: 'simple',
                                value: false
                              },
                              maxWidth: {
                                type: 'simple',
                                value: 10
                              },
                              textSize: {
                                type: 'simple',
                                value: 12.6
                              },
                              textHaloColor: {
                                type: 'simple',
                                value: 'rgba(255,255,255,1.00)'
                              },
                              textColor: {
                                type: 'simple',
                                value: 'rgba(192,0,0,1.00)'
                              },
                              size: {
                                type: 'simple',
                                value: 14
                              },
                              allowOverlap: {
                                type: 'simple',
                                value: false
                              },
                              translateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              anchor: {
                                type: 'simple',
                                value: 'center'
                              },
                              textOpacity: {
                                type: 'simple',
                                value: 1
                              },
                              textHaloWidth: {
                                type: 'simple',
                                value: 1
                              },
                              lineHeight: {
                                type: 'simple',
                                value: 1.2
                              },
                              textFont: {
                                type: 'simple',
                                value: ['Microsoft YaHei']
                              },
                              textIgnorePlacement: {
                                type: 'simple',
                                value: false
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              },
                              type: 'text'
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Captital_P@Jingjin#2#2',
                        id: 'Captital_P@Jingjin#1_uniqueandlabel_北京(0_8)',
                        serviceLayerGroupId: 'Level_1',
                        title: 'Captital_P@Jingjin#2',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [0, 8],
                        layersContent: ['Captital_P@Jingjin#1_uniqueandlabel_北京(0_8)']
                      },
                      {
                        filter: [
                          'all',
                          ['==', '$type', 'Point'],
                          ['==', 'ADMINNAME', '天津'],
                          ['has', 'ADMINNAME'],
                          ['!=', 'ADMINNAME', '']
                        ],
                        visualization: {
                          renderer: [
                            {
                              rotate: {
                                type: 'simple',
                                value: 0
                              },
                              textLetterSpacing: {
                                type: 'simple',
                                value: 0
                              },
                              textTranslate: {
                                type: 'simple',
                                value: [0, -2]
                              },
                              color: {
                                type: 'simple',
                                value: '#000000'
                              },
                              symbolPlacement: {
                                type: 'simple',
                                value: 'point'
                              },
                              textAnchor: {
                                type: 'simple',
                                value: 'bottom'
                              },
                              translate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              textRotate: {
                                type: 'simple',
                                value: 360
                              },
                              textField: {
                                type: 'simple',
                                value: 'ADMINNAME'
                              },
                              textHaloBlur: {
                                type: 'simple',
                                value: 0
                              },
                              transform: {
                                type: 'simple',
                                value: 'none'
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'marker_0_2_C00000',
                                  style: {
                                    layout: {
                                      'icon-image': 'marker_0_2_C00000'
                                    }
                                  }
                                }
                              },
                              textTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              justify: {
                                type: 'simple',
                                value: 'left'
                              },
                              ignorePlacement: {
                                type: 'simple',
                                value: false
                              },
                              textAllowOverlap: {
                                type: 'simple',
                                value: false
                              },
                              maxWidth: {
                                type: 'simple',
                                value: 10
                              },
                              textSize: {
                                type: 'simple',
                                value: 12.6
                              },
                              textHaloColor: {
                                type: 'simple',
                                value: 'rgba(255,255,255,1.00)'
                              },
                              textColor: {
                                type: 'simple',
                                value: 'rgba(192,0,0,1.00)'
                              },
                              size: {
                                type: 'simple',
                                value: 5
                              },
                              allowOverlap: {
                                type: 'simple',
                                value: false
                              },
                              translateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              anchor: {
                                type: 'simple',
                                value: 'center'
                              },
                              textOpacity: {
                                type: 'simple',
                                value: 1
                              },
                              textHaloWidth: {
                                type: 'simple',
                                value: 1
                              },
                              lineHeight: {
                                type: 'simple',
                                value: 1.2
                              },
                              textFont: {
                                type: 'simple',
                                value: ['Microsoft YaHei']
                              },
                              textIgnorePlacement: {
                                type: 'simple',
                                value: false
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            },
                            {
                              rotate: {
                                type: 'simple',
                                value: 0
                              },
                              textLetterSpacing: {
                                type: 'simple',
                                value: 0
                              },
                              textTranslate: {
                                type: 'simple',
                                value: [0, -2]
                              },
                              color: {
                                type: 'simple',
                                value: '#000000'
                              },
                              symbolPlacement: {
                                type: 'simple',
                                value: 'point'
                              },
                              textAnchor: {
                                type: 'simple',
                                value: 'bottom'
                              },
                              translate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              textRotate: {
                                type: 'simple',
                                value: 360
                              },
                              textField: {
                                type: 'simple',
                                value: 'ADMINNAME'
                              },
                              textHaloBlur: {
                                type: 'simple',
                                value: 0
                              },
                              transform: {
                                type: 'simple',
                                value: 'none'
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'marker_0_2_C00000',
                                  style: {
                                    layout: {
                                      'icon-image': 'marker_0_2_C00000'
                                    }
                                  }
                                }
                              },
                              textTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              justify: {
                                type: 'simple',
                                value: 'left'
                              },
                              ignorePlacement: {
                                type: 'simple',
                                value: false
                              },
                              textAllowOverlap: {
                                type: 'simple',
                                value: false
                              },
                              maxWidth: {
                                type: 'simple',
                                value: 10
                              },
                              textSize: {
                                type: 'simple',
                                value: 12.6
                              },
                              textHaloColor: {
                                type: 'simple',
                                value: 'rgba(255,255,255,1.00)'
                              },
                              textColor: {
                                type: 'simple',
                                value: 'rgba(192,0,0,1.00)'
                              },
                              size: {
                                type: 'simple',
                                value: 5
                              },
                              allowOverlap: {
                                type: 'simple',
                                value: false
                              },
                              translateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              anchor: {
                                type: 'simple',
                                value: 'center'
                              },
                              textOpacity: {
                                type: 'simple',
                                value: 1
                              },
                              textHaloWidth: {
                                type: 'simple',
                                value: 1
                              },
                              lineHeight: {
                                type: 'simple',
                                value: 1.2
                              },
                              textFont: {
                                type: 'simple',
                                value: ['Microsoft YaHei']
                              },
                              textIgnorePlacement: {
                                type: 'simple',
                                value: false
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              },
                              type: 'text'
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Captital_P@Jingjin#2#2',
                        id: 'Captital_P@Jingjin#1_uniqueandlabel_天津(0_8)',
                        serviceLayerGroupId: 'Level_1',
                        title: 'Captital_P@Jingjin#2',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [0, 8],
                        layersContent: ['Captital_P@Jingjin#1_uniqueandlabel_天津(0_8)']
                      }
                    ],
                    name: 'Captital_P@Jingjin#2',
                    id: 'group_Captital_P@Jingjin#2#2_1764665757038_82'
                  },
                  {
                    filter: ['all', ['==', '$type', 'Point']],
                    visualization: {
                      renderer: [
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 0
                          },
                          textField: {
                            type: 'simple',
                            value: ''
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            field: ['ADMINNAME'],
                            defaultValue: {
                              symbolId: 'marker_0_2_000000',
                              style: {
                                layout: {
                                  'icon-image': 'marker_0_2_000000'
                                }
                              }
                            },
                            values: [
                              {
                                value: {
                                  symbolId: 'marker_75_3_FF0000',
                                  style: {
                                    layout: {
                                      'icon-image': 'marker_75_3_FF0000'
                                    }
                                  }
                                },
                                key: '北京'
                              },
                              {
                                value: {
                                  symbolId: 'marker_0_2_C00000',
                                  style: {
                                    layout: {
                                      'icon-image': 'marker_0_2_C00000'
                                    }
                                  }
                                },
                                key: '天津'
                              }
                            ],
                            type: 'unique'
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'center'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 16
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: '#000000'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: true
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Open Sans Regular', 'Arial Unicode MS Regular']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'Captital_P@Jingjin#1',
                    id: 'Captital_P@Jingjin#1_unique_(8_8)',
                    serviceLayerGroupId: 'Level_1',
                    title: 'Captital_P@Jingjin#1',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [8, 8],
                    layersContent: ['Captital_P@Jingjin#1_unique_(8_8)']
                  }
                ],
                name: 'Level_1',
                id: 'group_Level_1_1764665757038_81'
              },
              {
                visible: true,
                catalogType: 'group',
                children: [
                  {
                    filter: ['all', ['==', '$type', 'Point'], ['has', 'NAME'], ['!=', 'NAME', '']],
                    visualization: {
                      renderer: [
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [7.56, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'NAME'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: '',
                              style: {
                                layout: {
                                  'icon-image': ''
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 11.55
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(115,106,79,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        },
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [7.56, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 360
                          },
                          textField: {
                            type: 'simple',
                            value: 'NAME'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: '',
                              style: {
                                layout: {
                                  'icon-image': ''
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 11.55
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(115,106,79,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Microsoft YaHei']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          },
                          type: 'text'
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'Neighbor_P@Jingjin#1',
                    id: 'Neighbor_P@Jingjin#1(7_24)',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'ADCLASS',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'CODE',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'NAME',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        }
                      ],
                      title: '相邻行政区划名称'
                    },
                    serviceLayerGroupId: 'Level_0',
                    title: '相邻行政区划名称',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [7, 24],
                    layersContent: ['Neighbor_P@Jingjin#1(7_24)']
                  },
                  {
                    filter: ['all', ['==', '$type', 'LineString']],
                    visualization: {
                      renderer: [
                        {
                          lineDasharray: {
                            type: 'simple',
                            value: [1, 0]
                          },
                          color: {
                            type: 'simple',
                            value: 'rgba(107,107,107,1.00)'
                          },
                          lineTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          lineMiterLimit: {
                            type: 'simple',
                            value: 2
                          },
                          lineOffset: {
                            type: 'simple',
                            value: 0
                          },
                          lineJoin: {
                            type: 'simple',
                            value: 'miter'
                          },
                          lineRoundLimit: {
                            type: 'simple',
                            value: 1.05
                          },
                          lineTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          lineGapWidth: {
                            type: 'simple',
                            value: 0
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'line-0',
                              style: {
                                layout: {
                                  visibility: 'visible',
                                  'line-miter-limit': 2,
                                  'line-round-limit': 1.05,
                                  'line-join': 'miter',
                                  'line-cap': 'butt'
                                },
                                paint: {
                                  'line-translate-anchor': 'map',
                                  'line-width': 1.13,
                                  'line-gap-width': 0,
                                  'line-offset': 0,
                                  'line-opacity': 1,
                                  'line-translate': [0, 0],
                                  'line-color': 'rgba(107,107,107,1.00)'
                                }
                              }
                            }
                          },
                          lineCap: {
                            type: 'simple',
                            value: 'butt'
                          },
                          width: {
                            type: 'simple',
                            value: 1.13
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'County_L@Jingjin#1',
                    id: 'County_L@Jingjin#1(0_10)',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmLength',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmTopoError',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        }
                      ],
                      title: 'County_L@Jingjin'
                    },
                    serviceLayerGroupId: 'Level_0',
                    title: 'County_L@Jingjin',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [0, 10],
                    layersContent: ['County_L@Jingjin#1(0_10)']
                  },
                  {
                    filter: ['all', ['==', '$type', 'LineString']],
                    visualization: {
                      renderer: [
                        {
                          lineDasharray: {
                            type: 'simple',
                            value: [1, 0]
                          },
                          color: {
                            type: 'simple',
                            value: 'rgba(0,170,231,1.00)'
                          },
                          lineTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          lineMiterLimit: {
                            type: 'simple',
                            value: 2
                          },
                          lineOffset: {
                            type: 'simple',
                            value: 0
                          },
                          lineJoin: {
                            type: 'simple',
                            value: 'miter'
                          },
                          lineRoundLimit: {
                            type: 'simple',
                            value: 1.05
                          },
                          lineTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          lineGapWidth: {
                            type: 'simple',
                            value: 0
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'line-0',
                              style: {
                                layout: {
                                  visibility: 'visible',
                                  'line-miter-limit': 2,
                                  'line-round-limit': 1.05,
                                  'line-join': 'miter',
                                  'line-cap': 'butt'
                                },
                                paint: {
                                  'line-translate-anchor': 'map',
                                  'line-width': 1.13,
                                  'line-gap-width': 0,
                                  'line-offset': 0,
                                  'line-opacity': 1,
                                  'line-translate': [0, 0],
                                  'line-color': 'rgba(0,170,231,1.00)'
                                }
                              }
                            }
                          },
                          lineCap: {
                            type: 'simple',
                            value: 'butt'
                          },
                          width: {
                            type: 'simple',
                            value: 1.13
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'Coastline_L@Jingjin#1',
                    id: 'Coastline_L@Jingjin#1(0_24)',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmLength',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmTopoError',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        }
                      ],
                      title: 'Coastline_L@Jingjin'
                    },
                    serviceLayerGroupId: 'Level_0',
                    title: 'Coastline_L@Jingjin',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [0, 24],
                    layersContent: ['Coastline_L@Jingjin#1(0_24)']
                  },
                  {
                    filter: ['all', ['==', '$type', 'LineString']],
                    visualization: {
                      renderer: [
                        {
                          lineDasharray: {
                            type: 'simple',
                            value: [1, 0]
                          },
                          color: {
                            type: 'simple',
                            value: 'rgba(170,170,170,1.00)'
                          },
                          lineTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          lineMiterLimit: {
                            type: 'simple',
                            value: 2
                          },
                          lineOffset: {
                            type: 'simple',
                            value: 0
                          },
                          lineJoin: {
                            type: 'simple',
                            value: 'miter'
                          },
                          lineRoundLimit: {
                            type: 'simple',
                            value: 1.05
                          },
                          lineTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          lineGapWidth: {
                            type: 'simple',
                            value: 0
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'line-0',
                              style: {
                                layout: {
                                  visibility: 'visible',
                                  'line-miter-limit': 2,
                                  'line-round-limit': 1.05,
                                  'line-join': 'miter',
                                  'line-cap': 'butt'
                                },
                                paint: {
                                  'line-translate-anchor': 'map',
                                  'line-width': 0.76,
                                  'line-gap-width': 0,
                                  'line-offset': 0,
                                  'line-opacity': 1,
                                  'line-translate': [0, 0],
                                  'line-color': 'rgba(170,170,170,1.00)'
                                }
                              }
                            }
                          },
                          lineCap: {
                            type: 'simple',
                            value: 'butt'
                          },
                          width: {
                            type: 'simple',
                            value: 0.76
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'Province_L@Jingjin',
                    id: 'Province_L@Jingjin(0_24)',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmLength',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmTopoError',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        }
                      ],
                      title: 'Province_L@Jingjin'
                    },
                    serviceLayerGroupId: 'Level_0',
                    title: 'Province_L@Jingjin',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [0, 24],
                    layersContent: ['Province_L@Jingjin(0_24)']
                  },
                  {
                    filter: ['all', ['==', '$type', 'LineString']],
                    visualization: {
                      renderer: [
                        {
                          lineDasharray: {
                            type: 'simple',
                            value: [20, 10]
                          },
                          color: {
                            type: 'simple',
                            value: 'rgba(107,105,107,1.00)'
                          },
                          lineTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          lineMiterLimit: {
                            type: 'simple',
                            value: 2
                          },
                          lineOffset: {
                            type: 'simple',
                            value: 0
                          },
                          lineJoin: {
                            type: 'simple',
                            value: 'miter'
                          },
                          lineRoundLimit: {
                            type: 'simple',
                            value: 1.05
                          },
                          lineTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          lineGapWidth: {
                            type: 'simple',
                            value: 0
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'line-0',
                              style: {
                                layout: {
                                  visibility: 'visible',
                                  'line-miter-limit': 2,
                                  'line-round-limit': 1.05,
                                  'line-cap': 'round',
                                  'line-join': 'miter'
                                },
                                paint: {
                                  'line-translate-anchor': 'map',
                                  'line-width': 0.38,
                                  'line-gap-width': 0,
                                  'line-offset': 0,
                                  'line-opacity': 1,
                                  'line-dasharray': [20, 10],
                                  'line-translate': [0, 0],
                                  'line-color': 'rgba(107,105,107,1.00)'
                                }
                              }
                            }
                          },
                          lineCap: {
                            type: 'simple',
                            value: 'round'
                          },
                          width: {
                            type: 'simple',
                            value: 0.38
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'MapDivision_L@Jingjin#1',
                    id: 'MapDivision_L@Jingjin#1_0(0_9)',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'LATITUDE',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'LATITUDESIMPLE',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmLength',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmTopoError',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        }
                      ],
                      title: 'MapDivision_L@Jingjin'
                    },
                    serviceLayerGroupId: 'Level_0',
                    title: 'MapDivision_L@Jingjin',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [0, 9],
                    layersContent: ['MapDivision_L@Jingjin#1_0(0_9)']
                  },
                  {
                    filter: ['all', ['==', '$type', 'Point']],
                    visualization: {
                      renderer: [
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'top-left'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 0
                          },
                          textField: {
                            type: 'simple',
                            value: 'TEXT_VALUE'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: '',
                              style: {
                                layout: {
                                  'icon-image': ''
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 1.05
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(0,0,0,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Times New Roman']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        },
                        {
                          rotate: {
                            type: 'simple',
                            value: 0
                          },
                          textLetterSpacing: {
                            type: 'simple',
                            value: 0
                          },
                          textTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          symbolPlacement: {
                            type: 'simple',
                            value: 'point'
                          },
                          textAnchor: {
                            type: 'simple',
                            value: 'top-left'
                          },
                          translate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          textRotate: {
                            type: 'simple',
                            value: 0
                          },
                          textField: {
                            type: 'simple',
                            value: 'TEXT_VALUE'
                          },
                          textHaloBlur: {
                            type: 'simple',
                            value: 0
                          },
                          transform: {
                            type: 'simple',
                            value: 'none'
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: '',
                              style: {
                                layout: {
                                  'icon-image': ''
                                }
                              }
                            }
                          },
                          textTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          justify: {
                            type: 'simple',
                            value: 'left'
                          },
                          ignorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          textAllowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          maxWidth: {
                            type: 'simple',
                            value: 10
                          },
                          textSize: {
                            type: 'simple',
                            value: 1.05
                          },
                          textHaloColor: {
                            type: 'simple',
                            value: 'rgba(0, 0, 0, 0)'
                          },
                          textColor: {
                            type: 'simple',
                            value: 'rgba(0,0,0,1.00)'
                          },
                          size: {
                            type: 'simple',
                            value: 100
                          },
                          allowOverlap: {
                            type: 'simple',
                            value: false
                          },
                          translateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          anchor: {
                            type: 'simple',
                            value: 'center'
                          },
                          textOpacity: {
                            type: 'simple',
                            value: 1
                          },
                          textHaloWidth: {
                            type: 'simple',
                            value: 0
                          },
                          lineHeight: {
                            type: 'simple',
                            value: 1.2
                          },
                          textFont: {
                            type: 'simple',
                            value: ['Times New Roman']
                          },
                          textIgnorePlacement: {
                            type: 'simple',
                            value: false
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          },
                          type: 'text'
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'CoordsysLabel@Jingjin',
                    id: 'CoordsysLabel@Jingjin',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'TEXT_ALIGN',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'TEXT_ANGLE',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'TEXT_COLOR',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'TEXT_FONTNAME',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'TEXT_HEIGHT',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'TEXT_VALUE',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'TEXT_WIDTH',
                          type: 'FIELD'
                        }
                      ],
                      title: 'CoordsysLabel@Jingjin'
                    },
                    serviceLayerGroupId: 'Level_0',
                    title: 'CoordsysLabel@Jingjin',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [0, 24],
                    layersContent: ['CoordsysLabel@Jingjin']
                  },
                  {
                    filter: ['all', ['==', '$type', 'LineString']],
                    visualization: {
                      renderer: [
                        {
                          lineDasharray: {
                            type: 'simple',
                            value: [1, 0]
                          },
                          color: {
                            type: 'simple',
                            value: 'rgba(126,206,245,1.00)'
                          },
                          lineTranslateAnchor: {
                            type: 'simple',
                            value: 'map'
                          },
                          lineMiterLimit: {
                            type: 'simple',
                            value: 2
                          },
                          lineOffset: {
                            type: 'simple',
                            value: 0
                          },
                          lineJoin: {
                            type: 'simple',
                            value: 'miter'
                          },
                          lineRoundLimit: {
                            type: 'simple',
                            value: 1.05
                          },
                          lineTranslate: {
                            type: 'simple',
                            value: [0, 0]
                          },
                          lineGapWidth: {
                            type: 'simple',
                            value: 0
                          },
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'line-0',
                              style: {
                                layout: {
                                  visibility: 'visible',
                                  'line-miter-limit': 2,
                                  'line-round-limit': 1.05,
                                  'line-join': 'miter',
                                  'line-cap': 'butt'
                                },
                                paint: {
                                  'line-translate-anchor': 'map',
                                  'line-width': 1.51,
                                  'line-gap-width': 0,
                                  'line-offset': 0,
                                  'line-opacity': 1,
                                  'line-translate': [0, 0],
                                  'line-color': 'rgba(126,206,245,1.00)'
                                }
                              }
                            }
                          },
                          lineCap: {
                            type: 'simple',
                            value: 'butt'
                          },
                          width: {
                            type: 'simple',
                            value: 1.51
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'River_L@Jingjin',
                    id: 'River_L@Jingjin(0_24)',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'FNODE_',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'GS',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'HL',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'JB',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'LENGTH',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'LPOLY_',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'LY1',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'LY2',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'LY3',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'LY4',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'NAME',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'RIVER_',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'RIVER_ID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'RPOLY_',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmLength',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmTopoError',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'TNODE_',
                          type: 'FIELD'
                        }
                      ],
                      title: 'River_L@Jingjin'
                    },
                    serviceLayerGroupId: 'Level_0',
                    title: 'River_L@Jingjin',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [0, 24],
                    layersContent: ['River_L@Jingjin(0_24)']
                  },
                  {
                    filter: ['all', ['==', '$type', 'Polygon']],
                    visualization: {
                      renderer: [
                        {
                          symbolsContent: {
                            type: 'simple',
                            value: {
                              symbolId: 'polygon-0',
                              style: {
                                layout: {
                                  visibility: 'visible'
                                },
                                paint: {
                                  'fill-color': 'rgba(126,206,245,1.00)',
                                  'fill-opacity': 1,
                                  'fill-antialias': true
                                }
                              }
                            }
                          },
                          color: {
                            type: 'simple',
                            value: 'rgba(126,206,245,1.00)'
                          },
                          antialias: {
                            type: 'simple',
                            value: true
                          },
                          outlineColor: {
                            type: 'simple',
                            value: '#FFFFFF'
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'Lake_R@Jingjin',
                    id: 'Lake_R@Jingjin(0_24)',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'CODE',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmArea',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmPerimeter',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        }
                      ],
                      title: 'Lake_R@Jingjin'
                    },
                    serviceLayerGroupId: 'Level_0',
                    title: 'Lake_R@Jingjin',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [0, 24],
                    layersContent: ['Lake_R@Jingjin(0_24)']
                  },
                  {
                    visible: true,
                    catalogType: 'group',
                    children: [
                      {
                        filter: ['all', ['==', '$type', 'Polygon']],
                        visualization: {
                          renderer: [
                            {
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'polygon-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible'
                                    },
                                    paint: {
                                      'fill-color': 'rgba(250,250,250,1.00)',
                                      'fill-opacity': 1,
                                      'fill-antialias': true
                                    }
                                  }
                                }
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(250,250,250,1.00)'
                              },
                              antialias: {
                                type: 'simple',
                                value: true
                              },
                              outlineColor: {
                                type: 'simple',
                                value: '#FFFFFF'
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Neighbor_R@Jingjin#1',
                        id: 'Neighbor_R@Jingjin#1(0_24)',
                        popupInfo: {
                          elements: [
                            {
                              fieldName: 'ADMI',
                              type: 'FIELD'
                            },
                            {
                              fieldName: 'SmArea',
                              type: 'FIELD'
                            },
                            {
                              fieldName: 'SmID',
                              type: 'FIELD'
                            },
                            {
                              fieldName: 'SmPerimeter',
                              type: 'FIELD'
                            },
                            {
                              fieldName: 'SmUserID',
                              type: 'FIELD'
                            }
                          ],
                          title: 'Neighbor_R@Jingjin'
                        },
                        serviceLayerGroupId: 'Level_0',
                        title: 'Neighbor_R@Jingjin',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [0, 24],
                        layersContent: ['Neighbor_R@Jingjin#1(0_24)']
                      },
                      {
                        filter: ['all', ['==', '$type', 'Polygon']],
                        visualization: {
                          renderer: [
                            {
                              lineDasharray: {
                                type: 'simple',
                                value: [1, 0]
                              },
                              color: {
                                type: 'simple',
                                value: 'rgba(180,180,180,1.00)'
                              },
                              lineTranslateAnchor: {
                                type: 'simple',
                                value: 'map'
                              },
                              lineMiterLimit: {
                                type: 'simple',
                                value: 2
                              },
                              lineOffset: {
                                type: 'simple',
                                value: 0
                              },
                              lineJoin: {
                                type: 'simple',
                                value: 'miter'
                              },
                              lineRoundLimit: {
                                type: 'simple',
                                value: 1.05
                              },
                              lineTranslate: {
                                type: 'simple',
                                value: [0, 0]
                              },
                              lineGapWidth: {
                                type: 'simple',
                                value: 0
                              },
                              symbolsContent: {
                                type: 'simple',
                                value: {
                                  symbolId: 'line-0',
                                  style: {
                                    layout: {
                                      visibility: 'visible',
                                      'line-miter-limit': 2,
                                      'line-round-limit': 1.05,
                                      'line-join': 'miter',
                                      'line-cap': 'butt'
                                    },
                                    paint: {
                                      'line-translate-anchor': 'map',
                                      'line-width': 0.38,
                                      'line-gap-width': 0,
                                      'line-offset': 0,
                                      'line-opacity': 1,
                                      'line-translate': [0, 0],
                                      'line-color': 'rgba(180,180,180,1.00)'
                                    }
                                  }
                                }
                              },
                              lineCap: {
                                type: 'simple',
                                value: 'butt'
                              },
                              width: {
                                type: 'simple',
                                value: 0.38
                              },
                              opacity: {
                                type: 'simple',
                                value: 1
                              }
                            }
                          ]
                        },
                        catalogType: 'layer',
                        serviceLayerId: 'Neighbor_R@Jingjin#1',
                        id: 'Neighbor_R@Jingjin#1_outline(0_24)',
                        serviceLayerGroupId: 'Level_0',
                        title: 'Neighbor_R@Jingjin',
                        layerSourceType: 'VectorTileService',
                        zoomRange: [0, 24],
                        layersContent: ['Neighbor_R@Jingjin#1_outline(0_24)']
                      }
                    ],
                    name: 'Neighbor_R@Jingjin',
                    id: 'group_Neighbor_R@Jingjin#1_1764665757038_105'
                  },
                  {
                    filter: ['all', ['==', '$type', 'Polygon']],
                    visualization: {
                      renderer: [
                        {
                          symbolsContent: {
                            field: ['City'],
                            defaultValue: {
                              symbolId: 'fill_0_BDEBFFFF_FFFFFFFF_100',
                              style: {
                                paint: {
                                  'fill-pattern': 'fill_0_BDEBFFFF_FFFFFFFF_100'
                                }
                              }
                            },
                            values: [
                              {
                                value: {
                                  symbolId: 'fill_0_F4F3F0FF_FFFFFFFF_100',
                                  style: {
                                    paint: {
                                      'fill-pattern': 'fill_0_F4F3F0FF_FFFFFFFF_100'
                                    }
                                  }
                                },
                                key: '北京市'
                              },
                              {
                                value: {
                                  symbolId: 'fill_0_FAF3F3FF_FFFFFFFF_100',
                                  style: {
                                    paint: {
                                      'fill-pattern': 'fill_0_FAF3F3FF_FFFFFFFF_100'
                                    }
                                  }
                                },
                                key: '天津市'
                              }
                            ],
                            type: 'unique'
                          },
                          color: {
                            type: 'simple',
                            value: '#000000'
                          },
                          antialias: {
                            type: 'simple',
                            value: true
                          },
                          outlineColor: {
                            type: 'simple',
                            value: '#FFFFFF'
                          },
                          opacity: {
                            type: 'simple',
                            value: 1
                          }
                        }
                      ]
                    },
                    catalogType: 'layer',
                    serviceLayerId: 'BaseMap_R@Jingjin#1',
                    id: 'BaseMap_R@Jingjin#1_unique_(0_24)',
                    popupInfo: {
                      elements: [
                        {
                          fieldName: 'ADMI',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'City',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'NAME',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'NEWA',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'POP_1992',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'POP_1995',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'POP_1999',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'POP_DENSITY99',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'POP_RATE95',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'POP_RATE99',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'RURAL',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmArea',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmPerimeter',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'SmUserID',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'URBAN',
                          type: 'FIELD'
                        },
                        {
                          fieldName: 'URBANRURAL',
                          type: 'FIELD'
                        }
                      ],
                      title: 'BaseMap_R@Jingjin#1'
                    },
                    serviceLayerGroupId: 'Level_0',
                    title: 'BaseMap_R@Jingjin#1',
                    layerSourceType: 'VectorTileService',
                    zoomRange: [0, 24],
                    layersContent: ['BaseMap_R@Jingjin#1_unique_(0_24)']
                  }
                ],
                name: 'Level_0',
                id: 'group_Level_0_1764665757038_88'
              }
            ],
            name: '京津地区地图',
            id: 'group_京津地区地图_1764665757038_112'
          },
          {
            visible: false,
            catalogType: 'layer',
            id: '京津地区地图',
            title: '京津地区地图',
            layerSourceType: 'TileService',
            zoomRange: [0, 24],
            layersContent: ['京津地区地图']
          }
        ]
      });
      const Data1 = {
        layerId: 'Road_L@Jingjin#8(12_24)',
        elements: [
          {
            fieldName: 'KD',
            type: 'FIELD'
          },
          {
            fieldName: 'KD_1',
            type: 'FIELD'
          },
          {
            fieldName: 'NAME',
            type: 'FIELD'
          },
          {
            fieldName: 'SmID',
            type: 'FIELD'
          },
          {
            fieldName: 'SmLength',
            type: 'FIELD'
          },
          {
            fieldName: 'SmTopoError',
            type: 'FIELD'
          },
          {
            fieldName: 'SmUserID',
            type: 'FIELD'
          },
          {
            fieldName: 'name_1',
            type: 'FIELD'
          },
          {
            fieldName: 'name_2_len',
            type: 'FIELD'
          },
          {
            fieldName: 'name_3_len',
            type: 'FIELD'
          }
        ],
        title: 'Road_L_街道'
      };
      expect(popupInfo1.length).toEqual(13);
      expect(popupInfo1[0]).toEqual(Data1);
      done();
    });
    mapstudioWebmap.on('mapcreatefailed', (e) => {
      console.log('mapcreatedfailed', e);
      done();
    });
  });
});
