/*
 * Class: SuperMap.SetLayerInfoParameters
 * 设置图层信息参数类
 */
var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.SetLayerInfoParameters
 * @description 设置图层信息参数类.
 * @param options -{Object} 可选参数。如：<br>
 *         tempLayerID -{String} 临时图层的资源ID。<br>
 *         layerName -{String} 图层资源名。<br>
 *         resourceID -{String} 资源ID。<br>
 *         layerInfo -{String} 要更新的图层信息。
 */
SuperMap.SetLayerInfoParameters = SuperMap.Class({

    /**
     * APIProperty: tempLayerID
     * @member SuperMap.SetLayerInfoParameters.prototype.tempLayerID -{String}
     * @description 临时图层的资源ID
     */
    tempLayerID: null,

    /**
     * APIProperty: layerName
     * @member SuperMap.SetLayerInfoParameters.prototype.layerName -{String}
     * @description 图层资源名
     */
    layerName: null,

    /**
     * APIProperty: resourceID
     * @member SuperMap.SetLayerInfoParameters.prototype.resourceID -{String}
     * @description 资源ID，
     */
    resourceID: null,

    /**
     * APIProperty: layerInfo
     * @member SuperMap.SetLayerInfoParameters.prototype.layerInfo -{String}
     * @description 要更新的图层信息
     */
    layerInfo: null,

    initialize: function (options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.tempLayerID = null;
        me.layerName = null;
        me.resourceID = null;
        me.layerInfo = null;
    },

    CLASS_NAME: "SuperMap.SetLayerInfoParameters"
});

module.exports = SuperMap.SetLayerInfoParameters;
