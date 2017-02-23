/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.TerrainCurvatureCalculationService
 *  地形曲率计算服务类。
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystBase>
 */
require('./SpatialAnalystBase');
require('./TerrainCurvatureCalculationParameters');
SuperMap.REST.TerrainCurvatureCalculationService = SuperMap.Class(SuperMap.REST.SpatialAnalystBase, {

    /**
     * Constructor: SuperMap.REST.TerrainCurvatureCalculationService
     * 地形曲率计算服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myTerrainCurvatureCalculationService = new SuperMap.REST.TerrainCurvatureCalculationService(url);
     * myTerrainCurvatureCalculationService.on({
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
     * params - {<TerrainCurvatureCalculationParameters>}
     */
    processAsync: function (parameter) {
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {

        } else {
            me.url += "/";
        }

        var parameterObject = new Object();

        if (parameter instanceof TerrainCurvatureCalculationParameters) {
            me.url += 'datasets/' + parameter.dataset + '/terraincalculation/curvature';
        }

        TerrainCurvatureCalculationParameters.toObject(parameter, parameterObject);
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

    CLASS_NAME: "SuperMap.REST.TerrainCurvatureCalculationService"
});
module.exports = function (url, options) {
    return new SuperMap.REST.TerrainCurvatureCalculationService(url, options);
};
