/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

 /**
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/GeoRelationAnalystResult.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/GeoRelationAnalystEventArgs.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/ServiceFailedEventArgs.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/GeoRelationAnalystParameters.js
 */
 
/**
 * Class: SuperMap.REST.GeoRelationAnalystService
 * 空间关系分析服务类。
 * 该类负责将客户设置的空间关系分析服务参数传递给服务端，并接收服务端返回的空间关系分析结果数据。
 */
SuperMap.REST.GeoRelationAnalystService = SuperMap.Class(SuperMap.ServiceBase,{
    
    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回空间关系分析结果触发该事件。 
     * - *processFailed* 服务端返回空间关系分析结果失败触发该事件。       
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],
    
     /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 GeoRelationAnalystService 类中处理所有事件的对象，
     * 支持 processCompleted 、processFailed 两种事件，服务端成功返回表面分析结果时触发 processCompleted 
     * 事件，服务端返回表面分析结果失败时触发 processFailed 事件。      
     */ 
    events: null,
    
    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 GeoRelationAnalystService 
     * 支持的两个事件 processCompleted 、processFailed 进行监听，
     * 相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,
    
    /** 
     * Property: lastResult
     * {<SuperMap.REST.GeoRelationAnalystResult>} 服务端返回的空间关系分析结果数据。 
     */
    lastResult: null,
    
    /**
     * Constructor: SuperMap.REST.GenerateSpatialDataService
     * 空间关系分析服务类构造函数。
     *
     * 实例化该类如下例所示：
     * (start code)
     *  function datasetGeoRelationAnalystProcess() {
     *      var referenceFilter = new SuperMap.REST.FilterParameter({
     *                              name:"Frame_R@Changchun",
     *                              attributeFilter:"SmID>0"});
     *      var sourceFilter = new SuperMap.REST.FilterParameter({
     *                          attributeFilter:"SmID>0"});
     *      //初始化服务类
     *      var datasetGeoRelationService = new SuperMap.REST.GeoRelationAnalystService(
     *          "http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst/"),
     *      //构建参数类
     *      datasetGeoRelationParameters = new SuperMap.REST.GeoRelationAnalystParameters({
     *          dataset: "Park@Changchun",
     *          startRecord: 0,
     *          expectCount: 20,
     *          sourceFilter: sourceFilter,
     *          referenceFilter: referenceFilter,
     *          spatialRelationType: SuperMap.REST.SpatialRelationType.INTERSECT,
     *          isBorderInside: true,
     *          returnFeature: true,
     *          returnGeoRelatedOnly: true
     *      });
     *      datasetGeoRelationService.events.on({
     *          "processCompleted": datasetGeoRelationAnalystCompleted, 
     *          "processFailed": datasetGeoRelationAnalystFailed});
     *      //执行
     *      datasetGeoRelationService.processAsync(datasetGeoRelationParameters);
     *  }
     *  function Completed(datasetGeoRelationAnalystCompleted){//todo};
     *  function Error(datasetGeoRelationAnalystFailed){//todo};
     * (end)   
     *          
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * options - {Object} 可选参数。
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
     * 负责将客户端的空间关系分析参数传递到服务端
     *
     * Parameters:
     * params - {<SuperMap.REST.GeoRelationAnalystParameters>} 空间关系分析所需的参数信息。
     */
    processAsync: function(parameter) { 
        var me = this;
        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {
            me.url += 'datasets/' + parameter.dataset + '/georelation';
        } else {
            me.url += '/datasets/' + parameter.dataset + '/georelation';
        }

        var jsonParameters = SuperMap.Util.toJSON(parameter);

        if (me.isInTheSameDomain) {
            me.url += '.json?returnContent=true';
        } else {
            me.url += '.jsonp?returnContent=true';
        }

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.geoRelationAnalystComplete,
            failure: me.geoRelationAnalystError
        });
    },
    
    /**
     * Method: geoRelationAnalystComplete
     * 空间关系分析完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    geoRelationAnalystComplete: function(result){
        var me = this,
            result, 
            evtArgs, 
            geoRelationResults;
        result = SuperMap.Util.transformResult(result);
        geoRelationResults = SuperMap.REST.GeoRelationAnalystResult.fromJson(result);
        me.lastResult = geoRelationResults;

        evtArgs = new SuperMap.REST.GeoRelationAnalystEventArgs(geoRelationResults, result);
        me.events.triggerEvent("processCompleted", evtArgs);
    },
    
    /**
     * Method: geoRelationAnalystError
     * 空间关系分析失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    geoRelationAnalystError: function(result){
        var me = this,
            error = null,
            serviceException = null,
            se = null;
        result = SuperMap.Util.transformResult(result);
        error = result.error;
        if (!error) {
            return;
        }
        serviceException = SuperMap.ServiceException.fromJson(error);
        se = new SuperMap.ServiceFailedEventArgs(serviceException, result);
        me.events.triggerEvent("processFailed", se);
    },
    
    CLASS_NAME: "SuperMap.REST.GeoRelationAnalystService"
});