/*
 * Class:ChartService
 * 海图服务
 * 用法：
 *      L.supermap.chartService(url)
 *      .queryChart(param,function(result){
 *          //doSomething
 *      })
 */
var L = require("leaflet");
var SuperMap = require('../../common/SuperMap');
var ServiceBase = require('./ServiceBase');
var ChartQueryService = require('../../common/iServer/ChartQueryService');
var ChartFeatureInfoSpecsService = require('../../common/iServer/ChartFeatureInfoSpecsService');
/**
 * @class L.supermap.ChartService
 * @description 海图服务。
 * @augments L.supermap.ServiceBase
 * @example
 * 用法：
 *      L.supermap.chartService(url)
 *      .queryChart(param,function(result){
 *          //doSomething
 *      })
 * @param url - {String} 与客户端交互的海图服务地址。
 * @param options -{Object} 交互时所需可选参数。
 */
var ChartService = ServiceBase.extend({

    /**
     * @function L.supermap.ChartService.initialize
     * @description L.supermap.chartService的构造函数
     * @param url - {String} 与客户端交互的海图服务地址。
     * @param options -{Object} 交互时所需可选参数。
     */
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.ChartService.queryChart
     * @description leaflet客服端的查询海图服务。
     * @param params -{SuperMap.ChartQueryParameters} 海图查询所需参数类。
     * @param callback -{function} 回调函数。
     * @param resultFormat -{SuperMap.DataFormat} 返回的结果格式类型。
     */
    queryChart: function (params, callback, resultFormat) {
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
    },

    /**
     * @function L.supermap.ChartService.getChartFeatureInfo
     * @description 获取海图物标信息服务。
     * @param callback -{function} 回调函数
     */
    getChartFeatureInfo: function (callback) {
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
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        if (params.chartQueryFilterParameters && !L.Util.isArray(params.chartQueryFilterParameters)) {
            params.chartQueryFilterParameters = [params.chartQueryFilterParameters];
        }

        if (params.bounds) {
            params.bounds = L.supermap.CommontypesConversion.toSuperMapBounds(params.bounds);
        }
    },
    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }
});

L.supermap.chartService = function (url, options) {
    return new ChartService(url, options);
};

module.exports = ChartService;
