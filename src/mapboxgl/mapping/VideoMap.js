import mapboxgl from 'mapbox-gl';
import proj4 from 'proj4';
import CoordTransfer from './CoordTransfer';
import VideoMapLayer from './layers/VideoMapLayer';
import GeojsonLayer from './layers/GeojsonLayer';
import {
  transformCoord,
  transformCoordReverse,
  fovXToFx,
  fovYToFy,
  smartTimeProcessor,
  FastRangeSearcher,
  resolveCameraPose
} from './utils/VideoMapUtil';
import GeojsonSource from './GeojsonSource';
import VideoMapDraw from './VideoMapDraw';
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
 * @class VideoMap
 * @classdesc 视频地图
 * @category Visualization Video
 * @version 11.2.0
 * @modulecategory Mapping
 * @param {Object} options - 参数
 * @param {string} options.url - 视频 或 流链接。支持 flv, m3u8, mp4 格式。
 * @param {VideoMap.VideoParameters|Array<VideoMap.VideoTimeParameters>} options.videoParameters - 视频地图配准参数。传入对象时为静态配准（相机位置固定）；传入数组时为动态配准，按视频时间动态更新相机参数。
 * @param {string|HTMLElement} [options.container='map'] - 地图容器 id 或 DOM 元素。
 * @param {Object} [options.opencv] - opencv.js 实例。未传入时取 window.cv；若均不存在将抛出异常。
 * @param {number} [options.videoWidth] - 视频宽度，单位像素。未设置时默认读取视频实际宽度。
 * @param {number} [options.videoHeight] - 视频高度，单位像素。未设置时默认读取视频实际高度。
 * @param {Object} [options.styleOptions] - 视频地图风格配置，对应 mapbox-gl 的 style 对象（sprite、glyphs 等）。
 * @param {boolean} [options.autoplay=true] - 视频是否自动播放。
 * @param {boolean} [options.loop=true] - 视频是否循环播放。
 * @param {number} [options.interval=0.1] - 动态配准参数的时间重采样间隔，单位秒。仅当 videoParameters 为数组时生效：对原始相机参数序列按该间隔做插值或抽稀，决定相机位置随时间变化的精度。
 * @fires VideoMap#load
 * @fires VideoMap#videoparameterupdate
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
      videoParameters,
      autoplay,
      loop,
      videoWidth,
      videoHeight,
      opencv,
      styleOptions,
      interval
    } = options;
    this.container = container || 'map';
    this.layerCache = {};
    this.sourceCache = {};
    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;
    this.autoplay = autoplay !== undefined ? autoplay : true;
    this.loop = loop !== undefined ? loop : true;
    this.styleOptions = styleOptions || {};
    this.cv = opencv || window.cv;
    if (!this.cv) {
      throw new Error('opencv.js instance is not existed!');
    }
    if (!videoParameters) {
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
   * @function VideoMap.prototype.updateAtTime
   * @description 使用视频时间更新相机参数并重新投影已添加的 GeoJSON 数据源。
   * @param {number} time - 视频时间，单位秒。
   */
  updateAtTime(time) {
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
      console.warn(Lang.i18n('msg_videoMapTimeRangeMissing'), time, 'timeSearcher.data=', this.timeSearcher && this.timeSearcher.data);
      return;
    }
    const pose = resolveCameraPose(this.rawVideoParameters, time);
    this.coordTransfer.setCameraLocation({
      pitch: pose.pitch,
      roll: pose.roll,
      yaw: pose.yaw,
      x: pose.x,
      y: pose.y,
      z: pose.z,
      fx: fovXToFx(pose.fovX, this.videoWidth),
      fy: fovYToFy(pose.fovY, this.videoHeight),
      centerX: pose.centerX,
      centerY: pose.centerY
    });
    this.pendingVectorUpdate = true;
    const update = () => {
      this.pendingVectorUpdate = false;
      this.lastVectorUpdateTime = this.currentTime;
      Object.keys(this.sourceCache).forEach((id) => {
        this.sourceCache[id].update();
      });
      if (this.map) {
        this.map.fire('move');
      }
      /**
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
  * @description 播放视频。推荐使用 {@link VideoPlayControl} 提供圆形播放/暂停按钮。
   */
  play() {
    if (this.videoMapLayer) {
      this.videoMapLayer.play();
    }
  }

  /**
   * @function VideoMap.prototype.pause
   * @description 暂停视频。
   */
  pause() {
    if (this.videoMapLayer) {
      this.videoMapLayer.pause();
    }
  }

  /**
   * @function VideoMap.prototype.paused
   * @description 获取当前视频播放状态。返回 `true` 表示已暂停，返回 `false` 表示正在播放。
   * @returns {boolean} 视频是否暂停。
   */
  paused() {
    return this.videoMapLayer ? this.videoMapLayer.paused() : true;
  }

  /**
   * @function VideoMap.prototype.addControl
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
   * @description 开始点、线、面标绘。单击加点；线、面双击或调用 `finishDraw` 结束当前图形。坐标会转换为真实地理坐标，并随相机更新重投影。推荐使用 {@link VideoMapDrawControl} 提供工具条。
   * @param {string} type - 标绘类型，`'Point'` | `'LineString'` | `'Polygon'`。
   */
  startDraw(type) {
    this._getDraw().start(type);
  }

  /**
   * @event VideoMap#drawstart
   * @description 开始标绘时触发。
   * @property {string} type - 标绘类型。
   */

  /**
   * @event VideoMap#drawcreate
   * @description 完成一个标绘要素时触发。
   * @property {Object} feature - 新增的 GeoJSON Feature。
   * @property {Object} data - 当前全部标绘结果。
   */

  /**
   * @event VideoMap#drawupdate
   * @description 标绘结果或绘制中的图形发生变化时触发，可用于同步到其它地图。
   * @property {Object} data - 已完成的 GeoJSON FeatureCollection。
   * @property {Object} live - 已完成图形加上当前草稿的 GeoJSON FeatureCollection。
   */

  /**
   * @event VideoMap#drawcancel
   * @description 取消当前标绘时触发。
   */

  /**
   * @event VideoMap#drawclear
   * @description 清空标绘结果时触发。
   */

  /**
   * @event VideoMap#drawmodechange
   * @description 绘制模式变化时触发。
   * @property {string} mode - UI 模式，`'simple_select'` | `'draw_point'` | `'draw_line_string'` | `'draw_polygon'`。
   * @property {string|null} type - GeoJSON 类型，`'Point'` | `'LineString'` | `'Polygon'` | `null`。
   */

  /**
   * @event VideoMap#drawselectionchange
   * @description 选中要素变化时触发，供后续要素编辑使用。
   * @property {Array} features - 当前选中的 GeoJSON Feature。
   */

  /**
   * @event VideoMap#drawdelete
   * @description 删除选中要素时触发。
   * @property {Array} features - 被删除的 GeoJSON Feature。
   * @property {Object} data - 删除后的全部标绘结果。
   */

  /**
   * @function VideoMap.prototype.finishDraw
   * @description 结束当前线或面标绘并保存图形。点标绘在单击时即完成，无需调用此方法。
   * @returns {Object|null} 完成的 GeoJSON Feature。
   */
  finishDraw() {
    return this._draw ? this._draw.finish() : null;
  }

  /**
   * @function VideoMap.prototype.cancelDraw
   * @description 取消当前正在绘制的图形并退出标绘。
   */
  cancelDraw() {
    if (this._draw) {
      this._draw.cancel();
    }
  }

  /**
   * @function VideoMap.prototype.clearDraw
   * @description 清空已标绘的点、线、面。
   */
  clearDraw() {
    if (this._draw) {
      this._draw.clear();
    }
  }

  /**
   * @function VideoMap.prototype.getDrawData
   * @description 获取已标绘要素的 GeoJSON（经纬度，EPSG:4326）。
   * @returns {Object} GeoJSON FeatureCollection。
   */
  getDrawData() {
    return this._draw ? this._draw.getData() : { type: 'FeatureCollection', features: [] };
  }

  /**
   * @function VideoMap.prototype.getDrawLiveData
   * @description 获取已完成标绘加上当前草稿的 GeoJSON（经纬度，EPSG:4326），可用于同步到真实地图。
   * @returns {Object} GeoJSON FeatureCollection。
   */
  getDrawLiveData() {
    return this._draw ? this._draw.getLiveData() : { type: 'FeatureCollection', features: [] };
  }

  /**
   * @function VideoMap.prototype.getDrawMode
   * @description 获取当前标绘类型。未处于标绘状态时返回 `null`。
   * @returns {string|null} `'Point'` | `'LineString'` | `'Polygon'` | `null`。
   */
  getDrawMode() {
    return this._draw ? this._draw.getMode() : null;
  }

  /**
   * @function VideoMap.prototype.getDrawUiMode
   * @description 获取当前绘制 UI 模式，对齐 mapbox-gl-draw。
   * @returns {string} `'simple_select'` | `'draw_point'` | `'draw_line_string'` | `'draw_polygon'`。
   */
  getDrawUiMode() {
    return this._draw ? this._draw.getUiMode() : 'simple_select';
  }

  /**
   * @function VideoMap.prototype.changeDrawMode
   * @description 切换绘制模式。`direct_select` 预留给后续顶点编辑，当前按选中处理。
   * @param {string} mode - `'simple_select'` | `'draw_point'` | `'draw_line_string'` | `'draw_polygon'` | `'direct_select'`。
   * @param {Object} [options] - 模式参数，如 `{ featureId }`。
   */
  changeDrawMode(mode, options) {
    this._getDraw().changeMode(mode, options);
  }

  /**
   * @function VideoMap.prototype.deleteDraw
   * @description 删除标绘要素。不传 ids 时删除当前选中要素。
   * @param {string|Array<string>} [ids] - 要素 id。
   * @returns {Object} 删除后的 GeoJSON FeatureCollection。
   */
  deleteDraw(ids) {
    return this._getDraw().delete(ids);
  }

  /**
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
   * @function VideoMap.prototype.destroy
   * @description  销毁视频地图。
   */
  destroy() {
    if (this._draw) {
      this._draw.destroy();
      this._draw = null;
    }
    this.layerCache = {};
    this.sourceCache = {};
    if (this.videoMapLayer) {
      this.videoMapLayer.remove();
      this.videoMapLayer = null;
    }
    this.map.remove();
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
    this.videoMapLayer.add(src);
    this._bindEvents();
  }

  _initParameters(parameters) {
    if (parameters && !Object.keys(parameters).length) {
      return;
    }
    parameters.fx = fovXToFx(parameters.fovX, this.videoWidth);
    parameters.fy = fovYToFy(parameters.fovY, this.videoHeight);
    return new CoordTransfer(this.cv, parameters).init();
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
      const initialParameters = this.isTimeVarying ? this.videoParameters[0] : this.videoParameters;
      this.coordTransfer = await this._initParameters(initialParameters);
      if (this.isTimeVarying) {
        this.currentTime = initialParameters.time;
        this.videoMapLayer.on('timeupdate', ({ time }) => {
          this.updateAtTime(time);
        });
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
       */
      this.fire('load', { map: this.map });
    });
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