import L from 'leaflet';
import { VideoMap } from '../../src/leaflet/mapping/VideoMap';
import { VideoLayer } from '../../src/leaflet/overlay/VideoLayer';
import { VideoFrameProcessor } from '../../src/common/overlay/video/VideoFrameProcessor';
import CoordTransfer from '../../src/common/overlay/video/CoordTransfer';
import { createVideoElement, createVideojsPlayer } from '../tool/VideoPlayerMock';

describe('leaflet video player lifecycle', () => {
    let container, map, owner;
    const pose = { pitch: 90, roll: 0, yaw: 0, x: 1000, y: 1000, z: 100, fovX: 90, fovY: 90, centerX: 160, centerY: 90 };
    const extent = [[0, 0], [0.01, 0], [0.01, 0.01], [0, 0.01]];

    beforeEach(() => {
        container = document.createElement('div');
        container.style.cssText = 'width:400px;height:300px';
        document.body.appendChild(container);
        spyOn(CoordTransfer.prototype, 'init').and.callFake(function () { return Promise.resolve(this); });
        spyOn(CoordTransfer.prototype, 'setCameraLocation');
        spyOn(VideoFrameProcessor.prototype, 'init').and.callFake(function () {
            this.width = this.height = 16;
            return Promise.resolve(this);
        });
        spyOn(VideoFrameProcessor.prototype, 'render').and.callFake((video, canvas) => {
            const context = canvas.getContext('2d');
            context.fillStyle = '#00ff00';
            context.fillRect(0, 0, canvas.width, canvas.height);
        });
        spyOn(VideoFrameProcessor.prototype, 'updateParameters');
    });

    afterEach(() => {
        if (owner) { owner.remove(); owner = null; }
        if (map) { map.remove(); map = null; }
        container.remove();
    });

    async function flush() {
        await Promise.resolve();
        await Promise.resolve();
    }

    function create(asMap, player, options = {}) {
        const config = { opencv: {}, videoParameters: pose, extent, player, autoplay: false, ...options };
        if (asMap) {
            owner = new VideoMap({ ...config, container });
        } else {
            map = L.map(container).setView([0, 0], 14);
            owner = new VideoLayer(config).addTo(map);
        }
        return owner;
    }

    [false, true].forEach((asMap) => {
        [false, true].forEach((useVideojs) => {
            it('initializes a preloaded player without another canplay: map=' + asMap + ', videojs=' + useVideojs, async () => {
                const external = createVideojsPlayer();
                const loaded = jasmine.createSpy('load');
                create(asMap, useVideojs ? external.player : external.video).on('load', loaded);
                await flush();
                expect(owner.getVideoElement()).toBe(external.video);
                expect(owner.isParametersReady()).toBe(true);
                expect(loaded.calls.count()).toBe(1);
                external.video.dispatchEvent(new Event('canplay'));
                external.events.dispatchEvent(new Event('canplay'));
                expect(loaded.calls.count()).toBe(1);
                owner.remove();
                external.events.dispatchEvent(new Event('play'));
                expect(external.player.dispose).not.toHaveBeenCalled();
            });
        });

        it('cancels a preloaded ready callback after removal: map=' + asMap, async () => {
            const loaded = jasmine.createSpy('load');
            create(asMap, createVideoElement()).on('load', loaded);
            owner.remove();
            await flush();
            expect(loaded).not.toHaveBeenCalled();
            expect(owner.isParametersReady()).toBe(false);
        });
    });

    it('clears the old SEI canvas and bounds before readding and waits for a fresh pose', async () => {
        const video = createVideoElement();
        create(false, video, { parametersSource: 'SEI', videoParameters: undefined });
        owner.getSeiTimeline().push({ ...pose, time: 0, extent });
        await flush();
        expect(owner.isParametersReady()).toBe(true);
        expect(owner.getElement().style.visibility).toBe('');
        owner.remove().addTo(map);
        expect(owner.getSeiTimeline().size).toBe(0);
        expect(owner.getElement().style.visibility).toBe('hidden');
        expect(owner.getBounds().isValid()).toBe(false);
        await flush();
        expect(owner.isParametersReady()).toBe(false);
        owner.getSeiTimeline().push({ ...pose, time: 0, extent });
        await flush();
        expect(owner.isParametersReady()).toBe(true);
        expect(owner.getElement().style.visibility).toBe('');
    });
});
