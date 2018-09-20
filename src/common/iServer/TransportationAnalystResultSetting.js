/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.TransportationAnalystResultSetting
 * @category  iServer NetworkAnalyst
 * @classdesc 交通网络分析结果参数类。
 * @description 通过该类设置交通网络分析返回的结果，包括是否返回图片、是否返回弧段空间信息、是否返回结点空间信息等。
 * @param {Object} options - 参数。
 * @param {boolean} [options.returnEdgeFeatures=false] - 是否在分析结果中包含弧段要素集合。
 * @param {boolean} [options.returnEdgeGeometry=false] - 返回的弧段要素集合中是否包含几何对象信息。
 * @param {boolean} [options.returnEdgeIDs=false] - 返回结果中是否包含经过弧段 ID 集合。
 * @param {boolean} [options.returnNodeFeatures=false] - 是否在分析结果中包含结点要素集合。
 * @param {boolean} [options.returnNodeGeometry=false] - 返回的结点要素集合中是否包含几何对象信息。
 * @param {boolean} [options.returnNodeIDs=false] - 返回结果中是否包含经过结点 ID 集合。
 * @param {boolean} [options.returnPathGuides=false] - 返回分析结果中是否包含行驶导引集合。
 * @param {boolean} [options.returnRoutes=false] - 返回分析结果中是否包含路由对象的集合。
 */
export class TransportationAnalystResultSetting {

    constructor(options) {
        if (!options) {
            return;
        }

        /**
         * @member {boolean} SuperMap.TransportationAnalystResultSetting.prototype.returnEdgeFeatures
         * @description 是否在分析结果中包含弧段要素集合。弧段要素包括弧段的空间信息和属性信息。
         */
        this.returnEdgeFeatures = false;

        /**
         * @member {boolean} [SuperMap.TransportationAnalystResultSetting.prototype.returnEdgeGeometry=false]
         * @description 返回的弧段要素集合中是否包含几何对象信息。
         */
        this.returnEdgeGeometry = false;

        /**
         * @member {boolean} [SuperMap.TransportationAnalystResultSetting.prototype.returnEdgeIDs=false]
         * @description 返回结果中是否包含经过弧段 ID 集合。
         */
        this.returnEdgeIDs = false;

        /**
         * @member {boolean} [SuperMap.TransportationAnalystResultSetting.prototype.returnNodeFeatures=false]
         * @description 是否在分析结果中包含结点要素集合。
         * 结点要素包括结点的空间信息和属性信息。其中返回的结点要素是否包含空间信息可通过 returnNodeGeometry 字段设置。
         */
        this.returnNodeFeatures = false;

        /**
         * @member {boolean} [SuperMap.TransportationAnalystResultSetting.prototype.returnNodeGeometry=false]
         * @description 返回的结点要素集合中是否包含几何对象信息。
         */
        this.returnNodeGeometry = false;

        /**
         * @member {boolean} [SuperMap.TransportationAnalystResultSetting.prototype.returnNodeIDs=false]
         * @description 返回结果中是否包含经过结点 ID 集合。
         */
        this.returnNodeIDs = false;

        /**
         * @member {boolean} SuperMap.TransportationAnalystResultSetting.prototype.returnPathGuides
         * @description 返回分析结果中是否包含行驶导引集合。
         */
        this.returnPathGuides = false;

        /**
         * @member {boolean} SuperMap.TransportationAnalystResultSetting.prototype.returnRoutes
         * @description 返回分析结果中是否包含路由对象的集合。
         */
        this.returnRoutes = false;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TransportationAnalystResultSetting";
    }

    /**
     * @function SuperMap.TransportationAnalystResultSetting.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.returnEdgeFeatures = null;
        me.returnEdgeGeometry = null;
        me.returnEdgeIDs = null;
        me.returnNodeFeatures = null;
        me.returnNodeGeometry = null;
        me.returnNodeIDs = null;
        me.returnPathGuides = null;
        me.returnRoutes = null;
    }

}

SuperMap.TransportationAnalystResultSetting = TransportationAnalystResultSetting;