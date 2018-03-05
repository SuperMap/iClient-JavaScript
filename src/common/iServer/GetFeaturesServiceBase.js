import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {DataFormat} from '../REST';
import {CommonServiceBase} from './CommonServiceBase';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class SuperMap.GetFeaturesServiceBase
 * @category  iServer Data FeatureResults
 * @classdesc 数据服务中数据集查询服务基类。获取结果数据类型为Object。包含 result属性，result的数据格式根据format参数决定为GeoJSON或者iServerJSON。
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 数据查询结果资源地址。请求数据服务中数据集查询服务，URL
 * 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/
 * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
 * @param options - {Object} 可选参数。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
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
         * @member SuperMap.GetFeaturesServiceBase.prototype.returnContent - {boolean}
         * @description 是否立即返回新创建资源的表述还是返回新资源的URI。
         * 如果为 true，则直接返回新创建资源，即查询结果的表述。
         * 如果为 false，则返回的是查询结果资源的 URI。默认为 false。
         */
        this.returnContent = true;

        /**
         * @member SuperMap.GetFeaturesServiceBase.prototype.fromIndex - {integer}
         * @description 查询结果的最小索引号。
         * 默认值是0，如果该值大于查询结果的最大索引号，则查询结果为空。
         */
        this.fromIndex = 0;

        /**
         * @member SuperMap.GetFeaturesServiceBase.prototype.toIndex - {integer}
         * @description 查询结果的最大索引号。
         * 如果该值大于查询结果的最大索引号，则以查询结果的最大索引号为终止索引号。
         */
        this.toIndex = 19;

        /**
         * @member SuperMap.GetFeaturesServiceBase.prototype.maxFeatures - {integer}
         * @description 进行SQL查询时，用于设置服务端返回查询结果条目数量，默认为1000。
         */
        this.maxFeatures = null;

        /**
         * @member SuperMap.GetFeaturesServiceBase.prototype.format - {string}
         * @description 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。
         *  参数格式为"ISERVER","GEOJSON",GEOJSON
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
     * @description  将客户端的查询参数传递到服务端。
     * @param params - {Object} 查询参数。
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
     * @param result - {Object} 服务器返回的结果对象。
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