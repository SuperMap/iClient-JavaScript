import { SourceListModelV3 } from '../../../../src/common/mapping/utils/SourceListModelV3';
import { isL7Layer } from '../../../../src/common/mapping/utils/L7LayerUtil';
import '../../../resources/WebMapV3.js';
import cloneDeep from 'lodash.clonedeep';

describe('SourceListV3', () => {
  let map, layers, sources, mockEvents, overlayLayersManager;
  const baseLayerInfo = {
    id: 'wmts100',
    title: 'wmts100',
    layers: [
      {
        id: 'wmts100',
        type: 'raster',
        source: 'wmts100',
        minzoom: 0,
        maxzoom: 12
      }
    ],
    sources: {
      wmts100: {
        type: 'raster',
        tiles: [
          'http:/localhost:8195/portalproxy/97d2edb85b0cb5d4/iserver/services/map-China100-2/wmts100?service=WMTS&request=GetTile&version=1.0.0&style=default&layer=China&tilematrixSet=Custom_China&format=image%2Fpng&tilematrix={z}&tilerow={y}&tilecol={x}'
        ],
        maxzoom: 12,
        tileSize: 256,
        bounds: [-180, -85.05112877980652, 180, 85.05112877980648],
        minzoom: 0
      }
    }
  };
  const changeBaseLayerMapInfo = {
    metadata: {
      layerCatalog: [
        {
          visible: true,
          parts: ['北京市住宅小区'],
          id: 'layer_北京市住宅小区_1754359974753_24',
          title: '北京市住宅小区',
          type: 'composite'
        },
        {
          visible: true,
          children: [
            {
              visible: true,
              id: 'ms_TIANDITU_IMG_3857_label',
              title: 'ms_TIANDITU_IMG_3857_label',
              type: 'basic'
            },
            {
              visible: true,
              id: 'TIANDITU_IMG_3857',
              title: 'TIANDITU_IMG_3857',
              type: 'basic'
            }
          ],
          id: 'group_tianditu_img_3857_1754377584218_382',
          title: 'tianditu_img_3857',
          type: 'group'
        }
      ]
    },
    sources: {
      ms_TIANDITU_IMG_3857_label: {
        tiles: [
          'https://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=50599c913367188e6c94e872032f4cf1&host=172.16.14.44:8190'
        ],
        tileSize: 256,
        attribution: '',
        bounds: [-180, -90, 180, 90],
        type: 'raster'
      },
      ms_1750973565_1754359974753_23: {
        tiles: [
          'http://localhost:8190/iportal/web/datas/1750973565/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22%E5%B0%8F%E5%8C%BA%E5%90%8D%22%2C%22SmGeometrySize%22%2C%22%E5%B9%B4%E4%BB%A3%22%2C%22%E5%8D%95%E4%BB%B7%22%2C%22%E6%A5%BC%E5%B1%82%22%2C%22SmID%22%2C%22%E6%80%BB%E4%BB%B7%22%2C%22SmUserID%22%2C%22%E6%88%B7%E5%9E%8B%22%2C%22%E6%9C%9D%E5%90%91%22%2C%22%E5%9C%B0%E5%9D%80%22%2C%22SmY%22%2C%22SmX%22%2C%22SmLibTileID%22%2C%22%E9%9D%A2%E7%A7%AF%22%5D&geometryFieldName=geometry'
        ],
        bounds: [115.89763001613301, 39.40606, 117.48732001635402, 40.6500100064203],
        type: 'vector'
      },
      TIANDITU_IMG_3857: {
        tiles: [
          'https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=50599c913367188e6c94e872032f4cf1&host=172.16.14.44:8190'
        ],
        tileSize: 256,
        attribution: '',
        bounds: [-180, -90, 180, 90],
        type: 'raster'
      }
    },
    crs: 'EPSG:3857',
    center: [116.22715983919534, 39.878220196575874],
    zoom: 8.79189646012174,
    glyphs: {},
    version: '3.3.2',
    maxzoom: 19,
    name: '无标题地图-tianditu',
    layers: [
      {
        maxzoom: 19,
        id: 'TIANDITU_IMG_3857',
        source: 'TIANDITU_IMG_3857',
        type: 'raster',
        minzoom: 0
      },
      {
        layout: {
          visibility: 'visible'
        },
        maxzoom: 19,
        id: 'ms_TIANDITU_IMG_3857_label',
        source: 'ms_TIANDITU_IMG_3857_label',
        type: 'raster',
        minzoom: 0
      },
      {
        metadata: {},
        maxzoom: 24,
        paint: {
          'circle-color': '#EE4D5A',
          'circle-opacity': 0.9,
          'circle-translate-anchor': 'map',
          'circle-radius': 4,
          'circle-translate': [0, 0]
        },
        id: '北京市住宅小区',
        source: 'ms_1750973565_1754359974753_23',
        'source-layer': '1750973565$geometry',
        type: 'circle',
        minzoom: 0
      }
    ],
    sprite: 'http://localhost:8190/iportal/web/maps/1874751978/sprites/sprite',
    pitch: 0,
    minzoom: 0
  };

  beforeEach(() => {
    mockEvents = {};
    layers = [
      {
        id: 'background',
        type: 'background',
        layout: {
          visibility: 'visible'
        },
        paint: {
          'background-color': '#065726',
          'background-opacity': 0.5
        }
      },
      {
        id: 'CHINA_DARK',
        type: 'raster',
        source: 'CHINA_DARK',
        minzoom: 0,
        maxzoom: 12
      },
      {
        id: 'test-id',
        type: 'raster',
        source: 'test-source',
        minzoom: 0,
        maxzoom: 12
      },
      {
        id: 'test-id-label',
        type: 'raster',
        source: 'test-source',
        minzoom: 0,
        maxzoom: 12,
        metadata: { parentLayerId: 'test-source' }
      },
      {
        id: 'tracklayer-1-line',
        type: 'line',
        source: 'tracklayer-1-line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#065726',
          'line-width': 5,
          'line-opacity': 0.8
        }
      },
      {
        id: 'graticuleLayer_1_line',
        type: 'line',
        source: 'graticuleLayer_1_line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#065726',
          'line-width': 5,
          'line-opacity': 0.8
        }
      },
      {
        id: 'tdt-search-line',
        type: 'line',
        source: 'tdt-search-line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#065726',
          'line-width': 5,
          'line-opacity': 0.8
        }
      },
      {
        id: 'tdt-route-line',
        type: 'line',
        source: 'tdt-route-line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#065726',
          'line-width': 5,
          'line-opacity': 0.8
        }
      },
      {
        id: 'smmeasure',
        type: 'line',
        source: 'smmeasure',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#065726',
          'line-width': 5,
          'line-opacity': 0.8
        }
      },

      {
        id: 'mapbox-gl-draw',
        type: 'line',
        source: 'mapbox-gl-draw',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#065726',
          'line-width': 5,
          'line-opacity': 0.8
        }
      },
      {
        id: 'mapbox-gl-draw-line',
        type: 'line',
        source: 'mapbox-gl-draw',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#065726',
          'line-width': 5,
          'line-opacity': 0.8
        }
      },
      {
        id: 'test-SM-highlight',
        type: 'line',
        source: 'mapbox-gl-draw',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#065726',
          'line-width': 5,
          'line-opacity': 0.8
        }
      },
      {
        id: 'graticuleLayer_1723443238046_line',
        type: 'line',
        source: 'graticuleLayer_1723443238046_line',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
          visibility: 'visible'
        },
        paint: {
          'line-color': '#15eec2',
          'line-width': 2,
          'line-offset': 0,
          'line-translate-anchor': 'viewport',
          'line-dasharray': [0.5, 4]
        }
      }
    ];
    sources = {
      CHINA_DARK: {
        type: 'raster',
        tiles: []
      },
      'test-source': {
        type: 'raster',
        tiles: []
      },
      'tracklayer-1-line': {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      },
      graticuleLayer_1_line: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      },
      'tdt-search-line': {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      },
      'tdt-route-line': {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      },
      smmeasure: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      },
      'mapbox-gl-draw': {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      },
      graticuleLayer_1723443238046_line: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      }
    };
    overlayLayersManager = {
      graticuleLayer_1723443238046: {
        id: 'graticuleLayer_1723443238046',
        overlay: true,
        renderingMode: '3d',
        type: 'custom',
        visible: true,
        sourceId: 'graticuleLayer_1723443238046_line'
      }
    };
    map = {
      addLayer: function (layer) {
        layers.push(layer);
      },
      addSource(sourceId, source) {
        sources[sourceId] = source;
      },
      getStyle() {
        return {
          layers,
          sources
        };
      },
      getSource(id) {
        return sources[id];
      },
      getLayer(id) {
        return layers.find((layer) => layer.id === id);
      },
      removeLayer(id) {
        return layers.splice(
          layers.findIndex((layer) => layer.id === id),
          1
        );
      },
      removeSource(id) {
        delete sources[id];
      },
      overlayLayersManager,
      on(type, callback) {
        mockEvents[type] = callback;
      },
      off(type) {
        delete mockEvents[type];
      },
      setLayoutProperty: jasmine.createSpy('setLayoutProperty').and.callFake((layerId, visibility) => {
        const layer = layers.find((layer) => layer.id === layerId);
        if (layer) {
          layer.layout = layer.layout || {};
          layer.layout.visibility = visibility;
          return;
        }
        if (this.overlayLayersManager[layerId]) {
          this.overlayLayersManager.visible = visibility === 'visible';
        }
      }),
      style: {
        fire(type, options) {
          if (type === 'data' && options.dataType === 'style' && mockEvents.styledata) {
            mockEvents.styledata();
          }
        }
      }
    };
  });

  it('getLayers', (done) => {
    const mapInfo = JSON.parse(apstudioWebMap_layerData);
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: JSON.parse(msProjectINfo_layerData),
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const appreciableLayers = sourceListModel.getLayers();
    const selfAppreciableLayers = sourceListModel.getSelfLayers();
    expect(appreciableLayers.length).toBe(mapInfo.metadata.layerCatalog.length + 2);
    expect(selfAppreciableLayers.length).toBe(mapInfo.metadata.layerCatalog.length);
    const extraLayers = appreciableLayers.slice(mapInfo.metadata.layerCatalog.length);
    expect(extraLayers[1].title).toBe('test-source');
    expect(extraLayers[1].renderLayers).toEqual(['test-id', 'test-id-label']);
    expect(extraLayers[2]).toBe(undefined);
    done();
  });

  it('getLayerCatalog without group', (done) => {
    const mapInfo = JSON.parse(apstudioWebMap_layerData);
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: JSON.parse(msProjectINfo_layerData),
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(mapInfo.metadata.layerCatalog.length + 2);
    done();
  });

  it('getLayerCatalog with group', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_group);
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: {},
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(mapInfo.metadata.layerCatalog.length + 2);
    done();
  });

  it('layerCatalog parts not include self layer and ui id is layerId on Map', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_symbol);
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: {},
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(mapInfo.metadata.layerCatalog.length + 3);
    const selfIds = mapInfo.metadata.layerCatalog.map((item) => item.id);
    const selfLayerCatalogs = layerList.filter((layer) => selfIds.includes(layer.id));
    expect(selfLayerCatalogs.some((layer) => !layer.renderLayers.includes(layer.id))).toBe(false);
    done();
  });

  it('layerCatalog parts include self layer', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_labelLegend);
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: {},
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(mapInfo.metadata.layerCatalog.length + 2);
    const selfIds = mapInfo.metadata.layerCatalog.map((item) => item.id);
    const selfLayerCatalogs = layerList.filter((layer) => selfIds.includes(layer.id));
    expect(selfLayerCatalogs.some((layer) => !layer.renderLayers.includes(layer.id))).toBe(false);
    done();
  });

  it('layerCatalog parts not include self layer and ui id is not layerId on Map', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_separate_layerCatalogId);
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: {},
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(mapInfo.metadata.layerCatalog.length + 3);
    const selfIds = mapInfo.metadata.layerCatalog.filter((item) => item.parts).map((item) => item.id);
    const selfLayerCatalogs = layerList.filter((layer) => selfIds.includes(layer.id));
    expect(selfLayerCatalogs.some((layer) => layer.renderLayers.includes(layer.id))).toBe(false);
    done();
  });

  it('destroy', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_chart);
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: JSON.parse(msProjectINfo_chart),
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    expect(mockEvents.styledata).not.toBeUndefined();
    sourceListModel.destroy();
    expect(mockEvents.styledata).toBeUndefined();
    done();
  });

  it('toggleLayerVisible false', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_chart);
    const markerList = {
      ['中国金牌个人获奖者(1)']: {
        show: jasmine.createSpy('show').and.callFake(() => {}),
        hide: jasmine.createSpy('hide').and.callFake(() => {})
      }
    };
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: JSON.parse(msProjectINfo_chart),
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => markerList
      }
    });
    const layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(mapInfo.metadata.layerCatalog.length + 2);
    expect(layerList[0].id).toBe('中国金牌个人获奖者(1)');
    expect(layerList[0].type).toBe('chart');
    expect(layerList[0].visible).toBeTruthy();
    sourceListModel.on({
      layerupdatechanged: () => {
        let layerList = sourceListModel.getLayerCatalog();
        expect(layerList[0].visible).toBeFalsy();
        expect(markerList[layerList[0].id].hide).toHaveBeenCalledTimes(1);
        done();
      }
    });
    sourceListModel.toggleLayerVisible(layerList[0], false);
  });

  it('toggleLayerVisible true', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_chart);
    const markerList = {
      ['中国金牌个人获奖者(1)']: {
        show: jasmine.createSpy('show').and.callFake(() => {}),
        hide: jasmine.createSpy('hide').and.callFake(() => {})
      }
    };
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: JSON.parse(msProjectINfo_chart),
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => markerList
      }
    });
    let layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(mapInfo.metadata.layerCatalog.length + 2);
    expect(layerList[0].visible).toBeTruthy();
    sourceListModel.toggleLayerVisible(layerList[0], false);
    layerList = sourceListModel.getLayerCatalog();
    expect(layerList[0].id).toBe('中国金牌个人获奖者(1)');
    expect(layerList[0].type).toBe('chart');
    expect(layerList[0].visible).toBeFalsy();
    expect(markerList[layerList[0].id].hide).toHaveBeenCalledTimes(1);
    sourceListModel.toggleLayerVisible(layerList[0], true);
    layerList = sourceListModel.getLayerCatalog();
    expect(layerList[0].visible).toBeTruthy();
    expect(markerList[layerList[0].id].show).toHaveBeenCalledTimes(1);
    done();
  });

  it('toggleLayerVisible empty group', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_chart);
    const markerList = {
      ['中国金牌个人获奖者(1)']: {
        show: jasmine.createSpy('show').and.callFake(() => {}),
        hide: jasmine.createSpy('hide').and.callFake(() => {})
      }
    };
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: JSON.parse(msProjectINfo_chart),
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => markerList
      }
    });
    const layerList = sourceListModel.getLayerCatalog();
    sourceListModel.on({
      layerupdatechanged: () => {
        const currentLayerList = sourceListModel.getLayerCatalog();
        expect(currentLayerList).toEqual(layerList);
        done();
      }
    });
    sourceListModel.toggleLayerVisible({ type: 'group', title: 'emtpy-group', id: 'group1', children: [] }, false);
  });

  it('setLayersVisible', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_chart);
    layers.push(...mapInfo.layers);
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: JSON.parse(msProjectINfo_chart),
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(mapInfo.metadata.layerCatalog.length + 2);
    expect(layerList[4].visible).toBeTruthy();
    sourceListModel.on({
      layerupdatechanged: () => {
        const layerList = sourceListModel.getLayerCatalog();
        expect(layerList[4].visible).toBeFalsy();
        expect(map.setLayoutProperty).toHaveBeenCalledTimes(layerList[4].renderLayers.length);
        done();
      }
    });
    sourceListModel.setLayersVisible([layerList[4]], 'none');
    expect(mockEvents.styledata).not.toBeUndefined();
    mockEvents.styledata();
  });

  it('changeBaseLayer not complicit', (done) => {
    const nextBaseLayerMapInfo = cloneDeep(changeBaseLayerMapInfo);
    layers = nextBaseLayerMapInfo.layers;
    sources = nextBaseLayerMapInfo.sources;

    overlayLayersManager = {};

    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo: cloneDeep(nextBaseLayerMapInfo),
      mapResourceInfo: {},
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => []
      }
    });
    expect(map.getStyle().layers.some((item) => ['TIANDITU_IMG_3857', 'ms_TIANDITU_IMG_3857_label'].includes(item.id))).toBeTruthy();
    const layerList = sourceListModel.getLayerCatalog();
    const appreciableLayers = sourceListModel.getLayers();
    expect(layerList.length).toBe(2);
    expect(appreciableLayers.length).toBe(3);
    const nextBaseLayerInfo = sourceListModel.changeBaseLayer(baseLayerInfo);
    expect(nextBaseLayerInfo).toBeTruthy();
    expect(nextBaseLayerInfo.layers.length).toBe(1);
    expect(nextBaseLayerInfo.layers).toEqual(baseLayerInfo.layers);
    expect(map.getStyle().layers.some((item) => ['TIANDITU_IMG_3857', 'ms_TIANDITU_IMG_3857_label'].includes(item.id))).toBeFalsy();
    done();
  });

  it('changeBaseLayer complicit', (done) => {
    let nextBaseLayerMapInfo = cloneDeep(changeBaseLayerMapInfo);
    layers = [
      ...baseLayerInfo.layers,
      ...nextBaseLayerMapInfo.layers
    ];
    sources = {
      ...nextBaseLayerMapInfo.sources,
      ...baseLayerInfo.sources
    };
    const copyMapInfo = cloneDeep(changeBaseLayerMapInfo);
    nextBaseLayerMapInfo = {
      ...copyMapInfo,
      layers: cloneDeep(layers),
      sources: cloneDeep(sources),
      metadata: {
        layerCatalog: copyMapInfo.metadata.layerCatalog.concat(baseLayerInfo.layers.map(item => ({
          id: item.id,
          title: item.id,
          type: 'basic',
          visible: true
        })))
      }
    }
    overlayLayersManager = {};

    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo: nextBaseLayerMapInfo,
      mapResourceInfo: {},
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => []
      }
    });
    expect(map.getStyle().layers.some((item) => ['TIANDITU_IMG_3857', 'ms_TIANDITU_IMG_3857_label'].includes(item.id))).toBeTruthy();
    expect(map.getStyle().layers.some((item) => ['wmts100'].includes(item.id))).toBeTruthy();
    let layerList = sourceListModel.getLayerCatalog();
    let appreciableLayers = sourceListModel.getLayers();
    expect(layerList.length).toBe(3);
    expect(layerList[layerList.length - 1].id).toBe('wmts100');
    expect(appreciableLayers.length).toBe(4);
    expect(appreciableLayers[0].id).toBe('wmts100');
    const sameBaseLayer = {
      id: 'sameBaseLayer',
      layers: layers.slice(1, 3).map((item) => {
        const nextItem = Object.assign({}, item);
        nextItem.metadata = { SM_Layer_Id: 'sameBaseLayer', title: `custom_${item.id}` };
        return nextItem;
      }),
      sources: {
        TIANDITU_IMG_3857: sources['TIANDITU_IMG_3857'],
        'ms_TIANDITU_IMG_3857_label': sources['ms_TIANDITU_IMG_3857_label']
      }
    };
    const nextBaseLayerInfo = sourceListModel.changeBaseLayer(sameBaseLayer);
    expect(nextBaseLayerInfo).toBeTruthy();
    expect(nextBaseLayerInfo.layers.length).toBe(2);
    expect(nextBaseLayerInfo.layers).not.toEqual(sameBaseLayer.layers);
    expect(map.getStyle().layers.some((item) => ['TIANDITU_IMG_3857', 'ms_TIANDITU_IMG_3857_label'].includes(item.id))).toBeTruthy();
    expect(
      map
        .getStyle()
        .layers.some((item) => [/TIANDITU_IMG_3857_\d+$/, /ms_TIANDITU_IMG_3857_label_\d+$/].some((reg) => reg.test(item.id)))
    ).toBeTruthy();
    expect(map.getStyle().layers.some((item) => ['wmts100'].includes(item.id))).toBeFalsy();
    layerList = sourceListModel.getLayerCatalog();
    appreciableLayers = sourceListModel.getLayers();
    expect(layerList.length).toBe(3);
    expect(layerList[layerList.length - 1].id).toBe('sameBaseLayer');
    expect(layerList[layerList.length - 1].children[0].title.match(/custom_TIANDITU_IMG_3857$/)).toBeTruthy();
    expect(layerList[layerList.length - 1].children[1].title.match(/custom_ms_TIANDITU_IMG_3857_label$/)).toBeTruthy();
    expect(appreciableLayers.length).toBe(5);
    expect(appreciableLayers[0].id.match(/TIANDITU_IMG_3857_TIANDITU_IMG_3857_\d+$/)).toBeTruthy();
    expect(appreciableLayers[1].id.match(/ms_TIANDITU_IMG_3857_label_ms_TIANDITU_IMG_3857_label_\d+$/)).toBeTruthy();
    expect(appreciableLayers[0].title.match(/custom_TIANDITU_IMG_3857/)).toBeTruthy();
    expect(appreciableLayers[1].title.match(/custom_ms_TIANDITU_IMG_3857_label/)).toBeTruthy();
    done();
  });

  it('changeBaseLayer show title', (done) => {
    const nextBaseLayerMapInfo = cloneDeep(changeBaseLayerMapInfo);
    layers = nextBaseLayerMapInfo.layers;
    sources = nextBaseLayerMapInfo.sources;

    overlayLayersManager = {};

    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo: cloneDeep(nextBaseLayerMapInfo),
      mapResourceInfo: {},
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => []
      }
    });
    expect(map.getStyle().layers.some((item) => ['TIANDITU_IMG_3857', 'ms_TIANDITU_IMG_3857_label'].includes(item.id))).toBeTruthy();
    const layerList = sourceListModel.getLayerCatalog();
    const appreciableLayers = sourceListModel.getLayers();
    expect(layerList.length).toBe(2);
    expect(appreciableLayers.length).toBe(3);
    const baseLayerInfoCopy = {
      ...baseLayerInfo,
      layers: baseLayerInfo.layers.map((item) => ({
        ...item,
        metadata: { title: `custom_${item.id}`}
      }))
    };
    const nextBaseLayerInfo = sourceListModel.changeBaseLayer(baseLayerInfoCopy);
    expect(nextBaseLayerInfo).toBeTruthy();
    expect(nextBaseLayerInfo.layers.length).toBe(1);
    expect(nextBaseLayerInfo.layers).toEqual(baseLayerInfoCopy.layers);
    expect(map.getStyle().layers.some((item) => ['TIANDITU_IMG_3857', 'ms_TIANDITU_IMG_3857_label'].includes(item.id))).toBeFalsy();
    const nextAppreciableLayers = sourceListModel.getLayers();
    expect(nextAppreciableLayers.some(item => item.title === baseLayerInfoCopy.layers[0].metadata.title)).toBeTruthy();
    done();
  });
});
