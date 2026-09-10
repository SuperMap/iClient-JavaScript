import mapboxgl from 'mapbox-gl';
import CoordTransfer from './CoordTransfer';
import VideoMapLayer from './layers/VideoMapLayer';
import GeojsonLayer from './layers/GeojsonLayer';
import {
  transformCoord,
  transformCoordReverse,
  fovXToFx,
  fovYToFy,
  smartTimeProcessor,
  FastRangeSearcher
} from './utils/VideoMapUtil';
import GeojsonSource from './GeojsonSource';

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
 * @param {number} [options.vectorUpdateInterval] - 矢量要素重投影的节流间隔，单位秒。默认等于 interval。仅当 videoParameters 为数组时生效：值越大矢量刷新越省性能但与视频背景错位越明显；设为小于 interval 无意义。
 * @fires VideoMap#load
 * @fires VideoMap#vectorupdate
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
      interval,
      vectorUpdateInterval
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
    this.vectorUpdateInterval = vectorUpdateInterval || this.interval;
    this.isTimeVarying = Array.isArray(videoParameters);
    this.videoParameters = this.isTimeVarying
      ? smartTimeProcessor(this.interval, videoParameters, ['yaw', 'pitch', 'roll', 'x', 'y', 'z'])
      : videoParameters;
    if (this.isTimeVarying) {
      this.timeSearcher = new FastRangeSearcher(this.videoParameters.map((item) => item.time));
    }
    this._createMap().then((map) => {
      this.map = map;
      this._addVideoLayer(url);
    });
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
      console.warn('[VideoMap] findRange 返回 null，time=', time, 'timeSearcher.data=', this.timeSearcher && this.timeSearcher.data);
      return;
    }
    const { index, ratio } = range;
    const prev = this.videoParameters[index];
    const next = this.videoParameters[index + 1] || prev;
    const lerp = (a, b) => a + (b - a) * ratio;
    this.coordTransfer.setCameraLocation({
      pitch: lerp(prev.pitch, next.pitch),
      roll: lerp(prev.roll, next.roll),
      yaw: lerp(prev.yaw, next.yaw),
      x: lerp(prev.x, next.x),
      y: lerp(prev.y, next.y),
      z: lerp(prev.z, next.z),
      fx: fovXToFx(lerp(prev.fovX, next.fovX), this.videoWidth),
      fy: fovYToFy(lerp(prev.fovY, next.fovY), this.videoHeight),
      centerX: lerp(prev.centerX, next.centerX),
      centerY: lerp(prev.centerY, next.centerY)
    });
    this.pendingVectorUpdate = true;
    const update = () => {
      this.pendingVectorUpdate = false;
      this.lastVectorUpdateTime = this.currentTime;
      Object.keys(this.sourceCache).forEach((id) => {
        this.sourceCache[id].update();
      });
      /**
       * @event VideoMap#vectorupdate
       * @description 矢量要素重投影完成时触发。已打开的弹窗可监听此事件跟随要素位置更新。
       */
      this.fire('vectorupdate', { time: this.currentTime });
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
   * @function VideoMap.prototype.destroy
   * @description  销毁视频地图。
   */
  destroy() {
    this.layerCache = {};
    this.sourceCache = {};
    if (this.videoMapLayer) {
      this.videoMapLayer.remove();
      this.videoMapLayer = null;
    }
    this.map.remove();
    this.map = null;
  }

  _addVideoLayer(src) {
    this.videoMapLayer = new VideoMapLayer(this);
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
    this.videoMapLayer.on('loaded', async ({ originCoordsLeftTop, originCoordsRightBottom, videoWidth, videoHeight }) => {
      this.originCoordsLeftTop = originCoordsLeftTop;
      this.originCoordsRightBottom = originCoordsRightBottom;
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
      this._bindMapEventFn = this._bindMapEvent.bind(this);
      MAP_EVENTS.forEach((eventName) => {
        this.map.on(eventName, this._bindMapEventFn);
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
    MAP_EVENTS.forEach((eventName) => {
      this.map.off(eventName, this._bindMapEventFn);
    });
  }

  _bindMapEvent(e) {
    if (e.lngLat) {
      if (this.originCoordsRightBottom && this.originCoordsLeftTop && this.videoWidth && this.videoHeight) {
        let coord = [e.lngLat.lng, e.lngLat.lat];
        if (this.coordTransfer) {
          let spatialPoint = this.coordTransfer.toSpatialCoordinate(
            transformCoordReverse({
              coord,
              originCoordsRightBottom: this.originCoordsRightBottom,
              originCoordsLeftTop: this.originCoordsLeftTop,
              videoHeight: this.videoHeight,
              videoWidth: this.videoWidth
            })
          );
          e.spatialPoint = [spatialPoint[0], spatialPoint[1]];
        }
      }
    }
    this.fire(e.type, { mapEvent: e });
  }
}