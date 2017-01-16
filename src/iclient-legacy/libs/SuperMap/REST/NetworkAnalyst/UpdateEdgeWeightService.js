/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 */

 SuperMap.REST.UpdateEdgeWeightService=SuperMap.Class(SuperMap.ServiceBase,{
    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回更新边的边的耗费权重结果触发该事件。
     * - *processFailed* 服务端返回更新边的边的耗费权重结果失败触发该事件。
     */
    EVENT_TYPES: [
        "processCompleted", "processFailed"],

     /**
      * APIProperty: events
      * {SuperMap.Events} 更新边的耗费权重服务的事件处理器
      */
    events:null,

     /**
      * APIProperty: eventListeners
      * {Object} 监听*processCompleted*和*processFailed*事件的回调函数
      */
    eventListeners: null,

     /**
      * Property: lastResult
      * {SuperMap.REST.UpdateEdgeWeightResult} 服务器返回的结果
      * */
    lastResult: null,

    /**
     * Constructor: SuperMap.REST.UpdateEdgeWeightService
     * 更新边的边的耗费权重服务类构造函数。
     *
     * 例如：
     * (start code)
     * var updateEdgeWeightService = new SuperMap.REST.UpdateEdgeWeightService(url, {
     *     eventListeners: {
     *         "processCompleted": UpdateEdgeWeightCompleted,      //参数为SuperMap.REST.UpdateEdgeWeightEventArgs
     *		   "processFailed": UpdateEdgeWeightError             //参数为SuperMap.ServiceFailedEventArgs
     *		   }
     * });
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
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
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.EVENT_TYPES = null;
        me.events = null;
        me.eventListeners = null;
        if (me.lastResult) {
            me.lastResult.destroy();
            me.lastResult = null;
        }
    },


     /**
      * APIMethod: processAsync
      * 开始异步执行边的边的耗费权重的更新
      * Parameters:
      * params - {SuperMap.REST.UpdateEdgeWeightParameters} 更新服务参数
      *
      * 例如:
      * (code)
      *  var updateEdgeWeightParam=new SuperMap.REST.UpdateEdgeWeightParameters({
      *          edgeId:"20",
      *          fromNodeId:"26",
      *          toNodeId:"109",
      *          weightField:"time",
      *          edgeWeight:"25"
      *      });
      *  updateEdgeWeightService.processAsync(updateEdgeWeightParam);
      * (end)
      *
      **/
    processAsync: function(params) {
        if(!params){
            return;
        }

        var me = this, end = me.url.substr(me.url.length - 1, 1);
        var paramStr=me.parse(params);
        if(end === "/"){
            me.url.splice(me.url.length-1,1);
        }
        me.url = me.url +paramStr+ (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        var data=params.edgeWeight?params.edgeWeight:null;
        me.request({
            method: "PUT",
            scope: me,
            data:data,
            success: me.updateEdgeWeightComplete,
            failure: me.updateEdgeWeightError
        });
    },

    /**
     * Method: parse
     * 将更新服务参数解析为用‘/’做分隔的字符串
     * */
    parse:function(params){
        if(!params){
            return;
        }
        var paramStr="";
        for(var attr in params){
            if(params[attr]===""||params[attr]==="edgeWeight")continue;
            switch(attr){
                case "edgeId":
                    paramStr+="/edgeweight/"+params[attr];
                    break;
                case "fromNodeId":
                    paramStr+="/fromnode/"+params[attr];
                    break;
                case "toNodeId":
                    paramStr+="/tonode/"+params[attr];
                    break;
                case "weightField":
                    paramStr+="/weightfield/"+params[attr];
                    break;
                default :break;
            }
        }
        return paramStr;
    },

     /**
      * Method: updateEdgeWeightComplete
      * 更新边的边的耗费权重完成后的回调函数
      * */
    updateEdgeWeightComplete:function(result){
        var me = this,
            updateEdgeWeightResult, fe;
        result = SuperMap.Util.transformResult(result);
        updateEdgeWeightResult = SuperMap.REST.UpdateEdgeWeightResult.fromJson(result);
        me.lastResult = updateEdgeWeightResult;
        fe = new SuperMap.REST.UpdateEdgeWeightEventArgs(updateEdgeWeightResult, result);
        me.events.triggerEvent("processCompleted", fe);
    },

     /**
      * Method: updateEdgeWeightError
      * 更新边的边的耗费权重失败回调函数
      * */
     updateEdgeWeightError:function(result){
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

    CLASS_NAME:"SuperMap.REST.UpdateEdgeWeightService"
});