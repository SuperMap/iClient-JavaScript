import { featureEach, coordEach } from '@turf/meta';
import cloneDeep from 'lodash.clonedeep';
import { transformCoord } from './utils/VideoMapUtil';
import proj4 from 'proj4';

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
    const { coordTransfer, originCoordsRightBottom, originCoordsLeftTop, videoWidth, videoHeight, map } = videoMap;
    this.map = map;
    this.coordTransfer = coordTransfer;
    this.originCoordsRightBottom = originCoordsRightBottom;
    this.originCoordsLeftTop = originCoordsLeftTop;
    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;
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

  _transformData(data) {
    const { coordTransfer, originCoordsRightBottom, originCoordsLeftTop, videoWidth, videoHeight } = this.videoMap;
    const newData = cloneDeep(data);
    featureEach(newData, (currentFeature) => {
      coordEach(currentFeature, (curCoords) => {
        let transCurCoords = proj4('EPSG:4326', 'EPSG:3857', curCoords);
        let transCoords = coordTransfer.toVideoCoordinate(transCurCoords);
        curCoords.length = 0;
        curCoords.push(
          ...transformCoord({
            videoPoint: transCoords.data64F,
            videoWidth,
            videoHeight,
            originCoordsRightBottom,
            originCoordsLeftTop
          })
        );
      });
    });
    return newData;
  }
  /**
   * @function GeojsonSource.prototype.remove
   * @description  移除数据源。
   * @param {Object} id - 数据源 id。
   * @param {Object} source
   */
  remove() {
    if (this.id && this.map.getSource(this.id)) {
      this.map.removeSource(this.id);
    }
  }
}
