import SuperMap from '../SuperMap';

/**
 * @class SuperMap.SetLayerInfoParameters
 * @classdesc 设置图层信息参数类.
 * @param options -{Object} 可选参数。如：<br>
 *         tempLayerID -{string} 临时图层的资源ID。<br>
 *         layerName -{string} 图层资源名。<br>
 *         resourceID -{string} 资源ID。<br>
 *         layerInfo -{string} 要更新的图层信息。
 */
export default  class SetLayerInfoParameters {

    /**
     * @member SuperMap.SetLayerInfoParameters.prototype.tempLayerID -{string}
     * @description 临时图层的资源ID
     */
    tempLayerID = null;

    /**
     * @member SuperMap.SetLayerInfoParameters.prototype.layerName -{string}
     * @description 图层资源名
     */
    layerName = null;

    /**
     * @member SuperMap.SetLayerInfoParameters.prototype.resourceID -{string}
     * @description 资源ID，
     */
    resourceID = null;

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
        me.tempLayerID = null;
        me.layerName = null;
        me.resourceID = null;
        me.layerInfo = null;
    }


    CLASS_NAME = "SuperMap.SetLayerInfoParameters"
}

SuperMap.SetLayerInfoParameters = SetLayerInfoParameters;
