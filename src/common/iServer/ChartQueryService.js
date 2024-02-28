/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {DataFormat} from '../REST';
import {CommonServiceBase} from './CommonServiceBase';
import {QueryParameters} from './QueryParameters';
import {ChartQueryParameters} from './ChartQueryParameters';
import {GeoJSON} from '../format/GeoJSON';
import fieldNames from './types'

/**
 * @class ChartQueryService
 * @deprecatedclass SuperMap.ChartQueryService
 * @category  iServer Map Chart
 * @classdesc 海图查询服务类。该类负责将海图查询所需参数（ChartQueryParameters）传递至服务端，并获取服务端的返回结果。
 *      用户可以通过两种方式获取查询结果：
 *      1.通过 AsyncResponder 类获取（推荐使用）；
 *      2.通过监听 QueryEvent.PROCESS_COMPLETE 事件获取。
 * @extends {CommonServiceBase}
 * @param {string} url - 地图查询服务访问地址。如："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图"。
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为"ISERVER","GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {function} [options.fieldNameFormatter] - 对查询返回结果的字段名进行自定义。
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
 * var chartQueryParameters = new ChartQueryParameters({
 *        queryMode:"ChartAttributeQuery",
 *        chartLayerNames:nameArray,
 *        returnContent:true,
 *        chartQueryFilterParameters:[chartQueryFilterParameter]
 *    });
 *
 * var chartQueryService = new ChartQueryService(url);
 *
 * chartQueryService.events.on({
 *        "processCompleted":processCompleted,
 *        "processFailed":processFailed
 *    });
 * chartQueryService.processAsync(chartQueryParameters);
 * @usage
 */
export class ChartQueryService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        options = options || {};

        /**
         * @member {boolean} ChartQueryService.prototype.returnContent
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。
         * 如果为 true，则直接返回新创建资源，即查询结果的表述。
         * 如果为 false，则返回的是查询结果资源的 URI。
         */
        this.returnContent = null;

        /**
         * @member {DataFormat} ChartQueryService.prototype.format
         * @description 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式，
         *              参数格式为 "ISERVER","GEOJSON"
         */
        this.format = DataFormat.GEOJSON;

        Util.extend(this, options);
        var me = this;
        if (options.format) {
            me.format = options.format.toUpperCase();
        }

        if (!me.url) {
            return;
        }
        me.url = Util.urlPathAppend(me.url, 'queryResults');

        this.CLASS_NAME = "SuperMap.ChartQueryService";
    }


    /**
     * @function ChartQueryService.prototype.destroy
     * @override
     */
    destroy() {
        var me = this;
        CommonServiceBase.prototype.destroy.apply(this, arguments);
        me.returnContent = null;
        me.format = null;
    }


    /**
     * @function ChartQueryService.prototype.processAsync
     * @description 使用服务地址 URL 实例化 ChartQueryService 对象。
     * @param {ChartQueryParameters} params - 查询参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(params, callback) {
        //todo重点需要添加代码的地方
        if (!(params instanceof ChartQueryParameters)) {
            return;
        }
        var me = this, jsonParameters;
        me.returnContent = params.returnContent;
        jsonParameters = params.getVariablesJson();
        if (me.returnContent) {
            me.url = Util.urlAppend(me.url, 'returnContent=true');
        }
        return me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: callback,
            failure: callback
        });
    }


    // 将features的字段名用内置中文或传递的fieldNamesKeys参数值替换
    _tranformFeatureField(features, fieldNameFormatter) {
      features.forEach(feature => {
        feature.fieldNames.forEach((fieldName, i) => {
          feature.fieldNames[i] = typeof fieldNameFormatter === 'function' && fieldNameFormatter(fieldName) || fieldNames[fieldName] || fieldName;
        });
      });
    }

    _transformFeatures(featuresParent, fieldNameFormatter, format) {
      this._tranformFeatureField(featuresParent.features, fieldNameFormatter);
      if(format === DataFormat.GEOJSON) {
        featuresParent.features = new GeoJSON().toGeoJSON(featuresParent.features);
      }
    }

    /**
     * @function ChartQueryService.prototype.transformResult
     * @description 状态完成时转换结果。
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数。
     * @return {Object} 转换结果。
     */
    transformResult(result, options) {
        var me = this;
        result = Util.transformResult(result);
        var fieldNameFormatter = me.fieldNameFormatter;
        if (result && result.recordsets) {
            for (var i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                // 属性查询和范围查询的返回结果
                if (recordsets[i].features) {
                    this._transformFeatures(recordsets[i], fieldNameFormatter, me.format)
                }
                // 点选查询的返回结果
                if(recordsets[i].chartFeatureRecordsets) {
                    recordsets[i].chartFeatureRecordsets.forEach(chartFeatureRecordset => {
                      this._transformFeatures(chartFeatureRecordset, fieldNameFormatter, me.format)
                    });
                }
            }
        }

        return { result, options };
    }

    /**
     * @function ChartQueryService.prototype.getQueryParameters
     * @description 将 JSON 对象表示的查询参数转化为 QueryParameters 对象。
     * @param {Object} params - JSON 字符串表示的查询参数。
     * @returns {QueryParameters} 返回查询结果
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
