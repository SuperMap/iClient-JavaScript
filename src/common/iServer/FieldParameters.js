/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class FieldParameters
 * @deprecatedclass SuperMap.FieldParameters
 * @category iServer Data Field
 * @classdesc 字段信息查询参数类。此类用于设置进行字段信息查询的数据集和数据源等参数。
 * 可以查询获取的字段信息包括：字段名称，字段类型，字段别名，字段默认值，字段是否允许为空，字段最大长度，是否允许长度为零等。
 * @param {Object} options - 参数。
 * @param {string} options.datasource - 数据源名称。
 * @param {string} options.dataset - 数据集名称。
 * @usage
 */
export class FieldParameters {


    constructor(options) {
        /**
         * @member {string} FieldParameters.prototype.datasource
         * @description 要查询的数据集所在的数据源名称。
         */
        this.datasource = null;

        /**
         *  @member {string} FieldParameters.prototype.dataset
         *  @description 要查询的数据集名称。
         */
        this.dataset = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.FieldParameters";
    }

    /**
     * @function FieldParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasource = null;
        me.dataset = null;
    }

}

