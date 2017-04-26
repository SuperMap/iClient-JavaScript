/**
 * Class:ChartService
 * 海图服务
 * 用法：
 *      new ol.superMap.ChartService(url)
 *      .queryChart(param,function(result){
 *          //doSomething
 *      })
 */
require('./ServiceBase');
require('../../common/iServer/ChartQueryService');
require('../../common/iServer/ChartFeatureInfoSpecsService');

ol.supermap.ChartService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.ChartService, ol.supermap.ServiceBase);

/**
 * @param params
 * <SuperMap.ChartQueryParameters>
 * @param callback
 * @param resultFormat
 * <SuperMap.DataFormat>
 */
ol.supermap.ChartService.prototype.queryChart = function (params, callback, resultFormat) {
    var me = this,
        param = me._processParams(params),
        format = me._processFormat(resultFormat);
    var chartQueryService = new SuperMap.REST.ChartQueryService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: format
    });

    chartQueryService.processAsync(param);
    return me;
};

/**
 * 海图物标信息服务
 */
ol.supermap.ChartService.prototype.getChartFeatureInfo = function (callback) {
    var me = this, url = me.options.url.concat();
    url += "/chartFeatureInfoSpecs";
    var chartFeatureInfoSpecsService = new SuperMap.REST.ChartFeatureInfoSpecsService(url, {
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        }
    });
    chartFeatureInfoSpecsService.processAsync();
    return me;
};

ol.supermap.ChartService.prototype._processParams = function (params) {
    if (!params) {
        return {};
    }
    params.returnContent = (params.returnContent == null) ? true : params.returnContent;
    if (params.filter) {
        params.chartQueryFilterParameters = ol.supermap.Util.isArray(params.filter) ? params.filter : [params.filter];
    }
    if (params.bounds) {
        params.bounds = new SuperMap.Bounds(
            params.bounds[0],
            params.bounds[1],
            params.bounds[2],
            params.bounds[3]
        );
    }
};

ol.supermap.ChartService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
}

module.exports = ol.supermap.ChartService;
