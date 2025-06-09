import { VideoLayer } from '../../../src/mapboxgl/overlay/VideoLayer';
import mapboxgl from 'mapbox-gl';
import mbglmap from '../../tool/mock_mapboxgl_map';
var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';
var videoUrl = 'base/resources/data/test.mp4';
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
    done();
  });
  beforeEach((done) => {
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
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });

  afterEach(() => {
    map = null;
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

  it('should initialize with default values when options is empty', (done) => {
    const instance = new VideoLayer({ videoParameters: {
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
    }, opencv: cv });
    expect(instance.interval).toEqual(0.1);
    expect(instance.clipRegion).toEqual([]);
    done();
  });

  it('should use provided options values', (done) => {
    const options = {
      url: 'test.mp4',
      extent: [0,0,100,100],
      clipRegion: [[1,1],[2,2]],
      videoParameters: {},
      interval: 0.5,
      id: 'custom-id',
      opencv: cv,
    };
    const instance = new VideoLayer(options);
    expect(instance.url).toEqual('test.mp4');
    expect(instance.extent).toEqual([0,0,100,100]);
    expect(instance.clipRegion).toEqual([[1,1],[2,2]]);
    expect(instance.interval).toEqual(0.5);
    expect(instance.id).toEqual('custom-id');
    done();
  });

  it('should set default properties correctly', (done) => {
    const instance = new VideoLayer({ videoParameters: {}, opencv: cv });
    expect(instance.type).toEqual('custom');
    expect(instance.renderingMode).toEqual('3d');
    expect(instance.layerId).toEqual(`${instance.id}_outer`);
    done();
  });

  it('should add video layer correctly', function(done) {
    spyOn(map, 'addSource');
    spyOn(map, 'addLayer');
    const videoLayer = new VideoLayer({ 
      opencv: cv, 
      url: videoUrl, 
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
      ] });
    videoLayer.onAdd(map);
    setTimeout(() => {
      expect(map.addSource).toHaveBeenCalled();
      expect(map.addLayer).toHaveBeenCalled();
      done();
   }, 3000);
  });

  it('multi videoparameter load with time', (done) => {
    spyOn(map, 'addLayer');
    const videoLayer = new VideoLayer({ 
      opencv: cv, 
      url: videoUrl, 
      clipRegion: [
        [0, 0],
        [1920, 0],
        [1920, 900],
        [0, 900]
      ],
      videoParameters: [{
        extent: [
          [116.14394400766855, 28.249134537249257],
          [116.143464581289, 28.252977295834056],
          [116.14734767029731, 28.251762901914655],
          [116.14737169684759, 28.25095489453961]
        ],
        time: 0,
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
      },{
        extent: [
          [116.14394400766855, 28.249134537249257],
          [116.143464581289, 28.252977295834056],
          [116.14734767029731, 28.251762901914655],
          [116.14737169684759, 28.25095489453961]
        ],
        time: 0.1,
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
      },{
        extent: [
          [116.14394400766855, 28.249134537249257],
          [116.143464581289, 28.252977295834056],
          [116.14734767029731, 28.251762901914655],
          [116.14737169684759, 28.25095489453961]
        ],
        time: 0.2,
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
      },{
        extent: [
          [116.14394400766855, 28.249134537249257],
          [116.143464581289, 28.252977295834056],
          [116.14734767029731, 28.251762901914655],
          [116.14737169684759, 28.25095489453961]
        ],
        time: 0.3,
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
      }]});
    videoLayer.onAdd(map);
    setTimeout(() => {
      expect(Object.keys(videoLayer.timeParams).length).toBe(4);
      expect(map.addLayer).toHaveBeenCalled();
      done();
   }, 3000);
  });
});
