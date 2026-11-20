/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SeiHlsSource, isHlsStreamUrl, isSeiHlsAvailable, getSeiUnavailableMessage } from './SeiHlsSource';
import { SeiPoseTimeline } from './SeiPoseTimeline';
import { normalizeSeiPose, normalizeSeiProjection } from './seiParser';
import { silencePlayRejection } from './VideoPlayerAdapter';

/** @private 两端共用的 SEI 会话；通过回调刷新渲染，不依赖地图引擎或播放器类型。 */
export class VideoSei {
    constructor(options, callbacks) {
        this.options = options;
        this.callbacks = callbacks;
        this.parametersSource = options.parametersSource === undefined ? 'custom' : options.parametersSource;
        if (this.parametersSource !== 'custom' && this.parametersSource !== 'SEI') {
            throw new Error('parametersSource must be "custom" or "SEI".');
        }
        this.isSeiSource = this.parametersSource === 'SEI';
        this.projection = normalizeSeiProjection(options.seiProjection);
        // 每个视频的 MSE 时间偏移和重连周期不同，时间轴必须由实例各自持有。
        this.timeline = this.isSeiSource ? new SeiPoseTimeline() : null;
        this.managed = this.isSeiSource && isHlsStreamUrl(options.url) && isSeiHlsAvailable();
        this.source = null;
        this._invalidLastFired = -Infinity;
        this._bindTimeline();
    }

    _bindTimeline() {
        if (!this.timeline || this._listeners) {
            return;
        }
        this._listeners = {
            add: () => this._update(),
            reset: () => this.callbacks.onReset(),
            calibrate: () => {
                if (this.callbacks.onCalibrate) {
                    this.callbacks.onCalibrate();
                }
                this._update();
            },
            invalid: (event) => {
                // 脏数据最多每秒通知一次，避免解析错误刷屏影响播放。
                const now = Date.now();
                if (now - this._invalidLastFired >= 1000) {
                    this._invalidLastFired = now;
                    this.callbacks.emit('seiinvalid', event);
                }
            }
        };
        Object.keys(this._listeners).forEach((type) => this.timeline.on(type, this._listeners[type]));
    }

    _update() {
        if (!this._ingesting && !this._stopped) {
            this.callbacks.onUpdate();
        }
    }

    start() {
        if (!this.isSeiSource || this.source) {
            return;
        }
        this._stopped = false;
        this._bindTimeline();
        if (!this.managed) {
            if (isHlsStreamUrl(this.options.url) && !this._warnedUnavailable) {
                this._warnedUnavailable = true;
                console.warn('[VideoSei] ' + getSeiUnavailableMessage());
            }
            return;
        }
        // 销毁或重建后，旧 HLS 的异步回调不能再写入当前时间轴或触发播放。
        const active = (callback) => (...args) => this.source === source && callback(...args);
        const source = this.source = new SeiHlsSource({
            url: this.options.url,
            hlsConfig: this.options.hlsConfig,
            autoRecover: this.options.hlsAutoRecover,
            getVideoElement: () => this.callbacks.getVideoElement(),
            onUserData: active((data) => this.handlePayload(data)),
            onFragBuffered: active(() => this.calibrate()),
            onMediaAttached: active(() => {
                if (this.options.autoplay !== false) {
                    this._autoPlay(active);
                }
            }),
            onManifestParsed: active(() => this.callbacks.emit('seistreamready', {})),
            onReconnect: active(() => {
                this._cancelAutoPlay();
                this.timeline.clear();
            }),
            onError: active((data) => this.callbacks.emit('seistreamerror', { ...data, data, hlsType: data && data.type }))
        });
        source.start();
    }

    handlePayload(data) {
        if (!this.timeline || this._stopped || !data || !Array.isArray(data.samples) || !data.samples.length) {
            return [];
        }
        // 一个分片可能含多条姿态，完成写入和 MSE 标定后只刷新一次画面。
        this._ingesting = true;
        let poses;
        try {
            poses = this.timeline.ingest(data, {
                parser: this.options.seiParser,
                ...this.callbacks.getVideoSize(),
                seiProjection: this.projection
            });
            this.calibrate();
            // 首次标定可能改变偏移，事件返回的时间也应与渲染使用的媒体时间一致。
            poses.forEach((pose) => { pose.time = pose.rawTime - this.timeline.mediaOffset; });
        } finally {
            this._ingesting = false;
        }
        if (!this._stopped) {
            if (this.callbacks.onData) {
                this.callbacks.onData({ poses, frag: data.frag || {}, samples: data.samples });
            }
            this._update();
        }
        return poses;
    }

    calibrate() {
        const video = this.callbacks.getVideoElement();
        if (this.timeline && video && video.buffered && video.buffered.length) {
            this.timeline.calibrate(video.buffered.start(0));
        }
    }

    push(items) {
        if (!this.timeline || this._stopped) {
            return [];
        }
        const poses = [];
        (Array.isArray(items) ? items : [items]).forEach((item) => {
            const pose = normalizeSeiPose(item, this.projection);
            if (pose) {
                poses.push({ ...pose, time: item.time });
            }
        });
        return this.timeline.push(poses);
    }

    play(player) {
        // hls.js 管理的 blob 源不在 video.js 的源缓存中，其 play() 可能一直等待 loadstart。
        // 由媒体源的实际所有者播放同一个 video；普通视频仍交给原播放器。
        const target = this.managed ? this.callbacks.getVideoElement() : player;
        return target ? silencePlayRejection(target.play()) : undefined;
    }

    _autoPlay(active) {
        this._cancelAutoPlay();
        const video = this.callbacks.getVideoElement();
        if (!video) {
            return;
        }
        const tryPlay = active(() => {
            const promise = this.play();
            if (promise && typeof promise.catch === 'function') {
                promise.catch(active((error) => {
                    // 暂停打断播放属于正常操作；浏览器拦截自动播放时仅静音重试一次。
                    if ((!error || error.name !== 'AbortError') && !video.muted) {
                        video.muted = true;
                        this.play();
                    }
                }));
            }
        });
        if (video.readyState >= 2) {
            tryPlay();
        } else {
            video.addEventListener('canplay', tryPlay, { once: true });
            this._cancelAutoPlayListener = () => video.removeEventListener('canplay', tryPlay);
        }
    }

    _cancelAutoPlay() {
        if (this._cancelAutoPlayListener) {
            this._cancelAutoPlayListener();
            this._cancelAutoPlayListener = null;
        }
    }

    unbindHls() {
        this._cancelAutoPlay();
        const source = this.source;
        this.source = null;
        if (source) {
            source.destroy();
        }
    }

    restart() {
        if (this.source) {
            this.unbindHls();
            // 新的媒体会话重新收集姿态并标定，不能沿用旧的 MSE 偏移。
            this.timeline.clear();
            this.start();
        }
    }

    stop() {
        this._stopped = true;
        this.unbindHls();
        if (this._listeners) {
            Object.keys(this._listeners).forEach((type) => this.timeline.off(type, this._listeners[type]));
            this._listeners = null;
            this.timeline.clear();
        }
    }

    getHls() {
        return this.source ? this.source.getHls() : null;
    }

    getLiveSyncPosition() {
        return this.source ? this.source.getLiveSyncPosition() : null;
    }

    getLatency() {
        return this.source ? this.source.getLatency() : null;
    }
}
