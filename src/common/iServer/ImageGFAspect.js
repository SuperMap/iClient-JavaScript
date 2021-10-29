/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class ImageGFAspect
 * @deprecatedclass SuperMap.ImageGFAspect
 * @classdesc 栅格函数对象:对DEM数据生成坡向渲图。
 * @category iServer Image
 * @param {Object} options -可选参数。
 * @param {string} [options.girdFuncName='GFAspect'] 栅格函数名称，参数值为：GFAspect。
 * @param {number} [options.Azimuth] 光源方位角，固定为360度。
 * @usage
*/
export default class ImageGFAspect {
  constructor(options) {
    /**
    * @description 栅格函数名称，参数值为：GFAspect。
    * @member {string} ImageGFAspect.prototype.girdFuncName
    * @default 'GFAspect'
    */
    this.girdFuncName = 'GFAspect';
    /**
    * @description 光源方位角，固定为360度。
    * @member {number} ImageGFAspect.prototype.Azimuth
    */
    this.Azimuth = undefined;

    this.CLASS_NAME = 'SuperMap.ImageGFAspect';
    Util.extend(this, options);

  }

  /**
  * @function ImageGFAspect.prototype.destroy
  * @description 释放资源，将引用资源的属性置空。
  */
  destroy() {
    var me = this;
    me.girdFuncName = 'GFAspect';
    me.Azimuth = undefined;
  }

  /**
  * @function ImageGFAspect.prototype.constructFromObject
  * @description 目标对象新增该类的可选参数。
  * @param {Object} data 要转换的数据.
  * @param {ImageGFAspect} obj 返回的模型.
  * @return {ImageGFAspect} 返回结果
  */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ImageGFAspect();
      if (data.hasOwnProperty('girdFuncName')) {
          obj.girdFuncName = data.girdFuncName
      }
      if (data.hasOwnProperty('Azimuth')) {
          obj.Azimuth = data.Azimuth
      }
    }
    return obj;
  }
}




