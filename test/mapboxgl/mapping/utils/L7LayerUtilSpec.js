import { addL7Layers, isL7Layer } from '../../../../src/mapboxgl/mapping/utils/L7LayerUtil';
import * as mockL7 from '../../../tool/mock_l7';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';

describe('L7LayerUtil', () => {
  const mapstudioWebMap_L7LayersRes = JSON.parse(mapstudioWebMap_L7Layers);

  const scene = new mockL7.Scene();
  const map = {
    getL7Scene: () => Promise.resolve(scene),
    addLayer: () => {},
    getZoom: () => 3
  };

  const options = {
    withCredentials: true,
    server: 'http://localhost:8190/iportal/'
  };

  const addOptions = {
    map,
    webMapInfo: { ...mapstudioWebMap_L7LayersRes },
    l7Layers: mapstudioWebMap_L7LayersRes.layers.filter((layer) => isL7Layer(layer)),
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

  beforeAll(() => {
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
      if (url.indexOf('/web/datas/1554834293/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/1554834293/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054Items));
      }
      if (url.indexOf('/web/datas/1554834293/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1052943054));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata/ogc-features/collections/all/items.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124Items));
      }
      if (url.indexOf('/web/datas/1767084124/structureddata.json') > -1) {
        return Promise.resolve(new Response(l7StructureData1767084124));
      }
      if (
        url.indexOf('iserver/services/data-Building/rest/data/datasources/newBuilding/datasets/New_LINE/fields.json') >
        -1
      ) {
        return Promise.resolve(new Response(RESTDATA_FIELDS_RES));
      }
      if (
        url.indexOf('iserver/services/data-Building/rest/data/datasources/newBuilding/datasets/New_LINE/domain.json') >
        -1
      ) {
        return Promise.resolve(new Response(RESTDATA_DOMAINS_RES));
      }
      console.log(url);
      return Promise.resolve();
    });
    spyOn(FetchRequest, 'post').and.callFake((url) => {
      if (url.indexOf('/iserver/services/data-Building/rest/data/featureResults.geojson') > -1) {
        return Promise.resolve(new Response(RESTDATA_FEATURES_RES));
      }
      console.log(url);
      return Promise.resolve();
    });
  });

  it('add od layer', (done) => {
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
    addL7Layers(nextOptions).then(() => {
      expect(nextOptions.map.addLayer.calls.count()).toEqual(2);
      spy.calls.reset();
      done();
    });
  });

  it('animate line layer', (done) => {
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
          'line-extrusion-color': '#4CC8A3'
        },
        source: 'ms_New_LINE_ms_datasetId_1716864444834_6_1716864449917_10',
        'source-layer': 'New_LINE@newBuilding',
        id: 'ms_New_LINE_1716864449916_8',
        type: 'line-extrusion'
      }
    ];
    const sources = {
      ms_New_LINE_ms_datasetId_1716864444834_6_1716864449917_10: {
        data: {
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
    addL7Layers(nextOptions).then(() => {
      expect(nextOptions.map.addLayer.calls.count()).toEqual(1);
      spy.calls.reset();
      done();
    });
  });
});
