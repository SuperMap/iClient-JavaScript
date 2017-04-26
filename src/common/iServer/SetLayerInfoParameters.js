/**
 * Class: SuperMap.SetLayerInfoParameters
 * 设置图层信息参数类
 */
SuperMap.SetLayerInfoParameters = SuperMap.Class({
    /**
     * APIProperty: tempLayerID
     * {String}临时图层的资源ID
     */
    tempLayerID: null,
    /**
     * APIProperty: layerName
     * {String}图层资源名
     */
    layerName: null,
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
        me.tempLayerID = null;
        me.layerName = null;
        me.resourceID = null;
        me.layerInfo = null;
    },

    CLASS_NAME: "SuperMap.SetLayerInfoParameters"
});

module.exports = function (options) {
    return new SuperMap.SetLayerInfoParameters(options);
};
