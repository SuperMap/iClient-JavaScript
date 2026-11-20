import { VideoLayer } from '../../../src/mapboxgl/overlay/VideoLayer';
import { SeiHlsSource } from '../../../src/common/overlay/video/SeiHlsSource';
import { createVideoElement, createVideojsPlayer } from '../../tool/VideoPlayerMock';

function createCv() {
  return {
    CV_32FC2: 'CV_32FC2',
    matFromArray: jasmine.createSpy('matFromArray').and.callFake(() => ({ delete: jasmine.createSpy('delete') })),
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

  it('uses the parameter source values and rejects unsupported values', () => {
    expect(createLayer().parametersSource).toBe('custom');
    const seiLayer = createLayer({ parametersSource: 'SEI' });
    expect(seiLayer.parametersSource).toBe('SEI');
    expect(seiLayer.isSeiSource).toBe(true);
    expect(() => createLayer({ parametersSource: 'sei' })).toThrowError(
      'parametersSource must be "custom" or "SEI".'
    );
  });

  it('creates its own sei timeline instead of accepting an external timeline', () => {
    const externalTimeline = {
      on: jasmine.createSpy('on')
    };
    const layer = createLayer({
      parametersSource: 'SEI',
      parametersTimeline: externalTimeline
    });

    expect(layer.getSeiTimeline()).not.toBe(externalTimeline);
    expect(externalTimeline.on).not.toHaveBeenCalled();
  });

  it('calculates pixel bounds and checks inclusive containment', () => {
    const layer = createLayer();
    expect(layer._getPixelBbox([10, 20, 30, 40])).toEqual([0, 0, 20, 20]);
    layer.map = { project: (coord) => ({ x: coord[0], y: coord[1] }) };
    expect(layer._getPixelBbox([10, 20, 30, 40], [0, 0, 40, 50], false)).toEqual([-10, 30, 10, 50]);
    expect(layer._contain([0, 5], [0, 0, 10, 10])).toBe(true);
    expect(layer._contain([11, 5], [0, 0, 10, 10])).toBe(false);
  });

  it('rebuilds the sei hls session when restartHls is called', () => {
    spyOn(SeiHlsSource.prototype, 'start').and.returnValue(true);
    const layer = createLayer({ parametersSource: 'SEI', url: 'http://example.com/live.m3u8' });
    layer._sei.start();
    const source = layer._sei.source;
    spyOn(source, 'destroy').and.callThrough();
    expect(layer.restartHls()).toBe(layer);
    expect(source.destroy).toHaveBeenCalled();
    expect(layer._sei.source).not.toBe(source);
    expect(layer._sei.source.url).toBe('http://example.com/live.m3u8');
    expect(SeiHlsSource.prototype.start.calls.count()).toBe(2);
    layer._sei.stop();
  });

  it('ignores restartHls when no sei hls session exists', () => {
    const layer = createLayer();
    expect(layer.restartHls()).toBe(layer);
  });

  it('handles empty parameters and creates a mask from origin bounds', () => {
    const layer = createLayer();
    expect(layer._initParameters({})).toBeUndefined();
    layer.timeParams = { 0: { originBounds: [0, 0, 10, 0, 10, 10, 0, 10] } };
    layer.baseEntry = layer.timeParams[0];
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
      removeSource: jasmine.createSpy('removeSource'),
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
    layer.baseEntry = layer.timeParams[0];
    layer.video = { tech: () => ({ el: () => ({}) }), currentTime: () => 0 };
    spyOn(layer, '_updateMask').and.returnValue({ clipMat: {}, dst1: {} });

    layer._addVideoLayer(layer.map);
    const frame = sourceOptions.drawImageCallback({});
    expect(layer.map.addSource).toHaveBeenCalledWith(layer.layerId, jasmine.any(Object));
    expect(source.play).toHaveBeenCalled();
    expect(frame.width).toBe(2);
    expect(frame.height).toBe(2);
    expect(layer.cv.warpPerspective).toHaveBeenCalled();
    const srcTri = layer.cv.matFromArray.calls.mostRecent().returnValue;
    const homography = layer.cv.findHomography.calls.mostRecent().returnValue;
    sourceOptions.drawImageCallback({});
    expect(layer.cv.findHomography.calls.count()).toBe(1);
    layer.onRemove(layer.map);
    expect(srcTri.delete.calls.count()).toBe(1);
    expect(homography.delete.calls.count()).toBe(1);
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
    layer.baseEntry = layer.timeParams[0];
    layer.video = { tech: () => ({ el: () => ({}) }), currentTime: () => 0 };
    spyOn(layer, '_updateMask').and.returnValue({ clipMat: {}, dst1: {} });
    spyOn(console, 'error');

    layer._addVideoLayer(layer.map);
    const frame = sourceOptions.drawImageCallback({});
    expect(frame.width).toBe(2);
    expect(frame.height).toBe(2);
    expect(console.error).toHaveBeenCalled();
  });

  it('releases all time-varying pose matrices once, including a shared base entry', () => {
    const layer = createLayer();
    const base = { dstTri: new layer.cv.Mat() };
    const next = { dstTri: new layer.cv.Mat() };
    const matrices = [base.dstTri, next.dstTri];
    layer.baseEntry = base;
    layer.timeParams = { 0: base, 1: next };
    layer.onRemove();
    layer.onRemove();
    matrices.forEach(matrix => expect(matrix.delete.calls.count()).toBe(1));
    expect(layer.timeParams).toBeNull();
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

describe('mapboxgl video layer player lifecycle', () => {
  let layer;
  afterEach(() => { if (layer && layer.map) { layer.onRemove(layer.map); } });

  function createMap() {
    const sources = new Map();
    const layers = new Map();
    return {
      getSource: (id) => sources.get(id),
      getLayer: (id) => layers.get(id),
      addSource: jasmine.createSpy('addSource').and.callFake((id, source) => sources.set(id, source)),
      addLayer: jasmine.createSpy('addLayer').and.callFake((value) => layers.set(value.id, value)),
      removeSource: jasmine.createSpy('removeSource').and.callFake((id) => sources.delete(id)),
      removeLayer: jasmine.createSpy('removeLayer').and.callFake((id) => layers.delete(id))
    };
  }

  [false, true].forEach((useVideojs) => {
    it('initializes preloaded external media once: videojs=' + useVideojs, async () => {
      const external = createVideojsPlayer();
      layer = createLayer({ player: useVideojs ? external.player : external.video });
      spyOn(layer, '_initFromParameters');
      layer.onAdd(createMap());
      expect(layer._initFromParameters).not.toHaveBeenCalled();
      await Promise.resolve();
      expect(layer.getVideoElement()).toBe(external.video);
      expect(layer._initFromParameters.calls.count()).toBe(1);
      external.events.dispatchEvent(new Event('canplay'));
      external.video.dispatchEvent(new Event('canplay'));
      expect(layer._initFromParameters.calls.count()).toBe(1);
      layer.onRemove(layer.map);
      expect(external.player.dispose).not.toHaveBeenCalled();
      expect(layer.getVideoElement()).toBeNull();
    });
  });

  it('cancels queued readiness when removed before the preloaded callback', async () => {
    layer = createLayer({ player: createVideoElement() });
    spyOn(layer, '_initFromParameters');
    layer.onAdd(createMap());
    layer.onRemove(layer.map);
    await Promise.resolve();
    expect(layer._initFromParameters).not.toHaveBeenCalled();
  });

  function createSeiLayer() {
    layer = createLayer({ parametersSource: 'SEI', player: createVideoElement() });
    const map = createMap();
    spyOn(layer, '_initParameters').and.callFake(() => Promise.resolve({ dispose: jasmine.createSpy('dispose') }));
    spyOn(layer, '_computePoseEntry').and.callFake((pose) => ({ extent: pose.extent, dstTri: { delete: jasmine.createSpy('delete') } }));
    spyOn(layer, '_addVideoLayer').and.callFake(function () {
      this.baseRatio = 1;
      this.extent = this.baseEntry.extent;
      map.addSource(this.layerId, {});
      map.addLayer({ id: this.layerId });
      this._layerAdded = true;
    });
    return map;
  }

  const pose = { time: 0, x: 1000, y: 1000, extent: [[0, 0], [1, 0], [1, 1], [0, 1]], clipRegion: [[0, 0], [160, 0], [160, 90], [0, 90]] };

  it('removes old SEI raster/source and recalibrates a readded layer from fresh poses', async () => {
    const map = createSeiLayer();
    layer.onAdd(map);
    layer.getSeiTimeline().push(pose);
    await Promise.resolve();
    await Promise.resolve();
    expect(layer.isParametersReady()).toBe(true);
    expect(map.getLayer(layer.layerId)).toBeDefined();
    const oldCamera = layer.coordTransfer;
    layer.onRemove(map);
    expect(oldCamera.dispose).toHaveBeenCalled();
    expect(map.getLayer(layer.layerId)).toBeUndefined();
    expect(map.getSource(layer.layerId)).toBeUndefined();
    expect(layer.getSeiTimeline().size).toBe(0);
    expect(layer.clipRegion).toEqual([]);
    expect(layer.extent).toBeUndefined();
    expect(layer.baseRatio).toBeUndefined();
    layer.onAdd(map);
    await Promise.resolve();
    expect(layer.isParametersReady()).toBe(false);
    expect(map.getLayer(layer.layerId)).toBeUndefined();
    const clipRegion = [[10, 10], [300, 10], [300, 170], [10, 170]];
    layer.getSeiTimeline().push({ ...pose, clipRegion });
    await Promise.resolve();
    expect(layer.isParametersReady()).toBe(true);
    expect(layer.clipRegion).toEqual(clipRegion);
    expect(map.addSource.calls.count()).toBe(2);
  });

  it('rejects an old OpenCV initialization after removal and readdition', async () => {
    const map = createSeiLayer();
    const finishes = [];
    layer._initParameters.and.callFake(() => new Promise((resolve) => finishes.push(resolve)));
    layer.onAdd(map);
    layer.getSeiTimeline().push(pose);
    await Promise.resolve();
    layer.onRemove(map);
    layer.onAdd(map);
    layer.getSeiTimeline().push({ ...pose, x: 2000 });
    await Promise.resolve();
    const obsolete = { dispose: jasmine.createSpy('obsolete dispose') };
    finishes[0](obsolete);
    await Promise.resolve();
    expect(obsolete.dispose).toHaveBeenCalled();
    expect(map.addSource).not.toHaveBeenCalled();
    finishes[1]({ dispose: jasmine.createSpy('current dispose') });
    await Promise.resolve();
    expect(layer.isParametersReady()).toBe(true);
    expect(layer._computePoseEntry.calls.mostRecent().args[0].x).toBe(2000);
  });
});
