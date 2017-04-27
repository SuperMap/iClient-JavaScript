/**
 * Class: SuperMap.SetLayersInfoParameters
 * 设置图层信息参数类
 */
var SuperMap = require('../SuperMap');
SuperMap.SetLayersInfoParameters = SuperMap.Class({

    /**
     * APIProperty: isTempLayers
     * {Boolean}是否是临时图层
     */
    isTempLayers: null,
    /**
     * APIProperty: resourceID
     * {String} 资源ID，
     */
    resourceID: null,

    /**
     * APIProperty: layerInfo
     * {String}要更新的图层信息
     */
    layerInfo: null,

    initialize: function (options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
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
