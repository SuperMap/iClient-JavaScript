import L from "leaflet";
import SuperMap from '../../common/SuperMap';
import {ServiceBase} from './ServiceBase';
import ChartQueryService from '../../common/iServer/ChartQueryService';
import ChartFeatureInfoSpecsService from '../../common/iServer/ChartFeatureInfoSpecsService';
import CommontypesConversion from '../core/CommontypesConversion';
/**
 * @class L.supermap.ChartService
 * @classdesc 海图服务。
 * @extends L.supermap.ServiceBase
 * @example
 * 用法：
 *      L.supermap.chartService(url)
 *      .queryChart(param,function(result){
 *          //doSomething
 *      })
 * @param url - {String} 与客户端交互的海图服务地址。
 * @param options -{Object} 交互时所需可选参数。如：<br>
 *        serverType - {String} 服务来源 iServer|iPortal|online
 */
var ChartService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.ChartService.prototype.queryChart
     * @description 查询海图服务。
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
     * @function L.supermap.ChartService.prototype.getChartFeatureInfo
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
            params.bounds = CommontypesConversion.toSuperMapBounds(params.bounds);
        }
    },
    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }
});

export var chartService = function (url, options) {
    return new ChartService(url, options);
};

L.supermap.chartService = chartService;
