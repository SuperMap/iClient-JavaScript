/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Events.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 * @requires SuperMap/ServiceException.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/MeasureResult.js
 * @requires SuperMap/REST/MeasureParameters.js
 * @requires SuperMap/REST/MeasureEventArgs.js
 */

/**
 * Class: SuperMap.REST.MeasureService
 * 量算服务类。
 * 该类负责将量算参数传递到服务端，并获取服务端返回的量算结果。
 * 量算结果通过该类支持的事件的监听函数参数获取，参数类型为 {<SuperMap.REST.MeasureEventArgs>}; 获取的结果包括 result 、originResult 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的量算结果数据，result 为服务端返回的量算结果数据，保存在 {<SuperMap.REST.MeasureResult>} 。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.REST.MeasureService = SuperMap.Class(SuperMap.ServiceBase, {
    
    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回量算结果触发该事件。 
     * - *processFailed* 服务端返回量算结果失败触发该事件。  
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],
        
    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 MeasureService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回量算结果时触发 processCompleted  事件，服务端返回量算结果失败触发 processFailed 事件。
     * 例如：
     * (start code)
     * var myMeasureService = new SuperMap.REST.MeasureService(url);
     * myMeasureService.events.on({
     *     "processCompleted": measureCompleted, 
     *       "processFailed": measureFailed
     *       }
     * );
     * function measureCompleted(MeasureEventArgs){//todo};
     * function measureFailed(MeasureEventArgs){//todo};
     * (end)
     */  
    events: null,
    
    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 MeasureService 支持的两个事件 processCompleted 、processFailed 进行监听，
     * 相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,
    
    /** 
     * Property: lastResult
     * {<SuperMap.REST.MeasureResult>} 服务端返回的量算结果数据。 
     */
    lastResult: null,
    
    /** 
     * APIProperty: measureMode
     * {<SuperMap.REST.MeasureMode>} 量算模式，包括距离量算模式和面积量算模式。默认值为：SuperMap.REST.MeasureMode.DISTANCE 。
     */
    measureMode: SuperMap.REST.MeasureMode.DISTANCE,
    
    /**
     * Constructor: SuperMap.REST.MeasureService
     * 量算服务类构造函数。
     *
     * 例如：
     * (start code)     
     * var myMeasuerService = new SuperMap.REST.MeasureService(url, {measureMode: SuperMap.REST.MeasureMode.DISTANCE,eventListeners:{"processCompleted": measureCompleted}});
     * (end)     
     *     
     * Parameters:
     * url - {String} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     * measureMode - {<SuperMap.REST.MeasureMode>} 量算模式，包括距离量算模式和面积量算模式。
     */
    initialize: function(url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this;
        me.events = new SuperMap.Events(
            me, null, me.EVENT_TYPES, true
        );
        if(me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。  
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
        me.measureMode = null;
    },
    
    /**
     * APIMethod: processAsync
     * 负责将客户端的量算参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.MeasureParameters>} 量算参数。
     */
    processAsync: function(params) {
        if(!params){
            return;
        }
        var me = this,
            geometry = params.geometry,
            pointsCount = 0,
            point2ds = null,
            urlParameters = null,
            end = null;
        if (!geometry) {
            return;
        } 
        end = me.url.substr(me.url.length - 1, 1);
        if (me.measureMode === SuperMap.REST.MeasureMode.AREA) {
            if (me.isInTheSameDomain) {
                me.url += ((end === "/") ? "area.json?": "/area.json?");
            }
            else {
                me.url += ((end === "/") ? "area.jsonp?": "/area.jsonp?");
            }
        } else {
            if (me.isInTheSameDomain) {
                me.url += ((end === "/") ? "distance.json?": "/distance.json?");
            }
            else {
                me.url += ((end === "/") ? "distance.jsonp?": "/distance.jsonp?");
            }
        }
        var serverGeometry = SuperMap.REST.ServerGeometry.fromGeometry(geometry);
        if (!serverGeometry) {
            return;
        }
        pointsCount = serverGeometry.parts[0];
        point2ds = serverGeometry.points.splice(0, pointsCount);

        var prjCoordSysTemp,prjCodeTemp,paramsTemp;
        if(params.prjCoordSys){
            if(typeof (params.prjCoordSys) === "object")
            {
                    prjCodeTemp = params.prjCoordSys.projCode;
                    prjCoordSysTemp = '{"epsgCode"'+prjCodeTemp.substring(prjCodeTemp.indexOf(":"),prjCodeTemp.length) +"}";
            }
            else if(typeof (params.prjCoordSys) === "string")
            {
                prjCoordSysTemp = '{"epsgCode"'+params.prjCoordSys.substring(params.prjCoordSys.indexOf(":"),params.prjCoordSys.length) +"}";
            }
            paramsTemp = {"point2Ds": SuperMap.Util.toJSON(point2ds), "unit": params.unit, "prjCoordSys":prjCoordSysTemp};
        }
        else
        {
            paramsTemp = {"point2Ds": SuperMap.Util.toJSON(point2ds), "unit": params.unit};
        }

        me.request({
            method: "GET",
            params:paramsTemp,
            scope: me,
            success: me.measureComplete,
            failure: me.measureError
        });

    },

    /**
     * Method: measureComplete
     * 量算完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    measureComplete: function(result) {
        var me = this,
            qe = null,
            measureResult = null;
        result = SuperMap.Util.transformResult(result);
        measureResult = SuperMap.REST.MeasureResult.fromJson(result);
        me.lastResult = measureResult;
        qe = new SuperMap.REST.MeasureEventArgs(measureResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },
    
    /**
     * Method: measureError
     * 量算失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    measureError: function(result) {
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
    
    CLASS_NAME: "SuperMap.REST.MeasureService"
});