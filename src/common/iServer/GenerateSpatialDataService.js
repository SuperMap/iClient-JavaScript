/**
 * Class: SuperMap.REST.GenerateSpatialDataService
 * 动态分段分析服务类。
 * 该类负责将客户设置的动态分段分析服务参数传递给服务端，并接收服务端返回的动态分段分析结果数据。
 * 获取的结果数据包括 originResult 、result 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的动态分段分析结果数据，
 * result 为服务端返回的动态分段分析结果数据，
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystBase>
 */
require('./SpatialAnalystBase');
require('./GenerateSpatialDataParameters');
SuperMap.REST.GenerateSpatialDataService = SuperMap.Class(SuperMap.REST.SpatialAnalystBase, {

    /**
     * Constructor: SuperMap.REST.GenerateSpatialDataService
     * 动态分段服务类构造函数。
     *
     * 实例化该类如下例所示：
     * (start code)
     *  function GenerateSpatialData(){
     *   
     *  //配置数据返回选项(option)
     *  var option = new SuperMap.DataReturnOption({
     *      expectCount: 1000,
     *      dataset: "generateSpatialData",
     *      deleteExistResultDataset: true,
     *      dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY
     *  }),
     *  //配置动态分段参数(Parameters)
     *  parameters = new SuperMap.GenerateSpatialDataParameters({
     *      routeTable: "RouteDT_road@Changchun",
     *      routeIDField: "RouteID",
     *      eventTable: "LinearEventTabDT@Changchun",
     *      eventRouteIDField: "RouteID",
     *      measureField: "",
     *      measureStartField: "LineMeasureFrom",
     *      measureEndField: "LineMeasureTo",
     *      measureOffsetField: "",
     *      errorInfoField: "",
     *      retainedFields:[],
     *      dataReturnOption: option
     *  }),
     *  //配置动态分段iService
     *  iService = new SuperMap.REST.GenerateSpatialDataService(Changchun_spatialanalyst, {
     *      eventListeners: {
     *          processCompleted: generateCompleted,
     *          processFailed: generateFailded 
     *      }
     *  });
     *  //执行
     *  iService.processAsync(parameters);
     *  function Completed(generateSpatialDataEventArgs){//todo};
     *  function Error(generateSpatialDataEventArgs){//todo};
     * (end)   
     *          
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.REST.SpatialAnalystBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.REST.SpatialAnalystBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的动态分段服务参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.GenerateSpatialDataParameters>}
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this,
            jsonParameters;

        jsonParameters = me.getJsonParameters(params);

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    /**
     * Method: getJsonParameters
     * 将参数转化为 JSON 字符串。
     *
     * Parameters:
     * params - {<SuperMap.GenerateSpatialDataParameters>}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJsonParameters: function (params) {
        var jsonParameters = "",
            jsonStr = "datasets/" + params.routeTable + "/linearreferencing/generatespatialdata",
            me = this,
            end;

        end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end === "/") ? jsonStr + ".json" : "/" + jsonStr + ".json";
        } else {
            me.url += (end === "/") ? jsonStr + ".jsonp" : "/" + jsonStr + ".jsonp";
        }

        me.url += "?returnContent=true";
        jsonParameters = SuperMap.Util.toJSON(params);
        return jsonParameters;
    },

    CLASS_NAME: "SuperMap.REST.GenerateSpatialDataService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.GenerateSpatialDataService(url, options);
};