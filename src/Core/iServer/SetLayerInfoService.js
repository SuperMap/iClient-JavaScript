/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.SetLayerInfoService
 * 设置图层信息服务类。可以实现临时图层中子图层的修改
 * 该类负责将图层设置参数传递到服务端，并获取服务端返回的结果信息。
 *
 * Inherits from:
 *  - <SuperMap.CoreServiceBase>
 */
require('./CoreServiceBase');
SuperMap.REST.SetLayerInfoService = SuperMap.Class(SuperMap.CoreServiceBase, {

    /**
     * APIProperty: resourceID
     * {String} 图层资源ID，临时图层的资源ID标记。
     */
    resourceID: null,


    /**
     * Constructor: SuperMap.REST.SetLayerInfoService
     * 设置图层信息服务类构造函数。可以实现临时图层中子图层的修改。
     *
     * Parameters:
     * url - {String} 与客户端交互的地图服务地址。请求地图服务,URL 应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"；
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.CoreServiceBase.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        this.resourceID = options.resourceID;
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.CoreServiceBase.prototype.destroy.apply(this, arguments);
        SuperMap.Util.reset(this);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的更新参数传递到服务端。
     * Parameters:
     * params - {Object} 修改后的图层资源信息。该参数可以使用获取图层信息服务 <SuperMap.REST.getLayerInfoService>.result.subLayers.layers[i]
     * 返回图层信息，然后对其属性进行修改来获取。
     */
    processAsync: function (params) {
        var me = this;

        if (!params) {
            return;
        }
        me.url += me.isInTheSameDomain ? ".json" : ".jsonp";
        var jsonParamsStr = SuperMap.Util.toJSON(params);
        me.request({
            method: "PUT",
            data: jsonParamsStr,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.REST.SetLayerInfoService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.SetLayerInfoService(url, options);
};
