import { featureEach, coordEach } from '@turf/meta';
import cloneDeep from 'lodash.clonedeep';
import { transformCoord } from '../util';

/**
 * @class GeojsonLayer
 * @version 11.2.0
 * @private
 * @classdesc 视频地图 geojson 图层。
 * @param {Object} videoMap - 视频地图实例。
 */
export default class GeojsonLayer {
  constructor(videoMap) {
    const { coordTransfer, originCoordsRightBottom, originCoordsLeftTop, videoWidth, videoHeight, map } = videoMap;
    this.map = map;
    this.coordTransfer = coordTransfer;
    this.layerId = null;
    this.originCoordsRightBottom = originCoordsRightBottom;
    this.originCoordsLeftTop = originCoordsLeftTop;
    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;
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
      const newData = this.eachData(cloneDeep(source.data));
      layer.source.data = newData;
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
   * @function GeojsonLayer.prototype.add
   * @param {Array} features - Mapbox layer 地图对象。
   */
  eachData(features) {
    if (!this.coordTransfer) {
      return [];
    }
    featureEach(features, (currentFeature) => {
      coordEach(currentFeature, (curCoords) => {
        let transCoords = this.coordTransfer.toVideoCoordinate(curCoords);
        curCoords.length = 0;
        if (transCoords.data64F.length) {
          curCoords.push(
            ...transformCoord({
              videoPoint: transCoords.data64F,
              videoWidth: this.videoWidth,
              videoHeight: this.videoHeight,
              originCoordsRightBottom: this.originCoordsRightBottom,
              originCoordsLeftTop: this.originCoordsLeftTop
            })
          );
        }
      });
    });
    return features;
  }
}
