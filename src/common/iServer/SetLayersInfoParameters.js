/*
 * Class: SuperMap.SetLayersInfoParameters
 * 设置图层信息参数类
 */
var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.SetLayersInfoParameters
 * @description 设置图层信息参数类
 * @param options -{Object} 可选参数。如：<br>
 *         isTempLayers -{Boolean} 是否是临时图层。<br>
 *         resourceID -{String} 资源ID。<br>
 *        layerInfo -{String} 要更新的图层信息。
 */
SuperMap.SetLayersInfoParameters = SuperMap.Class({

    /**
     * APIProperty: isTempLayers
     * @member SuperMap.SetLayersInfoParameters.prototype.isTempLayers -{Boolean}
     * @description 是否是临时图层。
     */
    isTempLayers: null,
    /**
     * APIProperty: resourceID
     * @member SuperMap.SetLayersInfoParameters.prototype.resourceID -{String}
     * @description 资源ID，
     */
    resourceID: null,

    /**
     * APIProperty: layerInfo
     * @member SuperMap.SetLayersInfoParameters.prototype.layerInfo -{String}
     * @description 要更新的图层信息。
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
        me.isTempLayers = null;
        me.resourceID = null;
        me.layerInfo = null;
    },

    CLASS_NAME: "SuperMap.SetLayersInfoParameters"
});

module.exports = SuperMap.SetLayersInfoParameters;
