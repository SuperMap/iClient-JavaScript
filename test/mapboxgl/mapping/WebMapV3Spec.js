import mapboxgl from 'mapbox-gl';
import { WebMap } from '../../../src/mapboxgl/mapping/WebMap';
import { WebMap as WebMapV3 } from '../../../src/mapboxgl/mapping/webmap/v3/WebMap';
import '../../resources/WebMapV3.js';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import * as L7 from '../../../src/mapboxgl/overlay/L7/l7-render';
import * as mockL7 from '../../tool/mock_l7';
import mbglmap from '../../tool/mock_mapboxgl_map';

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
    mapboxgl.Map.prototype.overlayLayersManager = {};
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
    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
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
      const style = map.getStyle();
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
      const style = map.getStyle();
      const webMapV3 = mapstudioWebmap._getWebMapInstance();
      const mapInfo = JSON.parse(mapstudioWebMap_symbol);
      expect(style.layers.length).toBe(mapInfo.layers.length);
      expect(webMapV3.getLegendInfo().length).not.toBe(0);
      expect(webMapV3.getLayerCatalog().length).not.toBe(0);
      expect(webMapV3.getLayerCatalog().length).toBeLessThanOrEqual(webMapV3.getAppreciableLayers().length);
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
      const style = map.getStyle();
      expect(style.layers.length).toBe(mapInfo.layers.length);
      const appreciableLayers = mapstudioWebmap.getAppreciableLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      expect(mapstudioWebmap.getLegendInfo().length).toBe(0);
      map.addLayer({
        metadata: {},
        paint: {
          'background-color': '#242424'
        },
        id: 'ms-background12',
        type: 'background'
      });
      expect(map.getStyle().layers.length).toBe(mapInfo.layers.length + 1);
      expect(mapstudioWebmap.getAppreciableLayers().length).toBe(appreciableLayers.length + 1);
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
    mapstudioWebmap = new WebMapV3(nextMapInfo, {
      server: server,
      target: 'map'
    });
    mapstudioWebmap.on('getmapinfofailed', ({ error }) => {
      const throwError = `The EPSG code ${nextMapInfo.crs.name} needs to include mapbox-gl-enhance.js. Refer to the example: https://iclient.supermap.io/examples/mapboxgl/editor.html#mvtVectorTile_2362`;
      expect(mapstudioWebmap.map).toBeUndefined();
      expect(error).toBe(throwError);
      done();
    });
    mapstudioWebmap.initializeMap(nextMapInfo);
  });

  it('projection is 4490 and include mapbox-gl-enhance', (done) => {
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
    mapboxgl.CRS = function (epsgCode, wkt, bounds, unit) {
      expect(epsgCode).toBe(nextMapInfo.crs.name);
      expect(wkt).toBe(nextMapInfo.crs.wkt);
      expect(bounds).toEqual(nextMapInfo.crs.extent);
      expect(unit).toBe(nextMapInfo.crs.extent[2] > 180 ? 'meter' : 'degree');
    };
    mapboxgl.CRS.set = function () {};
    mapstudioWebmap = new WebMapV3(nextMapInfo, {
      server: server,
      target: 'map'
    });
    mapstudioWebmap.initializeMap(nextMapInfo);

    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBe(nextMapInfo.layers.length);
      const appreciableLayers = mapstudioWebmap.getAppreciableLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      expect(mapstudioWebmap.getLegendInfo().length).toBe(0);
      delete mapboxgl.CRS;
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
    mapboxgl.CRS = function (epsgCode, wkt, bounds, unit) {
      expect(epsgCode).toBe(nextMapInfo.crs.name);
      expect(wkt).toBe(nextMapInfo.crs.wkt);
      expect(bounds).toEqual(nextMapInfo.crs.extent);
      expect(unit).toBe(nextMapInfo.crs.extent[2] > 180 ? 'meter' : 'degree');
    };
    mapboxgl.CRS.set = function () {};
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
    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(mapstudioWebmap._appendLayers).toBe(true);
      expect(map).toEqual(existedMap);
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBe(nextMapInfo.layers.length + 1);
      const appreciableLayers = mapstudioWebmap.getAppreciableLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      delete mapboxgl.CRS;
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
      target: 'map'
    });
    mapstudioWebmap.initializeMap(mapInfo);

    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBe(mapInfo.layers.length);
      const appreciableLayers = mapstudioWebmap.getAppreciableLayers();
      const layerCatalogs = mapstudioWebmap.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      expect(mapstudioWebmap.getLegendInfo().length).toBe(0);
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
      const appreciableLayers2 = mapstudioWebmap.getAppreciableLayers();
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

  it('filter l7 and drill test', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const mapInfo = JSON.parse(mapstudioWebMap_l7_and_drill);
    const mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map'
    });
    mapstudioWebmap.on('getlayersfailed', ({ error }) => {
      expect(['drill'].indexOf(error.split(' ')[0]) > -1).toBeTruthy();
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
      target: 'map'
    });
    mapstudioWebmap.initializeMap(mapInfo);

    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
      expect(map).not.toBeUndefined();
      expect(mapstudioWebmap.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBe(mapInfo.layers.length);
      const appreciableLayers = mapstudioWebmap.getAppreciableLayers();
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
      expect(mapstudioWebmap.getAppreciableLayers().length).toBe(appreciableLayers.length);
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
      console.log(url);
      return Promise.resolve();
    });
    mapboxgl.CRS = function () {};
    mapboxgl.CRS.set = function () {};
    mapstudioWebmap = new WebMap(id, {
      server: server
    });
    mapstudioWebmap.on('addlayerssucceeded', ({ map }) => {
      const webmapInstance = mapstudioWebmap._getWebMapInstance();
      expect(map).not.toBeUndefined();
      expect(webmapInstance.map).toEqual(map);
      const style = map.getStyle();
      expect(style.layers.length).toBeLessThan(mapInfo.layers.length);
      expect(webmapInstance._getLayersOnMap().length).toBe(mapInfo.layers.length);
      const appreciableLayers = webmapInstance.getAppreciableLayers();
      const layerCatalogs = webmapInstance.getLayerCatalog();
      expect(layerCatalogs.length).toBeLessThanOrEqual(appreciableLayers.length);
      expect(webmapInstance.getLegendInfo().length).toBe(11);
      delete mapboxgl.Map.prototype.getCRS;
      delete mapboxgl.CRS;
      done();
    });
  });

  it('projectionisnotmatch', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      return Promise.resolve();
    });
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    mapboxgl.Map.prototype.getCRS = function () {
      return { epsgCode: '' };
    };
    mapstudioWebmap = new WebMapV3(mapInfo, {
      server: server,
      target: 'map'
    });

    mapstudioWebmap.on('projectionisnotmatch', () => {
      expect(mapstudioWebmap.map).not.toBeUndefined();
      const style = mapstudioWebmap.map.getStyle();
      expect(style.layers.length).toBe(0);
      delete mapboxgl.Map.prototype.getCRS;
      done();
    });
    mapstudioWebmap.initializeMap(mapInfo);
  });
});
