/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


import { Util } from '../commontypes/Util';

/**
 * @class ImageGFHillShade
 * @deprecatedclass SuperMap.ImageGFHillShade
 * @classdesc 栅格函数对象：对DEM数据生成三维晕渲图。
 * @category iServer Image
 * @param {Object} options - 可选参数。
 * @param {string} [options.girdFuncName='GFHillShade'] 栅格函数名称，参数值为：GFHillShade。
 * @param {number} [options.Azimuth = 315] 光源方位角。用于确定光源的方向，是从光源所在位置的正北方向线起，依顺时针方向到光源与目标方向线的夹角，范围为 0-360 度，以正北方向为 0 度，依顺时针方向递增。默认值为：315。
 * @param {number} [options.Altitude = 45] 光源高度角。用于确定光源照射的倾斜角度，是光源与目标的方向线与水平面间的夹角，范围为 0-90 度。当光源高度角为 90 度时，光源正射地表。默认值为：45。
 * @param {number} [options.ZFactor = 1] 高程缩放系数。如果设置为 1.0，表示不缩放。默认值为：1。
 * @usage
*/
export default class ImageGFHillShade {
  constructor(options) {
    /**
    * @description 栅格函数名称，参数值为：GFHillShade。
    * @member {string} ImageGFHillShade.prototype.girdFuncName
    * @default 'GFHillShade'
    */
    this.girdFuncName = 'GFHillShade';
    /**
    * @description 光源方位角。用于确定光源的方向，是从光源所在位置的正北方向线起，依顺时针方向到光源与目标方向线的夹角，范围为 0-360 度，以正北方向为 0 度，依顺时针方向递增。默认值为：315。
    * @member {number} ImageGFHillShade.prototype.Azimuth
    */
    this.Azimuth = 315;
    /**
    * @description 光源高度角。用于确定光源照射的倾斜角度，是光源与目标的方向线与水平面间的夹角，范围为 0-90 度。当光源高度角为 90 度时，光源正射地表。默认值为：45。
    * @member {number} ImageGFHillShade.prototype.Altitude
    */
    this.Altitude = 45;
    /**
    * @description 高程缩放系数。如果设置为 1.0，表示不缩放。默认值为：1。
    * @member {number} ImageGFHillShade.prototype.ZFactor
    */
    this.ZFactor = 1;

    this.CLASS_NAME = 'SuperMap.ImageGFHillShade';
    Util.extend(this, options);

  }

  /**
  * @function ImageGFHillShade.prototype.destroy
  * @description 释放资源，将引用资源的属性置空。
  */
  destroy() {
    var me = this;
    me.girdFuncName = 'GFHillShade';
    me.Azimuth = 315;
    me.Altitude = 45;
    me.ZFactor = 1;
  }

  /**
  * @function ImageGFHillShade.prototype.constructFromObject
  * @description 目标对象新增该类的可选参数。
  * @param {Object} data 要转换的数据。
  * @param {ImageGFHillShade} obj 返回的模型。
  * @return {ImageGFHillShade} 返回结果。
  */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ImageGFHillShade();
      if (data.hasOwnProperty('girdFuncName')) {
          obj.girdFuncName = data.girdFuncName
      }
      if (data.hasOwnProperty('Azimuth')) {
          obj.Azimuth = data.Azimuth
      }
      if (data.hasOwnProperty('Altitude')) {
          obj.Altitude = data.Altitude
      }
      if (data.hasOwnProperty('ZFactor')) {
          obj.ZFactor = data.ZFactor
      }
    }
    return obj;
  }
}




