export function createVideoElement(width = 320, height = 180, readyState = 4) {
    const video = document.createElement('video');
    Object.defineProperties(video, {
        videoWidth: { value: width, configurable: true },
        videoHeight: { value: height, configurable: true },
        readyState: { value: readyState, configurable: true },
        paused: { value: true, configurable: true }
    });
    video.play = jasmine.createSpy('native play').and.returnValue(Promise.resolve());
    video.pause = jasmine.createSpy('native pause');
    video.requestVideoFrameCallback = jasmine.createSpy('requestVideoFrameCallback').and.returnValue(1);
    video.cancelVideoFrameCallback = jasmine.createSpy('cancelVideoFrameCallback');
    return video;
}

export function createVideojsPlayer(video = createVideoElement()) {
    const wrapper = document.createElement('div');
    wrapper.appendChild(video);
    const events = new EventTarget();
    const player = {
        el_: wrapper,
        el: () => wrapper,
        tech: jasmine.createSpy('tech').and.returnValue({ el: () => video }),
        on: (type, listener) => events.addEventListener(type, listener),
        one: (type, listener) => events.addEventListener(type, listener, { once: true }),
        off: jasmine.createSpy('off').and.callFake((type, listener) => events.removeEventListener(type, listener)),
        videoWidth: () => video.videoWidth,
        videoHeight: () => video.videoHeight,
        currentTime: () => video.currentTime,
        duration: () => video.duration,
        paused: () => video.paused,
        play: jasmine.createSpy('player play').and.returnValue(Promise.resolve()),
        pause: jasmine.createSpy('player pause'),
        dispose: jasmine.createSpy('player dispose')
    };
    return { player, video, wrapper, events };
}
