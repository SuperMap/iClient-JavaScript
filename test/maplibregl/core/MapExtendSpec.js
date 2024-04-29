import maplibregl from 'maplibre-gl';
import '../../../src/maplibregl/core/MapExtend';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

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
  afterAll(() => {
    window.document.body.removeChild(testDiv);
    map && map.remove();
  });

  it('listLayers', (done) => {
    map.style._order = ['raster', 'fill-1', 'circle-1', 'l7_layer_1'];
    const mockLayer = { recalculate: () => {}, isHidden: () => true, setEventedParent: () => {}, is3D: () => false };
    map.style._layers = { raster: mockLayer, 'fill-1': mockLayer, 'circle-1': mockLayer, l7_layer_1: mockLayer };
    map.overlayLayersManager = { l7_layer_1: { id: 'l7_layer_1' }, heatmap_1: { id: 'heatmap_1' } };
    const layers = map.listLayers();
    expect(layers).toEqual(['raster', 'fill-1', 'circle-1', 'l7_layer_1', 'heatmap_1']);
    done();
  });
});
