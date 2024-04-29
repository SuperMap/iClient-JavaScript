import maplibregl from 'maplibre-gl';
import '../../../src/maplibregl/core/MapExtend';

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
  });
  afterAll(() => {
    window.document.body.removeChild(testDiv);
    map && map.remove();
  });

  it('listLayers', (done) => {
    map.style._order = ['raster', 'fill-1', 'circle-1', 'l7_layer_1'];
    map.overlayLayersManager = { l7_layer_1: { id: 'l7_layer_1' }, heatmap_1: { id: 'heatmap_1' } };
    const layers = map.listLayers();
    expect(layers).toEqual(['raster', 'fill-1', 'circle-1', 'l7_layer_1', 'heatmap_1']);
    done();
  });
});
