/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { VideoSei as VideoSeiSession } from '@supermapgis/iclient-common/overlay/video/VideoSei';
import { resolveCameraPose } from '@supermapgis/iclient-common/overlay/video/VideoMapUtil';
import { getVideoElement } from '@supermapgis/iclient-common/overlay/video/VideoPlayerAdapter';

/** @private Leaflet 的 SEI 适配；播放会话和时间轴由 common 管理。 */
export const VideoSei = {
    _initSei: function (options) {
        this._sei = new VideoSeiSession(options, {
            getVideoElement: () => this.getVideoElement(),
            getVideoSize: () => ({ videoWidth: this.video.videoWidth(), videoHeight: this.video.videoHeight() }),
            emit: (type, event) => this.fire(type, event),
            onData: (event) => this.fire('videoparametersei', event),
            onUpdate: () => this._onSeiUpdate(),
            onReset: () => this._onSeiReset()
        });
        this.parametersSource = this._sei.parametersSource;
        this.isSeiSource = this._sei.isSeiSource;
        this.seiProjection = this._sei.projection;
        this.seiTimeline = this._sei.timeline;
        this._manageSeiHls = this._sei.managed;
        this.seiOffset = Number.isFinite(Number(options.seiOffset)) ? Number(options.seiOffset) : 0;
    },

    _startSei: function () {
        this._sei.start();
    },

    _playVideo: function () {
        return this._sei.play(this.video);
    },

    _getSeiPose: function (time) {
        const target = time + this.seiOffset;
        const range = this.seiTimeline.resolve(target);
        if (!range) {
            return null;
        }
        const poses = this.seiTimeline.sliceAround(target);
        const poseTime = Math.max(poses[0].time, Math.min(poses[poses.length - 1].time, target));
        // 相机沿用 SEI 的连续转向算法；范围与裁剪信息取相邻姿态，保持服务端定义的多边形。
        return { ...(range.ratio > 0.5 ? range.next : range.prev), ...resolveCameraPose(poses, poseTime), time: target };
    },

    _stopSei: function () {
        this._sei.stop();
    },

    /** 停止内部 HLS 拉流；时间轴仍可通过 pushSeiParameters 接收外部参数。 */
    unbindHls: function () {
        this._sei.unbindHls();
        return this;
    },

    /** 手动重建托管 HLS 会话，并重新等待有效配准参数。 */
    restartHls: function () {
        this._sei.restart();
        return this;
    },

    /** 写入外部解析的 SEI 参数，按 seiProjection 归一化，time 为媒体时间（秒）。 */
    pushSeiParameters: function (items) {
        return this._sei.push(items);
    },

    /** 获取当前 SEI 时间轴；非 SEI 模式返回 null。 */
    getSeiTimeline: function () {
        return this.seiTimeline;
    },

    /** 获取同一播放器使用的原生 video 元素。 */
    getVideoElement: function () {
        return getVideoElement(this.video);
    },

    /** 获取内部托管的 hls.js 实例。 */
    getHls: function () {
        return this._sei.getHls();
    },

    /** 获取推荐的直播同步位置（秒）。 */
    getSeiLiveSyncPosition: function () {
        return this._sei.getLiveSyncPosition();
    },

    /** 获取直播延迟（秒）。 */
    getSeiLatency: function () {
        return this._sei.getLatency();
    },

    /** 按秒微调 SEI 姿态时间；暂停时也立即刷新配准结果。 */
    setSeiOffset: function (offset) {
        if (this.seiTimeline) {
            const value = Number(offset);
            this.seiOffset = Number.isFinite(value) ? value : 0;
            this._onSeiUpdate();
        }
        return this;
    },

    /** 判断画面是否已取得有效配准参数。 */
    isParametersReady: function () {
        return !!this._ready;
    }
};
