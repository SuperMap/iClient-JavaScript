import SuperMap from '../SuperMap';

/**
 * @class SuperMap.SetLayersInfoParameters
 * @classdesc 设置图层信息参数类
 * @param options -{Object} 可选参数。如：<br>
 *        isTempLayers -{boolean} 是否是临时图层。<br>
 *        resourceID -{string} 资源ID。<br>
 *        layerInfo -{string} 要更新的图层信息。
 */
export default  class SetLayersInfoParameters {

    /**
     * @member SuperMap.SetLayersInfoParameters.prototype.isTempLayers -{boolean}
     * @description 是否是临时图层。
     */
    isTempLayers = null;
    /**
     * @member SuperMap.SetLayersInfoParameters.prototype.resourceID -{string}
     * @description 资源ID，
     */
    resourceID = null;

    /**
     * @member SuperMap.SetLayersInfoParameters.prototype.layerInfo -{string}
     * @description 要更新的图层信息。
     */
    layerInfo = null;

    constructor(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    }


    /**
     * @function SuperMap.SetLayersInfoParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.isTempLayers = null;
        me.resourceID = null;
        me.layerInfo = null;
    }


    CLASS_NAME = "SuperMap.SetLayersInfoParameters"
}

SuperMap.SetLayersInfoParameters = SetLayersInfoParameters;
