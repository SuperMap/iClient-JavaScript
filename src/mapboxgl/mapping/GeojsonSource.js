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
    const newData = cloneDeep(source.data);
    featureEach(newData, (currentFeature) => {
      coordEach(currentFeature, (curCoords) => {
        let transCurCoords = proj4('EPSG:4326', 'EPSG:3857', curCoords);
        let transCoords = this.coordTransfer.toVideoCoordinate(transCurCoords);
        curCoords.length = 0;
        curCoords.push(
          ...transformCoord({
            videoPoint: transCoords.data64F,
            videoWidth: this.videoWidth,
            videoHeight: this.videoHeight,
            originCoordsRightBottom: this.originCoordsRightBottom,
            originCoordsLeftTop: this.originCoordsLeftTop
          })
        );
      });
    });

    source.data = newData;

    this.map.addSource(id, source);
  }
  /**
   * @function GeojsonSource.prototype.remove
   * @description  移除数据源。
   * @param {Object} id - 数据源 id。
   * @param {Object} source
   */
  remove(id) {
    this.map.addSource(id);
  }
}
