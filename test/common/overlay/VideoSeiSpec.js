import { SeiPoseTimeline } from '../../../src/common/overlay/video/SeiPoseTimeline';
import { SeiPoseTimeline as MapboxTimeline } from '../../../src/mapboxgl/mapping/utils/SeiPoseTimeline';
import { SeiHlsSource, SEI_HLS_EVENTS } from '../../../src/common/overlay/video/SeiHlsSource';
import { SeiHlsSource as MapboxSource } from '../../../src/mapboxgl/mapping/utils/SeiHlsSource';
import { parseSeiSample } from '../../../src/common/overlay/video/seiParser';
import mapboxParser from '../../../src/mapboxgl/mapping/utils/seiParser';
import { VideoSei } from '../../../src/common/overlay/video/VideoSei';
import Hls from 'hls.js';

describe('common video SEI modules', () => {
    const pose = { x: 11584819, y: 3567101, z: 109, pitch: -89.9, roll: 0, yaw: -93, fovX: 76, fovY: 48, centerX: 960, centerY: 540 };
    function sample(pts, fields = {}) { return { pts, userData: JSON.stringify({ ...pose, ...fields }) }; }

    it('preserves MapboxGL module identities after sharing SEI with Leaflet', () => {
        expect(MapboxTimeline).toBe(SeiPoseTimeline);
        expect(MapboxSource).toBe(SeiHlsSource);
        expect(mapboxParser).toBe(parseSeiSample);
    });

    it('normalizes geographic extent and keeps the video clipping coordinates in pixels', () => {
        const parsed = parseSeiSample(sample(0, {
            extent: [{ x: 11584800, y: 3567000 }, { x: 11584900, y: 3567000 }, { x: 11584900, y: 3567100 }],
            clipRegion: [[0, 0], [1920, 0], [1920, 1080], [0, 1080], [0, 0]]
        }));
        expect(parsed.x).toBe(pose.x);
        expect(parsed.extent[0][0]).toBeGreaterThan(104);
        expect(parsed.extent[0][0]).toBeLessThan(105);
        expect(parsed.clipRegion).toEqual([[0, 0], [1920, 0], [1920, 1080], [0, 1080]]);
    });

    it('deduplicates fragments and calibrates PTS against the actual MSE buffer origin', () => {
        const timeline = new SeiPoseTimeline();
        const fragment = { frag: { sn: 0, start: 100, duration: 1 }, samples: [sample(100), sample(100.1)] };
        expect(timeline.ingest(fragment).length).toBe(2);
        expect(timeline.ingest(fragment).length).toBe(0);
        expect(timeline.calibrate(0)).toBe(true);
        expect(timeline.snapshot().mediaOffset).toBe(100);
        expect(timeline.resolve(0.05).ratio).toBeCloseTo(0.5, 6);
        expect(timeline.sliceAround(0)[0].time).toBe(0);
    });

    it('reports invalid samples and bounds the timeline without dropping the newest poses', () => {
        const timeline = new SeiPoseTimeline({ maxEntries: 3 });
        const invalid = jasmine.createSpy('invalid');
        timeline.on('invalid', invalid);
        timeline.ingest({ frag: { sn: 1, start: 0 }, samples: [{ pts: 0, userData: 'invalid' }] });
        expect(invalid).toHaveBeenCalled();
        timeline.push([0, 1, 2, 3].map((time) => ({ ...pose, time })));
        expect(timeline.size).toBe(3);
        expect(timeline.snapshot().first).toBe(1);
        expect(timeline.snapshot().last).toBe(3);
        timeline.clear();
        expect(timeline.size).toBe(0);
        expect(timeline.calibrated).toBe(false);
    });

    it('retains the branch timing rules for missing PTS and raw 90kHz PTS', () => {
        const timeline = new SeiPoseTimeline();
        timeline.ingest({ frag: { sn: 0, start: 10, duration: 2 }, samples: [sample(undefined), sample(undefined)] });
        expect(timeline.poses().map((item) => item.time)).toEqual([10.5, 11.5]);
        timeline.ingest({ frag: { sn: 1, start: 20, duration: 1 }, samples: [sample(1800000), sample(1809000)] });
        expect(timeline.poses()[2].time).toBe(20);
        expect(timeline.poses()[3].time).toBeCloseTo(20.1, 6);
    });

    it('owns one HLS instance, forwards SEI and releases all listeners on destruction', () => {
        const handlers = {};
        const video = { buffered: { length: 1, end: () => 12 }, currentTime: 10 };
        const hls = {
            on: (name, handler) => { handlers[name] = handler; },
            off: jasmine.createSpy('off'),
            attachMedia: jasmine.createSpy('attachMedia'),
            loadSource: jasmine.createSpy('loadSource'),
            destroy: jasmine.createSpy('destroy')
        };
        const onUserData = jasmine.createSpy('onUserData');
        const source = new SeiHlsSource({ url: 'live.m3u8', getVideoElement: () => video, onUserData });
        source._createInstance = () => hls;
        expect(source.start()).toBe(true);
        expect(source.getHls()).toBe(hls);
        expect(hls.attachMedia).toHaveBeenCalledWith(video);
        expect(hls.loadSource).toHaveBeenCalledWith('live.m3u8');
        const data = { samples: [sample(0)] };
        handlers[SEI_HLS_EVENTS.FRAG_PARSING_USERDATA]('event', data);
        expect(onUserData).toHaveBeenCalledWith(data);
        expect(source.getLiveSyncPosition()).toBe(11.5);
        expect(source.getLatency()).toBe(2);
        source.destroy();
        source.destroy();
        expect(hls.off.calls.count()).toBe(5);
        expect(hls.destroy.calls.count()).toBe(1);
    });

    it('recovers network and media errors and cancels scheduled reconnection on destruction', () => {
        jasmine.clock().install();
        const hls = {
            on: () => {}, off: () => {}, attachMedia: () => {}, loadSource: () => {},
            startLoad: jasmine.createSpy('startLoad'), recoverMediaError: jasmine.createSpy('recoverMediaError'), destroy: jasmine.createSpy('destroy')
        };
        const source = new SeiHlsSource({ url: 'live.m3u8', getVideoElement: () => ({}) });
        const create = source._createInstance = jasmine.createSpy('create').and.returnValue(hls);
        try {
            source.start();
            source._handleError({ fatal: true, type: 'networkError' });
            source._handleError({ fatal: true, type: 'mediaError' });
            expect(hls.startLoad).toHaveBeenCalled();
            expect(hls.recoverMediaError).toHaveBeenCalled();
            source._handleError({ fatal: true, type: 'otherError' });
            source.destroy();
            jasmine.clock().tick(2000);
            expect(create.calls.count()).toBe(1);
        } finally {
            source.destroy();
            jasmine.clock().uninstall();
        }
    });
});

describe('common VideoSei session', () => {
    const pose = { x: 11584819, y: 3567101, z: 109, pitch: -89.9, roll: 0, yaw: -93, fovX: 76, fovY: 48, centerX: 960, centerY: 540, time: 0 };
    const fragment = { frag: { sn: 1, start: 100, duration: 1 }, samples: [{ pts: 100 }, { pts: 100.1 }] };
    let sessions, video, callbacks;

    beforeEach(() => {
        sessions = [];
        video = document.createElement('video');
        Object.defineProperty(video, 'readyState', { value: 2, configurable: true });
        Object.defineProperty(video, 'buffered', { value: { length: 1, start: () => 0, end: () => 12 } });
        video.play = jasmine.createSpy('native play').and.returnValue(Promise.resolve());
        callbacks = {
            getVideoElement: () => video,
            getVideoSize: () => ({ videoWidth: 1920, videoHeight: 1080 }),
            emit: jasmine.createSpy('emit'),
            onData: jasmine.createSpy('data'),
            onUpdate: jasmine.createSpy('update'),
            onReset: jasmine.createSpy('reset'),
            onCalibrate: jasmine.createSpy('calibrate')
        };
        spyOn(Hls, 'isSupported').and.returnValue(true);
        spyOn(SeiHlsSource.prototype, 'start').and.returnValue(true);
    });

    afterEach(() => sessions.forEach((session) => session.stop()));

    function create(options = {}) {
        const session = new VideoSei({ parametersSource: 'SEI', url: 'live.m3u8', seiParser: () => pose, ...options }, callbacks);
        sessions.push(session);
        return session;
    }

    it('validates the shared parameter source contract and owns an independent timeline', () => {
        const custom = create({ parametersSource: undefined });
        expect(custom.parametersSource).toBe('custom');
        expect(custom.timeline).toBeNull();
        ['sei', 'videoParameters', '', null].forEach((parametersSource) => {
            expect(() => create({ parametersSource })).toThrowError('parametersSource must be "custom" or "SEI".');
        });
        expect(() => create({ seiProjection: 'EPSG:4269' })).toThrowError(RangeError);
        const first = create();
        const second = create({ parametersTimeline: first.timeline });
        first.push(pose);
        expect(first.timeline).not.toBe(second.timeline);
        expect(second.timeline.size).toBe(0);
    });

    it('leaves ordinary playback with its player and skips SEI transport in custom mode', () => {
        const session = create({ parametersSource: 'custom' });
        const promise = Promise.resolve();
        const player = { play: jasmine.createSpy('player play').and.returnValue(promise) };
        session.start();
        expect(session.play(player)).toBe(promise);
        expect(player.play).toHaveBeenCalled();
        expect(video.play).not.toHaveBeenCalled();
        expect(session.push(pose)).toEqual([]);
        expect(session.getHls()).toBeNull();
        expect(session.getLiveSyncPosition()).toBeNull();
        expect(session.getLatency()).toBeNull();
        expect(SeiHlsSource.prototype.start).not.toHaveBeenCalled();
    });

    it('parses a fragment with its projection and dimensions, calibrates and refreshes once', () => {
        const parser = jasmine.createSpy('parser').and.returnValue(pose);
        const session = create({ seiParser: parser, seiProjection: 'EPSG:4326' });
        const added = session.handlePayload(fragment);
        expect(parser).toHaveBeenCalledWith(fragment.samples[0], jasmine.objectContaining({
            videoWidth: 1920, videoHeight: 1080, seiProjection: 'EPSG:4326'
        }));
        expect(session.timeline.mediaOffset).toBe(100);
        expect(added[0].time).toBe(0);
        expect(added[1].time).toBeCloseTo(0.1, 6);
        expect(callbacks.onCalibrate.calls.count()).toBe(1);
        expect(callbacks.onUpdate.calls.count()).toBe(1);
        expect(callbacks.onData).toHaveBeenCalledWith({ poses: added, frag: fragment.frag, samples: fragment.samples });
        expect(session.handlePayload(fragment)).toEqual([]);
        session.timeline.setMediaOffset(99);
        expect(callbacks.onCalibrate.calls.count()).toBe(2);
        expect(callbacks.onUpdate.calls.count()).toBe(3);
    });

    it('normalizes manual poses and keeps the supplied media time', () => {
        const session = create({ url: undefined, seiProjection: 'EPSG:4326' });
        const added = session.push({ ...pose, x: 120, y: 30, time: 5 });
        expect(added[0].time).toBe(5);
        expect(added[0].x).toBeCloseTo(13358338.895192828, 5);
        expect(added[0].y).toBeCloseTo(3503549.8435043753, 5);
        expect(session.push([null, { ...pose, x: 120, y: 30, time: 5 }]).length).toBe(1);
        expect(session.timeline.size).toBe(1);
    });

    it('throttles malformed sample notifications without dropping subsequent valid poses', () => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date(0));
        try {
            const session = create({ seiParser: (sample) => sample.valid ? pose : null });
            let sequence = 0;
            const invalid = () => session.handlePayload({ frag: { sn: ++sequence, start: 0 }, samples: [{}] });
            invalid();
            jasmine.clock().tick(500);
            invalid();
            jasmine.clock().tick(500);
            invalid();
            expect(callbacks.emit.calls.allArgs().filter((args) => args[0] === 'seiinvalid').length).toBe(2);
            expect(session.handlePayload({ frag: { sn: ++sequence, start: 0 }, samples: [{ valid: true }] }).length).toBe(1);
        } finally {
            jasmine.clock().uninstall();
        }
    });

    it('restarts once, discards obsolete callbacks and accepts manual poses after unbinding', () => {
        const session = create();
        session.start();
        session.start();
        const source = session.source;
        source.onUserData(fragment);
        expect(session.timeline.size).toBe(2);
        expect(session.getLiveSyncPosition()).toBe(11.5);
        expect(session.getLatency()).toBe(12);
        session.restart();
        expect(source._destroyed).toBe(true);
        expect(session.source).not.toBe(source);
        expect(SeiHlsSource.prototype.start.calls.count()).toBe(2);
        expect(session.timeline.size).toBe(0);
        expect(session.timeline.calibrated).toBe(false);
        callbacks.emit.calls.reset();
        source.onUserData(fragment);
        source.onManifestParsed();
        source.onError({ type: 'networkError' });
        expect(session.timeline.size).toBe(0);
        expect(callbacks.emit).not.toHaveBeenCalled();
        session.unbindHls();
        session.restart();
        expect(SeiHlsSource.prototype.start.calls.count()).toBe(2);
        expect(session.push(pose).length).toBe(1);
    });

    it('detaches all timeline listeners on stop and restores one subscription when readded', () => {
        const session = create();
        session.start();
        const source = session.source;
        session.stop();
        expect(session.handlePayload(fragment)).toEqual([]);
        expect(session.push(pose)).toEqual([]);
        source.onUserData(fragment);
        session.timeline.push(pose);
        expect(callbacks.onUpdate).not.toHaveBeenCalled();
        session.timeline.clear();
        session.start();
        session.push(pose);
        expect(callbacks.onUpdate.calls.count()).toBe(1);
        expect(session.timeline._listeners.add.length).toBe(1);
        session.stop();
        expect(session.timeline.size).toBe(0);
    });

    it('cancels deferred autoplay and uses the native element for HLS-owned playback', () => {
        Object.defineProperty(video, 'readyState', { value: 0 });
        const session = create();
        session.start();
        session.source.onMediaAttached();
        session.unbindHls();
        video.dispatchEvent(new Event('canplay'));
        expect(video.play).not.toHaveBeenCalled();
        session.start();
        session.source.onMediaAttached();
        video.dispatchEvent(new Event('canplay'));
        expect(video.play.calls.count()).toBe(1);
        const player = { play: jasmine.createSpy('player play') };
        expect(session.play(player)).toBe(video.play.calls.mostRecent().returnValue);
        expect(player.play).not.toHaveBeenCalled();
    });

    it('retries blocked autoplay muted once and leaves AbortError alone', async () => {
        const session = create();
        session.start();
        video.play.and.returnValues(Promise.reject({ name: 'NotAllowedError' }), Promise.resolve());
        session.source.onMediaAttached();
        await Promise.resolve();
        expect(video.muted).toBe(true);
        expect(video.play.calls.count()).toBe(2);
        video.muted = false;
        video.play.calls.reset();
        video.play.and.returnValue(Promise.reject({ name: 'AbortError' }));
        session.source.onMediaAttached();
        await Promise.resolve();
        expect(video.muted).toBe(false);
        expect(video.play.calls.count()).toBe(1);
    });

    it('honors autoplay false and reports HLS failures with their original error type', () => {
        const session = create({ autoplay: false });
        session.start();
        session.source.onMediaAttached();
        expect(video.play).not.toHaveBeenCalled();
        const error = { type: 'networkError', fatal: true, details: 'manifestLoadError' };
        session.source.onError(error);
        expect(callbacks.emit).toHaveBeenCalledWith('seistreamerror', { ...error, data: error, hlsType: error.type });
    });
});
