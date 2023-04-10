/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class SetLayerStatusParameters
 * @deprecatedclass SuperMap.SetLayerStatusParameters
 * @category  iServer Map TempLayersSet
 * @classdesc 子图层显示控制参数类，该类存储了各子图层是否可见的状态。
 *            注意在 SuperMap iClient 系列产品中所说的图层与 SuperMap Deskpro 的地图对应，子图层与 SuperMap Deskpro 的图层对应。
 * @param {Object} options - 参数。
 * @param {Array.<LayerStatus>} options.layerStatusList - 获取或设置图层可见状态（{@link LayerStatus}）集合，
 *                                                                 集合中的每个 {@link LayerStatus} 对象代表一个子图层的可视状态。
 * @param {number} [options.holdTime=15] - 获取或设置资源在服务端保存的时间。
 * @param {string} [options.resourceID] - 获取或设置资源服务 ID。
 * @usage
 */
export class SetLayerStatusParameters {

    constructor(options) {
        /**
         * @member {Array.<LayerStatus>} SetLayerStatusParameters.prototype.layerStatusList
         * @description 获取或设置图层可见状态（{@link LayerStatus}）集合，集合中的每个 {@link LayerStatus} 对象代表一个子图层的可视状态。
         */
        this.layerStatusList = [];

        /**
         * @member {number} [SetLayerStatusParameters.prototype.holdTime=15]
         * @description 获取或设置资源在服务端保存的时间。单位为分钟。
         */
        this.holdTime = 15;

        /**
         * @member {string} SetLayerStatusParameters.prototype.resourceID
         * @description 获取或设置资源服务ID。如果设置该参数则会在指定的 TempLayer 中进行图层的显示控制；
         *              如果不设置该参数，则会首先创建一个 TempLayer ，然后在新创建的 TempLayer 中进行图层的显示控制。
         */
        this.resourceID = null;

        if (options) {
            Util.extend(this, options);
        }


    }

    /**
     * @function SetLayerStatusParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.layerStatusList = null;
        me.holdTime = null;
        me.resourceID = null;
    }

    /**
     * @function SetLayerStatusParameters.prototype.toJSON
     * @description 生成 JSON。
     * @returns {Object} 对应的 JSON 对象。
     */
    toJSON() {
        var json = '{';
        json += '"layers":[';
        var v = [];
        for (var i = 0, len = this.layerStatusList.length; i < len; i++) {
            v.push(this.layerStatusList[i].toJSON());
        }

        json += v;
        json += ']';
        json += '}';

        return json;
    }

}
