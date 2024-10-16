/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from './Util';

/**
 * @class Feature
 * @deprecatedclass SuperMap.Feature
 * @category BaseTypes Geometry
 * @classdesc 要素类组合了地理和属性，Feature 类同时具有 marker 和 lonlat 属性。
 * @param {SuperMap.Layer} layer - 图层。
 * @param {LonLat} lonlat - 经纬度。
 * @param {Object} data - 数据对象。
 * @usage
 */
export class Feature {


    constructor(layer, lonlat, data) {
        this.CLASS_NAME = "SuperMap.Feature";
        /**
         * @deprecated
         * @member {SuperMap.Layer} Feature.prototype.layer
         * @description 图层。
         */
        this.layer = layer;

        /**
         * @member {string} Feature.prototype.id
         * @description 要素 ID。
         */
        this.id = Util.createUniqueID(this.CLASS_NAME + "_");

        /**
         * @member {LonLat} Feature.prototype.lonlat
         * @description 经纬度。
         *
         */
        this.lonlat = lonlat;

        /**
         * @member {Object} Feature.prototype.data
         * @description 数据对象。
         */
        this.data = (data != null) ? data : {};

    }

    /**
     * @function Feature.prototype.destroy
     * @description 释放相关资源。
     */
    destroy() {
        this.id = null;
        this.lonlat = null;
        this.data = null;
    }
}
