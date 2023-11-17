/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
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
 * @class QueryService
 * @deprecatedclass SuperMap.QueryService
 * @category  iServer Map QueryResults
 * @classdesc 查询服务基类。提供方法：SQL 查询、距离查询、空间查询、最近地物查询、范围查询以及海图查询等。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。请求地图查询服务的 URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON、GeoJSON、FGB 三种格式。参数格式为 "ISERVER"，"GEOJSON"，"FGB"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * var myService = new QueryService(url);
 * @usage
 */
export class QueryServiceBase extends CommonServiceBase {
    constructor(url, options) {
        super(url, options);

        /**
         * @member {boolean} QueryService.prototype.returnContent
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。
         * 如果为 true，则直接返回新创建资源，即查询结果的表述。
         * 如果为 false，则返回的是查询结果资源的 URI。
         */
        this.returnContent = false;

        /**
         * @member {string} QueryService.prototype.format
         * @description 查询结果返回格式，目前支持 iServerJSON、GeoJSON、FGB 三种格式。参数格式为 "ISERVER","GEOJSON","FGB"。
         */
        this.format = DataFormat.GEOJSON;

        this.returnFeatureWithFieldCaption = false;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.QueryService";
        if (!this.url) {
            return;
        }
        if (options && options.format) {
            this.format = options.format.toUpperCase();
        }
        this.url = Util.urlPathAppend(this.url,'queryResults');
    }

    /**
     * @function QueryServiceBase.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
        me.format = null;
    }

    /**
     * @function QueryServiceBase.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {QueryParameters} params - 查询参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(params, callback) {
        if (!(params instanceof QueryParameters)) {
            return;
        }
        var me = this,
            returnCustomResult = null,
            jsonParameters = null;
        me.returnContent = params.returnContent;

        jsonParameters = me.getJsonParameters(params);
       
        if (!me.returnContent) {
            //仅供三维使用 获取高亮图片的bounds
            returnCustomResult = params.returnCustomResult;
            if (returnCustomResult) {
                me.url = Util.urlAppend(me.url, 'returnCustomResult=' + returnCustomResult);
            }
        }
        me.returnFeatureWithFieldCaption = params.returnFeatureWithFieldCaption;
        return me.request({
          method: "POST",
          data: jsonParameters,
          scope: me,
          success: callback,
          failure: callback
        });
    }

    /**
     * @function QueryServiceBase.prototype.transformResult
     * @description 状态完成时转换结果。
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数。
     * @return {Object} 转换结果。
     */
    transformResult(result, options) {
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

        return { result, options };
    }

    dataFormat() {
      return [DataFormat.GEOJSON, DataFormat.ISERVER, DataFormat.FGB];
    }

    /**
     * @function QueryServiceBase.prototype.getQueryParameters
     * @description 将 JSON 对象表示的查询参数转化为 QueryParameters 对象。
     * @param {Object} params - JSON 字符串表示的查询参数。
     * @returns {QueryParameters} 返回转化后的 QueryParameters 对象。
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
