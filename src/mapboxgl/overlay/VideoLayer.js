/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import mapboxgl from 'mapbox-gl';
 import { Util as CommonUtil } from '@supermapgis/iclient-common/commontypes/Util';
 import { VideoLayerRenderer } from '@supermapgis/iclient-common/overlay/video/VideoLayerRenderer';
import { silencePlayRejection, getVideoElement } from '@supermapgis/iclient-common/overlay/video/VideoPlayerAdapter';
 import { bbox, polygon } from '@turf/turf';
 import CoordTransfer from '../mapping/CoordTransfer';
 import { smartTimeProcessor, FastRangeSearcher } from '../mapping/utils/VideoMapUtil';
 import { VideoSei } from '@supermapgis/iclient-common/overlay/video/VideoSei';
 import proj4 from 'proj4';
 
 /**
  * @typedef {Object} VideoLayer.VideoParameters - 视频配准参数。
  * @property {number} pitch - 俯仰角。
  * @property {number} roll - 侧偏角。
  * @property {number} yaw - 偏航角。
  * @property {number} x - 视频 x 坐标。
  * @property {number} y - 视频 y 坐标。
  * @property {number} z - 视频 z 坐标。
  * @property {number} fovX - 水平方向上以像素为单位的焦距。
  * @property {number} fovY - 垂直方向上以像素为单位的焦距。
  * @property {number} centerX - 相机中心的水平坐标。
  * @property {number} centerY - 相机中心的垂直坐标。
  */
 
 /**
   * @typedef {Object} VideoLayer.VideoTimeParameters - 按时间播放时的视频配准参数。
   * @property {number} pitch - 俯仰角。
   * @property {number} roll - 侧偏角。
   * @property {number} yaw - 偏航角。
   * @property {number} x - 视频 x 坐标。
   * @property {number} y - 视频 y 坐标。
   * @property {number} z - 视频 z 坐标。
   * @property {number} fovX - 水平方向上以像素为单位的焦距。
   * @property {number} fovY - 垂直方向上以像素为单位的焦距。
   * @property {number} centerX - 相机中心的水平坐标。
   * @property {number} centerY - 相机中心的垂直坐标。
   * @property {number} time - 视频时间，单位秒。
   * @property {Array} extent - 视频范围。
  */
 
 /**
  * @class VideoLayer
  * @category  Visualization Video
  * @classdesc 视频图层，用于将配准后的视频、视频流（HLS(m3u8)、HTTP-FLV）叠加至地图上。
  * @modulecategory Overlay
  * @version 11.2.0
  * @param {Object} options - 构造参数。
  * @param {string} options.url - 视频 或 流链接。支持 flv, m3u8, map4 格式。`parametersSource` 为 `'SEI'` 且链接为 m3u8 时，由 iClient 内部用 hls.js 接管拉流与 SEI 解析，该地址不会透传给 video.js（video.js 内置的 VHS 不解析也不外抛 SEI）。
  * @param {VideoLayer.VideoParameters|Array<VideoLayer.VideoTimeParameters>} options.videoParameters - 视频配准参数，当传入类型为数组时，支持非定点视频。
  * @param {Array} [options.extent] - 视频范围。
  * @param {Object} [options.opencv] - opencv.js 实例, 未传入时将去 window.cv 获取。
  * @param {number} [options.interval=0.1] 非定点视频参数间隔，单位秒，当视频参数为数组时，会根据该参数将 VideoTimeParameters.time 处理成均匀间隔的视频参数，默认为 0.1 秒，最小值为 0.001 秒。
  * @param {string} [options.id] - 视频图层 ID。默认使用 CommonUtil.createUniqueID("VideoLayer_") 创建专题图层 ID。
  * @param {Array} [options.clipRegion] - 裁剪范围，视频像素坐标下的四角点 `[[x, y], ...]`。SEI 模式下不传时自动取首个 SEI 参数中的 `clipRegion`，两者都没有时按整帧裁剪。
  * @param {string} [options.parametersSource='custom'] - 配准参数来源。`custom` 表示使用 `videoParameters` 静态/数组参数；`SEI` 表示使用视频流 TS 分片内携带的 SEI 参数（此时 `videoParameters` 可不传）。
  * @param {string} [options.seiProjection='EPSG:3857'] - SEI 相机坐标与 extent 的源投影，仅支持 `EPSG:3857` 和 `EPSG:4326`。
  * @param {Function} [options.seiParser] - 自定义 SEI 解析函数，仅 `parametersSource` 为 `'SEI'` 时生效。
  * @param {Object|HTMLVideoElement} [options.player] - 外部 video.js 播放器或原生 video，所有权由调用方保留。
  * @fires VideoLayer#play
  * @fires VideoLayer#pause
  * @fires VideoLayer#parametersready
  * @fires VideoLayer#seiinvalid
  * @fires VideoLayer#seistreamready
  * @fires VideoLayer#seistreamerror
  * @extends {mapboxgl.Evented}
  * @usage
  * ```
  * // 浏览器
  * <script type="text/javascript" src="{cdn}"></script>
  * <script type="text/javascript" src="https://iclient.supermap.io/web/libs/opencv/3.4/opencv.js"></script>
  * <script>
  *   new {namespace}.VideoLayer(options);
  * 
  * </script>
  *
  *  // ES6 Import
  * import { VideoLayer } from "{npm}";
  * // 将上面 opencv 源码拷贝到本地路径引用
  * options.opencv = "your opencv path";
  * new VideoLayer(options);
  * ```
  */
 export class VideoLayer extends mapboxgl.Evented {

   constructor(options) {
     super();
     var _options = options ? options : {};
     this.options = _options;
     this.url = this.options.url;
     this.extent = this.options.extent;
     this.clipRegion = this.options.clipRegion || [];
     this.videoParameters = this.options.videoParameters;
     this.interval = this.options.interval || 0.1;
     this.cv = this.options.opencv || window.cv;
     if (!this.cv) {
       throw new Error('opencv.js instance is not existed!');
     }
     this._sei = new VideoSei(this.options, {
       getVideoElement: () => this._getVideoElement(),
       getVideoSize: () => ({ videoWidth: this.videoWidth, videoHeight: this.videoHeight }),
       emit: (type, event) => this.fire(type, event),
       onUpdate: () => this._ensureSeiBaseEntry(),
       onReset: () => this._clearPoseCache(),
       onCalibrate: () => this._clearPoseCache()
     });
     this.parametersSource = this._sei.parametersSource;
     this.isSeiSource = this._sei.isSeiSource;
     this.seiProjection = this._sei.projection;
     this.seiTimeline = this._sei.timeline;
     this.maxCachedPoses = Math.max(1, this.options.maxCachedPoses || 30);
     if (!this.videoParameters && !this.isSeiSource) {
       throw new Error('videoParameters must be set!');
     }

     this.id = _options.id ? _options.id : CommonUtil.createUniqueID("VideoLayer_");
     this.layerId = this.id + '_outer';
     this.type = 'custom';
     this.renderingMode = '3d';
     this.overlay = true;
     this.beginIndex = 0;
     this.baseEntry = null;
     this.baseRatio = undefined;
     this._poseCache = new Map();
     this._poseCacheKeys = [];
     this._videoReady = false;
     this._buildingLayer = false;
     this._layerAdded = false;
     this._frameCallbackId = null;
     if (Array.isArray(this.videoParameters)) {
       this.videoParameters = smartTimeProcessor(this.interval, this.videoParameters, ['yaw', 'pitch', 'roll', 'x', 'y', 'z', 'extent']);
       const timeArr = this.videoParameters.map((item) => {
         return item.time;
       })
       this.beginIndex = timeArr[0];
       this.finder = new FastRangeSearcher(timeArr);
     }
   }

   /**
    * @function VideoLayer.prototype.onAdd
    * @description 添加该图层。
    * @param {mapboxgl.Map} map - 地图实例。
    */
   onAdd(map) {
     this._session = {};
     this.map = map;
     // SEI + m3u8：MediaSource 由 hls.js 接管，不能把 m3u8 交给 video.js，否则 VHS 会抢占 MediaSource
     this.renderer = new VideoLayerRenderer({ url: this._sei.managed ? undefined : this.url, player: this.options.player, id: this.layerId });
     this.video = this.renderer.createVideo();
     this.videoDomId = this.renderer.getVideoDomId();
     this._bindPlaybackEvents();
 
     this.video.one('firstplay', () => {
       this._sei.play(this.video);
     });
     this._cancelVideoReady = this.renderer.onVideoReady(() => {
       this._onVideoReady();
     });
     this._sei.start();
   }

   /**
    * @function VideoLayer.prototype.onRemove
    * @description 移除该图层，释放 opencv 矩阵、视频帧回调与事件监听。
    * @param {mapboxgl.Map} map - 地图实例。
    */
   onRemove(map) {
     this._session = null;
     if (this._cancelVideoReady) {
       this._cancelVideoReady();
     }
     this._sei.stop();
     if (this._disposeFrameResources) {
       this._disposeFrameResources();
       this._disposeFrameResources = null;
     }
     const videoEl = this._getVideoElement();
     if (videoEl && this._frameCallbackId !== null && typeof videoEl.cancelVideoFrameCallback === 'function') {
       videoEl.cancelVideoFrameCallback(this._frameCallbackId);
       this._frameCallbackId = null;
     }
     this._clearPoseCache();
     // 时序参数的每条配准都持有矩阵；基准项可能在表中，去重后统一释放。
     new Set([this.baseEntry, ...Object.values(this.timeParams || {})]).forEach((entry) => {
       if (entry && entry.dstTri && entry.dstTri.delete) {
         entry.dstTri.delete();
         entry.dstTri = null;
       }
     });
     this.timeParams = null;
     if (this.clipMat && this.clipMat.delete) {
       this.clipMat.delete();
       this.clipMat = null;
     }
     if (this.dst1 && this.dst1.delete) {
       this.dst1.delete();
       this.dst1 = null;
     }
     const targetMap = map || this.map;
     // 移除由视频图层创建的栅格层及源，避免重加时残留旧画面或重复注册同名源。
     if (targetMap && typeof targetMap.getLayer === 'function' && targetMap.getLayer(this.layerId)) {
       targetMap.removeLayer(this.layerId);
     }
     if (targetMap && typeof targetMap.getSource === 'function' && targetMap.getSource(this.layerId)) {
       targetMap.removeSource(this.layerId);
     }
     if (this.renderer) {
       // 自建播放器销毁全部监听；外部播放器只释放适配器，保留调用方播放器。
       if (this.video && typeof this.video.dispose === 'function') {
         this.video.dispose();
       }
       if (!this.renderer.isExternal) {
         const dom = document.getElementById(this.layerId) || document.getElementById(this.id);
         if (dom && dom.parentNode) {
           dom.parentNode.removeChild(dom);
         }
       }
     }
     this.video = null;
     this.renderer = null;
     this.map = null;
     this._videoReady = false;
     this._buildingLayer = false;
     this._layerAdded = false;
     this.baseEntry = null;
     this.baseRatio = undefined;
     if (this.coordTransfer) {
       this.coordTransfer.dispose();
       this.coordTransfer = null;
     }
     if (this.isSeiSource) {
       this.extent = this.options.extent;
       this.clipRegion = this.options.clipRegion || [];
     }
   }
 
   /**
    * @private
    * @description 视频元数据就绪后初始化配准参数。SEI 模式下等待首个有效 SEI，静态模式直接使用 videoParameters。
    */
   _onVideoReady() {
     if (this._videoReady || !this.video) {
       return;
     }
     const width = this.video.videoWidth();
     const height = this.video.videoHeight();
     if (!width || !height) {
       return;
     }
     this.videoWidth = width;
     this.videoHeight = height;
     this.videoDomId = this.videoDomId || this.renderer.getVideoDomId();
     this._videoReady = true;
     if (this.isSeiSource) {
       this._ensureSeiBaseEntry();
       return;
     }
     this._initFromParameters();
   }
 
   _initFromParameters() {
     if (!Array.isArray(this.videoParameters)) {
       this.videoParameters = [this.videoParameters];
     }
     const session = this._session;
     this._initParameters(this.videoParameters[0]).then((coordTransfer) => {
       if (this._session !== session || !this.map) {
         coordTransfer.dispose();
         return;
       }
       this.coordTransfer = coordTransfer;
       this.timeParams = {};
       this.videoParameters.forEach((dataItem) => {
         const entry = this._computePoseEntry(dataItem);
         if (entry) {
           this.timeParams[dataItem.time || 0] = entry;
         }
       });
       this.baseEntry = this.timeParams[this.beginIndex] || this.timeParams[0];
       if (!this.baseEntry) {
         return;
       }
       this._addVideoLayer(this.map);
       /**
        * @event VideoLayer#parametersready
        * @description 配准参数就绪时触发。
        * @property {Object} pose - 基准时刻的配准参数。
        * @property {number} videoWidth - 视频宽度。
        * @property {number} videoHeight - 视频高度。
        * @property {number} time - 基准时刻，单位秒。
        */
       this.fire('parametersready', {
         pose: this.videoParameters[0],
         videoWidth: this.videoWidth,
         videoHeight: this.videoHeight,
         time: this.videoParameters[0].time || 0
       });
     });
   }
 
   /**
    * @private
    * @description SEI 模式下以时间轴中最早的有效姿态作为基准，初始化坐标转换并创建视频图层。
    * 基准姿态一旦确定即不再变更：输出帧尺寸（dsize）、baseRatio 与裁剪遮罩都依赖它，
    * 中途变更会导致 WebGL 纹理上传静默失败。
    */
   _ensureSeiBaseEntry() {
     if (this._layerAdded || this._buildingLayer || !this._videoReady || !this.seiTimeline || !this.map) {
       return;
     }
     const head = this.seiTimeline.firstPoses(3);
     if (!head.length) {
       return;
     }
     // 裁剪范围随 SEI 一起下发，未显式传入时用它；一旦开始建图层（dsize/遮罩）就不能再改
     if (!this.clipRegion.length) {
       const seiClipRegion = head[0].clipRegion;
       if (Array.isArray(seiClipRegion) && seiClipRegion.length >= 4) {
         this.clipRegion = seiClipRegion.slice(0, 4);
       }
     }
     this._buildingLayer = true;
     const session = this._session;
     this._initParameters(head[0]).then((coordTransfer) => {
       // OpenCV 初始化可能跨越移除、重加，旧会话不能恢复画面或覆盖新相机。
       if (this._session !== session || !this.map) {
         coordTransfer.dispose();
         return;
       }
       this.coordTransfer = coordTransfer;
       const entry = this._computePoseEntry(head[0]);
       this._buildingLayer = false;
       if (!entry || !this.map) {
         return;
       }
       this.baseEntry = entry;
       this._addVideoLayer(this.map);
       this.fire('parametersready', {
         pose: head[0],
         videoWidth: this.videoWidth,
         videoHeight: this.videoHeight,
         time: head[0].time
       });
     });
   }
 
   _getFormatExtent(dataItem) {
     const extent = (dataItem && dataItem.extent) || this.extent;
     if (!extent || extent.length < 3) {
       return null;
     }
     return extent.map((item) => {
       if (Array.isArray(item)) {
         return item;
       }
       return [item.x, item.y];
     });
   }
 
   /**
    * @private
    * @description 由单组配准参数计算透视变换所需的投影结果、目标三角与输出帧尺寸。
    * @param {Object} dataItem - 配准参数。
    * @returns {Object|null} 配准结果，参数不完整时返回 null。
    */
   _computePoseEntry(dataItem) {
     if (!dataItem || !this.coordTransfer || !this.map) {
       return null;
     }
     const formatExtent = this._getFormatExtent(dataItem);
     if (!formatExtent) {
       return null;
     }
     this.coordTransfer.setCameraLocation(CoordTransfer.getCameraParameters(dataItem, this.videoWidth, this.videoHeight));
     const result = bbox(polygon([
       [...formatExtent, formatExtent[0]]
     ]));
     const entry = { result, extent: formatExtent, allContained: true };
     let temp = [[0, 0], [this.videoWidth, 0], [this.videoWidth, this.videoHeight], [0, this.videoHeight]];
     let realHeight = this.videoHeight;
     if (this.clipRegion.length) {
       temp = this.clipRegion;
       realHeight = this.clipRegion[2][1] - this.clipRegion[0][1];
     }
     entry.realHeight = realHeight;
     let latlng = [];
     temp.forEach((point) => {
       const coord = this.coordTransfer.toSpatialCoordinate(point);
       const pcoord = proj4('EPSG:3857', 'EPSG:4326', [coord[0], coord[1]]);
       if (!this._contain(pcoord, result)) {
         entry.allContained = false;
       }
       latlng.push(pcoord);
     });
     let originBounds = [];
     formatExtent.forEach((coord) => {
       const res = this.map.project(coord);
       originBounds.push(res.x);
       originBounds.push(res.y);
     });
     let pointCoords = [];
     latlng.forEach((item) => {
       const res = this.map.project(item);
       pointCoords.push(res.x);
       pointCoords.push(res.y);
     });
     const br = this.map.project([result[2], result[3]]);
     const tl = this.map.project([result[0], result[1]]);
     const size = [Math.abs(br.x - tl.x), Math.abs(br.y - tl.y)];
     const ratio = size[1] ? size[0] / size[1] : this.baseRatio;
     if (this.baseRatio === undefined) {
       this.baseRatio = ratio;
     }
     entry.ratio = ratio;
     // 输出帧尺寸必须全程恒定：video source 的 WebGL 纹理按首帧尺寸创建，
     // 后续帧尺寸一旦变化，texSubImage2D 会静默失败，表现为视频消失/后半段画面不更新。
     // realHeight 恒定（视频高或裁剪区高），仅宽度随 ratio 变化，
     // 这里统一为基准时刻宽度，并在下方把目标点横向缩放对齐，显示几何保持等价。
     entry.dsize = new this.cv.Size(realHeight * this.baseRatio, realHeight);
     const realX = realHeight * ratio;
     const realY = realHeight;
     const ratioX = size[0] ? realX / size[0] : 1;
     const ratioY = size[1] ? realY / size[1] : 1;
     const realRatio = Math.min(ratioX, ratioY);
     pointCoords = this._getPixelBbox(pointCoords, result, entry.allContained);
     const scaleX = ratio ? this.baseRatio / ratio : 1;
     pointCoords = pointCoords.map((item, index) => {
       return (index % 2 === 0 ? item * scaleX : item) * realRatio;
     });
     originBounds = this._getPixelBbox(originBounds);
     entry.originBounds = originBounds.map((item) => {
       return item * realRatio;
     });
     entry.dstTri = this.cv.matFromArray(4, 1, this.cv.CV_32FC2, pointCoords);
     return entry;
   }
 
   render() { }
 
   _getPixelBbox(bounds, bbox, allContained = true) {
     let minX = 0;
     let minY = 0;
     bounds.forEach((item, index) => {
       if ((!minX || item < minX) && index % 2 === 0) {
         minX = item;
       }
       if ((!minY || item < minY) && index % 2 !== 0) {
         minY = item;
       }
     });
     let maxX = 0;
     let maxY = 0;
     if (bbox && !allContained) {
       let pixelLeftBottom = this.map.project([bbox[0], bbox[1]]);
       let pixelRightTop = this.map.project([bbox[2], bbox[3]]);
       maxX = Math.min(Math.abs(minX - pixelLeftBottom.x), Math.abs(minX - pixelRightTop.x));
       maxY = Math.max(Math.abs(minY - pixelLeftBottom.y), Math.abs(minY - pixelRightTop.y));
     }
     bounds = bounds.map((item, index) => {
       if (index % 2 === 0) {
         return item - minX - maxX;
       } else {
         return item - minY + maxY;
       }
     });
     return bounds;
   }
 
   _initParameters(parameters) {
     if (parameters && !Object.keys(parameters).length) {
       return;
     }
     return CoordTransfer.fromVideoParameters(this.cv, parameters, this.videoWidth, this.videoHeight).init();
   }
 
   _addVideoLayer(map) {
     if (this._layerAdded || !this.baseEntry) {
       return;
     }
     let url = this.videoDomId || this.url;
     const extent = this.extent || this.baseEntry.extent;
     this.extent = extent;
     let that = this;
     const session = this._session;
     let srcPixelCoords = [0, 0, that.videoWidth, 0, that.videoWidth, that.videoHeight, 0, that.videoHeight];
     if (this.clipRegion.length) {
       srcPixelCoords = [];
       this.clipRegion.forEach((coord) => {
         srcPixelCoords.push(coord[0]);
         srcPixelCoords.push(coord[1]);
       });
     }
     let srcTri = this.cv.matFromArray(4, 1, this.cv.CV_32FC2,
       srcPixelCoords
     );
     let result = that.baseEntry.result;
     that.dsize = that.baseEntry.dsize;
     let dstTri = that.baseEntry.dstTri;
     let activeEntry = that.baseEntry;
     let canvas = document.createElement('canvas');
     // 裁剪遮罩只依赖基准参数（originBounds / dsize 均恒定），创建一次即可。
     // 原实现每帧新建 clipMat/dst1 且从不 delete，WASM 内存只增不减，
     // 最终 OpenCV 分配失败，表现为画面不再更新。
     let { clipMat, dst1 } = this._updateMask(canvas, that.baseEntry.realHeight, that.baseEntry.ratio);
     this.clipMat = clipMat;
     this.dst1 = dst1;
     let lastGoodFrame = null;
     // 输出帧尺寸已恒定，复用同一 ImageData，避免每帧分配约 30MB(4K) 大数组带来的 GC 停顿
     let outFrame = null;
     // 单应矩阵只在时间参数切换（dstTri 变化）时改变，缓存复用：
     // 省掉每帧一次 findHomography 的 WASM 调用及其内部临时 Mat 分配
     let cachedM = null;
     let cachedDstTri = null;
     // 自适应跳帧状态：4K 帧透视变换耗时(约 30~80ms)可能超过视频帧间隔(33ms)，
     // 处理不过来时逐帧硬算会堆积阻塞主线程，表现为画面与位置一起卡。
     // 记录每帧处理耗时，处理不过来时复用上一帧，等视频时间推进足够再处理新帧，
     // 把"卡死式掉帧"变成"均匀降帧"。
     const FRAME_INTERVAL = 1 / 30;
     let lastProcessCost = 0;
     let lastProcessTime = -1;
     const videoEle = this.video ? this.video.tech().el() : null;
     const timeVarying = that.isSeiSource || (Array.isArray(that.videoParameters) && that.videoParameters.length > 1);
     let current = 0;
     if (timeVarying && videoEle && videoEle.requestVideoFrameCallback) {
       const updateCanvas = (now, metadata) => {
         if (that._session !== session) {
           return;
         }
         current = metadata.mediaTime;
         that._frameCallbackId = videoEle.requestVideoFrameCallback(updateCanvas);
       };
 
       that._frameCallbackId = videoEle.requestVideoFrameCallback(updateCanvas);
     }
     // setCoordinates 会销毁并重建 source 的 WebGL 顶点缓冲，并触发 source 元数据事件。
     // 原实现用 setTimeout(0)，执行时机可能落在渲染中途，与渲染管线形成竞态，
     // 报 enableAttributes undefined，视频闪现。这里改为 rAF（帧间隙执行）+ 50ms 节流
     // （位置更新 20Hz 足够平滑）+ 变化阈值，把调用频率和时机收敛到安全范围。
     let coordRafId = 0;
     // 源回调闭包持有的矩阵也需要随图层释放，重复添加不能累积 WASM 内存。
     this._disposeFrameResources = () => {
       if (coordRafId) {
         cancelAnimationFrame(coordRafId);
       }
       srcTri.delete();
       if (cachedM) {
         cachedM.delete();
       }
     };
     let pendingResult = null;
     let lastCoordTime = 0;
     let lastAppliedResult = null;
     const applyCoords = () => {
       coordRafId = 0;
       if (that._session !== session) {
         return;
       }
       const r = pendingResult;
       if (!r) {
         return;
       }
       if (current < lastCoordTime - 1) {
         lastCoordTime = 0;
       }
       const now = performance.now();
       if (now - lastCoordTime < 50) {
         coordRafId = requestAnimationFrame(applyCoords);
         return;
       }
       lastCoordTime = now;
       const source = map.getSource(that.layerId);
       if (source && typeof source.setCoordinates === 'function') {
         source.setCoordinates([
           [r[0], r[3]],
           [r[2], r[3]],
           [r[2], r[1]],
           [r[0], r[1]]
         ]);
       }
     };
     const scheduleSetCoordinates = (r) => {
       if (lastAppliedResult &&
         Math.abs(r[0] - lastAppliedResult[0]) < 1e-7 &&
         Math.abs(r[1] - lastAppliedResult[1]) < 1e-7 &&
         Math.abs(r[2] - lastAppliedResult[2]) < 1e-7 &&
         Math.abs(r[3] - lastAppliedResult[3]) < 1e-7) {
         return;
       }
       lastAppliedResult = r;
       pendingResult = r;
       if (!coordRafId) {
         coordRafId = requestAnimationFrame(applyCoords);
       }
     };
     map.addSource(this.layerId, {
       type: 'video',
       urls: [url],
       drawImageCallback(frame) {
         let src = null;
         let dst = null;
         let M = null;
         try {
           const videoTime = current || that.video.currentTime();
           if (timeVarying) {
             const entry = that._resolvePoseEntry(videoTime);
             if (entry) {
               if (entry !== activeEntry) {
                 activeEntry = entry;
                 dstTri = entry.dstTri;
                 result = entry.result;
                 that.dsize = entry.dsize;
               }
               scheduleSetCoordinates(result);
             }
           }
           // 自适应跳帧：位置跟随(上方的 scheduleSetCoordinates)照常执行，仅跳过重量级帧处理。
           // 处理耗时超过帧间隔说明算不过来，视频时间推进不足一次处理耗时时直接复用上一帧；
           // 上限 0.1s，保证画面最多降到 10fps，不会卡死。
           // 注意 elapsed 必须非负：循环播放/拖拽进度条时视频时间会回退，
           // 负值若参与比较会导致跳帧条件恒成立，画面永久停在缓存帧。
           const elapsed = videoTime - lastProcessTime;
           if (lastGoodFrame && lastProcessTime >= 0 && lastProcessCost > FRAME_INTERVAL &&
             elapsed >= 0 && elapsed < Math.min(lastProcessCost, 0.1)) {
             return lastGoodFrame;
           }
           const processStart = performance.now();
           src = that.cv.matFromImageData(frame);
           dst = new that.cv.Mat();
           if (!cachedM || cachedDstTri !== dstTri) {
             if (cachedM) { cachedM.delete(); cachedM = null; }
             const newM = that.cv.findHomography(srcTri, dstTri);
             if (newM && newM.rows && newM.cols) {
               cachedM = newM;
               cachedDstTri = dstTri;
             } else {
               if (newM) { newM.delete(); }
               throw new Error('findHomography failed');
             }
           }
           M = cachedM;
           that.cv.warpPerspective(src, dst, M, that.dsize);
           let outMat = dst;
           if (!activeEntry.allContained) {
             dst.copyTo(dst1, clipMat);
             outMat = dst1;
           }
           if (!outFrame || outFrame.width !== outMat.cols || outFrame.height !== outMat.rows) {
             outFrame = new ImageData(outMat.cols, outMat.rows);
           }
           outFrame.data.set(outMat.data);
           src.delete();
           dst.delete();
           // 注意：M 是缓存的单应矩阵（cachedM），不能在此 delete，
           // 仅时间参数切换时由缓存替换逻辑释放旧矩阵
           lastProcessCost = (performance.now() - processStart) / 1000;
           lastProcessTime = videoTime;
           lastGoodFrame = outFrame;
           return outFrame;
         } catch (err) {
           // 单帧处理失败不拖垮渲染循环：返回上一成功帧，视频不停更不消失
           if (src) { src.delete(); }
           if (dst) { dst.delete(); }
           // M 指向缓存对象 cachedM，不能 delete
           const nowErr = Date.now();
           if (!that._lastErrorLogAt || nowErr - that._lastErrorLogAt > 1000) {
             that._lastErrorLogAt = nowErr;
             // eslint-disable-next-line no-console
             console.error('[VideoLayer] process frame error:', err);
           }
           if (lastGoodFrame) {
             return lastGoodFrame;
           }
           // 首帧即失败时返回与输出同尺寸的空白帧（尺寸必须恒定，否则上传静默失败）
           return new ImageData(
             Math.max(1, Math.round(that.dsize.width)),
             Math.max(1, Math.round(that.dsize.height))
           );
         }
       },
       coordinates: [
         [result[0], result[3]],
         [result[2], result[3]],
         [result[2], result[1]],
         [result[0], result[1]]
       ]
     });
 
     map.addLayer(
       {
         id: this.layerId,
         type: 'raster',
         source: this.layerId,
         paint: {
           'raster-fade-duration': 0
         }
       }
     );
     this._layerAdded = true;
     const source = map.getSource(this.layerId);
     if (source) {
       source.play();
     }
   }
 
   /**
    * @private
    * @description 按媒体时间取当前生效的配准结果。SEI 模式下按需计算并做 LRU 缓存，
    * 静态模式下直接查表。drawImageCallback 每帧都会调用，这里不能做重计算。
    * @param {number} mediaTime - 视频当前播放时间，单位秒。
    * @returns {Object|null} 配准结果。
    */
   _resolvePoseEntry(mediaTime) {
     if (this.isSeiSource) {
       if (!this.seiTimeline) {
         return this.baseEntry;
       }
       const resolved = this.seiTimeline.resolve(mediaTime);
       if (!resolved) {
         return this.baseEntry;
       }
       const pose = resolved.ratio > 0.5 ? resolved.next : resolved.prev;
       if (!pose || typeof pose.time !== 'number') {
         return this.baseEntry;
       }
       const key = pose.time.toFixed(2);
       const cached = this._poseCache.get(key);
       if (cached) {
         this._touchPoseKey(key);
         return cached;
       }
       const entry = this._computePoseEntry(pose);
       if (!entry) {
         return this.baseEntry;
       }
       this._cachePoseEntry(key, entry);
       return entry;
     }
     if (!this.finder || !this.timeParams) {
       return this.baseEntry;
     }
     const found = this.finder.findNearest(mediaTime);
     if (!found) {
       return this.baseEntry;
     }
     return this.timeParams[found.value] || this.baseEntry;
   }
 
   _touchPoseKey(key) {
     const index = this._poseCacheKeys.indexOf(key);
     if (index >= 0 && index !== this._poseCacheKeys.length - 1) {
       this._poseCacheKeys.splice(index, 1);
       this._poseCacheKeys.push(key);
     }
   }
 
   _cachePoseEntry(key, entry) {
     this._poseCache.set(key, entry);
     this._touchPoseKey(key);
     if (this._poseCacheKeys.indexOf(key) < 0) {
       this._poseCacheKeys.push(key);
     }
     while (this._poseCacheKeys.length > this.maxCachedPoses) {
       const oldest = this._poseCacheKeys.shift();
       const cached = this._poseCache.get(oldest);
       if (cached && cached.dstTri && cached.dstTri.delete) {
         cached.dstTri.delete();
       }
       this._poseCache.delete(oldest);
     }
   }
 
   _clearPoseCache() {
     this._poseCache.forEach((entry) => {
       if (entry.dstTri && entry.dstTri.delete) {
         entry.dstTri.delete();
       }
     });
     this._poseCache.clear();
     this._poseCacheKeys = [];
   }

   _updateMask(canvas, realHeight, ratio) {
     canvas.width = realHeight * ratio;
     canvas.height = realHeight;
     let context = canvas.getContext('2d');
     context.beginPath();
     this.baseEntry.originBounds.forEach((coord, index) => {
       if (index === 0) {
         context.moveTo(coord, this.baseEntry.originBounds[index + 1]);
       }
       if (index % 2 === 0) {
         context.lineTo(coord, this.baseEntry.originBounds[index + 1]);
       }
     });
     context.closePath();
     context.fillStyle = '#ffffff';
     context.fill();
     let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
     let clipMat = this.cv.matFromImageData(imgData);
     let dst1 = new this.cv.Mat();
     return { clipMat, dst1 };
   }
 
   _contain(coord, bounds) {
      return (coord[0] > bounds[0] || Math.abs(coord[0] - bounds[0]) < 0.000001 ) && (coord[0] < bounds[2] || Math.abs(coord[0] - bounds[2]) < 0.000001 ) && (coord[1] > bounds[1] ||  Math.abs(coord[1] - bounds[1]) < 0.000001) && (coord[1] < bounds[3] ||  Math.abs(coord[1] - bounds[3]) < 0.000001);
   }
 
   /**
     * @function VideoLayer.prototype.moveLayer
     * @description 移动图层。
     * @param {string} beforeId - 要移动到的图层前的 id。
     */
   moveLayer(beforeId) {
     this.map.moveLayer(this.layerId, beforeId);
   }
 
   /**
    * @function VideoLayer.prototype.setVisibility
    * @description 设置图层可见性。
    * @param {boolean} [visibility] - 是否显示图层。
    */
   setVisibility(visibility) {
     const visible = visibility ? 'visible' : 'none';
     this.map.setLayoutProperty(this.layerId, 'visibility', visible);
   }

   /**
    * @version 12.1.2
    * @function VideoLayer.prototype.play
    * @description 播放视频。
    * @returns {Promise|undefined} 播放 Promise，自动播放被浏览器拦截时以 `NotAllowedError` 拒绝；播放器尚未创建时返回 `undefined`。
    */
   play() {
     let promise;
     if (this.video) {
       promise = this._sei.play(this.video);
     }
     const source = this._getVideoSource();
     if (source && typeof source.play === 'function') {
       source.play();
     }
     return silencePlayRejection(promise);
   }

   /**
    * @version 12.1.2
    * @function VideoLayer.prototype.pause
    * @description 暂停视频。
    */
   pause() {
     if (this.video) {
       this.video.pause();
     }
     const source = this._getVideoSource();
     if (source && typeof source.pause === 'function') {
       source.pause();
     }
   }

   /**
    * @version 12.1.2
    * @function VideoLayer.prototype.paused
    * @description 获取当前视频播放状态。返回 `true` 表示已暂停，返回 `false` 表示正在播放。
    * @returns {boolean} 视频是否暂停。
    */
   paused() {
     if (this.video && typeof this.video.paused === 'function') {
       return this.video.paused();
     }
     return true;
   }

   _bindPlaybackEvents() {
     if (!this.video) {
       return;
     }
     /**
      * @event VideoLayer#play
      * @description 视频开始播放时触发。
      */
     this.video.on('play', () => {
       this.fire('play');
     });
     /**
      * @event VideoLayer#pause
      * @description 视频暂停时触发。
      */
     this.video.on('pause', () => {
       this.fire('pause');
     });
   }

   /**
    * @version 12.1.2
    * @function VideoLayer.prototype.getSeiTimeline
    * @description 获取 SEI 配准参数时间轴。
    * @returns {VideoLayer.SeiPoseTimeline|null} SEI 时间轴，非 SEI 模式返回 null。
    */
   getSeiTimeline() {
     return this.seiTimeline || null;
   }

   /**
    * @version 12.1.2
    * @function VideoLayer.prototype.pushSeiParameters
    * @description 手动推送已解析的 SEI 配准参数（如通过 WebSocket 自行接收 SEI 时使用）。
    * 输入相机坐标与 extent 按构造参数 `seiProjection` 指定的源投影解析；内部相机坐标为 EPSG:3857、extent 为 EPSG:4326。
    * @param {Array<Object>} items - 配准参数数组，每项需包含 `time`、`pitch`、`roll`、`yaw`、`x`、`y`、`z`、`fovX`、`fovY`、`centerX`、`centerY`。
    * @returns {VideoLayer} 当前图层。
    */
    pushSeiParameters(items) {
      if (Array.isArray(items)) {
        this._sei.push(items);
      }
      return this;
    }

   /**
    * @version 12.1.2
    * @function VideoLayer.prototype.unbindHls
    * @description 解除 SEI 拉流，销毁 iClient 内部创建的 hls.js 实例。
    * @returns {VideoLayer} 当前图层。
    */
   unbindHls() {
     this._sei.unbindHls();
     return this;
   }

   /**
    * @version 12.2.0
    * @function VideoLayer.prototype.getHls
    * @description 获取当前 SEI 拉流使用的 hls.js 实例。
    * @returns {Object|null} hls.js 实例，不存在时返回 `null`。
    */
   getHls() {
     return this._sei.getHls();
   }

   /**
    * @version 12.2.0
    * @function VideoLayer.prototype.restartHls
    * @description 重建 SEI 直播会话：销毁当前 hls.js 实例并重新拉流，同时清空姿态缓存与 SEI 时间轴。
    * `hlsAutoRecover` 为 `false` 时，收到 `seistreamerror` 后可调用本方法自行恢复。
    * 仅在 iClient 内部接管拉流（`parametersSource` 为 `'SEI'` 且地址为 m3u8）且会话存在时生效，其余情况不做处理。
    * @returns {VideoLayer} 当前图层。
    */
   restartHls() {
     this._sei.restart();
     return this;
   }

   /**
    * @version 12.2.0
    * @function VideoLayer.prototype.getSeiLiveSyncPosition
    * @description 获取直播推荐同步播放位置（秒），仅内部接管的 hls.js 直播流可用。
    * @returns {number|null} 推荐位置，不可用时返回 `null`。
    */
   getSeiLiveSyncPosition() {
     return this._sei.getLiveSyncPosition();
   }

   /**
    * @version 12.2.0
    * @function VideoLayer.prototype.getSeiLatency
    * @description 获取当前直播延迟（秒），仅内部接管的 hls.js 直播流可用。
    * @returns {number|null} 延迟秒数，不可用时返回 `null`。
    */
   getSeiLatency() {
     return this._sei.getLatency();
   }

   /**
    * @version 12.1.2
    * @function VideoLayer.prototype.getVideoElement
    * @description 获取图层使用的原生 video 元素。
    * @returns {HTMLVideoElement|null} 原生 video 元素。
    */
   getVideoElement() {
     return this._getVideoElement();
   }

   /**
    * @version 12.1.2
    * @function VideoLayer.prototype.isParametersReady
    * @description 判断配准参数是否已就绪（基准姿态已确定、视频图层已创建）。
    * @returns {boolean} 是否已就绪。
    */
   isParametersReady() {
     return !!this.baseEntry && this._layerAdded;
   }

   _getVideoElement() {
     return getVideoElement(this.video);
   }

   _handleSeiPayload(data) {
     return this._sei.handlePayload(data);
   }

   _getVideoSource() {
     if (!this.map || !this.layerId || typeof this.map.getSource !== 'function') {
       return null;
     }
     return this.map.getSource(this.layerId) || null;
   }
 }
