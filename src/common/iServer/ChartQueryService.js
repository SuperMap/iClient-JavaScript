/*
 * Class: SuperMap.ChartQueryService
 *      海图查询服务类。该类负责将海图查询所需参数（ChartQueryParameters）传递至服务端，并获取服务端的返回结果。
 *      用户可以通过两种方式获取查询结果:
 *      1.通过 AsyncResponder 类获取（推荐使用）；
 *      2.通过监听 QueryEvent.PROCESS_COMPLETE 事件获取。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('../REST');
require('./ServiceBase');
require('./ChartQueryParameters');
var SuperMap = require('../SuperMap');
var GeoJSONFormat = require('../format/GeoJSON');

/**
 * @class SuperMap.ChartQueryService
 * @description 海图查询服务类。该类负责将海图查询所需参数（ChartQueryParameters）传递至服务端，并获取服务端的返回结果。<br>
 *      用户可以通过两种方式获取查询结果:<br>
 *      1.通过 AsyncResponder 类获取（推荐使用）；<br>
 *      2.通过监听 QueryEvent.PROCESS_COMPLETE 事件获取。<br>
 * @augments  SuperMap.ServiceBase
 * @param url - {String} 地图查询服务访问地址。如："http://192.168.168.35:8090/iserver/services/map-ChartW/rest/maps/海图"。
 * @param - options - {Object} 服务交互时所需的可选参数。
 * @example
 * 下面示例显示了如何进行海图属性查询：
 * (start code)
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
 * (end)
 */
SuperMap.ChartQueryService = SuperMap.Class(SuperMap.ServiceBase, {

    /*
     * Property: returnContent
     * {Boolean} 是否立即返回新创建资源的表述还是返回新资源的URI。
     */
    returnContent: null,

    /*
     *  Property: format
     *  {String} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式
     *  参数格式为"ISERVER","GEOJSON",GEOJSON
     */
    format: SuperMap.DataFormat.GEOJSON,

    /**
     * @function SuperMap.ChartQueryService.initialize
     * @description 获取图层信息服务类构造函数。
     *
     * Parameters:
     * @param url - {String} 地图查询服务访问地址。如："http://192.168.168.35:8090/iserver/services/map-ChartW/rest/maps/海图"。
     * @param options - {Object} 查询服务可选参数。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        options = options || {};
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this, end;
        if (options && options.format) {
            me.format = options.format.toUpperCase();
        }

        if (!me.url) {
            return;
        }
        end = me.url.substr(me.url.length - 1, 1);

        // TODO 待iServer featureResul资源GeoJSON表述bug修复当使用以下注释掉的逻辑
        // if (me.format==="geojson" && me.isInTheSameDomain) {
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
     * @inheritDoc
     */
    destroy: function () {
        var me = this;
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        me.returnContent = null;
        me.format = null;
    },

    /**
     * @function SuperMap.ChartQueryService.processAsync
     * @description APIMethod:使用服务地址 URL 实例化 ChartQueryService 对象。
     * Parameters:
     * @param params - {ChartQueryParameters} 查询参数。
     */
    processAsync: function (params) {
        //todo重点需要添加代码的地方
        if (!params) {
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
    },

    /*
     * Method: queryComplete
     * 查询完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted: function (result) {
        var me = this;
        result = SuperMap.Util.transformResult(result);
        if (result && result.recordsets && me.format === SuperMap.DataFormat.GEOJSON) {
            for (var i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                if (recordsets[i].features) {
                    var geoJSONFormat = new GeoJSONFormat();
                    recordsets[i].features = JSON.parse(geoJSONFormat.write(recordsets[i].features));
                }
            }

        }
        me.events.triggerEvent("processCompleted", {result: result});
    },

    /*
     * @function  getQueryParameters
     * @description 将 JSON 对象表示的查询参数转化为 QueryParameters 对象。
     *
     * Parameters:
     * @param params - {Object} JSON 字符串表示的查询参数。
     *
     * Returns:
     * @return {chartQueryFilterParameters} 返回查询结果
     */
    getQueryParameters: function (params) {
        return new SuperMap.QueryParameters({
            queryMode: params.queryMode,
            bounds: params.bounds,
            chartLayerNames: params.chartLayerNames,
            chartQueryFilterParameters: params.chartQueryFilterParameters,
            returnContent: params.returnContent
        });
    },

    CLASS_NAME: "SuperMap.ChartQueryService"
});

module.exports = SuperMap.ChartQueryService;