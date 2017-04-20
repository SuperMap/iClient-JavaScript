/**
 * Class: SuperMap.REST.NetworkAnalystServiceBase
 * 网络分析服务基类。
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('../format/GeoJSON');
require('./ServiceBase');
SuperMap.REST.NetworkAnalystServiceBase = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     *  Property: format
     *  {String} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式
     *  参数格式为"ISERVER","GEOJSON",GEOJSON
     */
    format: SuperMap.Format.GEOJSON,

    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        if (options && options.format) {
            this.format = options.format.toUpperCase();
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        this.format = null;
    },

    /**
     * Method: getMapStatusCompleted
     * 分析完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted: function (result) {
        var me = this, analystResult;
        result = SuperMap.Util.transformResult(result);
        if (result && me.format === SuperMap.Format.GEOJSON && typeof me.toGeoJSONResult === 'function') {
            analystResult = me.toGeoJSONResult(result);
        }
        if (!analystResult) {
            analystResult = result;
        }
        me.events.triggerEvent("processCompleted", {result: analystResult, originalResult: result});
    },

    /**
     * Method: toGeoJSONResult
     * 将含有geometry的数据转换为geojson格式。只处理结果中的路由，由子类实现
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    toGeoJSONResult: function (result) {
        return null;
    },

    CLASS_NAME: "SuperMap.REST.NetworkAnalystServiceBase"
});

module.exports = function (url, options) {
    return new SuperMap.REST.NetworkAnalystServiceBase(url, options);
};
