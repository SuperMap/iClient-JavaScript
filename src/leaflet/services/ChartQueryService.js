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
require('../../common/Base');
require('../../common/iServer/ChartQueryService');
require('./ServiceBase');

ChartQueryService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @param params
     * <ChartQueryParameters>
     * @param resultFormat
     */
    queryChart: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var chartQueryService = new SuperMap.REST.ChartQueryService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });

        chartQueryService.processAsync(param);
        return me;
    },
    _processParams: function (params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        if (params.chartQueryFilterParameters && !L.Util.isArray(params.chartQueryFilterParameters)) {
            params.chartQueryFilterParameters = [params.chartQueryFilterParameters];
        }

        if (params.bounds && params.bounds instanceof L.LatLngBounds) {
            params.bounds = new SuperMap.Bounds(
                params.bounds.getSouthWest().lng,
                params.bounds.getSouthWest().lat,
                params.bounds.getNorthEast().lng,
                params.bounds.getNorthEast().lat
            );
        }
    },
    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.Format.GEOJSON;
    }
});

L.supermap.chartQueryService = function (url, options) {
    return new ChartQueryService(url, options);
};

module.exports = L.supermap.chartQueryService;
