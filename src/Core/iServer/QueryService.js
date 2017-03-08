/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。
 */

/**
 * Class: SuperMap.REST.QueryService
 * 查询服务基类。
 * 结果保存在一个object对象中，对象包含一个属性result为iServer返回的json对象
 * Inherits from:
 *  - <SuperMap.CoreServiceBase>
 */
require('../format/GeoJSON');
require('./CoreServiceBase');
require('./QueryParameters');
SuperMap.REST.QueryService = SuperMap.Class(SuperMap.CoreServiceBase, {

    /**
     * Property: returnContent
     * {Boolean} 是否立即返回新创建资源的表述还是返回新资源的URI。
     */
    returnContent: false,

    /**
     *  Property: format
     *  {String} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式
     *  参数格式为"ISERVER","GEOJSON",GEOJSON
     */
    format: Format.GEOJSON,

    /**
     * Constructor: SuperMap.REST.QueryService
     * 查询服务基类构造函数。
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.REST.QueryService(url, {
     *     eventListeners: {
     *	       "processCompleted": queryCompleted, 
     *		   "processFailed": queryError
     *		   }
     * };
     * (end)
     *
     * Parameters:
     * url - {String} 服务地址。请求地图查询服务的 URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.CoreServiceBase.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this, end;
        if (!me.url) {
            return;
        }
        if (options && options.format) {
            me.format = options.format.toUpperCase();
        }

        end = me.url.substr(me.url.length - 1, 1);

        // TODO 待iServer featureResul资源GeoJSON表述bug修复当使用以下注释掉的逻辑
        // if (this.format==="geojson" && me.isInTheSameDomain) {
        //     me.url += (end == "/") ? "featureResults.geojson?" : "/featureResults.geojson?";
        // } else {
        //     me.url += (end == "/") ? "featureResults.jsonp?" : "/featureResults.jsonp?";
        // }
        if (me.isInTheSameDomain) {
            me.url += (end === "/") ? "queryResults.json?" : "/queryResults.json?";
        } else {
            me.url += (end === "/") ? "queryResults.jsonp?" : "/queryResults.jsonp?";
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.CoreServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.returnContent = null;
        me.format = null;
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<QueryParameters>} 查询参数。
     */
    processAsync: function (params) {
        if (!params) {
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
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    /**
     * Method: queryComplete
     * 查询完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted: function (result) {
        var me = this, queryResult;
        result = SuperMap.Util.transformResult(result);
        if (result && result.recordsets && me.format === Format.GEOJSON) {
            queryResult = [];
            for (var i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                if (recordsets[i].features) {
                    var geoJSONFormat = new SuperMap.Format.GeoJSON();
                    var feature = JSON.parse(geoJSONFormat.write(recordsets[i].features));
                    queryResult.push(feature);
                }
            }

        } else {
            queryResult = result;
        }
        me.events.triggerEvent("processCompleted", {result: queryResult});
    },

    /**
     * Method: getQueryParameters
     * 将 JSON 对象表示的查询参数转化为 QueryParameters 对象。
     *
     * Parameters:
     * params - {Object} JSON 字符串表示的查询参数。
     *
     * Returns:
     * {<QueryParameters>} 返回转化后的 QueryParameters 对象。
     */
    getQueryParameters: function (params) {
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
    },

    CLASS_NAME: "SuperMap.REST.QueryService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.QueryService(url, options);
};