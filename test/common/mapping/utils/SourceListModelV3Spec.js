import {
  SourceListModelV3
} from '../../../../src/common/mapping/utils/SourceListModelV3';
import {
  isL7Layer
} from '../../../../src/common/mapping/utils/L7LayerUtil';
import '../../../resources/WebMapV3.js';
import cloneDeep from 'lodash.clonedeep';
describe('SourceListV3', () => {
  let map, layers, sources, mockEvents, overlayLayersManager;
  const baseLayerInfo = {
    id: 'wmts100',
    title: 'wmts100',
    layers: [{
      id: 'wmts100',
      type: 'raster',
      source: 'wmts100',
      minzoom: 0,
      maxzoom: 12
    }],
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
      layerCatalog: [{
          visible: true,
          parts: ['北京市住宅小区'],
          id: 'layer_北京市住宅小区_1754359974753_24',
          title: '北京市住宅小区',
          type: 'composite'
        },
        {
          visible: true,
          children: [{
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
    layers: [{
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
    layers = [{
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
        metadata: {
          parentLayerId: 'test-source'
        }
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

  it('getLayers - wfs', (done) => {
    const mapInfo = {
      "metadata": {
        "layerCatalog": [{
            "visible": true,
            "children": [{
              "visible": true,
              "parts": [
                "ProvinceCapital_P@Population#1_0.8"
              ],
              "id": "layer_ProvinceCapital_P@Population#1_1755679838482_95",
              "title": "ProvinceCapital_P@Population#1",
              "type": "composite"
            }],
            "id": "group_PopulationDistribution_wms111_1755679838482_96",
            "title": "PopulationDistribution_wms111",
            "type": "group"
          },
          {
            "visible": true,
            "children": [{
              "visible": true,
              "parts": [
                "Province_L@Population_0.3"
              ],
              "id": "layer_Province_L@Population_1755679795075_67",
              "title": "Province_L@Population",
              "type": "composite"
            }],
            "id": "group_PopulationDistribution_wms111_1755679795075_68",
            "title": "PopulationDistribution_wms111",
            "type": "group"
          },
          {
            "visible": true,
            "id": "CHINA_DARK",
            "title": "中国暗色地图",
            "type": "basic"
          }
        ]
      },
      "sources": {
        "CHINA_DARK": {
          "tiles": [
            "https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark/tileimage.png?scale={scale}&x={x}&y={y}&width={width}&height={height}&transparent=true&redirect=false&cacheEnabled=true"
          ],
          "tileSize": 256,
          "attribution": "",
          "bounds": [
            -180,
            -90,
            180,
            90
          ],
          "type": "raster"
        },
        "ms_wms_1755679795073_58": {
          "tiles": [
            "http://172.16.14.77:8090/iserver/services/map-Population/wms111/PopulationDistribution?service=WMS&request=GetMap&layers=0.3&styles=&format=image/png&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}"
          ],
          "tileSize": 256,
          "bounds": [
            79.00794462500004,
            20.0992050343981,
            131.29906509500006,
            53.333658559101075
          ],
          "type": "raster"
        },
        "ms_wms_1755679838481_90": {
          "tiles": [
            "http://172.16.14.77:8090/iserver/services/map-Population/wms111/PopulationDistribution?service=WMS&request=GetMap&layers=0.8&styles=&format=image/png&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}"
          ],
          "tileSize": 256,
          "bounds": [
            87.61425523000014,
            19.997037504400623,
            126.53037681500007,
            45.803316189065896
          ],
          "type": "raster"
        }
      },
      "crs": "EPSG:3857",
      "center": [
        99.85865648224853,
        31.86438306758635
      ],
      "zoom": 3.826097678440538,
      "glyphs": {},
      "version": "3.3.0",
      "rootUrl": "http://172.16.15.206:8190/iportal/",
      "maxzoom": 12,
      "name": "无标题地图",
      "viewExtent": [
        68.52728177830532,
        12.16261318538571,
        131.1900311861916,
        48.1198896120401
      ],
      "layers": [{
          "maxzoom": 12,
          "id": "CHINA_DARK",
          "source": "CHINA_DARK",
          "type": "raster",
          "minzoom": 0
        },
        {
          "metadata": {},
          "id": "Province_L@Population_0.3",
          "source": "ms_wms_1755679795073_58",
          "type": "raster"
        },
        {
          "metadata": {},
          "id": "ProvinceCapital_P@Population#1_0.8",
          "source": "ms_wms_1755679838481_90",
          "type": "raster"
        }
      ],
      "pitch": 0,
      "minzoom": 0
    };
    const projInfo = {
      "catalogs": [{
        "visible": true,
        "catalogType": "group",
        "children": [{
          "catalogType": "layer",
          "relationMsDatasetId": "ms_Population:ProvinceCapital_P_1755679835391_71",
          "serviceLayerId": "0.8",
          "id": "layer_ProvinceCapital_P@Population#1_1755679838482_95",
          "popupInfo": {
            "elements": [{
              "fieldName": "SmID",
              "type": "FIELD"
            }, {
              "fieldName": "SmX",
              "type": "FIELD"
            }, {
              "fieldName": "SmY",
              "type": "FIELD"
            }, {
              "fieldName": "SmLibTileID",
              "type": "FIELD"
            }, {
              "fieldName": "SmUserID",
              "type": "FIELD"
            }, {
              "fieldName": "SmGeometrySize",
              "type": "FIELD"
            }, {
              "fieldName": "SmGeoPosition",
              "type": "FIELD"
            }, {
              "fieldName": "Name",
              "type": "FIELD"
            }],
            "title": "ProvinceCapital_P@Population#1"
          },
          "title": "ProvinceCapital_P@Population#1",
          "layerSourceType": "WMSService",
          "zoomRange": [0, 24],
          "layersContent": ["ProvinceCapital_P@Population#1_0.8"]
        }],
        "name": "PopulationDistribution_wms111",
        "id": "group_PopulationDistribution_wms111_1755679838482_96"
      }, {
        "visible": true,
        "catalogType": "group",
        "children": [{
          "catalogType": "layer",
          "relationMsDatasetId": "ms_Population:Province_L_1755679787206_46",
          "serviceLayerId": "0.3",
          "id": "layer_Province_L@Population_1755679795075_67",
          "popupInfo": {
            "elements": [{
              "fieldName": "SmID",
              "type": "FIELD"
            }, {
              "fieldName": "SmLength",
              "type": "FIELD"
            }, {
              "fieldName": "SmSdriW",
              "type": "FIELD"
            }, {
              "fieldName": "SmSdriN",
              "type": "FIELD"
            }, {
              "fieldName": "SmSdriE",
              "type": "FIELD"
            }, {
              "fieldName": "SmSdriS",
              "type": "FIELD"
            }, {
              "fieldName": "SmUserID",
              "type": "FIELD"
            }, {
              "fieldName": "SmTopoError",
              "type": "FIELD"
            }, {
              "fieldName": "SmGeometrySize",
              "type": "FIELD"
            }, {
              "fieldName": "SmGeoPosition",
              "type": "FIELD"
            }, {
              "fieldName": "GB",
              "type": "FIELD"
            }],
            "title": "Province_L@Population"
          },
          "title": "Province_L@Population",
          "layerSourceType": "WMSService",
          "zoomRange": [0, 24],
          "layersContent": ["Province_L@Population_0.3"]
        }],
        "name": "PopulationDistribution_wms111",
        "id": "group_PopulationDistribution_wms111_1755679795075_68"
      }],
      "datas": [{
        "sourceType": "WFS",
        "datasets": [{
          "datasetTitle": "Country_R",
          "msDatasetId": "ms_Population:Country_R_1755679787206_42",
          "datasetName": "Population:Country_R"
        }, {
          "datasetTitle": "HeiHeTengChong_P",
          "msDatasetId": "ms_Population:HeiHeTengChong_P_1755679787206_43",
          "datasetName": "Population:HeiHeTengChong_P"
        }, {
          "datasetTitle": "ProvinceCapital_P",
          "msDatasetId": "ms_Population:ProvinceCapital_P_1755679787206_44",
          "datasetName": "Population:ProvinceCapital_P"
        }, {
          "datasetTitle": "BorderTest_L",
          "msDatasetId": "ms_Population:BorderTest_L_1755679787206_45",
          "datasetName": "Population:BorderTest_L"
        }, {
          "datasetTitle": "Province_L",
          "msDatasetId": "ms_Population:Province_L_1755679787206_46",
          "datasetName": "Population:Province_L"
        }, {
          "datasetTitle": "Island_R",
          "msDatasetId": "ms_Population:Island_R_1755679787206_47",
          "datasetName": "Population:Island_R"
        }, {
          "datasetTitle": "PopDensity_R",
          "msDatasetId": "ms_Population:PopDensity_R_1755679787206_48",
          "datasetName": "Population:PopDensity_R"
        }, {
          "datasetTitle": "Coastline_L",
          "msDatasetId": "ms_Population:Coastline_L_1755679787206_49",
          "datasetName": "Population:Coastline_L"
        }, {
          "datasetTitle": "Buffer20000",
          "msDatasetId": "ms_Population:Buffer20000_1755679787206_50",
          "datasetName": "Population:Buffer20000"
        }, {
          "datasetTitle": "Buffer35000",
          "msDatasetId": "ms_Population:Buffer35000_1755679787206_51",
          "datasetName": "Population:Buffer35000"
        }, {
          "datasetTitle": "County_R",
          "msDatasetId": "ms_Population:County_R_1755679787206_52",
          "datasetName": "Population:County_R"
        }, {
          "datasetTitle": "County_P",
          "msDatasetId": "ms_Population:County_P_1755679787206_53",
          "datasetName": "Population:County_P"
        }],
        "title": "示例 WFS 服务",
        "url": "http://172.16.14.77:8090/iserver/services/data-Population-2/wfs200/gb18030"
      }, {
        "sourceType": "WFS",
        "withCredential": {
          "key": "token",
          "value": "test"
        },
        "datasets": [{
          "datasetTitle": "Country_R",
          "msDatasetId": "ms_Population:Country_R_1755679835391_69",
          "datasetName": "Population:Country_R"
        }, {
          "datasetTitle": "HeiHeTengChong_P",
          "msDatasetId": "ms_Population:HeiHeTengChong_P_1755679835391_70",
          "datasetName": "Population:HeiHeTengChong_P"
        }, {
          "datasetTitle": "ProvinceCapital_P",
          "msDatasetId": "ms_Population:ProvinceCapital_P_1755679835391_71",
          "datasetName": "Population:ProvinceCapital_P"
        }, {
          "datasetTitle": "BorderTest_L",
          "msDatasetId": "ms_Population:BorderTest_L_1755679835391_72",
          "datasetName": "Population:BorderTest_L"
        }, {
          "datasetTitle": "Province_L",
          "msDatasetId": "ms_Population:Province_L_1755679835391_73",
          "datasetName": "Population:Province_L"
        }, {
          "datasetTitle": "Island_R",
          "msDatasetId": "ms_Population:Island_R_1755679835391_74",
          "datasetName": "Population:Island_R"
        }, {
          "datasetTitle": "PopDensity_R",
          "msDatasetId": "ms_Population:PopDensity_R_1755679835391_75",
          "datasetName": "Population:PopDensity_R"
        }, {
          "datasetTitle": "Coastline_L",
          "msDatasetId": "ms_Population:Coastline_L_1755679835391_76",
          "datasetName": "Population:Coastline_L"
        }, {
          "datasetTitle": "Buffer20000",
          "msDatasetId": "ms_Population:Buffer20000_1755679835391_77",
          "datasetName": "Population:Buffer20000"
        }, {
          "datasetTitle": "Buffer35000",
          "msDatasetId": "ms_Population:Buffer35000_1755679835391_78",
          "datasetName": "Population:Buffer35000"
        }, {
          "datasetTitle": "County_R",
          "msDatasetId": "ms_Population:County_R_1755679835391_79",
          "datasetName": "Population:County_R"
        }, {
          "datasetTitle": "County_P",
          "msDatasetId": "ms_Population:County_P_1755679835391_80",
          "datasetName": "Population:County_P"
        }],
        "title": "示例 WFS 服务",
        "url": "http://172.16.14.77:8090/iserver/services/data-Population-2/wfs200/gb18030"
      }],
      "baseLayer": {
        "internetMapName": "CHINA_DARK",
        "type": "INTERNET_MAP"
      },
      "version": "3.1.2"
    };

    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: projInfo,
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const appreciableLayers = sourceListModel.getLayers();
    expect(appreciableLayers.find(l => l.dataSource.type === 'WFS')).toBeTruthy();
    done();
  });
  it('getLayers - filter', (done) => {
    const mapInfo = {
      "metadata": {
        "layerCatalog": [{
            "visible": true,
            "parts": [
              "BaseMap_R@Jingjin#1_unique_(0_24)"
            ],
            "id": "layer_BaseMap_R@Jingjin#1_1768977772124_306",
            "title": "BaseMap_R@Jingjin#1",
            "type": "composite"
          },
          {
            "visible": true,
            "parts": [
              "ms_Captital_P_1768977260316_30"
            ],
            "id": "layer_Captital_P_1768977260317_32",
            "title": "Captital_P",
            "type": "composite"
          },
          {
            "visible": true,
            "parts": [
              "四川发电站上月发电量"
            ],
            "id": "layer_四川发电站上月发电量_1768962856899_28",
            "title": "四川发电站上月发电量",
            "type": "composite"
          },
          {
            "visible": true,
            "id": "OSM",
            "title": "OpenStreetMap",
            "type": "basic"
          }
        ]
      },
      "sources": {
        "ms_京津地区地图_1768977772122_222": {
          "tiles": [
            "http://172.16.14.77:8090/iserver/services/map-Jingjin/rest/maps/京津地区地图/tileFeature.mvt?returnAttributes=true&width=512&height=512&x={x}&y={y}&z={z}"
          ],
          "bounds": [
            114.58902605452259,
            37.76434929128856,
            119.51371730073062,
            42.31307532235788
          ],
          "type": "vector"
        },
        "OSM": {
          "tiles": [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ],
          "tileSize": 256,
          "attribution": "",
          "bounds": [
            -180,
            -90,
            180,
            90
          ],
          "type": "raster"
        },
        "ms_606692449_1768962856899_27": {
          "tiles": [
            "http://172.16.15.136:8080/iportal/web/datas/606692449/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=4326&returnedFieldNames=%5B%22smpid%22%2C%22%E5%BA%8F%E5%8F%B7%22%2C%22%E6%B0%B4%E7%94%B5%E7%AB%99%E5%90%8D%E7%A7%B0%22%2C%22%E6%89%80%E5%9C%A8%E7%9C%81%22%2C%22%E6%89%80%E5%9C%A8%E5%B8%82%E5%B7%9E%22%2C%22%E6%89%80%E5%9C%A8%E5%9C%B0%22%2C%22%E8%AF%A6%E7%BB%86%E5%9C%B0%E5%9D%80%22%2C%22X%22%2C%22Y%22%2C%22%E6%9C%88%E5%8F%91%E7%94%B5%E9%87%8F%22%2C%22%E6%B0%B4%E7%94%B5%E7%AB%99%E6%80%A7%E8%B4%A8%22%5D&geometryFieldName=geometry"
          ],
          "bounds": [
            100.98842,
            26.28844000000001,
            108.25193,
            32.524739999999994
          ],
          "type": "vector"
        },
        "ms_Captital_P_ms_datasetId_1768977259887_27_1768977260316_31": {
          "tiles": [
            "http://172.16.14.77:8090/iserver/services/data-Jingjin/rest/data/datasources/Jingjin/datasets/Captital_P/tileFeature.mvt?returnAttributes=true&width=512&height=512&x={x}&y={y}&z={z}"
          ],
          "bounds": [
            116.407283,
            39.12096299445415,
            117.215268,
            39.90455699411283
          ],
          "type": "vector"
        }
      },
      "crs": "EPSG:4326",
      "center": [
        117.05137167762655,
        40.03871230682322
      ],
      "zoom": 7.059607301518861,
      "glyphs": {
        "ms_京津地区地图_1768977772122_222": "http://172.16.14.77:8090/iserver/services/map-Jingjin/rest/maps/%E4%BA%AC%E6%B4%A5%E5%9C%B0%E5%8C%BA%E5%9C%B0%E5%9B%BE/tileFeature/sdffonts/{fontstack}/{range}.pbf",
        "ms_京津地区地图_1768977731355_29": "http://172.16.14.77:8090/iserver/services/map-Jingjin/rest/maps/%E4%BA%AC%E6%B4%A5%E5%9C%B0%E5%8C%BA%E5%9C%B0%E5%9B%BE/tileFeature/sdffonts/{fontstack}/{range}.pbf"
      },
      "version": "3.3.3",
      "rootUrl": "http://172.16.15.136:8080/iportal/",
      "maxzoom": 19,
      "name": "无标题地图",
      "viewExtent": [
        113.73601979634907,
        37.76434929128869,
        120.36672355890485,
        42.31307532235813
      ],
      "layers": [{
          "maxzoom": 19,
          "id": "OSM",
          "source": "OSM",
          "type": "raster",
          "minzoom": 0
        },
        {
          "filter": [
            "all",
            [
              "<=",
              "smpid",
              20
            ]
          ],
          "metadata": {},
          "maxzoom": 24,
          "paint": {
            "circle-color": "#EE4D5A",
            "circle-opacity": 0.9,
            "circle-translate-anchor": "map",
            "circle-radius": 4,
            "circle-translate": [
              0,
              0
            ]
          },
          "id": "四川发电站上月发电量",
          "source": "ms_606692449_1768962856899_27",
          "source-layer": "606692449$geometry",
          "type": "circle",
          "minzoom": 0
        },
        {
          "filter": [
            "all",
            [
              "!=",
              "ADMINNAME",
              "天津"
            ]
          ],
          "metadata": {},
          "paint": {
            "circle-color": "#EE4D5A",
            "circle-opacity": 0.9,
            "circle-translate-anchor": "map",
            "circle-radius": 4,
            "circle-translate": [
              0,
              0
            ]
          },
          "id": "ms_Captital_P_1768977260316_30",
          "source": "ms_Captital_P_ms_datasetId_1768977259887_27_1768977260316_31",
          "source-layer": "Captital_P@Jingjin",
          "type": "circle"
        },
        {
          "filter": [
            "all",
            [
              "==",
              "ADMI",
              110101
            ]
          ],
          "layout": {
            "visibility": "visible"
          },
          "metadata": {},
          "maxzoom": 24,
          "paint": {
            "fill-pattern": [
              "match",
              [
                "get",
                "City"
              ],
              "北京市",
              "fill_0_F4F3F0FF_FFFFFFFF_100",
              "天津市",
              "fill_0_FAF3F3FF_FFFFFFFF_100",
              "fill_0_BDEBFFFF_FFFFFFFF_100"
            ],
            "fill-color": "#000000",
            "fill-opacity": 0.999999,
            "fill-antialias": true
          },
          "id": "BaseMap_R@Jingjin#1_unique_(0_24)",
          "source": "ms_京津地区地图_1768977772122_222",
          "source-layer": "BaseMap_R@Jingjin",
          "type": "fill",
          "minzoom": 0
        }
      ],
      "sprite": "http://172.16.15.136:8080/iportal/web/maps/893537872/sprites/sprite",
      "pitch": 0,
      "minzoom": 0
    };
    const projInfo = {
      "images": "http://172.16.15.136:8080/iportal/web/maps/893537872/sprites/sprite",
      "catalogs": [{
        "filter": ["all", ["==", "ADMI", 110101]],
        "visualization": {
          "renderer": [{
            "symbolsContent": {
              "field": ["City"],
              "defaultValue": {
                "symbolId": "fill_0_BDEBFFFF_FFFFFFFF_100",
                "style": {
                  "paint": {
                    "fill-pattern": "fill_0_BDEBFFFF_FFFFFFFF_100"
                  }
                }
              },
              "values": [{
                "value": {
                  "symbolId": "fill_0_F4F3F0FF_FFFFFFFF_100",
                  "style": {
                    "paint": {
                      "fill-pattern": "fill_0_F4F3F0FF_FFFFFFFF_100"
                    }
                  }
                },
                "key": "北京市"
              }, {
                "value": {
                  "symbolId": "fill_0_FAF3F3FF_FFFFFFFF_100",
                  "style": {
                    "paint": {
                      "fill-pattern": "fill_0_FAF3F3FF_FFFFFFFF_100"
                    }
                  }
                },
                "key": "天津市"
              }],
              "type": "unique"
            },
            "color": {
              "type": "simple",
              "value": "#000000"
            },
            "antialias": {
              "type": "simple",
              "value": true
            },
            "outlineColor": {
              "type": "simple",
              "value": "#FFFFFF"
            },
            "opacity": {
              "type": "simple",
              "value": 1
            },
            "styleRenderMode": "mapboxgl"
          }]
        },
        "visible": true,
        "catalogType": "layer",
        "serviceLayerId": "BaseMap_R@Jingjin#1",
        "id": "layer_BaseMap_R@Jingjin#1_1768977772124_306",
        "popupInfo": {
          "elements": [{
            "fieldName": "ADMI",
            "type": "FIELD"
          }, {
            "fieldName": "City",
            "type": "FIELD"
          }, {
            "fieldName": "NAME",
            "type": "FIELD"
          }, {
            "fieldName": "NEWA",
            "type": "FIELD"
          }, {
            "fieldName": "POP_1992",
            "type": "FIELD"
          }, {
            "fieldName": "POP_1995",
            "type": "FIELD"
          }, {
            "fieldName": "POP_1999",
            "type": "FIELD"
          }, {
            "fieldName": "POP_DENSITY99",
            "type": "FIELD"
          }, {
            "fieldName": "POP_RATE95",
            "type": "FIELD"
          }, {
            "fieldName": "POP_RATE99",
            "type": "FIELD"
          }, {
            "fieldName": "RURAL",
            "type": "FIELD"
          }, {
            "fieldName": "SmArea",
            "type": "FIELD"
          }, {
            "fieldName": "SmGeometrySize",
            "type": "FIELD"
          }, {
            "fieldName": "SmID",
            "type": "FIELD"
          }, {
            "fieldName": "SmPerimeter",
            "type": "FIELD"
          }, {
            "fieldName": "SmSdriE",
            "type": "FIELD"
          }, {
            "fieldName": "SmSdriN",
            "type": "FIELD"
          }, {
            "fieldName": "SmSdriS",
            "type": "FIELD"
          }, {
            "fieldName": "SmSdriW",
            "type": "FIELD"
          }, {
            "fieldName": "SmUserID",
            "type": "FIELD"
          }, {
            "fieldName": "URBAN",
            "type": "FIELD"
          }, {
            "fieldName": "URBANRURAL",
            "type": "FIELD"
          }],
          "title": "BaseMap_R@Jingjin#1"
        },
        "serviceLayerGroupId": "未命名分组",
        "title": "BaseMap_R@Jingjin#1",
        "layerSourceType": "VectorTileService",
        "zoomRange": [0, 24],
        "layersContent": ["BaseMap_R@Jingjin#1_unique_(0_24)"]
      }, {
        "filter": ["all", ["!=", "ADMINNAME", "天津"]],
        "visualization": {
          "renderer": [{
            "symbolsContent": {
              "type": "simple",
              "value": {
                "symbolId": "circle",
                "style": {
                  "layout": {
                    "icon-image": "circle"
                  }
                }
              }
            },
            "size": {
              "type": "simple",
              "value": 8
            },
            "color": {
              "type": "simple",
              "value": "#EE4D5A"
            },
            "translateAnchor": {
              "type": "simple",
              "value": "map"
            },
            "opacity": {
              "type": "simple",
              "value": 0.9
            },
            "translate": {
              "type": "simple",
              "value": [0, 0]
            },
            "styleRenderMode": "mapboxgl"
          }]
        },
        "catalogType": "layer",
        "msDatasetId": "ms_datasetId_1768977259887_27",
        "bounds": [116.407283, 39.12096299445415, 117.215268, 39.90455699411283],
        "id": "layer_Captital_P_1768977260317_32",
        "popupInfo": {
          "elements": [{
            "fieldName": "SmID",
            "type": "FIELD"
          }, {
            "fieldName": "SmX",
            "type": "FIELD"
          }, {
            "fieldName": "SmY",
            "type": "FIELD"
          }, {
            "fieldName": "SmLibTileID",
            "type": "FIELD"
          }, {
            "fieldName": "SmGeometrySize",
            "type": "FIELD"
          }, {
            "fieldName": "SmUserID",
            "type": "FIELD"
          }, {
            "fieldName": "ADMINNAME",
            "type": "FIELD"
          }, {
            "fieldName": "ADMINCODE",
            "type": "FIELD"
          }],
          "title": "Captital_P"
        },
        "title": "Captital_P",
        "layerSourceType": "DataService",
        "zoomRange": [0, 24],
        "layersContent": ["ms_Captital_P_1768977260316_30"]
      }, {
        "filter": ["all", ["<=", "smpid", 20]],
        "visualization": {
          "renderer": [{
            "symbolsContent": {
              "type": "simple",
              "value": {
                "symbolId": "circle",
                "style": {
                  "layout": {
                    "icon-image": "circle"
                  }
                }
              }
            },
            "size": {
              "type": "simple",
              "value": 8
            },
            "color": {
              "type": "simple",
              "value": "#EE4D5A"
            },
            "translateAnchor": {
              "type": "simple",
              "value": "map"
            },
            "opacity": {
              "type": "simple",
              "value": 0.9
            },
            "translate": {
              "type": "simple",
              "value": [0, 0]
            },
            "styleRenderMode": "mapboxgl"
          }]
        },
        "visible": true,
        "catalogType": "layer",
        "msDatasetId": "ms_datasetId_1768962856890_25",
        "bounds": [100.98842, 26.28844000000001, 108.25193, 32.524739999999994],
        "id": "layer_四川发电站上月发电量_1768962856899_28",
        "popupInfo": {
          "elements": [{
            "fieldName": "smpid",
            "type": "FIELD"
          }, {
            "fieldName": "序号",
            "type": "FIELD"
          }, {
            "fieldName": "水电站名称",
            "type": "FIELD"
          }, {
            "fieldName": "所在省",
            "type": "FIELD"
          }, {
            "fieldName": "所在市州",
            "type": "FIELD"
          }, {
            "fieldName": "所在地",
            "type": "FIELD"
          }, {
            "fieldName": "详细地址",
            "type": "FIELD"
          }, {
            "fieldName": "X",
            "type": "FIELD"
          }, {
            "fieldName": "Y",
            "type": "FIELD"
          }, {
            "fieldName": "月发电量",
            "type": "FIELD"
          }, {
            "fieldName": "水电站性质",
            "type": "FIELD"
          }, {
            "fieldName": "geometry",
            "type": "FIELD"
          }],
          "title": "四川发电站上月发电量"
        },
        "title": "四川发电站上月发电量",
        "layerSourceType": "Data",
        "zoomRange": [0, 24],
        "layersContent": ["四川发电站上月发电量"]
      }],
      "datas": [{
        "sourceType": "STRUCTURE_DATA",
        "datasets": [{
          "datasetTitle": "四川发电站上月发电量",
          "msDatasetId": "ms_datasetId_1768962856890_25",
          "datasetId": "606692449",
          "geometryField": "geometry"
        }],
        "title": "四川发电站上月发电量"
      }, {
        "sourceType": "REST_DATA",
        "datasets": [{
          "datasetTitle": "Captital_P",
          "msDatasetId": "ms_datasetId_1768977259887_27",
          "datasetName": "Captital_P"
        }],
        "title": "Jingjin",
        "url": "http://172.16.14.77:8090/iserver/services/data-Jingjin/rest/data/datasources/Jingjin"
      }],
      "baseLayer": {
        "internetMapName": "OSM",
        "type": "INTERNET_MAP",
        "labelVisible": true
      },
      "version": "3.1.2"
    };

    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: projInfo,
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const appreciableLayers = sourceListModel.getLayers();
    expect(appreciableLayers[1].filter).toEqual([
      "all",
      [
        "<=",
        "smpid",
        20
      ]
    ]);
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
    sourceListModel.toggleLayerVisible({
      type: 'group',
      title: 'emtpy-group',
      id: 'group1',
      children: []
    }, false);
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
        nextItem.metadata = {
          SM_Layer_Id: 'sameBaseLayer',
          title: `custom_${item.id}`
        };
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
        metadata: {
          title: `custom_${item.id}`
        }
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
