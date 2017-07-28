require('./GetFeaturesServiceBase');
require('./GetFeaturesByBufferParameters');
var SuperMap = require('../SuperMap');

SuperMap.GetFeaturesByBufferService = SuperMap.Class(SuperMap.GetFeaturesServiceBase, {
    /**
     * @class SuperMap.GetFeaturesByBufferService
     * @constructs SuperMap.GetFeaturesByBufferService
     * @classdesc
     * 数据服务中数据集缓冲区查询服务类。
     * @extends {SuperMap.GetFeaturesServiceBase}
     * @api
     * @example 例如：
     * (start code)
     * var myGetFeaturesByBufferService = new   SuperMap.GetFeaturesByBufferService(url, {
     *     eventListeners: {
     *           "processCompleted": GetFeaturesCompleted,
     *           "processFailed": GetFeaturesError
     *           }
     * });
     * function GetFeaturesCompleted(object){//todo};
     * function GetFeaturesError(object){//todo};
     * (end)
     *
     */
    /**
     *
     * @method SuperMap.GetFeaturesByBufferService.initialize
     * @param url - {String} 数据查询结果资源地址。请求数据服务中数据集查询服务，
     * URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；</br>
     * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
     * @param options - {Object} 参数。
     *
     * Allowed options properties:</br>
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.GetFeaturesServiceBase.prototype.initialize.apply(this, arguments);
    },

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.GetFeaturesServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @method SuperMap.GetFeaturesByBufferService.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（IDs, SQL, Buffer, Geometry等）。
     *
     * @param params  {SuperMap.GetFeaturesByBufferParameters}
     * @return {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters: function (params) {
        return SuperMap.GetFeaturesByBufferParameters.toJsonParameters(params);
    },

    CLASS_NAME: "SuperMap.GetFeaturesByBufferService"
});

module.exports = SuperMap.GetFeaturesByBufferService;