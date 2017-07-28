require('./GetFeaturesServiceBase');
require('./GetFeaturesBySQLParameters');
var SuperMap = require('../SuperMap');
SuperMap.GetFeaturesBySQLService = SuperMap.Class(SuperMap.GetFeaturesServiceBase, {
    /**
     * @class SuperMap.GetFeaturesBySQLService
     * @constructs SuperMap.GetFeaturesBySQLService
     * @classdesc
     * 数据服务中数据集 SQL 查询服务类。
     * 在一个或多个指定的图层上查询符合 SQL 条件的空间地物信息。
     * @extends {SuperMap.GetFeaturesServiceBase}
     * @api
     * @example 例如：
     * (start code)
     * var myGetFeaturesBySQLService = new SuperMap.GetFeaturesBySQLService(url, {
     *     eventListeners: {
     *         "processCompleted": GetFeaturesCompleted,
     *         "processFailed": GetFeaturesError
     *         }
     * });
     * function getFeaturesCompleted(object){//todo};
     * function getFeaturesError(object){//todo};
     * (end)
     *
     */

    /**
     * @method SuperMap.GetFeaturesBySQLService.initialize
     * @description  SQL 查询服务类构造函数。
     * @param url - {String} 数据查询结果资源地址。请求数据服务中数据集查询服务，
     * URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；
     * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
     *@param  options - {Object} 参数。
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

    /*
     * @method SuperMap.GetFeaturesBySQLService.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（ID, SQL, Buffer, Geometry等）。
     * @param params - {SuperMap.GetFeaturesBySQLParameters}
     * @return {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters: function (params) {
        return SuperMap.GetFeaturesBySQLParameters.toJsonParameters(params);
    },

    CLASS_NAME: "SuperMap.GetFeaturesBySQLService"
});

module.exports = SuperMap.GetFeaturesBySQLService;