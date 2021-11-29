/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class GeoCodingParameter
 * @deprecatedclass SuperMap.GeoCodingParameter
 * @category  iServer AddressMatch
 * @classdesc 地理正向匹配参数类。
 * @param {Object} options - 参数。
 * @param {string} options.address - 地点关键词。
 * @param {number} [options.fromIndex] - 设置返回对象的起始索引值。
 * @param {number} [options.toIndex] - 设置返回对象的结束索引值。
 * @param {Array.<string>} [options.filters] - 过滤字段，限定查询区域。
 * @param {string} [options.prjCoordSys] - 查询结果的坐标系。
 * @param {number} [options.maxReturn] - 最大返回结果数。
 * @usage
 */
export class GeoCodingParameter {
    constructor(options) {
        if (options.filters && typeof(options.filters) === 'string') {
            options.filters =  options.filters.split(',');
        }
        /**
         * @member {string} GeoCodingParameter.prototype.address
         * @description 地点关键词。
         */
        this.address = null;

        /**
         * @member {number} [GeoCodingParameter.prototype.fromIndex]
         * @description 设置返回对象的起始索引值。
         */
        this.fromIndex = null;

        /**
         * @member {number} [GeoCodingParameter.prototype.toIndex]
         * @description 设置返回对象的结束索引值。
         */
        this.toIndex = null;

        /**
         * @member {Array.<string>} [GeoCodingParameter.prototype.filters]
         * @description 过滤字段，限定查询区域。
         */
        this.filters = null;

        /**
         * @member {string} [GeoCodingParameter.prototype.prjCoordSys]
         * @description  查询结果的坐标系。
         */
        this.prjCoordSys = null;

        /**
         * @member {number} [GeoCodingParameter.prototype.maxReturn]
         * @description 最大返回结果数。
         */
        this.maxReturn = null;
        Util.extend(this, options);
    }

    /**
     * @function GeoCodingParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.address = null;
        this.fromIndex = null;
        this.toIndex = null;
        this.filters = null;
        this.prjCoordSys = null;
        this.maxReturn = null;
    }

}
