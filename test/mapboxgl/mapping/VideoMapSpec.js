import { VideoMap } from '../../../src/mapboxgl/mapping/VideoMap';
import mapboxgl from 'mapbox-gl';
import mbglmap from '../../tool/mock_mapboxgl_map';
var videoUrl = 'base/resources/data/index.m3u8';
describe('mapboxgl_videoMap', () => {
  var originalTimeout;
  var testDiv;
  var cv;
  beforeAll(() => {
    cv = {
      then(cb) {
        setTimeout(function () {
          cb();
        }, 200);
      },
      CV_32FC2: 'CV_32FC2',
      CV_64FC1: 'CV_64FC1',
      matFromImageData: function () {
        return {
          delete: function () { }
        };
      },
      Size: function () {
        return {
          width: 770,
          height: 690
        };
      },
      matFromArray: function () { },
      Mat: function () {
        return {
          inv: function () { },
          delete: function () { },
          data64F: [200, 100],
          cols: 2,
          rows: 2,
          data: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
        };
      },
      gemm: function () { },
      Rodrigues: function () { },
      projectPoints: function () { },
      multiply: function () { },
      subtract: function () { }
    };
  });
  afterEach(() => {
    document.body.removeChild(testDiv);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  beforeEach(() => {
    spyOn(mapboxgl, 'Map').and.callFake(mbglmap);
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });

  it('init videoMap', (done) => {
    var url = videoUrl;
    var videoMap = new VideoMap(url, {
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
    }, {
      opencv: cv,
    });
    videoMap.on('load', function () {
      expect(videoMap.coordTransfer).not.toBe(null);
      expect(videoMap.videoParameters).not.toBe(null);
      done();
    });
  });

  it('addlayer removelayer', (done) => {
    var url = videoUrl;
    var videoMap = new VideoMap(url, {
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
    }, {
      opencv: cv,
    });
    videoMap.on('load', function () {
      videoMap.addLayer({
        id: 'symbol1',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  SMID: '6',
                  SMUSERID: '0',
                  NAME: '时尚大厦',
                  CLASS: '写字楼',
                  X290: '290',
                  X300: '300'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [11588458.277327187, 3571913.832559694]
                },
                id: 6
              }
            ]
          }
        },
        layout: {
          'icon-image': 'ro-communal-3',
          'text-anchor': 'bottom',
          'text-field': '{NAME}',
          'icon-text-fit': 'both',
          'text-size': 12,
          'icon-text-fit-padding': [5, 10, 5, 10]
        },
        paint: {
          'text-color': 'black'
        }
      });
      expect(videoMap.layerCache['symbol1']).not.toBe(null);
      videoMap.removeLayer('symbol1');
      expect(videoMap.layerCache['symbol1']).toBeUndefined();
      done();
    });
  });

  it('addSource removeSource', (done) => {
    var url = videoUrl;
    var videoMap = new VideoMap(url, {
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
    }, {
      opencv: cv,
    });
    videoMap.on('load', function () {
      videoMap.addSource('test111', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                SMID: '6',
                SMUSERID: '0',
                NAME: '时尚大厦',
                CLASS: '写字楼',
                X290: '290',
                X300: '300'
              },
              geometry: {
                type: 'Point',
                coordinates: [11588458.277327187, 3571913.832559694]
              },
              id: 6
            }
          ]
        }
      });
      expect(videoMap.sourceCache['test111']).not.toBe(null);
      videoMap.removeSource('test111');
      expect(videoMap.sourceCache['test111']).toBeUndefined();
      done();
    });
  });
});
