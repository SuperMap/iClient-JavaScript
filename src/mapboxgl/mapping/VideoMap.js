import mapboxgl from 'mapbox-gl';
import '../core/Base';
import Coordtransfer from './coordTransfer';
import GeojsonLayer from './layers/GeojsonLayer';
import VideoMarker from './VideoMarker';
import GeojsonSource from './GeojsonSource';
import VideoMapPopup from './VideoMapPopup';
import VideoLayer from './layers/VideoLayer';
import { coordEach } from '@turf/meta';
import { transformCoordReverse } from './util';
import { SuperMap } from '@supermap/iclient-common';

const LAYER_MAP = {
  geojson: GeojsonLayer,
  vidoe: VideoLayer
};

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

const MAP_DRAW_EVENTS = [
  'draw.create',
  'draw.delete',
  'draw.combine',
  'draw.uncombine',
  'draw.update',
  'draw.selectionchange',
  'draw.modechange',
  'draw.actionable'
];

/**
 * @class SuperMap.VideoMap
 * @classdesc 视频地图
 * @param {Object} options - 参数
 * @param {string} [options.container='map'] - 地图容器id
 * @param {string} [options.src] - 视频地址
 * @param {string} [options.videoParameters] - 视频配准参数
 * @param {function} [options.videoWidth] - 视频宽度
 * @param {function} [options.videoHeight] - 视频高度
 * @param {string} [options.autoplay] - 视频是否自动播放
 * @param {string} [options.loop] - 视频是否循环播放
 * @extends {mapboxgl.Evented}
 */

export class VideoMap extends mapboxgl.Evented {
  constructor(options) {
    super();
    const { container, src, videoParameters, autoplay, loop, videoWidth, videoHeight } = options;
    this.container = container || 'map';
    this.cacheVideoParameters = {};
    this.layerCache = {};
    this.sourceCache = {};
    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;
    this.autoplay = autoplay;
    this.loop = loop;
    let promiseList = [];
    promiseList.push(this._createMap());
    if (videoParameters) {
      promiseList.push(this._initVideoParameters(videoParameters));
    }

    Promise.all(promiseList).then((res) => {
      if (res.length === 2) {
        this.coordTransfer = res[1];
      }
      this.map = res[0];
      if (src) {
        this.addVideoLayer(src);
      }
      this._bindMapEventFn = this._bindMapEvent.bind(this);
      MAP_EVENTS.forEach((eventName) => {
        this.map.on(eventName, this._bindMapEventFn);
      });
      this.timerId = null;
    });
  }

  addVideoLayer(src) {
    this.videoLayer = new VideoLayer(this);
    this.videoLayer.add(src);
    this._bindEvents();
  }

  _initVideoParameters(parameters) {
    if (parameters && !Object.keys(parameters).length) {
      return;
    }
    this.cacheVideoParameters = parameters;
    return new Coordtransfer(parameters).init();
  }
  /**
   * @function SuperMap.VideoMap.prototype.setVideoParameters
   * @description  设置视频配准参数。
   * @param {Object} parameters - 视频配准参数。
   */
  setVideoParameters(parameters) {
    if (parameters && !Object.keys(parameters).length) {
      return;
    }

    if (this.coordTransfer) {
      this.coordTransfer.setCameraLocation(parameters);
      this._updateDatas();
      this.cacheVideoParameters = parameters;
    } else {
      this._initVideoParameters(parameters).then((coordTransfer) => {
        this.coordTransfer = coordTransfer;
      });
    }
  }
  /**
   * @function SuperMap.VideoMap.prototype.setVideoXYZ
   * @description  设置视频配准 x y z 参数。
   * @param {Object} pos - 视频配准 x y z 参数。
   */
  setVideoXYZ(pos) {
    const newVideoParameters = { ...this.cacheVideoParameters, ...pos };
    this.setVideoParameters(newVideoParameters);
    this.cacheVideoParameters = newVideoParameters;
  }
  /**
   * @function SuperMap.VideoMap.prototype.setVideoPRY
   * @description  设置视频配准 pitch roll yaw 参数。
   * @param {Object} pos - 视频配准 pitch roll yaw 参数。
   */
  setVideoPRY(parameters) {
    const newVideoParameters = { ...this.cacheVideoParameters, ...parameters };
    this.setVideoParameters(newVideoParameters);
    this.cacheVideoParameters = newVideoParameters;
  }
  /**
   * @function SuperMap.VideoMap.prototype.setVideoFov
   * @description  设置视频配准 fx fy 参数。
   * @param {Object} parameter - 视频配准 fx fy 参数。
   */
  setVideoFov(fov) {
    const newVideoParameters = { ...this.cacheVideoParameters, ...fov };
    this.setVideoParameters(newVideoParameters);
    this.cacheVideoParameters = newVideoParameters;
  }

  /**
   * @function SuperMap.VideoMap.prototype.addControl
   * @description  视频地图添加控件。
   * @param {Object} control - 控件实例。
   * @param {string} [position='top-right'] - 控制被添加到地图的位置。
   */
  addControl(control, position) {
    if (!this._mapExisted()) {
      return;
    }
    this.map.addControl(control.instance, position);
    if (control.controlName === 'draw') {
      MAP_DRAW_EVENTS.forEach((eventName) => {
        this.map.on(eventName, (e) => {
          if (e && e.type === 'draw.create') {
            coordEach(e.features[0], (coord) => {
              let spatialPoint = this.coordTransfer.toSpatialCoordinate(
                transformCoordReverse({
                  coord,
                  originCoordsRightBottom: this.originCoordsRightBottom,
                  originCoordsLeftTop: this.originCoordsLeftTop,
                  videoHeight: this.videoHeight,
                  videoWidth: this.videoWidth
                })
              );
              coord[0] = spatialPoint[0];
              coord[1] = spatialPoint[1];
            });
          }
          this.fire(eventName, { e });
        });
      });
    }
  }
  /**
   * @function SuperMap.VideoMap.prototype.removeControl
   * @description  视频地图移除控件。
   * @param {Object} control - 控件实例。
   */
  removeControl(control) {
    if (!this._mapExisted()) {
      return;
    }
    this.map.removeControl(control.instance);
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
  /**
   * @function SuperMap.VideoMap.prototype.addMarker
   * @description  添加 Marker。
   * @param {Object} options
   */
  addMarker(options) {
    if (!this._mapExisted()) {
      return;
    }
    return new VideoMarker(this, options);
  }
  /**
   * @function SuperMap.VideoMap.prototype.addPopup
   * @description  添加 Popup。
   * @param {Object} options
   */
  addPopup(options) {
    if (!this._mapExisted()) {
      return;
    }
    return new VideoMapPopup(this, options);
  }
  /**
   * @function SuperMap.VideoMap.prototype.addLayer
   * @description  添加图层。
   * @param {Object} layer - 图层配置。
   * @param {string} [type='geojson'] - 图层配置。
   * @param {Object} beforeId - 已经存在的图层 ID。
   */
  addLayer(layer, type = 'geojson', beforeId) {
    if (!this._mapExisted()) {
      return;
    }
    if (this.layerCache[layer.id]) {
      return;
    }
    const currentLayer = new LAYER_MAP[type](this);
    currentLayer.add(layer, beforeId);
    this.layerCache[layer.id] = currentLayer;
  }
  /**
   * @function SuperMap.VideoMap.prototype.addSource
   * @description  添加数据源。
   * @param {string} id - source id。
   * @param {Object} source - 图层配置。
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
    this.layerCache[id] = geojsonSource;
  }
  /**
   * @function SuperMap.VideoMap.prototype.addSource
   * @description  获取数据源。
   * @param {string} id - source id。
   */
  getSource(id) {
    if (!this._mapExisted()) {
      return;
    }
    return this.map.getSource(id);
  }
  /**
   * @function SuperMap.VideoMap.prototype.getStyle
   * @description  获取视频地图样式配置。
   * @returns {Object} source - 图层配置。
   */
  getStyle() {
    if (!this._mapExisted()) {
      return;
    }
    return this.map.getStyle();
  }
  /**
   * @function SuperMap.VideoMap.prototype.removeLayer
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
   * @function SuperMap.VideoMap.prototype.removeSource
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
   * @function SuperMap.VideoMap.prototype.play
   * @description  播放视频。
   */
  play() {
    this.videoLayer.play();
  }
  /**
   * @function SuperMap.VideoMap.prototype.pause
   * @description  暂停视频。
   */
  pause() {
    this.videoLayer.pause();
  }
  /**
   * @function SuperMap.VideoMap.prototype.queryRenderedFeatures
   * @description  查询渲染的要素。
   * @param {Array} geometry - 图层 ID。
   * @param {Object} options - 配置。
   */
  queryRenderedFeatures(pos, options) {
    if (!this._mapExisted()) {
      return;
    }
    return this.map.queryRenderedFeatures(pos, options);
  }
  /**
   * @function SuperMap.VideoMap.prototype.getPaintProperty
   * @description  获取绘制属性。
   * @param {string} layerId - 图层 ID。
   * @param {string} propertyName - 属性名。
   */
  getPaintProperty(layerId, propertyName) {
    if (!this._mapExisted()) {
      return;
    }
    return this.map.getPaintProperty(layerId, propertyName);
  }

  getLayoutProperty(layerId, propertyName) {
    if (!this._mapExisted()) {
      return;
    }
    return this.map.getLayoutProperty(layerId, propertyName);
  }
  setPaintProperty(layerId, propertyName, propertyValue) {
    if (!this._mapExisted()) {
      return;
    }
    this.map.setPaintProperty(layerId, propertyName, propertyValue);
  }

  setLayoutProperty(layerId, propertyName, propertyValue) {
    if (!this._mapExisted()) {
      return;
    }
    return this.map.setLayoutProperty(layerId, propertyName, propertyValue);
  }
  /**
   * @function SuperMap.VideoMap.prototype.setFilter
   * @description  设置过滤。
   * @param {string} layerId - 图层 ID。
   * @param {Array} filter - 过滤配置。
   */
  setFilter(layerId, filter) {
    if (!this._mapExisted()) {
      return;
    }
    return this.map.setFilter(layerId, filter);
  }

  /**
   * @function SuperMap.VideoMap.prototype.destroy
   * @description  销毁视频地图。
   */
  destroy() {
    this.timerId = null;
    this.layerCache = {};
    this.sourceCache = {};
    this.cacheVideoParameters = {};
    if (this.videoLayer) {
      this.videoLayer.remove();
      this.videoLayer = null;
    }
    this.map.remove();
    this.map = null;
  }

  _updateDatas() {
    this.map.fire('videoparameterchange');
  }

  _mapExisted() {
    return !!this.map;
  }

  _bindEvents() {
    this.videoLayer.on('videolayeradded', ({ originCoordsLeftTop, originCoordsRightBottom }) => {
      this.originCoordsLeftTop = originCoordsLeftTop;
      this.originCoordsRightBottom = originCoordsRightBottom;
      this.fire('load', { map: this.map });
    });
    this.videoLayer.on('timeupdate', ({ time }) => {
      this.fire('timeupdate', { time });
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

SuperMap.VideoMap = VideoMap;
