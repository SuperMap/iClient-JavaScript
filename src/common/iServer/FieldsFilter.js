/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


import { Util } from '../commontypes/Util';

/**
 * @class FieldsFilter
 * @deprecatedclass SuperMap.FieldsFilter
 * @category iServer Data Field
 * @classdesc 指定返回的用于描述 Feature 的字段。
 * @param {Object} options - 可选参数。
 * @param {Array.<string>} [options.include] 对返回的字段内容进行过滤，需保留的字段列表。
 * @param {Array.<string>} [options.exclude] 对返回的字段内容进行过滤，需排除的字段列表。
 * @usage
 */
export default class FieldsFilter {
  constructor(options) {
    /**
    * @description 对返回的字段内容进行过滤，需保留的字段列表。
    * @member {Array.<string>} FieldsFilter.prototype.include
    */
    this.include = undefined;
    /**
    * @description 对返回的字段内容进行过滤，需排除的字段列表。
    * @member {Array.<string>} FieldsFilter.prototype.exclude
    */
    this.exclude = undefined;

    this.CLASS_NAME = 'SuperMap.FieldsFilter';
    Util.extend(this, options);

  }

  /**
  * @function FieldsFilter.prototype.destroy
  * @description 释放资源，将引用资源的属性置空。
  */
  destroy() {
    var me = this;
    me.include = undefined;
    me.exclude = undefined;
  }

  /**
  * @function FieldsFilter.prototype.constructFromObject
  * @description 目标对象新增该类的可选参数。
  * @param {Object} data 要转换的数据。
  * @param {FieldsFilter} obj 返回的模型。
  * @return {FieldsFilter} 返回结果。
  */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new FieldsFilter();
      if (data.hasOwnProperty('include')) {
          obj.include = data.include
      }
      if (data.hasOwnProperty('exclude')) {
          obj.exclude = data.exclude
      }
    }
    return obj;
  }
}




