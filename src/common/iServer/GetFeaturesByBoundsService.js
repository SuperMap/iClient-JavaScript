/**
 * Class: SuperMap.GetFeaturesByBoundsService
 * 数据集范围查询服务类
 * 查询与指定范围对象符合一定空间关系的矢量要素。
 *
 * Inherits from:
 *  - <SuperMap.GetFeaturesServiceBase>
 */
require('./GetFeaturesServiceBase');
require('./GetFeaturesByBoundsParameters');
var SuperMap = require('../SuperMap');
SuperMap.GetFeaturesByBoundsService = SuperMap.Class(SuperMap.GetFeaturesServiceBase, {

    /**
     * Constructor: SuperMap.GetFeaturesByBoundsService
     * 数据集范围查询服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myGetFeaturesByBoundsService = new SuperMap.GetFeaturesByBoundsService(url, {
     *     eventListeners: {
     *           "processCompleted": getFeatureCompleted, 
     *           "processFailed": getFeatureError
     *           }
     * });
     * function getFeatureCompleted(object){//todo};
     * function getFeatureError(object){//todo}
     * (end)
     *
     * Parameters:
     * url - {String} 数据查询结果资源地址。请求数据服务中数据集查询服务，
     * URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；
     * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.GetFeaturesServiceBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.GetFeaturesServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: getJsonParameters
     * 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（ID, SQL, Buffer, Geometry,Bounds等）。
     *
     * Parameters:
     * params - {<SuperMap.GetFeaturesByBoundsParameters>}
     *
     * Returns:
     * {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters: function (params) {
        return SuperMap.GetFeaturesByBoundsParameters.toJsonParameters(params);
    },

    CLASS_NAME: "SuperMap.GetFeaturesByBoundsService"
});

module.exports = SuperMap.GetFeaturesByBoundsService;