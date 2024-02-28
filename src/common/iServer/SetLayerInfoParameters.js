/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class SetLayerInfoParameters
 * @deprecatedclass SuperMap.SetLayerInfoParameters
 * @category  iServer Map TempLayersSet
 * @classdesc 设置图层信息参数类。此类可用于设置临时图层下子图层信息的相关参数。
 * @param {Object} options - 参数。
 * @param {string} options.resourceID - 临时图层的资源 ID。
 * @param {string} options.tempLayerName - 临时图层下的子图层名称。
 * @param {string} options.layerInfo - 要更新的图层信息。
 * @usage
 */
export class SetLayerInfoParameters {

    constructor(options) {
        options = options || {};
        /**
         * @member {string} SetLayerInfoParameters.prototype.resourceID
         * @description 临时图层的资源 ID。
         */
        this.resourceID = null;

        /**
         * @member {string} SetLayerInfoParameters.prototype.tempLayerName
         * @description 临时图层下子图层（或者其子图层）名，如：Countries@World.3@@World。
         */
        this.tempLayerName = null;

        /**
         * @member {Object} SetLayerInfoParameters.prototype.layerInfo
         * @description 要更新的图层信息（包含修改和未修改的所有字段）。该参数可以通过图层信息服务获取，然后对返回值中 subLayers.layers[i] 图层信息属性进行修改。
         */
        this.layerInfo = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.SetLayerInfoParameters";
    }

    /**
     * @function SetLayerInfoParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.resourceID = null;
        me.tempLayerName = null;
        me.layerInfo = null;
    }

}

