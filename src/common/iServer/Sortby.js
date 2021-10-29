/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class Sortby
 * @deprecatedclass SuperMap.Sortby
 * @classdesc 通过指定字段进行排序的方法类。
 * @category BaseTypes Util
 * @param {Object} options - 参数。
 * @param {string} options.field 属性名称。
 * @param {Sortby.Direction} options.direction 排序规则， 默认升序。
 * @usage
 */
export default class Sortby {
  constructor(options) {
    /**
     * @description 属性名称
     * @member {string} Sortby.prototype.field
     */
    this.field = undefined;
    /**
     * @description 排序规则
     * @member {Sortby.Direction} Sortby.prototype.direction
     * @default Sortby.Direction.ASC
     */
    this.direction = Sortby.Direction.ASC;

    this.CLASS_NAME = 'SuperMap.Sortby';
    Util.extend(this, options);
  }

  /**
   * @function Sortby.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  destroy() {
    var me = this;
    me.field = undefined;
    me.direction = 'ASC';
  }

  /**
   * @function Sortby.prototype.constructFromObject
   * @description 目标对象新增该类的可选参数。
   * @param {Object} data 要转换的数据。
   * @param {Sortby} obj 返回的模型。
   * @return {Sortby} 返回结果。
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
/**
 * @enum Direction
 * @description 排序的类型枚举。
 * @memberOf Sortby
 * @readonly
 * @type {string}
 */
Sortby.Direction = {
  ASC: 'ASC',
  DESC: 'DESC'
};
