/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import L from 'leaflet';
 import '../core/Base';
 import { DataFormat } from '@supermap/iclient-common/REST';
 import { ServiceBase } from './ServiceBase';
 import { CommontypesConversion } from '../core/CommontypesConversion';
 import { ChartService as CommonChartService } from '@supermap/iclient-common/iServer/ChartService';
/**
 * @class ChartService
 * @deprecatedclassinstance L.supermap.chartService
 * @classdesc 海图服务。
 * @category  iServer Map Chart
 * @modulecategory Services
 * @extends {ServiceBase}
 * @example
 *      new ChartService(url)
 *      .queryChart(param,function(result){
 *          //doSomething
 *      })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var ChartService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        this._chartServiceBase = new CommonChartService(url, options);
    },

    /**
     * @function ChartService.prototype.queryChart
     * @description 查询海图服务。
     * @param {ChartQueryParameters} params - 海图查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    queryChart: function (params, callback, resultFormat) {
        params = this._processParams(params);
        return this._chartServiceBase.queryChart(params, callback, resultFormat);
    },

    /**
     * @function ChartService.prototype.getChartFeatureInfo
     * @description 获取海图物标信息。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    getChartFeatureInfo: function (callback) {
      return this._chartServiceBase.getChartFeatureInfo(callback);
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
