import { VideoMap } from '../../../src/mapboxgl/mapping/VideoMap';
import { VideoPlayControl } from '../../../src/mapboxgl/control/VideoPlayControl';
import mapboxgl from 'mapbox-gl';
import mbglmap, { revertCRS } from '../../tool/mock_mapboxgl_map';

var videoUrl = 'base/resources/data/test.mp4';

describe('mapboxgl_VideoPlayControl with VideoMap', () => {
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
          delete: function () {}
        };
      },
      Size: function () {
        return {
          width: 770,
          height: 690
        };
      },
      matFromArray: function () {},
      Mat: function () {
        return {
          inv: function () {},
          delete: function () {},
          data64F: [200, 100],
          cols: 2,
          rows: 2,
          data: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
        };
      },
      gemm: function () {},
      Rodrigues: function () {},
      projectPoints: function () {},
      multiply: function () {},
      subtract: function () {}
    };
  });

  afterEach(() => {
    revertCRS();
    document.body.removeChild(testDiv);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    spyOn(mapboxgl, 'Map').and.callFake(mbglmap);
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });

  function createVideoMap() {
    return new VideoMap({
      url: videoUrl,
      opencv: cv,
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
      }
    });
  }

  it('onAdd renders circular play button', (done) => {
    var videoMap = createVideoMap();
    videoMap.on('load', function () {
      var control = new VideoPlayControl();
      spyOn(videoMap.map, 'addControl').and.callThrough();
      videoMap.addControl(control);
      expect(videoMap.map.addControl).toHaveBeenCalledWith(control, 'bottom-left');
      expect(control.target).toBe(videoMap);
      expect(control._container).not.toBeNull();
      expect(control._container.className).toContain('sm-mapboxgl-play-ctrl');
      expect(control.options.position).toBe('bottom-left');
      expect(control._button).toBeDefined();
      expect(control._button.className).toContain('sm-mapboxgl-play-btn');
      expect(control._button.querySelector('.sm-mapboxgl-play-svg--play')).not.toBeNull();
      expect(control._button.querySelector('.sm-mapboxgl-play-svg--pause')).not.toBeNull();
      done();
    });
  });

  it('bottom-right uses the native map control position', (done) => {
    var videoMap = createVideoMap();
    videoMap.on('load', function () {
      var control = new VideoPlayControl();
      spyOn(videoMap.map, 'addControl').and.callThrough();
      videoMap.addControl(control, 'bottom-right');
      expect(videoMap.map.addControl).toHaveBeenCalledWith(control, 'bottom-right');
      expect(control.options.position).toBe('bottom-left');
      done();
    });
  });

  it('does not replace an explicit target when added to VideoMap', (done) => {
    var videoMap = createVideoMap();
    var videoLayer = {
      on: function () {},
      off: function () {},
      paused: function () {
        return true;
      },
      play: function () {},
      pause: function () {}
    };
    videoMap.on('load', function () {
      var control = new VideoPlayControl({ target: videoLayer });
      videoMap.addControl(control);
      expect(control.target).toBe(videoLayer);
      done();
    });
  });

  it('click toggles play and pause', (done) => {
    var videoMap = createVideoMap();
    videoMap.on('load', function () {
      var control = new VideoPlayControl();
      videoMap.addControl(control, 'bottom-right');
      spyOn(videoMap, 'paused').and.returnValue(true);
      spyOn(videoMap, 'play');
      control._button.click();
      expect(videoMap.play).toHaveBeenCalled();
      videoMap.paused.and.returnValue(false);
      spyOn(videoMap, 'pause');
      control._button.click();
      expect(videoMap.pause).toHaveBeenCalled();
      done();
    });
  });

  it('play and pause events sync button state', (done) => {
    var videoMap = createVideoMap();
    videoMap.on('load', function () {
      var control = new VideoPlayControl();
      videoMap.addControl(control);
      spyOn(videoMap, 'paused').and.returnValue(false);
      videoMap.fire('play');
      expect(control._button.className).toContain('is-playing');
      expect(control._button.title).toBe('暂停');
      videoMap.paused.and.returnValue(true);
      videoMap.fire('pause');
      expect(control._button.className).toContain('is-paused');
      expect(control._button.title).toBe('播放');
      done();
    });
  });

  it('size option sets button diameter', () => {
    var control = new VideoPlayControl({ size: 48 });
    var container = control.onAdd({
      _smVideoMap: null
    });
    expect(control._button.style.width).toBe('48px');
    expect(control._button.style.height).toBe('48px');
    expect(control.getDefaultPosition()).toBe('bottom-left');
    expect(container.className).not.toContain('overlay');
    control.onRemove();
  });

  it('uses bottom-left as the native default position', () => {
    var control = new VideoPlayControl();
    expect(control.getDefaultPosition()).toBe('bottom-left');
  });

});
