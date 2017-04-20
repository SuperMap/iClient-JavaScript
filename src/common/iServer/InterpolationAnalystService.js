/**
 * Class: SuperMap.REST.InterpolationAnalystService
 * 插值分析服务类
 * 插值分析可以将有限的采样点数据， 通过插值算法对采样点周围的数值情况进行预测，
 * 可以掌握研究区域内数据的总体分布状况，从而使采样的离散点不仅仅反映其所在位置的数值情况，
 * 还可以反映区域的数值分布。目前SuperMap iServer的插值功能提供从点数据集插值得到栅格数据集的功能，
 * 支持以下常用的内插方法，
 * 包括：反距离加权插值、克吕金（Kriging）插值法、样条（径向基函数，Radial Basis Function）插值、点密度插值。
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystBase>
 */
require('./SpatialAnalystBase');
require('./InterpolationRBFAnalystParameters');
require('./InterpolationDensityAnalystParameters');
require('./InterpolationIDWAnalystParameters');
require('./InterpolationKrigingAnalystParameters');
require('./InterpolationAnalystParameters');
SuperMap.REST.InterpolationAnalystService = SuperMap.Class(SuperMap.REST.SpatialAnalystBase, {

    /**
     * Property: mode
     * {String} 插值分析类型。
     */
    mode: null,

    /**
     * Constructor: SuperMap.REST.InterpolationAnalystService
     * 插值分析服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myTInterpolationAnalystService = new SuperMap.REST.InterpolationAnalystService(url);
     * myTInterpolationAnalystService.events.on({
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
        var me = this;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.REST.SpatialAnalystBase.prototype.destroy.apply(this, arguments);
        this.mode = null;
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.InterpolationAnalystParameters>}
     * {<SuperMap.InterpolationAnalystParameters>}
     */
    processAsync: function (parameter) {
        var parameterObject = new Object();
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {

        } else {
            me.url += "/";
        }

        if (parameter instanceof SuperMap.InterpolationDensityAnalystParameters) {
            me.mode = "Density";
            if (parameter.InterpolationAnalystType === "geometry") {
                me.url += 'geometry/interpolation/density';
            } else {
                me.url += 'datasets/' + parameter.dataset + '/interpolation/density';
            }
        }
        else if (parameter instanceof SuperMap.InterpolationIDWAnalystParameters) {
            me.mode = "IDW";
            if (parameter.InterpolationAnalystType === "geometry") {
                me.url += 'geometry/interpolation/idw';
            } else {
                me.url += 'datasets/' + parameter.dataset + '/interpolation/idw';
            }
        }
        else if (parameter instanceof SuperMap.InterpolationRBFAnalystParameters) {
            me.mode = "RBF";
            if (parameter.InterpolationAnalystType === "geometry") {
                me.url += 'geometry/interpolation/rbf';
            } else {
                me.url += 'datasets/' + parameter.dataset + '/interpolation/rbf';
            }
        }
        else if (parameter instanceof SuperMap.InterpolationKrigingAnalystParameters) {
            me.mode = "Kriging";
            if (parameter.InterpolationAnalystType === "geometry") {
                me.url += 'geometry/interpolation/kriging';
            } else {
                me.url += 'datasets/' + parameter.dataset + '/interpolation/kriging';
            }
        }
        SuperMap.InterpolationAnalystParameters.toObject(parameter, parameterObject);
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

    CLASS_NAME: "SuperMap.REST.InterpolationAnalystService"

});
module.exports = function (url, options) {
    return new SuperMap.REST.InterpolationAnalystService(url, options);
};