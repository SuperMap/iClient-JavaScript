/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import { Util } from '../commontypes/Util';

/**
 * @class ImageStretchOption
 * @deprecatedclass SuperMap.ImageStretchOption
 * @classdesc 影像拉伸类。
 * @category iServer Image
 * @param {Object} options - 可选参数。
 * @param {ImageStretchOption.StretchType} [options.stretchType] 影像拉伸类型。该属性的值有以下几种情况：NONE，无拉伸；GAUSSIAN，高斯拉伸；PERCENTCLIP，百分比截断拉伸；MINIMUMMAXIMUM，最值拉伸；STANDARDDEVIATION，标准差拉伸。
 * @param {number} [options.stdevCoefficient] 标准差系数。
 * @param {number} [options.gaussianCoefficient] 高斯系数。
 * @param {boolean} [options.useMedianValue] 高斯拉伸时，是否使用中间值，若该属性值为true，表示使用中间值；false，表示使用平均值。
 * @param {number} [options.minPercent] 使用百分比截断拉伸时，排除影像直方图最低值区域的像元，该参数值为这部分像元占总像元百分比。
 * @param {number} [options.maxPercent] 使用百分比截断拉伸时，排除影像直方图最高值区域的像元，该参数值为这部分像元占总像元百分比。
 * @usage
 */
export default class ImageStretchOption {
  constructor(options) {
    /**
     * @description 影像拉伸类型。该属性的值有以下几种情况：NONE，无拉伸；GAUSSIAN，高斯拉伸；PERCENTCLIP，百分比截断拉伸；MINIMUMMAXIMUM，最值拉伸；STANDARDDEVIATION，标准差拉伸。
     * @member {ImageStretchOption.StretchType} ImageStretchOption.prototype.stretchType
     */
    this.stretchType = undefined;
    /**
     * @description 标准差系数。
     * @member {number} ImageStretchOption.prototype.stdevCoefficient
     */
    this.stdevCoefficient = undefined;
    /**
     * @description 高斯系数。
     * @member {number} ImageStretchOption.prototype.gaussianCoefficient
     */
    this.gaussianCoefficient = undefined;
    /**
     * @description 高斯拉伸时，是否使用中间值，若该属性值为true，表示使用中间值；false，表示使用平均值。
     * @member {boolean} ImageStretchOption.prototype.useMedianValue
     */
    this.useMedianValue = undefined;
    /**
     * @description 使用百分比截断拉伸时，排除影像直方图最低值区域的像元，该参数值为这部分像元占总像元百分比。
     * @member {number} ImageStretchOption.prototype.minPercent
     */
    this.minPercent = undefined;
    /**
     * @description 使用百分比截断拉伸时，排除影像直方图最高值区域的像元，该参数值为这部分像元占总像元百分比。
     * @member {number} ImageStretchOption.prototype.maxPercent
     */
    this.maxPercent = undefined;

    this.CLASS_NAME = 'SuperMap.ImageStretchOption';
    Util.extend(this, options);
  }

  /**
   * @function ImageStretchOption.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  destroy() {
    var me = this;
    me.stretchType = undefined;
    me.stdevCoefficient = undefined;
    me.gaussianCoefficient = undefined;
    me.useMedianValue = undefined;
    me.minPercent = undefined;
    me.maxPercent = undefined;
  }

  /**
   * @function ImageStretchOption.prototype.constructFromObject
   * @description 目标对象新增该类的可选参数。
   * @param {Object} data 要转换的数据。
   * @param {ImageStretchOption} obj 返回的模型。
   * @return {ImageStretchOption} 返回结果。
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ImageStretchOption();
      if (data.hasOwnProperty('stretchType')) {
        obj.stretchType = data.stretchType;
      }
      if (data.hasOwnProperty('stdevCoefficient')) {
        obj.stdevCoefficient = data.stdevCoefficient;
      }
      if (data.hasOwnProperty('gaussianCoefficient')) {
        obj.gaussianCoefficient = data.gaussianCoefficient;
      }
      if (data.hasOwnProperty('useMedianValue')) {
        obj.useMedianValue = data.useMedianValue;
      }
      if (data.hasOwnProperty('minPercent')) {
        obj.minPercent = data.minPercent;
      }
      if (data.hasOwnProperty('maxPercent')) {
        obj.maxPercent = data.maxPercent;
      }
    }
    return obj;
  }
}
/**
 * @enum StretchType
 * @description 影像拉伸类型枚举。
 * @memberOf ImageStretchOption
 * @readonly
 * @type {string}
 */
ImageStretchOption.StretchType = {
  NONE: 'NONE',
  GAUSSIAN: 'GAUSSIAN',
  PERCENTCLIP: 'PERCENTCLIP',
  MINIMUMMAXIMUM: 'MINIMUMMAXIMUM',
  STANDARDDEVIATION: 'STANDARDDEVIATION'
};
