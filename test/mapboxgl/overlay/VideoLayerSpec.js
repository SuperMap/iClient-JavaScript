import { VideoLayer } from '../../../src/mapboxgl/overlay/VideoLayer';
import mapboxgl from 'mapbox-gl';
import mbglmap from '../../tool/mock_mapboxgl_map';
var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';
var videoUrl = 'base/resources/data/index.m3u8';
describe('mapboxgl_VideoLayer', () => {
  var originalTimeout;
  var testDiv, map;
  var cv;
  beforeAll((done) => {
    cv = {
      then(cb) {
        setTimeout(function () {
          cb();
        }, 200);
      },
      CV_64FC1: 'CV_64FC1',
      CV_32FC2: 'CV_32FC2',
      matFromImageData: function () {
        return {
          delete: function () {

          },
          copyTo: function () {

          }
        }
      },
      Size: function () {
        return {
          width: 770,
          height: 690
        }
      },
      matFromArray: function () {
        return {
          copyTo: function () {

          },
          inv: function () { },
          delete: function () { },
          data64F: [200, 100],
          cols: 2,
          rows: 2,
          data: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
        }
      },
      Mat: function () {
        return {
          copyTo: function () {

          },
          inv: function () { },
          delete: function () { },
          data64F: [200, 100],
          cols: 2,
          rows: 2,
          data: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
        }
      },
      findHomography: function () {
        return {
          delete: function () { }
        }
      },
      warpPerspective: function () {

      },
      gemm: function () { },
      Rodrigues: function () { },
      projectPoints: function () { },
      multiply: function () { },
      subtract: function () { }
    };
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
    spyOn(mapboxgl, 'Map').and.callFake(mbglmap);
    map = new mapboxgl.Map({
      container: 'map',
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: [url],
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
      center: [0, 0],
      zoom: 3
    });
    map.on('load', function () {
      done();
    });
  });
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  afterAll(() => {
    document.body.removeChild(testDiv);
    map = null;
  });

  it('init videoLayer', (done) => {
    var url = videoUrl;
    spyOn(cv, 'Size');
    spyOn(cv, 'warpPerspective');
    var videoLayer = new VideoLayer({
      url: url,
      opencv: cv,
      clipRegion: [
        [0, 0],
        [1920, 0],
        [1920, 900],
        [0, 900]
      ],
      videoParameters: {
        fovX: 84,
        fovY: 47,
        centerX: 960,
        centerY: 540,
        pitch: -20,
        roll: 0,
        yaw: 2,
        x: 11587478.810629973,
        y: 3570800.195541344,
        z: 154.50312
      },
      extent: [
        [116.14394400766855, 28.249134537249257],
        [116.143464581289, 28.252977295834056],
        [116.14734767029731, 28.251762901914655],
        [116.14737169684759, 28.25095489453961]
      ]
    });
    videoLayer.onAdd(map);
    setTimeout(() => {
      expect(cv.Size).toHaveBeenCalled();
      expect(cv.warpPerspective).toHaveBeenCalled();
      expect(videoLayer.url).toBe(url);
      expect(videoLayer.videoDomId).not.toBeNull();
      expect(videoLayer.video).not.toBeNull();
      expect(videoLayer.pixelBBox).not.toBeNull();
      done();
    }, 3000);
  });

  it('render moveLayer onRemove setVisibility', (done) => {
    var url = videoUrl;
    var videoLayer = new VideoLayer({
      url: url,
      opencv: cv,
      clipRegion: [
        [0, 0],
        [1920, 0],
        [1920, 900],
        [0, 900]
      ],
      videoParameters: {
        fovX: 84,
        fovY: 47,
        centerX: 960,
        centerY: 540,
        pitch: -20,
        roll: 0,
        yaw: 2,
        x: 11587478.810629973,
        y: 3570800.195541344,
        z: 154.50312
      },
      extent: [
        [116.14394400766855, 28.249134537249257],
        [116.143464581289, 28.252977295834056],
        [116.14734767029731, 28.251762901914655],
        [116.14737169684759, 28.25095489453961]
      ]
    });
    spyOn(map, 'moveLayer');
    spyOn(map, 'setLayoutProperty');
    videoLayer.onAdd(map);
    videoLayer.moveLayer(videoLayer.layerId, 'simple-tiles');
    videoLayer.setVisibility(false);
    setTimeout(() => {
      expect(map.moveLayer).toHaveBeenCalled();
      expect(map.setLayoutProperty).toHaveBeenCalled();
      expect(videoLayer).not.toBeNull();
      done();
    }, 3000);
  });
});
