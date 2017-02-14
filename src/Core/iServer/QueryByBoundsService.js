/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。
 */


/**
 * Class: SuperMap.iServer.QueryByBoundsService
 * Bounds 查询服务类。
 *
 * Inherits from:
 *  - <SuperMap.iServer.QueryService>
 */
require('./QueryService');
SuperMap.iServer.QueryByBoundsService = SuperMap.Class(SuperMap.iServer.QueryService, {

    /**
     * Constructor: SuperMap.REST.QueryByBoundsService
     * Bounds 查询服务类构造函数。
     *
     * 例如：
     * (start end)
     * var myQueryByBoundsService = new SuperMap.iServer.QueryByBoundsService(url, {
     *     eventListeners: {
     *         "processCompleted": queryCompleted,
     *		   "processFailed": queryError
     *		   }
     * });
     * function queryCompleted(QueryEventArgs){//todo};
     * function queryError(QueryEventArgs){//todo};
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如访问World Map服务，只需将url设为：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.iServer.QueryService.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.iSErver.QueryService.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: getJsonParameters
     * 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（sql, geometry, distance, bounds 等）。
     *
     * Parameters:
     * params - {<SuperMap.REST.QueryByBoundsParameters>} Bounds 查询参数。
     *
     * Returns:
     * {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters: function (params) {
        var me = this,
            jsonParameters = "",
            qp = null,
            bounds = params.bounds;
        qp = me.getQueryParameters(params);
        jsonParameters += "'queryMode':'BoundsQuery','queryParameters':";
        jsonParameters += SuperMap.Util.toJSON(qp);
        jsonParameters += ",'bounds': {'rightTop':{'y':" + bounds.top + ",'x':" + bounds.right + "},'leftBottom':{'y':" + bounds.bottom + ",'x':" + bounds.left + "}}";
        jsonParameters = "{" + jsonParameters + "}";
        return jsonParameters;
    },

    CLASS_NAME: "SuperMap.iServer.QueryByBoundsService"
});

module.exports = function (url, options) {
    return new SuperMap.iServer.QueryByBoundsService(url, options);
};
