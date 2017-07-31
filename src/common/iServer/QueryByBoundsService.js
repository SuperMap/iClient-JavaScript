/*
 * Class: SuperMap.QueryByBoundsService
 * Bounds 查询服务类。
 *
 * Inherits from:
 *  - <SuperMap.QueryService>
 */
require('./QueryService');
require('./QueryByBoundsParameters');
var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.QueryByBoundsService
 * @description Bounds 查询服务类。
 * @augments SuperMap.QueryService
 * @example
 * (start end)
 * var myQueryByBoundsService = new SuperMap.QueryByBoundsService(url, {
 *     eventListeners: {
 *         "processCompleted": queryCompleted,
 *		   "processFailed": queryError
 *		   }
 * });
 * function queryCompleted(object){//todo};
 * function queryError(object){//todo};
 * (end)
 * @param url - {String} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
SuperMap.QueryByBoundsService = SuperMap.Class(SuperMap.QueryService, {

    /**
     * @function SuperMap.QueryByBoundsService.initialize
     * @description Bounds 查询服务类构造函数。
     * @param url - {String} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
     * @param options - {Object} 互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.QueryService.prototype.initialize.apply(this, arguments);
    },

    /**
     * @inheritDoc
     */
    destroy: function () {
        SuperMap.QueryService.prototype.destroy.apply(this, arguments);
    },

    /*
     * Method: getJsonParameters
     * 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（sql, geometry, distance, bounds 等）。
     *
     * Parameters:
     * params - {SuperMap.QueryByBoundsParameters} Bounds 查询参数。
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
        jsonParameters += ",'bounds': {'rightTop':{'y':" + bounds.top + ",'x':" +
            bounds.right + "},'leftBottom':{'y':" + bounds.bottom + ",'x':" + bounds.left + "}}";
        jsonParameters = "{" + jsonParameters + "}";
        return jsonParameters;
    },

    CLASS_NAME: "SuperMap.QueryByBoundsService"
});

module.exports = SuperMap.QueryByBoundsService;
