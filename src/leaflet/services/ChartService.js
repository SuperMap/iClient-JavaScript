/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {DataFormat, ChartQueryService, ChartFeatureInfoSpecsService} from '@supermap/iclient-common';
import {ServiceBase} from './ServiceBase';
import {CommontypesConversion} from '../core/CommontypesConversion';

/**
 * @class L.supermap.chartService
 * @classdesc 海图服务。
 * @category  iServer Map Chart
 * @extends {L.supermap.ServiceBase}
 * @example
 *      L.supermap.chartService(url)
 *      .queryChart(param,function(result){
 *          //doSomething
 *      })
 * @param {string} url - 与客户端交互的海图服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export var ChartService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.chartService.prototype.queryChart
     * @description 查询海图。
     * @param {SuperMap.ChartQueryParameters} params - 海图查询所需参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果格式类型。
     */
    queryChart: function (params, callback, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var chartQueryService = new ChartQueryService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin:me.options.crossOrigin,
            headers:me.options.headers,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });

        chartQueryService.processAsync(param);
    },

    /**
     * @function L.supermap.chartService.prototype.getChartFeatureInfo
     * @description 获取海图物标信息。
     * @param {RequestCallback} callback 回调函数。
     */
    getChartFeatureInfo: function (callback) {
        var me = this, url = me.url.concat();
        url += "/chartFeatureInfoSpecs";
        var chartFeatureInfoSpecsService = new ChartFeatureInfoSpecsService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin:me.options.crossOrigin,
            headers:me.options.headers,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        chartFeatureInfoSpecsService.processAsync();
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
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
});

export var chartService = function (url, options) {
    return new ChartService(url, options);
};

L.supermap.chartService = chartService;