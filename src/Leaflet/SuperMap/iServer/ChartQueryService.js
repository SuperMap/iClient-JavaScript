/**
 * Class:ChartQueryService
 * 海图查询服务
 * 用法：
 *      L.superMap.chartQueryService(url).queryChart()
 *      .on("complete",function(result){
 *          //doSomething
 *      }).on("failed",function(result){
 *          //doSomething
 *      });
 */
require('../../../Core/base');
require('../../../Core/iServer/ChartQueryService');
require('./ServiceBase');

ChartQueryService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @param params:
     *      bounds,chartLayerNames,returnContent,startRecord,
     *      queryMode("ChartAttributeQuery","ChartBoundsQuery"),
     *      filter(isQueryPoint,isQueryLine,isQueryRegion,attributeFilter,chartFeatureInfoSpecCode)
     */
    queryChart: function (params) {
        var me = this, param = me._processParams(params);
        var chartQueryParameters = new SuperMap.REST.ChartQueryParameters(param);
        var chartQueryService = new SuperMap.REST.ChartQueryService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });

        chartQueryService.processAsync(chartQueryParameters);
        return me;
    },
    _processParams: function (params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        //对外接口调用使用filter,内部参数使用chartQueryFilterParameters，跟iClient保持一致
        if (params.filter) {
            params.chartQueryFilterParameters = L.Util.isArray(params.filter) ? params.filter : [params.filter];
        }

        if (params.bounds && params.bounds instanceof L.LatLngBounds) {
            params.bounds = new SuperMap.Bounds(
                params.bounds.getSouthWest().lng,
                params.bounds.getSouthWest().lat,
                params.bounds.getNorthEast().lng,
                params.bounds.getNorthEast().lat
            );
        }
    }
});

L.supermap.chartQueryService = function (url, options) {
    return new ChartQueryService(url, options);
};

module.exports = L.supermap.chartQueryService;
