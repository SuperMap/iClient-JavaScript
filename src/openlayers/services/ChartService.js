/*
 * Class:ChartService
 * 海图服务
 * 用法：
 *      new ol.superMap.ChartService(url)
 *      .queryChart(param,function(result){
 *          //doSomething
 *      })
 */
require('./ServiceBase');
var ol = require('openlayers/dist/ol-debug');
var SuperMap = require('../../common/SuperMap');
var ChartQueryService = require('../../common/iServer/ChartQueryService');
var ChartFeatureInfoSpecsService = require('../../common/iServer/ChartFeatureInfoSpecsService');
/**
 * @class ol.supermap.ChartService
 * @description openlayer的海图服务。
 * @augments ol.supermap.ServiceBase
 * @example
 * 用法：
 *      new ol.superMap.ChartService(url)
 *      .queryChart(param,function(result){
 *          //doSomething
 *      })
 * @param url - {String} 与客户端交互的海图服务地址。
 * @param options -{Object} 交互时所需可选参数。
 */
ol.supermap.ChartService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.ChartService, ol.supermap.ServiceBase);

/**
 * @function ol.supermap.ChartService.queryChart
 * @description 查询海图服务。
 * @param params -{SuperMap.ChartQueryParameters} 海图查询所需参数类。
 * @param callback -{function} 回调函数。
 * @param resultFormat -{SuperMap.DataFormat} 返回的结果格式类型。
 */
ol.supermap.ChartService.prototype.queryChart = function (params, callback, resultFormat) {
    var me = this,
        param = me._processParams(params),
        format = me._processFormat(resultFormat);
    var chartQueryService = new ChartQueryService(me.url, {
        serverType: me.options.serverType,
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
 * @function ol.supermap.ChartService.prototype.CDgetChartFeatureInfo
 * @description 获取海图物标信息服务。
 * @param callback -{function} 回调函数
 */
ol.supermap.ChartService.prototype.getChartFeatureInfo = function (callback) {
    var me = this, url = me.url.concat();
    url += "/chartFeatureInfoSpecs";
    var chartFeatureInfoSpecsService = new ChartFeatureInfoSpecsService(url, {
        serverType: me.options.serverType,
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
};

module.exports = ol.supermap.ChartService;
