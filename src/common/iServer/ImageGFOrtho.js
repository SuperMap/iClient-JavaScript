/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class ImageGFOrtho
 * @deprecatedclass SuperMap.ImageGFOrtho
 * @classdesc 栅格函数对象：对 DEM 数据生成正射三维晕渲图。该栅格函数不需要输入参数，采用系统默认设置。
 * @category iServer Image
 * @param {Object} options - 可选参数。
 * @param {string} [options.girdFuncName='GFOrtho'] 栅格函数名称，参数值为：GFOrtho。
 * @usage
*/
export default class ImageGFOrtho {
  constructor(options) {
    /**
    * @description 栅格函数名称，参数值为：GFOrtho。
    * @member {string} ImageGFOrtho.prototype.girdFuncName
    * @default 'GFOrtho'
    */
    this.girdFuncName = 'GFOrtho';

    this.CLASS_NAME = 'SuperMap.ImageGFOrtho';
    Util.extend(this, options);

  }

  /**
  * @function ImageGFOrtho.prototype.destroy
  * @description 释放资源，将引用资源的属性置空。
  */
  destroy() {
    var me = this;
    me.girdFuncName = 'GFOrtho';
  }

  /**
  * @function ImageGFOrtho.prototype.constructFromObject
  * @description 目标对象新增该类的可选参数。
  * @param {Object} data 要转换的数据。
  * @param {ImageGFOrtho} obj 返回的模型。
  * @return {ImageGFOrtho} 返回结果。
  */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ImageGFOrtho();
      if (data.hasOwnProperty('girdFuncName')) {
          obj.girdFuncName = data.girdFuncName
      }
    }
    return obj;
  }
}


