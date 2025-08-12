import { SourceListModelV2 } from '../../../../src/common/mapping/utils/SourceListModelV2';

describe('SourceListV2', () => {
  let layers, sources, map, mockEvents, overlayLayersManager;
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
        return layers.splice(layers.findIndex((layer) => layer.id === id), 1);
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
    const sourceListModel = new SourceListModelV2({ map });
    const appreciableLayers = sourceListModel.getLayers();
    const selfAppreciableLayers = sourceListModel.getSelfLayers();
    expect(appreciableLayers.length).toBe(3);
    expect(appreciableLayers[2].title).toBe('test-source');
    expect(appreciableLayers[2].renderLayers).toEqual(['test-id', 'test-id-label']);
    expect(selfAppreciableLayers.length).toBe(0);
    done();
  });

  it('getSelfLayers', (done) => {
    const sourceListModel = new SourceListModelV2({
      map,
      layers: [
        {
          name: 'GraticuleLayer',
          id: 'graticuleLayer_1723443238046',
          visible: true,
          renderLayers: ['graticuleLayer_1723443238046', 'graticuleLayer_1723443238046_line']
        }
      ]
    });
    const appreciableLayers = sourceListModel.getLayers();
    const selfAppreciableLayers = sourceListModel.getSelfLayers(appreciableLayers);
    expect(appreciableLayers.length).toBe(3);
    expect(selfAppreciableLayers.length).toBe(0);
    done();
  });

  it('getLayerCatalog', (done) => {
    const sourceListModel = new SourceListModelV2({ map });
    const layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(3);
    done();
  });

  it('MAPBOXSTYLE', (done) => {
    const layers = [
      {
        layerType: 'HEAT',
        visible: true,
        themeSetting: {
          weight: 'confirmed',
          customSettings: {},
          radius: 10,
          colors: ['#0000ff', '#00ffff', '#00ff00', '#ffff00', '#ff0000']
        },
        name: '0315countrycenternpc',
        id: '0315countrycenternpc(1)',
        dataSource: {
          accessType: 'DIRECT',
          type: 'PORTAL_DATA',
          serverId: '99653056'
        },
        renderLayers: ['0315countrycenternpc(1)']
      },
      {
        layerType: 'MAPBOXSTYLE',
        visible: true,
        name: 'China',
        id: 'China',
        dataSource: {
          type: 'EXTERNAL',
          url: 'http://172.16.14.44:8090/iserver/services/map-China100/restjsr/v1/vectortile/maps/China'
        },
        renderLayers: [
          'World_Division_pl@China(0_24)',
          'China_Boundary_C@China#1_unique_620201(6_7)',
          'China_Boundary_C@China#1_unique_620202_0(6_7)',
          'China_Boundary_C@China#1_unique_<NULL>(6_7)'
        ]
      }
    ];
    const layersOnMap = [
      {
        id: '0315countrycenternpc(1)',
        type: 'heatmap',
        source: '0315countrycenternpc(1)',
        metadata: {
          parentLayerId: '0315countrycenternpc(1)'
        },
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: 'visible'
        },
        paint: {
          'heatmap-radius': 30,
          'heatmap-intensity': 2.8
        }
      },
      {
        id: 'World_Division_pl@China(0_24)',
        type: 'fill',
        source: 'China',
        'source-layer': 'World_Division_pg@China',
        metadata: {
          'layer:caption': 'World_Division_pg@China_L1-L13',
          'layer:name': 'World_Division_pl@China'
        },
        minzoom: 0,
        maxzoom: 24,
        filter: ['all', ['==', '$type', 'Polygon']],
        layout: {
          visibility: 'visible'
        },
        paint: {
          'fill-color': 'rgba(145,185,234,1.00)',
          'fill-antialias': true
        }
      },
      {
        id: 'China_Boundary_C@China#1_unique_620201(6_7)',
        type: 'line',
        source: 'China',
        'source-layer': 'China_Boundary_B_ln@China',
        metadata: {
          'layer:caption': 'China_Boundary_B_ln@China_L8_L8',
          'theme:caption': '620201',
          'layer:name': 'China_Boundary_C@China#1'
        },
        minzoom: 6,
        maxzoom: 7,
        filter: ['all', ['==', '$type', 'LineString'], ['==', 'GB', 620201]],
        layout: {
          visibility: 'visible'
        },
        paint: {
          'line-width': 1.89,
          'line-color': 'rgba(153,108,52,1.00)'
        }
      },
      {
        id: 'China_Boundary_C@China#1_unique_620202_0(6_7)',
        type: 'line',
        source: 'China',
        'source-layer': 'China_Boundary_B_ln@China',
        metadata: {
          'layer:caption': 'China_Boundary_B_ln@China_L8_L8',
          'theme:caption': '620202',
          'layer:name': 'China_Boundary_C@China#1'
        },
        minzoom: 6,
        maxzoom: 7,
        filter: ['all', ['==', '$type', 'LineString'], ['==', 'GB', 620202]],
        layout: {
          'line-cap': 'round',
          visibility: 'visible'
        },
        paint: {
          'line-width': 1.89,
          'line-offset': 0,
          'line-dasharray': [2, 4],
          'line-color': 'rgba(153,108,52,1.00)'
        }
      },
      {
        id: 'China_Boundary_C@China#1_unique_<NULL>(6_7)',
        type: 'line',
        source: 'China',
        'source-layer': 'China_Boundary_B_ln@China',
        metadata: {
          'layer:caption': 'China_Boundary_B_ln@China_L8_L8',
          'theme:caption': '<NULL>',
          'layer:name': 'China_Boundary_C@China#1'
        },
        minzoom: 6,
        maxzoom: 7,
        filter: ['all', ['==', '$type', 'LineString'], ['==', 'GB', 0]],
        layout: {
          visibility: 'visible'
        },
        paint: {
          'line-width': 1.89,
          'line-color': 'rgba(153,108,52,1.00)'
        }
      }
    ];
    const sources = {
      China: {
        type: 'vector',
        tiles: [
          'http://172.16.14.44:8090/iserver/services/map-China100/restjsr/v1/vectortile/maps/China/tiles/{z}/{x}/{y}.mvt'
        ],
        bounds: [-180, -90, 180, 90]
      },
      '0315countrycenternpc(1)': {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      }
    };
    const map = {
      getStyle() {
        return {
          layers: layersOnMap,
          sources
        };
      },
      getSource(id) {
        return sources[id];
      },
      getLayer(id) {
        return layersOnMap.find((layer) => layer.id === id);
      },
      on: jasmine.createSpy('on').and.callFake(() => {}),
      off: jasmine.createSpy('off').and.callFake(() => {})
    };
    const sourceListModel = new SourceListModelV2({ map, layers });
    const appreciableLayers = sourceListModel.getLayers();
    const selfAppreciableLayers = sourceListModel.getSelfLayers();
    expect(appreciableLayers.length).toBe(3);
    expect(appreciableLayers[2].id).toBe('China_Boundary_B_ln@China');
    expect(appreciableLayers[2].title).toBe('China_Boundary_B_ln@China');
    expect(appreciableLayers[2].renderLayers).toEqual([
      'China_Boundary_C@China#1_unique_620201(6_7)',
      'China_Boundary_C@China#1_unique_620202_0(6_7)',
      'China_Boundary_C@China#1_unique_<NULL>(6_7)'
    ]);
    expect(selfAppreciableLayers.length).toBe(3);
    const layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(2);
    expect(layerList[0].children.length).toBe(2);
    expect(layerList[0].children[0].renderLayers).toEqual(appreciableLayers[2].renderLayers);
    expect(layerList[0].type).toBe('group');
    done();
  });

  it('test mark reused', (done) => {
    map.overlayLayersManager = {};
    layers = [
      {
        id: '天地图影像',
        type: 'raster',
        source: '天地图影像',
        metadata: {
          parentLayerId: '天地图影像'
        },
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: 'visible'
        }
      },
      {
        id: 'T202007210700',
        type: 'raster',
        source: 'T202007210700',
        metadata: {
          parentLayerId: 'T202007210700'
        },
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: 'none'
        }
      }
    ];
    const sourceListModel = new SourceListModelV2({
      map,
      layers: [
        {
          layerType: 'TIANDITU_IMG_3857',
          visible: true,
          labelLayerVisible: true,
          tk: '8c88eba266a165eac9c085724708f2f9',
          name: '天地图影像',
          id: '天地图影像',
          renderLayers: ['天地图影像'],
          reused: true
        },
        {
          layerType: 'TILE',
          visible: true,
          name: 'T202007210700',
          id: 'T202007210700',
          url: 'http://fakeurl',
          renderLayers: ['T202007210700']
        }
      ]
    });
    const appreciableLayers = sourceListModel.getLayers();
    const selfAppreciableLayers = sourceListModel.getSelfLayers();
    expect(appreciableLayers.length).toBe(2);
    expect(selfAppreciableLayers.length).toBe(2);
    expect(appreciableLayers[0].reused).toBeTruthy();
    expect(appreciableLayers[1].reused).toBeUndefined();
    done();
  });

  it('destroy', (done) => {
    const sourceListModel = new SourceListModelV2({ map });
    expect(mockEvents.styledata).not.toBeUndefined();
    sourceListModel.destroy();
    expect(mockEvents.styledata).toBeUndefined();
    done();
  });

  it('toggleLayerVisible', (done) => {
    const sourceListModel = new SourceListModelV2({ map });
    const layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(3);
    expect(layerList[1].visible).toBeTruthy();
    sourceListModel.on({
      layerupdatechanged: () => {
        const layerList = sourceListModel.getLayerCatalog();
        expect(layerList[1].visible).toBeFalsy();
        expect(map.setLayoutProperty).toHaveBeenCalledTimes(layerList[1].renderLayers.length);
        done();
      }
    });
    sourceListModel.toggleLayerVisible(layerList[1], false);
    expect(mockEvents.styledata).not.toBeUndefined();
    mockEvents.styledata();
  });

  it('setLayersVisible', (done) => {
    const sourceListModel = new SourceListModelV2({ map });
    const layerList = sourceListModel.getLayerCatalog();
    expect(layerList.length).toBe(3);
    expect(layerList[1].visible).toBeTruthy();
    sourceListModel.on({
      layerupdatechanged: () => {
        const layerList = sourceListModel.getLayerCatalog();
        expect(layerList[1].visible).toBeFalsy();
        expect(map.setLayoutProperty).toHaveBeenCalledTimes(layerList[1].renderLayers.length);
        done();
      }
    });
    sourceListModel.setLayersVisible([layerList[1]], 'none');
    expect(mockEvents.styledata).not.toBeUndefined();
    mockEvents.styledata();
  });

  it('changeBaseLayer not complicit', (done) => {
    const layersInfo = [
      {
        layerType: 'TIANDITU_IMG_3857',
        labelLayerVisible: true,
        tk: '50599c913367188e6c94e872032f4cf1',
        name: '天地图影像',
        title: '天地图影像',
        renderLayers: ['天地图影像', '天地图影像-tdt-label'],
        metadata: {
          SM_Layer_Id: '天地图影像'
        },
        id: '天地图影像',
        visible: true,
        reused: false
      },
      {
        layerType: 'UNIQUE',
        visible: true,
        themeSetting: {
          themeField: 'parent',
          customSettings: {
            '{"adcode":110000}': {
              strokeWidth: 1,
              fillColor: '#D53E4F',
              fillOpacity: 0.9,
              lineDash: 'solid',
              strokeColor: '#ffffff',
              type: 'POLYGON',
              strokeOpacity: 1
            }
          },
          colors: ['#D53E4F', '#FC8D59', '#FEE08B', '#FFFFBF', '#E6F598', '#99D594', '#3288BD']
        },
        name: '北京市(3)',
        featureType: 'POLYGON',
        style: {
          strokeWidth: 1,
          fillColor: '#D53E4F',
          fillOpacity: 0.9,
          lineDash: 'solid',
          strokeColor: '#ffffff',
          type: 'POLYGON',
          strokeOpacity: 1
        },
        projection: 'EPSG:4326',
        enableFields: [
          'parent',
          'adcode',
          'level',
          'childrenNum',
          'smpid',
          'centroid',
          'center',
          'subFeatureIndex',
          'name',
          'acroutes'
        ],
        dataSource: {
          accessType: 'DIRECT',
          type: 'PORTAL_DATA',
          serverId: '1371715657'
        },
        layerID: '北京市(3)',
        renderLayers: ['北京市(3)', '北京市(3)-strokeLine'],
        metadata: {
          SM_Layer_Id: '北京市(3)'
        },
        id: '北京市(3)',
        reused: false
      }
    ];
    layers = [
      {
        id: '天地图影像',
        type: 'raster',
        source: '天地图影像',
        metadata: {
          SM_Layer_Id: '天地图影像'
        },
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: 'visible'
        }
      },
      {
        id: '天地图影像-tdt-label',
        type: 'raster',
        source: '天地图影像-tdt-label',
        metadata: {
          SM_Layer_Id: '天地图影像'
        },
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: 'visible'
        }
      },
      {
        id: '北京市(3)',
        type: 'fill',
        source: '北京市(3)',
        metadata: {
          SM_Layer_Id: '北京市(3)'
        },
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: 'visible'
        },
        paint: {
          'fill-color': '#D53E4F',
          'fill-opacity': 0.9
        }
      },
      {
        id: '北京市(3)-strokeLine',
        type: 'line',
        source: '北京市(3)',
        metadata: {
          SM_Layer_Id: '北京市(3)'
        },
        minzoom: 0,
        maxzoom: 22,
        filter: ['all'],
        layout: {
          visibility: 'visible'
        },
        paint: {
          'line-width': 1,
          'line-color': '#ffffff',
          'line-opacity': 1
        }
      }
    ];
    sources = {
      '北京市(3)': {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      },
      '天地图影像': {
        type: 'raster',
        tiles: [
          'https://t0.tianditu.gov.cn/img_w/wmts?tk=50599c913367188e6c94e872032f4cf1&service=WMTS&request=GetTile&style=default&version=1.0.0&layer=img&tilematrixSet=w&format=tiles&width=256&height=256&tilematrix={z}&tilerow={y}&tilecol={x}'
        ],
        minzoom: 0,
        maxzoom: 22,
        tileSize: 256,
        rasterSource: '',
        prjCoordSys: '',
        proxy: null,
        bounds: [-180, -90, 180, 90]
      },
      '天地图影像-tdt-label': {
        type: 'raster',
        tiles: [
          'https://t0.tianditu.gov.cn/cia_w/wmts?tk=50599c913367188e6c94e872032f4cf1&service=WMTS&request=GetTile&style=default&version=1.0.0&layer=cia&tilematrixSet=w&format=tiles&width=256&height=256&tilematrix={z}&tilerow={y}&tilecol={x}'
        ],
        minzoom: 0,
        maxzoom: 22,
        tileSize: 256,
        rasterSource: '',
        prjCoordSys: '',
        proxy: null,
        bounds: [-180, -90, 180, 90]
      }
    };
    overlayLayersManager = {};

    const sourceListModel = new SourceListModelV2({ map, layers: layersInfo });
    expect(map.getStyle().layers.some(item => ['天地图影像', '天地图影像-tdt-label'].includes(item.id))).toBeTruthy();
    const layerList = sourceListModel.getLayerCatalog();
    const appreciableLayers = sourceListModel.getLayers();
    expect(layerList.length).toBe(2);
    expect(appreciableLayers.length).toBe(2);
    const nextBaseLayerInfo = sourceListModel.changeBaseLayer(baseLayerInfo);
    expect(nextBaseLayerInfo).toBeTruthy();
    expect(nextBaseLayerInfo.layers.length).toBe(1);
    expect(nextBaseLayerInfo.layers).toEqual(baseLayerInfo.layers);
    expect(map.getStyle().layers.some(item => ['天地图影像', '天地图影像-tdt-label'].includes(item.id))).toBeFalsy();
    done();
  });

  it('changeBaseLayer complicit', (done) => {
    const layersInfo = [
      {
        layerType: 'raster',
        name: 'wmts100',
        title: 'wmts100',
        renderLayers: ['wmts100'],
        metadata: {
          SM_Layer_Id: 'wmts100'
        },
        id: 'wmts100',
        visible: true,
        reused: false
      },
      {
        layerType: 'TIANDITU_IMG_3857',
        labelLayerVisible: true,
        tk: '50599c913367188e6c94e872032f4cf1',
        name: '天地图影像',
        title: '天地图影像',
        renderLayers: ['天地图影像', '天地图影像-tdt-label'],
        metadata: {
          SM_Layer_Id: '天地图影像'
        },
        id: '天地图影像',
        visible: true,
        reused: false
      },
      {
        layerType: 'UNIQUE',
        visible: true,
        themeSetting: {
          themeField: 'parent',
          customSettings: {
            '{"adcode":110000}': {
              strokeWidth: 1,
              fillColor: '#D53E4F',
              fillOpacity: 0.9,
              lineDash: 'solid',
              strokeColor: '#ffffff',
              type: 'POLYGON',
              strokeOpacity: 1
            }
          },
          colors: ['#D53E4F', '#FC8D59', '#FEE08B', '#FFFFBF', '#E6F598', '#99D594', '#3288BD']
        },
        name: '北京市(3)',
        featureType: 'POLYGON',
        style: {
          strokeWidth: 1,
          fillColor: '#D53E4F',
          fillOpacity: 0.9,
          lineDash: 'solid',
          strokeColor: '#ffffff',
          type: 'POLYGON',
          strokeOpacity: 1
        },
        projection: 'EPSG:4326',
        enableFields: [
          'parent',
          'adcode',
          'level',
          'childrenNum',
          'smpid',
          'centroid',
          'center',
          'subFeatureIndex',
          'name',
          'acroutes'
        ],
        dataSource: {
          accessType: 'DIRECT',
          type: 'PORTAL_DATA',
          serverId: '1371715657'
        },
        layerID: '北京市(3)',
        renderLayers: ['北京市(3)', '北京市(3)-strokeLine'],
        metadata: {
          SM_Layer_Id: '北京市(3)'
        },
        id: '北京市(3)',
        reused: false
      }
    ];
    layers = [
      ...baseLayerInfo.layers,
      {
        id: '天地图影像',
        type: 'raster',
        source: '天地图影像',
        metadata: {
          SM_Layer_Id: '天地图影像'
        },
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: 'visible'
        }
      },
      {
        id: '天地图影像-tdt-label',
        type: 'raster',
        source: '天地图影像-tdt-label',
        metadata: {
          SM_Layer_Id: '天地图影像'
        },
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: 'visible'
        }
      },
      {
        id: '北京市(3)-strokeLine',
        type: 'line',
        source: '北京市(3)',
        metadata: {
          SM_Layer_Id: '北京市(3)'
        },
        minzoom: 0,
        maxzoom: 22,
        filter: ['all'],
        layout: {
          visibility: 'visible'
        },
        paint: {
          'line-width': 1,
          'line-color': '#ffffff',
          'line-opacity': 1
        }
      }
    ];
    sources = {
      '北京市(3)': {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      },
      '天地图影像': {
        type: 'raster',
        tiles: [
          'https://t0.tianditu.gov.cn/img_w/wmts?tk=50599c913367188e6c94e872032f4cf1&service=WMTS&request=GetTile&style=default&version=1.0.0&layer=img&tilematrixSet=w&format=tiles&width=256&height=256&tilematrix={z}&tilerow={y}&tilecol={x}'
        ],
        minzoom: 0,
        maxzoom: 22,
        tileSize: 256,
        rasterSource: '',
        prjCoordSys: '',
        proxy: null,
        bounds: [-180, -90, 180, 90]
      },
      '天地图影像-tdt-label': {
        type: 'raster',
        tiles: [
          'https://t0.tianditu.gov.cn/cia_w/wmts?tk=50599c913367188e6c94e872032f4cf1&service=WMTS&request=GetTile&style=default&version=1.0.0&layer=cia&tilematrixSet=w&format=tiles&width=256&height=256&tilematrix={z}&tilerow={y}&tilecol={x}'
        ],
        minzoom: 0,
        maxzoom: 22,
        tileSize: 256,
        rasterSource: '',
        prjCoordSys: '',
        proxy: null,
        bounds: [-180, -90, 180, 90]
      },
      ...baseLayerInfo.sources
    };
    overlayLayersManager = {};

    const sourceListModel = new SourceListModelV2({ map, layers: layersInfo });
    expect(map.getStyle().layers.some(item => ['天地图影像', '天地图影像-tdt-label'].includes(item.id))).toBeTruthy();
    expect(map.getStyle().layers.some(item => ['wmts100'].includes(item.id))).toBeTruthy();
    let layerList = sourceListModel.getLayerCatalog();
    let appreciableLayers = sourceListModel.getLayers();
    expect(layerList.length).toBe(3);
    expect(layerList[layerList.length - 1].id).toBe('wmts100');
    expect(appreciableLayers.length).toBe(3);
    expect(appreciableLayers[0].id).toBe('wmts100');
    const sameBaseLayer = {
      id: 'sameBaseLayer',
      layers: layers.slice(1, 3).map(item => {
        const nextItem = Object.assign({}, item);
        nextItem.metadata = { SM_Layer_Id: 'sameBaseLayer' };
        return nextItem;
      }),
      sources: {
        '天地图影像': sources['天地图影像'],
        '天地图影像-tdt-label': sources['天地图影像-tdt-label']
      }
    }
    const nextBaseLayerInfo = sourceListModel.changeBaseLayer(sameBaseLayer);
    expect(nextBaseLayerInfo).toBeTruthy();
    expect(nextBaseLayerInfo.layers.length).toBe(2);
    expect(nextBaseLayerInfo.layers).not.toEqual(sameBaseLayer.layers);
    expect(map.getStyle().layers.some(item => ['天地图影像', '天地图影像-tdt-label'].includes(item.id))).toBeTruthy();
    expect(map.getStyle().layers.some(item => [/天地图影像_\d+$/, /天地图影像-tdt-label_\d+$/].some(reg => reg.test(item.id)))).toBeTruthy();
    expect(map.getStyle().layers.some(item => ['wmts100'].includes(item.id))).toBeFalsy();
    layerList = sourceListModel.getLayerCatalog();
    appreciableLayers = sourceListModel.getLayers();
    expect(layerList.length).toBe(3);
    expect(layerList[layerList.length - 1].id).toBe('sameBaseLayer');
    expect(appreciableLayers.length).toBe(3);
    expect(appreciableLayers[0].id).toBe('sameBaseLayer');
    done();
  });
});
