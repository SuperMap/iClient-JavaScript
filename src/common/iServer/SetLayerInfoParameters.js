import SuperMap from '../SuperMap';

/**
 * @class SuperMap.SetLayerInfoParameters
 * @classdesc 设置图层信息参数类.
 * @param options -{Object} 可选参数。如：<br>
 *         resourceID -{string} 临时图层的资源ID。<br>
 *         tempLayerName -{string} 临时图层下的子图层名。<br>
 *         layerInfo -{string} 要更新的图层信息。
 */
export default class SetLayerInfoParameters {

    /**
     * @member SuperMap.SetLayerInfoParameters.prototype.resourceID -{string}
     * @description 临时图层的资源ID
     */
    resourceID = null;

    /**
     * @member SuperMap.SetLayerInfoParameters.prototype.tempLayerName -{string}
     * @description 临时图层下子图层(或者其子图层)名,如：Countries@World.3@@World
     */
    tempLayerName = null;

    /**
     * @member SuperMap.SetLayerInfoParameters.prototype.layerInfo -{string}
     * @description 要更新的图层信息
     */
    layerInfo = null;

    constructor(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.SetLayerInfoParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.resourceID = null;
        me.tempLayerName = null;
        me.layerInfo = null;
    }


    CLASS_NAME = "SuperMap.SetLayerInfoParameters"
}

SuperMap.SetLayerInfoParameters = SetLayerInfoParameters;
