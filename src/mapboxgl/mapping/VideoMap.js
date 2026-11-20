import mapboxgl from 'mapbox-gl';
import proj4 from 'proj4';
import CoordTransfer from './CoordTransfer';
import VideoMapLayer from './layers/VideoMapLayer';
import GeojsonLayer from './layers/GeojsonLayer';
import {
  transformCoord,
  transformCoordReverse,
  smartTimeProcessor,
  FastRangeSearcher,
  resolveCameraPose
} from './utils/VideoMapUtil';
import GeojsonSource from './GeojsonSource';
import VideoMapDraw from './VideoMapDraw';
import { VideoSei } from '@supermapgis/iclient-common/overlay/video/VideoSei';
import { getVideoElement } from '@supermapgis/iclient-common/overlay/video/VideoPlayerAdapter';
import { Lang } from '@supermapgis/iclient-common/lang/Lang';

const MAP_EVENTS = [
  'resize',
  'webglcontextlost',
  'webglcontextrestored',
  'remove',
  'movestart',
  'load',
  'contextmenu',
  'dblclick',
  'click',
  'touchcancel',
  'touchmove',
  'touchend',
  'touchstart',
  'dataloading',
  'mousemove',
  'mouseup',
  'mousedown',
  'sourcedataloading',
  'error',
  'data',
  'styledata',
  'sourcedata',
  'mouseout',
  'styledataloading',
  'moveend',
  'move',
  'render',
  'zoom',
  'zoomstart',
  'zoomend',
  'boxzoomstart',
  'boxzoomcancel',
  'boxzoomend',
  'rotate',
  'rotatestart',
  'rotateend',
  'dragend',
  'drag',
  'dragstart',
  'pitch',
  'idle'
];

/**
 * @typedef {Object} VideoMap.VideoParameters - 视频地图配准参数（静态配准，相机位置固定）。
 * @property {number} pitch - 相机俯仰角，单位：度。
 * @property {number} roll - 相机侧偏角，单位：度。
 * @property {number} yaw - 相机偏航角，单位：度。
 * @property {number} x - 相机位置 x 坐标（投影至 EPSG:3857 后的横坐标）。
 * @property {number} y - 相机位置 y 坐标（投影至 EPSG:3857 后的纵坐标）。
 * @property {number} z - 相机位置 z 坐标（投影至 EPSG:3857 后的高程）。
 * @property {number} fovX - 相机水平视场角，单位：度。内部通过 videoWidth 与该值换算为水平焦距 fx。
 * @property {number} fovY - 相机垂直视场角，单位：度。内部通过 videoHeight 与该值换算为垂直焦距 fy。
 * @property {number} centerX - 相机主点（光轴与图像平面交点）的水平像素坐标。
 * @property {number} centerY - 相机主点（光轴与图像平面交点）的垂直像素坐标。
 */

/**
 * @version 12.1.2
 * @typedef {Object} VideoMap.VideoTimeParameters - 动态视频配准参数（按视频时间动态更新相机位置）。
 * @property {number} time - 视频时间戳，单位秒。用于按视频播放时间匹配对应的相机参数。
 * @property {number} pitch - 相机俯仰角，单位：度。
 * @property {number} roll - 相机侧偏角，单位：度。
 * @property {number} yaw - 相机偏航角，单位：度。
 * @property {number} x - 相机位置 x 坐标（投影至 EPSG:3857 后的横坐标）。
 * @property {number} y - 相机位置 y 坐标（投影至 EPSG:3857 后的纵坐标）。
 * @property {number} z - 相机位置 z 坐标（投影至 EPSG:3857 后的高程）。
 * @property {number} fovX - 相机水平视场角，单位：度。内部通过 videoWidth 与该值换算为水平焦距 fx。
 * @property {number} fovY - 相机垂直视场角，单位：度。内部通过 videoHeight 与该值换算为垂直焦距 fy。
 * @property {number} centerX - 相机主点（光轴与图像平面交点）的水平像素坐标。
 * @property {number} centerY - 相机主点（光轴与图像平面交点）的垂直像素坐标。
 */

/**
 * @version 12.1.2
 * @typedef {function} VideoMap.SeiParser
 * @description 自定义 SEI 解析函数。入参为 hls.js 提供的单个 SEI sample 与上下文，返回内部坐标约定下的相机参数（相机 x/y 为 EPSG:3857，extent 为 EPSG:4326），返回 `null` 表示该样本无效。
 * @param {Object} sample - SEI 样本，形如 `{payloadType, pts, userData, userDataBytes, uuid}`。
 * @param {Object} context - 上下文，含 `{frag, sample, videoWidth, videoHeight, seiProjection}`。自定义解析器返回值仍需使用内部坐标约定。
 * @returns {VideoMap.VideoParameters|null}
 */

/**
 * @version 12.2.0
 * @event VideoMap#seistreamready
 * @description 内部创建的 hls.js 解析完播放列表、直播流就绪时触发。
 */

/**
 * @version 12.2.0
 * @event VideoMap#seistreamerror
 * @description 内部创建的 hls.js 报错时触发，致命错误会先尝试自动恢复。
 * @property {Object} data - hls.js 原始的 error data。
 * @property {string} hlsType - hls.js 的错误类型，事件自身的 type 为事件名。
 * @property {string} details - hls.js 错误详情。
 * @property {boolean} fatal - 是否为致命错误。
 */

/**
 * @version 12.1.2
 * @event VideoMap#seiinvalid
 * @description SEI 解析失败时触发，最多每秒一次。
 * @property {string} reason - 失败原因。
 * @property {Object} sample - 原始 SEI 样本。
 * @property {Object} frag - 分片信息。
 */

/**
 * @class VideoMap
 * @classdesc 视频地图
 * @category Visualization Video
 * @version 11.2.0
 * @modulecategory Mapping
 * @param {Object} options - 参数
 * @param {string} [options.url] - 视频 或 流链接。支持 flv, m3u8, mp4 格式。`parametersSource` 为 `'SEI'` 且为 m3u8 地址时，iClient 内部会用 hls.js 接管 MediaSource 并解析 SEI：SEI 只能由 hls.js 解析，video.js 内置的 VHS 在 Worker 内 transmux 会把 SEI 丢弃且不外抛事件，因此该地址不会交给 video.js。
 * @param {Object|HTMLVideoElement} [options.player] - 外部 video.js 播放器或原生 video，所有权由调用方保留。
 * @param {VideoMap.VideoParameters|Array<VideoMap.VideoTimeParameters>} [options.videoParameters] - 视频地图配准参数。传入对象时为静态配准（相机位置固定）；传入数组时为动态配准，按视频时间动态更新相机参数。`parametersSource` 为 `'SEI'` 时可不传，参数由 SEI 实时提供。
 * @param {string|HTMLElement} [options.container='map'] - 地图容器 id 或 DOM 元素。
 * @param {Object} [options.opencv] - opencv.js 实例。未传入时取 window.cv；若均不存在将抛出异常。
 * @param {number} [options.videoWidth] - 视频宽度，单位像素。未设置时默认读取视频实际宽度。
 * @param {number} [options.videoHeight] - 视频高度，单位像素。未设置时默认读取视频实际高度。
 * @param {Object} [options.styleOptions] - 视频地图风格配置，对应 mapbox-gl 的 style 对象（sprite、glyphs 等）。
 * @param {boolean} [options.autoplay=true] - 视频是否自动播放。
 * @param {boolean} [options.loop=true] - 视频是否循环播放。
 * @param {number} [options.interval=0.1] - 动态配准参数的时间重采样间隔，单位秒。仅当 videoParameters 为数组时生效：对原始相机参数序列按该间隔做插值或抽稀，决定相机位置随时间变化的精度。
 * @param {string} [options.parametersSource='custom'] - 配准参数来源。`'custom'` 使用构造参数；`'SEI'` 使用视频流 SEI 实时下发的相机参数。
 * @param {string} [options.seiProjection='EPSG:3857'] - SEI 相机坐标与 extent 的源投影，仅支持 `EPSG:3857` 和 `EPSG:4326`。
 * @param {VideoMap.SeiParser} [options.seiParser] - 自定义 SEI 解析函数，仅 `parametersSource` 为 `'SEI'` 时生效。
 * @fires VideoMap#load
 * @fires VideoMap#videoparameterupdate
 * @fires VideoMap#videoparameterready
 * @fires VideoMap#videoparametersei
 * @fires VideoMap#seiinvalid
 * @fires VideoMap#seistreamready
 * @fires VideoMap#seistreamerror
 * @fires VideoMap#play
 * @fires VideoMap#pause
 * @fires VideoMap#drawstart
 * @fires VideoMap#drawcreate
 * @fires VideoMap#drawupdate
 * @fires VideoMap#drawcancel
 * @fires VideoMap#drawclear
 * @fires VideoMap#drawmodechange
 * @fires VideoMap#drawselectionchange
 * @fires VideoMap#drawdelete
 * @extends {mapboxgl.Evented}
 * @usage
 *```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script type="text/javascript" src="https://iclient.supermap.io/web/libs/opencv/3.4/opencv.js"></script>
 * <script>
 *   new {namespace}.VideoMap(options);
 * 
 * </script>
 *
 *  // ES6 Import
 * import { VideoMap } from "{npm}";
 * // 将上面 opencv 源码拷贝到本地路径引用
 * options.opencv = "your opencv path";
 * new VideoMap(options);
 * ```
 */

export class VideoMap extends mapboxgl.Evented {
  constructor(options) {
    super();
    const {
      container,
      url,
      player,
      videoParameters,
      autoplay,
      loop,
      videoWidth,
      videoHeight,
      opencv,
      styleOptions,
      interval,
      seiOffset
    } = options;
    this.container = container || 'map';
    this.player = player;
    this.layerCache = {};
    this.sourceCache = {};
    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;
    this.autoplay = autoplay !== undefined ? autoplay : true;
    this.loop = loop !== undefined ? loop : true;
    this.styleOptions = styleOptions || {};
    this._destroyed = false;
    this._cameraSession = {};
    this.cv = opencv || window.cv;
    if (!this.cv) {
      throw new Error('opencv.js instance is not existed!');
    }
    this._sei = new VideoSei(options, {
      getVideoElement: () => this.getVideoElement(),
      getVideoSize: () => ({ videoWidth: this.videoWidth, videoHeight: this.videoHeight }),
      emit: (type, event) => this.fire(type, event),
      onData: (event) => this.fire('videoparametersei', event),
      onUpdate: () => this._onSeiTimelineAdd(),
      onReset: () => {
        this._cameraSession = {};
        this._seiInitializing = false;
        this.parametersReady = false;
        this.pendingVectorUpdate = false;
        this.lastVectorUpdateTime = -Infinity;
      }
    });
    this.parametersSource = this._sei.parametersSource;
    this.isSeiSource = this._sei.isSeiSource;
    this.seiProjection = this._sei.projection;
    this.seiTimeline = this._sei.timeline;
    this.seiOffset = seiOffset || 0;
    this.url = url;
    this.parametersReady = false;
    this._warnedTimeRange = false;
    if (!videoParameters && !this.isSeiSource) {
      throw new Error('videoParameters must be config!');
    }
    this.interval = interval || 0.1;
    this.vectorUpdateInterval = this.interval;
    this.isTimeVarying = Array.isArray(videoParameters);
    this.rawVideoParameters = videoParameters;
    this.videoParameters = this.isTimeVarying
      ? smartTimeProcessor(this.interval, videoParameters, ['yaw', 'pitch', 'roll', 'x', 'y', 'z'])
      : videoParameters;
    if (this.isTimeVarying) {
      this.timeSearcher = new FastRangeSearcher(this.videoParameters.map((item) => item.time));
    }
    this._pendingControls = [];
    this._mapEventListeners = {};
    const boundMapMethods = new WeakMap();
    this._createMap().then((map) => {
      if (this._destroyed) {
        map.remove();
        return;
      }
      this.map = map;
      this.map._smVideoMap = this;
      this._flushPendingControls();
      this._addVideoLayer(url);
    });
    return new Proxy(this, {
      get: (target, property, receiver) => {
        if (Reflect.has(target, property)) {
          return Reflect.get(target, property, receiver);
        }
        const map = target.map;
        if (!map || !(property in map)) {
          return undefined;
        }
        const value = Reflect.get(map, property, map);
        if (typeof value !== 'function') {
          return value;
        }
        if (!boundMapMethods.has(value)) {
          boundMapMethods.set(value, value.bind(map));
        }
        return boundMapMethods.get(value);
      },
      set: (target, property, value, receiver) => {
        if (Reflect.has(target, property)) {
          return Reflect.set(target, property, value, receiver);
        }
        const map = target.map;
        if (map && property in map) {
          return Reflect.set(map, property, value, map);
        }
        return Reflect.set(target, property, value, receiver);
      },
      has: (target, property) => Reflect.has(target, property) || !!(target.map && property in target.map)
    });
  }
  /**
   * 
   * 
   * @version 12.1.2
   */
  on(type, layerIds, listener) {
    if (!MAP_EVENTS.includes(type) || type === 'load') {
      return arguments.length === 2 ? super.on(type, layerIds) : super.on(type, listener);
    }
    const callback = arguments.length === 2 ? layerIds : listener;
    const context = arguments.length === 2 ? undefined : arguments[3];
    const eventListener = this._createMapEventListener(type, layerIds, callback, context, false);
    this._addMapEventListener(eventListener);
    return this;
  }

  once(type, layerIds, listener) {
    if (!MAP_EVENTS.includes(type) || type === 'load') {
      return arguments.length === 2 ? super.once(type, layerIds) : super.once(type, listener);
    }
    const callback = arguments.length === 2 ? layerIds : listener;
    const context = arguments.length === 2 ? undefined : arguments[3];
    const eventListener = this._createMapEventListener(type, layerIds, callback, context, true);
    this._addMapEventListener(eventListener);
    return this;
  }

  off(type, layerIds, listener) {
    if (!MAP_EVENTS.includes(type) || type === 'load') {
      return arguments.length === 2 ? super.off(type, layerIds) : super.off(type, listener);
    }
    const callback = arguments.length === 2 ? layerIds : listener;
    const listeners = this._mapEventListeners[type] || [];
    this._mapEventListeners[type] = listeners.filter((eventListener) => {
      if (callback && eventListener.listener !== callback) {
        return true;
      }
      if (this.map) {
        this._removeMapEventListener(eventListener);
      }
      return false;
    });
    return this;
  }

  _createMapEventListener(type, layerIds, listener, context, once) {
    const hasLayerIds = arguments.length > 1 && typeof layerIds !== 'function';
    const eventListener = {
      type,
      layerIds: hasLayerIds ? layerIds : undefined,
      listener: hasLayerIds ? listener : layerIds,
      context: hasLayerIds ? context : undefined,
      once,
      handler: null
    };
    eventListener.handler = (event) => {
      const mapEvent = this._bindMapEvent(event);
      eventListener.listener.call(eventListener.context || this, mapEvent);
      if (eventListener.once) {
        this.off(type, eventListener.listener);
      }
    };
    return eventListener;
  }

  _addMapEventListener(eventListener, addToListeners = true) {
    if (addToListeners) {
      const listeners = this._mapEventListeners[eventListener.type] || [];
      listeners.push(eventListener);
      this._mapEventListeners[eventListener.type] = listeners;
    }
    if (!this.map) {
      return;
    }
    if (eventListener.layerIds === undefined) {
      eventListener.once ? this.map.once(eventListener.type, eventListener.handler) : this.map.on(eventListener.type, eventListener.handler);
    } else {
      eventListener.once
        ? this.map.once(eventListener.type, eventListener.layerIds, eventListener.handler)
        : this.map.on(eventListener.type, eventListener.layerIds, eventListener.handler);
    }
  }

  _removeMapEventListener(eventListener) {
    if (eventListener.layerIds === undefined) {
      this.map.off(eventListener.type, eventListener.handler);
    } else {
      this.map.off(eventListener.type, eventListener.layerIds, eventListener.handler);
    }
  }

  /**
   * @function VideoMap.prototype.addLayer
   * @description 添加图层。
   * @param {Object} layer - 图层配置。
   * @param {string} layer.id - 图层 id
   * @param {string} layer.type - 图层类型
   * @param {string|Object} layer.source - 数据源配置
   * @param {Array} [layer.filter] - 过滤配置
   * @param {Object} [layer.layout] - 布局配置
   * @param {Object} [layer.paint] - 绘制配置
   * @param {number} [layer.maxzoom] - 最大级别
   * @param {number} [layer.minzoom] - 最小级别
   * @param {string} beforeId - 已经存在的图层 ID。
   */
  addLayer(layer, beforeId) {
    if (!this._mapExisted()) {
      return;
    }
    if (this.layerCache[layer.id]) {
      return;
    }
    const currentLayer = new GeojsonLayer(this);
    currentLayer.add(layer, beforeId);
    this.layerCache[layer.id] = currentLayer;
  }

  /**
   * @function VideoMap.prototype.addSource
   * @description  添加数据源。
   * @param {string} id - 数据源 id。
   * @param {Object} source - 图层源配置。
   * @param {string} source.type - 只支持 geojson
   * @param {Object} source.data - geojson 数据。
   */
  addSource(id, source) {
    if (!this._mapExisted()) {
      return;
    }
    if (this.sourceCache[id]) {
      return;
    }
    const geojsonSource = new GeojsonSource(this);
    geojsonSource.add(id, source);
    this.sourceCache[id] = geojsonSource;
  }

  /**
   * @function VideoMap.prototype.getSource
   * @description 获取数据源。视频地图 GeoJSON 数据源的 data 为 EPSG:4326 原始数据，其余行为保持 Mapbox source 兼容。
   * @param {string} id - 数据源 id。
   * @returns {Object|undefined} Mapbox source 或视频地图 GeoJSON source 代理。
   */
  getSource(id) {
    if (!this._mapExisted()) {
      return undefined;
    }
    const source = this.map.getSource(id);
    const videoSource = this.sourceCache[id];
    if (!source || !videoSource || typeof videoSource.getData !== 'function') {
      return source;
    }
    return new Proxy(source, {
      get(target, property) {
        if (property === '_data') {
          return videoSource.getData();
        }
        if (property === 'getData') {
          return videoSource.getData.bind(videoSource);
        }
        if (property === 'setData') {
          return videoSource.setData.bind(videoSource);
        }
        const value = Reflect.get(target, property, target);
        return typeof value === 'function' ? value.bind(target) : value;
      }
    });
  }

  /**
   * @private
   * @function VideoMap.prototype.updateAtTime
   * @description 使用视频时间更新相机参数并重新投影已添加的 GeoJSON 数据源。
   * @param {number} time - 视频时间，单位秒。
   */
  updateAtTime(time) {
    if (this.isSeiSource) {
      this._updateSeiAtTime(time);
      return;
    }
    if (!this.isTimeVarying || !this.timeSearcher || !this.coordTransfer) {
      return;
    }
    if (time < this.currentTime) {
      this.lastVectorUpdateTime = -Infinity;
    }
    this.currentTime = time;
    if (this.pendingVectorUpdate || time - (this.lastVectorUpdateTime || -Infinity) < this.vectorUpdateInterval) {
      return;
    }
    const range = this.timeSearcher.findRange(time);
    if (!range) {
      if (!this._warnedTimeRange) {
        this._warnedTimeRange = true;
        console.warn(Lang.i18n('msg_videoMapTimeRangeMissing'), time);
      }
      return;
    }
    this._warnedTimeRange = false;
    const pose = resolveCameraPose(this.rawVideoParameters, time);
    this.applyCameraPose(pose);
  }

  /**
   * @private
   * @function VideoMap.prototype._updateSeiAtTime
   * @description SEI 参数源下，按视频播放时间从 SEI 时间轴插值相机参数并重投影。
   * @param {number} time - 视频播放时间（mediaTime），单位秒。
   */
  _updateSeiAtTime(time) {
    if (!this.coordTransfer || !this.seiTimeline) {
      return;
    }
    const mediaTime = time + this.seiOffset;
    if (mediaTime < this.currentTime) {
      this.lastVectorUpdateTime = -Infinity;
    }
    this.currentTime = mediaTime;
    if (this.pendingVectorUpdate || mediaTime - (this.lastVectorUpdateTime || -Infinity) < this.vectorUpdateInterval) {
      return;
    }
    const slice = this.seiTimeline.sliceAround(mediaTime);
    if (!slice || !slice.length) {
      return;
    }
    const pose = resolveCameraPose(slice, mediaTime);
    if (!pose) {
      return;
    }
    this.applyCameraPose(pose);
  }

  /**
   * @private
   * @function VideoMap.prototype.applyCameraPose
   * @description 把相机参数写入 coordTransfer 并在下一帧重投影所有已添加的矢量数据源。
   * @param {Object} pose - 相机参数。
   */
  applyCameraPose(pose) {
    this.coordTransfer.setCameraLocation(CoordTransfer.getCameraParameters(pose, this.videoWidth, this.videoHeight));
    this.pendingVectorUpdate = true;
    const session = this._cameraSession;
    const update = () => {
      if (this._destroyed || this._cameraSession !== session) {
        return;
      }
      this.pendingVectorUpdate = false;
      this.lastVectorUpdateTime = this.currentTime;
      Object.keys(this.sourceCache).forEach((id) => {
        this.sourceCache[id].update();
      });
      if (this.map) {
        this.map.fire('move');
      }
      /**
       * @version 12.1.2
       * @event VideoMap#videoparameterupdate
       * @description 矢量要素重投影完成时触发。已打开的弹窗可监听此事件跟随要素位置更新。
       */
      this.fire('videoparameterupdate', { time: this.currentTime });
    };
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(update);
    } else {
      update();
    }
  }

  /**
   * @function VideoMap.prototype.toSpatialCoordinate
   * @description 将视频地图坐标（lngLat）转换为真实地理坐标（EPSG:3857）。
   * @param {mapboxgl.LngLat} lngLat - 视频地图坐标。
   * @returns {Array<number>|null} 真实地理坐标 [x, y, z]（EPSG:3857），无法转换时返回 null。
   */
  toSpatialCoordinate(lngLat) {
    if (!this.coordTransfer || !this.originCoordsLeftTop || !this.originCoordsRightBottom || !this.videoWidth || !this.videoHeight) {
      return null;
    }
    const videoPixel = transformCoordReverse({
      coord: [lngLat.lng, lngLat.lat],
      originCoordsRightBottom: this.originCoordsRightBottom,
      originCoordsLeftTop: this.originCoordsLeftTop,
      videoHeight: this.videoHeight,
      videoWidth: this.videoWidth
    });
    return this.coordTransfer.toSpatialCoordinate(videoPixel);
  }

  /**
   * @private
   * @function VideoMap.prototype.project
   * @description 将 EPSG:4326 经纬度投影到当前视频地图坐标后，再转换为屏幕像素坐标。
   * @param {mapboxgl.LngLat|Object|Array<number>} lngLat - EPSG:4326 坐标。
   * @returns {mapboxgl.Point} 屏幕像素坐标。
   */
  project(lngLat) {
    if (!this.map) {
      return null;
    }
    const normalizedLngLat = mapboxgl.LngLat.convert(lngLat);
    const videoLngLat = this.toVideoMapCoordinate(
      proj4('EPSG:4326', 'EPSG:3857', [normalizedLngLat.lng, normalizedLngLat.lat])
    );
    return this.projectVideoMapCoordinate(videoLngLat);
  }

  /**
   * @private
   * @function VideoMap.prototype.projectVideoMapCoordinate
   * @description 将当前视频地图坐标转换为屏幕像素坐标。仅供已经持有视频地图坐标的调用方使用。
   * @param {Array<number>|mapboxgl.LngLat|null} videoLngLat - 当前视频地图坐标。
   * @returns {mapboxgl.Point|null} 屏幕像素坐标。
   */
  projectVideoMapCoordinate(videoLngLat) {
    if (!this.map || !videoLngLat) {
      return null;
    }
    return this.map.project(mapboxgl.LngLat.convert(videoLngLat));
  }
  /**
   * @private
   * @function VideoMap.prototype.toVideoMapCoordinate
   * @description 将真实地理坐标（EPSG:3857）按当前相机参数投影到视频地图坐标。
   * @param {Array<number>} spatialPoint - 真实地理坐标 [x, y] 或 [x, y, z]（EPSG:3857）。
   * @returns {Array<number>|null} 视频地图坐标 [lng, lat]，无法转换时返回 null。
   */
  toVideoMapCoordinate(spatialPoint) {
    if (!this.coordTransfer || !this.originCoordsLeftTop || !this.originCoordsRightBottom || !this.videoWidth || !this.videoHeight) {
      return null;
    }
    const videoCoord = this.coordTransfer.toVideoCoordinate(spatialPoint);
    if (!videoCoord.data64F || videoCoord.data64F.length < 2) {
      return null;
    }
    return transformCoord({
      videoPoint: videoCoord.data64F,
      originCoordsRightBottom: this.originCoordsRightBottom,
      originCoordsLeftTop: this.originCoordsLeftTop,
      videoHeight: this.videoHeight,
      videoWidth: this.videoWidth
    });
  }

  /**
   * @function VideoMap.prototype.getVideoBounds
   * @version 12.1.2
   * @description 获取当前视频画面反投影到地面的覆盖多边形。
   * 顶点顺序为左上 → 右上 → 右下 → 左下；坐标为 EPSG:4326，经纬度，环自动闭合。
   * @param {Object} [options] - 参数。
   * @param {number} [options.maxDistance] - 地面距离相机的最大长度，单位米（EPSG:3857）；用于截断过远的地平线交点。
   * @returns {Object|null} GeoJSON Polygon Feature，无法计算时返回 `null`。
   */
  getVideoBounds(options) {
    const ring = this._getVideoCornerLngLats(options);
    if (!ring) {
      return null;
    }
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [ring]
      }
    };
  }

  /**
   * @function VideoMap.prototype.removeLayer
   * @description  移除图层。
   * @param {string} id - 图层 id。
   */
  removeLayer(id) {
    if (!this._mapExisted()) {
      return;
    }
    if (this.layerCache[id]) {
      this.layerCache[id].remove();
      this.layerCache[id] = null;
      delete this.layerCache[id];
    }
  }

  /**
   * @function VideoMap.prototype.removeSource
   * @description  移除数据源。
   * @param {string} id - 数据源 id。
   */
  removeSource(id) {
    if (!this._mapExisted()) {
      return;
    }
    if (this.sourceCache[id]) {
      this.sourceCache[id].remove();
      this.sourceCache[id] = null;
      delete this.sourceCache[id];
    }
  }

  /**
   * @function VideoMap.prototype.play
   * @version 12.1.2
   * @description 播放视频。推荐使用 {@link VideoPlayControl} 提供圆形播放/暂停按钮。
   * @returns {Promise|undefined} 播放 Promise，自动播放被浏览器拦截时以 `NotAllowedError` 拒绝；
   * 视频图层尚未创建时返回 `undefined`。可据此做静音重试或「点击播放」引导。
   */
  play() {
    if (this._sei.managed) {
      return this._sei.play();
    }
    if (this.videoMapLayer) {
      return this.videoMapLayer.play();
    }
    return undefined;
  }

  /**
   * @function VideoMap.prototype.pause
   * @version 12.1.2
   * @description 暂停视频。
   */
  pause() {
    if (this.videoMapLayer) {
      this.videoMapLayer.pause();
    }
  }

  /**
   * @function VideoMap.prototype.paused
   * @version 12.1.2
   * @description 获取当前视频播放状态。返回 `true` 表示已暂停，返回 `false` 表示正在播放。
   * @returns {boolean} 视频是否暂停。
   */
  paused() {
    return this.videoMapLayer ? this.videoMapLayer.paused() : true;
  }

  /**
   * @function VideoMap.prototype.addControl
   * @version 12.1.2
   * @description 向视频地图添加 MapboxGL 控件。若控件实现了 `setTarget` 且尚无目标，或实现了 `setVideoMap`，会自动注入当前 VideoMap。
   * @param {Object} control - MapboxGL IControl 控件。
   * @param {string} [position] - MapboxGL 原生控件位置：`'top-left'` | `'top-right'` | `'bottom-left'` | `'bottom-right'`。
   * @returns {VideoMap} this。
   */
  addControl(control, position) {
    if (!this._mapExisted()) {
      this._pendingControls.push({ control, position });
      return this;
    }
    this._addControl(control, position);
    return this;
  }

  /**
   * @function VideoMap.prototype.removeControl
   * @version 12.1.2
   * @description 移除控件。
   * @param {Object} control - 已添加的控件。
   * @returns {VideoMap} this。
   */
  removeControl(control) {
    this._pendingControls = this._pendingControls.filter((item) => item.control !== control);
    if (!this.map || !control) {
      return this;
    }
    this.map.removeControl(control);
    return this;
  }

  /**
   * @function VideoMap.prototype.startDraw
   * @version 12.1.2
   * @description 开始点、线、面标绘。单击加点；线、面双击或调用 `finishDraw` 结束当前图形。坐标会转换为真实地理坐标，并随相机更新重投影。推荐使用 {@link VideoMapDrawControl} 提供工具条。
   * @param {string} type - 标绘类型，`'Point'` | `'LineString'` | `'Polygon'`。
   */
  startDraw(type) {
    this._getDraw().start(type);
  }

  /**
   * @event VideoMap#drawstart
   * @version 12.1.2
   * @description 开始标绘时触发。
   * @property {string} type - 标绘类型。
   */

  /**
   * @version 12.1.2
   * @event VideoMap#drawcreate
   * @description 完成一个标绘要素时触发。
   * @property {Object} feature - 新增的 GeoJSON Feature。
   * @property {Object} data - 当前全部标绘结果。
   */

  /**
   * @version 12.1.2
   * @event VideoMap#drawupdate
   * @description 标绘结果或绘制中的图形发生变化时触发，可用于同步到其它地图。
   * @property {Object} data - 已完成的 GeoJSON FeatureCollection。
   * @property {Object} live - 已完成图形加上当前草稿的 GeoJSON FeatureCollection。
   */

  /**
   * @version 12.1.2
   * @event VideoMap#drawcancel
   * @description 取消当前标绘时触发。
   */

  /**
   * @version 12.1.2
   * @event VideoMap#drawclear
   * @description 清空标绘结果时触发。
   */

  /**
   * @version 12.1.2
   * @event VideoMap#drawmodechange
   * @description 绘制模式变化时触发。
   * @property {string} mode - UI 模式，`'simple_select'` | `'draw_point'` | `'draw_line_string'` | `'draw_polygon'`。
   * @property {string|null} type - GeoJSON 类型，`'Point'` | `'LineString'` | `'Polygon'` | `null`。
   */

  /**
   * @version 12.1.2
   * @event VideoMap#drawselectionchange
   * @description 选中要素变化时触发，供后续要素编辑使用。
   * @property {Array} features - 当前选中的 GeoJSON Feature。
   */

  /**
   * @version 12.1.2
   * @event VideoMap#drawdelete
   * @description 删除选中要素时触发。
   * @property {Array} features - 被删除的 GeoJSON Feature。
   * @property {Object} data - 删除后的全部标绘结果。
   */

  /**
   * @version 12.1.2
   * @function VideoMap.prototype.finishDraw
   * @description 结束当前线或面标绘并保存图形。点标绘在单击时即完成，无需调用此方法。
   * @returns {Object|null} 完成的 GeoJSON Feature。
   */
  finishDraw() {
    return this._draw ? this._draw.finish() : null;
  }

  /**
   * @version 12.1.2
   * @function VideoMap.prototype.cancelDraw
   * @description 取消当前正在绘制的图形并退出标绘。
   */
  cancelDraw() {
    if (this._draw) {
      this._draw.cancel();
    }
  }

  /**
   * @version 12.1.2
   * @function VideoMap.prototype.clearDraw
   * @description 清空已标绘的点、线、面。
   */
  clearDraw() {
    if (this._draw) {
      this._draw.clear();
    }
  }

  /**
   * @version 12.1.2
   * @function VideoMap.prototype.getDrawData
   * @description 获取已标绘要素的 GeoJSON（经纬度，EPSG:4326）。
   * @returns {Object} GeoJSON FeatureCollection。
   */
  getDrawData() {
    return this._draw ? this._draw.getData() : { type: 'FeatureCollection', features: [] };
  }

  /**
   * @version 12.1.2
   * @function VideoMap.prototype.getDrawLiveData
   * @description 获取已完成标绘加上当前草稿的 GeoJSON（经纬度，EPSG:4326），可用于同步到真实地图。
   * @returns {Object} GeoJSON FeatureCollection。
   */
  getDrawLiveData() {
    return this._draw ? this._draw.getLiveData() : { type: 'FeatureCollection', features: [] };
  }

  /**
   * @version 12.1.2
   * @function VideoMap.prototype.getDrawMode
   * @description 获取当前标绘类型。未处于标绘状态时返回 `null`。
   * @returns {string|null} `'Point'` | `'LineString'` | `'Polygon'` | `null`。
   */
  getDrawMode() {
    return this._draw ? this._draw.getMode() : null;
  }

  /**
   * @version 12.1.2
   * @function VideoMap.prototype.getDrawUiMode
   * @description 获取当前绘制 UI 模式，对齐 mapbox-gl-draw。
   * @returns {string} `'simple_select'` | `'draw_point'` | `'draw_line_string'` | `'draw_polygon'`。
   */
  getDrawUiMode() {
    return this._draw ? this._draw.getUiMode() : 'simple_select';
  }

  /**
   * @version 12.1.2
   * @function VideoMap.prototype.changeDrawMode
   * @description 切换绘制模式。`direct_select` 预留给后续顶点编辑，当前按选中处理。
   * @param {string} mode - `'simple_select'` | `'draw_point'` | `'draw_line_string'` | `'draw_polygon'` | `'direct_select'`。
   * @param {Object} [options] - 模式参数，如 `{ featureId }`。
   */
  changeDrawMode(mode, options) {
    this._getDraw().changeMode(mode, options);
  }

  /**
   * @version 12.1.2
   * @function VideoMap.prototype.deleteDraw
   * @description 删除标绘要素。不传 ids 时删除当前选中要素。
   * @param {string|Array<string>} [ids] - 要素 id。
   * @returns {Object} 删除后的 GeoJSON FeatureCollection。
   */
  deleteDraw(ids) {
    return this._getDraw().delete(ids);
  }

  /**
   * @version 12.1.2
   * @function VideoMap.prototype.getDrawSelected
   * @description 获取当前选中的标绘要素。
   * @returns {Object} GeoJSON FeatureCollection。
   */
  getDrawSelected() {
    return this._draw
      ? this._draw.getSelected()
      : { type: 'FeatureCollection', features: [] };
  }

  /**
   * @function VideoMap.prototype.unbindHls
   * @version 12.2.0
   * @description 停止 SEI 直播拉流，销毁 iClient 内部创建的 hls.js 实例并取消自动播放监听。
   * @returns {VideoMap} this。
   */
  unbindHls() {
    this._sei.unbindHls();
    return this;
  }

  /**
   * @function VideoMap.prototype.getHls
   * @version 12.2.0
   * @description 获取当前 SEI 拉流使用的 hls.js 实例。内部接管的场景可直接用于修改配置或读取播放状态。
   * @returns {Object|null} hls.js 实例，不存在时返回 `null`。
   */
  getHls() {
    return this._sei.getHls();
  }

  /**
   * @function VideoMap.prototype.restartHls
   * @version 12.2.0
   * @description 重建 SEI 直播会话：销毁当前 hls.js 实例并重新拉流，同时清空 SEI 姿态时间轴并把 `isParametersReady()` 重置为 `false`。
   * `hlsAutoRecover` 为 `false` 时，收到 `seistreamerror` 后可调用本方法自行恢复。
   * 仅在 iClient 内部接管拉流（`parametersSource` 为 `'SEI'` 且地址为 m3u8）且会话存在时生效，其余情况不做处理。
   * @returns {VideoMap} this。
   */
  restartHls() {
    this._sei.restart();
    return this;
  }

  /**
   * @function VideoMap.prototype.getSeiLiveSyncPosition
   * @version 12.2.0
   * @description 获取直播推荐同步播放位置（秒），仅内部接管的 hls.js 直播流可用。
   * @returns {number|null} 推荐位置，不可用时返回 `null`。
   */
  getSeiLiveSyncPosition() {
    return this._sei.getLiveSyncPosition();
  }

  /**
   * @function VideoMap.prototype.getSeiLatency
   * @version 12.2.0
   * @description 获取当前直播延迟（秒），仅内部接管的 hls.js 直播流可用。
   * @returns {number|null} 延迟秒数，不可用时返回 `null`。
   */
  getSeiLatency() {
    return this._sei.getLatency();
  }

  /**
   * @function VideoMap.prototype.pushSeiParameters
   * @version 12.1.2
   * @description 手动写入相机参数，用于不走 hls.js 的场景（如 WebSocket 推送 SEI、服务端解析等）。
   * 输入相机坐标与 extent 按构造参数 `seiProjection` 指定的源投影解析；内部相机坐标为 EPSG:3857、extent 为 EPSG:4326。
   * @param {Array<Object>|Object} items - 相机参数，每项需带 `time`（与视频播放时间一致，单位秒）。
   * @returns {Array<Object>} 本次新增的姿态。
   */
  pushSeiParameters(items) {
    return this._sei.push(items);
  }

  /**
   * @function VideoMap.prototype.getSeiTimeline
   * @version 12.1.2
   * @description 获取当前实例持有的 SEI 相机姿态时间轴。
   * @returns {Object|null} 时间轴实例，非 SEI 参数源时返回 null。
   */
  getSeiTimeline() {
    return this.seiTimeline;
  }

  /**
   * @function VideoMap.prototype.getVideoElement
   * @version 12.1.2
   * @description 获取当前用于播放的 `<video>` DOM 元素，供 `hls.attachMedia` 使用。
   * @returns {HTMLVideoElement|null} video 元素。
   */
  getVideoElement() {
    return getVideoElement(this.videoMapLayer && this.videoMapLayer.video);
  }

  /**
   * @function VideoMap.prototype.isParametersReady
   * @version 12.1.2
   * @description 配准参数是否就绪。SEI 参数源下表示已收到首个有效 SEI 并完成投影矩阵初始化。
   * @returns {boolean}
   */
  isParametersReady() {
    return !!this.parametersReady;
  }

  /**
   * @function VideoMap.prototype.setSeiOffset
   * @version 12.1.2
   * @description 运行时调整 SEI 姿态与播放头的同步偏移，用于直播链路的端到端时延微调。
   * @param {number} offset - 偏移量，单位秒，`0` 表示不做修正。
   * @returns {VideoMap} this。
   */
  setSeiOffset(offset) {
    const value = Number(offset);
    this.seiOffset = Number.isFinite(value) ? value : 0;
    return this;
  }

  /**
   * @function VideoMap.prototype.destroy
   * @description  销毁视频地图。
   */
  destroy() {
    if (this._destroyed) {
      return;
    }
    this._destroyed = true;
    this._cameraSession = null;
    this.parametersReady = false;
    if (this._draw) {
      this._draw.destroy();
      this._draw = null;
    }
    this._sei.stop();
    this.seiTimeline = null;
    this.layerCache = {};
    this.sourceCache = {};
    if (this.videoMapLayer) {
      this.videoMapLayer.remove();
      this.videoMapLayer = null;
    }
    if (this.coordTransfer) {
      this.coordTransfer.dispose();
      this.coordTransfer = null;
    }
    if (this.map) {
      this.map.remove();
    }
    this.map = null;
  }

  _getDraw(options) {
    if (!this._draw) {
      this._draw = new VideoMapDraw(this, options);
    }
    return this._draw;
  }

  _getVideoCornerLngLats(options) {
    const spatials = this._getVideoCornerSpatials(options);
    if (!spatials) {
      return null;
    }
    const ring = spatials.map((spatial) => {
      const lngLat = proj4('EPSG:3857', 'EPSG:4326', [spatial[0], spatial[1]]);
      return [lngLat[0], lngLat[1]];
    });
    ring.push(ring[0].slice());
    return ring;
  }

  _getVideoCornerPixels() {
    const width = this.videoWidth;
    const height = this.videoHeight;
    // Mapbox video coordinates: top-left, top-right, bottom-right, bottom-left
    return [
      [0, 0],
      [width, 0],
      [width, height],
      [0, height]
    ];
  }

  _getVideoCornerSpatials(options) {
    if (!this.coordTransfer || !this.videoWidth || !this.videoHeight) {
      return null;
    }
    const maxDistance = this._resolveFootprintMaxDistance(options);
    const pixels = this._getVideoCornerPixels();
    const spatials = [];
    for (let i = 0; i < pixels.length; i++) {
      let spatial = this._pixelToGroundSpatial(pixels[i], maxDistance);
      if (!spatial) {
        spatial = this._searchGroundOnVerticalEdge(pixels[i][0], pixels[i][1], maxDistance);
      }
      if (!spatial) {
        return null;
      }
      spatials.push(spatial);
    }
    return spatials;
  }

  _resolveFootprintMaxDistance(options) {
    if (options && options.maxDistance > 0) {
      return options.maxDistance;
    }
    const cameraZ = this.coordTransfer && this.coordTransfer._z;
    if (cameraZ > 0) {
      return Math.max(cameraZ * 12, 300);
    }
    return 0;
  }

  _searchGroundOnVerticalEdge(u, vStart, maxDistance) {
    const height = this.videoHeight;
    const towardBottom = vStart <= height / 2;
    const vEnd = towardBottom ? height : 0;
    const steps = 24;
    for (let i = 1; i <= steps; i++) {
      const v = vStart + (vEnd - vStart) * (i / steps);
      const spatial = this._pixelToGroundSpatial([u, v], maxDistance);
      if (spatial) {
        return spatial;
      }
    }
    return null;
  }

  _pixelToGroundSpatial(pixel, maxDistance) {
    const spatial = this.coordTransfer.toSpatialCoordinate(pixel);
    if (!spatial || spatial.length < 2 || !isFinite(spatial[0]) || !isFinite(spatial[1])) {
      return null;
    }
    const camera = this.coordTransfer.toCameraCoordinate(spatial);
    if (camera && !(camera[2] > 0.01)) {
      return null;
    }
    const cameraX = this.coordTransfer._x;
    const cameraY = this.coordTransfer._y;
    if (maxDistance > 0 && isFinite(cameraX) && isFinite(cameraY)) {
      const dx = spatial[0] - cameraX;
      const dy = spatial[1] - cameraY;
      const dist = Math.hypot(dx, dy);
      if (dist > maxDistance) {
        const scale = maxDistance / dist;
        return [cameraX + dx * scale, cameraY + dy * scale, 0];
      }
    }
    return spatial;
  }

  _addControl(control, position) {
    if (control && typeof control.setTarget === 'function' && control.target == null) {
      control.setTarget(this);
    } else if (control && typeof control.setVideoMap === 'function') {
      control.setVideoMap(this);
    }
    const resolvedPosition = position || (control && typeof control.getDefaultPosition === 'function' && control.getDefaultPosition());
    this.map.addControl(control, resolvedPosition || undefined);
  }

  _flushPendingControls() {
    const pending = this._pendingControls || [];
    this._pendingControls = [];
    pending.forEach((item) => {
      this._addControl(item.control, item.position);
    });
  }

  _addVideoLayer(src) {
    const managed = this._sei.managed;
    // SEI + m3u8：MediaSource 由 hls.js 接管，不能把 m3u8 交给 video.js，否则 VHS 会抢占 MediaSource
    this.videoMapLayer = new VideoMapLayer(this);
    /**
     * @event VideoMap#play
     * @description 视频开始播放时触发。
     */
    this.videoMapLayer.on('play', () => {
      this.fire('play');
    });
    /**
     * @event VideoMap#pause
     * @description 视频暂停时触发。
     */
    this.videoMapLayer.on('pause', () => {
      this.fire('pause');
    });
    this._bindEvents();
    this.videoMapLayer.add(managed ? undefined : src);
    this._sei.start();
  }

  _initParameters(parameters) {
    if (parameters && !Object.keys(parameters).length) {
      return;
    }
    return CoordTransfer.fromVideoParameters(this.cv, parameters, this.videoWidth, this.videoHeight).init();
  }

  _createMap() {
    return new Promise((resolve) => {
      const container =
        typeof this.container === 'string' ? window.document.getElementById(this.container) : this.container;
      if (!container) {
        throw new Error(`Container '${container}' not found.`);
      }
      this.width = container.clientWidth || 400;
      this.height = container.clientHeight || 300;
      let map = new mapboxgl.Map({
        container: this.container,
        style: {
          ...this.styleOptions,
          version: 8,
          sources: {},
          layers: []
        },
        renderWorldCopies: false,
        center: [0, 0],
        zoom: 8
      });
      map.on('load', () => {
        resolve(map);
      });
    });
  }

  _mapExisted() {
    return !!this.map;
  }

  _bindEvents() {
    this.videoMapLayer.on('loaded', async ({ originCoordsLeftTop, originCoordsRightBottom, originCoordinates, videoWidth, videoHeight }) => {
      this.originCoordsLeftTop = originCoordsLeftTop;
      this.originCoordsRightBottom = originCoordsRightBottom;
      this.originCoordinates = originCoordinates;
      if (this.videoWidth === undefined) {
        this.videoWidth = videoWidth;
      }
      if (this.videoHeight === undefined) {
        this.videoHeight = videoHeight;
      }
      if (this.isSeiSource) {
        // SEI 参数源：播放头驱动重投影，首帧相机参数由 SEI 提供，不能用 videoParameters[0] 占位
        this.videoMapLayer.on('timeupdate', ({ time }) => {
          this.updateAtTime(time);
        });
        this._ensureSeiCoordTransfer();
      } else {
        const initialParameters = this.isTimeVarying ? this.videoParameters[0] : this.videoParameters;
        const coordTransfer = await this._initParameters(initialParameters);
        // 初始化可能晚于销毁完成，不能再恢复监听或持有 OpenCV 矩阵。
        if (this._destroyed) {
          if (coordTransfer) {
            coordTransfer.dispose();
          }
          return;
        }
        this.coordTransfer = coordTransfer;
        if (this.isTimeVarying) {
          this.currentTime = initialParameters.time;
          this.videoMapLayer.on('timeupdate', ({ time }) => {
            this.updateAtTime(time);
          });
        }
      }
      Object.keys(this._mapEventListeners).forEach((eventName) => {
        this._mapEventListeners[eventName].forEach((eventListener) => {
          this._addMapEventListener(eventListener, false);
        });
      });
      /**
       * @event VideoMap#load
       * @description 视频地图加载完成时触发。此时可调用 addSource/addLayer 叠加矢量数据。
       * @property {mapboxgl.Map} map - 底层 mapbox-gl 地图实例。
       * @property {boolean} parametersReady - 配准参数是否已就绪。SEI 参数源下首个 SEI 到达前为 false。
       */
      this.fire('load', { map: this.map, parametersReady: this.parametersReady });
    });
  }

  /**
   * @private
   * @function VideoMap.prototype._onSeiTimelineAdd
   * @description 时间轴新增姿态时触发，用于在首个有效 SEI 到达后初始化 coordTransfer。
   */
  _onSeiTimelineAdd() {
    if (this.parametersReady) {
      return;
    }
    if (this.map && this.videoWidth && this.videoHeight) {
      this._ensureSeiCoordTransfer();
    }
  }

  /**
   * @private
   * @function VideoMap.prototype._ensureSeiCoordTransfer
   * @description 用时间轴中的首个有效姿态初始化 coordTransfer，成功时触发 videoparameterready。
   * @returns {Promise<boolean>} 是否就绪。
   */
  _ensureSeiCoordTransfer() {
    if (this.parametersReady) {
      return Promise.resolve(true);
    }
    if (this._seiInitializing) {
      return Promise.resolve(false);
    }
    if (!this.seiTimeline || !this.seiTimeline.size) {
      return Promise.resolve(false);
    }
    const head = this.seiTimeline.firstPoses(3);
    const pose = resolveCameraPose(head, head[0].time);
    if (!pose) {
      return Promise.resolve(false);
    }
    this._seiInitializing = true;
    const session = this._cameraSession;
    return this._initParameters(pose).then((coordTransfer) => {
      // 重连或销毁会使旧相机初始化失效，旧结果不能覆盖当前会话，也必须释放矩阵。
      if (this._cameraSession !== session || this._destroyed) {
        if (coordTransfer) {
          coordTransfer.dispose();
        }
        return false;
      }
      this._seiInitializing = false;
      if (!coordTransfer) {
        return false;
      }
      if (this.coordTransfer && this.coordTransfer !== coordTransfer) {
        this.coordTransfer.dispose();
      }
      this.coordTransfer = coordTransfer;
      this.parametersReady = true;
      /**
       * @version 12.1.2
       * @event VideoMap#videoparameterready
       * @description 首个有效配准参数就绪时触发。SEI 参数源下表示已用首个 SEI 完成投影矩阵初始化，此后矢量叠加位置开始实时校正。
       * @property {Object} pose - 首个有效相机参数。
       * @property {number} videoWidth - 视频宽度。
       * @property {number} videoHeight - 视频高度。
       * @property {number} time - 该参数对应的视频时间。
       */
      this.fire('videoparameterready', {
        pose,
        videoWidth: this.videoWidth,
        videoHeight: this.videoHeight,
        time: head[0].time
      });
      return true;
    });
  }

  /**
   * @private
   * @function VideoMap.prototype._handleSeiPayload
   * @description 处理 hls.js `FRAG_PARSING_USERDATA` 回调。
   * @param {Object} data - 回调数据 `{frag, samples}`。
   */
  _handleSeiPayload(data) {
    /**
     * @version 12.1.2
     * @event VideoMap#videoparametersei
     * @description 收到并解析完一个分片的 SEI 数据时触发。
     * @property {Object} frag - 分片信息。
     * @property {Array<Object>} samples - 原始 SEI 样本。
     * @property {Array<Object>} poses - 本次新增的姿态，带媒体时间 time。
     */
    return this._sei.handlePayload(data);
  }

  _clearEvents() {
    Object.keys(this._mapEventListeners).forEach((eventName) => {
      this._mapEventListeners[eventName].forEach((eventListener) => {
        this._removeMapEventListener(eventListener);
      });
    });
  }

  _bindMapEvent(e) {
    if (e.lngLat) {
      if (this.originCoordsRightBottom && this.originCoordsLeftTop && this.videoWidth && this.videoHeight) {
        let coord = [e.lngLat.lng, e.lngLat.lat];
        if (this.coordTransfer) {
          const mapEvent = e;
          let spatialPoint = this.coordTransfer.toSpatialCoordinate(
            transformCoordReverse({
              coord,
              originCoordsRightBottom: this.originCoordsRightBottom,
              originCoordsLeftTop: this.originCoordsLeftTop,
              videoHeight: this.videoHeight,
              videoWidth: this.videoWidth
            })
          );
          const spatialPoint2d = [spatialPoint[0], spatialPoint[1]];
          const lngLat = proj4('EPSG:3857', 'EPSG:4326', spatialPoint2d);
          const point = this.project(lngLat);
          return {
            ...e,
            point,
            lngLat: new mapboxgl.LngLat(lngLat[0], lngLat[1]),
            spatialPoint: spatialPoint2d,
            mapEvent
          };
        }
      }
    }
    return { ...e, mapEvent: e };
  }
}
