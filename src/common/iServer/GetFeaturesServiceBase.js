/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {DataFormat} from '../REST';
import {CommonServiceBase} from './CommonServiceBase';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class GetFeaturesServiceBase
 * @deprecatedclass SuperMap.GetFeaturesServiceBase
 * @category  iServer Data FeatureResults
 * @classdesc 数据服务中数据集查询服务基类。获取结果数据类型为 Object。包含 result 属性，result 的数据格式根据 format 参数决定为 GeoJSON 或者 iServerJSON。
 * @extends CommonServiceBase
 * @param {string} url - 服务地址。请求数据服务中数据集查询服务，
 * URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/
 * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON、GeoJSON、FGB 三种格式。参数格式为 "ISERVER"，"GEOJSON"，"FGB"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * var myService = new GetFeaturesServiceBase(url);
 * @usage
 */
export class GetFeaturesServiceBase extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        options = options || {};

        /**
         * @member {boolean} [GetFeaturesServiceBase.prototype.returnContent=true]
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。
         * 如果为 true，则直接返回新创建资源，即查询结果的表述。
         * 如果为 false，则返回的是查询结果资源的 URI。
         */
        this.returnContent = true;

        /**
         * @member {boolean} [GetFeaturesServiceBase.prototype.returnFeaturesOnly=false]
         * @description 是否仅返回要素信息。
         */
        this.returnFeaturesOnly = false;

        /**
         * @member {number} [GetFeaturesServiceBase.prototype.fromIndex=0]
         * @description 查询结果的最小索引号。如果该值大于查询结果的最大索引号，则查询结果为空。
         */
        this.fromIndex = 0;

        /**
         * @member {number} [GetFeaturesServiceBase.prototype.toIndex=19]
         * @description 查询结果的最大索引号。
         * 如果该值大于查询结果的最大索引号，则以查询结果的最大索引号为终止索引号。
         */
        this.toIndex = 19;

         /**
         * @member {number} [GetFeaturesServiceBase.prototype.hasGeometry=true]
         * @description 返回结果是否包含 Geometry。
         */
        this.hasGeometry = true;

        /**
         * @member {number} [GetFeaturesServiceBase.prototype.maxFeatures=1000]
         * @description 进行 SQL 查询时，用于设置服务端返回查询结果条目数量。
         */
        this.maxFeatures = null;

        /**
         * @member {string} [GetFeaturesServiceBase.prototype.format=DataFormat.GEOJSON]
         * @description 查询结果返回格式，目前支持 iServerJSON、GeoJSON、FGB 三种格式。
         * 参数格式为 "ISERVER"，"GEOJSON"，"FGB"。
         */
        this.format = DataFormat.GEOJSON;

        Util.extend(this, options);
        this.url = Util.urlPathAppend(this.url, 'featureResults');
        this.CLASS_NAME = "SuperMap.GetFeaturesServiceBase";
    }

    /**
     * @function GetFeaturesServiceBase.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
        me.fromIndex = null;
        me.toIndex = null;
        me.maxFeatures = null;
        me.format = null;
        me.hasGeometry = null;
    }

    /**
     * @function GetFeaturesServiceBase.prototype.processAsync
     * @description 将客户端的查询参数传递到服务端。
     * @param {Object} params - 查询参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(params, callback) {
        if (!params) {
            return;
        }
        var me = this,
            jsonParameters = null,
            firstPara = true;

        me.returnContent = params.returnContent;
        me.returnFeaturesOnly = params.returnFeaturesOnly;
        me.fromIndex = params.fromIndex;
        me.toIndex = params.toIndex;
        me.maxFeatures = params.maxFeatures;
        me.hasGeometry = params.hasGeometry;
        if (me.returnContent) {
          firstPara = false;
        }
        var isValidNumber = me.fromIndex != null && me.toIndex != null && !isNaN(me.fromIndex) && !isNaN(me.toIndex);
        if (isValidNumber && me.fromIndex >= 0 && me.toIndex >= 0 && !firstPara) {
            me.url = Util.urlAppend(me.url, `fromIndex=${me.fromIndex}&toIndex=${me.toIndex}`);
        }

       if (me.returnContent) {
          if (!params.returnCountOnly && !params.returnDatasetInfoOnly && !params.returnFeaturesOnly) {
            console.warn('recommend set returnFeaturesOnly config to true to imporve performance. if need get Total amount and Dataset information. FeatureService provide getFeaturesCount and getFeaturesDatasetInfo method');
          }
          if (params.returnCountOnly) {
            me.url = Util.urlAppend(me.url, "&returnCountOnly=" + params.returnCountOnly)
         }

          if (params.returnDatasetInfoOnly) {
            me.url = Util.urlAppend(me.url, "&returnDatasetInfoOnly=" + params.returnDatasetInfoOnly)
          }
          
          if (params.returnFeaturesOnly) {
            me.url = Util.urlAppend(me.url, "&returnFeaturesOnly=" + params.returnFeaturesOnly)
          }
       }

        jsonParameters = me.getJsonParameters(params);
        return me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: callback,
            failure: callback
        });
    }

    /**
     * @function GetFeaturesServiceBase.prototype.transformResult
     * @description 状态完成时转换结果。
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数。
     * @return {Object} 转换结果。
     */
    transformResult(result, options) {
        var me = this;
        result = Util.transformResult(result);
        var geoJSONFormat = new GeoJSON();
        if (me.format === DataFormat.GEOJSON && result.features) { 
            result.features = geoJSONFormat.toGeoJSON(result.features);
        }
        if (me.returnFeaturesOnly && Array.isArray(result)) {
          let succeed = result.succeed;
          let features = geoJSONFormat.toGeoJSON(result);
          result = {
            succeed,
            features
          };
        }
       return { result, options };
    }

    dataFormat() {
      return [DataFormat.GEOJSON, DataFormat.ISERVER, DataFormat.FGB];
    }

}
