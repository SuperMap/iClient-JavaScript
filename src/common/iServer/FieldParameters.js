/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.FieldParameters
 * @category iServer Data Field
 * @classdesc 字段信息查询参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.datasource - 数据源名称。
 * @param {string} options.dataset - 数据集名称。
 */
export class FieldParameters {


    constructor(options) {
        /**
         * @member {string} SuperMap.FieldParameters.prototype.datasource
         * @description 要查询的数据集所在的数据源名称。
         */
        this.datasource = null;

        /**
         *  @member {string} SuperMap.FieldParameters.prototype.dataset
         *  @description 要查询的数据集名称。
         */
        this.dataset = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.FieldParameters";
    }

    /**
     * @function SuperMap.FieldParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasource = null;
        me.dataset = null;
    }

}

SuperMap.FieldParameters = FieldParameters;
