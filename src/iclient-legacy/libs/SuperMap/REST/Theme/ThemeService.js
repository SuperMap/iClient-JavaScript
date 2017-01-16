/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Events.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Theme/ThemeResult.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 * @requires SuperMap/ServiceException.js
 * @requires SuperMap/REST/Theme/ThemeParameters.js
 * @requires SuperMap/REST/Theme/ThemeEventArgs.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.ThemeService
 * 专题图服务类。
 * 专题图结果通过该类支持的事件的监听函数参数获取，参数类型为 {<SuperMap.REST.ThemeEventArgs>}; 获取的结果数据包括 originResult 、result 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的专题图结果数据，result 为服务端返回的专题图结果数据，保存在 {<SuperMap.REST.ThemeResult>} 对象中。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.REST.ThemeService = SuperMap.Class(SuperMap.ServiceBase, {
    
    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回专题图结果触发该事件。 
     * - *processFailed* 服务端返回专题图结果失败触发该事件。       
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],
    
    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 ThemeService 类中处理所有事件的对象，支持 processCompleted 、processFailed 两种事件，服务端成功返回专题图结果时触发 processCompleted 事件，服务端返回专题图结果失败时触发 processFailed 事件。
     * 
     * 例如：
     * (start code)     
     * var myThemeService = SuperMap.REST.ThemeService(url);
     * myThemeService.events.on({
     *     "processCompleted": themeCompleted, 
     *       "processFailed": themeFailed
     *     }
     * );
     * function themeCompleted(ThemeEventArgs){//todo};
     * function themeFailed(ThemeEventArgs){//todo};
     * (end)
     */  
     
    events: null,
    
    /**
     * APIProperty: eventListeners
     *{Object} 监听器对象，在构造函数中设置此参数（可选），对 ThemeService 支持的两个事件 processCompleted 、processFailed 进行监听，
     * 相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,
    
    /** 
     * Property: lastResult
     * {<SuperMap.REST.ThemeResult>} 服务端返回的专题图结果数据。 
     */
    lastResult: null,
        
    /**
     * Constructor: SuperMap.REST.ThemeService
     * 专题图服务类构造函数。
     *
     * 例如：
     * (start code)     
     * var myThemeService = new SuperMap.REST.ThemeService(url, {
     *     eventListeners: {
     *           "processCompleted": themeCompleted,
     *           "processFailed": themeFailed
     *           }
     * });   
     * (end)     
     *     
     * Parameters:
     * url - {String} 服务的访问地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var end,
            me = this;
        me.events = new SuperMap.Events(me, null, me.EVENT_TYPES, true);
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }

        end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end === "/") ? "tempLayersSet.json?": "/tempLayersSet.json?";
        } else {
            me.url += (end === "/") ? "tempLayersSet.jsonp?": "/tempLayersSet.jsonp?";
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
     * 负责将客户端的专题图参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.ThemeParameters>} 
     */
    processAsync: function(params) {
        if(!params){
            return;
        }
        var me = this,
            jsonParameters = null;
        jsonParameters = me.getJsonParameters(params);
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.themeComplete,
            failure: me.themeError
        });
    },

    /**
     * Method: themeComplete
     * 专题图添加完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    themeComplete: function(result) {
        var me = this,
            qe = null,
            themeResult = null;
        result = SuperMap.Util.transformResult(result);
        themeResult = new SuperMap.REST.ThemeResult();
        themeResult.resourceInfo = SuperMap.REST.ResourceInfo.fromJson(result);
        me.lastResult = themeResult;
        qe = new SuperMap.REST.ThemeEventArgs(themeResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },
    
    /**
     * Method: themeError
     * 专题图添加失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    themeError: function(result) {
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
     * 将专题图参数参数转化为 JSON 字符串。 
     *
     * Parameters:
     * params - {<SuperMap.REST.ThemeParameters>}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJsonParameters: function(parameter) {
        var jsonParameters = "",
            themeType = "",
            themeObj = null,
            filters = null,
            orderBys = null,
            fieldValuesDisplayFilter;
        jsonParameters += "[{'type': 'UGC','subLayers': {'layers': [";
        for (var themeID in parameter.themes) {
            themeObj = parameter.themes[themeID];
            var jsonTheme = SuperMap.Util.toJSON(themeObj);
            jsonTheme = jsonTheme.slice(0, -1);

            jsonParameters += "{'theme': " + jsonTheme + "},'type': 'UGC','ugcLayerType': 'THEME',";
            filters = parameter.displayFilters;
            if(filters && filters.length > 0) {
                if(filters.length === 1) {
                    jsonParameters += "'displayFilter':\"" + filters[0] + "\",";
                } else {
                    jsonParameters += "'displayFilter':\"" + filters[themeID] + "\",";
                }
            }
            orderBys = parameter.displayOrderBy;
            if(orderBys && orderBys.length > 0) {
                if(orderBys.length === 1) {
                    jsonParameters += "'displayOrderBy':'" + orderBys[0] + "',";
                } else {
                    jsonParameters += "'displayOrderBy':'" + orderBys[themeID] + "',";
                }
            }

            fieldValuesDisplayFilter=parameter.fieldValuesDisplayFilter;
            if(fieldValuesDisplayFilter){
                jsonParameters+="'fieldValuesDisplayFilter':"+SuperMap.Util.toJSON(fieldValuesDisplayFilter)+",";
            }
                
            if(parameter.joinItems && parameter.joinItems.length > 0 && parameter.joinItems[themeID]){
                jsonParameters += "'joinItems':[" + SuperMap.Util.toJSON(parameter.joinItems[themeID]) + "],";
            }
            if(parameter.datasetNames && parameter.dataSourceNames){
                var datasetID = parameter.datasetNames[themeID] ? themeID : (parameter.datasetNames.length -1);
                var dataSourceID = parameter.dataSourceNames[themeID] ? themeID : (parameter.dataSourceNames.length - 1);
                jsonParameters += "'datasetInfo': {'name': '" + parameter.datasetNames[datasetID] + 
                    "','dataSourceName': '" + parameter.dataSourceNames[dataSourceID] + "'}},";
            } else {
                jsonParameters += "},";
            }
        }
        //去除多余的逗号
        if (parameter.themes && parameter.themes.length > 0) {
            jsonParameters = jsonParameters.substring(0, jsonParameters.length - 1);
        }
        jsonParameters += "]},";
        var urlArray = this.url.split("/");
        var jsonMapName = urlArray[urlArray.length - 2];
        
        jsonParameters +=  "'name': '" + jsonMapName + "'}]";
        return jsonParameters;
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeService"
});