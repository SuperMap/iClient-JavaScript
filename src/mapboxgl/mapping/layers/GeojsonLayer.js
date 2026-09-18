import { transformVideoMapGeoJSON } from '../utils/clipVideoMapGeometry';

/**
 * @class GeojsonLayer
 * @version 11.2.0
 * @private
 * @classdesc 视频地图 geojson 图层。
 * @param {Object} videoMap - 视频地图实例。
 */
export default class GeojsonLayer {
  constructor(videoMap) {
    this.videoMap = videoMap;
    this.map = videoMap.map;
    this.layerId = null;
  }

  /**
   * @function GeojsonLayer.prototype.add
   * @param {Object} layer - Mapbox layer 地图对象。
   * @param {string} beforeId - Mapbox GL 地图对象。
   */
  add(layer, beforeId) {
    const { id, source } = layer;
    this.layerId = id;
    if (this._existed()) {
      return;
    }
    if (typeof source === 'object') {
      layer.source.data = this.eachData(source.data);
    }

    this.map.addLayer(layer, beforeId);
  }

  /**
   * @function GeojsonLayer.prototype.remove
   */
  remove() {
    this.map && this.map.removeLayer(this.layerId);
  }

  _existed() {
    return !!(this.layerId && this.map.getLayer(this.layerId));
  }

  /**
   * @function GeojsonLayer.prototype.eachData
   * @param {Object} features - GeoJSON 数据。
   */
  eachData(features) {
    if (!this.videoMap || !this.videoMap.coordTransfer) {
      return features;
    }
    return transformVideoMapGeoJSON(features, this.videoMap);
  }
}
