/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class VideoFeature
 * @category iServer Data
 * @classdesc 视频要素类
 * @version 11.2.0
 * @param {Object} options - 参数。
 * @param {(L.Bounds|L.LatLngBounds|L.Rectangle|L.Polygon|ol.extent|ol.geom.Polygon|mapboxgl.LngLatBounds|GeoJSONObject|SuperMap.Bounds)} options.geometry - 视频参数对应的视频视角空间范围，只支持矩形。
 * @param {string|number} [options.id] - 要素 ID。
 * @param {string} [options.name] - 视频名称。
 * @param {string} [options.address] - 视频流地址。
 * @param {string} [options.attributes] - 描述要素的任意的可序列化属性。
 * @usage
 */
export class VideoFeature {
  constructor(options) {
    /**
     * @member {string|number} VideoFeature.prototype.id
     * @description 要素 ID。
     */
    this.id = null;
    /**
     * @member {string} VideoFeature.prototype.name
     * @description 视频名称
     */
    this.name = null;

    /**
     * @member {(L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject|SuperMap.Bounds)} VideoFeature.prototype.geometry
     * @description 视频参数对应的视频视角空间范围，只支持矩形
     *
     */
    this.geometry = null;

    /**
     * @member {string} VideoFeature.prototype.address
     * @description 视频流地址
     */
    this.address = null;

    /**
     * @member {Object} VideoFeature.prototype.attributes
     * @description 描述要素的任意的可序列化属性。
     */
    this.attributes = {};
    // ToDo
    this.videoParameters = null;
    // ToDo
    this.cameraLocation = null;

    Util.extend(this, options);
    this.CLASS_NAME = 'SuperMap.VideoFeature';
  }

  /**
   * @function VideoFeature.prototype.destroy
   * @description 销毁此对象。
   */
  destroy() {
    if (this.geometry && this.geometry.destroy) {
      this.geometry.destroy();
      this.geometry = null;
    }
    this.name = null;
    this.videoParameters = null;
    this.cameraLocation = null;
    this.address = null;
    this.attributes = null;
  }
  /**
   * @function VideoFeature.prototype.toGeoJSONFeature
   * @description 转换为GeoJSON Feature Object
   * @return {Object}
   */
  toGeoJSONFeature(geometryFunction) {
    return {
      type: 'Feature',
      geometry: geometryFunction ? geometryFunction(this.geometry) : this.geometry,
      properties: this.attributes,
      name: this.name,
      address: this.address,
      id: this.id
    };
  }
  /**
   * @function VideoFeature.prototype.toServerFeature
   * @description 转换为iServer Feature Object
   * @return {Object}
   */
  toServerFeature({ geometryFunction }) {
    const feature = {
      type: 'VideoFeature',
      geometry: geometryFunction && this.geometry ? geometryFunction(this.geometry) : this.geometry,
      name: this.name,
      address: this.address,
      id: this.id
    };
    const fieldNames = [];
    const fieldValues = [];
    for (const key in this.attributes) {
      fieldNames.push(key);
      fieldValues.push(this.attributes[key]);
    }
    feature.fieldNames = fieldNames;
    feature.fieldValues = fieldValues;
    return feature;
  }
}
