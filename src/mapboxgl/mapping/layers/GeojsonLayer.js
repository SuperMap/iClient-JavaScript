import { featureEach, coordEach } from '@turf/meta';
import cloneDeep from 'lodash.clonedeep';
import { transformCoord } from '../util';
import { SuperMap } from '@supermap/iclient-common';

/**
 * @class SuperMap.GeojsonLayer
 * @classdesc geojson 图层。
 * @param {Object} videoMap - 视频地图实例。
 */

export default class GeojsonLayer {
  constructor(videoMap) {
    const { coordTransfer, originCoordsRightBottom, originCoordsLeftTop, videoWidth, videoHeight, map } = videoMap;
    this.map = map;
    this.coordTransfer = coordTransfer;
    this.layerId = null;
    this.cacheData = null;
    this.originCoordsRightBottom = originCoordsRightBottom;
    this.originCoordsLeftTop = originCoordsLeftTop;
    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;
    this.setDataFn = this.setData.bind(this);
  }

  /**
   * @function SuperMap.GeojsonLayer.prototype.add
   * @param {Object} layer - Mapbox layer 地图对象。
   * @param {string} beforeId - Mapbox GL 地图对象。
   */

  add(layer, beforeId) {
    const { id, source } = layer;
    this.layerId = id;
    if (this.existed()) {
      return;
    }
    if (typeof source === 'object') {
      const newData = this.eachData(cloneDeep(source.data));
      this.cacheData = source.data;
      this.map.on('videoparameterchange', this.setDataFn);
      layer.source.data = newData;
    }

    this.map.addLayer(layer, beforeId);
  }

  /**
   * @function SuperMap.GeojsonLayer.prototype.remove
   */

  remove() {
    this.map && this.map.removeLayer(this.layerId);
    this.map && this.map.off('videoparameterchange', this.setDataFn);
  }

  /**
   * @function SuperMap.GeojsonLayer.prototype.add
   * @param {Object} layer - Mapbox layer 地图对象。
   * @param {string} beforeId - Mapbox GL 地图对象。
   */

  setData(data) {
    if (data.features) {
      this.cacheData = data;
    }
    const newData = this.eachData(cloneDeep(this.cacheData));
    this.map.getSource(this.layerId).setData(newData);
  }

  existed() {
    return !!(this.layerId && this.map.getLayer(this.layerId));
  }

  /**
   * @function SuperMap.GeojsonLayer.prototype.add
   * @param {Array} features - Mapbox layer 地图对象。
   */

  eachData(features) {
    if (!this.coordTransfer) {
      return [];
    }
    featureEach(features, (currentFeature) => {
      coordEach(currentFeature, (curCoords) => {
        let transCoords = this.coordTransfer.toVideoCoordinate(curCoords);
        // 剔除无效坐标
        curCoords.length = 0;
        console.log('transCoords.data64F', transCoords.data64F);
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

SuperMap.GeojsonLayer = GeojsonLayer;
