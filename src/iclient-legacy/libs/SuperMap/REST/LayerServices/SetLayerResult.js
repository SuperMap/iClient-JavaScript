/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.SetLayerResult
 * 子图层控制结果类.该类用于存储子图层显示控制（SetLayerStatusService）和子图层风格设置（SetLayerStyleService）服务结果。
 * 子图层控制服务完成后，服务端将自动生成一个资源地址，该地址中存有各子图层的可视状态，客户端只需将该资源地址赋予 TiledDynamicIServerLayer 或 DynamicIServerLayer 图层的 layersID 属性，即可在客户端显示当前的可见子图层。
 */
SuperMap.REST.SetLayerResult = SuperMap.Class({

    /**
     * APIProperty: succeed
     * {Boolean} 获取服务通迅是否成功。
     */
    succeed: null,

    /**
     * APIProperty: newResourceID
     * {String} 获取服务端生成资源地址，该地址中存有各子图层的可视状态。客户端只需将该资源地址赋予 TiledDynamicIServerLayer 或 DynamicIServerLayer 图层的 layersID 属性，即可在客户端显示当前的可见子图层。
     */
    newResourceID: null,

    /**
     * Constructor: SuperMap.REST.SetLayerResult
     *
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * succeed - {Boolean} 获取服务通迅是否成功。
     * newResourceID - {String} 获取服务端生成资源地址，该地址中存有各子图层的可视状态。
     */
    initialize: function(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() {
        var me = this;
        me.succeed = null;
        me.newResourceID = null;
    },

    CLASS_NAME: "SuperMap.REST.SetLayerResult"
})

/**
 * Function: SuperMap.REST.SetLayerResult.fromJson
 * 将 JSON 对象表示的查询结果转化为 SetLayersInfoResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的设置图层信息服务结果。
 *
 * Returns:
 * {<SuperMap.REST.SetLayerResult>} 转化后的 SetLayerResult 对象。
 */
SuperMap.REST.SetLayerResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.REST.SetLayerResult({
        succeed: jsonObject.succeed,
        newResourceID: jsonObject.newResourceID
    });
};