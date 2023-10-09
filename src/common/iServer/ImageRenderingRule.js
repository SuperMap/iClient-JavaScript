/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import { Util } from '../commontypes/Util';
import ImageStretchOption from './ImageStretchOption';

/**
 * @class ImageRenderingRule
 * @deprecatedclass SuperMap.ImageRenderingRule
 * @classdesc 定义请求的影像如何进行渲染或者处理，如：影像的拉伸显示方式、颜色表、波段组合以及应用栅格函数进行快速处理等。
 * @category iServer Image
 * @param {Object} options - 可选参数。
 * @param {ImageRenderingRule.DisplayMode} [options.displayMode] 影像显示模式，其中：Composite 表示多波段组合显示；Stretched 表示单波段拉伸显示。
 * @param {string} [options.displayBands] 影像显示的波段或者波段组合。若影像的显示模式为 Stretched，该属性指定一个波段的索引号(波段索引号从 0 开始计数)；若影像的显示模式为 Composite，该属性为组合的波段索引号，例如：属性值 3,2,1 表示采用 4 波段、3 波段、2 波段分别对应 R、G、B 颜色通道进行组合显示。
 * @param {ImageStretchOption} [options.stretchOption] 影像的拉伸参数。
 * @param {ImageRenderingRule.InterpolationMode} [options.interpolationMode] 影像显示时使用的插值算法。
 * @param {Array.<string>} [options.colorScheme] 影像拉伸显示的颜色方案。颜色方案为 RGBA 颜色数组。RGBA 是代表 Red（红色）Green（绿色）Blue（蓝色）和 Alpha 的色彩空间。Alpha 值可以省略不写，表示完全不透明。Alpha 通道表示不透明度参数，若该值为 0 表示完全透明。例如："255,0,0","0,255,0","0,0,255" 表示由红色、绿色、蓝色三种颜色构成的色带。
 * @param {Array.<string>} [options.colorTable] 影像的颜色表。颜色表为栅格值与 RGBA 颜色值的对照表。RGBA 是代表 Red（红色）Green（绿色）Blue（蓝色）和 Alpha 的色彩空间。Alpha 值可以省略不写，表示完全不透明。Alpha 通道表示不透明度参数，若该值为 0 表示完全透明。以下示例表示该颜色对照表由三组构成，第一组高程值为 500，对应的颜色为红色；第二组高程值为 700，对应的颜色为绿色；第三组高程值为 700，对应的颜色为蓝色。示例："500: 255,0,0", "700: 0,255,0" , "900: 0,0,255"。
 * @param {number} [options.brightness] 影像显示的亮度。数值范围为 -100 到 100，增加亮度为正，降低亮度为负。
 * @param {number} [options.contrast] 影像显示的对比度。数值范围为 -100 到 100，增加对比度为正，降低对比度为负。
 * @param {string} [options.noData] 影像的无值。影像为多波段时，通过逗号分隔 R,G,B 颜色通道对应波段的无值。
 * @param {string} [options.noDataColor] 影像的无值的显示颜色，支持 RGB 颜色，例如：255,0,0（红色），那么无值将以指定的红色显示。
 * @param {boolean} [options.noDataTransparent] 无值是否透明显示，true 表示透明显示无值；否则为 false。
 * @param {string} [options.backgroundValue] 影像的背景值。影像为多波段时，通过逗号分隔 R,G,B 颜色通道对应波段的背景值。
 * @param {string} [options.backgroundColor] 指定背景值的颜色。支持指定 RGB 颜色，例如：255,0,0（红色），那么背景值将以指定的红色显示。
 * @param {boolean} [options.backgroundTransparent] 背景值是否透明显示，true 表示透明显示背景值；否则为 false。
 * @param {Array.<ImageGFHillShade|ImageGFSlope|ImageGFAspect|ImageGFOrtho>} [options.gridFunctions] 栅格函数选项，通过应用栅格函数，可以对影像进行快速显示处理。
 * @usage
 */
export default class ImageRenderingRule {
  constructor(options) {
    /**
     * @description 影像显示模式，其中：Composite 表示多波段组合显示；Stretched 表示单波段拉伸显示。
     * @member {ImageRenderingRule.DisplayMode} ImageRenderingRule.prototype.displayMode
     */
    this.displayMode = undefined;
    /**
     * @description 影像显示的波段或者波段组合。该参数为一个数组，数组元素为波段索引号。若影像的显示模式为 Stretched，该属性指定一个显示的波段；若影像的显示模式为 Composite，该属性为组合的波段索引号，例如：属性值 4,3,2 表示采用 4 波段、3 波段、2 波段分别对应 R、G、B 颜色通道进行组合显示。
     * @member {string} ImageRenderingRule.prototype.displayBands
     */
    this.displayBands = undefined;
    /**
     * @description 影像的拉伸参数。
     * @member {ImageStretchOption} ImageRenderingRule.prototype.stretchOption
     */
    this.stretchOption = undefined;
    /**
     * @description 影像显示时使用的插值算法。
     * @member {ImageRenderingRule.InterpolationMode} ImageRenderingRule.prototype.interpolationMode
     */
    this.interpolationMode = undefined;
    /**
     * @description 影像拉伸显示的颜色方案。颜色方案为RGBA颜色数组。RGBA 是代表 Red（红色）Green（绿色）Blue（蓝色）和 Alpha 的色彩空间。Alpha 值可以省略不写，表示完全不透明。Alpha 通道表示不透明度参数，若该值为 0 表示完全透明。例如："255,0,0","0,255,0","0,0,255" 表示由红色、绿色、蓝色三种颜色构成的色带。
     * @member {Array.<string>} ImageRenderingRule.prototype.colorScheme
     */
    this.colorScheme = undefined;
    /**
     * @description 影像的颜色表。颜色表为栅格值与RGBA颜色值的对照表。RGBA 是代表 Red（红色）Green（绿色）Blue（蓝色）和 Alpha 的色彩空间。Alpha 值可以省略不写，表示完全不透明。Alpha 通道表示不透明度参数，若该值为 0 表示完全透明。以下示例表示该颜色对照表由三组构成，第一组高程值为 500，对应的颜色为红色；第二组高程值为 700，对应的颜色为绿色；第三组高程值为 700，对应的颜色为蓝色。示例："500: 255,0,0", "700: 0,255,0" , "900: 0,0,255"。
     * @member {Array.<string>} ImageRenderingRule.prototype.colorTable
     */
    this.colorTable = undefined;
    /**
     * @description 影像显示的亮度。数值范围为 -100 到 100，增加亮度为正，降低亮度为负。
     * @member {number} ImageRenderingRule.prototype.brightness
     */
    this.brightness = undefined;
    /**
     * @description 影像显示的对比度。数值范围为 -100 到 100，增加对比度为正，降低对比度为负。
     * @member {number} ImageRenderingRule.prototype.contrast
     */
    this.contrast = undefined;
    /**
     * @description 影像的无值。影像为多波段时，通过逗号分隔 R,G,B 颜色通道对应波段的无值。
     * @member {string} ImageRenderingRule.prototype.noData
     */
    this.noData = undefined;
    /**
     * @description 影像的无值的显示颜色，支持RGB颜色，例如：255,0,0（红色），那么无值将以指定的红色显示。
     * @member {string} ImageRenderingRule.prototype.noDataColor
     */
    this.noDataColor = undefined;
    /**
     * @description 无值是否透明显示，true 表示透明显示无值；否则为 false。
     * @member {boolean} ImageRenderingRule.prototype.noDataTransparent
     */
    this.noDataTransparent = undefined;

    /**
     * @description 影像的背景值。影像为多波段时，通过逗号分隔 R,G,B 颜色通道对应波段的背景值。
     * @member {string} ImageRenderingRule.prototype.backgroundValue
     */
    this.backgroundValue = undefined;
    /**
     * @description 指定背景值的颜色。支持指定 RGB 颜色，例如：255,0,0（红色），那么背景值将以指定的红色显示。
     * @member {string} ImageRenderingRule.prototype.backgroundColor
     */
    this.backgroundColor = undefined;
    /**
     * @description 背景值是否透明显示，true 表示透明显示背景值；否则为 false。
     * @member {boolean} ImageRenderingRule.prototype.backgroundTransparent
     */
    this.backgroundTransparent = undefined;
    /**
     * @description 栅格函数选项，通过应用栅格函数，可以对影像进行快速显示处理。
     * @member {Array.<ImageGFHillShade|ImageGFSlope|ImageGFAspect|ImageGFOrtho>} ImageRenderingRule.prototype.gridFunctions
     */
    this.gridFunctions = undefined;

    this.CLASS_NAME = 'SuperMap.ImageRenderingRule';
    Util.extend(this, options);
  }

  /**
   * @function ImageRenderingRule.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  destroy() {
    var me = this;
    me.displayMode = undefined;
    me.displayBands = undefined;
    me.stretchOption = undefined;
    me.interpolationMode = undefined;
    me.colorScheme = undefined;
    me.colorTable = undefined;
    me.brightness = undefined;
    me.contrast = undefined;
    me.noData = undefined;
    me.noDataColor = undefined;
    me.noDataTransparent = undefined;
    me.backgroundValue = undefined;
    me.backgroundColor = undefined;
    me.backgroundTransparent = undefined;
    me.gridFuncOptions = undefined;
  }

  /**
   * @function ImageRenderingRule.prototype.constructFromObject
   * @description 目标对象新增该类的可选参数。
   * @param {Object} data 要转换的数据。
   * @param {ImageRenderingRule} obj 返回的模型。
   * @return {ImageRenderingRule} 返回结果。
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ImageRenderingRule();
      if (data.hasOwnProperty('displayMode')) {
        obj.displayMode = data.displayMode;
      }
      if (data.hasOwnProperty('displayBands')) {
        obj.displayBands = data.displayBands;
      }
      if (data.hasOwnProperty('stretchOption')) {
        obj.stretchOption =
          (ImageStretchOption.constructFromObject && ImageStretchOption.constructFromObject(data.stretchOption, {})) ||
          data.stretchOption;
      }
      if (data.hasOwnProperty('interpolationMode')) {
        obj.interpolationMode = data.interpolationMode;
      }
      if (data.hasOwnProperty('colorScheme')) {
        obj.colorScheme = data.colorScheme;
      }
      if (data.hasOwnProperty('colorTable')) {
        obj.colorTable = data.colorTable;
      }
      if (data.hasOwnProperty('brightness')) {
        obj.brightness = data.brightness;
      }
      if (data.hasOwnProperty('contrast')) {
        obj.contrast = data.contrast;
      }
      if (data.hasOwnProperty('noData')) {
        obj.noData = data.noData;
      }
      if (data.hasOwnProperty('noDataColor')) {
        obj.noDataColor = data.noDataColor;
      }
      if (data.hasOwnProperty('backgroundValue')) {
        obj.backgroundValue = data.backgroundValue;
      }
      if (data.hasOwnProperty('noDataTransparent')) {
        obj.noDataTransparent = data.noDataTransparent;
      }
      if (data.hasOwnProperty('backgroundColor')) {
        obj.backgroundColor = data.backgroundColor;
      }
      if (data.hasOwnProperty('backgroundTransparent')) {
        obj.backgroundTransparent = data.backgroundTransparent;
      }
      if (data.hasOwnProperty('gridFunctions')) {
        obj.gridFunctions = data.gridFunctions;
      }
    }
    return obj;
  }
}

/**
 * @enum DisplayMode
 * @description 影像显示模式。
 * @memberOf ImageRenderingRule
 * @readonly
 * @type {string}
 */
ImageRenderingRule.DisplayMode = {
  COMPOSITE: 'COMPOSITE',
  STRETCHED: 'Stretched'
};

/**
 * @enum InterpolationMode
 * @description 影像显示时使用的插值算法枚举。
 * @memberOf ImageRenderingRule
 * @readonly
 * @type {string}
 */
ImageRenderingRule.InterpolationMode = {
  /** 最邻近插值模式。 */
  NEARESTNEIGHBOR: 'NEARESTNEIGHBOR',
  /** 高质量的双线性插值模式。 */
  HIGHQUALITYBILINEAR: 'HIGHQUALITYBILINEAR',
  /** 默认插值模式。 */
  DEFAULT: 'DEFAULT'
};
