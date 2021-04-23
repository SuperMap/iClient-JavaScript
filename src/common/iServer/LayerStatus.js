/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.LayerStatus
 * @category iServer Map Theme
 * @classdesc 子图层显示参数类。
 * @description 该类存储了各个子图层的名字和是否可见的状态。
 * @param {Object} options - 参数。
 * @param {string} options.layerName - 获取或设置图层名称。
 * @param {boolean} [options.isVisible=true] - 获取或设置图层是否可见，true 表示可见。
 * @param {string} [options.displayFilter] - 图层显示 SQL 过滤条件。
 */
export class LayerStatus {

    constructor(options) {
        /**
         * @member {string} SuperMap.LayerStatus.prototype.layerName
         * @description 获取或设置图层名称。
         */
        this.layerName = null;

        /**
         * @member {boolean} SuperMap.LayerStatus.prototype.isVisible
         * @description 获取或设置图层是否可见，true 表示可见。
         */
        this.isVisible = null;

        /**
         * @member {string} [SuperMap.LayerStatus.prototype.displayFilter]
         * @description 图层显示 SQL 过滤条件，如 layerStatus.displayFilter = "smid < 10"，表示仅显示 smid 值小于 10 的对象。
         */
        this.displayFilter = null;

        /**
         * @member {Object} [SuperMap.LayerStatus.prototype.fieldValuesDisplayFilter]
         * @property {Array.<number>} values - 要过滤的值。
         * @property {string} fieldName - 要过滤的字段名称只支持数字类型的字段。
         * @property {string} fieldValuesDisplayMode - 目前有两个 DISPLAY/DISABLE。当为 DISPLAY 时，表示只显示以上设置的相应属性值的要素，否则表示不显示以上设置的相应属性值的要素。
         */

        this.fieldValuesDisplayFilter = null;

        /**
         * @member {Object} [SuperMap.SetLayerStatusParameters]
         * @description 图层组下的子图层资源信息
         */
        this.subLayers = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.LayerStatus";
    }

    /**
     * @function SuperMap.LayerStatus.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.layerName = null;
        me.isVisible = null;
        me.displayFilter = null;
    }


    /**
     * @function SuperMap.LayerStatus.prototype.toJSON
     * @description 生成对应的 JSON。
     * @returns {Object} 对应的 JSON。
     */
    toJSON() {
        var json = '{';
        json += '"type":"UGC",';
        var v = [];
        if (this.layerName) {
            v.push('"name":"' + this.layerName + '"');
            v.push('"visible":' + this.isVisible);
        }

        if (this.displayFilter) {
            v.push('"displayFilter":"' + this.displayFilter + '"');
        }

        if (this.minScale || this.minScale == 0) {
            v.push('"minScale":' + this.minScale);
        }

        if (this.maxScale || this.maxScale == 0) {
            v.push('"maxScale":' + this.maxScale);
        }

        if (this.fieldValuesDisplayFilter) {
            v.push('"fieldValuesDisplayFilter":' + Util.toJSON(this.fieldValuesDisplayFilter));
        }

        if (this.subLayers) {
            v.push('"subLayers":' + this.subLayers.toJSON());
        }

        json += v;
        json += '}';

        return json;
    }

}

SuperMap.LayerStatus = LayerStatus;