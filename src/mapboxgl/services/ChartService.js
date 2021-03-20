/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import { ServiceBase } from './ServiceBase';
import { Util } from '../core/Util';
import {
    Bounds,
    DataFormat,
    ChartQueryService,
    ChartFeatureInfoSpecsService,
    CommonUtil
} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.ChartService
 * @category  iServer Map Chart
 * @classdesc 海图服务。
 * @extends {mapboxgl.supermap.ServiceBase}
 * @example
 * new mapboxgl.supermap.ChartService(url)
 *  .queryChart(param,function(result){
 *     //doSomething
 * })
 * @param {string} url - 与客户端交互的海图服务地址。
 * @param {Object} options - 交互时所需可选参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class ChartService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.ChartService.prototype.queryChart
     * @description 查询海图服务。
     * @param {SuperMap.ChartQueryParameters} params - 海图查询所需参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果格式类型。
     */
    queryChart(params, callback, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var chartQueryService = new ChartQueryService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });

        chartQueryService.processAsync(param);
    }

    /**
     * @function mapboxgl.supermap.ChartService.prototype.getChartFeatureInfo
     * @description 获取海图物标信息服务。
     * @param {RequestCallback} callback 回调函数。
     */
    getChartFeatureInfo(callback) {
        var me = this,
            url = me.url.concat();
        url = CommonUtil.urlPathAppend(url, 'chartFeatureInfoSpecs');
        var chartFeatureInfoSpecsService = new ChartFeatureInfoSpecsService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        chartFeatureInfoSpecsService.processAsync();
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        params.returnContent = params.returnContent == null ? true : params.returnContent;
        if (params.filter) {
            params.chartQueryFilterParameters = Util.isArray(params.filter) ? params.filter : [params.filter];
        }

        if (params.bounds) {
            if (params.bounds instanceof Array) {
                params.bounds = new Bounds(params.bounds[0], params.bounds[1], params.bounds[2], params.bounds[3]);
            }
            if (params.bounds instanceof mapboxgl.LngLatBounds) {
                params.bounds = new Bounds(
                    params.bounds.getSouthWest().lng,
                    params.bounds.getSouthWest().lat,
                    params.bounds.getNorthEast().lng,
                    params.bounds.getNorthEast().lat
                );
            }
        }
    }

    _processFormat(resultFormat) {
        return resultFormat ? resultFormat : DataFormat.GEOJSON;
    }
}

mapboxgl.supermap.ChartService = ChartService;
