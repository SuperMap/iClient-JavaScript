import VideoMapLayer from '../../../src/mapboxgl/mapping/layers/VideoMapLayer';
import { VideoLayerRenderer } from '@supermapgis/iclient-common/overlay/video/VideoLayerRenderer';

function createVideoMap() {
  return {
    loop: false,
    autoplay: false,
    width: 400,
    height: 300,
    map: {
      getSource: jasmine.createSpy('getSource'),
      getStyle: jasmine.createSpy('getStyle').and.returnValue({ layers: [{ id: 'base-layer' }] }),
      unproject: jasmine.createSpy('unproject').and.callFake((point) => ({ lng: point[0], lat: point[1] })),
      addSource: jasmine.createSpy('addSource'),
      addLayer: jasmine.createSpy('addLayer'),
      fitBounds: jasmine.createSpy('fitBounds'),
      removeLayer: jasmine.createSpy('removeLayer'),
      removeSource: jasmine.createSpy('removeSource')
    }
  };
}

describe('VideoMapLayer', () => {
  it('returns early for an empty address and an already registered source', () => {
    const videoMap = createVideoMap();
    const layer = new VideoMapLayer(videoMap);
    spyOn(VideoLayerRenderer.prototype, 'createVideo');
    layer.add('');
    expect(layer.renderer).toBeUndefined();

    videoMap.map.getSource.and.returnValue({});
    layer.videoWidth = 640;
    layer.videoHeight = 360;
    layer._addVideoLayer(videoMap.map);
    expect(videoMap.map.addSource).not.toHaveBeenCalled();
    expect(videoMap.map.addLayer).not.toHaveBeenCalled();
  });

  it('adds video layers on canplay and forwards playback events', () => {
    const videoMap = createVideoMap();
    const oneHandlers = {};
    const eventHandlers = {};
    const video = {
      one: jasmine.createSpy('one').and.callFake((name, handler) => { oneHandlers[name] = handler; }),
      on: jasmine.createSpy('on').and.callFake((name, handler) => { eventHandlers[name] = handler; }),
      videoWidth: () => 640,
      videoHeight: () => 360,
      currentTime: () => 0,
      duration: () => 5,
      tech: () => ({ el: () => ({}) }),
      play: jasmine.createSpy('play')
    };
    spyOn(VideoLayerRenderer.prototype, 'createVideo').and.returnValue(video);
    spyOn(VideoLayerRenderer.prototype, 'getVideoDomId').and.returnValue('video-element-id');
    const layer = new VideoMapLayer(videoMap);
    const loaded = jasmine.createSpy('loaded');
    const played = jasmine.createSpy('played');
    const paused = jasmine.createSpy('paused');
    layer.on('loaded', loaded);
    layer.on('play', played);
    layer.on('pause', paused);

    layer.add('recording.mp4');
    expect(layer.renderer.options).toEqual({
      url: 'recording.mp4',
      id: layer.id,
      loop: false,
      autoplay: false
    });
    expect(oneHandlers.firstplay).toEqual(jasmine.any(Function));
    oneHandlers.firstplay();
    expect(video.play).not.toHaveBeenCalled();
    oneHandlers.canplay();

    expect(layer.videoWidth).toBe(640);
    expect(layer.videoHeight).toBe(360);
    expect(videoMap.map.addSource).toHaveBeenCalledWith(layer.id, jasmine.objectContaining({
      type: 'video',
      urls: ['video-element-id']
    }));
    expect(videoMap.map.addLayer).toHaveBeenCalledWith(jasmine.objectContaining({ id: layer.id }), 'base-layer');
    expect(videoMap.map.fitBounds).toHaveBeenCalled();
    expect(loaded).toHaveBeenCalledWith(jasmine.objectContaining({ videoWidth: 640, videoHeight: 360 }));

    eventHandlers.play();
    eventHandlers.pause();
    expect(played).toHaveBeenCalled();
    expect(paused).toHaveBeenCalled();
    expect(video.on).toHaveBeenCalledWith('timeupdate', jasmine.any(Function));
  });

  it('autoplays after firstplay and after adding the video source', () => {
    const videoMap = createVideoMap();
    videoMap.autoplay = true;
    const onceHandlers = {};
    const video = {
      one: jasmine.createSpy('one').and.callFake((name, handler) => { onceHandlers[name] = handler; }),
      on: jasmine.createSpy('on'),
      videoWidth: () => 320,
      videoHeight: () => 240,
      tech: () => ({ el: () => ({}) }),
      play: jasmine.createSpy('play')
    };
    spyOn(VideoLayerRenderer.prototype, 'createVideo').and.returnValue(video);
    spyOn(VideoLayerRenderer.prototype, 'getVideoDomId').and.returnValue('video-element-id');
    const layer = new VideoMapLayer(videoMap);

    layer.add('recording.mp4');
    onceHandlers.firstplay();
    expect(video.play).toHaveBeenCalledTimes(1);
    onceHandlers.canplay();
    expect(video.play).toHaveBeenCalledTimes(2);
  });

  it('creates a hidden video element with cross-origin enabled', () => {
    const layer = new VideoMapLayer(createVideoMap());

    layer._createVideoElement();
    const element = document.getElementById(layer.id);
    expect(element).not.toBeNull();
    expect(element.className).toBe('video-js');
    expect(element.style.visibility).toBe('hidden');
    expect(element.style.display).toBe('none');
    expect(element.getAttribute('crossorigin')).toBe('anonymous');
    document.body.removeChild(element);
  });

  it('returns early when no video element is available', () => {
    const layer = new VideoMapLayer(createVideoMap());
    layer.video = {};

    layer._bindTimeUpdates();

    expect(layer.timeUpdateHandler).toBeUndefined();
    expect(layer.frameCallbackId).toBeUndefined();
  });

  it('binds timeupdate fallback and emits stats every thirtieth frame', () => {
    const layer = new VideoMapLayer(createVideoMap());
    const videoElement = { webkitDecodedFrameCount: 32, webkitDroppedFrameCount: 3 };
    const video = {
      tech: () => ({ el: () => videoElement }),
      currentTime: jasmine.createSpy('currentTime').and.returnValue(12.5),
      duration: jasmine.createSpy('duration').and.returnValue(60),
      on: jasmine.createSpy('on')
    };
    layer.video = video;
    spyOn(layer, '_fireVideoStats');
    spyOn(layer, 'fire');

    layer._bindTimeUpdates();
    expect(video.on).toHaveBeenCalledWith('timeupdate', jasmine.any(Function));
    for (let frame = 0; frame < 30; frame++) {
      layer.timeUpdateHandler();
    }

    expect(layer.fire).toHaveBeenCalledWith('timeupdate', { time: 12.5 });
    expect(layer._fireVideoStats).toHaveBeenCalledWith(videoElement, 12.5);
    expect(video.currentTime).toHaveBeenCalled();
  });

  it('uses requestVideoFrameCallback and schedules the next frame', () => {
    const layer = new VideoMapLayer(createVideoMap());
    let frameCallback;
    let callbackId = 0;
    const videoElement = {
      requestVideoFrameCallback: jasmine.createSpy('requestVideoFrameCallback').and.callFake((callback) => {
        frameCallback = callback;
        callbackId++;
        return callbackId;
      })
    };
    layer.video = { tech: () => ({ el: () => videoElement }) };
    spyOn(layer, '_fireVideoStats');
    spyOn(layer, 'fire');

    layer._bindTimeUpdates();
    expect(layer.frameCallbackId).toBe(1);
    for (let frame = 1; frame <= 30; frame++) {
      frameCallback(0, { mediaTime: frame });
    }

    expect(videoElement.requestVideoFrameCallback).toHaveBeenCalledTimes(31);
    expect(layer.fire).toHaveBeenCalledWith('timeupdate', { time: 30 });
    expect(layer._fireVideoStats).toHaveBeenCalledWith(videoElement, 30);
  });

  it('reports playback quality or falls back to webkit counters', () => {
    const layer = new VideoMapLayer(createVideoMap());
    layer.video = { duration: () => 20 };
    layer.videoWidth = 1920;
    layer.videoHeight = 1080;
    layer._statsStartTime = performance.now();
    layer._statsFrameCount = 10;
    spyOn(layer, 'fire');
    const qualityElement = {
      getVideoPlaybackQuality: () => ({ totalVideoFrames: 100, droppedVideoFrames: 4 })
    };
    const webkitElement = { webkitDecodedFrameCount: 50, webkitDroppedFrameCount: 2 };

    layer._fireVideoStats(qualityElement, 3);
    layer._fireVideoStats(webkitElement, 4);

    expect(layer.fire.calls.argsFor(0)[1]).toEqual(jasmine.objectContaining({
      mediaTime: 3,
      decodedFrames: 100,
      droppedFrames: 4,
      videoWidth: 1920,
      videoHeight: 1080,
      duration: 20
    }));
    expect(layer.fire.calls.argsFor(1)[1]).toEqual(jasmine.objectContaining({
      mediaTime: 4,
      decodedFrames: 50,
      droppedFrames: 2
    }));
  });

  it('plays and pauses both the video and available map source', () => {
    const videoMap = createVideoMap();
    const source = { play: jasmine.createSpy('sourcePlay'), pause: jasmine.createSpy('sourcePause') };
    videoMap.map.getSource.and.returnValue(source);
    const layer = new VideoMapLayer(videoMap);
    layer.video = {
      play: jasmine.createSpy('videoPlay'),
      pause: jasmine.createSpy('videoPause'),
      paused: () => false
    };
    layer.id = 'video-layer';

    layer.play();
    layer.pause();

    expect(layer.video.play).toHaveBeenCalled();
    expect(layer.video.pause).toHaveBeenCalled();
    expect(source.play).toHaveBeenCalled();
    expect(source.pause).toHaveBeenCalled();
    expect(layer.paused()).toBe(false);
  });

  it('returns safe defaults when no playback target is present', () => {
    const layer = new VideoMapLayer(createVideoMap());
    expect(layer.paused()).toBe(true);
    expect(layer._getVideoSource()).toBeNull();
    layer.map = null;
    expect(layer._getVideoSource()).toBeNull();
    layer.video = null;
    layer.play();
    layer.pause();
    layer.id = null;
    expect(layer._getVideoSource()).toBeNull();
    layer.remove();
  });

  it('removes the layer, source, video element and active callbacks', () => {
    const videoMap = createVideoMap();
    const layer = new VideoMapLayer(videoMap);
    const videoElement = document.createElement('video');
    videoElement.id = layer.id;
    videoElement.cancelVideoFrameCallback = jasmine.createSpy('cancelVideoFrameCallback');
    document.body.appendChild(videoElement);
    const timeUpdateHandler = jasmine.createSpy('timeUpdateHandler');
    layer.frameCallbackId = 7;
    layer.timeUpdateHandler = timeUpdateHandler;
    layer.video = {
      tech: () => ({ el: () => videoElement }),
      off: jasmine.createSpy('off')
    };

    layer.remove();

    expect(videoElement.cancelVideoFrameCallback).toHaveBeenCalledWith(7);
    expect(layer.video.off).toHaveBeenCalledWith('timeupdate', timeUpdateHandler);
    expect(videoMap.map.removeLayer).toHaveBeenCalledWith(layer.id);
    expect(videoMap.map.removeSource).toHaveBeenCalledWith(layer.id);
    expect(document.getElementById(layer.id)).toBeNull();
  });
});