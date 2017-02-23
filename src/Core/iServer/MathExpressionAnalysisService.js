/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.MathExpressionAnalysisService
 *  栅格代数运算服务类。
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystBase>
 */
require('./SpatialAnalystBase');
require('./MathExpressionAnalysisParameters');
SuperMap.REST.MathExpressionAnalysisService = SuperMap.Class(SuperMap.REST.SpatialAnalystBase, {

    /**
     * Constructor: SuperMap.REST.MathExpressionAnalysisService
     * 核栅格代数运算服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myMathExpressionAnalysisService = new SuperMap.REST.MathExpressionAnalysisService(url);
     * myMathExpressionAnalysisService.on({
     *     "processCompleted": processCompleted,
     *     "processFailed": processFailed
     *     }
     * );
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.REST.SpatialAnalystBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.REST.SpatialAnalystBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<MathExpressionAnalysisParameters>}
     */
    processAsync: function (parameter) {
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {

        } else {
            me.url += "/";
        }

        var parameterObject = new Object();

        if (parameter instanceof MathExpressionAnalysisParameters) {
            me.url += 'datasets/' + parameter.dataset + '/mathanalyst';
        }

        MathExpressionAnalysisParameters.toObject(parameter, parameterObject);
        var jsonParameters = SuperMap.Util.toJSON(parameterObject);

        if (me.isInTheSameDomain) {
            me.url += '.json?returnContent=true';
        } else {
            me.url += '.jsonp?returnContent=true';
        }

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.REST.MathExpressionAnalysisService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.MathExpressionAnalysisService(url, options);
};