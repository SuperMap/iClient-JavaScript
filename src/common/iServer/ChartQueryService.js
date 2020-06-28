/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {DataFormat} from '../REST';
import {CommonServiceBase} from './CommonServiceBase';
import {QueryParameters} from './QueryParameters';
import {ChartQueryParameters} from './ChartQueryParameters';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class SuperMap.ChartQueryService
 * @category  iServer Map Chart
 * @classdesc 海图查询服务类。该类负责将海图查询所需参数（ChartQueryParameters）传递至服务端，并获取服务端的返回结果。
 *      用户可以通过两种方式获取查询结果：
 *      1.通过 AsyncResponder 类获取（推荐使用）；
 *      2.通过监听 QueryEvent.PROCESS_COMPLETE 事件获取。
 * @extends {SuperMap.CommonServiceBase}
 * @param {string} url - 地图查询服务访问地址。如："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图"。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。
 * @param {SuperMap.DataFormat} [options.format] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为"ISERVER","GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * 下面示例显示了如何进行海图属性查询：
 * var nameArray = ["GB4X0000_52000"];
 * var chartQueryFilterParameter = new ChartQueryFilterParameter({
 *       isQueryPoint:true,
 *        isQueryLine:true,
 *        isQueryRegion:true,
 *        attributeFilter:"SmID<10",
 *        chartFeatureInfoSpecCode:1
 *    });
 *
 * var chartQueryParameters = new SuperMap.ChartQueryParameters({
 *        queryMode:"ChartAttributeQuery",
 *        chartLayerNames:nameArray,
 *        returnContent:true,
 *        chartQueryFilterParameters:[chartQueryFilterParameter]
 *    });
 *
 * var chartQueryService = new SuperMap.ChartQueryService(url);
 *
 * chartQueryService.events.on({
 *        "processCompleted":processCompleted,
 *        "processFailed":processFailed
 *    });
 * chartQueryService.processAsync(chartQueryParameters);
 */
export class ChartQueryService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        options = options || {};

        /**
         * @member {boolean} SuperMap.ChartQueryService.prototype.returnContent
         * @description 是否立即返回新创建资源的表述还是返回新资源的URI。
         */
        this.returnContent = null;

        /**
         * @member {SuperMap.DataFormat} SuperMap.ChartQueryService.prototype.format
         * @description 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式
         *              参数格式为"ISERVER","GEOJSON",GEOJSON
         */
        this.format = DataFormat.GEOJSON;

        Util.extend(this, options);
        var me = this, end;
        if (options.format) {
            me.format = options.format.toUpperCase();
        }

        if (!me.url) {
            return;
        }
        end = me.url.substr(me.url.length - 1, 1);

        // TODO 待iServer featureResul资源GeoJSON表述bug修复当使用以下注释掉的逻辑
        // if (me.format==="geojson") {
        //     me.url += (end == "/") ? "featureResults.geojson?" : "/featureResults.geojson?";
        // } else {
        //     me.url += (end == "/") ? "featureResults.json?" : "/featureResults.json?";
        // }
        me.url += (end === "/") ? "queryResults.json?" : "/queryResults.json?";

        this.CLASS_NAME = "SuperMap.ChartQueryService";
    }


    /**
     * @function SuperMap.ChartQueryService.prototype.destroy
     * @override
     */
    destroy() {
        var me = this;
        CommonServiceBase.prototype.destroy.apply(this, arguments);
        me.returnContent = null;
        me.format = null;
    }


    /**
     * @function SuperMap.ChartQueryService.prototype.processAsync
     * @description 使用服务地址 URL 实例化 ChartQueryService 对象。
     * @param {SuperMap.ChartQueryParameters} params - 查询参数。
     */
    processAsync(params) {
        //todo重点需要添加代码的地方
        if (!(params instanceof ChartQueryParameters)) {
            return;
        }
        var me = this, jsonParameters;
        me.returnContent = params.returnContent;
        jsonParameters = params.getVariablesJson();
        if (me.returnContent) {
            me.url += "returnContent=" + me.returnContent;
        }
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }


    /**
     * @function SuperMap.ChartQueryService.prototype.serviceProcessCompleted
     * @description 查询完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        var me = this;
        result = Util.transformResult(result);
        if (result && result.recordsets && me.format === DataFormat.GEOJSON) {
            for (var i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                if (recordsets[i].features) {
                    var geoJSONFormat = new GeoJSON();
                    recordsets[i].features = geoJSONFormat.toGeoJSON(recordsets[i].features);
                }
            }

        }
        me.events.triggerEvent("processCompleted", {result: result});
    }

    /**
     * @function SuperMap.ChartQueryService.prototype.getQueryParameters
     * @description 将 JSON 对象表示的查询参数转化为 QueryParameters 对象。
     * @param {Object} params - JSON 字符串表示的查询参数。
     * @returns {SuperMap.QueryParameters} 返回查询结果
     */
    getQueryParameters(params) {
        return new QueryParameters({
            queryMode: params.queryMode,
            bounds: params.bounds,
            chartLayerNames: params.chartLayerNames,
            chartQueryFilterParameters: params.chartQueryFilterParameters,
            returnContent: params.returnContent
        });
    }
}

SuperMap.ChartQueryService = ChartQueryService;