import mapboxgl from 'mapbox-gl';
import { transformCoord } from './util';
import VideoPopup from './VideoPopup';
import { SuperMap } from '@supermap/iclient-common';

const MARKER_EVENTS = ['drag', 'dragstart', 'dragend'];
/**
 * @class SuperMap.VideoMarker
 * @classdesc 视频 Marker
 * @param {Object} videoMap - 视频地图实例。
 * @param {Object} options - Marker 配置 详见：{@link https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker-parameters}。
 **/
export default class VideoMarker extends mapboxgl.Evented {
  constructor(videoMap, options) {
    super();
    const { coordTransfer, originCoordsRightBottom, originCoordsLeftTop, videoWidth, videoHeight, map } = videoMap;
    this.map = map;
    this.coordTransfer = coordTransfer;
    this.originCoordsRightBottom = originCoordsRightBottom;
    this.originCoordsLeftTop = originCoordsLeftTop;
    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;
    this.setDataFn = this._setData.bind(this);
    this.markerEventFn = this.markerEvent.bind(this);
    this.marker = new mapboxgl.Marker(options);
    MARKER_EVENTS.forEach((eventName) => {
      this.marker.on(eventName, this.markerEventFn);
    });
    this.map.on('videoparameterchange', this.setDataFn);
  }

  markerEvent(e) {
    this.fire(e.type, { e });
  }
  /**
   * @function SuperMap.VideoMarker.prototype.setCoordinate
   * @description  设置坐标。
   * @returns {Marker} Marker 实例。
   */
  setCoordinate(coordinate) {
    this.cacheCoord = coordinate;
    this._setData();
    return this;
  }

  getCoordinate() {}
  /**
   * @function SuperMap.VideoMarker.prototype.setPopup
   * @description  设置 Popup。
   * @returns {Marker} Marker 实例。
   */
  setPopup(popup) {
    if (popup instanceof VideoPopup) {
      this.marker.setPopup(popup.popup);
      return this;
    }
  }
  /**
   * @function SuperMap.VideoMarker.prototype.getPopup
   * @description  获取 Popup 实例。
   */
  getPopup() {
    return this.marker.getPopup();
  }
  /**
   * @function SuperMap.VideoMarker.prototype.addToMap
   * @description  添加到视频地图。
   * @returns {Marker} Marker 实例。
   */
  addToMap() {
    this.marker.addTo(this.map);
    return this;
  }
  /**
   * @function SuperMap.VideoMarker.prototype.remove
   * @description  移除 Marker。
   */
  remove() {
    MARKER_EVENTS.forEach((eventName) => {
      this.marker.off(eventName, this.markerEventFn);
    });
    this.marker.remove();
    this.map.off('videoparameterchange', this.setDataFn);
  }
  /**
   * @function SuperMap.VideoMarker.prototype.setDraggable
   * @description  设置 Marker 是否可以拖拽。
   * @returns {Marker} Marker 实例。
   */
  setDraggable(shouldBeDraggable) {
    this.marker.setDraggable(shouldBeDraggable);
    return this;
  }
  /**
   * @function SuperMap.VideoMarker.prototype.isDraggable
   * @description  设置坐标。
   * @returns {Marker} Marker 实例。
   */
  isDraggable() {
    this.marker.isDraggable();
    return this;
  }
  /**
   * @function SuperMap.VideoMarker.prototype.setRotation
   * @description  设置旋转角度。
   * @returns {Marker} Marker 实例。
   */
  setRotation(rotation) {
    return this.marker.setRotation(rotation);
  }
  /**
   * @function SuperMap.VideoMarker.prototype.getRotation
   * @description  获取旋转角度。
   * @returns {Marker} Marker 实例。
   */
  getRotation() {
    return this.marker.getRotation();
  }
  /**
   * @function SuperMap.VideoMarker.prototype.setRotationAlignment
   * @description  设置旋转。
   * @returns {Marker} Marker 实例。
   */
  setRotationAlignment(alignment) {
    this.marker.setRotationAlignment(alignment);
    return this;
  }
  /**
   * @function SuperMap.VideoMarker.prototype.getRotationAlignment
   * @description  设置坐标。
   * @returns {Marker} Marker 实例。
   */
  getRotationAlignment() {
    return this.marker.getRotationAlignment();
  }
  /**
   * @function SuperMap.VideoMarker.prototype.setPitchAlignment
   * @description  设置坐标。
   * @returns {Marker} Marker 实例。
   */
  setPitchAlignment(alignment) {
    this.marker.setPitchAlignment(alignment);
    return this;
  }
  /**
   * @function SuperMap.VideoMarker.prototype.setCoordinate
   * @description  获取方位角居中。
   * @returns {Marker} Marker 实例。
   */
  getPitchAlignment() {
    return this.marker.getPitchAlignment();
  }
  /**
   * @function SuperMap.VideoMarker.prototype.getElement
   * @description  获取 Marker 元素。
   * @returns {Marker} Marker 实例。
   */
  getElement() {
    return this.marker.getElement();
  }
  /**
   * @function SuperMap.VideoMarker.prototype.togglePopup
   * @description  切换 Popup 的显示隐藏。
   * @returns {Marker} Marker 实例。
   */
  togglePopup() {
    this.marker.togglePopup();
    return this;
  }
  /**
   * @function SuperMap.VideoMarker.prototype.getOffset
   * @description  获取偏移。
   * @returns {Marker} Marker 实例。
   */
  getOffset() {
    this.marker.getOffset();
    return this;
  }
  /**
   * @function SuperMap.VideoMarker.prototype.setOffset
   * @description  设置偏移。
   * @returns {Marker} Marker 实例。
   */
  setOffset(offset) {
    this.marker.setOffset(offset);
    return this;
  }

  _setData() {
    if (!this.coordTransfer) {
      return;
    }
    if (this.cacheCoord) {
      let transCoords = this.coordTransfer.toVideoCoordinate(this.cacheCoord);
      transCoords = transformCoord({
        videoPoint: transCoords.data64F,
        videoWidth: this.videoWidth,
        videoHeight: this.videoHeight,
        originCoordsRightBottom: this.originCoordsRightBottom,
        originCoordsLeftTop: this.originCoordsLeftTop
      });
      this.marker.setLngLat(transCoords);
    }
  }
}

SuperMap.VideoMarker = VideoMarker;
