import L from 'leaflet';
import { VideoLayer, videoLayer } from '../../../src/leaflet/overlay/VideoLayer';
import { VideoLayerRenderer } from '../../../src/common/overlay/video/VideoLayerRenderer';
import { VideoFrameProcessor } from '../../../src/common/overlay/video/VideoFrameProcessor';
import { SeiHlsSource } from '../../../src/common/overlay/video/SeiHlsSource';
import { SeiPoseTimeline } from '../../../src/common/overlay/video/SeiPoseTimeline';

describe('leaflet_VideoLayer', () => {
    var container, map, layer, player, events, element, nextId, currentTime;
    var options = {
        url: 'base/resources/data/test.mp4',
        opencv: {},
        videoParameters: { pitch: 90, roll: 0, yaw: 0, x: 0, y: 0, z: 100, fovX: 90, fovY: 90, centerX: 160, centerY: 90 },
        extent: [[0, 0], [0.01, 0], [0.01, 0.01], [0, 0.01]]
    };

    function createPlayer() {
        events = new L.Evented();
        nextId = 0;
        currentTime = 0;
        element = {
            readyState: 2,
            requestVideoFrameCallback: jasmine.createSpy('requestVideoFrameCallback').and.callFake(() => ++nextId),
            cancelVideoFrameCallback: jasmine.createSpy('cancelVideoFrameCallback')
        };
        var paused = false;
        player = {
            on: (name, handler) => events.on(name, handler),
            off: (name, handler) => events.off(name, handler),
            one: (name, handler) => events.once(name, handler),
            videoWidth: () => 320,
            videoHeight: () => 180,
            currentTime: () => currentTime,
            tech: () => ({ el: () => element }),
            paused: () => paused,
            play: jasmine.createSpy('play').and.callFake(() => { paused = false; events.fire('play'); }),
            pause: jasmine.createSpy('pause').and.callFake(() => { paused = true; events.fire('pause'); }),
            dispose: jasmine.createSpy('dispose'),
            error: () => new Error('media failed')
        };
        return player;
    }

    async function addVideo(overrides = {}) {
        layer = videoLayer({ ...options, ...overrides }).addTo(map);
        events.fire('canplay');
        await Promise.resolve();
        return layer;
    }

    function timeParameters() {
        return [0, 1].map((time) => ({
            ...options.videoParameters,
            time,
            x: time * 100,
            extent: options.extent.map((point) => [point[0] + time * 0.01, point[1]])
        }));
    }

    beforeEach(() => {
        container = document.createElement('div');
        container.style.cssText = 'width:400px;height:300px';
        document.body.appendChild(container);
        map = L.map(container, { zoomAnimation: false, fadeAnimation: false }).setView([0.005, 0.005], 14);
        spyOn(VideoLayerRenderer.prototype, 'createVideo').and.callFake(function () { this.video = createPlayer(); return this.video; });
        spyOn(VideoFrameProcessor.prototype, 'init').and.callFake(function () {
            this.width = this.height = 16;
            return Promise.resolve(this);
        });
        spyOn(VideoFrameProcessor.prototype, 'render').and.callFake((video, canvas) => {
            var context = canvas.getContext('2d');
            context.fillStyle = '#00ff00';
            context.fillRect(0, 0, canvas.width, canvas.height);
        });
        spyOn(VideoFrameProcessor.prototype, 'updateParameters');
        spyOn(SeiHlsSource.prototype, 'start').and.returnValue(true);
    });

    afterEach(() => {
        map.remove();
        container.remove();
        layer = null;
    });

    it('validates the camera input contract', () => {
        expect(() => videoLayer({ ...options, videoParameters: [] })).toThrowError('videoParameters must contain ordered video times');
        expect(() => videoLayer({ ...options, url: '' })).toThrowError('url must be set!');
        expect(() => videoLayer({ ...options, extent: [] })).toThrowError('extent must contain geographic coordinates');
        expect(() => videoLayer({ ...options, clipRegion: [[0, 0]] })).toThrowError('clipRegion must contain four video pixel coordinates');
        expect(() => videoLayer({ ...options, interval: 0 })).toThrowError('interval must be at least 0.001 seconds');
        expect(() => videoLayer({ ...options, videoParameters: timeParameters().reverse() })).toThrowError('videoParameters must contain ordered video times');
    });

    it('rejects a map outside the MVP projection', () => {
        map.options.crs = L.CRS.EPSG4326;
        layer = videoLayer(options);
        expect(() => layer.addTo(map)).toThrowError('VideoLayer currently requires an EPSG:3857 map');
        expect(VideoLayerRenderer.prototype.createVideo).not.toHaveBeenCalled();
    });

    it('loads a canvas with the expected geographic bounds, opacity and layer order', async () => {
        await addVideo({ opacity: 0.4, zIndex: 8 });
        expect(layer instanceof VideoLayer).toBe(true);
        expect(layer.getElement().tagName).toBe('CANVAS');
        expect(layer.getElement().width).toBe(16);
        expect(layer.getElement().style.opacity).toBe('0.4');
        expect(layer.getElement().style.zIndex).toBe('8');
        expect(layer.getBounds().getNorthEast()).toEqual(L.latLng(0.01, 0.01));
        expect(layer.getElement().getContext('2d').getImageData(8, 8, 1, 1).data[1]).toBe(255);
    });

    it('preserves opacity, layer ordering and canvas ownership with independent zoom transforms', async () => {
        await addVideo({ opacity: 0.4, zIndex: 8 });
        const canvas = layer.getElement();
        const pane = layer.getPane();
        const wrapper = canvas.parentNode;
        const sibling = L.DomUtil.create('div', '', pane);
        layer.bringToFront();
        expect(pane.lastElementChild).toBe(wrapper);
        layer.bringToBack();
        expect(pane.firstElementChild).toBe(wrapper);
        layer.setZIndex(12).setOpacity(0.6);
        expect(wrapper.style.zIndex).toBe('12');
        expect(canvas.style.opacity).toBe('0.6');
        layer.remove();
        expect(wrapper.isConnected).toBe(false);
        expect(canvas.isConnected).toBe(false);
        expect(sibling.isConnected).toBe(true);
        layer.addTo(map);
        events.fire('canplay');
        await Promise.resolve();
        expect(layer.getElement()).toBe(canvas);
        expect(canvas.parentNode).toBe(wrapper);
        expect(wrapper.style.zIndex).toBe('12');
    });

    it('keeps the canvas anchored while panning and zooming without recalibrating', async () => {
        await addVideo();
        var width = parseFloat(layer.getElement().style.width);
        map.setZoom(map.getZoom() + 1);
        expect(parseFloat(layer.getElement().style.width)).toBeCloseTo(width * 2, 2);
        map.panBy([60, 30], { animate: false });
        const expected = map.project(layer.getBounds().getNorthWest()).subtract(map.getPixelOrigin());
        expect(L.DomUtil.getPosition(layer.getElement())).toEqual(expected);
        expect(VideoFrameProcessor.prototype.init.calls.count()).toBe(1);
    });

    [false, true].forEach((sei) => {
        it('preserves the animated zoom while decoded frames update geographic bounds: SEI=' + sei, async () => {
            map.remove();
            map = L.map(container, { zoomAnimation: true, fadeAnimation: false }).setView([0.005, 0.005], 14);
            await addVideo(sei ? { parametersSource: 'SEI', videoParameters: undefined } : { videoParameters: timeParameters() });
            if (sei) {
                layer.getSeiTimeline().push(timeParameters());
                await Promise.resolve();
            }
            map.panBy([35, 20], { animate: false });
            const target = { center: L.latLng(0.006, 0.008), zoom: 15 };
            map.fire('zoomanim', target);
            [0.2, 0.5, 0.8].forEach((time) => {
                layer._drawFrame(time);
                const bounds = layer.getBounds();
                const expected = map.project(bounds.getSouthEast(), target.zoom).subtract(map.project(bounds.getNorthWest(), target.zoom));
                const rect = layer.getElement().getBoundingClientRect();
                // 浏览器按 1/64 CSS 像素布局，再经缩放后允许小于 0.05 像素的量化差异。
                expect(Math.abs(rect.width - expected.x)).toBeLessThan(0.05);
                expect(Math.abs(rect.height - expected.y)).toBeLessThan(0.05);
                const origin = map.getContainer().getBoundingClientRect();
                const position = map._latLngToNewLayerPoint(bounds.getNorthWest(), target.zoom, target.center).add(map._getMapPanePos());
                expect(Math.abs(rect.left - origin.left - position.x)).toBeLessThan(0.05);
                expect(Math.abs(rect.top - origin.top - position.y)).toBeLessThan(0.05);
            });
            expect(VideoFrameProcessor.prototype.init.calls.count()).toBe(1);
            expect(VideoFrameProcessor.prototype.render.calls.count()).toBeGreaterThan(3);
        });
    });

    it('forwards playback events, cancels paused updates and renders seeks', async () => {
        await addVideo();
        var play = jasmine.createSpy('play event');
        var pause = jasmine.createSpy('pause event');
        layer.on('play', play).on('pause', pause);
        layer.pause();
        expect(layer.paused()).toBe(true);
        expect(element.cancelVideoFrameCallback).toHaveBeenCalledWith(1);
        expect(pause).toHaveBeenCalled();
        var renders = VideoFrameProcessor.prototype.render.calls.count();
        events.fire('seeked');
        expect(VideoFrameProcessor.prototype.render.calls.count()).toBe(renders + 1);
        layer.play();
        expect(layer.paused()).toBe(false);
        expect(play).toHaveBeenCalled();
        expect(element.requestVideoFrameCallback.calls.count()).toBe(2);
    });

    it('interpolates camera parameters and geographic bounds while seeking paused video', async () => {
        await addVideo({ videoParameters: timeParameters(), interval: 0.5 });
        layer.pause();
        var update = jasmine.createSpy('videoparameterupdate');
        layer.on('videoparameterupdate', update);
        currentTime = 0.5;
        events.fire('seeked');
        var parameters = VideoFrameProcessor.prototype.updateParameters.calls.mostRecent().args[0];
        expect(parameters.time).toBe(0.5);
        expect(parameters.x).toBe(50);
        expect(layer.getBounds().getWest()).toBeCloseTo(0.005, 8);
        expect(layer.getBounds().getEast()).toBeCloseTo(0.015, 8);
        expect(update.calls.mostRecent().args[0].time).toBe(0.5);
        expect(layer.getElement().width).toBe(16);
        expect(layer.getElement().height).toBe(16);
        expect(layer.paused()).toBe(true);
        expect(layer._frameId).toBeUndefined();
    });

    it('calibrates the decoded video timestamp and reuses parameters within a sample', async () => {
        await addVideo({ videoParameters: timeParameters(), interval: 0.5 });
        var callback = element.requestVideoFrameCallback.calls.mostRecent().args[0];
        currentTime = 0.9;
        callback(100, { mediaTime: 0.2 });
        expect(layer.currentTime).toBe(0.2);
        expect(layer._lastParameters.time).toBe(0.5);
        expect(VideoFrameProcessor.prototype.updateParameters.calls.count()).toBe(1);
        callback = element.requestVideoFrameCallback.calls.mostRecent().args[0];
        callback(200, { mediaTime: 0.3 });
        expect(layer.currentTime).toBe(0.3);
        expect(VideoFrameProcessor.prototype.updateParameters.calls.count()).toBe(1);
    });

    it('clamps time to available parameters and restores the first bounds on loop or replay', async () => {
        await addVideo({ videoParameters: timeParameters(), interval: 0.5 });
        layer.pause();
        currentTime = 2;
        events.fire('seeked');
        expect(layer._lastParameters.time).toBe(1);
        expect(layer.getBounds().getWest()).toBeCloseTo(0.01, 8);
        currentTime = 0;
        events.fire('seeked');
        expect(layer._lastParameters.time).toBe(0);
        expect(layer.getBounds().getWest()).toBeCloseTo(0, 8);
        expect(layer._parametersAtTime(-1)).toBe(layer._timeParameters[0]);
    });

    it('initializes at the actual playback position and resets the time sequence when re-added', async () => {
        layer = videoLayer({ ...options, videoParameters: timeParameters() }).addTo(map);
        currentTime = 1;
        events.fire('canplay');
        await Promise.resolve();
        expect(VideoFrameProcessor.prototype.init.calls.mostRecent().args[2].time).toBe(1);
        expect(layer.getBounds().getWest()).toBeCloseTo(0.01, 8);
        layer.remove().addTo(map);
        events.fire('canplay');
        await Promise.resolve();
        expect(layer.currentTime).toBe(0);
        expect(layer.getBounds().getWest()).toBeCloseTo(0, 8);
    });

    it('retains the fixed geographic extent when a static video is sought', async () => {
        await addVideo();
        currentTime = 50;
        events.fire('seeked');
        expect(VideoFrameProcessor.prototype.updateParameters).not.toHaveBeenCalled();
        expect(layer.currentTime).toBe(50);
        expect(layer.getBounds().getNorthEast()).toEqual(L.latLng(0.01, 0.01));
    });

    it('waits for SEI without inventing geographic bounds or handing the HLS URL to VHS', async () => {
        await addVideo({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined });
        expect(layer.renderer.options.url).toBeUndefined();
        expect(layer.renderer.options.loop).toBe(false);
        expect(layer.isParametersReady()).toBe(false);
        expect(layer.getBounds().isValid()).toBe(false);
        expect(layer.getElement().style.visibility).toBe('hidden');
        expect(VideoFrameProcessor.prototype.init).not.toHaveBeenCalled();
        expect(() => map.setZoom(15)).not.toThrow();
        var parameters = timeParameters();
        parameters[0].clipRegion = [[10, 0], [310, 0], [310, 180], [10, 180]];
        layer.getSeiTimeline().push(parameters);
        await Promise.resolve();
        expect(layer.isParametersReady()).toBe(true);
        expect(layer.getElement().style.visibility).toBe('');
        expect(VideoFrameProcessor.prototype.init.calls.mostRecent().args[4]).toEqual(parameters[0].clipRegion);
        expect(layer.getVideoElement()).toBe(element);
    });

    it('accepts SEI before canplay and initializes once when decoded dimensions are available', async () => {
        layer = videoLayer({ ...options, url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined }).addTo(map);
        var ready = jasmine.createSpy('parametersready');
        layer.on('parametersready', ready);
        layer.getSeiTimeline().push(timeParameters());
        expect(VideoFrameProcessor.prototype.init).not.toHaveBeenCalled();
        events.fire('canplay');
        events.fire('canplay');
        await Promise.resolve();
        expect(VideoFrameProcessor.prototype.init.calls.count()).toBe(1);
        expect(ready.calls.count()).toBe(1);
    });

    it('invalidates old SEI registration on reconnect and rejects callbacks from removed sessions', async () => {
        await addVideo({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined });
        layer.getSeiTimeline().push(timeParameters());
        await Promise.resolve();
        var processor = layer._processor;
        var source = layer._sei.source;
        source.onReconnect();
        expect(processor._disposed).toBe(true);
        expect(layer.isParametersReady()).toBe(false);
        expect(layer.getElement().style.visibility).toBe('hidden');
        expect(layer._frameId).toBeUndefined();
        layer.getSeiTimeline().push(timeParameters());
        await Promise.resolve();
        expect(layer.isParametersReady()).toBe(true);
        layer.remove().addTo(map);
        expect(source._destroyed).toBe(true);
        source.onUserData({ samples: [{ userData: '{}' }] });
        expect(layer.getSeiTimeline().size).toBe(0);
        expect(layer.isParametersReady()).toBe(false);
    });

    it('redraws SEI camera poses when offset or calibration changes during pause', async () => {
        await addVideo({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined });
        layer.getSeiTimeline().push(timeParameters());
        await Promise.resolve();
        layer.pause();
        layer.setSeiOffset(0.5);
        expect(VideoFrameProcessor.prototype.updateParameters.calls.mostRecent().args[0].x).toBe(50);
        layer.getSeiTimeline().setMediaOffset(0.25);
        expect(VideoFrameProcessor.prototype.updateParameters.calls.mostRecent().args[0].x).toBe(75);
    });

    it('owns its SEI timeline and leaves an external timeline untouched', async () => {
        var timeline = new SeiPoseTimeline();
        timeline.push(timeParameters());
        await addVideo({ parametersSource: 'SEI', parametersTimeline: timeline, videoParameters: undefined });
        expect(layer.getSeiTimeline()).not.toBe(timeline);
        expect(layer.isParametersReady()).toBe(false);
        layer.getSeiTimeline().push(timeParameters());
        await Promise.resolve();
        expect(layer.isParametersReady()).toBe(true);
        layer.remove();
        expect(timeline.size).toBe(2);
        expect(timeline._listeners.add).toBeUndefined();
        expect(layer.getSeiTimeline().size).toBe(0);
    });

    it('defaults to custom parameters and rejects obsolete parameter source values', () => {
        expect(videoLayer(options).parametersSource).toBe('custom');
        ['sei', 'videoParameters', null].forEach((parametersSource) => {
            expect(() => videoLayer({ ...options, parametersSource })).toThrowError('parametersSource must be "custom" or "SEI".');
        });
    });

    it('plays an HLS-owned MediaSource directly without waiting on the video.js source cache', async () => {
        await addVideo({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined });
        element.play = jasmine.createSpy('native play').and.returnValue(Promise.resolve());
        layer.play();
        layer._sei.source.onMediaAttached();
        expect(element.play.calls.count()).toBe(2);
        expect(player.play).not.toHaveBeenCalled();
    });

    it('uses and cancels animation frames when video frame callbacks are unavailable', async () => {
        layer = videoLayer(options).addTo(map);
        element.requestVideoFrameCallback = undefined;
        spyOn(window, 'requestAnimationFrame').and.returnValue(42);
        spyOn(window, 'cancelAnimationFrame');
        events.fire('canplay');
        await Promise.resolve();
        expect(window.requestAnimationFrame).toHaveBeenCalled();
        layer.pause();
        expect(window.cancelAnimationFrame).toHaveBeenCalledWith(42);
    });

    it('cancels frames immediately even when the native pause event is deferred', async () => {
        await addVideo();
        player.pause.and.stub();
        layer.pause();
        expect(layer._frameId).toBeUndefined();
        expect(element.cancelVideoFrameCallback).toHaveBeenCalledWith(1);
    });

    it('preserves visibility and releases the player, matrices and callbacks when re-added', async () => {
        await addVideo();
        var oldPlayer = player;
        var oldElement = element;
        var processor = layer._processor;
        layer.setVisibility(false).remove();
        expect(oldPlayer.dispose).toHaveBeenCalled();
        expect(oldElement.cancelVideoFrameCallback).toHaveBeenCalledWith(1);
        expect(processor._disposed).toBe(true);
        expect(layer.getElement().isConnected).toBe(false);
        layer.addTo(map);
        events.fire('canplay');
        await Promise.resolve();
        expect(player).not.toBe(oldPlayer);
        expect(layer.getElement().isConnected).toBe(true);
        expect(layer.getElement().style.display).toBe('none');
        layer.setVisibility(true);
        expect(layer.getElement().style.display).toBe('');
    });

    it('does not restart a removed layer when OpenCV finishes initializing late', async () => {
        var finish;
        VideoFrameProcessor.prototype.init.and.callFake(function () {
            return new Promise((resolve) => { finish = () => resolve(this); });
        });
        layer = videoLayer(options).addTo(map);
        var load = jasmine.createSpy('load');
        layer.on('load', load);
        events.fire('canplay');
        layer.remove();
        finish();
        await Promise.resolve();
        expect(load).not.toHaveBeenCalled();
        expect(VideoFrameProcessor.prototype.render).not.toHaveBeenCalled();
    });

    it('ignores an old frame callback after removal and re-addition', async () => {
        await addVideo();
        var callback = element.requestVideoFrameCallback.calls.mostRecent().args[0];
        layer.remove().addTo(map);
        events.fire('canplay');
        await Promise.resolve();
        var id = layer._frameId;
        var renders = VideoFrameProcessor.prototype.render.calls.count();
        callback();
        expect(layer._frameId).toBe(id);
        expect(VideoFrameProcessor.prototype.render.calls.count()).toBe(renders);
    });

    it('reports a frame failure and stops scheduling updates', async () => {
        await addVideo();
        var error = jasmine.createSpy('error');
        layer.on('error', error);
        VideoFrameProcessor.prototype.render.and.throwError('canvas read failed');
        events.fire('seeked');
        expect(error.calls.mostRecent().args[0].error.message).toBe('canvas read failed');
        expect(layer._frameId).toBeUndefined();
        expect(layer._ready).toBe(false);
    });
});
