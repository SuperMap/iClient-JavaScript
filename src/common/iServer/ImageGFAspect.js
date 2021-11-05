/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
* @class SuperMap.ImageGFAspect
* @classdesc 栅格函数对象:对DEM数据生成坡向渲图。
* @param {Object} options - 初始化参数。  
* @param {string} [options.girdFuncName='GFAspect'] 栅格函数名称，参数值为：GFAspect。
* @param {number} [options.Azimuth] 光源方位角，固定为360度。
*/
export default class ImageGFAspect {
  constructor(options) { 
    /**
    * @description 栅格函数名称，参数值为：GFAspect。 
    * @member {string} SuperMap.ImageGFAspect.prototype.girdFuncName
    * @default 'GFAspect'
    */
    this.girdFuncName = 'GFAspect';
    /**
    * @description 光源方位角，固定为360度。 
    * @member {number} SuperMap.ImageGFAspect.prototype.Azimuth
    */
    this.Azimuth = undefined;

    this.CLASS_NAME = 'SuperMap.ImageGFAspect';
    Util.extend(this, options);
    
  }

  /**
  * @function SuperMap.ImageGFAspect.prototype.destroy
  * @description 释放资源，将引用资源的属性置空。
  */
  destroy() {
    var me = this;
    me.girdFuncName = 'GFAspect';
    me.Azimuth = undefined;
  }

  /**
  * @function SuperMap.ImageGFAspect.prototype.constructFromObject
  * @param {Object} data 要转换的数据.
  * @param {SuperMap.ImageGFAspect} obj 返回的模型.
  * @return {SuperMap.ImageGFAspect} 返回结果
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




