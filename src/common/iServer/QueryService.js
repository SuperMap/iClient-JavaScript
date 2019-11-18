/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
    SuperMap
} from '../SuperMap';
import {
    Util
} from '../commontypes/Util';
import {
    CommonServiceBase
} from './CommonServiceBase';
import {
    QueryParameters
} from './QueryParameters';
import {
    GeoJSON
} from '../format/GeoJSON';
import {
    DataFormat
} from '../REST';

/**
 * @class SuperMap.QueryService
 * @category  iServer Map QueryResults
 * @classdesc 查询服务基类。
 * @extends {SuperMap.CommonServiceBase}
 * @param {string} url - 服务地址。请求地图查询服务的 URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，iServer|iPortal|Online。 
 * @param {SuperMap.DataFormat} [options.format=SuperMap.DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * var myService = new SuperMap.QueryService(url, {
 *     eventListeners: {
 *	       "processCompleted": queryCompleted,
 *		   "processFailed": queryError
 *		   }
 * };
 */
export class QueryService extends CommonServiceBase {

    /**
     * @function SuperMap.QueryService.prototype.constructor
     * @description 查询服务基类构造函数。
     * @param {string} url - 服务地址。请求地图查询服务的 URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
     * @param {Object} options -参数。
     * @param {Object} options.eventListeners - 需要被注册的监听器对象。
     */
    constructor(url, options) {
        super(url, options);

        /**
         * @member {boolean} SuperMap.QueryService.prototype.returnContent
         * @description 是否立即返回新创建资源的表述还是返回新资源的URI。
         */
        this.returnContent = false;

        /**
         * @member {string} SuperMap.QueryService.prototype.format
         * @description 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
         */
        this.format = DataFormat.GEOJSON;

        this.returnFeatureWithFieldCaption = false;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.QueryService";
        var me = this,
            end;
        if (!me.url) {
            return;
        }
        if (options && options.format) {
            me.format = options.format.toUpperCase();
        }

        end = me.url.substr(me.url.length - 1, 1);

        // TODO 待iServer featureResul资源GeoJSON表述bug修复当使用以下注释掉的逻辑
        // if (this.format==="geojson") {
        //     me.url += (end == "/") ? "featureResults.geojson?" : "/featureResults.geojson?";
        // } else {
        //     me.url += (end == "/") ? "featureResults.json?" : "/featureResults.json?";
        // }
        me.url += (end === "/") ? "queryResults.json?" : "/queryResults.json?";
    }

    /**
     * @function SuperMap.QueryService.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
        me.format = null;
    }

    /**
     * @function SuperMap.QueryService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {SuperMap.QueryParameters} params - 查询参数。
     */
    processAsync(params) {
        if (!(params instanceof QueryParameters)) {
            return;
        }
        var me = this,
            returnCustomResult = null,
            jsonParameters = null;
        me.returnContent = params.returnContent;

        jsonParameters = me.getJsonParameters(params);
        if (me.returnContent) {
            me.url += "returnContent=" + me.returnContent;
        } else {
            //仅供三维使用 获取高亮图片的bounds
            returnCustomResult = params.returnCustomResult;
            if (returnCustomResult) {
                me.url += "returnCustomResult=" + returnCustomResult;
            }
        }
        me.returnFeatureWithFieldCaption = params.returnFeatureWithFieldCaption;
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function SuperMap.QueryService.prototype.serviceProcessCompleted
     * @description 查询完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        var me = this;
        result = Util.transformResult(result);
        var geoJSONFormat = new GeoJSON();
        if (result && result.recordsets) {
            for (var i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                if (recordsets[i].features) {
                    if (me.returnFeatureWithFieldCaption === true) {
                        recordsets[i].features.map((feature) => {
                            feature.fieldNames = recordsets[i].fieldCaptions;
                            return feature;
                        })
                    }
                    if (me.format === DataFormat.GEOJSON) {
                        recordsets[i].features = geoJSONFormat.toGeoJSON(recordsets[i].features);
                    }
                }
            }
        }

        me.events.triggerEvent("processCompleted", {
            result: result
        });
    }

    /**
     * @function SuperMap.QueryService.prototype.getQueryParameters
     * @description 将 JSON 对象表示的查询参数转化为 QueryParameters 对象。
     * @param {Object} params - JSON 字符串表示的查询参数。
     * @returns {SuperMap.QueryParameters} 返回转化后的 QueryParameters 对象。
     */
    getQueryParameters(params) {
        return new QueryParameters({
            customParams: params.customParams,
            expectCount: params.expectCount,
            networkType: params.networkType,
            queryOption: params.queryOption,
            queryParams: params.queryParams,
            startRecord: params.startRecord,
            prjCoordSys: params.prjCoordSys,
            holdTime: params.holdTime
        });
    }

}

SuperMap.QueryService = QueryService;