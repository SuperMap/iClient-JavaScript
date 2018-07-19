import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {DataFormat} from '../REST';
import {CommonServiceBase} from './CommonServiceBase';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class SuperMap.GetFeaturesServiceBase
 * @category  iServer Data FeatureResults
 * @classdesc 数据服务中数据集查询服务基类。获取结果数据类型为 Object。包含 result 属性，result 的数据格式根据 format 参数决定为 GeoJSON 或者 iServerJSON。
 * @extends SuperMap.CommonServiceBase
 * @param {string} url - 数据查询结果资源地址。请求数据服务中数据集查询服务，
 * URL应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/
 * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
 * @param {Object} options - 参数。 
 * @param {Object} options.eventListeners - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。 
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，iServer|iPortal|Online。 
 * @param {SuperMap.DataFormat} [options.format=SuperMap.DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @example
 * var myService = new SuperMap.GetFeaturesServiceBase(url, {
 *     eventListeners: {
 *         "processCompleted": getFeatureCompleted,
 *         "processFailed": getFeatureError
 *     }
 * });
 */
export class GetFeaturesServiceBase extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        options = options || {};

        /**
         * @member {boolean} [SuperMap.GetFeaturesServiceBase.prototype.returnContent=true]
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。
         * 如果为 true，则直接返回新创建资源，即查询结果的表述。
         * 如果为 false，则返回的是查询结果资源的 URI。
         */
        this.returnContent = true;

        /**
         * @member {number} [SuperMap.GetFeaturesServiceBase.prototype.fromIndex=0]
         * @description 查询结果的最小索引号。如果该值大于查询结果的最大索引号，则查询结果为空。
         */
        this.fromIndex = 0;

        /**
         * @member {number} [SuperMap.GetFeaturesServiceBase.prototype.toIndex=19]
         * @description 查询结果的最大索引号。
         * 如果该值大于查询结果的最大索引号，则以查询结果的最大索引号为终止索引号。
         */
        this.toIndex = 19;

        /**
         * @member {number} [SuperMap.GetFeaturesServiceBase.prototype.maxFeatures=1000]
         * @description 进行 SQL 查询时，用于设置服务端返回查询结果条目数量。
         */
        this.maxFeatures = null;

        /**
         * @member {string} [SuperMap.GetFeaturesServiceBase.prototype.format=SuperMap.DataFormat.GEOJSON]
         * @description 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。
         * 参数格式为 "ISERVER"，"GEOJSON"。
         */
        this.format = DataFormat.GEOJSON;

        if (options) {
            Util.extend(this, options);
        }
        var me = this, end;
        if (options && options.format) {
            me.format = options.format.toUpperCase();
        }

        end = me.url.substr(me.url.length - 1, 1);
        // TODO 待iServer featureResul资源GeoJSON表述bug修复当使用以下注释掉的逻辑
        // if (me.format==="geojson" ) {
        //     me.url += (end == "/") ? "featureResults.geojson?" : "/featureResults.geojson?";
        // } else {
        //     me.url += (end == "/") ? "featureResults.json?" : "/featureResults.json?";
        // }
        me.url += (end == "/") ? "featureResults.json?" : "/featureResults.json?";

        this.CLASS_NAME = "SuperMap.GetFeaturesServiceBase";
    }

    /**
     * @function SuperMap.GetFeaturesServiceBase.prototype.destroy
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
    }

    /**
     * @function SuperMap.GetFeaturesServiceBase.prototype.processAsync
     * @description 将客户端的查询参数传递到服务端。
     * @param {Object} params - 查询参数。
     */
    processAsync(params) {
        if (!params) {
            return;
        }
        var me = this,
            jsonParameters = null,
            firstPara = true;

        me.returnContent = params.returnContent;
        me.fromIndex = params.fromIndex;
        me.toIndex = params.toIndex;
        me.maxFeatures = params.maxFeatures;
        if (me.returnContent) {
            me.url += "returnContent=" + me.returnContent;
            firstPara = false;
        }
        var isValidNumber = me.fromIndex != null && me.toIndex != null && !isNaN(me.fromIndex) && !isNaN(me.toIndex);
        if (isValidNumber && me.fromIndex >= 0 && me.toIndex >= 0 && !firstPara) {
            me.url += "&fromIndex=" + me.fromIndex + "&toIndex=" + me.toIndex;
        }

        if (params.returnCountOnly) {
            me.url += "&returnCountOnly=" + params.returnContent;
        }
        jsonParameters = me.getJsonParameters(params);
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function SuperMap.GetFeaturesServiceBase.prototype.getFeatureComplete
     * @description 查询完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        var me = this;
        result = Util.transformResult(result);
        if (me.format === DataFormat.GEOJSON && result.features) {
            var geoJSONFormat = new GeoJSON();
            result.features = JSON.parse(geoJSONFormat.write(result.features));
        }
        me.events.triggerEvent("processCompleted", {result: result});
    }


}

SuperMap.GetFeaturesServiceBase = GetFeaturesServiceBase;