/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * Class: SuperMap.REST.ChartQueryService
 *      海图查询服务类。该类负责将海图查询所需参数（ChartQueryParameters）传递至服务端，并获取服务端的返回结果。
 *      用户可以通过两种方式获取查询结果:
 *      1.通过 AsyncResponder 类获取（推荐使用）；
 *      2.通过监听 QueryEvent.PROCESS_COMPLETE 事件获取。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('../base');

SuperMap.REST.ChartQueryService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回查询结果触发该事件。
     * - *processFailed* 服务端返回查询结果失败触发该事件。
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 ChartQueryService 类中处理所有事件的对象，支持两种事件
     * processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted 事件，
     * 服务端返回查询结果失败时触发processFailed 事件。
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.REST.ChartQueryService(url);
     * myService.events.on({
     *     "processCompleted": queryCompleted,
     *	   "processFailed": queryError
     *	   }
     * );
     * function queryCompleted(object){//todo};
     * function queryError(object){//todo};
     * (end)
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 ChartQueryService
     *      支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用
     *      SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Property: returnContent
     * {Boolean} 是否立即返回新创建资源的表述还是返回新资源的URI。
     */
    returnContent: null,

    /**
     *  Property: format
     *  {String} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式
     *  参数格式为"iserver","geojson",默认为geojson
     */
    format: "geojson",
    /**
     * Constructor: SuperMap.REST.ChartQueryService
     * 获取图层信息服务类构造函数。
     *
     * Parameters:
     * url - {String} 地图查询服务访问地址。如："http://192.168.168.35:8090/iserver/services/map-ChartW/rest/maps/海图"。
     * options - {Object} 参数。
     *
     * 示例:
     * 下面示例显示了如何进行海图属性查询：
     * (start code)
     * var nameArray = ["GB4X0000_52000"];
     * var chartQueryFilterParameter = new SuperMap.REST.ChartQueryFilterParameter({
     *       isQueryPoint:true,
     *        isQueryLine:true,
     *        isQueryRegion:true,
     *        attributeFilter:"SmID<10",
     *        chartFeatureInfoSpecCode:1
     *    });
     *
     * var chartQueryParameters = new SuperMap.REST.ChartQueryParameters({
     *        queryMode:"ChartAttributeQuery",
     *        chartLayerNames:nameArray,
     *        returnContent:true,
     *        chartQueryFilterParameters:[chartQueryFilterParameter]
     *    });
     *
     * var chartQueryService = new SuperMap.REST.ChartQueryService(url);
     *
     * chartQueryService.events.on({
     *        "processCompleted":processCompleted,
     *        "processFailed":processFailed
     *    });
     * chartQueryService.processAsync(chartQueryParameters);
     * (end)
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this, end;
        me.events = new SuperMap.Events(me, null, me.EVENT_TYPES, true);
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }

        if (!me.url) {
            return;
        }
        end = me.url.substr(me.url.length - 1, 1);
        me.format = me.format.toLowerCase();
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
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     *
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.EVENT_TYPES = null;
        if (me.events) {
            me.events.destroy();
            me.events = null;
        }
        if (me.eventListeners) {
            me.eventListeners = null;
        }
        me.returnContent = null;
        me.format = null;
    },

    /**
     * APIMethod: processAsync
     * 使用服务地址 URL 实例化 ChartQueryService 对象。
     *
     * Parameters:
     * params - {<SuperMap.REST.ChartQueryParameters>} 查询参数。
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
            success: me.queryComplete,
            failure: me.queryError
        });
    },

    /**
     * Method: queryComplete
     * 查询完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    queryComplete: function (result) {
        var me = this, queryResult;
        result = SuperMap.Util.transformResult(result);
        if (result && result.recordsets && me.format === "geojson") {
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
     * Method: queryError
     * 查询失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    queryError: function (result) {
        result = SuperMap.Util.transformResult(result);
        this.events.triggerEvent("processFailed", result);
    },

    /**
     * Method: getQueryParameters
     * 将 JSON 对象表示的查询参数转化为 QueryParameters 对象。
     *
     * Parameters:
     * params - {Object} JSON 字符串表示的查询参数。
     *
     * Returns:
     * {<SuperMap.REST.chartQueryFilterParameters>}
     */
    getQueryParameters: function (params) {
        return new SuperMap.REST.QueryParameters({
            queryMode: params.queryMode,
            bounds: params.bounds,
            chartLayerNames: params.chartLayerNames,
            chartQueryFilterParameters: params.chartQueryFilterParameters,
            returnContent: params.returnContent
        });
    },

    CLASS_NAME: "SuperMap.REST.ChartQueryService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.ChartQueryService(url, options);
};