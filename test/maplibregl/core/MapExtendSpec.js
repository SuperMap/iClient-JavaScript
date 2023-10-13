import '../../../src/maplibregl/core/MapExtend';
import maplibregl from 'maplibre-gl';

describe('MapExtend', () => {
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

  it('getL7Scene init', async () => {
    map.addLayer({ l7layer: {} });
    expect(maplibregl.Map.prototype.$l7scene).not.toBeNull();
    const scene = await map.getL7Scene();
    expect(scene).not.toBeNull();
  });
  it('getL7Scene', async () => {
    const scene = await map.getL7Scene();
    expect(scene).not.toBeNull();
  });
});
