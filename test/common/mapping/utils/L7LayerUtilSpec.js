import { L7LayerUtil, getL7Filter } from '../../../../src/common/mapping/utils/L7LayerUtil';
import { FetchRequest } from '../../../../src/common/util/FetchRequest';
import * as mockL7 from '../../../tool/mock_l7';
import { featureFilter, expression } from '@mapbox/mapbox-gl-style-spec';
import spec from '@mapbox/mapbox-gl-style-spec/reference/v8';

describe('L7LayerUtil', () => {
  const L7 = {
    Marker: class {
      setLnglat() {}
    },
    MarkerLayer: class {
      addMarker() {}
    },
    LineLayer: mockL7.PointLayer,
    PointLayer: mockL7.PointLayer,
    HeatmapLayer: mockL7.PointLayer,
    PolygonLayer: mockL7.PolygonLayer
  };
  const L7Layer = class {
    constructor(params) {
      const { type, options = {} } = params;
      const id = options.layerID;
      this.l7layer = new L7[type](options);
      this.id = id;
    }

    getL7Layer() {
      return this.l7layer;
    }

    getLayer() {
      return this.l7layer.rawConfig;
    }

    reRender() {}
  };
  const l7LayerUtil = L7LayerUtil({ featureFilter, expression, spec, L7Layer, L7 });
  const mapstudioWebMap_L7LayersRes = JSON.parse(mapstudioWebMap_L7Layers);

  const scene = new mockL7.Scene();
  let layerMaplist = {};
  const map = {
    getL7Scene: () => Promise.resolve(scene),
    addLayer: (layer) => {
      layerMaplist[layer.id] = layer;
    },
    getZoom: () => 3,
    getLayer: (layerId) => layerId.includes('-highlight')
  };

  const options = {
    withCredentials: true,
    server: 'http://localhost:8190/iportal/',
    emitterEvent: function() {}
  };

  const addOptions = {
    map,
    webMapInfo: { ...mapstudioWebMap_L7LayersRes },
    l7Layers: mapstudioWebMap_L7LayersRes.layers.filter((layer) => l7LayerUtil.isL7Layer(layer)),
    spriteDatas: {
      shape7: {
        sdf: true,
        pixelRatio: 1,
        width: 104,
        x: 0,
        y: 0,
        height: 104
      }
    },
    options
  };

  afterEach(() => {
    layerMaplist = {};
  });

  it('add od layer', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url, _, nextOptions) => {
      expect(nextOptions.withCredentials).toBe(options.withCredentials);
      expect(nextOptions.withoutFormatSuffix).toBeTruthy();
      if (url.indexOf('/sprite') > -1) {
        return Promise.resolve(new Response(msSpriteInfo));
      }
      if (url.indexOf('/web/datas/1554834293/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/1554834293/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/1554834293/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054));
      }
      return Promise.resolve();
    });
    const layers = [
      {
        layout: {
          'line-curve-shape': 'greatcircle',
          visibility: 'visible',
          'line-curve-segment': 30
        },
        metadata: {
          MapStudio: {
            title: '国内航班数据_100'
          }
        },
        maxzoom: 24,
        paint: {
          'line-curve-color': '#ff6b34',
          'line-curve-dasharray': [1, 0],
          'line-curve-opacity': 1,
          'line-curve-width': 1,
          'line-curve-pattern-opacity': 1
        },
        source: 'ms_1554834293_1716875846578_8',
        'source-layer': '1554834293$msgeometry',
        id: '国内航班数据_100',
        type: 'line-curve',
        minzoom: 0
      },
      {
        layout: {
          'line-curve-shape': 'greatcircle',
          'line-curve-animate-duration': 4,
          visibility: 'visible',
          'line-curve-segment': 30,
          'line-curve-animate-trailLength': 0.2,
          'line-curve-animate-interval': 0.4,
          'line-curve-pattern-rotate': 0,
          'line-curve-pattern-blend': 'replace',
          'line-curve-pattern-interval': 20
        },
        metadata: {
          MapStudio: {
            title: '国内航班数据_100'
          }
        },
        maxzoom: 24,
        paint: {
          'line-curve-pattern-color': 'rgba(126,211,33,1)',
          'line-curve-color': '#ff6b34',
          'line-curve-pattern': 'shape7',
          'line-curve-opacity': 1,
          'line-curve-width': 10,
          'line-curve-pattern-opacity': 1
        },
        source: 'ms_1554834293_1716875846578_8',
        'source-layer': '1554834293$msgeometry',
        id: 'ms_composite_国内航班数据_100',
        type: 'line-curve',
        minzoom: 0
      }
    ];
    const sources = {
      ms_1554834293_1716875846578_8: {
        data: {
          dataId: '1554834293',
          type: 'supermap-structured-data'
        },
        od: true,
        originX: '起飞机场x',
        originY: '起飞机场y',
        destinationX: '到达城市x',
        destinationY: '到达城市y',
        type: 'geojson'
      }
    };
    const nextOptions = {
      ...addOptions,
      webMapInfo: { ...mapstudioWebMap_L7LayersRes, layers, sources },
      l7Layers: layers
    };
    const spy = spyOn(nextOptions.map, 'addLayer').and.callThrough();
    l7LayerUtil.addL7Layers(nextOptions).then(() => {
      expect(nextOptions.map.addLayer.calls.count()).toEqual(2);
      expect(layerMaplist['国内航班数据_100']).toBeTruthy();
      expect(layerMaplist['ms_composite_国内航班数据_100']).toBeTruthy();
      spy.calls.reset();
      done();
    });
  });

  it('animate line layer', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url, _, options) => {
      expect(options.withCredentials).toBeUndefined();
      expect(options.withoutFormatSuffix).toBeTruthy();
      if (url.indexOf('/data-Building/rest/data/datasources/newBuilding/datasets/New_LINE/fields.json') > -1) {
        return Promise.resolve(new Response(RESTDATA_FIELDS_RES));
      }
      if (url.indexOf('/data-Building/rest/data/datasources/newBuilding/datasets/New_LINE/domain.json') > -1) {
        return Promise.resolve(new Response(RESTDATA_DOMAINS_RES));
      }
      return Promise.resolve();
    });
    spyOn(FetchRequest, 'post').and.callFake((url, _, options) => {
      expect(options.withCredentials).toBeUndefined();
      expect(options.withoutFormatSuffix).toBeTruthy();
      if (url.indexOf('/data-Building/rest/data/featureResults.geojson') > -1) {
        return Promise.resolve(new Response(RESTDATA_FEATURES_RES));
      }
      return Promise.resolve();
    });
    const layers = [
      {
        layout: {
          visibility: 'visible',
          'line-extrusion-pattern-interval': 20,
          'line-extrusion-animate-duration': 6,
          'line-extrusion-pattern-blend': 'normal',
          'line-extrusion-animate-trailLength': 1.5,
          'line-extrusion-animate-interval': 0.6
        },
        metadata: {
          MapStudio: {
            title: 'New_LINE'
          }
        },
        paint: {
          'line-extrusion-base': 0,
          'line-extrusion-opacity': 1,
          'line-extrusion-width': 12,
          'line-extrusion-base-fixed': false,
          'line-extrusion-color': '#4CC8A3',
          'line-extrusion-dasharray': [1, 1]
        },
        source: 'ms_New_LINE_ms_datasetId_1716864444834_6_1716864449917_10',
        id: 'ms_New_LINE_1716864449916_8',
        type: 'line-extrusion'
      },
      {
        layout: {
          visibility: 'visible',
          'line-extrusion-pattern-interval': 20,
          'line-extrusion-animate-duration': 6,
          'line-extrusion-pattern-blend': 'normal',
          'line-extrusion-animate-trailLength': 1.5,
          'line-extrusion-animate-interval': 0.6
        },
        metadata: {
          MapStudio: {
            title: 'New_LINE'
          }
        },
        paint: {
          'line-extrusion-base': 0,
          'line-extrusion-opacity': 1,
          'line-extrusion-width': 12,
          'line-extrusion-base-fixed': false,
          'line-extrusion-color': '#4CC8A3'
        },
        source: 'ms_New_LINE_ms_datasetId_1716864444834_6_1716864449917_10',
        id: 'ms_New_LINE_1716864449916_8-highlight',
        type: 'line-extrusion'
      }
    ];
    const sources = {
      ms_New_LINE_ms_datasetId_1716864444834_6_1716864449917_10: {
        data: {
          credential: {
            name: 'token',
            value: 'kF0ZmjLFg-P56UQdHVIkl1tDDnUTsuy5ayBcAHrmdmM6BmLMLHNvk7aul83z2twM8m5rtD3ExQguW0jlThhWkEoWr27Dzw..'
          },
          datasetName: 'New_LINE',
          type: 'supermap-rest-data',
          url: 'http://localhost:8090/iserver/services/data-Building/rest/data/featureResults.geojson?returnContent=true&fromIndex=0&maxFeatures=2147483647',
          dataSourceName: 'newBuilding'
        },
        type: 'geojson'
      }
    };
    const nextOptions = {
      ...addOptions,
      webMapInfo: { ...mapstudioWebMap_L7LayersRes, layers, sources },
      l7Layers: layers
    };
    const spy = spyOn(nextOptions.map, 'addLayer').and.callThrough();
    l7LayerUtil.addL7Layers(nextOptions).then(() => {
      expect(nextOptions.map.addLayer.calls.count()).toEqual(1);
      spy.calls.reset();
      done();
    });
  });

  it('add layer one error, one success', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url, _, options) => {
      expect(options.withCredentials).toBeUndefined();
      expect(options.withoutFormatSuffix).toBeTruthy();
      if (url.indexOf('/data-Building/rest/data/datasources/newBuilding/datasets/New_LINE/fields.json') > -1) {
        return Promise.resolve(new Response(RESTDATA_FIELDS_RES));
      }
      if (url.indexOf('/data-Building/rest/data/datasources/newBuilding/datasets/New_LINE/domain.json') > -1) {
        return Promise.resolve(new Response(RESTDATA_DOMAINS_RES));
      }
      return Promise.resolve();
    });
    spyOn(FetchRequest, 'post').and.callFake((url, _, options) => {
      expect(options.withCredentials).toBeUndefined();
      expect(options.withoutFormatSuffix).toBeTruthy();
      if (url.indexOf('/data-Building/rest/data/featureResults.geojson') > -1) {
        return Promise.reject('error test');
      }
      return Promise.resolve();
    });
    const layers = [
      {
        layout: {
          visibility: 'visible',
          'line-extrusion-pattern-interval': 20,
          'line-extrusion-animate-duration': 6,
          'line-extrusion-pattern-blend': 'normal',
          'line-extrusion-animate-trailLength': 1.5,
          'line-extrusion-animate-interval': 0.6
        },
        metadata: {
          MapStudio: {
            title: 'New_LINE'
          }
        },
        paint: {
          'line-extrusion-base': 0,
          'line-extrusion-opacity': 1,
          'line-extrusion-width': 12,
          'line-extrusion-base-fixed': false,
          'line-extrusion-color': '#4CC8A3',
          'line-extrusion-dasharray': [1, 1]
        },
        source: 'ms_New_LINE_ms_datasetId_1716864444834_6_1716864449917_10',
        id: 'ms_New_LINE_1716864449916_8',
        type: 'line-extrusion'
      },
      {
        filter: ['all', ['==', 'smpid', 1]],
        layout: {
          'text-z-offset': 200000,
          'text-letter-spacing': 0,
          visibility: 'visible',
          'text-field': '{smpid}',
          'text-anchor': 'center',
          'text-size': 36,
          'text-allow-overlap': true
        },
        metadata: {
          MapStudio: {
            title: 'ms_label_县级行政区划_1719818803020_5'
          }
        },
        maxzoom: 24,
        paint: {
          'text-halo-color': '#242424',
          'text-halo-blur': 2,
          'text-color': '#FFFFFF',
          'text-halo-width': 1,
          'text-opacity': 0.9,
          'text-translate': [0, 0]
        },
        source: 'ms_label_县级行政区划_1719818803020_5_source',
        'source-layer': '932916417$geometry',
        id: 'ms_label_县级行政区划_1719818803020_5',
        type: 'symbol',
        minzoom: 0
      }
    ];
    const sources = {
      ms_New_LINE_ms_datasetId_1716864444834_6_1716864449917_10: {
        data: {
          credential: {
            name: 'token',
            value: 'kF0ZmjLFg-P56UQdHVIkl1tDDnUTsuy5ayBcAHrmdmM6BmLMLHNvk7aul83z2twM8m5rtD3ExQguW0jlThhWkEoWr27Dzw..'
          },
          datasetName: 'New_LINE',
          type: 'supermap-rest-data',
          url: 'http://localhost:8090/iserver/services/data-Building/rest/data/featureResults.geojson?returnContent=true&fromIndex=0&maxFeatures=2147483647',
          dataSourceName: 'newBuilding'
        },
        type: 'geojson'
      },
      ms_label_县级行政区划_1719818803020_5_source: {
        tiles: [
          'http://localhost:8190/iportal/services/../web/datas/932916417/structureddata/pointonsurface/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22pac%22%2C%22Video%22%2C%22SmUserID%22%2C%22name%22%2C%22Image%22%2C%22objectid%22%2C%22URL%22%5D&geometryFieldName=geometry'
        ],
        bounds: [102.98962307000005, 30.090978575000065, 104.89626180000005, 31.437765225000078],
        type: 'vector'
      }
    };
    const nextOptions = {
      ...addOptions,
      webMapInfo: { ...mapstudioWebMap_L7LayersRes, layers, sources },
      l7Layers: layers
    };
    const spy1 = spyOn(nextOptions.map, 'addLayer').and.callThrough();
    const spy2 = spyOn(nextOptions.options, 'emitterEvent');
    l7LayerUtil.addL7Layers(nextOptions).then(() => {
      expect(nextOptions.map.addLayer.calls.count()).toEqual(1);
      expect(nextOptions.options.emitterEvent).toHaveBeenCalledTimes(1);
      expect(layerMaplist['ms_New_LINE_1716864449916_8']).toBeUndefined();
      expect(layerMaplist['ms_label_县级行政区划_1719818803020_5']).toBeTruthy();
      expect(layerMaplist['ms_label_县级行政区划_1719818803020_5'].getLayer().featureId).toBe('smpid');
      spy1.calls.reset();
      spy2.calls.reset();
      done();
    });
  });

  it('servcie proxy', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url, _, options) => {
      expect(options.withCredentials).toBeTruthy();
      expect(options.withoutFormatSuffix).toBeTruthy();
      if (url.indexOf('/data-ZhongGuoDiTu/rest/data/datasources/中国矢量数据/datasets/飞机场/fields.json') > -1) {
        return Promise.resolve(new Response(RESTDATA_FIELDS_RES));
      }
      if (url.indexOf('/data-ZhongGuoDiTu/rest/data/datasources/中国矢量数据/datasets/飞机场/domain.json') > -1) {
        return Promise.resolve(new Response(JSON.stringify([])));
      }
      return Promise.resolve();
    });
    spyOn(FetchRequest, 'post').and.callFake((url) => {
      if (url.indexOf('/data-ZhongGuoDiTu/rest/data/featureResults.geojson') > -1) {
        return Promise.resolve(new Response(RESTDATA_FEATURES_RES));
      }
      return Promise.resolve();
    });
    const layers = [
      {
        layout: {
          visibility: 'visible'
        },
        metadata: {
          MapStudio: {
            title: '飞机场'
          }
        },
        paint: {
          'heatmap-extrusion-intensity': 2,
          'heatmap-extrusion-radius': 10,
          'heatmap-extrusion-opacity': 1,
          'heatmap-extrusion-weight': 'SmID',
          'heatmap-extrusion-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(0,0,0,0)',
            0.2,
            '#0000ff',
            0.4,
            '#00ffff',
            0.6000000000000001,
            '#00ff00',
            0.8,
            '#ffff00',
            1,
            '#ff0000'
          ]
        },
        source: 'ms_飞机场_ms_datasetId_1716979413748_4_1716979443420_8',
        id: 'ms_飞机场_1716979443420_7',
        type: 'heatmap-extrusion'
      },
      {
        filter: ['all', ['==', '$type', 'Polygon']],
        layout: {
          visibility: 'visible',
          'line-extrusion-pattern-interval': 20,
          'line-extrusion-animate-duration': 6,
          'line-extrusion-pattern-blend': 'normal',
          'line-extrusion-animate-trailLength': 1.5,
          'line-extrusion-animate-interval': 0.6
        },
        metadata: {
          MapStudio: {
            title: '县级行政区划@link'
          }
        },
        maxzoom: 24,
        paint: {
          'line-extrusion-base': 0,
          'line-extrusion-opacity': 1,
          'line-extrusion-width': 20,
          'line-extrusion-base-fixed': false,
          'line-extrusion-color': '#4CC8A3',
          'line-extrusion-pattern': 'ms_icon_shape1'
        },
        source: 'ms_县级行政区划@link_1719822607738_6',
        'source-layer': '县级行政区划@link',
        id: '县级行政区划@link_outline(0_24)',
        type: 'line-extrusion',
        minzoom: 0
      }
    ];
    const sources = {
      ms_飞机场_ms_datasetId_1716979413748_4_1716979443420_8: {
        data: {
          datasetName: '飞机场',
          type: 'supermap-rest-data',
          url: 'http://localhost:8195/portalproxy/761c40c7268f75a5/iserver/services/data-ZhongGuoDiTu/rest/data/featureResults.geojson?returnContent=true&fromIndex=0&maxFeatures=2147483647',
          dataSourceName: '中国矢量数据'
        },
        type: 'geojson'
      },
      'ms_县级行政区划@link_1719822607738_6': {
        tiles: [
          'http://localhost:8195/portalproxy/592c4095f464540e/iserver/services/map-LinkMap/restjsr/v1/vectortile/maps/%E5%8E%BF%E7%BA%A7%E8%A1%8C%E6%94%BF%E5%8C%BA%E5%88%92%40link/tiles/{z}/{x}/{y}.mvt'
        ],
        bounds: [102.98962307000005, 30.090978575000065, 104.89626180000005, 31.437765225000078],
        type: 'vector',
        promoteId: 'SmID'
      }
    };
    const nextOptions = {
      ...addOptions,
      webMapInfo: { ...mapstudioWebMap_L7LayersRes, layers, sources },
      l7Layers: layers,
      options: {
        withCredentials: false,
        server: '/iportal/',
        iportalServiceProxyUrl: 'http://localhost:8195/portalproxy'
      }
    };
    const spy = spyOn(nextOptions.map, 'addLayer').and.callThrough();
    l7LayerUtil.addL7Layers(nextOptions).then(() => {
      expect(nextOptions.map.addLayer.calls.count()).toEqual(2);
      expect(layerMaplist['县级行政区划@link_outline(0_24)'].getLayer().featureId).toBe('SmID');
      spy.calls.reset();
      done();
    });
  });

  it('filter reRender', (done) => {
    spyOn(FetchRequest, 'post').and.callFake((url) => {
      if (url.indexOf('/data-ZhongGuoDiTu/rest/data/featureResults.geojson') > -1) {
        return Promise.resolve(new Response(RESTDATA_FEATURES_RES));
      }
      return Promise.resolve();
    });
    const layers = [
      {
        filter: ['all', ['==', '$type', 'Polygon']],
        layout: {
          visibility: 'visible',
          'line-extrusion-pattern-interval': 20,
          'line-extrusion-animate-duration': 6,
          'line-extrusion-pattern-blend': 'normal',
          'line-extrusion-animate-trailLength': 1.5,
          'line-extrusion-animate-interval': 0.6
        },
        metadata: {
          MapStudio: {
            title: '县级行政区划@link'
          }
        },
        maxzoom: 24,
        paint: {
          'line-extrusion-base': 0,
          'line-extrusion-opacity': 1,
          'line-extrusion-width': 20,
          'line-extrusion-base-fixed': false,
          'line-extrusion-color': '#4CC8A3',
          'line-extrusion-pattern': 'ms_icon_shape1'
        },
        source: 'ms_县级行政区划@link_1719822607738_6',
        'source-layer': '县级行政区划@link',
        id: '县级行政区划@link_outline(0_24)',
        type: 'line-extrusion',
        minzoom: 0
      }
    ];
    const sources = {
      'ms_县级行政区划@link_1719822607738_6': {
        tiles: [
          'http://localhost:8195/portalproxy/592c4095f464540e/iserver/services/map-LinkMap/restjsr/v1/vectortile/maps/%E5%8E%BF%E7%BA%A7%E8%A1%8C%E6%94%BF%E5%8C%BA%E5%88%92%40link/tiles/{z}/{x}/{y}.mvt'
        ],
        bounds: [102.98962307000005, 30.090978575000065, 104.89626180000005, 31.437765225000078],
        type: 'vector',
        promoteId: 'spmid'
      }
    };
    const nextOptions = {
      ...addOptions,
      webMapInfo: { ...mapstudioWebMap_L7LayersRes, layers, sources },
      l7Layers: layers
    };
    const spy = spyOn(nextOptions.map, 'addLayer').and.callThrough();
    const spy1 = spyOn(L7, 'LineLayer').and.callFake(mockL7.PointLayer);
    l7LayerUtil.addL7Layers(nextOptions).then(() => {
      const iclientL7Layer = layerMaplist['县级行政区划@link_outline(0_24)'];
      const spy2 = spyOn(iclientL7Layer, 'reRender').and.callThrough();
      setTimeout(() => {
        expect(nextOptions.map.addLayer.calls.count()).toEqual(1);
        expect(iclientL7Layer.reRender.calls.count()).toEqual(1);
        spy.calls.reset();
        spy1.calls.reset();
        spy2.calls.reset();
        done();
      }, 1100);
    });
  });

  it('filter expression', () => {
    const expr = ['any', ['all', ['==', ['get', 'smpid'], 5], ['==', ['get', '新建字段'], '']]];
    const result = getL7Filter(expr, featureFilter);
    expect(result.field).toEqual(['smpid', '新建字段']);
    expect(result.values).not.toBeUndefined();
  });
});
