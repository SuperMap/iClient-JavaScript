import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { SuperMap } from '@supermap/iclient-common';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

/**
 * @class SuperMap.VideoMapDraw
 * @classdesc 视频地图标绘。
 * @param {Object} options - 标绘配置 详见：{@link https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md}。
 */

export class VideoMapDraw {
  constructor(options) {
    this.controlName = 'draw';
    this.instance = new MapboxDraw(options);
  }
  /**
   * @function SuperMap.VideoMapDraw.prototype.deleteAll
   * @description  删除标绘。
   */
  deleteAll() {
    this.instance && this.instance.deleteAll();
  }

  /**
   * @function SuperMap.VideoMapDraw.prototype.changeMode
   * @description  修改模式。
   * @param {Object} mode - 模式类型。
   */
  changeMode(mode) {
    this.instance.changeMode(mode);
  }
  /**
   * @function SuperMap.VideoMapDraw.prototype.getMode
   * @description  获取模式。
   */
  getMode() {
    return this.instance.getMode();
  }
}
SuperMap.VideoMapDraw = VideoMapDraw;
