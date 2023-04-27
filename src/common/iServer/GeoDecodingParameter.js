/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class GeoDecodingParameter
 * @deprecatedclass SuperMap.GeoDecodingParameter
 * @category iServer AddressMatch
 * @classdesc 地理反向匹配参数类。
 * @param {Object} options - 参数。
 * @param {number} options.x - 查询位置的横坐标。
 * @param {number} options.y - 查询位置的纵坐标。
 * @param {number} [options.fromIndex] - 设置返回对象的起始索引值。
 * @param {Array.<string>} [options.filters] - 过滤字段，限定查询区域。
 * @param {string} [options.prjCoordSys] - 查询结果的坐标系。
 * @param {number} [options.maxReturn] - 最大返回结果数。
 * @param {number} [options.geoDecodingRadius] - 查询半径。
 * @usage
 */
export class GeoDecodingParameter {


    constructor(options) {

        if (options.filters) {
            options.filters = options.filters.split(',');
        }
        /**
         * @member {number} GeoDecodingParameter.prototype.x
         * @description 查询位置的横坐标。
         */
        this.x = null;

        /**
         * @member {number} GeoDecodingParameter.prototype.y
         * @description 查询位置的纵坐标。
         */
        this.y = null;
        /**
         * @member {number} [GeoDecodingParameter.prototype.fromIndex]
         * @description  设置返回对象的起始索引值。
         */
        this.fromIndex = null;

        /**
         * @member {number} [GeoDecodingParameter.prototype.toIndex]
         * @description 设置返回对象的结束索引值。
         */
        this.toIndex = null;

        /**
         * @member {Array.<string>} [GeoDecodingParameter.prototype.filters]
         * @description 过滤字段，限定查询区域。
         */
        this.filters = null;

        /**
         * @member {string} [GeoDecodingParameter.prototype.prjCoordSys]
         * @description 查询结果的坐标系。
         */
        this.prjCoordSys = null;

        /**
         *  @member {number} [GeoDecodingParameter.prototype.maxReturn]
         *  @description 最大返回结果数。
         */
        this.maxReturn = null;

        /**
         * @member {number} GeoDecodingParameter.prototype.geoDecodingRadius
         * @description 查询半径。
         */
        this.geoDecodingRadius = null;
        Util.extend(this, options);
    }

    /**
     * @function GeoDecodingParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.fromIndex = null;
        this.toIndex = null;
        this.filters = null;
        this.prjCoordSys = null;
        this.maxReturn = null;
        this.geoDecodingRadius = null;
    }

}
