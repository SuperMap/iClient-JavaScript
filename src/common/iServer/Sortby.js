/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class SuperMap.Sortby
 * @param {Object} options - 初始化参数。
 * @param {string} options.field 属性名称
 * @param {SuperMap.Sortby.Direction} options.direction 排序规则， 默认升序
 */
export default class Sortby {
  constructor(options) {
    /**
     * @description 属性名称
     * @member {string} SuperMap.Sortby.prototype.field
     */
    this.field = undefined;
    /**
     * @description 排序规则
     * @member {SuperMap.Sortby.Direction} SuperMap.Sortby.prototype.direction
     * @default SuperMap.Sortby.Direction.ASC
     */
    this.direction = Sortby.Direction.ASC;

    this.CLASS_NAME = 'SuperMap.Sortby';
    Util.extend(this, options);
  }

  /**
   * @function SuperMap.Sortby.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  destroy() {
    var me = this;
    me.field = undefined;
    me.direction = 'ASC';
  }

  /**
   * @function SuperMap.Sortby.prototype.constructFromObject
   * @param {Object} data 要转换的数据.
   * @param {SuperMap.Sortby} obj 返回的模型.
   * @return {SuperMap.Sortby} 返回结果
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Sortby();
      if (data.hasOwnProperty('field')) {
        obj.field = data.field;
      }
      if (data.hasOwnProperty('direction')) {
        obj.direction = data.direction;
      }
    }
    return obj;
  }
}
