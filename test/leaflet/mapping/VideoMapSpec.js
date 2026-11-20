import L from 'leaflet';
import Hls from 'hls.js';
import proj4 from 'proj4';
import { VideoMap, videoMap } from '../../../src/leaflet/mapping/VideoMap';
import CoordTransfer from '../../../src/common/overlay/video/CoordTransfer';
import { VideoLayerRenderer } from '../../../src/common/overlay/video/VideoLayerRenderer';
import { resolveCameraPose as sharedPose } from '../../../src/common/overlay/video/VideoMapUtil';
import { resolveCameraPose as mapboxPose } from '../../../src/mapboxgl/mapping/utils/VideoMapUtil';
import { transformVideoMapGeoJSON as sharedGeometry } from '../../../src/common/overlay/video/clipVideoMapGeometry';
import { transformVideoMapGeoJSON as mapboxGeometry } from '../../../src/mapboxgl/mapping/utils/clipVideoMapGeometry';
import { SeiHlsSource } from '../../../src/common/overlay/video/SeiHlsSource';

describe('leaflet_VideoMap with time', () => {
    var container, instance, player, events, element, time, paused, nextFrame;
    var pose = { fovX: 90, fovY: 90, centerX: 160, centerY: 90, pitch: 90, roll: 0, yaw: 0, x: 0, y: 0, z: 100 };
    var parameters = [{ ...pose, time: 0 }, { ...pose, x: 100, time: 10 }];
    var data = { type: 'FeatureCollection', features: [{ type: 'Feature', properties: { name: 'landmark' }, geometry: { type: 'Point', coordinates: [0, 0] } }] };

    beforeEach(() => {
        container = document.createElement('div');
        container.style.cssText = 'width:400px;height:300px';
        document.body.appendChild(container);
        events = new L.Evented();
        element = document.createElement('video');
        nextFrame = time = 0;
        paused = false;
        element.requestVideoFrameCallback = jasmine.createSpy('request frame').and.callFake(() => ++nextFrame);
        element.cancelVideoFrameCallback = jasmine.createSpy('cancel frame');
        player = {
            on: (name, handler) => events.on(name, handler),
            off: (name, handler) => events.off(name, handler),
            one: (name, handler) => events.once(name, handler),
            videoWidth: () => 320,
            videoHeight: () => 180,
            tech: () => ({ el: () => element }),
            currentTime: () => time,
            paused: () => paused,
            play: () => { paused = false; events.fire('play'); },
            pause: () => { paused = true; events.fire('pause'); },
            dispose: jasmine.createSpy('dispose'),
            error: () => new Error('media failed')
        };
        spyOn(VideoLayerRenderer.prototype, 'createVideo').and.callFake(function () { this.video = player; return player; });
        spyOn(CoordTransfer.prototype, 'init').and.callFake(function () {
            this.setCameraLocation(this.configs);
            return Promise.resolve(this);
        });
        spyOn(CoordTransfer.prototype, 'setCameraLocation').and.callFake(function (camera) {
            this._x = camera.x;
            this._y = camera.y;
        });
        spyOn(CoordTransfer.prototype, 'toCameraCoordinate').and.callFake(function (point) { return [point[0] - this._x + 160, point[1] - this._y + 90, 1]; });
        spyOn(CoordTransfer.prototype, 'projectCameraToVideo').and.callFake((point) => point.slice(0, 2));
        spyOn(CoordTransfer.prototype, 'toVideoCoordinate').and.callFake(function (point) { return { data64F: [point[0] - this._x + 160, point[1] - this._y + 90] }; });
        spyOn(CoordTransfer.prototype, 'toSpatialCoordinate').and.callFake(function (point) { return [point[0] - 160 + this._x, point[1] - 90 + this._y, 0]; });
        spyOn(CoordTransfer.prototype, 'dispose').and.callThrough();
        spyOn(SeiHlsSource.prototype, 'start').and.returnValue(true);
    });

    afterEach(() => {
        if (instance) {
            instance.remove();
            instance = null;
        }
        container.remove();
    });

    function create(overrides = {}) {
        return videoMap({ container, url: 'video.mp4', opencv: {}, videoParameters: parameters, ...overrides });
    }

    async function ready(overrides = {}) {
        instance = create(overrides);
        events.fire('canplay');
        await Promise.resolve();
        return instance;
    }

    it('shares the existing MapboxGL time and geometry algorithms', () => {
        expect(sharedPose).toBe(mapboxPose);
        expect(sharedGeometry).toBe(mapboxGeometry);
    });

    it('validates inputs before creating a map or player', () => {
        expect(() => new VideoMap({})).toThrowError('url, videoParameters and opencv must be set');
        expect(() => create({ videoParameters: [] })).toThrowError('videoParameters must contain ordered video times');
        expect(() => create({ videoParameters: parameters.slice().reverse() })).toThrowError('videoParameters must contain ordered video times');
        expect(() => create({ interval: 0 })).toThrowError('interval must be greater than zero');
        ['sei', 'videoParameters', null].forEach((parametersSource) => {
            expect(() => create({ parametersSource })).toThrowError('parametersSource must be "custom" or "SEI".');
        });
        expect(VideoLayerRenderer.prototype.createVideo).not.toHaveBeenCalled();
    });

    it('displays the original video in pixel coordinates and emits load after camera initialization', async () => {
        instance = create();
        var load = jasmine.createSpy('load');
        instance.on('load', load);
        events.fire('canplay');
        await Promise.resolve();
        expect(instance._videoOverlay.getElement()).toBe(element);
        expect(instance.map.options.crs).toBe(L.CRS.Simple);
        expect(instance._videoBounds.getNorthEast()).toEqual(L.latLng(180, 320));
        expect(load).toHaveBeenCalled();
    });

    it('moves geographic vectors with time while preserving the original coordinates and properties', async () => {
        await ready();
        var original = JSON.stringify(data);
        var layer = instance.addGeoJSON(data, { pointToLayer: (feature, latlng) => L.circleMarker(latlng) });
        expect(layer.getLayers()[0].getLatLng().equals(L.latLng(90, 160))).toBe(true);
        instance.updateAtTime(5);
        expect(layer.getLayers()[0].getLatLng().equals(L.latLng(90, 110))).toBe(true);
        expect(layer.getLayers()[0].feature.properties.name).toBe('landmark');
        expect(JSON.stringify(data)).toBe(original);
    });

    it('accepts data before readiness and clips features outside the camera view', async () => {
        instance = create();
        var layer = instance.addGeoJSON(data);
        expect(layer.getLayers().length).toBe(0);
        events.fire('canplay');
        await Promise.resolve();
        expect(layer.getLayers().length).toBe(1);
        var hidden = instance.addGeoJSON({ type: 'Point', coordinates: [50, 0] });
        expect(hidden.getLayers().length).toBe(0);
    });

    it('clamps camera poses to endpoints and updates a seek immediately while paused', async () => {
        await ready();
        var layer = instance.addGeoJSON(data);
        instance.updateAtTime(50);
        expect(layer.getLayers()[0].getLatLng().lng).toBe(60);
        instance.pause();
        time = 2;
        events.fire('seeked');
        expect(instance.currentTime).toBe(2);
        expect(layer.getLayers()[0].getLatLng().lng).toBe(140);
        instance.updateAtTime(-1);
        expect(layer.getLayers()[0].getLatLng().lng).toBe(160);
    });

    it('throttles decoded-frame updates but handles loop playback immediately', async () => {
        await ready();
        spyOn(instance, 'updateAtTime').and.callThrough();
        element.requestVideoFrameCallback.calls.mostRecent().args[0](0, { mediaTime: 0.05 });
        expect(instance.updateAtTime).not.toHaveBeenCalled();
        element.requestVideoFrameCallback.calls.mostRecent().args[0](0, { mediaTime: 0.2 });
        expect(instance.updateAtTime).toHaveBeenCalledWith(0.2);
        element.requestVideoFrameCallback.calls.mostRecent().args[0](0, { mediaTime: 0.01 });
        expect(instance.updateAtTime).toHaveBeenCalledWith(0.01);
    });

    it('updates an open property popup with its geographic anchor', async () => {
        await ready();
        instance.addGeoJSON(data);
        instance.openPopup('landmark', L.latLng(0, 0), { autoPan: false });
        var popup = instance._popup;
        instance.updateAtTime(5);
        expect(instance._popup).toBe(popup);
        expect(instance.map.hasLayer(popup)).toBe(true);
        expect(popup.getLatLng().equals(L.latLng(90, 110))).toBe(true);
        expect(popup.getContent()).toBe('landmark');
    });

    it('converts container pixels back to the ground coordinate', async () => {
        await ready();
        var pixel = instance.project(L.latLng(0, 0));
        var location = instance.unproject(pixel);
        var world = proj4('EPSG:4326', 'EPSG:3857', [location.lng, location.lat]);
        expect(world[0]).toBeCloseTo(0, 5);
        expect(world[1]).toBeCloseTo(0, 5);
    });

    it('emits geographic map events without changing the native map coordinates', async () => {
        var location = L.latLng(30.493, 104.068);
        var world = proj4('EPSG:4326', 'EPSG:3857', [location.lng, location.lat]);
        await ready({ videoParameters: { ...pose, x: world[0], y: world[1] } });
        var listener = jasmine.createSpy('geographic click');
        var nativeListener = jasmine.createSpy('native click');
        instance.on('click', listener);
        instance.map.on('click', nativeListener);
        var point = instance.project(location);
        var raw = { latlng: instance.map.containerPointToLatLng(point), containerPoint: point, originalEvent: new MouseEvent('click') };
        instance.map.fire('click', raw);
        var event = listener.calls.mostRecent().args[0];
        expect(event.latlng.lat).toBeCloseTo(location.lat, 7);
        expect(event.latlng.lng).toBeCloseTo(location.lng, 7);
        expect(event.spatialPoint[0]).toBeCloseTo(world[0], 5);
        expect(event.spatialPoint[1]).toBeCloseTo(world[1], 5);
        expect(event.containerPoint).toBe(point);
        expect(event.originalEvent).toBe(raw.originalEvent);
        expect(event.target).toBe(instance);
        expect(event.mapEvent).toBe(nativeListener.calls.mostRecent().args[0]);
        expect(event.mapEvent.latlng).toBe(raw.latlng);
        expect(raw.latlng.equals(L.latLng(90, 160))).toBe(true);
    });

    it('uses the current camera and map transform for geographic pointer events', async () => {
        await ready();
        instance.updateAtTime(5);
        instance.map.setView([120, 190], 0.5);
        var listener = jasmine.createSpy('geographic move');
        instance.on('mousemove contextmenu dblclick', listener);
        var pixel = L.latLng(90, 160);
        var point = instance.map.latLngToAccurateContainerPoint(pixel);
        var expected = proj4('EPSG:3857', 'EPSG:4326', [50, 0]);
        ['mousemove', 'contextmenu', 'dblclick'].forEach((type) => {
            instance.map.fire(type, { latlng: pixel, containerPoint: point, originalEvent: new MouseEvent(type) });
            var event = listener.calls.mostRecent().args[0];
            expect(event.latlng.lng).toBeCloseTo(expected[0], 7);
            expect(event.latlng.lat).toBeCloseTo(expected[1], 7);
            expect(instance.project(event.latlng).distanceTo(point)).toBeLessThan(0.00001);
        });
    });

    it('preserves Leaflet once, event maps, off and listener contexts', async () => {
        await ready();
        var context = {};
        var once = jasmine.createSpy('once');
        var retained = jasmine.createSpy('retained');
        instance.once('click', once, context);
        instance.on({ click: retained, mousemove: retained }, context);
        instance.off('click', retained, context);
        instance.map.fire('click', { latlng: L.latLng(90, 160) });
        instance.map.fire('click', { latlng: L.latLng(90, 160) });
        instance.map.fire('mousemove', { latlng: L.latLng(90, 160) });
        expect(once.calls.count()).toBe(1);
        expect(once.calls.mostRecent().object).toBe(context);
        expect(retained.calls.count()).toBe(1);
        expect(retained.calls.mostRecent().object).toBe(context);
        instance.off();
        instance.map.fire('mousemove', { latlng: L.latLng(90, 160) });
        expect(retained.calls.count()).toBe(1);
    });

    it('avoids camera calculations for map events without subscribers', async () => {
        await ready();
        CoordTransfer.prototype.toSpatialCoordinate.calls.reset();
        instance.map.fire('mousemove', { latlng: L.latLng(90, 160) });
        expect(CoordTransfer.prototype.toSpatialCoordinate).not.toHaveBeenCalled();
        var move = jasmine.createSpy('move');
        instance.on('moveend dragstart drag dragend', move);
        ['moveend', 'dragstart', 'drag', 'dragend'].forEach((type) => instance.map.fire(type));
        expect(move.calls.count()).toBe(4);
        expect(CoordTransfer.prototype.toSpatialCoordinate).not.toHaveBeenCalled();
    });

    it('does not expose pixel coordinates as geography before calibration or after reconnect', async () => {
        instance = create({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined });
        var listener = jasmine.createSpy('click');
        instance.on('click', listener);
        var raw = { latlng: L.latLng(90, 160) };
        instance.map.fire('click', raw);
        expect(listener.calls.mostRecent().args[0].latlng).toBeNull();
        expect(listener.calls.mostRecent().args[0].spatialPoint).toBeNull();
        events.fire('canplay');
        instance.getSeiTimeline().push(parameters);
        await Promise.resolve();
        instance.map.fire('click', raw);
        expect(listener.calls.mostRecent().args[0].latlng.equals(L.latLng(0, 0))).toBe(true);
        instance._sei.source.onReconnect();
        instance.map.fire('click', raw);
        expect(listener.calls.mostRecent().args[0].latlng).toBeNull();
        expect(raw.latlng.equals(L.latLng(90, 160))).toBe(true);
    });

    it('returns null event coordinates when the camera cannot intersect the ground', async () => {
        await ready();
        CoordTransfer.prototype.toSpatialCoordinate.and.returnValue([NaN, Infinity, 0]);
        var listener = jasmine.createSpy('click');
        instance.on('click', listener);
        expect(() => instance.map.fire('click', { latlng: L.latLng(90, 160) })).not.toThrow();
        expect(listener.calls.mostRecent().args[0].latlng).toBeNull();
        expect(listener.calls.mostRecent().args[0].spatialPoint).toBeNull();
        expect(instance.unproject([200, 150])).toBeNull();
    });

    it('emits geographic GeoJSON clicks and anchors popups through camera updates', async () => {
        await ready();
        var layer = instance.addGeoJSON(data, { pointToLayer: (feature, latlng) => L.circleMarker(latlng) });
        var listener = jasmine.createSpy('feature click');
        layer.on('click', listener);
        expect(layer instanceof L.GeoJSON).toBe(true);
        [0, 5].forEach((time) => {
            instance.updateAtTime(time);
            var child = layer.getLayers()[0];
            var raw = { latlng: child.getLatLng(), containerPoint: instance.map.latLngToAccurateContainerPoint(child.getLatLng()) };
            var nativeListener = jasmine.createSpy('native feature click');
            child.on('click', nativeListener);
            child.fire('click', raw, true);
            var event = listener.calls.mostRecent().args[0];
            expect(event.latlng.equals(L.latLng(0, 0))).toBe(true);
            expect(event.layer).toBe(child);
            expect(event.target).toBe(layer);
            expect(event.mapEvent.latlng).toBe(raw.latlng);
            expect(nativeListener.calls.mostRecent().args[0].latlng).toBe(raw.latlng);
            instance.openPopup('feature', event.latlng, { autoPan: false });
            expect(instance._popupAnchor.equals(L.latLng(0, 0))).toBe(true);
            expect(instance._popup.getLatLng().equals(child.getLatLng())).toBe(true);
        });
    });

    it('keeps camera load semantics and detaches the owned map event bridge on removal', async () => {
        await ready();
        var load = jasmine.createSpy('load');
        var click = jasmine.createSpy('click');
        var unload = jasmine.createSpy('unload');
        var nativeClick = jasmine.createSpy('native click');
        instance.on('load', load).on('click', click).on('unload', unload);
        instance.map.on('click', nativeClick);
        instance.map.fire('load');
        expect(load).not.toHaveBeenCalled();
        var map = instance.map;
        instance.remove();
        expect(unload.calls.count()).toBe(1);
        map.fire('click', { latlng: L.latLng(90, 160) });
        expect(click).not.toHaveBeenCalled();
        expect(nativeClick).toHaveBeenCalled();
    });

    it('preserves explicitly supplied coordinates when a GeoJSON event is fired manually', async () => {
        await ready();
        var layer = instance.addGeoJSON(data, { pointToLayer: (feature, latlng) => L.circleMarker(latlng) });
        var listener = jasmine.createSpy('manual click');
        var location = L.latLng(30.493, 104.068);
        layer.once('click', listener);
        layer.fire('click', { latlng: location });
        expect(listener.calls.mostRecent().args[0].latlng).toBe(location);
        expect(listener.calls.mostRecent().args[0].mapEvent).toBeUndefined();
    });

    it('cancels fallback animation frames and disposes all owned resources', async () => {
        element.requestVideoFrameCallback = undefined;
        spyOn(window, 'requestAnimationFrame').and.returnValue(42);
        spyOn(window, 'cancelAnimationFrame');
        await ready();
        instance.pause();
        expect(window.cancelAnimationFrame).toHaveBeenCalledWith(42);
        instance.remove();
        instance.remove();
        expect(player.dispose.calls.count()).toBe(1);
        expect(CoordTransfer.prototype.dispose).toHaveBeenCalled();
        expect(container.querySelector('.leaflet-map-pane')).toBeNull();
    });

    it('shows original SEI video before parameters arrive and defers geographic data until calibration', async () => {
        instance = create({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined });
        var load = jasmine.createSpy('load');
        var ready = jasmine.createSpy('videoparameterready');
        instance.on('load', load).on('videoparameterready', ready);
        var layer = instance.addGeoJSON(data);
        events.fire('canplay');
        expect(load.calls.count()).toBe(1);
        expect(instance.isParametersReady()).toBe(false);
        expect(layer.getLayers().length).toBe(0);
        expect(instance._renderer.options.url).toBeUndefined();
        expect(instance._renderer.options.loop).toBe(false);
        expect(instance.unproject([100, 100])).toBeNull();
        instance.getSeiTimeline().push(parameters);
        await Promise.resolve();
        expect(instance.isParametersReady()).toBe(true);
        expect(layer.getLayers().length).toBe(1);
        expect(ready.calls.count()).toBe(1);
        expect(load.calls.count()).toBe(1);
    });

    it('uses live SEI poses and applies offset changes immediately while paused', async () => {
        await ready({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined });
        instance.getSeiTimeline().push(parameters);
        await Promise.resolve();
        var layer = instance.addGeoJSON(data);
        instance.pause();
        instance.setSeiOffset(5);
        expect(instance.coordTransfer._x).toBe(50);
        expect(layer.getLayers()[0].getLatLng().lng).toBe(110);
        instance.getSeiTimeline().setMediaOffset(1);
        expect(instance.coordTransfer._x).toBe(60);
        expect(instance.getVideoElement()).toBe(element);
    });

    it('clears stale vectors on reconnect and restores them only after new SEI arrives', async () => {
        await ready({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined });
        instance.getSeiTimeline().push(parameters);
        await Promise.resolve();
        var layer = instance.addGeoJSON(data);
        instance.openPopup('landmark', [0, 0]);
        var camera = instance.coordTransfer;
        instance._sei.source.onReconnect();
        expect(instance.isParametersReady()).toBe(false);
        expect(layer.getLayers().length).toBe(0);
        expect(instance._popup).toBeNull();
        expect(instance.coordTransfer).toBeNull();
        expect(instance._frameId).toBeUndefined();
        instance.getSeiTimeline().push(parameters);
        await Promise.resolve();
        expect(layer.getLayers().length).toBe(1);
        expect(instance.coordTransfer).not.toBe(camera);
        var source = instance._sei.source;
        instance.remove();
        expect(source._destroyed).toBe(true);
        expect(instance.getSeiTimeline().size).toBe(0);
    });

    it('does not resume after removal while OpenCV initialization is pending', async () => {
        var finish;
        CoordTransfer.prototype.init.and.callFake(function () { return new Promise((resolve) => { finish = () => resolve(this); }); });
        instance = create();
        var load = jasmine.createSpy('load');
        instance.on('load', load);
        events.fire('canplay');
        instance.remove();
        finish();
        await Promise.resolve();
        expect(load).not.toHaveBeenCalled();
        expect(instance._frameId).toBeUndefined();
        expect(CoordTransfer.prototype.dispose).toHaveBeenCalled();
    });

    it('supports manual SEI transport, source projection and constructor offset without HLS', async () => {
        instance = create({ parametersSource: 'SEI', videoParameters: undefined, seiProjection: 'EPSG:4326', seiOffset: 2 });
        events.fire('canplay');
        var added = instance.pushSeiParameters({ ...pose, x: 104, y: 30, time: 0 });
        await Promise.resolve();
        var expected = proj4('EPSG:4326', 'EPSG:3857', [104, 30]);
        expect(added.length).toBe(1);
        expect(instance.coordTransfer._x).toBeCloseTo(expected[0], 6);
        expect(instance.seiOffset).toBe(2);
        expect(instance.getHls()).toBeNull();
        expect(SeiHlsSource.prototype.start).not.toHaveBeenCalled();
        instance.setSeiOffset('1.5');
        expect(instance.seiOffset).toBe(1.5);
        instance.setSeiOffset(NaN);
        expect(instance.seiOffset).toBe(0);
    });

    it('forwards custom parser samples, coalesces fragment updates and limits invalid notifications', () => {
        instance = create({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined, seiParser: (sample) => sample.bad ? null : pose });
        var sei = jasmine.createSpy('videoparametersei');
        var invalid = jasmine.createSpy('seiinvalid');
        instance.on('videoparametersei', sei).on('seiinvalid', invalid);
        spyOn(instance, '_onSeiUpdate').and.callThrough();
        var fragment = { frag: { sn: 1, start: 0, duration: 1 }, samples: [{ pts: 0 }, { pts: 0.1 }] };
        instance._sei.source.onUserData(fragment);
        expect(instance._onSeiUpdate.calls.count()).toBe(1);
        expect(sei.calls.mostRecent().args[0].samples).toBe(fragment.samples);
        expect(sei.calls.mostRecent().args[0].poses.length).toBe(2);
        instance._sei.source.onUserData({ frag: { sn: 2, start: 1 }, samples: [{ pts: 1, bad: true }, { pts: 1.1, bad: true }] });
        expect(invalid.calls.count()).toBe(1);
    });

    it('rebuilds HLS sessions without accepting old callbacks and keeps manual transport after unbinding', async () => {
        await ready({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined });
        instance.getSeiTimeline().push(parameters);
        await Promise.resolve();
        var source = instance._sei.source;
        instance.restartHls();
        expect(source._destroyed).toBe(true);
        expect(instance.isParametersReady()).toBe(false);
        expect(instance.getSeiTimeline().size).toBe(0);
        source.onUserData({ samples: [{ pts: 0, userData: '{}' }] });
        expect(instance.getSeiTimeline().size).toBe(0);
        instance.unbindHls();
        expect(instance.getHls()).toBeNull();
        expect(instance.pushSeiParameters({ ...pose, x: 1000, y: 2000, time: 0 }).length).toBe(1);
        await Promise.resolve();
        expect(instance.isParametersReady()).toBe(true);
    });

    it('preserves original video playback when HLS SEI capability is unavailable', () => {
        spyOn(Hls, 'isSupported').and.returnValue(false);
        spyOn(console, 'warn');
        instance = create({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined });
        expect(instance._renderer.options.url).toBe('live.m3u8');
        expect(instance.getHls()).toBeNull();
        expect(instance.isParametersReady()).toBe(false);
        expect(console.warn).toHaveBeenCalled();
    });

    it('does not activate an obsolete camera when SEI reconnects during OpenCV initialization', async () => {
        var finish = [];
        CoordTransfer.prototype.init.and.callFake(function () {
            return new Promise((resolve) => finish.push(() => resolve(this)));
        });
        instance = create({ url: 'live.m3u8', parametersSource: 'SEI', videoParameters: undefined });
        events.fire('canplay');
        instance.getSeiTimeline().push(parameters[0]);
        instance._sei.source.onReconnect();
        instance.getSeiTimeline().push({ ...parameters[0], x: 200 });
        finish[0]();
        await Promise.resolve();
        expect(instance.isParametersReady()).toBe(false);
        finish[1]();
        await Promise.resolve();
        expect(instance.isParametersReady()).toBe(true);
        expect(instance.coordTransfer._x).toBe(200);
    });

    it('releases an external video adapter without destroying its owned video element', async () => {
        VideoLayerRenderer.prototype.createVideo.and.callThrough();
        Object.defineProperty(element, 'videoWidth', { value: 320 });
        Object.defineProperty(element, 'videoHeight', { value: 180 });
        Object.defineProperty(element, 'paused', { value: false });
        element.src = 'external.mp4';
        instance = create({ player: element, autoplay: false });
        element.dispatchEvent(new Event('canplay'));
        await Promise.resolve();
        expect(instance._renderer.isExternal).toBe(true);
        expect(instance.getVideoElement()).toBe(element);
        instance.destroy();
        expect(element.src).toContain('external.mp4');
        expect(instance.isParametersReady()).toBe(false);
        expect(element.cancelVideoFrameCallback).toHaveBeenCalled();
    });
});
