import mapboxgl from 'mapbox-gl';
import CoordTransfer from './CoordTransfer';
import VideoMapLayer from './layers/VideoMapLayer';
import GeojsonLayer from './layers/GeojsonLayer';
import { transformCoordReverse, fovXToFx, fovYToFy } from './utils/VideoMapUtil';
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
 * @class VideoMap
 * @classdesc 视频地图
 * @category VideoMap
 * @version 11.2.0
 * @modulecategory Mapping
 * @param {Object} options - 参数
 * @param {string} options.url - 视频 或 流链接。支持 flv, m3u8, map4 格式。
 * @param {string} options.videoParameters - 视频地图配准参数
 * @param {number} options.videoParameters.pitch - 俯仰角。
 * @param {number} options.videoParameters.roll - 侧偏角。
 * @param {number} options.videoParameters.yaw - 偏航角。
 * @param {number} options.videoParameters.x - 视频 x 坐标。
 * @param {number} options.videoParameters.y - 视频 y 坐标。
 * @param {number} options.videoParameters.z - 视频 z 坐标。
 * @param {number} options.videoParameters.fovX - 水平方向上以像素为单位的焦距。
 * @param {number} options.videoParameters.fovY - 垂直方向上以像素为单位的焦距。
 * @param {number} options.videoParameters.centerX - 相机中心的水平坐标。
 * @param {number} options.videoParameters.centerY - 相机中心的垂直坐标。
 * @param {string} [options.container='map'] - 地图容器id
 * @param {string} [options.opencv] - opencv 实例
 * @param {function} [options.videoWidth] - 视频地图宽度，没设置时默认获取视频宽度
 * @param {function} [options.videoHeight] - 视频地图高度，没设置时默认获取视频高度
 * @param {Object} [options.styleOptions] - 视频地图风格配置
 * @param {string} [options.autoplay=true] - 视频是否自动播放
 * @param {string} [options.loop=true] - 视频是否循环播放
 * @extends {mapboxgl.Evented}
 */

export class VideoMap extends mapboxgl.Evented {
  constructor(options) {
    super();
    const { container, url, videoParameters, autoplay, loop, videoWidth, videoHeight, opencv, styleOptions } = options;
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
    this.videoParameters = videoParameters;
    this._createMap().then((map) => {
      this.map = map;
      this._addVideoLayer(url);
    });
  }

  /**
   * @function VideoMap.prototype.addLayer
   * @description  添加图层。
   * @param {Object} layer - 图层配置。
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
   * @param {string} id - source id。
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
      this.coordTransfer = await this._initParameters(this.videoParameters);
      this._bindMapEventFn = this._bindMapEvent.bind(this);
      MAP_EVENTS.forEach((eventName) => {
        this.map.on(eventName, this._bindMapEventFn);
      });
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