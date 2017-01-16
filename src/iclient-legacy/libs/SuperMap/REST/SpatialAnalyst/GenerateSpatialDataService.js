/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/GenerateSpatialDataResult.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/GenerateSpatialDataEventArgs.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/ServiceFailedEventArgs.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/GenerateSpatialDataParameters.js
 */

/**
 * Class: SuperMap.REST.GenerateSpatialDataService
 * 动态分段分析服务类。
 * 该类负责将客户设置的动态分段分析服务参数传递给服务端，并接收服务端返回的动态分段分析结果数据。
 * 动态分段分析结果通过该类支持的事件的监听函数参数获取，参数类型为 {<SuperMap.REST.GenerateSpatialDataEventArgs>};  
 * 获取的结果数据包括 originResult 、result 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的动态分段分析结果数据，
 * result 为服务端返回的动态分段分析结果数据，
 * 保存在 {<SuperMap.REST.GenerateSpatialDataResult>} 对象中。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.REST.GenerateSpatialDataService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回动态分段分析结果触发该事件。 
     * - *processFailed* 服务端返回动态分段分析结果失败触发该事件。       
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 GenerateSpatialDataService 类中处理所有事件的对象，
     * 支持 processCompleted 、processFailed 两种事件，服务端成功返回表面分析结果时触发 processCompleted 事件，
     * 服务端返回表面分析结果失败时触发 processFailed 事件。      
     */     
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 GenerateSpatialDataService 支持的两个事件 
     * processCompleted 、processFailed 进行监听，
     * 相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /** 
     * Property: lastResult
     * {<SuperMap.REST.GenerateSpatialDataResult>} 服务端返回的专题图结果数据。 
     */
    lastResult: null,

    /**
     * Constructor: SuperMap.REST.GenerateSpatialDataService
     * 动态分段服务类构造函数。
     *
     * 实例化该类如下例所示：
     * (start code)
     *  function GenerateSpatialData(){
     *   
     *  //配置数据返回选项(option)
     *  var option = new SuperMap.REST.DataReturnOption({
     *      expectCount: 1000,
     *      dataset: "generateSpatialData",
     *      deleteExistResultDataset: true,
     *      dataReturnMode: SuperMap.REST.DataReturnMode.DATASET_ONLY
     *  }),
     *  //配置动态分段参数(Parameters)
     *  parameters = new SuperMap.REST.GenerateSpatialDataParameters({
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
    initialize: function(url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        var me = this;

        if (options) {
            SuperMap.Util.extend(me, options);
        }
        me.events = new SuperMap.Events(
            me, null, me.EVENT_TYPES, true
        );
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用的资源属性置空。  
     */
    destroy: function() {
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
        if (me.lastResult) {
            me.lastResult.destroy();
            me.lastResult = null;
        }
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的动态分段服务参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.GenerateSpatialDataParameters>} 
     */
    processAsync: function(params) {
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
            success: me.GenerateSpatialDataComplete,
            failure: me.GenerateSpatialDataError
        });
    },

    /**
     * Method: GenerateSpatialDataComplete
     * 动态分段分析完成，执行此方法。
     *
     * Parameters:
     * orgResult - {Object} 服务器返回的结果对象。
     */
    GenerateSpatialDataComplete: function(result) {
        var me = this,
            qe = null,
            GenerateSpatialDataResult = null;
        result = SuperMap.Util.transformResult(result);
        GenerateSpatialDataResult = new SuperMap.REST.GenerateSpatialDataResult.fromJson(result);
        me.lastResult = GenerateSpatialDataResult;
        qe = new SuperMap.REST.GenerateSpatialDataEventArgs(GenerateSpatialDataResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },

    /**
     * Method: GenerateSpatialDataError
     * 动态分段分析失败，执行此方法。
     *
     * Parameters:
     * orgResult -  {Object} 服务器返回的结果对象。
     */
    GenerateSpatialDataError: function(result) {
        var me = this,
            error = null,
            serviceException = null,
            qe = null;
        result = SuperMap.Util.transformResult(result);
        error = result.error;
        if (!error) {
            return;
        }
        serviceException = SuperMap.ServiceException.fromJson(error);
        qe = new SuperMap.ServiceFailedEventArgs(serviceException, result);
        me.events.triggerEvent("processFailed", qe);
    },

    /**
     * Method: getJsonParameters
     * 将参数转化为 JSON 字符串。 
     *
     * Parameters:
     * params - {<SuperMap.REST.GenerateSpatialDataParameters>}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJsonParameters: function(params) {
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