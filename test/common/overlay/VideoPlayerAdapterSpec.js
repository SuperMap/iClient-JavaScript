import { VideoPlayerAdapter, getVideoElement } from '../../../src/common/overlay/video/VideoPlayerAdapter';
import { VideoLayerRenderer } from '../../../src/common/overlay/video/VideoLayerRenderer';
import { createVideoElement, createVideojsPlayer } from '../../tool/VideoPlayerMock';

describe('common video player lifecycle', () => {
    it('resolves native media through video.js tech instead of its wrapper', () => {
        const external = createVideojsPlayer();
        const adapter = VideoPlayerAdapter.wrap(external.player);
        expect(getVideoElement(external.player)).toBe(external.video);
        expect(adapter.el()).toBe(external.video);
        expect(adapter.tech().el()).toBe(external.video);
        expect(adapter.el_).toBe(external.wrapper);
        const replacement = createVideoElement();
        external.player.tech.and.returnValue({ el: () => replacement });
        expect(adapter.el()).toBe(replacement);
        external.player.tech.and.returnValue(null);
        expect(adapter.el()).toBeNull();
        expect(getVideoElement(external.wrapper)).toBeNull();
    });

    it('removes adapter subscriptions without disposing the external video.js player', () => {
        const external = createVideojsPlayer();
        const adapter = VideoPlayerAdapter.wrap(external.player);
        const play = jasmine.createSpy('play');
        const ready = jasmine.createSpy('canplay');
        adapter.on('play', play).one('canplay', ready);
        external.events.dispatchEvent(new Event('play'));
        expect(play.calls.count()).toBe(1);
        adapter.dispose();
        external.events.dispatchEvent(new Event('play'));
        external.events.dispatchEvent(new Event('canplay'));
        expect(play.calls.count()).toBe(1);
        expect(ready).not.toHaveBeenCalled();
        expect(external.player.dispose).not.toHaveBeenCalled();
    });

    it('removes pending one-time listeners from externally owned native media', () => {
        const video = createVideoElement();
        const adapter = VideoPlayerAdapter.wrap(video);
        const ready = jasmine.createSpy('canplay');
        adapter.one('canplay', ready);
        adapter.dispose();
        video.dispatchEvent(new Event('canplay'));
        expect(ready).not.toHaveBeenCalled();
    });

    it('preserves the original media error for native and video.js players', () => {
        const video = createVideoElement();
        const error = { code: 2, message: 'network failure' };
        Object.defineProperty(video, 'error', { value: error });
        expect(VideoPlayerAdapter.wrap(video).error()).toBe(error);
        const external = createVideojsPlayer();
        external.player.error = () => error;
        expect(VideoPlayerAdapter.wrap(external.player).error()).toBe(error);
    });

    [false, true].forEach((useVideojs) => {
        it('initializes preloaded media asynchronously and once: videojs=' + useVideojs, async () => {
            const video = createVideoElement();
            const external = createVideojsPlayer(video);
            const renderer = new VideoLayerRenderer({ player: useVideojs ? external.player : video });
            renderer.createVideo();
            const ready = jasmine.createSpy('ready');
            renderer.onVideoReady(ready);
            expect(ready).not.toHaveBeenCalled();
            await Promise.resolve();
            video.dispatchEvent(new Event('canplay'));
            external.events.dispatchEvent(new Event('canplay'));
            expect(ready.calls.count()).toBe(1);
            renderer.video.dispose();
        });
    });

    it('waits for canplay and cancels both queued and future readiness callbacks', async () => {
        const video = createVideoElement(320, 180, 0);
        const renderer = new VideoLayerRenderer({ player: video });
        renderer.createVideo();
        const ready = jasmine.createSpy('ready');
        renderer.onVideoReady(ready);
        await Promise.resolve();
        expect(ready).not.toHaveBeenCalled();
        Object.defineProperty(video, 'readyState', { value: 4 });
        video.dispatchEvent(new Event('canplay'));
        expect(ready.calls.count()).toBe(1);
        const cancelled = jasmine.createSpy('cancelled');
        renderer.onVideoReady(cancelled)();
        await Promise.resolve();
        video.dispatchEvent(new Event('canplay'));
        expect(cancelled).not.toHaveBeenCalled();
        renderer.video.dispose();
    });

    it('keeps waiting when canplay arrives before usable video dimensions', async () => {
        const video = createVideoElement(0, 0);
        const renderer = new VideoLayerRenderer({ player: video });
        renderer.createVideo();
        const ready = jasmine.createSpy('ready');
        renderer.onVideoReady(ready);
        await Promise.resolve();
        video.dispatchEvent(new Event('canplay'));
        expect(ready).not.toHaveBeenCalled();
        Object.defineProperty(video, 'videoWidth', { value: 320 });
        Object.defineProperty(video, 'videoHeight', { value: 180 });
        video.dispatchEvent(new Event('canplay'));
        expect(ready.calls.count()).toBe(1);
        renderer.video.dispose();
    });
});
