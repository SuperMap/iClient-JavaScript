import maplibregl from 'maplibre-gl';
import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest';
import { createWebMapV3Extending } from '@supermapgis/iclient-common/mapping/WebMapV3';
import { createMapClassExtending } from '@supermapgis/iclient-common/mapping/MapBase';
import { L7LayerUtil } from '@supermapgis/iclient-common/mapping/utils/L7LayerUtil';
import { WebMap } from '../../../src/maplibregl/mapping/WebMap';
import * as MapManagerUtil from '../../../src/maplibregl/mapping/webmap/MapManager';
import { featureFilter, expression } from '@maplibre/maplibre-gl-style-spec';
import spec from '@maplibre/maplibre-gl-style-spec/src/reference/v8';
import { L7, L7Layer } from '../../../src/maplibregl/overlay/L7Layer';
import * as mockL7 from '../../tool/mock_l7';
import mbglmap, { CRS } from '../../tool/mock_maplibregl_map';
import '../../resources/WebMapV3.js';
import '../../resources/WebMapV5.js';

describe('maplibregl-webmap3.0', () => {
  var originalTimeout, testDiv;
  var server = 'http://localhost:8190/iportal/';
  var id = 617580084;
  var mapstudioWebmap;
  const l7LayerUtil = L7LayerUtil({ featureFilter, expression, spec, L7Layer, L7 });
  const extendOptions = {
    MapManager: MapManagerUtil.default,
    mapRepo: maplibregl,
    mapRepoName: 'maplibre-gl',
    l7LayerUtil
  };
  const WebMapV3 = createWebMapV3Extending(createMapClassExtending(maplibregl.Evented), extendOptions);
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
    maplibregl.Map.prototype.overlayLayersManager = {};
    mbglmap.prototype.getL7Scene = maplibregl.Map.prototype.getL7Scene;
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
      iportalServiceProxyUrl: 'initialize_raster'
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
      iportalServiceProxyUrl: 'mapId is JSON'
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

  it('projection is 4490 and not include maplibre-gl-enhance', (done) => {
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
    mapstudioWebmap.on('mapcreatefailed', ({ error }) => {
      const throwError = `The EPSG code ${nextMapInfo.crs.name} needs to include maplibre-gl-enhance.js. Refer to the example: https://iclient.supermap.io/examples/maplibregl/editor.html#mvtVectorTile_2362`;
      expect(mapstudioWebmap.map).toBeUndefined();
      expect(error).toBe(throwError);
      done();
    });
    mapstudioWebmap.initializeMap(nextMapInfo);
  });

  it('projection is 4490 and include maplibre-gl-enhance', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    const nextMapInfo = {
      ...mapInfo,
      crs: {
        name: 'EPSG:4490',
        extent: [-180, -270, 180, 90],
        wkt: 'GEOGCS["China Geodetic Coordinate System 2000", DATUM["China 2000", SPHEROID["CGCS2000", 6378137.0, 298.257222101, AUTHORITY["EPSG","1024"]], AUTHORITY["EPSG","1043"]], PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], UNIT["degree", 0.017453292519943295], AXIS["Geodetic latitude", NORTH], AXIS["Geodetic longitude", EAST], AUTHORITY["EPSG","4490"]]'
      }
    };
    maplibregl.CRS = CRS;
    mapstudioWebmap = new WebMapV3(nextMapInfo, {
      server: server,
      target: 'map',
      iportalServiceProxyUrl: 'projection is 4490 and include maplibre-gl-enhance'
    });
    mapstudioWebmap.initializeMap(nextMapInfo);

    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBe(nextMapInfo.layers.length);
      const appreciableLayers = mapstudioWebmap.getLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      expect(mapstudioWebmap.getLegends().length).toBe(0);
      delete maplibregl.CRS;
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
    spyOn(maplibregl, 'Map').and.callFake(mbglmap);
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    const nextMapInfo = {
      ...mapInfo,
      crs: {
        name: 'EPSG:4490',
        extent: [-180, -270, 180, 90],
        wkt: 'GEOGCS["China Geodetic Coordinate System 2000", DATUM["China 2000", SPHEROID["CGCS2000", 6378137.0, 298.257222101, AUTHORITY["EPSG","1024"]], AUTHORITY["EPSG","1043"]], PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], UNIT["degree", 0.017453292519943295], AXIS["Geodetic latitude", NORTH], AXIS["Geodetic longitude", EAST], AUTHORITY["EPSG","4490"]]'
      }
    };
    maplibregl.CRS = CRS;
    mapstudioWebmap = new WebMapV3(nextMapInfo, {
      server: server,
      target: 'map'
    });
    const existedMap = new maplibregl.Map({
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
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      expect(mapstudioWebmap._appendLayers).toBe(true);
      expect(map).toEqual(existedMap);
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBe(nextMapInfo.layers.length + 1);
      const appreciableLayers = mapstudioWebmap.getLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      delete maplibregl.CRS;
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
      iportalServiceProxyUrl: 'overlayLayersManager'
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
    mapstudioWebmap.on('layercreatefailed', ({ error }) => {
      expect(['drill'].indexOf(error.split(' ')[0]) > -1).toBeTruthy();
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
      iportalServiceProxyUrl: 'exclude source and layer'
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
      map.addSource('maplibre-gl-draw-hot', {
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
        source: 'maplibre-gl-draw-hot',
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
    spyOn(L7, 'Maplibre').and.callFake(mockL7.Maplibre);
    maplibregl.Map.prototype.getCRS = function () {
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
    maplibregl.CRS = CRS;
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
      delete maplibregl.Map.prototype.getCRS;
      delete maplibregl.CRS;
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
    maplibregl.Map.prototype.getCRS = function () {
      return { epsgCode: '' };
    };
    mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map'
    });

    mapstudioWebmap.on('projectionnotmatch', () => {
      expect(mapstudioWebmap.map).not.toBeUndefined();
      const style = mapstudioWebmap.map.getStyle();
      expect(style.layers.length).toBe(0);
      delete maplibregl.Map.prototype.getCRS;
      done();
    });
    mapstudioWebmap.initializeMap(mapInfo);
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
    mapstudioWebmap = new WebMap(mapInfo, {
      server: server,
      target: 'map',
      iportalServiceProxyUrl: 'http://localhost:8195/portalproxy'
    });
    mapstudioWebmap.on('mapinitialized', ({ map }) => {
      expect(map).not.toBeUndefined();
      let mockTileUrl =
        'http://localhost:8195/portalproxy/7c851958ab40a5e0/iserver/services/map_world1_y6nykx3f/rest/maps/World1/tileimage.png?scale=6.760654286410619e-9&x=1&y=0&width=256&height=256&transparent=true&redirect=false&cacheEnabled=true&origin=%7B%22x%22%3A-180%2C%22y%22%3A90%7D';
      let transformed = map.options.transformRequest(mockTileUrl, 'Tile');
      expect(transformed.credentials).toBe('include');
      mockTileUrl = 'https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark';
      transformed = map.options.transformRequest(mockTileUrl, 'Tile');
      expect(transformed.credentials).toBeUndefined();
      spyTest.calls.reset();
      done();
    });
  });

  it('filter legend', (done) => {
    mbglmap.prototype.getL7Scene = maplibregl.Map.prototype.getL7Scene;
    const spyTest = spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    const mapInfo = JSON.parse(mapstudioWebMap_L7Layers);
    spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'LineLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'PolygonLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'HeatmapLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
    spyOn(L7, 'Maplibre').and.callFake(mockL7.Maplibre);
    maplibregl.Map.prototype.getCRS = function () {
      return { epsgCode: mapInfo.crs.name, getExtent: () => {} };
    };
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
    maplibregl.CRS = CRS;
    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      const webmapInstance = mapstudioWebmap._getWebMapInstance();
      expect(webmapInstance.getLegends().length).toBe(4);
      delete maplibregl.Map.prototype.getCRS;
      delete maplibregl.CRS;
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
    spyOn(L7, 'Maplibre').and.callFake(mockL7.Maplibre);
    maplibregl.Map.prototype.getCRS = function () {
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
    maplibregl.CRS = CRS;
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
          delete maplibregl.Map.prototype.getCRS;
          delete maplibregl.CRS;
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
    spyOn(L7, 'Maplibre').and.callFake(mockL7.Maplibre);
    maplibregl.Map.prototype.getCRS = function () {
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
    maplibregl.CRS = CRS;
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
      delete maplibregl.Map.prototype.getCRS;
      delete maplibregl.CRS;
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
    spyOn(maplibregl, 'Map').and.callFake(mbglmap);
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
    maplibregl.CRS = CRS;
    mapstudioWebmap = new WebMapV3(nextMapInfo, {
      server: server,
      target: 'map'
    });
    const existedMap = new maplibregl.Map({
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
      delete maplibregl.CRS;
      done();
    });
  });

  it('label legend', (done) => {
    mbglmap.prototype.getL7Scene = maplibregl.Map.prototype.getL7Scene;
    const spyTest = spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
    spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'LineLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'PolygonLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'HeatmapLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
    spyOn(L7, 'Maplibre').and.callFake(mockL7.Maplibre);
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
    maplibregl.Map.prototype.getCRS = function () {
      return { epsgCode: 'EPSG:3857', getExtent: () => {} };
    };
    mapstudioWebmap = new WebMap(id, {
      server: server
    });

    mapstudioWebmap.on('mapcreatesucceeded', ({ map }) => {
      const webMapV3 = mapstudioWebmap._getWebMapInstance();
      expect(map).not.toBeUndefined();
      expect(webMapV3.getLegends().length).toBe(9);
      delete maplibregl.Map.prototype.getCRS;
      mbglmap.prototype.getL7Scene = undefined;
      spyTest.calls.reset();
      done();
    });
  });

  it('handle sprite option is object like { sourceId: url }', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite/rectangle') > -1) {
        return Promise.resolve(new Response(JSON.stringify({rectangle: {
          pixelRatio: 1,
          width: 104,
          x: 0,
          y: 0,
          height: 104
        }})));
      } else if (url.indexOf('/sprite/circle') > -1) {
        return Promise.resolve(new Response(JSON.stringify({circle: {
          pixelRatio: 1,
          width: 104,
          x: 104,
          y: 0,
          height: 104
        }})));
      } else if (url.indexOf('/sprite/triangle') > -1) {
        return Promise.resolve(new Response(JSON.stringify({triangle: {
          pixelRatio: 1,
          width: 104,
          x: 0,
          y: 104,
          height: 104
        }})));
      }
      return Promise.resolve();
    });
    spyOn(maplibregl, 'Map').and.callFake(mbglmap);
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
    const existedMap = new maplibregl.Map({
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
    spyOn(L7, 'Maplibre').and.callFake(mockL7.Maplibre);
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
    mapstudioWebmap = new WebMap(
      id,
      {
        server: server
      }
    );
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
        done();
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
    spyOn(L7, 'Maplibre').and.callFake(mockL7.Maplibre);
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
    mapstudioWebmap = new WebMap(
      id,
      {
        server: server
      }
    );
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
});
