import mapboxgl from 'mapbox-gl';
import { transformCoord, validLnglat } from './util';
import { SuperMap } from '@supermap/iclient-common';

const POPUP_EVENTS = ['open', 'close'];

/**
 * @class SuperMap.VideoMapPopup
 * @classdesc  视频地图 popup
 * @param {Object} videoMap - 视频地图实例。
 * @param {Object} options - Marker 配置 详见：{@link https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup-parameters}。
 * @extends {mapboxgl.Evented}
 */

export default class VideoMapPopup extends mapboxgl.Evented {
  constructor(videoMap, options) {
    super();
    const { coordTransfer, originCoordsRightBottom, originCoordsLeftTop, videoWidth, videoHeight, map } = videoMap;
    this.map = map;
    this.coordTransfer = coordTransfer;
    this.originCoordsRightBottom = originCoordsRightBottom;
    this.originCoordsLeftTop = originCoordsLeftTop;
    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;
    this.cacheCoords = null;
    this.popupEventFn = this.popupEvent.bind(this);
    this.popup = new mapboxgl.Popup(options);
    POPUP_EVENTS.forEach((eventName) => {
      this.popup.on(eventName, this.popupEventFn);
    });
    this.setDataFn = this._setData.bind(this);
    this.map.on('videoparameterchange', this.setDataFn);
  }

  popupEvent(e) {
    this.fire(e.type, { e });
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.setCoordinate
   * @description  设置坐标。
   * @param {Array} coordinate - 坐标。
   */
  setCoordinate(coordinate) {
    this.cacheCoords = coordinate;
    this._setData();
    return this;
  }

  getCoordinate() {}

  trackPointer() {
    this.popup.trackPointer();
    return this;
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.getElement
   * @description  获取 popup 元素。
   */
  getElement() {
    return this.popup.getElement();
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.setOffset
   * @description  设置偏移值。
   * @returns {Popup} Popup 实例。
   */
  setOffset(offset) {
    this.popup.setOffset(offset);
    return this;
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.addClassName
   * @description  添加类名。
   * @returns {Popup} Popup 实例。
   */
  addClassName(className) {
    this.popup.addClassName(className);
    return this;
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.removeClassName
   * @description  移除类名。
   * @returns {Popup} Popup 实例。
   */
  removeClassName(className) {
    this.popup.removeClassName(className);
    return this;
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.toggleClassName
   * @description  切换类名。
   */
  toggleClassName(className) {
    this.popup.toggleClassName(className);
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.getMaxWidth
   * @description  获取最大宽度。
   * @returns {string} 最大宽度值。
   */
  getMaxWidth(maxWidth) {
    return this.popup.getMaxWidth(maxWidth);
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.setMaxWidth
   * @description  设置最大宽度。
   * @param {string} maxWidth - 宽度值
   * @returns {Popup} Popup 实例。
   */
  setMaxWidth(maxWidth) {
    this.popup.setMaxWidth(maxWidth);
    return this;
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.setDOMContent
   * @description  设置 dom 元素。
   * @param {Element} htmlNode
   * @returns {Popup} Popup 实例。
   */
  setDOMContent(htmlNode) {
    this.popup.setDOMContent(htmlNode);
    return this;
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.setText
   * @description  设置 text。
   * @param {string} text
   * @returns {Popup} Popup 实例。
   */
  setText(text) {
    this.popup.setText(text);
    return this;
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.setHTML
   * @description  设置 html。
   * @param {string} html
   * @returns {Popup} Popup 实例。
   */
  setHTML(html) {
    this.popup.setHTML(html);
    return this;
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.addToMap
   * @description  popup 添加到地图。
   * @returns {Popup} Popup 实例。
   */
  addToMap() {
    this.popup.addTo(this.map);
    return this;
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.isOpen
   * @description  Popup 是否展开。
   * @returns {boolean} 展开状态。
   */
  isOpen() {
    return this.popup.isOpen();
  }

  _setData() {
    if (!this.coordTransfer) {
      return;
    }
    if (this.cacheCoords) {
      let transCoords = this.coordTransfer.toVideoCoordinate(this.cacheCoords);
      transCoords = transformCoord({
        videoPoint: transCoords.data64F,
        videoWidth: this.videoWidth,
        videoHeight: this.videoHeight,
        originCoordsRightBottom: this.originCoordsRightBottom,
        originCoordsLeftTop: this.originCoordsLeftTop
      });
      if (!validLnglat(transCoords)) {
        return;
      }
      this.popup.setLngLat(transCoords).addTo(this.map);
    }
  }
  /**
   * @function SuperMap.VideoMapPopup.prototype.remove
   * @description  移除 Popup。
   */
  remove() {
    POPUP_EVENTS.forEach((eventName) => {
      this.popup.off(eventName, this.popupEventFn);
    });
    this.popup.remove();
    this.map.off('videoparameterchange', this.setDataFn);
  }
}
SuperMap.VideoMapPopup = VideoMapPopup;
