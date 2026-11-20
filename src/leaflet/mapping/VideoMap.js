/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';
import '../core/Base';
import proj4 from 'proj4';
import { Util } from '@supermapgis/iclient-common/commontypes/Util';
import CoordTransfer from '@supermapgis/iclient-common/overlay/video/CoordTransfer';
import { VideoLayerRenderer } from '@supermapgis/iclient-common/overlay/video/VideoLayerRenderer';
import { resolveCameraPose } from '@supermapgis/iclient-common/overlay/video/VideoMapUtil';
import { transformVideoMapGeoJSON } from '@supermapgis/iclient-common/overlay/video/clipVideoMapGeometry';
import { VideoSei } from '../overlay/video/VideoSei';

const MAP_EVENTS = 'click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu preclick keypress keydown keyup movestart move moveend dragstart drag dragend zoomstart zoom zoomend viewreset resize unload';

// 只转换子图层冒泡事件的副本，保留手动 fire 的语义及地图内部的视频平面坐标。
const VideoMapGeoJSON = L.GeoJSON.extend({
    initialize: function (data, options, videoMap) {
        this._videoMap = videoMap;
        L.GeoJSON.prototype.initialize.call(this, data, options);
    },

    fire: function (type, data, propagate) {
        if (data && data.latlng && data.propagatedFrom && this.listens(type, propagate)) {
            data = this._videoMap._bindMapEvent(data);
        }
        return L.GeoJSON.prototype.fire.call(this, type, data, propagate);
    }
});

/**
 * @class VideoMap
 * @classdesc 视频地图。在原始视频上叠加地理要素，按视频时间更新相机配准和矢量位置。
 * 通过 on 监听地图交互时，事件 latlng 为 EPSG:4326 经纬度，spatialPoint 为 EPSG:3857 坐标，mapEvent 保留原始事件；配准未就绪或无法反算时坐标为 null。
 * @category Visualization Video
 * @modulecategory Mapping
 * @extends {L.Evented}
 * @param {Object} options - 参数。
 * @param {string|HTMLElement} [options.container='map'] - 地图容器。
 * @param {string} [options.url] - 视频地址，普通模式未传外部播放器时必填。
 * @param {Object|Array<Object>} [options.videoParameters] - 相机参数，数组中的 time 为视频时间（秒）；x、y 为 EPSG:3857 坐标。SEI 模式无需传入。
 * @param {string} [options.parametersSource='custom'] - 配准参数来源，'custom' 使用构造参数，'SEI' 从 HLS 分片读取。
 * @param {string} [options.seiProjection='EPSG:3857'] - SEI 相机和地面范围的源投影。
 * @param {Function} [options.seiParser] - 自定义 SEI sample 解析器。
 * @param {Object|HTMLVideoElement} [options.player] - 外部播放器或原生 video 元素。
 * @param {Object} [options.opencv=window.cv] - OpenCV.js 实例。
 * @param {number} [options.interval=0.1] - 矢量重投影的最小时间间隔，单位秒。
 * @param {boolean} [options.autoplay=true] - 自动播放。
 * @param {boolean} [options.loop=true] - 循环播放，SEI 模式固定为 false。
 * @fires VideoMap#load
 * @fires VideoMap#play
 * @fires VideoMap#pause
 * @fires VideoMap#videoparameterupdate
 * @fires VideoMap#error
 * @fires VideoMap#videoparameterready
 * @fires VideoMap#videoparametersei
 * @fires VideoMap#seistreamready
 * @fires VideoMap#seistreamerror
 * @fires VideoMap#seiinvalid
 */
export var VideoMap = L.Evented.extend({
    includes: VideoSei,

    initialize: function (options = {}) {
        this.options = options;
        this.cv = options.opencv || window.cv;
        if (!this.cv) {
            throw new Error('url, videoParameters and opencv must be set');
        }
        this._initSei(options);
        if (!this.isSeiSource && ((!options.url && !options.player) || !options.videoParameters)) {
            throw new Error('url, videoParameters and opencv must be set');
        }
        this.rawVideoParameters = this.isSeiSource ? [] : Array.isArray(options.videoParameters) ? options.videoParameters.slice() : [{ ...options.videoParameters, time: 0 }];
        if (!this.isSeiSource && (!this.rawVideoParameters.length || !this.rawVideoParameters.every((item, index, items) => Number.isFinite(item.time) && (!index || item.time >= items[index - 1].time)))) {
            throw new Error('videoParameters must contain ordered video times');
        }
        this.interval = options.interval === undefined ? 0.1 : options.interval;
        if (!(this.interval > 0)) {
            throw new Error('interval must be greater than zero');
        }
        this._geoJSONLayers = [];
        // 地图平面使用视频像素：相机配准仍在 EPSG:3857 中计算，画面本身不做透视拉伸。
        this.map = L.map(options.container || 'map', { crs: L.CRS.Simple, minZoom: -Infinity, zoomSnap: 0, preferCanvas: true }).setView([0, 0], 0);
        this.map.on(MAP_EVENTS, this._onMapEvent, this);
        // SEI 模式的同一 video 由 hls.js 独占，video.js 只提供播放器控制。
        this._renderer = new VideoLayerRenderer({ url: this._manageSeiHls ? undefined : options.url, player: options.player, id: Util.createUniqueID('LeafletVideoMap_'), autoplay: options.autoplay, loop: this.isSeiSource ? false : options.loop });
        this.video = this._renderer.createVideo();
        this.video.on('play', () => { this.fire('play'); this._startFrames(); });
        this.video.on('pause', () => { this._stopFrames(); this.fire('pause'); });
        this.video.on('seeked', () => this.updateAtTime(this.video.currentTime()));
        this.video.on('error', () => { this._stopFrames(); this.fire('error', { error: this.video.error() }); });
        this._cancelVideoReady = this._renderer.onVideoReady(() => this._onVideoReady());
        this.map.on('popupclose', (event) => {
            if (event.popup === this._popup) {
                this._popup = this._popupAnchor = null;
            }
        });
        this._startSei();
    },

    _onVideoReady: function () {
        if (this._removed || this._videoReady) {
            return;
        }
        this.videoWidth = this.video.videoWidth();
        this.videoHeight = this.video.videoHeight();
        this._videoReady = true;
        this._videoElement = this.getVideoElement();
        this._videoElement.style.position = 'absolute';
        this._videoElement.style.left = this._videoElement.style.top = '0';
        this._videoBounds = L.latLngBounds([[0, 0], [this.videoHeight, this.videoWidth]]);
        this._videoOverlay = L.videoOverlay(this._videoElement, this._videoBounds, { interactive: false }).addTo(this.map);
        this.map.fitBounds(this._videoBounds);
        // 共用裁剪器的输出坐标直接对应像素；Y 轴翻转由这两个角点统一处理。
        this.originCoordsLeftTop = { lng: 0, lat: this.videoHeight };
        this.originCoordsRightBottom = { lng: this.videoWidth, lat: 0 };
        if (this.isSeiSource) {
            // 原始画面就绪即可加载业务数据；没有姿态时暂不投影矢量，避免显示错误位置。
            this.fire('load', { map: this.map, parametersReady: false });
        }
        this._initializeCamera();
    },

    _initializeCamera: function () {
        if (!this._videoReady || this._ready || this._initializing || this._removed) {
            return;
        }
        const pose = this.isSeiSource ? this._getSeiPose(this.video.currentTime()) : this.rawVideoParameters[0];
        if (!pose) {
            return;
        }
        const camera = this._initializing = this.coordTransfer = CoordTransfer.fromVideoParameters(this.cv, pose, this.videoWidth, this.videoHeight);
        camera.init().then(() => {
            if (this._removed || this._initializing !== camera) {
                camera.dispose();
                return;
            }
            this._initializing = null;
            this._ready = true;
            this.updateAtTime(this.video.currentTime());
            if (!this.isSeiSource) {
                this.fire('load', { map: this.map, parametersReady: true });
            }
            this.fire('videoparameterready', { pose, time: pose.time, videoWidth: this.videoWidth, videoHeight: this.videoHeight });
            this._startFrames();
        }).catch((error) => {
            camera.dispose();
            if (!this._removed && this._initializing === camera) {
                this._initializing = null;
                this._ready = false;
                this.fire('error', { error });
            }
        });
    },

    _onSeiUpdate: function () {
        if (!this._ready) {
            this._initializeCamera();
        } else if (this.paused()) {
            this.updateAtTime(this.video.currentTime());
        }
    },

    _onSeiReset: function () {
        // 新会话必须重新取得姿态，原始视频可继续显示，旧矢量与弹窗立即清除。
        this._ready = false;
        this._initializing = null;
        this._stopFrames();
        if (this.coordTransfer) {
            this.coordTransfer.dispose();
            this.coordTransfer = null;
        }
        this._geoJSONLayers.forEach((record) => record.layer.clearLayers());
        this.map.closePopup();
    },

    /** 添加 EPSG:4326 GeoJSON。options 沿用 L.geoJSON 的样式和事件配置，返回的 L.GeoJSON 图层交互事件同样输出真实经纬度。 */
    addGeoJSON: function (data, options = {}) {
        if (this._removed) {
            throw new Error('VideoMap has been removed');
        }
        const layer = new VideoMapGeoJSON(null, options, this).addTo(this.map);
        const record = { data, layer };
        this._geoJSONLayers.push(record);
        if (this._ready) {
            this._updateGeoJSON(record);
        }
        return layer;
    },

    _updateGeoJSON: function (record) {
        if (this.map.hasLayer(record.layer)) {
            record.layer.clearLayers().addData(transformVideoMapGeoJSON(record.data, this));
        }
    },

    /** 按视频时间重投影。跳转和循环回退都从原始关键帧重新解析，不依赖上一帧姿态。 */
    updateAtTime: function (time) {
        if (!this._ready || this._removed || !Number.isFinite(time)) {
            return this;
        }
        const parameters = this.rawVideoParameters;
        const poseTime = this.isSeiSource ? time : Math.max(parameters[0].time, Math.min(parameters[parameters.length - 1].time, time));
        const pose = this.isSeiSource ? this._getSeiPose(time) : resolveCameraPose(parameters, poseTime);
        if (!pose) {
            return this;
        }
        this.coordTransfer.setCameraLocation(CoordTransfer.getCameraParameters(pose, this.videoWidth, this.videoHeight));
        this.currentTime = time;
        this._geoJSONLayers.forEach((record) => this._updateGeoJSON(record));
        this._updatePopup();
        this.fire('videoparameterupdate', { time, videoParameters: pose });
        return this;
    },

    _startFrames: function () {
        if (!this._ready || this._removed || this.paused() || this._frameId !== undefined) {
            return;
        }
        const callback = (now, metadata) => {
            this._frameId = undefined;
            if (this._removed || !this._ready) {
                return;
            }
            const time = metadata ? metadata.mediaTime : this.video.currentTime();
            // 按解码时间限频，时间回退时立即更新，避免循环或拖动后保留旧相机位置。
            if (this.currentTime === undefined || time < this.currentTime || time - this.currentTime >= this.interval) {
                this.updateAtTime(time);
            }
            this._startFrames();
        };
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

    _toVideoLatLng: function (latlng) {
        const location = L.latLng(latlng);
        const world = proj4('EPSG:4326', 'EPSG:3857', [location.lng, location.lat]);
        const pixel = this.coordTransfer.toVideoCoordinate(world).data64F;
        return pixel.length >= 2 && pixel.every(Number.isFinite) ? L.latLng(this.videoHeight - pixel[1], pixel[0]) : null;
    },

    _onMapEvent: function (event) {
        // 未订阅的鼠标移动不计算相机反投影；on、once、off 继续沿用 Leaflet 的事件机制。
        if (this.listens(event.type)) {
            this.fire(event.type, this._bindMapEvent(event));
        }
    },

    _bindMapEvent: function (event) {
        const data = { ...event, mapEvent: event };
        if (event.latlng) {
            const position = this._unprojectLatLng(event.latlng);
            data.latlng = position ? position.latlng : null;
            data.spatialPoint = position ? position.spatialPoint : null;
        }
        return data;
    },

    _unprojectLatLng: function (pixel) {
        if (!this._ready || this._removed) {
            return null;
        }
        const world = this.coordTransfer.toSpatialCoordinate([pixel.lng, this.videoHeight - pixel.lat]);
        if (!world || world.length < 2 || !world.every(Number.isFinite)) {
            return null;
        }
        const spatialPoint = [world[0], world[1]];
        const location = proj4('EPSG:3857', 'EPSG:4326', spatialPoint);
        return location.every(Number.isFinite) ? { latlng: L.latLng(location[1], location[0]), spatialPoint } : null;
    },

    /** 将真实经纬度转换为容器像素；相机后方的点返回 null。 */
    project: function (latlng) {
        if (!this._ready || this._removed) {
            return null;
        }
        const point = this._toVideoLatLng(latlng);
        // 保留亚像素位置，避免投影、反投影往返时被整数像素舍入引入偏移。
        return point ? this.map.latLngToAccurateContainerPoint(point) : null;
    },

    /** 将容器像素反算为地面上的真实经纬度。 */
    unproject: function (point) {
        if (!this._ready || this._removed) {
            return null;
        }
        const position = this._unprojectLatLng(this.map.containerPointToLatLng(L.point(point)));
        return position ? position.latlng : null;
    },

    /** 以真实地理位置锚定弹窗，播放时同步更新弹窗位置。 */
    openPopup: function (content, latlng, options) {
        if (!this._ready || this._removed) {
            return this;
        }
        const point = this._toVideoLatLng(latlng);
        if (point) {
            this.map.closePopup();
            this._popupAnchor = L.latLng(latlng);
            this._popup = L.popup(options).setLatLng(point).setContent(content).openOn(this.map);
        }
        return this;
    },

    _updatePopup: function () {
        if (this._popup && this._popupAnchor) {
            const point = this._toVideoLatLng(this._popupAnchor);
            if (point && this._videoBounds.contains(point)) {
                this._popup.setLatLng(point);
            } else {
                this.map.closePopup(this._popup);
            }
        }
    },

    play: function () {
        this._playVideo();
        return this;
    },

    pause: function () {
        this._stopFrames();
        if (this.video) {
            this.video.pause();
        }
        return this;
    },

    paused: function () {
        return !this.video || this.video.paused();
    },

    /** 与 MapboxGL VideoMap 保持一致的销毁入口。 */
    destroy: function () {
        return this.remove();
    },

    /** 销毁视频、相机矩阵、矢量和地图，容器可用于创建新实例。 */
    remove: function () {
        if (this._removed) {
            return this;
        }
        this._removed = true;
        this._cancelVideoReady();
        this._ready = false;
        this._initializing = null;
        this._stopSei();
        this._stopFrames();
        if (this._videoOverlay) {
            this._videoOverlay.remove();
        }
        this.video.dispose();
        this.video = null;
        if (this.coordTransfer) {
            this.coordTransfer.dispose();
        }
        this.map.remove();
        this.map.off(MAP_EVENTS, this._onMapEvent, this);
        this._geoJSONLayers = [];
        this._popup = this._popupAnchor = this._videoElement = this._renderer = null;
        return this;
    }
});

export var videoMap = function (options) {
    return new VideoMap(options);
};
