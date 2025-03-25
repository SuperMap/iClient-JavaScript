import maplibregl from 'maplibre-gl';
import mbglmap from '../../tool/mock_mapboxgl_map';
import '../../../src/maplibregl/core/MapExtend';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { CustomOverlayLayer } from '../../../src/common/overlay/Base';

describe('maplibregl MapExtend', () => {
  var url = 'http://supermapiserver:8090/iserver/services/map-china400/rest/maps/China';
  var testDiv, map;
  beforeAll(() => {
    testDiv = document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    document.body.appendChild(testDiv);
    map = new maplibregl.Map({
      container: 'map',
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: [url + '/zxyTileImage.png?z={z}&x={x}&y={y}'],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 0,
            maxzoom: 22
          }
        ]
      },
      center: [116.4, 39.79],
      zoom: 3
    });
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.includes('map-China107')) {
        return Promise.resolve(
          new Response(
            JSON.stringify([
              {
                componentType: 'com.supermap.services.components.impl.MapImpl',
                interfaceType: 'com.supermap.services.rest.RestServlet',
                additions: [
                  'China',
                  'China_4326',
                  'ChinaDark',
                  'China_4490',
                  'China_4610',
                  'China_4214',
                  'China1',
                  'China_Capital_pt@China',
                  'A'
                ],
                name: 'map-China107/rest',
                alias: 'map-China107',
                serviceEncryptInfo: {
                  encrptSpec: {
                    keyLength: 256,
                    attributes: 'abcd',
                    version: '1.1',
                    algorithm: 'AES'
                  },
                  updateTime: 'Tue Mar 19 09:34:18 CST 2024',
                  encrptKeyID: 'keyIDNAME'
                },
                url: 'http://fake:8090/iserver/services/map-China107/rest',
                status: 'OK'
              },
              {
                componentType: 'com.supermap.services.components.impl.MapImpl',
                interfaceType: 'com.supermap.services.rest.JaxrsServletForJersey',
                additions: [
                  'China',
                  'China_4326',
                  'ChinaDark',
                  'China_4490',
                  'China_4610',
                  'China_4214',
                  'China1',
                  'China_Capital_pt@China',
                  'A'
                ],
                name: 'map-China107/restjsr',
                alias: 'map-China107',
                serviceEncryptInfo: {
                  encrptSpec: {
                    keyLength: 256,
                    attributes: 'abcd',
                    version: '1.1',
                    algorithm: 'AES'
                  },
                  updateTime: 'Tue Mar 19 09:34:18 CST 2024',
                  encrptKeyID: 'keyIDNAME'
                },
                url: 'http://fake:8090/iserver/services/map-China107/restjsr',
                status: 'OK'
              }
            ])
          )
        );
      }
    });
  });

  afterEach(() => {
    map.overlayLayersManager = {};
  })

  afterAll(() => {
    window.document.body.removeChild(testDiv);
    map && map.remove();
  });

  it('listLayers', (done) => {
    map.style._order = ['raster', 'fill-1', 'circle-1', 'l7_layer_1'];
    const mockLayer = { recalculate: () => {}, isHidden: () => true, setEventedParent: () => {}, is3D: () => false,hasOffscreenPass:()=>false,hasTransition:()=>false };
    map.style._layers = { raster: mockLayer, 'fill-1': mockLayer, 'circle-1': mockLayer, l7_layer_1: mockLayer };
    map.overlayLayersManager = { l7_layer_1: { id: 'l7_layer_1' }, heatmap_1: { id: 'heatmap_1' } };
    const layers = map.listLayers();
    expect(layers).toEqual(['raster', 'fill-1', 'circle-1', 'l7_layer_1', 'heatmap_1']);
    done();
  });
  
  it('overlayLayersManager', (done) => {
    const originRemoveLayer = maplibregl.Map.prototype.removeLayer;
    spyOn(maplibregl, 'Map').and.callFake(mbglmap);
  
   
    const testDiv2 = window.document.createElement('div');
    testDiv2.setAttribute('id', 'map2');
    window.document.body.appendChild(testDiv2);
    const map2 = new maplibregl.Map({
      container: 'map2',
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: ['base/resources/img/baiduTileTest.png'],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 0,
            maxzoom: 22
          }
        ]
      },
      center: [116.4, 39.79],
      zoom: 3
    });
    expect(map2.overlayLayersManager).toEqual({});
    var map1 = new maplibregl.Map({
      container: 'map',
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: ['base/resources/img/baiduTileTest.png'],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 0,
            maxzoom: 22
          }
        ]
      },
      center: [116.4, 39.79],
      zoom: 3
    });
    map1.on('load', () => {
      expect(map1.overlayLayersManager).toEqual({});
      map1.style.removeLayer = () => {};
      map1.overlayLayersManager = { l7_layer_1: { id: 'l7_layer_1', type: 'custom' }, heatmap_1: { id: 'heatmap_1', removeFromMap: function() {} } };
      spyOn(map1.overlayLayersManager.heatmap_1, 'removeFromMap').and.callThrough();
      spyOn(map1.style, 'removeLayer').and.callThrough();
      const removeFromMap = map1.overlayLayersManager.heatmap_1.removeFromMap;
      map1.removeLayer = originRemoveLayer;
      map1.removeLayer('heatmap_1')
      expect(removeFromMap.calls.count()).toEqual(1);
      map1.removeLayer('l7_layer_1');
      expect(map1.style.removeLayer.calls.count()).toEqual(1);
      map2.remove();
      document.body.removeChild(testDiv2);
      done();
    })
  });

  it('load layers', (done) => {
    const map = new maplibregl.Map({
      container: 'map',
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: ['base/resources/img/baiduTileTest.png'],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 0,
            maxzoom: 22
          }
        ]
      },
      center: [116.4, 39.79],
      zoom: 3
    });
    map.on('load', () => {
      spyOn(map, 'addLayer').and.callThrough();
      const options = {
        getSource: function () {
          return {};
        },
        removeSource: function() {},
        isSourceLoaded: function() { return true; },
        getLayer: function () {
          return {};
        },
        getPaintProperty: function () {},
        setLayoutProperty: function () {},
        getLayoutProperty: function () {},
        getFilter: function () {},
        setFilter: function () {},
        queryRenderedFeatures: function () {},
        querySourceFeatures: function () {},
        once: function () {},
        on: function () {},
        off: function () {}
      };
      
      class L7LayerTest extends CustomOverlayLayer {
        constructor() {
          super({ sourceId: 'l7_layer_1', query: true, interaction: true, events: ['click'] });
          this.id = 'l7_layer_1';
          this.sourceId = 'l7_layer_1';
        }

        getSource() {
          return {};
        }

        getLayer() {
          return {}
        }
      }
      const l7_layer_1 = new L7LayerTest();
      for (const key in options) {
        spyOn(l7_layer_1, key).and.callThrough();
      }
      map.overlayLayersManager = {
        l7_layer_1,
        heatmap_1: { id: 'heatmap_1' }
      };
      expect(map.getSource('l7_layer_1')).not.toBeUndefined();
      expect(map.getSource('raster-tiles')).not.toBeUndefined();
      expect(l7_layer_1.getSource.calls.count()).toEqual(1);
      expect(map.isSourceLoaded('l7_layer_1')).toBeTruthy();
      expect(map.isSourceLoaded('raster-tiles')).toBeTruthy();
      expect(map.getLayer('l7_layer_1')).not.toBeUndefined();
      expect(map.getLayer('simple-tiles')).not.toBeUndefined();
      expect(map.getLayer('heatmap_1')).toEqual(map.overlayLayersManager['heatmap_1']);
      expect(l7_layer_1.getLayer.calls.count()).toEqual(1);
      const layerToAdd = { type: 'custom', id: 'add1', onAdd() {}, onRemove() {}, render() {} };
      map.addLayer(layerToAdd);
      expect(map.addLayer.calls.count()).toEqual(1);
      map.queryRenderedFeatures([0, 0], { layers: ['l7_layer_1', 'simple-tiles'] });
      expect(l7_layer_1.queryRenderedFeatures.calls.count()).toEqual(1);
      map.querySourceFeatures('l7_layer_1');
      map.querySourceFeatures('raster-tiles');
      expect(l7_layer_1.querySourceFeatures.calls.count()).toEqual(1);
      const cb = () => {};
      map.on('click', 'l7_layer_1', cb);
      map.on('click',cb);
      expect(l7_layer_1.on.calls.count()).toEqual(1);
      map.once('click', 'l7_layer_1', cb);
      map.once('click', cb);
      expect(l7_layer_1.once.calls.count()).toEqual(1);
      map.off('click', 'l7_layer_1', cb);
      map.off('click', cb);
      expect(l7_layer_1.off.calls.count()).toEqual(1);
      map.removeSource('l7_layer_1');
      map.removeLayer('simple-tiles');
      map.removeSource('raster-tiles');
      expect(l7_layer_1.removeSource.calls.count()).toEqual(1);
      map.remove();
      done();
    });
  });
});
