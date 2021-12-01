import { featureEach, coordEach } from '@turf/meta';
import cloneDeep from 'lodash.clonedeep';
import { transformCoord } from './util';

/**
 * @class SuperMap.GeojsonSource
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
    this.layerId = null;
    this.cacheData = null;
    this.setDataFn = this.setData.bind(this);
  }

  /**
   * @function SuperMap.GeojsonSource.prototype.addSource
   * @description  添加数据源。
   * @param {Object} id - 视频配准 x y z 参数。
   * @param {Object} source
   */
  addSource(id, source) {
    if (this.map.getLayer(id)) {
      return;
    }
    this.layerId = id;
    const newData = cloneDeep(source.data);
    featureEach(newData, (currentFeature) => {
      coordEach(currentFeature, (curCoords) => {
        let transCoords = this.coordTransfer.toVideoCoordinate(curCoords);
        // 剔除无效坐标
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

    this.cacheData = source.data;
    this.map.on('videoparameterchange', this.setDataFn);
    source.data = newData;

    this.map.addSource(id, source);
  }
/**
   * @function SuperMap.GeojsonSource.prototype.addSource
   * @description  添加数据源。
   * @param {Object} id - 视频配准 x y z 参数。
   * @param {Object} source
   */
  removeSource() {
    this.map.off('videoparameterchange', this.setDataFn);
  }

  /**
   * @function SuperMap.GeojsonSource.prototype.addSource
   * @description  添加数据源。
   * @param {Object} id - 视频配准 x y z 参数。
   * @param {Object} source
   */
  setData() {
    const newData = cloneDeep(this.cacheData);
    featureEach(newData, (currentFeature) => {
      coordEach(currentFeature, (curCoords) => {
        let transCoords = this.coordTransfer.toVideoCoordinate(curCoords);
        curCoords.length = 0;
        curCoords.push(...this.transformCoord(transCoords.data64F));
      });
    });
    this.map.getSource(this.layerId).setData(newData);
  }
}
