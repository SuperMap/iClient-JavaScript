import cloneDeep from 'lodash.clonedeep';
import { transformVideoMapGeoJSON } from './utils/clipVideoMapGeometry';

/**
 * @class GeojsonSource
 * @version 11.2.0
 * @private
 * @classdesc geojson 数据源。
 * @param {Object} videoMap - 视频地图实例。
 */
export default class GeojsonSource {
  constructor(videoMap) {
    this.videoMap = videoMap;
    this.map = videoMap.map;
  }

  /**
   * @function GeojsonSource.prototype.add
   * @description  添加数据源。
   * @param {string} id - 数据源 Id。
   * @param {Object} source
   */
  add(id, source) {
    if (this.map.getSource(id)) {
      return;
    }
    this.id = id;
    this.source = source;
    this.originalData = cloneDeep(source.data);
    const newData = this._transformData(this.originalData);
    source.data = newData;
    this.map.addSource(id, source);
  }

  update() {
    const source = this.map.getSource(this.id);
    if (!source || !this.originalData) {
      return;
    }
    source.setData(this._transformData(this.originalData));
  }

  /**
   * @function GeojsonSource.prototype.setData
   * @description 更新原始地理数据并重新投影到视频地图。
   * @param {Object} data - GeoJSON 数据。
   */
  setData(data) {
    this.originalData = cloneDeep(data);
    this.update();
  }

  _transformData(data) {
    return transformVideoMapGeoJSON(data, this.videoMap);
  }

  /**
   * @function GeojsonSource.prototype.remove
   * @description  移除数据源。
   * @param {Object} id - 数据源 id。
   */
  remove() {
    if (this.id && this.map.getSource(this.id)) {
      this.map.removeSource(this.id);
    }
  }
}
