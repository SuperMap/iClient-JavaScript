import { VideoLayer } from '../../../src/mapboxgl/overlay/VideoLayer';

function createCv() {
  return {
    CV_32FC2: 'CV_32FC2',
    matFromArray: jasmine.createSpy('matFromArray').and.returnValue({}),
    matFromImageData: jasmine.createSpy('matFromImageData').and.returnValue({ delete: jasmine.createSpy('delete') }),
    Mat: function () {
      this.cols = 2;
      this.rows = 2;
      this.data = new Uint8ClampedArray(16);
      this.delete = jasmine.createSpy('delete');
    },
    findHomography: jasmine.createSpy('findHomography').and.returnValue({ rows: 3, cols: 3, delete: jasmine.createSpy('delete') }),
    warpPerspective: jasmine.createSpy('warpPerspective')
  };
}

function createLayer(options = {}) {
  return new VideoLayer(Object.assign({ opencv: createCv(), videoParameters: {} }, options));
}

describe('VideoLayer focused coverage', () => {
  it('validates options and initializes time-varying parameters', () => {
    expect(() => new VideoLayer({ opencv: createCv() })).toThrowError('videoParameters must be set!');
    const layer = createLayer({
      interval: 0.5,
      videoParameters: [
        { time: 1, yaw: 0, pitch: 0, roll: 0, x: 0, y: 0, z: 0, extent: [[0, 0], [1, 1]] },
        { time: 2, yaw: 10, pitch: 0, roll: 0, x: 1, y: 1, z: 1, extent: [[1, 1], [2, 2]] }
      ]
    });
    expect(layer.beginIndex).toBe(1);
    expect(layer.finder).toBeDefined();
    expect(layer.interval).toBe(0.5);
  });

  it('calculates pixel bounds and checks inclusive containment', () => {
    const layer = createLayer();
    expect(layer._getPixelBbox([10, 20, 30, 40])).toEqual([0, 0, 20, 20]);
    layer.map = { project: (coord) => ({ x: coord[0], y: coord[1] }) };
    expect(layer._getPixelBbox([10, 20, 30, 40], [0, 0, 40, 50], false)).toEqual([-10, 30, 10, 50]);
    expect(layer._contain([0, 5], [0, 0, 10, 10])).toBe(true);
    expect(layer._contain([11, 5], [0, 0, 10, 10])).toBe(false);
  });

  it('handles empty parameters and creates a mask from origin bounds', () => {
    const layer = createLayer();
    expect(layer._initParameters({})).toBeUndefined();
    layer.timeParams = { 0: { originBounds: [0, 0, 10, 0, 10, 10, 0, 10] } };
    const context = {
      beginPath: jasmine.createSpy('beginPath'),
      moveTo: jasmine.createSpy('moveTo'),
      lineTo: jasmine.createSpy('lineTo'),
      closePath: jasmine.createSpy('closePath'),
      fill: jasmine.createSpy('fill'),
      getImageData: jasmine.createSpy('getImageData').and.returnValue({})
    };
    const result = layer._updateMask({ getContext: () => context }, 10, 1);
    expect(context.moveTo).toHaveBeenCalledWith(0, 0);
    expect(context.lineTo).toHaveBeenCalledTimes(4);
    expect(result.clipMat).toBeDefined();
    expect(result.dst1).toBeDefined();
  });

  it('adds a video source and transforms a frame through the map callback', () => {
    const layer = createLayer({ url: 'video.mp4', extent: [[0, 0], [10, 0], [10, 10], [0, 10]] });
    const source = { play: jasmine.createSpy('play') };
    let sourceOptions;
    layer.map = {
      addSource: jasmine.createSpy('addSource').and.callFake((id, options) => { sourceOptions = options; }),
      addLayer: jasmine.createSpy('addLayer'),
      getSource: jasmine.createSpy('getSource').and.returnValue(source)
    };
    layer.videoDomId = 'video-dom-id';
    layer.videoWidth = 2;
    layer.videoHeight = 2;
    layer.beginIndex = 0;
    layer.videoParameters = [{}];
    layer.timeParams = {
      0: { dsize: { width: 2, height: 2 }, dstTri: {}, realHeight: 2, ratio: 1, originBounds: [0, 0], allContained: true, result: [0, 0, 10, 10] }
    };
    layer.video = { tech: () => ({ el: () => ({}) }), currentTime: () => 0 };
    spyOn(layer, '_updateMask').and.returnValue({ clipMat: {}, dst1: {} });

    layer._addVideoLayer(layer.map);
    const frame = sourceOptions.drawImageCallback({});
    expect(layer.map.addSource).toHaveBeenCalledWith(layer.layerId, jasmine.any(Object));
    expect(source.play).toHaveBeenCalled();
    expect(frame.width).toBe(2);
    expect(frame.height).toBe(2);
    expect(layer.cv.warpPerspective).toHaveBeenCalled();
  });

  it('returns a correctly sized blank frame after a first-frame transform failure', () => {
    const layer = createLayer({ extent: [[0, 0], [10, 0], [10, 10], [0, 10]] });
    layer.cv.findHomography.and.returnValue(null);
    let sourceOptions;
    layer.map = {
      addSource: (id, options) => { sourceOptions = options; },
      addLayer: jasmine.createSpy('addLayer'),
      getSource: () => null
    };
    layer.videoWidth = 2;
    layer.videoHeight = 2;
    layer.beginIndex = 0;
    layer.videoParameters = [{}];
    layer.timeParams = {
      0: { dsize: { width: 2, height: 2 }, dstTri: {}, realHeight: 2, ratio: 1, originBounds: [0, 0], allContained: true, result: [0, 0, 10, 10] }
    };
    layer.video = { tech: () => ({ el: () => ({}) }), currentTime: () => 0 };
    spyOn(layer, '_updateMask').and.returnValue({ clipMat: {}, dst1: {} });
    spyOn(console, 'error');

    layer._addVideoLayer(layer.map);
    const frame = sourceOptions.drawImageCallback({});
    expect(frame.width).toBe(2);
    expect(frame.height).toBe(2);
    expect(console.error).toHaveBeenCalled();
  });

  it('forwards playback and map operations and covers missing playback targets', () => {
    const layer = createLayer();
    const handlers = {};
    layer.video = {
      on: jasmine.createSpy('on').and.callFake((name, handler) => { handlers[name] = handler; }),
      play: jasmine.createSpy('play'),
      pause: jasmine.createSpy('pause'),
      paused: () => false
    };
    spyOn(layer, 'fire');
    layer._bindPlaybackEvents();
    handlers.play();
    handlers.pause();
    layer.map = {
      getSource: jasmine.createSpy('getSource').and.returnValue({ play: jasmine.createSpy('sourcePlay'), pause: jasmine.createSpy('sourcePause') }),
      moveLayer: jasmine.createSpy('moveLayer'),
      setLayoutProperty: jasmine.createSpy('setLayoutProperty')
    };
    layer.layerId = 'video-layer';
    layer.play();
    layer.pause();
    layer.moveLayer('before');
    layer.setVisibility(false);
    expect(layer.fire).toHaveBeenCalledWith('play');
    expect(layer.fire).toHaveBeenCalledWith('pause');
    expect(layer.paused()).toBe(false);
    expect(layer.map.moveLayer).toHaveBeenCalledWith('video-layer', 'before');
    expect(layer.map.setLayoutProperty).toHaveBeenCalledWith('video-layer', 'visibility', 'none');

    layer.video = null;
    layer.map = null;
    expect(layer.paused()).toBe(true);
    expect(layer._getVideoSource()).toBeNull();
    layer._bindPlaybackEvents();
  });
});