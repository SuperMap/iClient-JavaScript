/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';
import '../core/Base';
import { Util } from '@supermapgis/iclient-common/commontypes/Util';
import { VideoLayerRenderer } from '@supermapgis/iclient-common/overlay/video/VideoLayerRenderer';
import { VideoFrameProcessor } from '@supermapgis/iclient-common/overlay/video/VideoFrameProcessor';
import { smartTimeProcessor, FastRangeSearcher } from '@supermapgis/iclient-common/overlay/video/VideoMapUtil';
import { VideoSei } from './video/VideoSei';

/**
 * @class VideoLayer
 * @classdesc 视频图层，将定点或随时间变化的配准视频叠加到 EPSG:3857 地图。
 * @category Visualization Video
 * @modulecategory Overlay
 * @extends {L.ImageOverlay}
 * @param {Object} options - 构造参数。
 * @param {string} [options.url] - 视频地址，普通模式未传外部播放器时必填。
 * @param {Object|Array<Object>} [options.videoParameters] - 相机参数。数组中的 time 为视频时间（秒），extent 为该时刻的地理范围；x、y 为 EPSG:3857 坐标。SEI 模式无需传入。
 * @param {string} [options.parametersSource='custom'] - 配准参数来源，'custom' 使用构造参数，'SEI' 从 HLS 分片读取。
 * @param {string} [options.seiProjection='EPSG:3857'] - SEI 相机和地面范围的源投影。
 * @param {Function} [options.seiParser] - 自定义 SEI sample 解析器。
 * @param {Object|HTMLVideoElement} [options.player] - 外部播放器或原生 video 元素。
 * @param {boolean} [options.autoplay=true] - 自动播放。
 * @param {boolean} [options.loop=true] - 循环播放，SEI 模式固定为 false。
 * @param {Array<Array<number>>} [options.extent] - 地理裁剪范围，经纬度坐标 [经度, 纬度]；时序参数可分别提供 extent。
 * @param {Array<Array<number>>} [options.clipRegion] - 视频像素裁剪四边形。
 * @param {Object} [options.opencv=window.cv] - OpenCV.js 实例。
 * @param {string} [options.id] - 图层 ID。
 * @param {number} [options.opacity=1] - 不透明度。
 * @param {number} [options.zIndex=1] - 同一 pane 内的层级。
 * @param {number} [options.interval=0.1] - 时序参数重采样间隔，单位秒，最小 0.001。
 * @fires VideoLayer#load
 * @fires VideoLayer#play
 * @fires VideoLayer#pause
 * @fires VideoLayer#error
 * @fires VideoLayer#videoparameterupdate
 * @fires VideoLayer#parametersready
 * @fires VideoLayer#videoparametersei
 * @fires VideoLayer#seistreamready
 * @fires VideoLayer#seistreamerror
 * @fires VideoLayer#seiinvalid
 */
export var VideoLayer = L.ImageOverlay.extend({
    includes: VideoSei,

    initialize: function (options = {}) {
        L.Util.setOptions(this, options);
        this.cv = options.opencv || window.cv;
        if (!this.cv) {
            throw new Error('opencv.js instance is not existed!');
        }
        const parameters = options.videoParameters;
        this._initSei(options);
        if (!options.url && !options.player && !this.isSeiSource) {
            throw new Error('url must be set!');
        }
        if (!this.isSeiSource && !parameters) {
            throw new Error('videoParameters must be set!');
        }
        this.interval = options.interval === undefined ? 0.1 : options.interval;
        if (!Number.isFinite(this.interval) || this.interval < 0.001) {
            throw new Error('interval must be at least 0.001 seconds');
        }
        const dynamic = Array.isArray(parameters);
        const sequence = this.isSeiSource ? [] : dynamic ? parameters : [{ ...parameters, time: 0 }];
        if (!this.isSeiSource && (!sequence.length || !sequence.every((item, index) => Number.isFinite(item.time) && (!index || item.time >= sequence[index - 1].time)))) {
            throw new Error('videoParameters must contain ordered video times');
        }
        const normalized = sequence.map((item) => ({ ...item, extent: this._normalizeExtent(dynamic ? item.extent || options.extent : options.extent || item.extent) }));
        this._timeParameters = dynamic ? smartTimeProcessor(this.interval, normalized, ['yaw', 'pitch', 'roll', 'x', 'y', 'z', 'fovX', 'fovY', 'centerX', 'centerY', 'extent']) : normalized;
        this._timeSearcher = dynamic ? new FastRangeSearcher(this._timeParameters.map((item) => item.time)) : null;
        this.extent = this._timeParameters.length ? this._timeParameters[0].extent : [];
        if (options.clipRegion && options.clipRegion.length && options.clipRegion.length !== 4) {
            throw new Error('clipRegion must contain four video pixel coordinates');
        }
        this.id = options.id || Util.createUniqueID('LeafletVideoLayer_');
        this._bounds = L.latLngBounds(this.extent.map((point) => [point[1], point[0]]));
    },

    _normalizeExtent: function (extent) {
        const coordinates = (extent || []).map((point) => Array.isArray(point) ? point : [point.x, point.y]);
        if (coordinates.length < 3 || !coordinates.every((point) => point.length >= 2 && point.every(Number.isFinite))) {
            throw new Error('extent must contain geographic coordinates');
        }
        return coordinates;
    },

    _parametersAtTime: function (time) {
        if (this.isSeiSource) {
            return this._getSeiPose(time);
        }
        if (!this._timeSearcher) {
            return this._timeParameters[0];
        }
        // 与 MapboxGL 时序图层一致，使用当前时间对应的下一条重采样参数；边界取首、末帧。
        const range = this._timeSearcher.findRange(time);
        return this._timeParameters[range.index + (range.ratio > 0 ? 1 : 0)];
    },

    onAdd: function (map) {
        if (map.options.crs.code !== 'EPSG:3857') {
            throw new Error('VideoLayer currently requires an EPSG:3857 map');
        }
        if (this.isSeiSource) {
            // 每次添加都是新的媒体会话，旧画布重新挂载前先清除显示状态和范围。
            this._onSeiReset();
        }
        L.ImageOverlay.prototype.onAdd.call(this, map);
        this._container.appendChild(this._image);
        this.getPane().appendChild(this._container);
        const session = this._session = {};
        this._lastParameters = null;
        // SEI 必须由 hls.js 独占 MediaSource，不能同时把同一 URL 交给 video.js 的 VHS。
        this.renderer = new VideoLayerRenderer({ url: this._manageSeiHls ? undefined : this.options.url, player: this.options.player, id: this.id, autoplay: this.options.autoplay, loop: this.isSeiSource ? false : this.options.loop });
        this.video = this.renderer.createVideo();
        this.video.on('play', () => {
            this.fire('play');
            this._startFrames();
        });
        this.video.on('pause', () => {
            this._stopFrames();
            this.fire('pause');
        });
        this.video.on('seeked', () => this._drawFrame());
        this.video.on('error', () => {
            this._stopFrames();
            this.fire('error', { error: this.video.error() });
        });
        this._cancelVideoReady = this.renderer.onVideoReady(() => {
            if (this._session !== session) {
                return;
            }
            this._videoElement = this.getVideoElement();
            this._videoReady = true;
            this._initializeFrame();
        });
        this._startSei();
    },

    _initializeFrame: function () {
        if (!this._videoReady || this._ready || this._initializing) {
            return;
        }
        const parameters = this._parametersAtTime(this.video.currentTime());
        if (!parameters || !parameters.extent || parameters.extent.length < 3) {
            return;
        }
        const session = this._session;
        const processor = this._initializing = this._processor = new VideoFrameProcessor(this.cv);
        const clipRegion = this.options.clipRegion || parameters.clipRegion || [];
        processor.init(this.video.videoWidth(), this.video.videoHeight(), parameters, parameters.extent, clipRegion).then(() => {
            if (this._session !== session || this._initializing !== processor) {
                return;
            }
            this._initializing = null;
            this._image.width = processor.width;
            this._image.height = processor.height;
            this._lastParameters = parameters;
            this.extent = parameters.extent;
            this.setBounds(L.latLngBounds(this.extent.map((point) => [point[1], point[0]])));
            this._ready = true;
            if (this._drawFrame()) {
                this.fire('load');
                this.fire('parametersready', { pose: parameters, videoWidth: this.video.videoWidth(), videoHeight: this.video.videoHeight(), time: parameters.time });
                this._startFrames();
            }
        }).catch((error) => {
            processor.dispose();
            if (this._session === session && this._initializing === processor) {
                this._initializing = null;
                this.fire('error', { error });
            }
        });
    },

    _onSeiUpdate: function () {
        if (!this._ready) {
            this._initializeFrame();
        } else if (this.paused()) {
            this._drawFrame();
        }
    },

    _onSeiReset: function () {
        // 重连后旧范围已不再可信，隐藏画面并释放配准，等待新会话的第一条有效姿态。
        this._ready = false;
        this._initializing = null;
        this._stopFrames();
        if (this._processor) {
            this._processor.dispose();
            this._processor = null;
        }
        this._bounds = L.latLngBounds([]);
        this.extent = [];
        if (this._image) {
            this._image.style.visibility = 'hidden';
        }
    },

    onRemove: function (map) {
        this._session = null;
        if (this._cancelVideoReady) {
            this._cancelVideoReady();
        }
        this._videoReady = false;
        this._initializing = null;
        this._ready = false;
        this._stopSei();
        this._stopFrames();
        if (this._processor) {
            this._processor.dispose();
            this._processor = null;
        }
        if (this.video) {
            this.video.dispose();
            this.video = null;
        }
        this._videoElement = this.renderer = null;
        if (this._image) {
            L.ImageOverlay.prototype.onRemove.call(this, map);
            L.DomUtil.remove(this._container);
        }
    },

    _initImage: function () {
        this._container = L.DomUtil.create('div', 'leaflet-layer');
        this._image = L.DomUtil.create('canvas', 'leaflet-image-layer');
        if (this._zoomAnimated) {
            L.DomUtil.addClass(this._container, 'leaflet-zoom-animated');
        }
        this._image.style.pointerEvents = 'none';
        this._image.style.visibility = 'hidden';
        this._image.style.display = this.options.visible === false ? 'none' : '';
        this._updateOpacity();
        this._updateZIndex();
    },

    _reset: function () {
        this._renderZoom = this._map.getZoom();
        this._renderOrigin = this._map.getPixelOrigin();
        L.DomUtil.setPosition(this._container, L.point(0, 0));
        this._resetImage();
    },

    _animateZoom: function (event) {
        const scale = this._map.getZoomScale(event.zoom, this._renderZoom);
        const offset = this._renderOrigin.multiplyBy(scale).subtract(this._map._getNewPixelOrigin(event.center, event.zoom));
        L.DomUtil.setTransform(this._container, offset, scale);
    },

    setBounds: function (bounds) {
        this._bounds = L.latLngBounds(bounds);
        if (this._map) {
            this._resetImage();
        }
        return this;
    },

    _resetImage: function () {
        if (!this._renderOrigin || !this._bounds.isValid()) {
            return;
        }
        // 地图动画只变换外层容器，视频范围在同一参考坐标系中更新，避免逐帧覆盖缩放动画。
        // 保留投影的亚像素精度，防止移动范围的两个角点分别舍入后出现一像素跳变。
        const topLeft = this._map.project(this._bounds.getNorthWest(), this._renderZoom).subtract(this._renderOrigin);
        const bottomRight = this._map.project(this._bounds.getSouthEast(), this._renderZoom).subtract(this._renderOrigin);
        const size = bottomRight.subtract(topLeft);
        L.DomUtil.setPosition(this._image, topLeft);
        this._image.style.width = size.x + 'px';
        this._image.style.height = size.y + 'px';
    },

    _updateZIndex: function () {
        L.ImageOverlay.prototype._updateZIndex.call(this);
        if (this._container && this.options.zIndex !== undefined) {
            this._container.style.zIndex = this.options.zIndex;
        }
    },

    bringToFront: function () {
        if (this._map) {
            L.DomUtil.toFront(this._container);
        }
        return this;
    },

    bringToBack: function () {
        if (this._map) {
            L.DomUtil.toBack(this._container);
        }
        return this;
    },

    // 视频帧更新画面及范围；地图缩放由外层容器独立完成。
    _drawFrame: function (mediaTime) {
        if (!this._ready || !this._videoElement || this._videoElement.readyState < 2) {
            return false;
        }
        try {
            const time = Number.isFinite(mediaTime) ? mediaTime : this.video.currentTime();
            const parameters = this._parametersAtTime(time);
            if (parameters !== this._lastParameters) {
                this._processor.updateParameters(parameters, parameters.extent);
                this._lastParameters = parameters;
                this.extent = parameters.extent;
                this.setBounds(L.latLngBounds(this.extent.map((point) => [point[1], point[0]])));
            }
            this._processor.render(this._videoElement, this._image);
            this._image.style.visibility = '';
            this.currentTime = time;
            this.fire('videoparameterupdate', { time, videoParameters: parameters, extent: this.extent });
            return true;
        } catch (error) {
            this._ready = false;
            this._stopFrames();
            this._processor.dispose();
            this._processor = null;
            this.fire('error', { error });
            return false;
        }
    },

    _startFrames: function () {
        if (!this._ready || this.paused() || this._frameId !== undefined) {
            return;
        }
        const session = this._session;
        const callback = (now, metadata) => {
            if (this._session !== session) {
                return;
            }
            this._frameId = undefined;
            if (this._drawFrame(metadata && metadata.mediaTime)) {
                this._startFrames();
            }
        };
        // 优先按实际解码帧更新，旧浏览器按动画帧更新；暂停、移除时统一取消。
        this._usesVideoFrames = typeof this._videoElement.requestVideoFrameCallback === 'function';
        this._frameId = this._usesVideoFrames ? this._videoElement.requestVideoFrameCallback(callback) : requestAnimationFrame(callback);
    },

    _stopFrames: function () {
        if (this._frameId !== undefined) {
            if (this._usesVideoFrames) {
                this._videoElement.cancelVideoFrameCallback(this._frameId);
            } else {
                cancelAnimationFrame(this._frameId);
            }
            this._frameId = undefined;
        }
    },

    /** @description 播放视频。 */
    play: function () {
        this._playVideo();
        return this;
    },

    /** @description 暂停视频。 */
    pause: function () {
        this._stopFrames();
        if (this.video) {
            this.video.pause();
        }
        return this;
    },

    /** @returns {boolean} 视频是否暂停。 */
    paused: function () {
        return !this.video || this.video.paused();
    },

    /** @param {boolean} visible - 是否显示图层。 */
    setVisibility: function (visible) {
        this.options.visible = visible;
        if (this._image) {
            this._image.style.display = visible ? '' : 'none';
        }
        return this;
    }
});

export var videoLayer = function (options) {
    return new VideoLayer(options);
};
